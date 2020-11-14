const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Task', {
		// id: {
		//   type: DataTypes.INTEGER,
		//   primaryKey: true,
		//   autoIncrement: true,
		// },
		jobStep: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a project/stream label of the aggregation',
				},
			},
		},
		taskName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a task data name',
				},
			},
		},
		taskDescription: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable task',
				},
			},
		},
		taskWorker: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable task',
				},
			},
		},
		taskStatus: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a description',
				},
			},
		},
		nextTaskOnSuccess: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable task',
				},
			},
		},
		nextTaskOnFailure: {
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable task',
				},
			},
		},
		lastScheduledTime: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable task',
				},
			},
		},
		lastCompleteTime: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable task',
				},
			},
		},
		creatorId: DataTypes.INTEGER,
		// jobId: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: true
		// },
	}, {
		sequelize, 
		tableName: 'task_Tasks',
		timestamps: true
	});
};
