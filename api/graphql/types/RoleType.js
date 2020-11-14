const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLList,
} = require('graphql');

const { UserType } = require('./UserType');

const RoleType = new GraphQLObjectType({
	name: 'Role',
	description: 'This represents a Role',
	fields: () => ({
		id: {
			type: GraphQLInt,
			resolve: (role) => role.id,
		},
		roleName: {
			type: GraphQLString,
			resolve: (role) => role.roleName,
		},
		users: {
			type: new GraphQLList(UserType),
			resolve: (role) => role.getUsers(),
		},
		createdAt: {
			type: GraphQLString,
			resolve: (role) => role.createdAt,
		},
		updatedAt: {
			type: GraphQLString,
			resolve: (role) => role.updatedAt,
		},
	}),
});

module.exports = { RoleType };
