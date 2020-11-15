// const { json } = require('body-parser');
// const path = require('path');
const { Worker, Port, isMainThread, parentPort, workerData } = require('worker_threads');

const schedule = require('node-schedule');
const taskz = require("taskz");

const { Job, Task } = require('../models');

class Tasker {
	taskHandler;
	constructor(taskOption) {
		const { jobInfo, jobTasks } = taskOption.workerData;
		const scheduledTasks = [];
		jobTasks.forEach((task) => {
			console.log('Initializing Task: ' + JSON.stringify(task.taskName));
			var scheduledTask = {
				text: task.taskName,
				task: () => {
					console.log('Running job task: ' + JSON.stringify(task.taskName));
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
			where: { jobEnabled: 1 },
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
