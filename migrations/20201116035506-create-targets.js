'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('agg_Targets', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			featureId: {
				type: Sequelize.INTEGER
			},
			targetLabel: {
				type: Sequelize.STRING
			},
			targetData: {
				type: Sequelize.STRING
			},
			batchControlColumn: {
				type: Sequelize.STRING
			},
			batchControlSize: {
				type: Sequelize.INTEGER
			},
			batchControlNext: {
				type: Sequelize.STRING
			},
			batchProcessed: {
				type: Sequelize.DATE
			},
			batchProcessing: {
				type: Sequelize.DATE
			},
			batchMicroChunkCurrent: {
				type: Sequelize.DATE
			},
			batchScheduleType: {
				type: Sequelize.STRING
			},
			batchScheduleLast: {
				type: Sequelize.DATE
			},
			patternColumns: {
				type: Sequelize.JSON
			},
			groupByColumns: {
				type: Sequelize.JSON
			},
			groupByPattern: {
				type: Sequelize.INTEGER
			},
			groupByFlexible: {
				type: Sequelize.BOOLEAN
			},
			aggregateColumns: {
				type: Sequelize.JSON
			},
			aggregateFunctions: {
				type: Sequelize.JSON
			},
			supportSpVersions: {
				type: Sequelize.JSON
			},
			creatorId: {
				type: Sequelize.INTEGER
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('agg_Targets');
	}
};
