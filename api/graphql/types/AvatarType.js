const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLList,
} = require('graphql');

const { UserType } = require('./UserType');

const AvatarType = new GraphQLObjectType({
	name: 'Avatar',
	description: 'This represents a Avatar',
	fields: () => ({
		id: {
			type: GraphQLInt,
			resolve: (avatar) => avatar.id,
		},
		avatarData: {
			type: GraphQLString,
			resolve: (avatar) => avatar.avatarData,
		},
		users: {
			type: new GraphQLList(UserType),
			resolve: (avatar) => avatar.getUsers(),
		},
		createdAt: {
			type: GraphQLString,
			resolve: (avatar) => avatar.createdAt,
		},
		updatedAt: {
			type: GraphQLString,
			resolve: (avatar) => avatar.updatedAt,
		},
	}),
});

module.exports = { AvatarType };
