'use strict';
const { Op } = require('sequelize');

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
		return queryInterface.bulkInsert('core_Features', [
			{
				"id": -1,
				"featureName": "Media",
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"id": 0,
				"featureName": "User",
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"id": 1,
				"featureName": "Task",
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"id": 2,
				"featureName": "Agg",
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
		return queryInterface.bulkDelete('core_Features', [
			{
				id: {
					[Op.gt]: -9
				  }
			}
		])
	}
};
