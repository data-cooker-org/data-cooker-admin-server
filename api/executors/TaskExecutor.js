const schedule = require('node-schedule');
const taskz = require('taskz');

// const db = require('../models');
const BatchProcessor = require('./Aggregator/BatchProcessor');


const TaskExecutor = (taskDefinition => {
	const { featureId, targetData } = JSON.parse(taskDefinition);
	switch (featureId) {
		case 2:
			const scriptOnly = false;
			const logDetails = true;
			return BatchProcessor(targetData, scriptOnly, logDetails);
			break;
		default:
			console.log('Skip other type of job task for now ...');
			return null;
	}
});

class Tasker {
	constructor(taskOption) {
		const { jobInfo, jobTasks } = taskOption.workerData;
		const scheduledTasks = [];
		jobTasks.forEach((task) => {
			console.log('Initializing Task: ' + JSON.stringify(task.taskName));
			var scheduledTask = {
				text: task.taskName,
				task: () => {
					// console.log('Running job task: ' + JSON.stringify(task.taskName));
					// return runRawQuery(query, task.id, false);
					return TaskExecutor(task.taskDefinition);
				}
			};
			scheduledTasks.push(scheduledTask);
		});
		this.taskHandler = schedule.scheduleJob(jobInfo.scheduleCron, function () {
			console.log('Running job: ' + jobInfo.jobName);
			taskz(scheduledTasks).run();
		});
	}
};

module.exports = { Tasker, TaskExecutor };
