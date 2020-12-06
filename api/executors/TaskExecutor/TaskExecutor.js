const { Worker, Port, isMainThread, parentPort, workerData } = require('worker_threads');
const schedule = require('node-schedule');
const taskz = require('taskz');

const db = require('../../models');

module.exports = () => {
	class TaskExecutor {
		static name = 'TaskExecutor';

		static TaskRouter = (Executors, taskDefinition) => {
			console.log(Executors);
			// console.log(taskDefinition);
			const { featureId, targetData } = JSON.parse(taskDefinition);
			switch (featureId) {
				case 2:
					const scriptOnly = false;
					const logDetails = true;
					return Executors['AggExecutor'].BatchProcessor(targetData, scriptOnly, logDetails);
					break;
				default:
					console.log('Skip other type of job task for now ...');
					return null;
			}
		};

		static Tasker = class {
			// static name = 'Tasker';
			constructor(Executors, taskOption) {
				const { jobInfo, jobTasks } = taskOption.workerData;
				const scheduledTasks = [];
				jobTasks.forEach((task) => {
					console.log('Initializing Task: ' + JSON.stringify(task.taskName));
					var scheduledTask = {
						text: task.taskName,
						task: () => {
							// console.log('Running job task: ' + JSON.stringify(task.taskName));
							// return runRawQuery(query, task.id, false);
							return Executors['TaskExecutor'].TaskRouter(Executors, task.taskDefinition);
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

		static getAllJobs = () => {
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

		static getJobTasks = (jobId) => {
			const tasks = db.Task.findAll({
				attributes: [
					'id',
					'jobId',
					'jobStep',
					'taskName',
					'taskDefinition',
					'taskDescription',
					'taskFeatureId',
					'taskStatus',
					'stopOnError',
					'lastScheduledTime',
					'lastCompleteTime',
					'creatorId',
				],
				where: { 'jobId': jobId },
				order: ['jobStep'],
			});
			return tasks;
		};

		static runTasker = (Executors, jobInfo) => {
			this.getJobTasks(jobInfo.id).then((tasks) => {
				var jobTasks = [];
				for (var i = 0; i < tasks.length; i++) {
					const taskInfo = tasks[i].dataValues;
					console.log('Collecting task data: ' + JSON.stringify(taskInfo.taskName));
					jobTasks.push(taskInfo);
				}
				const jobDetail = { jobInfo, jobTasks };
				const { Tasker } = Executors['TaskExecutor'];
				const tasker = new Tasker(Executors, { workerData: jobDetail });

				// do some settings here
				return tasker;
			});
		}

		static runWorker = (path, jobInfo) => {
			this.getJobTasks(jobInfo.id).then((tasks) => {
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
	}

	return TaskExecutor;
};
