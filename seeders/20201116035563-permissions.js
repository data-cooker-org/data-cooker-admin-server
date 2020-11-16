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
		return queryInterface.bulkInsert('core_Permissions', [
			{
				"id": -1,
				"permisionNote": "Feature -1 and Role 1",
				"featureId": -1,
				"roleId": 1,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"id": 0,
				"permisionNote": "Feature 0 and Role 1",
				"featureId": 0,
				"roleId": 1,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"id": 1,
				"permisionNote": "Feature 1 and Role 2",
				"featureId": 1,
				"roleId": 2,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"id": 2,
				"permisionNote": "Feature 2 and Role 2",
				"featureId": 2,
				"roleId": 2,
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
		return queryInterface.bulkDelete('core_Permissions', [
			{
				id: 0
			}
		])
	}
};
