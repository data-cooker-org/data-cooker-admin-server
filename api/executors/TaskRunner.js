const schedule = require('node-schedule');
const taskz = require("taskz");

const db = require('../models');
const Aggregator = require('./AggExecutor/Aggregator');

const runRawQuery = (query, id, sourceEnabled) => {
	db.sequelize.query(query, {
		replacements: { sourceId: id, sourceEnabled: sourceEnabled },
		raw: false,
		type: db.sequelize.QueryTypes.SELECT
	}).then(sources => {
		console.log(sources);
		// 	let.push(item);
		return sources;
	});
};

const taskExecutor = (taskDefinition => {
	const { featureId, targetData } = JSON.parse(taskDefinition);
	switch (featureId) {
		case 2:
			const scriptOnly = false;
			const logDetails = true;
			return Aggregator().BatchProcessor(targetData, scriptOnly, logDetails);
			break;
		default:
			console.log("Skip other type of job task for now ...");
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
					return taskExecutor(task.taskDefinition);
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

module.exports = Tasker;
