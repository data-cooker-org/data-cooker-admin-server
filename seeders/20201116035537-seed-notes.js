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
		return queryInterface.bulkInsert('media_Notes', [
			{
				"featureId": -1,
				"note": "This is first note ..",
				"creatorId": 1,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"featureId": -1,
				"note": "This is second note ..",
				"creatorId": 1,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"featureId": -1,
				"note": "This is third note ..",
				"creatorId": 2,
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
		return queryInterface.bulkDelete('media_Notes', [
			{
				id: {
					[Op.gt]: -9
				  }
			}
		])
	}
};

