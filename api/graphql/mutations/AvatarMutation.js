const merge = require('lodash.merge');

const {
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull,
} = require('graphql');

const { AvatarType } = require('../types');
const { Avatar } = require('../../models');

const createAvatar = {
	type: AvatarType,
	description: 'The mutation that allows you to create a new Avatar',
	args: {
		avatarData: {
			name: 'avatarData',
			type: new GraphQLNonNull(GraphQLString),
		},
		// creatorId: {
		// 	name: 'creatorId',
		// 	type: new GraphQLNonNull(GraphQLInt),
		// },
	},
	resolve: (value, {
		avatarData,
		// creatorId,
	}) => (
			Avatar.create({
				avatarData,
				// creatorId,
			})
		),
};

const updateAvatar = {
	type: AvatarType,
	description: 'The mutation that allows you to update an existing Avatar by Id',
	args: {
		avatarData: {
			name: 'avatarData',
			type: new GraphQLNonNull(GraphQLString),
		},
	},
	resolve: async (_, { avatar }) => {
		const foundAvatar = await Avatar.findByPk(avatar.id);

		if (!foundAvatar) {
			throw new Error(`Avatar with id: ${avatar.id} not found!`);
		}

		const updatedAvatar = merge(foundAvatar, {
			avatarData: avatar.avatarData,
		});

		return foundAvatar.update(updatedAvatar);
	},
};

const deleteAvatar = {
	type: AvatarType,
	description: 'The mutation that allows you to delete a existing Avatar by Id',
	args: {
		avatarData: {
			name: 'avatarData',
			type: new GraphQLNonNull(GraphQLString),
		},
	},
	resolve: async (_, { avatar }) => {
		const foundAvatar = await Avatar.findByPk(avatar.id);

		if (!foundAvatar) {
			throw new Error(`Avatar with id: ${avatar.id} not found!`);
		}

		await Avatar.destroy({
			where: {
				id: avatar.id,
			},
		});

		return foundAvatar;
	},
};

module.exports = {
	createAvatar,
	updateAvatar,
	deleteAvatar,
};
