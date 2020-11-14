const {
	GraphQLInt,
	GraphQLString,
	GraphQLList,
} = require('graphql');

const { UserType } = require('../types');
const { User } = require('../../models');

const userQuery = {
	type: new GraphQLList(UserType),
	args: {
		id: {
			name: 'id',
			type: GraphQLInt,
		},
		userName: {
			name: 'userName',
			type: GraphQLString,
		},
		firstName: {
			name: 'firstName',
			type: GraphQLString,
		},
		lastName: {
			name: 'lastName',
			type: GraphQLString,
		},
		email: {
			name: 'email',
			type: GraphQLString,
		},
		avatarId: {
			name: 'avatarId',
			type: GraphQLInt,
		},
		roleId: {
			name: 'roleId',
			type: GraphQLInt,
		},
		// creatorId: {
		// 	name: 'creatorId',
		// 	type: GraphQLInt,
		// },
		createdAt: {
			name: 'createdAt',
			type: GraphQLString,
		},
		updatedAt: {
			name: 'updatedAt',
			type: GraphQLString,
		},
	},
	resolve: (user, args) => User.findAll({ where: args }),
};

module.exports = { userQuery };
