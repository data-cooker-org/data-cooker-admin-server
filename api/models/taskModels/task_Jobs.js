'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Job extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Job.belongsTo(models.Feature, {
				as: 'feature',
				foreignKey: {
					fieldName: 'featureId',
				},
			});
		}
	};

	Job.init({
		// id: {
		//   type: DataTypes.INTEGER,
		//   primaryKey: true,
		//   autoIncrement: true,
		// },
		jobName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a job Name',
				},
			},
		},
		jobDescription: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a data timestamp column name',
				},
			},
		},
		jobStatus: {
			type: DataTypes.STRING,
			allowNull: true,
			// validate: {
			// 	notEmpty: {
			// 		msg: 'Please choose the enable or disable',
			// 	},
			// },
		},
		jobEnabled: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please choose the enable or disable',
				},
			},
		},
		repeatSchedule: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please choose true or false for repeat',
				},
			},
		},
		scheduleType: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a time unit about how often data change',
				},
			},
		},
		scheduleCron: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a cron expression',
				},
			},
		},
		scheduleBegin: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a datatime for schedule begin',
				},
			},
		},
		scheduleEnd: {
			type: DataTypes.DATE,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a datetime for schedule end',
				},
			},
		},
		nextSchedule: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		lastSchedule: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		creatorId: DataTypes.INTEGER,
	}, {
		sequelize, // We need to pass the connection instance
		modelName: 'Job', // We need to choose the model name
		tableName: "task_Jobs"
	});

	return Job;
};
