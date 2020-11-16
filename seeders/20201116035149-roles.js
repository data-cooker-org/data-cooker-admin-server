'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		*/
		return queryInterface.bulkInsert('user_Roles', [
			{
				"id": 1,
				"roleName": "Admin",
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"id": 2,
				"roleName": "User",
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"id": 3,
				"roleName": "Viewer",
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"id": 9,
				"roleName": "Guest",
				createdAt: new Date(),
				updatedAt: new Date()

			}
		], {});
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		return queryInterface.bulkDelete('user_Roles', [
			{
				id: 0
			}
		])
	}
};

