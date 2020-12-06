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
		return queryInterface.bulkInsert('task_Tasks', [
			{
				"jobStep": 1,
				"featureId": 1,
				"taskName": "test_task_1",
				"taskDefinition": '{"featureId": 0}',
				"stopOnError": true,
				taskFeatureId: null,
				"creatorId": 2,
				"jobId": 1,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"jobStep": 2,
				"featureId": 1,
				"taskName": "test_task_2",
				"taskDefinition": '{"featureId": 2, "targetId": 1, "targetData": "test_target_1"}',
				"stopOnError": null,
				taskFeatureId: 2,
				"creatorId": 2,
				"jobId": 1,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"jobStep": 3,
				"featureId": 1,
				"taskName": "test_task_3",
				"taskDefinition": '{"featureId": 0}',
				"stopOnError": null,
				taskFeatureId: null,
				"creatorId": 2,
				"jobId": 1,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"jobStep": 1,
				"featureId": 1,
				"taskName": "test_task_4",
				"taskDefinition": '{"featureId": 2, "targetId": 2,  "targetData": "test_target_2"}',
				"stopOnError": true,
				taskFeatureId: 2,
				"creatorId": 2,
				"jobId": 2,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"jobStep": 2,
				"featureId": 1,
				"taskName": "test_task_5",
				"taskDefinition": '{"featureId": 0}',
				"stopOnError": null,
				taskFeatureId: null,
				"creatorId": 2,
				"jobId": 2,
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
		return queryInterface.bulkDelete('task_Tasks', [
			{
				id: {
					[Op.gt]: -9
				  }
			}
		])
	}
};
