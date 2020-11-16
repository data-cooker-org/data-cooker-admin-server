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
		return queryInterface.bulkInsert('user_Departments', [
			{
				"id": 1,
				"department": "Data Engineering",
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"id": 2,
				"department": "Data Analyticals",
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"id": 3,
				"department": "Data Science",
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"id": 4,
				"department": "Business Intelligence",
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
		return queryInterface.bulkDelete('user_Departments', [
			{
				id: 0
			}
		])
	}
};
