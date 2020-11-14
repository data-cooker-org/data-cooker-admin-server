const { check, validationResult } = require('express-validator');
const { Job, Feature } = require('../../models');


const JobController = () => {
	const getJobs = async (req, res) => {
		const sort = req.query.sort ? JSON.parse(req.query.sort) : ['jobDescription', 'ASC'];
		const range = req.query.range ? JSON.parse(req.query.range) : [0, 50];
		const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

		// Get tagets controled by query string params
		const jobs = await Job.findAll({
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
			include: [
				{
					model: Feature,
					as: 'feature',
					attributes: ['id', 'featureName'],
				},
				// { all: true, nested: true }
			],
			where: filter,
			order: [sort],
			offset: range[0],
			limit: range[1] - range[0],
		});
		res.header('Access-Control-Expose-Headers', 'X-Total-Count')
			.header('X-Total-Count', jobs.length)
			.json({ jobs });
	};


	const getJob = async (req, res) => {
		const job = await Job.findByPk(req.params.id, {
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
		});

		if (job) {
			res.json({ job });
		} else {
			res.status(404).json({ message: 'Job id not found.' });
		}
	};


	const postJob = async (req, res) => {
		// Attempt to get the validation result from the Request object.
		const errors = validationResult(req);

		// If there are validation errors...
		if (!errors.isEmpty()) {
			// Use the Array `map()` method to get a list of error messages.
			const errorMessages = errors.array().map((error) => error.msg);
			// Return the validation errors to the client.
			return res.status(400).json({ errors: errorMessages });
		}
		else {
			// Get the job from the request body.
			const job = req.body;
			// check if job already exists in Jobs table
			const existingJob = Job.findOne({
				where: {
					jobDescription: job.jobDescription
				},
			});
			// create new job if not already in Jobs table
			if (!existingJob) {
				// Create job
				await Job.create({
					// id: job.id,
					jobName: job.jobName,
					jobDescription: job.jobDescription,
					jobStatus: job.jobStatus,
					jobEnabled: job.jobEnabled,
					repeatSchedule: job.repeatSchedule,
					scheduleType: job.scheduleType,
					scheduleCron: job.scheduleCron,
					scheduleBegin: job.scheduleBegin,
					scheduleEnd: job.scheduleEnd,
					nextSchedule: job.nextSchedule,
					lastSchedule: job.lastSchedule,
					creatorId: 1,
				}).then((created) => {
					const { id } = created;
					res.json({ id }).status(201).end();
				})
			}
			else {
				res.status(400).json({ message: `Job data '${job.jobDescription}' already exists` });
			}
		}
	};


	const putJob = async (req, res) => {
		// Attempt to get the validation result from the Request object.
		const errors = validationResult(req);

		// If there are validation errors...
		if (!errors.isEmpty()) {
			// Use the Array `map()` method to get a list of error messages.
			const errorMessages = errors.array().map((error) => error.msg);
			// Return the validation errors to the client.
			return res.status(400).json({ errors: errorMessages });
		} else {
			// find existing job
			Job.findByPk(req.params.id, {
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
					// 'creatorId',
				],
			}).then((job) => {
				// if job permission matches current user's role
				if (req.token.roleId === 1) {
					// Keep original value if field is not provided
					const updatedTrget = {
						jobName: req.body.jobName ? req.body.jobName : job.jobName,
						jobDescription: req.body.jobDescription ? req.body.jobDescription : job.jobDescription,
						jobStatus: req.body.jobStatus ? req.body.jobStatus : job.jobStatus,
						jobEnabled: req.body.jobEnabled ? req.body.jobEnabled : job.jobEnabled,
						repeatSchedule: req.body.repeatSchedule ? req.body.repeatSchedule : job.repeatSchedule,
						scheduleType: req.body.scheduleType ? req.body.scheduleType : job.scheduleType,
						scheduleCron: req.body.scheduleCron ? req.body.scheduleCron : job.scheduleCron,
						scheduleBegin: req.body.scheduleBegin ? req.body.scheduleBegin : job.scheduleBegin,
						scheduleEnd: req.body.scheduleEnd ? req.body.scheduleEnd : job.scheduleEnd,
						nextSchedule: req.body.nextSchedule ? req.body.nextSchedule : job.nextSchedule,
						lastSchedule: req.body.lastSchedule ? req.body.lastSchedule : job.lastSchedule,
						// creatorId: req.body.creatorId ? req.body.creatorId : task.creatorId,
					};

					// update job details in Jobs table
					Job.update({
						// id: job.id,
						jobName: updatedTrget.jobName,
						jobDescription: updatedTrget.jobDescription,
						jobStatus: updatedTrget.jobStatus,
						jobEnabled: updatedTrget.jobEnabled,
						repeatSchedule: updatedTrget.repeatSchedule,
						scheduleType: updatedTrget.scheduleType,
						scheduleCron: updatedTrget.scheduleCron,
						scheduleBegin: updatedTrget.scheduleBegin,
						scheduleEnd: updatedTrget.scheduleEnd,
						nextSchedule: updatedTrget.nextSchedule,
						lastSchedule: updatedTrget.lastSchedule,
						// creatorId: 1,
					}, {
						where: {
							id: job.id,
						},
					}).then((updated) => {
						const { id } = updated;
						res.json({ id }).status(204).end();
					});
				} else {
					// Return a response with a 403 Client forbidden HTTP status code.
					res.status(403).json({ message: 'No permission to modify the job.' });
				}
			});
		}
	};


	const deleteJobs = async (req, res) => {
		const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

		// Only the user with admin role can do multi-deletion
		if (req.token.roleId !== 1) {
			res.status(403).json({ message: 'Only user with admin role can delete multiple rows!' });
		} else {
			// delete job from Jobs table
			Job.destroy({
				where: filter
			}).then((deleted) => {
				const { id } = deleted;
				res.json({ id }).status(204).end();
			});
		}
	};


	const deleteJob = async (req, res) => {
		// find existing job
		Job.findByPk(req.params.id, {
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
				// 'creatorId'
			]
		}).then((job) => {
			// if job permission matches current user's role
			if (req.token.roleId === 1) {
				// delete job from Jobs table
				Job.destroy({
					where: {
						id: job.id
					}
				}).then((deleted) => {
					const { id } = deleted;
					res.json({ id }).status(204).end();
				});
			} else {
				// Return a response with a 403 Client forbidden HTTP status code.
				res.status(403).json({ message: 'No permission to delete job.' });
			}
		});
	};

	return {
		getJobs,
		getJob,
		postJob,
		putJob,
		deleteJobs,
		deleteJob,
	};
};

module.exports = JobController;

