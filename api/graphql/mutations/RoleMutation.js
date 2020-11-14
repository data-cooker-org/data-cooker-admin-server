const merge = require('lodash.merge');

const {
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull,
} = require('graphql');

const { RoleType } = require('../types');
const { Role } = require('../../models');

const createRole = {
	type: RoleType,
	description: 'The mutation that allows you to create a new Role',
	args: {
		roleName: {
			name: 'roleName',
			type: new GraphQLNonNull(GraphQLString),
		},
		// creatorId: {
		// 	name: 'creatorId',
		// 	type: new GraphQLNonNull(GraphQLInt),
		// },
	},
	resolve: (value, {
		roleName,
		// creatorId,
	}) => (
			Role.create({
				roleName,
				// creatorId,
			})
		),
};

const updateRole = {
	type: RoleType,
	description: 'The mutation that allows you to update an existing Role by Id',
	args: {
		roleName: {
			name: 'roleName',
			type: new GraphQLNonNull(GraphQLString),
		},
	},
	resolve: async (_, { role }) => {
		const foundRole = await Role.findByPk(role.id);

		if (!foundRole) {
			throw new Error(`Role with id: ${role.id} not found!`);
		}

		const updatedRole = merge(foundRole, {
			roleName: role.roleName,
		});

		return foundRole.update(updatedRole);
	},
};

const deleteRole = {
	type: RoleType,
	description: 'The mutation that allows you to delete a existing Role by Id',
	args: {
		roleName: {
			name: 'roleName',
			type: new GraphQLNonNull(GraphQLString),
		},
	},
	resolve: async (_, { role }) => {
		const foundRole = await Role.findByPk(role.id);

		if (!foundRole) {
			throw new Error(`Role with id: ${role.id} not found!`);
		}

		await Role.destroy({
			where: {
				id: role.id,
			},
		});

		return foundRole;
	},
};

module.exports = {
	createRole,
	updateRole,
	deleteRole,
};
