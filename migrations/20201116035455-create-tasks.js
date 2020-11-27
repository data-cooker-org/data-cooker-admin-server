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
			featureId: {
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
			taskStatus: {
				type: Sequelize.STRING
			},
			stopOnError: {
				type: Sequelize.BOOLEAN
			},
			taskWorker: {
				type: Sequelize.STRING
			},
			lastScheduledTime: {
				type: Sequelize.DATE
			},
			lastCompleteTime: {
				type: Sequelize.DATE
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
