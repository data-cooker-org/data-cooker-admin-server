const { validationResult } = require('express-validator');
const { Target, Source, Feature } = require('../../models');


const SourceController = () => {
	const getSources = async (req, res) => {
		//  Get query string params
		const sort = req.query.sort ? JSON.parse(req.query.sort) : ['sourceData', 'ASC'];
		const range = req.query.range ? JSON.parse(req.query.range) : [0, 50];
		const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

		//  //  Get current taget from url query string
		//  const currentTargetId = req.query.targetId ? req.query.targetId : 1;
		//  filter['targetId'] = currentTargetId;

		//  Get sources of current taget specified by query string
		const sources = await Source.findAll({
			attributes: [
				'id',
				'targetId',
				'sourceLabel',
				'sourceData',
				'sourceEnabled',
				'sourceReadyTime',
				'sourceCheckTime',
				'sourceCheckQuery',
				'patternDefault',
				'patternFlexible',
				'transformation',
				'creatorId',
			],
			include: [
				{
					model: Feature,
					as: 'feature',
					attributes: ['id', 'featureName'],
				},
				{
					model: Target,
					as: 'target',
					attributes: ['id', 'targetLabel', 'targetData'],
				},
				// { all: true, nested: true }
			],
			where: filter,
			order: [sort],
			offset: range[0],
			limit: range[1] - range[0],
		});
		res.header('Access-Control-Expose-Headers', 'X-Total-Count')
			.header('X-Total-Count', sources.length)
			.json({ sources });
	};


	const getSource = async (req, res) => {
		const source = await Source.findByPk(req.params.id, {
			attributes: [
				'id',
				'targetId',
				'sourceLabel',
				'sourceData',
				'sourceEnabled',
				'sourceReadyTime',
				'sourceCheckTime',
				'sourceCheckQuery',
				'patternDefault',
				'patternFlexible',
				'transformation',
				'creatorId',
			],
			include: [
				{
					model: Target,
					as: 'target',
					attributes: ['id', 'targetLabel', 'targetData'],
				},
			],
		});

		if (source) {
			res.json({ source });
		} else {
			res.status(404).json({ message: 'Source id not found.' });
		}
	};


	const postSource = async (req, res) => {
		//  Attempt to get the validation result from the Request object.
		const errors = validationResult(req);

		//  If there are validation errors...
		if (!errors.isEmpty()) {
			//  Use the Array `map()` method to get a list of error messages.
			const errorMessages = errors.array().map((error) => error.msg);
			//  Return the validation errors to the client.
			return res.status(400).json({ errors: errorMessages });
		} else {

			//  get the target from the request body.
			const source = req.body;

			//  Create target
			const addedSource = await Source.create({
				// id: source.id,
				targetId: source.targetId,
				sourceLabel: source.sourceLabel,
				sourceData: source.sourceData,
				sourceEnabled: source.sourceEnabled,
				sourceReadyTime: source.sourceReadyTime ? source.sourceReadyTime : Date.now(),
				sourceCheckTime: source.sourceCheckTime,
				sourceCheckQuery: source.sourceCheckQuery,
				patternDefault: source.patternDefault,
				patternFlexible: source.patternFlexible,
				transformation: source.transformation,
				creatorId: 1,
			}).then((created) => {
				const { id } = created;
				// res.json({ id }).status(201).end();
				//  Set the status to 201 Created, set Location header, and end the response.
				res.json({ id }).location(`/sources/${id}`).status(201).end();
			})
		}
	};


	const putSource = async (req, res) => {
		//  Attempt to get the validation result from the Request object.
		const errors = validationResult(req);

		//  If there are validation errors...
		if (!errors.isEmpty()) {
			//  Use the Array `map()` method to get a list of error messages.
			const errorMessages = errors.array().map((error) => error.msg);
			//  Return the validation errors to the client.
			return res.status(400).json({ errors: errorMessages });
		} else {
			//  find existing source
			const source = await Source.findByPk(req.params.id, {
				attributes: [
					'id',
					'targetId',
					'sourceLabel',
					'sourceData',
					'sourceEnabled',
					'sourceReadyTime',
					'sourceCheckTime',
					'sourceCheckQuery',
					'patternDefault',
					'patternFlexible',
					'transformation',
					// 'creatorId',
				],
				include: [
					{
						model: Target,
						as: 'target',
						attributes: ['id', 'targetLabel', 'targetData']
					}
				]
			});

			//  if source exists
			if (source) {
				//  if source permission matches current user's role
				if (req.token.roleId === 1) {
					//  Keep original value if field is not provided
					const updatedSource = {
						targetId: req.body.targetId ? req.body.targetId : source.targetId,
						sourceLabel: req.body.sourceLabel ? req.body.sourceLabel : source.sourceLabel,
						sourceData: req.body.sourceData ? req.body.sourceData : source.sourceData,
						sourceEnabled: req.body.sourceEnabled ? req.body.sourceEnabled : source.sourceEnabled,
						sourceReadyTime: req.body.sourceReadyTime ? req.body.sourceReadyTime : source.sourceReadyTime,
						sourceCheckTime: req.body.sourceCheckTime ? req.body.sourceCheckTime : source.sourceCheckTime,
						sourceCheckQuery: req.body.sourceCheckQuery ? req.body.sourceCheckQuery : source.sourceCheckQuery,
						patternDefault: req.body.patternDefault ? req.body.patternDefault : source.patternDefault,
						patternFlexible: req.body.patternFlexible ? req.body.patternFlexible : source.patternFlexible,
						transformation: req.body.transformation ? req.body.transformation : source.transformation,
						// creatorId: req.body.creatorId ? req.body.creatorId : source.creatorId,
					};

					//  update source details in Sources table
					await Source.update({
						targetId: updatedSource.targetId,
						sourceLabel: updatedSource.sourceLabel,
						sourceData: updatedSource.sourceData,
						sourceEnabled: updatedSource.sourceEnabled,
						sourceReadyTime: updatedSource.sourceReadyTime,
						sourceCheckTime: updatedSource.sourceCheckTime,
						sourceCheckQuery: updatedSource.sourceCheckQuery,
						patternDefault: updatedSource.patternDefault,
						patternFlexible: updatedSource.patternFlexible,
						transformation: updatedSource.transformation,
						// creatorId: 1
					}, {
						where: {
							id: source.id
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
				res.status(404).json({ message: 'Source not found.' });
			}
		}
	};

	const deleteSources = async (req, res) => {
		const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

		if (req.token.roleId !== 1) {
			res.status(403).json({ message: 'Only user with admin role can delete multiple rows!' });
		} else {
			Source.destroy({
				where: filter
			}).then((deleted) => {
				const { id } = deleted;
				res.json({ id }).status(204).end();
			});
		}
	};

	const deleteSource = async (req, res) => {
		//  find existing source
		const source = await Source.findByPk(req.params.id, {
			attributes: [
				'id',
				'targetId',
				'sourceLabel',
				'sourceData',
				'sourceEnabled',
				'sourceReadyTime',
				'sourceCheckTime',
				'sourceCheckQuery',
				'patternDefault',
				'patternFlexible',
				'transformation',
				// 'creatorId'
			],
			include: [
				{
					model: Target,
					as: 'target',
					attributes: ['id', 'targetLabel', 'targetData']
				}
			]
		}).then((source) => {
			//  if source permission matches current user's role
			if (req.token.roleId === 1) {
				//  delete source from Sources table
				const deletedSource = Source.destroy(
					{
						where: {
							id: source.id
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
		getSources,
		getSource,
		postSource,
		putSource,
		deleteSources,
		deleteSource
	};
};

module.exports = SourceController;
