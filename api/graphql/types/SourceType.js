const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
} = require('graphql');

const SourceType = new GraphQLObjectType({
	name: 'Source',
	description: 'This represents a Source',
	fields: () => ({
		id: {
			type: GraphQLInt,
			resolve: (source) => source.id,
		},
		targetId: {
			type: GraphQLInt,
			resolve: (source) => source.targetId,
		},
		sourceLabel: {
			type: GraphQLString,
			resolve: (source) => source.sourceLabel,
		},
		sourceData: {
			type: GraphQLString,
			resolve: (source) => source.sourceData,
		},
		sourceEnabled: {
			type: GraphQLInt,
			resolve: (source) => source.sourceEnabled,
		},
		sourceReadyTime: {
			type: GraphQLString,
			resolve: (source) => source.sourceReadyTime,
		},
		sourceCheckTime: {
			type: GraphQLString,
			resolve: (source) => source.sourceCheckTime,
		},
		sourceCheckQuery: {
			type: GraphQLString,
			resolve: (source) => source.sourceCheckQuery,
		},
		patternDefault: {
			type: GraphQLInt,
			resolve: (source) => source.patternDefault,
		},
		patternFlexible: {
			type: GraphQLInt,
			resolve: (source) => source.patternFlexible,
		},
		transformation: {
			type: GraphQLString,
			resolve: (source) => source.transformation,
		},
		// creatorId: {
		// 	type: GraphQLInt,
		// 	resolve: (source) => source.creatorId,
		// },
		createdAt: {
			type: GraphQLString,
			resolve: (source) => source.createdAt,
		},
		updatedAt: {
			type: GraphQLString,
			resolve: (source) => source.createdAt,
		},
	}),
});

module.exports = { SourceType };
