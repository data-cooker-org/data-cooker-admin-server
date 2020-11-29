const { parentPort, workerData } = require('worker_threads');
const Scheduler = require('node-schedule');
const taskz = require('taskz');

/**
 * server configuration
 */
// const config = require('../../config/');
// const auth = require('../policies/auth.policy');
// const dbService = require('../services/db.service');
// const { schema } = require('./graphql');

// // environment: development, testing, production
// const environment = process.env.NODE_ENV;

// /**
//  * express application
//  */
// const DB = dbService(environment, config.migrate).start();

const { TaskExecutor } = require('./TaskExecutor');

parentPort.once('message', (message) => {
	console.log(message);
	const output = capitalise(message);
	parentPort.postMessage(output);
});

function capitalise(text) {
	return text.toUpperCase();
}

Scheduler.scheduleJob(workerData.jobInfo.scheduleCron, () => {
	parentPort.postMessage('Runing job: ' + workerData.jobInfo.jobName);
	const scheduledTasks = workerData.jobTasks.map((task) => {
		return {
			text: task.taskName,
			stopOnError: task.stopOnError,
			task: () => {
				console.log('Runing task: ' + task.taskName);
				const taskResult = TaskExecutor(task.taskDefinition);
				// console.log(taskResult);
				return taskResult;
			},
		};
	});
	taskz(scheduledTasks).run();
});
