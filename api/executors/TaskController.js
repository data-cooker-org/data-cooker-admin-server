// const { json } = require('body-parser');
// const path = require('path');
const Tasker = require('./TaskRunner');
const { Worker, Port, isMainThread, parentPort, workerData } = require('worker_threads');
// const { Sequelize, QueryTypes } = require('sequelize');
// const sequelize = require('../../config/database');
// const sequelize = new Sequelize(db);
// const sequelize = new Sequelize('../../config/database');

const db = require('../models');
// const { Job, Task, Target } = require('../models');

const TaskController = () => {
	const getAllJobs = () => {
		const jobs = db.Job.findAll({
			attributes: [
				'id',
				'jobName',
				'jobDescription',
				'jobStatus',
				'jobEnabled',
				'repeatSchedule',
				'scheduleType',
				'scheduleCron',
				'scheduleBegin',
				'scheduleEnd',
				'nextSchedule',
				'lastSchedule',
				'creatorId',
			],
			where: { jobEnabled: true },
		});
		return jobs;
	};

	const getJobTasks = (jobId) => {
		const tasks = db.Task.findAll({
			attributes: [
				'id',
				'jobId',
				'jobStep',
				'taskName',
				'taskDefinition',
				'taskDescription',
				'taskWorker',
				'taskStatus',
				'stopOnError',
				'lastScheduledTime',
				'lastCompleteTime',
				'creatorId',
			],
			where: { "jobId": jobId },
			order: ['jobStep'],
		});
		return tasks;
	};

	const runTasker = (jobInfo) => {
		getJobTasks(jobInfo.id).then((tasks) => {
			var jobTasks = [];
			for (var i = 0; i < tasks.length; i++) {
				const taskInfo = tasks[i].dataValues;
				console.log('Collecting task data: ' + JSON.stringify(taskInfo.taskName));
				jobTasks.push(taskInfo);
			}
			const jobDetail = { jobInfo, jobTasks };
			const worker = new Tasker({ workerData: jobDetail });

			// do some settings here
			return worker;
		});
	}

	const runWorker = (path, jobInfo) => {
		getJobTasks(jobInfo.id).then((tasks) => {
			var jobTasks = [];
			for (var i = 0; i < tasks.length; i++) {
				const taskInfo = tasks[i].dataValues;
				console.log('Initializing task: ' + JSON.stringify(taskInfo.taskName));
				jobTasks.push(taskInfo);
			}
			const jobDetail = { jobInfo, jobTasks };
			const worker = new Worker(path, { workerData: jobDetail });
			worker.on('message', (output) => console.log(output));
			worker.on('error', (error) => console.log(error));
			worker.on('exit', (code) => {
				if (code !== 0)
					throw new Error(`Worker stopped with exit code ${code}`);
			});
			return worker;
		});
	}

	return {
		getAllJobs,
		getJobTasks,
		runTasker,
		runWorker
	};
};


module.exports = TaskController;