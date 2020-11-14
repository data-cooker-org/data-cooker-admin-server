const {
	GraphQLString,
	GraphQLInt,
	GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const { SourceType } = require('../types');
const { Source } = require('../../models');

const createSource = {
	type: SourceType,
	description: 'The mutation that allows you to create a new Source',
	args: {
		targetId: {
			name: 'targetId',
			type: new GraphQLNonNull(GraphQLInt),
		},
		sourceLabel: {
			name: 'sourceLabel',
			type: new GraphQLNonNull(GraphQLString),
		},
		sourceData: {
			name: 'sourceData',
			type: new GraphQLNonNull(GraphQLString),
		},
		sourceEnabled: {
			name: 'sourceEnabled',
			type: new GraphQLNonNull(GraphQLString),
		},
		sourceReadyTime: {
			name: 'sourceReadyTime',
			type: new GraphQLNonNull(GraphQLString),
		},
		sourceCheckTime: {
			name: 'sourceCheckTime',
			type: new GraphQLNonNull(GraphQLString),
		},
		sourceCheckQuery: {
			name: 'sourceCheckQuery',
			type: new GraphQLNonNull(GraphQLString),
		},
		patternDefault: {
			name: 'patternDefault',
			type: new GraphQLNonNull(GraphQLString),
		},
		patternFlexible: {
			name: 'patternFlexible',
			type: new GraphQLNonNull(GraphQLString),
		},
		transformation: {
			name: 'transformation',
			type: new GraphQLNonNull(GraphQLString),
		},
		// creatorId: {
		// 	name: 'creatorId',
		// 	type: new GraphQLNonNull(GraphQLInt),
		// },
	},
	resolve: (value, {
		targetId,
		sourceLabel,
		sourceData,
		sourceEnabled,
		sourceReadyTime,
		sourceCheckTime,
		sourceCheckQuery,
		patternDefault,
		patternFlexible,
		transformation,
		// creatorId,
	}) => (
			Source.create({
				targetId,
				sourceLabel,
				sourceData,
				sourceEnabled,
				sourceReadyTime,
				sourceCheckTime,
				sourceCheckQuery,
				patternDefault,
				patternFlexible,
				transformation,
				// creatorId,
			})
		),
};

const updateSource = {
	type: SourceType,
	description: 'The mutation that allows you to update an existing Source by Id',
	args: {
		id: {
			name: 'id',
			type: new GraphQLNonNull(GraphQLInt),
		},
		targetId: {
			name: 'targetId',
			type: new GraphQLNonNull(GraphQLInt),
		},
		sourceLabel: {
			name: 'sourceLabel',
			type: new GraphQLNonNull(GraphQLString),
		},
		sourceData: {
			name: 'sourceData',
			type: new GraphQLNonNull(GraphQLString),
		},
		sourceEnabled: {
			name: 'sourceEnabled',
			type: new GraphQLNonNull(GraphQLString),
		},
		sourceReadyTime: {
			name: 'sourceReadyTime',
			type: new GraphQLNonNull(GraphQLString),
		},
		sourceCheckTime: {
			name: 'sourceCheckTime',
			type: new GraphQLNonNull(GraphQLString),
		},
		sourceCheckQuery: {
			name: 'sourceCheckQuery',
			type: new GraphQLNonNull(GraphQLString),
		},
		patternDefault: {
			name: 'patternDefault',
			type: new GraphQLNonNull(GraphQLString),
		},
		patternFlexible: {
			name: 'patternFlexible',
			type: new GraphQLNonNull(GraphQLString),
		},
		transformation: {
			name: 'transformation',
			type: new GraphQLNonNull(GraphQLString),
		},
		// creatorId: {
		// 	name: 'creatorId',
		// 	type: new GraphQLNonNull(GraphQLInt),
		// },
	},
	resolve: async (value, {
		id,
		targetId,
		sourceLabel,
		sourceData,
		sourceEnabled,
		sourceReadyTime,
		sourceCheckTime,
		sourceCheckQuery,
		patternDefault,
		patternFlexible,
		transformation,
		// creatorId,
	}) => {
		const foundSource = await Source.findByPk(id);

		if (!foundSource) {
			throw new Error(`Source with id: ${id} not found!`);
		}

		const updatedSource = merge(foundSource, {
			targetId,
			sourceLabel,
			sourceData,
			sourceEnabled,
			sourceReadyTime,
			sourceCheckTime,
			sourceCheckQuery,
			patternDefault,
			patternFlexible,
			transformation,
			// creatorId,
		});

		return foundSource.update(updatedSource);
	},
};

const deleteSource = {
	type: SourceType,
	description: 'The mutation that allows you to delete a existing Source by Id',
	args: {
		id: {
			name: 'id',
			type: new GraphQLNonNull(GraphQLInt),
		},
	},
	resolve: async (value, { id }) => {
		const foundSource = await Source.findByPk(id);

		if (!foundSource) {
			throw new Error(`Source with id: ${id} not found!`);
		}

		await Source.destroy({
			where: {
				id,
			},
		});

		return foundSource;
	},
};

module.exports = {
	createSource,
	updateSource,
	deleteSource,
};
