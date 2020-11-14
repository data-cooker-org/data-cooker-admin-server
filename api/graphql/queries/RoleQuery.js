const {
	GraphQLInt,
	GraphQLString,
	GraphQLList,
} = require('graphql');

const { RoleType } = require('../types');
const { Role } = require('../../models');

const roleQuery = {
	type: new GraphQLList(RoleType),
	args: {
		id: {
			name: 'id',
			type: GraphQLInt,
		},
		roleName: {
			name: 'roleName',
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
	resolve: (role, args) => Role.findAll({ where: args }),
};

module.exports = { roleQuery };
