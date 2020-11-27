'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('agg_Sources', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			featureId: {
				type: Sequelize.INTEGER
			},
			sourceLabel: {
				type: Sequelize.STRING
			},
			sourceData: {
				type: Sequelize.STRING
			},
			sourceEnabled: {
				type: Sequelize.BOOLEAN
			},
			transformation: {
				type: Sequelize.STRING
			},
			sourceReadyTime: {
				type: Sequelize.DATE
			},
			sourceCheckTime: {
				type: Sequelize.DATE
			},
			sourceCheckQuery: {
				type: Sequelize.STRING
			},
			patternDefault: {
				type: Sequelize.INTEGER
			},
			patternFlexible: {
				type: Sequelize.BOOLEAN
			},
			creatorId: {
				type: Sequelize.INTEGER
			},
			targetId: {
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
		await queryInterface.dropTable('agg_Sources');
	}
};
