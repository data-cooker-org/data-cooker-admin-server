const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLList,
} = require('graphql');

const { SourceType } = require('./SourceType');

const TargetType = new GraphQLObjectType({
	name: 'Target',
	description: 'This represents a Target',
	fields: () => ({
		id: {
			type: GraphQLInt,
			resolve: (target) => target.id,
		},
		targetLabel: {
			type: GraphQLString,
			resolve: (target) => target.targetLabel,
		},
		targetData: {
			type: GraphQLString,
			resolve: (target) => target.targetData,
		},
		batchControlColumn: {
			type: GraphQLString,
			resolve: (target) => target.batchControlColumn,
		},
		batchControlSize: {
			type: GraphQLInt,
			resolve: (target) => target.batchControlSize,
		},
		batchControlNext: {
			type: GraphQLString,
			resolve: (target) => target.batchControlNext,
		},
		batchProcessed: {
			type: GraphQLInt,
			resolve: (target) => target.batchProcessed,
		},
		batchProcessing: {
			type: GraphQLInt,
			resolve: (target) => target.batchProcessing,
		},
		batchMicroChunkCurrent: {
			type: GraphQLInt,
			resolve: (target) => target.batchMicroChunkCurrent,
		},
		batchScheduleType: {
			type: GraphQLString,
			resolve: (target) => target.batchScheduleType,
		},
		batchScheduleLast: {
			type: GraphQLInt,
			resolve: (target) => target.batchScheduleLast,
		},
		patternColumns: {
			type: GraphQLString, /* ObjType */
			resolve: (target) => target.patternColumns,
		},
		groupByColumns: {
			type: GraphQLString, /* ObjType */
			resolve: (target) => target.groupByColumns,
		},
		groupByPattern: {
			type: GraphQLInt,
			resolve: (target) => target.groupByPattern,
		},
		groupByFlexible: {
			type: GraphQLInt,
			resolve: (target) => target.groupByFlexible,
		},
		aggregateColumns: {
			type: GraphQLString, /* ObjType */
			resolve: (target) => target.aggregateColumns,
		},
		aggregateFunctions: {
			type: GraphQLString, /* ObjType */
			resolve: (target) => target.aggregateFunctions,
		},
		suppoetSpVersions: {
			type: GraphQLString, /* ObjType */
			resolve: (target) => target.suppoetSpVersions,
		},
		// creatorId: {
		// 	type: GraphQLInt,
		// 	resolve: (target) => target.creatorId,
		// },
		sources: {
			type: new GraphQLList(SourceType),
			resolve: (target) => target.getSources(),
		},
		createdAt: {
			type: GraphQLString,
			resolve: (target) => target.createdAt,
		},
		updatedAt: {
			type: GraphQLString,
			resolve: (target) => target.updatedAt,
		},
	}),
});

module.exports = { TargetType };
