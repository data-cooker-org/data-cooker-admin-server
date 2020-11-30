'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Task extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
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
		}
	};

	Task.init({
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
		taskDefinition: {
			type: DataTypes.BLOB,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter task definition data',
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
		taskFeatureId: {
			type: DataTypes.INTEGER,
			allowNull: true,
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
		stopOnError: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false for stop on error',
				},
			},
		},
		lastScheduledTime: {
			type: DataTypes.DATE,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable task',
				},
			},
		},
		lastCompleteTime: {
			type: DataTypes.DATE,
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
		sequelize, // We need to pass the connection instance
		modelName: 'Task', // We need to choose the model name
		tableName: 'task_Tasks'
	});


	return Task;
};
