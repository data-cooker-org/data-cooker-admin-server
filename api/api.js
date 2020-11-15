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
const taskService = require('./services/task.service')();

const workerScriptFilePath = require.resolve('./services/worker-script.js');

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
// const DB = dbService(environment, config.migrate).start();

// private routes
const privateRouter = mapRoutes(config.privateRoutes, 'api/controllers/');
// const roleRouter = require('./respful/role');
// const userRouter = require('./respful/user');
// const avatarRouter = require('./respful/avatar');
// const courseRouter = require('./respful/course');
// const noteRouter = require('./respful/note');
// const jobRouter = require('./respful/job');
// const taskRouter = require('./respful/task');
// const permissionRouter = require('./respful/permission.js');
// const targetRouter = require('./respful/target');
// const sourceRouter = require('./respful/source');
// // const loginRouter = require('./respful/login');
// // const defaultRouter = require('./respful/index');

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
// api.put('/respful/*', (req, res, next) => auth(req, res, next));
// api.post('/respful/*', (req, res, next) => auth(req, res, next));
// api.delete('/respful/*', (req, res, next) => auth(req, res, next));
api.use('/respful', privateRouter);


// api.use('/respful/roles', roleRouter);
// api.use('/respful/users', userRouter);
// api.use('/respful/avatars', avatarRouter);
// api.use('/respful/courses', courseRouter);
// api.use('/respful/notes', noteRouter);
// api.use('/respful/jobs', jobRouter);
// api.use('/respful/tasks', taskRouter);
// api.use('/respful/permissions', permissionRouter);
// api.use('/respful/targets', targetRouter);
// api.use('/respful/sources', sourceRouter);
// // api.use('/respful', defaultRouter);
// // api.use('/respful/login', loginRouter);


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

	taskService.getAllJobs().then((jobs) => {
		jobs.forEach((job) => {
			const jobInfo = job.dataValues;
			console.log('Initializing job: ' + JSON.stringify(jobInfo.jobName));
			// scheduledJobs[jobInfo.jobName] = taskService.runTasker(jobInfo);
			scheduledJobs[jobInfo.jobName] = taskService.runWorker(workerScriptFilePath, jobInfo);
			// scheduledJobs[jobInfo.jobName].postMessage('ping');  // test worker, correct if return "PING"
		});
	});

	return DB;
});
