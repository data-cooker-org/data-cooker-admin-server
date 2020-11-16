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
		return queryInterface.bulkInsert('agg_Sources', [
			{
				"featureId": 2,
				"sourceLabel": "Test Source 1",
				"sourceData": "test_source_1",
				"transformation": "select 1 one",
				sourceEnabled: true,
				sourceReadyTime: new Date(),
				sourceCheckTime: new Date(),
				sourceCheckQuery: new Date(),
				patternDefault: 1,
				patternFlexible: true,
				"creatorId": 2,
				"targetId": 1,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"featureId": 2,
				"sourceLabel": "Test Source 2",
				"sourceData": "test_source_2",
				"transformation": "select 2 one",
				sourceEnabled: true,
				sourceReadyTime: new Date(),
				sourceCheckTime: new Date(),
				sourceCheckQuery: new Date(),
				patternDefault: 1,
				patternFlexible: true,
				"creatorId": 2,
				"targetId": 1,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"featureId": 2,
				"sourceLabel": "Test Source 3",
				"sourceData": "test_source_3",
				"transformation": "select 3 one",
				sourceEnabled: true,
				sourceReadyTime: new Date(),
				sourceCheckTime: new Date(),
				sourceCheckQuery: new Date(),
				patternDefault: 1,
				patternFlexible: true,
				"creatorId": 2,
				"targetId": 1,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"featureId": 2,
				"sourceLabel": "Test Source 4",
				"sourceData": "test_source_4",
				"transformation": "select 4 one",
				sourceEnabled: true,
				sourceReadyTime: new Date(),
				sourceCheckTime: new Date(),
				sourceCheckQuery: new Date(),
				patternDefault: 1,
				patternFlexible: true,
				"creatorId": 2,
				"targetId": 2,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"featureId": 2,
				"sourceLabel": "Test Source 5",
				"sourceData": "test_source_5",
				"transformation": "select 5 one",
				sourceEnabled: true,
				sourceReadyTime: new Date(),
				sourceCheckTime: new Date(),
				sourceCheckQuery: new Date(),
				patternDefault: 1,
				patternFlexible: true,
				"creatorId": 2,
				"targetId": 2,
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
		return queryInterface.bulkDelete('agg_Sources', [
			{
				id: 0
			}
		])
	}
};
