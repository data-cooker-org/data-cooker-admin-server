const { check, validationResult } = require('express-validator');
const { Target, Feature } = require('../../models');


const TargetController = () => {
	const getTargets = async (req, res) => {
		// Get query string params
		const sort = req.query.sort ? JSON.parse(req.query.sort) : ['targetData', 'ASC'];
		const range = req.query.range ? JSON.parse(req.query.range) : [0, 50];
		const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

		// Get tagets controled by query string params
		const targets = await Target.findAll({
			attributes: [
				'id',
				'targetLabel',
				'targetData',
				'batchControlColumn',
				'batchControlSize',
				'batchControlNext',
				'batchProcessed',
				'batchProcessing',
				'batchMicroChunkCurrent',
				'batchScheduleType',
				'batchScheduleLast',
				'patternColumns',
				'groupByColumns',
				'groupByPattern',
				'groupByFlexible',
				'aggregateColumns',
				'aggregateFunctions',
				'suppoetSpVersions',
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
			.header('X-Total-Count', targets.length)
			.json({ targets });
	};


	const getTarget = async (req, res) => {
		const target = await Target.findByPk(req.params.id, {
			attributes: [
				'id',
				'targetLabel',
				'targetData',
				'batchControlColumn',
				'batchControlSize',
				'batchControlNext',
				'batchProcessed',
				'batchProcessing',
				'batchMicroChunkCurrent',
				'batchScheduleType',
				'batchScheduleLast',
				'patternColumns',
				'groupByColumns',
				'groupByPattern',
				'groupByFlexible',
				'aggregateColumns',
				'aggregateFunctions',
				'suppoetSpVersions',
				'creatorId',
			],
		});

		if (target) {
			res.json({ target });
		} else {
			res.status(404).json({ message: 'Target id not found.' });
		}
	};


	const postTarget = async (req, res) => {
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
			// Get the target from the request body.
			const target = req.body;
			// check if target already exists in Targets table
			const existingTarget = Target.findOne({
				where: {
					targetData: target.targetData
				},
			});
			// create new target if not already in Targets table
			if (!existingTarget) {
				// Create target
				await Target.create({
					// id: target.id,
					targetLabel: target.targetLabel,
					targetData: target.targetData,
					batchControlColumn: target.batchControlColumn,
					batchControlSize: target.batchControlSize,
					batchControlNext: target.batchControlNext,
					batchProcessed: target.batchProcessed,
					batchProcessing: target.batchProcessing ? target.batchProcessing : Date.now(),
					batchMicroChunkCurrent: target.batchMicroChunkCurrent,
					batchScheduleType: target.batchScheduleType,
					batchScheduleLast: target.batchScheduleLast,
					patternColumns: target.patternColumns,
					groupByColumns: target.groupByColumns,
					groupByPattern: target.groupByPattern,
					groupByFlexible: target.groupByFlexible,
					aggregateColumns: target.aggregateColumns,
					aggregateFunctions: target.aggregateFunctions,
					suppoetSpVersions: target.suppoetSpVersions,
					creatorId: 1,
				}).then((created) => {
					const { id } = created;
					res.json({ id }).status(201).end();
				})
			}
			else {
				res.status(400).json({ message: `Target data '${target.targetData}' already exists` });
			}
		}
	};


	const putTarget = async (req, res) => {
		// Attempt to get the validation result from the Request object.
		const errors = validationResult(req);

		// If there are validation errors...
		if (!errors.isEmpty()) {
			// Use the Array `map()` method to get a list of error messages.
			const errorMessages = errors.array().map((error) => error.msg);
			// Return the validation errors to the client.
			return res.status(400).json({ errors: errorMessages });
		} else {
			// find existing target
			Target.findByPk(req.params.id, {
				attributes: [
					'id',
					'targetLabel',
					'targetData',
					'batchControlColumn',
					'batchControlSize',
					'batchControlNext',
					'batchProcessed',
					'batchProcessing',
					'batchMicroChunkCurrent',
					'batchScheduleType',
					'batchScheduleLast',
					'patternColumns',
					'groupByColumns',
					'groupByPattern',
					'groupByFlexible',
					'aggregateColumns',
					'aggregateFunctions',
					'suppoetSpVersions',
					// 'creatorId',
				],
			}).then((target) => {
				// if target permission matches current user's role
				if (req.token.roleId === 1) {
					// Keep original value if field is not provided
					const updatedTrget = {
						targetLabel: req.body.targetLabel ? req.body.targetLabel : target.targetLabel,
						targetData: req.body.targetData ? req.body.targetData : target.targetData,
						batchControlColumn: req.body.batchControlColumn ? req.body.batchControlColumn : target.batchControlColumn,
						batchControlSize: req.body.batchControlSize ? req.body.batchControlSize : target.batchControlSize,
						batchControlNext: req.body.batchControlNext ? req.body.batchControlNext : target.batchControlNext,
						batchProcessed: req.body.batchProcessed ? req.body.batchProcessed : target.batchProcessed,
						batchProcessing: req.body.batchProcessing ? req.body.batchProcessing : target.batchProcessing,
						batchMicroChunkCurrent: req.body.batchMicroChunkCurrent ? req.body.batchMicroChunkCurrent : target.batchMicroChunkCurrent,
						batchScheduleType: req.body.batchScheduleType ? req.body.batchScheduleType : target.batchScheduleType,
						batchScheduleLast: req.body.batchScheduleLast ? req.body.batchScheduleLast : target.batchScheduleLast,
						patternColumns: req.body.patternColumns ? req.body.patternColumns : target.patternColumns,
						groupByColumns: req.body.groupByColumns ? req.body.groupByColumns : target.groupByColumns,
						groupByPattern: req.body.groupByPattern ? req.body.groupByPattern : target.groupByPattern,
						groupByFlexible: req.body.groupByFlexible ? req.body.groupByFlexible : target.groupByFlexible,
						aggregateColumns: req.body.aggregateColumns ? req.body.aggregateColumns : target.aggregateColumns,
						aggregateFunctions: req.body.aggregateFunctions ? req.body.aggregateFunctions : target.aggregateFunctions,
						suppoetSpVersions: req.body.suppoetSpVersions ? req.body.suppoetSpVersions : target.suppoetSpVersions,
					};

					// update target details in Targets table
					Target.update({
						// id: target.id,
						targetLabel: updatedTrget.targetLabel,
						targetData: updatedTrget.targetData,
						batchControlColumn: updatedTrget.batchControlColumn,
						batchControlSize: updatedTrget.batchControlSize,
						batchControlNext: updatedTrget.batchControlNext,
						batchProcessed: updatedTrget.batchProcessed,
						batchProcessing: updatedTrget.batchProcessing,
						batchMicroChunkCurrent: updatedTrget.batchMicroChunkCurrent,
						batchScheduleType: updatedTrget.batchScheduleType,
						batchScheduleLast: updatedTrget.batchScheduleLast,
						patternColumns: updatedTrget.patternColumns,
						groupByColumns: updatedTrget.groupByColumns,
						groupByPattern: updatedTrget.groupByPattern,
						groupByFlexible: updatedTrget.groupByFlexible,
						aggregateColumns: updatedTrget.aggregateColumns,
						aggregateFunctions: updatedTrget.aggregateFunctions,
						suppoetSpVersions: updatedTrget.suppoetSpVersions,
						// creatorId: 1,
					}, {
						where: {
							id: target.id,
						},
					}).then((updated) => {
						const { id } = updated;
						res.json({ id }).status(204).end();
					});
				} else {
					// Return a response with a 403 Client forbidden HTTP status code.
					res.status(403).json({ message: 'No permission to modify the target.' });
				}
			});
		}
	};


	const deleteTargets = async (req, res) => {
		const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

		// Only the user with admin role can do multi-deletion
		if (req.token.roleId !== 1) {
			res.status(403).json({ message: 'Only user with admin role can delete multiple rows!' });
		} else {
			// delete target from Targets table
			Target.destroy({
				where: filter
			}).then((deleted) => {
				res.status(204).end(deleted);
			});
		}
	};


	const deleteTarget = async (req, res) => {
		// find existing target
		Target.findByPk(req.params.id, {
			attributes: [
				'id',
				'targetLabel',
				'targetData',
				'batchControlColumn',
				'batchControlSize',
				'batchControlNext',
				'batchProcessed',
				'batchProcessing',
				'batchMicroChunkCurrent',
				'batchScheduleType',
				'batchScheduleLast',
				'patternColumns',
				'groupByColumns',
				'groupByPattern',
				'groupByFlexible',
				'aggregateColumns',
				'aggregateFunctions',
				'suppoetSpVersions',
				// 'creatorId'
			]
		}).then((target) => {
			// if target permission matches current user's role
			if (req.token.roleId === 1) {
				// delete target from Targets table
				Target.destroy({
					where: {
						id: target.id
					}
				}).then((deleted) => {
					const { id } = deleted;
					res.json({ id }).status(204).end();
				});
			} else {
				// Return a response with a 403 Client forbidden HTTP status code.
				res.status(403).json({ message: 'No permission to delete target.' });
			}
		});
	};

	return {
		getTargets,
		getTarget,
		postTarget,
		putTarget,
		deleteTargets,
		deleteTarget
	};
};

module.exports = TargetController;
