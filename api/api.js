const dotenv = require('dotenv').config();
/**
 * third party libraries
 */
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');

/**
 * self owned libraries
 */
// run TaskScheduler as a local tasks, run WorkerFilePath for threads
const TaskScheduler = require('./executors/TaskScheduler')();
const WorkerFilePath = require.resolve('./executors/ThreadWorker.js');

/**
 * server configuration
 */
const config = require('../config/');
const auth = require('./policies/auth.policy');
const dbService = require('./services/db.service');
const { schema } = require('./graphql');

// environment: development, testing, production
const environment = process.env.NODE_ENV;

/**
 * express application
 */
const DB = dbService(environment, config.migrate).start();
const api = express();
const server = http.Server(api);
const publicRouter = mapRoutes(config.publicRoutes, 'api/controllers/');

// private routes
const privateRouter = mapRoutes(config.privateRoutes, 'api/controllers/');

// allow cross origin requests
// configure to allow only requests from certain origins
api.use(cors());

// secure express app
api.use(helmet({
	dnsPrefetchControl: false,
	frameguard: false,
	ieNoOpen: false,
}));

// parsing the request bodys
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

// public auth REST API
api.use('/userapi', publicRouter);

// private REST API
api.all('/respful/*', (req, res, next) => auth(req, res, next));
api.use('/respful', privateRouter);


// private GraphQL API
api.post('/graphql', (req, res, next) => auth(req, res, next));

const graphQLServer = new ApolloServer({
	schema,
});

graphQLServer.applyMiddleware({
	app: api,
	cors: {
		origin: true,
		credentials: true,
		methods: ['POST'],
		allowedHeaders: [
			'X-Requested-With',
			'X-HTTP-Method-Override',
			'Content-Type',
			'Accept',
			'Authorization',
			'Access-Control-Allow-Origin',
		],
	},
	playground: {
		// endpoint: '/graphql',
		settings: {
			'editor.theme': 'light',
		},
	},
});

server.listen(config.port, () => {
	let scheduledJobs = {};
	if (environment !== 'production'
		&& environment !== 'development'
		&& environment !== 'testing'
	) {
		console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
		process.exit(1);
	}

	// console.log(process.env);

	TaskScheduler.getAllJobs().then((jobs) => {
		jobs.forEach((job) => {
			const jobInfo = job.dataValues;
			const executor = environment !== 'development' ? 'local tasker' : 'thread worker';
			console.log('Initializing job: ' + JSON.stringify(jobInfo.jobName) + ' is a ' + executor);
			if (executor === 'local tasker') {
				scheduledJobs[jobInfo.jobName] = TaskScheduler.runTasker(jobInfo);
			}
			else {
				scheduledJobs[jobInfo.jobName] = TaskScheduler.runWorker(WorkerFilePath, jobInfo);
				// scheduledJobs[jobInfo.jobName].postMessage('ping');  // test worker, correct if return "PING"
			}
		});
	});

	return DB;
});
