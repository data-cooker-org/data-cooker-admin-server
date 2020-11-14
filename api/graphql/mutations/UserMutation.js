const merge = require('lodash.merge');
const {
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull,
} = require('graphql');

const { UserType } = require('../types');
const { User } = require('../../models');
const { UserInputType } = require('../inputTypes');

const createUser = {
	type: UserType,
	description: 'The mutation that allows you to create a new User',
	args: {
		userName: {
			name: 'userName',
			type: new GraphQLNonNull(GraphQLString),
		},
		firstName: {
			name: 'firstName',
			type: new GraphQLNonNull(GraphQLString),
		},
		lastName: {
			name: 'lastName',
			type: new GraphQLNonNull(GraphQLString),
		},
		email: {
			name: 'email',
			type: new GraphQLNonNull(GraphQLString),
		},
		password: {
			name: 'password',
			type: new GraphQLNonNull(GraphQLString),
		},
		avatarId: {
			name: 'avatarId',
			type: new GraphQLNonNull(GraphQLInt),
		},
		roleId: {
			name: 'roleId',
			type: new GraphQLNonNull(GraphQLInt),
		},
		// creatorId: {
		// 	name: 'creatorId',
		// 	type: new GraphQLNonNull(GraphQLInt),
		// },
	},
	resolve: (value, {
		userName,
		firstName,
		lastName,
		email,
		password,
		avatarId,
		roleId,
		// creatorId,
	}) => (
			User.create({
				userName,
				firstName,
				lastName,
				email,
				password,
				avatarId,
				roleId,
				// creatorId,
			})
		),
};

const updateUser = {
	type: UserType,
	description: 'The mutation that allows you to update an existing User by Id',
	args: {
		user: {
			name: 'user',
			type: UserInputType('update'),
		},
	},
	resolve: async (_, { user }) => {
		const foundUser = await User.findByPk(user.id);

		if (!foundUser) {
			throw new Error(`User with id: ${user.id} not found!`);
		}

		const updatedUser = merge(foundUser, {
			userName: user.userName,
			email: user.email,
			roleId: user.roleId,
		});

		return foundUser.update(updatedUser);
	},
};

const deleteUser = {
	type: UserType,
	description: 'The mutation that allows you to delete a existing User by Id',
	args: {
		user: {
			name: 'user',
			type: UserInputType('delete'),
		},
	},
	resolve: async (_, { user }) => {
		const foundUser = await User.findByPk(user.id);

		if (!foundUser) {
			throw new Error(`User with id: ${user.id} not found!`);
		}

		await User.destroy({
			where: {
				id: user.id,
			},
		});

		return foundUser;
	},
};

module.exports = {
	createUser,
	updateUser,
	deleteUser,
};
