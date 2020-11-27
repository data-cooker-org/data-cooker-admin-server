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
		return queryInterface.bulkInsert('agg_Targets', [
			{
				"featureId": 2,
				"targetLabel": "Test target 1",
				"targetData": "test_target_1",
				"batchControlColumn": "data_ts",
				batchControlSize: 1440,
				batchControlNext: "DATEADD(MINUTE, :2, :1)",
				batchProcessed: new Date('2020-11-25'),
				batchScheduleType: "DAILY",
				patternColumns: '["aa", "ab", "ac", "ad"]',
				groupByPattern: 10,
				groupByFlexible: true,
				groupByColumns: '["ab:ab", "ad:ad"]',
				aggregateColumns: '["ba:ba", "bb:bb", "bc:bc"]',
				aggregateFunctions: '["SUM(?)", "AVG(?)", "COUNT(*)"]',
				"creatorId": 2,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"featureId": 2,
				"targetLabel": "Test target 2",
				"targetData": "test_target_2",
				"batchControlColumn": "data_ts",
				batchControlSize: 1440,
				batchControlNext: "DATEADD(MINUTE, :2, :1)",
				batchProcessed: new Date('2020-11-25'),
				batchScheduleType: "DAILY",
				patternColumns: '["aa", "ab", "ac", "ad"]',
				groupByPattern: 0,
				groupByFlexible: true,
				groupByColumns: '["aa:aa", "ab:ab", "ac:ac", "ad:ad"]',
				aggregateColumns: '["ba:ba", "bc:bc"]',
				aggregateFunctions: '["SUM(?)", "AVG(?)"]',
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
				id: {
					[Op.gt]: -9
				  }
			}
		])
	}
};
