const {
	GraphQLInt,
	GraphQLString,
	GraphQLList,
} = require('graphql');

const { SourceType } = require('../types');
const { Source } = require('../../models');

const sourceQuery = {
	type: new GraphQLList(SourceType),
	args: {
		id: {
			name: 'id',
			type: GraphQLInt,
		},
		targetId: {
			name: 'targetId',
			type: GraphQLInt,
		},
		sourceLabel: {
			name: 'sourceLabel',
			type: GraphQLString,
		},
		sourceData: {
			name: 'sourceData',
			type: GraphQLString,
		},
		createdAt: {
			name: 'createdAt',
			type: GraphQLString,
		},
		updatedAt: {
			name: 'updatedAt',
			type: GraphQLString,
		},
	},
	resolve: (user, args) => Source.findAll({ where: args }),
};

module.exports = { sourceQuery };
