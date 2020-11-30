const { validationResult } = require('express-validator');
const { Job, Task, Feature } = require('../../models');


const TaskController = () => {
	const getTasks = async (req, res) => {
		//  Get query string params
		const sort = req.query.sort ? JSON.parse(req.query.sort) : ['taskName', 'ASC'];
		const range = req.query.range ? JSON.parse(req.query.range) : [0, 50];
		const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

		//  //  Get current taget from url query string
		//  const currentJobId = req.query.jobId ? req.query.jobId : 1;
		//  filter['jobId'] = currentJobId;

		//  Get tasks of current taget specified by query string
		const tasks = await Task.findAll({
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
			include: [
				{
					model: Feature,
					as: 'feature',
					attributes: ['id', 'featureName'],
				},
				{
					model: Job,
					as: 'job',
					attributes: ['id', 'jobName', 'scheduleType'],
				},
				// { all: true, nested: true }
			],
			where: filter,
			order: [sort],
			offset: range[0],
			limit: range[1] - range[0],
		});
		res.header('Access-Control-Expose-Headers', 'X-Total-Count')
			.header('X-Total-Count', tasks.length)
			.json({ tasks });
	};


	const getTask = async (req, res) => {
		const task = await Task.findByPk(req.params.id, {
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
			include: [
				{
					model: Job,
					as: 'job',
					attributes: ['id', 'jobName', 'scheduleType'],
				},
			],
		});

		if (task) {
			res.json(task);
		} else {
			res.status(404).json({ message: 'Task id not found.' });
		}
	};


	const postTask = async (req, res) => {
		//  Attempt to get the validation result from the Request object.
		const errors = validationResult(req);

		//  If there are validation errors...
		if (!errors.isEmpty()) {
			//  Use the Array `map()` method to get a list of error messages.
			const errorMessages = errors.array().map((error) => error.msg);
			//  Return the validation errors to the client.
			return res.status(400).json({ errors: errorMessages });
		} else {
			//  get the job from the request body.
			const task = req.body;

			//  Create job
			const addedTask = await Task.create({
				// id: task.id,
				jobId: task.jobId,
				jobStep: task.jobStep,
				taskName: task.taskName,
				taskDefinition: task.taskDefinition,
				taskDescription: task.taskDescription,
				taskFeatureId: task.taskFeatureId ? task.taskFeatureId : Date.now(),
				taskStatus: task.taskStatus,
				stopOnError: task.stopOnError,
				lastScheduledTime: task.lastScheduledTime,
				lastCompleteTime: task.lastCompleteTime,
				creatorId: 1,
			}).then((created) => {
				const { id } = created;
				// res.json({ id }).status(201).end();
				//  Set the status to 201 Created, set Location header, and end the response.
				res.json({ id }).location(`/tasks/${id}`).status(201).end();
			})
		}
	};


	const putTask = async (req, res) => {
		//  Attempt to get the validation result from the Request object.
		const errors = validationResult(req);

		//  If there are validation errors...
		if (!errors.isEmpty()) {
			//  Use the Array `map()` method to get a list of error messages.
			const errorMessages = errors.array().map((error) => error.msg);
			//  Return the validation errors to the client.
			return res.status(400).json({ errors: errorMessages });
		} else {
			//  find existing task
			const task = await Task.findByPk(req.params.id, {
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
					// 'creatorId',
				],
				include: [
					{
						model: Job,
						as: 'job',
						attributes: ['id', 'jobName', 'scheduleType']
					}
				]
			});

			//  if task exists
			if (task) {
				//  if task permission matches current user's role
				if (req.token.roleId === 1) {
					//  Keep original value if field is not provided
					const updatedTask = {
						jobId: req.body.jobId ? req.body.jobId : task.jobId,
						jobStep: req.body.jobStep ? req.body.jobStep : task.jobStep,
						taskName: req.body.taskName ? req.body.taskName : task.taskName,
						taskDefinition: req.body.taskDefinition ? req.body.taskDefinition : task.taskDefinition,
						taskDescription: req.body.taskDescription ? req.body.taskDescription : task.taskDescription,
						taskFeatureId: req.body.taskFeatureId ? req.body.taskFeatureId : task.taskFeatureId,
						taskStatus: req.body.taskStatus ? req.body.taskStatus : task.taskStatus,
						stopOnError: req.body.stopOnError ? req.body.stopOnError : task.stopOnError,
						lastScheduledTime: req.body.lastScheduledTime ? req.body.lastScheduledTime : task.lastScheduledTime,
						lastCompleteTime: req.body.lastCompleteTime ? req.body.lastCompleteTime : task.lastCompleteTime,
						// creatorId: req.body.creatorId ? req.body.creatorId : task.creatorId,
					};

					//  update task details in Tasks table
					await Task.update({
						jobId: updatedTask.jobId,
						jobStep: updatedTask.jobStep,
						taskName: updatedTask.taskName,
						taskDefinition: updatedTask.taskDefinition,
						taskDescription: updatedTask.taskDescription,
						taskFeatureId: updatedTask.taskFeatureId,
						taskStatus: updatedTask.taskStatus,
						stopOnError: updatedTask.stopOnError,
						lastScheduledTime: updatedTask.lastScheduledTime,
						lastCompleteTime: updatedTask.lastCompleteTime,
						// creatorId: 1
					}, {
						where: {
							id: task.id
						}
					}).then((updated) => {
						const { id } = updated;
						res.json({ id }).status(204).end();
					});
				} else {
					//  Return a response with a 403 Client forbidden HTTP status code.
					res.status(403).json({ message: 'Access not permitted' });
				}
			} else {
				res.status(404).json({ message: 'Task not found.' });
			}
		}
	};


	const deleteTasks = async (req, res) => {
		const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

		// Only the user with admin role can do multi-deletion
		if (req.token.roleId !== 1) {
			res.status(403).json({ message: 'Only user with admin role can delete multiple rows!' });
		} else {
			//  delete job from Jobs table
			Task.destroy({
				where: filter
			}).then((deleted) => {
				const { id } = deleted;
				res.json({ id }).status(204).end();
			});
		}
	};


	const deleteTask = async (req, res) => {
		//  find existing task
		const task = await Task.findByPk(req.params.id, {
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
				// 'creatorId'
			],
			include: [
				{
					model: Job,
					as: 'job',
					attributes: ['id', 'jobName', 'scheduleType']
				}
			]
		}).then((task) => {
			//  if task permission matches current user's role
			if (req.token.roleId === 1) {
				//  delete task from Tasks table
				const deletedTask = Task.destroy(
					{
						where: {
							id: task.id
						}
					}
				).then((deleted) => {
					const { id } = deleted;
					res.json({ id }).status(204).end();
				});
			} else {
				//  Return a response with a 403 Client forbidden HTTP status code.
				res.status(403).json({ message: 'Access not permitted' });
			}
		})
	};

	return {
		getTasks,
		getTask,
		postTask,
		putTask,
		deleteTasks,
		deleteTask
	};
};

module.exports = TaskController;

