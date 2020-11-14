const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLList,
} = require('graphql');

const { NoteType } = require('./NoteType');

const UserType = new GraphQLObjectType({
	name: 'User',
	description: 'This represents a User',
	fields: () => ({
		id: {
			type: GraphQLInt,
			resolve: (user) => user.id,
		},
		userName: {
			type: GraphQLString,
			resolve: (user) => user.userName,
		},
		firstName: {
			type: GraphQLString,
			resolve: (user) => user.firstName,
		},
		lastName: {
			type: GraphQLString,
			resolve: (user) => user.lastName,
		},
		email: {
			type: GraphQLString,
			resolve: (user) => user.email,
		},
		password: {
			type: GraphQLString,
			resolve: (user) => user.password,
		},
		avatarId: {
			type: GraphQLInt,
			resolve: (user) => user.avatarId,
		},
		roleId: {
			type: GraphQLInt,
			resolve: (user) => user.roleId,
		},
		// creatorId: {
		// 	type: GraphQLInt,
		// 	resolve: (user) => user.creatorId,
		// },
		notes: {
			type: new GraphQLList(NoteType),
			resolve: (user) => user.getNotes(),
		},
		createdAt: {
			type: GraphQLString,
			resolve: (user) => user.createdAt,
		},
		updatedAt: {
			type: GraphQLString,
			resolve: (user) => user.updatedAt,
		},
	}),
});

module.exports = { UserType };
