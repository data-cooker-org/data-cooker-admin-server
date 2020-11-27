'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('task_Jobs', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			featureId: {
				type: Sequelize.INTEGER
			},
			jobName: {
				type: Sequelize.STRING
			},
			jobDescription: {
				type: Sequelize.STRING
			},
			jobStatus: {
				type: Sequelize.STRING
			},
			jobEnabled: {
				type: Sequelize.BOOLEAN
			},
			repeatSchedule: {
				type: Sequelize.STRING
			},
			scheduleType: {
				type: Sequelize.STRING
			},
			scheduleCron: {
				type: Sequelize.STRING
			},
			scheduleBegin: {
				type: Sequelize.DATE
			},
			scheduleEnd: {
				type: Sequelize.DATE
			},
			nextSchedule: {
				type: Sequelize.STRING
			},
			lastSchedule: {
				type: Sequelize.STRING
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
		await queryInterface.dropTable('task_Jobs');
	}
};
