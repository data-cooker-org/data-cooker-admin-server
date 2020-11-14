const { Sequelize } = require('sequelize');

const sequelize = require('../../../config/database');
const { Job } = require('./task_Jobs');

const Task = sequelize.define('Task', {
	// id: {
	//   type: Sequelize.INTEGER,
	//   primaryKey: true,
	//   autoIncrement: true,
	// },
	jobStep: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a project/stream label of the aggregation',
			},
		},
	},
	taskName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a task data name',
			},
		},
	},
	taskDescription: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable task',
			},
		},
	},
	taskWorker: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable task',
			},
		},
	},
	taskStatus: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter a description',
			},
		},
	},
	stopOnError: {
		type: Sequelize.INTEGER,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false for stop on error',
			},
		},
	},
	lastScheduledTime: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable task',
			},
		},
	},
	lastCompleteTime: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable task',
			},
		},
	},
	creatorId: Sequelize.INTEGER,
	// jobId: {
	// 	type: Sequelize.INTEGER,
	// 	allowNull: true
	// },
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Task', // We need to choose the model name
	tableName: 'task_Tasks'
});

Task.associate = (models) => {
	Task.belongsTo(models.Feature, {
		as: 'feature',
		foreignKey: {
			fieldName: 'featureId',
		},
	});

	Task.belongsTo(models.Job, {
		as: 'job',
		foreignKey: {
			fieldName: 'jobId',
			allowNull: false,
		},
	});
};



module.exports = { Task };
