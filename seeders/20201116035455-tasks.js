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
		return queryInterface.bulkInsert('task_Tasks', [
			{
				"jobStep": 1,
				"featureId": 1,
				"taskName": "test_task_1",
				"stopOnError": true,
				taskWorker: 1,
				"creatorId": 2,
				"jobId": 1,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"jobStep": 2,
				"featureId": 1,
				"taskName": "test_task_2",
				"stopOnError": null,
				taskWorker: 1,
				"creatorId": 2,
				"jobId": 1,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"jobStep": 3,
				"featureId": 1,
				"taskName": "test_task_3",
				"stopOnError": null,
				taskWorker: 1,
				"creatorId": 2,
				"jobId": 1,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"jobStep": 1,
				"featureId": 1,
				"taskName": "test_task_4",
				"stopOnError": true,
				taskWorker: 2,
				"creatorId": 2,
				"jobId": 2,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"jobStep": 2,
				"featureId": 1,
				"taskName": "test_task_5",
				"stopOnError": null,
				taskWorker: 2,
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
				id: 0
			}
		])
	}
};
