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
		return queryInterface.bulkInsert('agg_Targets', [
			{
				"featureId": 2,
				"targetLabel": "Test target 1",
				"targetData": "test_target_1",
				"batchControlColumn": "data_ts",
				batchControlSize: 5,
				batchControlNext: "DATEADD(MINUTE, :2, :1)",
				batchProcessed: new Date(),
				batchScheduleType: "MINUTES",
				patternColumns: "[]",
				groupByPattern: 5,
				groupByFlexible: true,
				groupByColumns: "[]",
				aggregateColumns: "[]",
				aggregateFunctions: "[]",
				"creatorId": 2,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"featureId": 2,
				"targetLabel": "Test target 2",
				"targetData": "test_target_2",
				"batchControlColumn": "data_ts",
				batchControlSize: 5,
				batchControlNext: "DATEADD(MINUTE, :2, :1)",
				batchProcessed: new Date(),
				batchScheduleType: "MINUTES",
				patternColumns: "[]",
				groupByPattern: 5,
				groupByFlexible: true,
				groupByColumns: "[]",
				aggregateColumns: "[]",
				aggregateFunctions: "[]",
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
		return queryInterface.bulkDelete('agg_Targets', [
			{
				id: 0
			}
		])
	}
};
