const {
	GraphQLString,
	GraphQLInt,
	GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const { TargetType } = require('../types');
const { Target } = require('../../models');

const createTarget = {
	type: TargetType,
	description: 'The mutation that allows you to create a new Target',
	args: {
		targetLabel: {
			name: 'targetLabel',
			type: new GraphQLNonNull(GraphQLString),
		},
		targetData: {
			name: 'targetData',
			type: new GraphQLNonNull(GraphQLString),
		},
		batchControlColumn: {
			name: 'batchControlColumn',
			type: new GraphQLNonNull(GraphQLString),
		},
		batchControlSize: {
			name: 'batchControlSize',
			type: new GraphQLNonNull(GraphQLInt),
		},
		batchControlNext: {
			name: 'batchControlNext',
			type: new GraphQLNonNull(GraphQLString),
		},
		batchProcessed: {
			name: 'batchProcessed',
			type: new GraphQLNonNull(GraphQLString),
		},
		batchProcessing: {
			name: 'batchProcessing',
			type: new GraphQLNonNull(GraphQLString),
		},
		batchMicroChunkCurrent: {
			name: 'batchMicroChunkCurrent',
			type: new GraphQLNonNull(GraphQLString),
		},
		batchScheduleType: {
			name: 'batchScheduleType',
			type: new GraphQLNonNull(GraphQLString),
		},
		batchScheduleLast: {
			name: 'batchScheduleLast',
			type: new GraphQLNonNull(GraphQLString),
		},
		patternColumns: {
			name: 'patternColumns', /* ObjType */
			type: new GraphQLNonNull(GraphQLString),
		},
		groupByColumns: {
			name: 'groupByColumns', /* ObjType */
			type: new GraphQLNonNull(GraphQLString),
		},
		groupByPattern: {
			name: 'groupByPattern',
			type: new GraphQLNonNull(GraphQLString),
		},
		groupByFlexible: {
			name: 'groupByFlexible',
			type: new GraphQLNonNull(GraphQLString),
		},
		aggregateColumns: {
			name: 'aggregateColumns', /* ObjType */
			type: new GraphQLNonNull(GraphQLString),
		},
		aggregateFunctions: {
			name: 'aggregateFunctions', /* ObjType */
			type: new GraphQLNonNull(GraphQLString),
		},
		suppoetSpVersions: {
			name: 'suppoetSpVersions', /* ObjType */
			type: new GraphQLNonNull(GraphQLString),
		},
		// creatorId: {
		// 	name: 'creatorId',
		// 	type: new GraphQLNonNull(GraphQLInt),
		// },
	},
	resolve: (value, {
		targetLabel,
		targetData,
		batchControlColumn,
		batchControlSize,
		batchControlNext,
		batchProcessed,
		batchProcessing,
		batchMicroChunkCurrent,
		batchScheduleType,
		batchScheduleLast,
		patternColumns,
		groupByColumns,
		groupByPattern,
		groupByFlexible,
		aggregateColumns,
		aggregateFunctions,
		suppoetSpVersions,
		// creatorId,
	}) => (
			Target.create({
				targetLabel,
				targetData,
				batchControlColumn,
				batchControlSize,
				batchControlNext,
				batchProcessed,
				batchProcessing,
				batchMicroChunkCurrent,
				batchScheduleType,
				batchScheduleLast,
				patternColumns,
				groupByColumns,
				groupByPattern,
				groupByFlexible,
				aggregateColumns,
				aggregateFunctions,
				suppoetSpVersions,
				// creatorId,
			})
		),
};

const updateTarget = {
	type: TargetType,
	description: 'The mutation that allows you to update an existing Target by Id',
	args: {
		id: {
			name: 'id',
			type: new GraphQLNonNull(GraphQLInt),
		},
		targetLabel: {
			name: 'targetLabel',
			type: new GraphQLNonNull(GraphQLString),
		},
		targetData: {
			name: 'targetData',
			type: new GraphQLNonNull(GraphQLString),
		},
		batchControlColumn: {
			name: 'batchControlColumn',
			type: new GraphQLNonNull(GraphQLString),
		},
		batchControlSize: {
			name: 'batchControlSize',
			type: new GraphQLNonNull(GraphQLInt),
		},
		batchControlNext: {
			name: 'batchControlNext',
			type: new GraphQLNonNull(GraphQLString),
		},
		batchProcessed: {
			name: 'batchProcessed',
			type: new GraphQLNonNull(GraphQLString),
		},
		batchProcessing: {
			name: 'batchProcessing',
			type: new GraphQLNonNull(GraphQLString),
		},
		batchMicroChunkCurrent: {
			name: 'batchMicroChunkCurrent',
			type: new GraphQLNonNull(GraphQLString),
		},
		batchScheduleType: {
			name: 'batchScheduleType',
			type: new GraphQLNonNull(GraphQLString),
		},
		batchScheduleLast: {
			name: 'batchScheduleLast',
			type: new GraphQLNonNull(GraphQLString),
		},
		patternColumns: {
			name: 'patternColumns', /* ObjType */
			type: new GraphQLNonNull(GraphQLString),
		},
		groupByColumns: {
			name: 'groupByColumns', /* ObjType */
			type: new GraphQLNonNull(GraphQLString),
		},
		groupByPattern: {
			name: 'groupByPattern',
			type: new GraphQLNonNull(GraphQLString),
		},
		groupByFlexible: {
			name: 'groupByFlexible',
			type: new GraphQLNonNull(GraphQLString),
		},
		aggregateColumns: {
			name: 'aggregateColumns', /* ObjType */
			type: new GraphQLNonNull(GraphQLString),
		},
		aggregateFunctions: {
			name: 'aggregateFunctions', /* ObjType */
			type: new GraphQLNonNull(GraphQLString),
		},
		suppoetSpVersions: {
			name: 'suppoetSpVersions', /* ObjType */
			type: new GraphQLNonNull(GraphQLString),
		},
		// creatorId: {
		// 	name: 'creatorId',
		// 	type: new GraphQLNonNull(GraphQLInt),
		// },
	},
	resolve: async (value, {
		id,
		targetLabel,
		targetData,
		batchControlColumn,
		batchControlSize,
		batchControlNext,
		batchProcessed,
		batchProcessing,
		batchMicroChunkCurrent,
		batchScheduleType,
		batchScheduleLast,
		patternColumns,
		groupByColumns,
		groupByPattern,
		groupByFlexible,
		aggregateColumns,
		aggregateFunctions,
		suppoetSpVersions,
		// creatorId,
	}) => {
		const foundTarget = await Target.findByPk(id);

		if (!foundTarget) {
			throw new Error(`Target with id: ${id} not found!`);
		}

		const updatedTarget = merge(foundTarget, {
			targetLabel,
			targetData,
			batchControlColumn,
			batchControlSize,
			batchControlNext,
			batchProcessed,
			batchProcessing,
			batchMicroChunkCurrent,
			batchScheduleType,
			batchScheduleLast,
			patternColumns,
			groupByColumns,
			groupByPattern,
			groupByFlexible,
			aggregateColumns,
			aggregateFunctions,
			suppoetSpVersions,
			// creatorId,
		});

		return foundTarget.update(updatedTarget);
	},
};

const deleteTarget = {
	type: TargetType,
	description: 'The mutation that allows you to delete a existing Target by Id',
	args: {
		id: {
			name: 'id',
			type: new GraphQLNonNull(GraphQLInt),
		},
	},
	resolve: async (value, { id }) => {
		const foundTarget = await Target.findByPk(id);

		if (!foundTarget) {
			throw new Error(`Target with id: ${id} not found!`);
		}

		await Target.destroy({
			where: {
				id,
			},
		});

		return foundTarget;
	},
};

module.exports = {
	createTarget,
	updateTarget,
	deleteTarget,
};
