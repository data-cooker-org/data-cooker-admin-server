// const { json } = require('body-parser');
// const path = require('path');
const { Worker, Port, isMainThread, parentPort, workerData } = require('worker_threads');
const { Sequelize, QueryTypes } = require('sequelize');
const sequelize = require('../../config/database');
// const sequelize = new Sequelize(db);
// const sequelize = new Sequelize('../../config/database');

const schedule = require('node-schedule');
const taskz = require("taskz");

const { Job, Task, Target } = require('../models');

const taskService = () => {
	const getAllJobs = () => {
		const jobs = Job.findAll({
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
		const tasks = Task.findAll({
			attributes: [
				'id',
				'jobId',
				'jobStep',
				'taskName',
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

	const runRawQuery = (query) => {
		const results = sequelize.query(query, { 
			raw: true, 
			model: Target,
			tableNames: ["agg_Targets"],
			type: QueryTypes.SELECT 
		});
		return results;
	};

	class Tasker {
		taskHandler;
		constructor(taskOption) {
			const { jobInfo, jobTasks } = taskOption.workerData;
			const scheduledTasks = [];
			jobTasks.forEach((task) => {
				console.log('Initializing Task: ' + JSON.stringify(task.taskName));
				const query = `SELECT * FROM agg_Targets AS Target`;
				var scheduledTask = {
					text: task.taskName,
					task: () => {
						console.log('Running job task: ' + JSON.stringify(task.taskName));
						console.log(runRawQuery(query));
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

	const runTasker = (jobInfo) => {
		getJobTasks(jobInfo.id).then((tasks) => {
			var jobTasks = [];
			for (var i = 0; i < tasks.length; i++) {
				const taskInfo = tasks[i].dataValues;
				console.log('Initializing task: ' + JSON.stringify(taskInfo.taskName));
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


module.exports = taskService;
