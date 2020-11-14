const {
	GraphQLInt,
	GraphQLString,
	GraphQLList,
} = require('graphql');

const { AvatarType } = require('../types');
const { Avatar } = require('../../models');

const avatarQuery = {
	type: new GraphQLList(AvatarType),
	args: {
		id: {
			name: 'id',
			type: GraphQLInt,
		},
		avatarData: {
			name: 'avatarData',
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
	resolve: (avatar, args) => Avatar.findAll({ where: args }),
};

module.exports = { avatarQuery };
