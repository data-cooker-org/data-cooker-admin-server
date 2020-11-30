'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('task_Tasks', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			jobStep: {
				type: Sequelize.INTEGER
			},
			taskName: {
				type: Sequelize.STRING
			},
			taskDefinition: {
				type: Sequelize.STRING
			},
			taskDescription: {
				type: Sequelize.STRING
			},
			taskFeatureId: {
				type: Sequelize.INTEGER
			},
			taskStatus: {
				type: Sequelize.STRING
			},
			stopOnError: {
				type: Sequelize.BOOLEAN
			},
			lastScheduledTime: {
				type: Sequelize.DATE
			},
			lastCompleteTime: {
				type: Sequelize.DATE
			},
			featureId: {
				type: Sequelize.INTEGER
			},
			creatorId: {
				type: Sequelize.INTEGER
			},
			jobId: {
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
		await queryInterface.dropTable('task_Tasks');
	}
};
