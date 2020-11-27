// worker-script.js
const { parentPort, workerData } = require('worker_threads');
const Scheduler = require('node-schedule');
const taskz = require('taskz');

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
	const scheduledTasks = workerData.jobTasks.map((item) => {
		return {
			text: item.taskName,
			stopOnError: item.stopOnError,
			task: () => {
				console.log('Runing task: ' + item.taskName);
				// for (var i = 1; i < 10000000; i++) {
				// 	for (var j = 1; j < 100000; j++) { var a = j; };
				// };
			},
		};
	});
	taskz(scheduledTasks).run();
});
