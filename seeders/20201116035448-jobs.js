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
		return queryInterface.bulkInsert('task_Jobs', [
			{
				"featureId": 1,
				"jobName": "Test job 1",
				"jobDescription": "test job 1 ...",
				"scheduleType": "hour",
				"scheduleCron": "*/2 * * * *",
				scheduleBegin: new Date(),
				"creatorId": 2,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				"featureId": 1,
				"jobName": "Test job 2",
				"jobDescription": "Test job 2 ...",
				"scheduleType": "hour",
				"scheduleCron": "* * * * *",
				scheduleBegin: new Date(),
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
		return queryInterface.bulkDelete('task_Jobs', [
			{
				id: 0
			}
		])
	}
};
