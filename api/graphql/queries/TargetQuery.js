const {
	GraphQLInt,
	GraphQLString,
	GraphQLList,
} = require('graphql');

const { TargetType } = require('../types');
const { Target } = require('../../models');

const targetQuery = {
	type: new GraphQLList(TargetType),
	args: {
		id: {
			name: 'id',
			type: GraphQLInt,
		},
		targetLabel: {
			name: 'targetLabel',
			type: GraphQLString,
		},
		targetData: {
			name: 'targetData',
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
	resolve: (target, args) => Target.findAll({ where: args }),
};

module.exports = { targetQuery };
