const { Sequelize } = require('sequelize');

const sequelize = require('../../../config/database');
const { Task } = require('./task_Tasks');

const Job = sequelize.define('Job', {
	// id: {
	//   type: Sequelize.INTEGER,
	//   primaryKey: true,
	//   autoIncrement: true,
	// },
	jobName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a job Name',
			},
		},
	},
	jobDescription: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter a data timestamp column name',
			},
		},
	},
	jobStatus: {
		type: Sequelize.STRING,
		allowNull: true,
		// validate: {
		// 	notEmpty: {
		// 		msg: 'Please choose the enable or disable',
		// 	},
		// },
	},
	jobEnabled: {
		type: Sequelize.BOOLEAN,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please choose the enable or disable',
			},
		},
	},
	repeatSchedule: {
		type: Sequelize.BOOLEAN,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please choose true or false for repeat',
			},
		},
	},
	scheduleType: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a time unit about how often data change',
			},
		},
	},
	scheduleCron: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a cron expression',
			},
		},
	},
	scheduleBegin: {
		type: Sequelize.DATE,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a datatime for schedule begin',
			},
		},
	},
	scheduleEnd: {
		type: Sequelize.DATE,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter a datetime for schedule end',
			},
		},
	},
	nextSchedule: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	lastSchedule: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	creatorId: Sequelize.INTEGER,
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Job', // We need to choose the model name
	tableName: "task_Jobs"
});


Job.associate = (models) => {
	Job.belongsTo(models.Feature, {
		as: 'feature',
		foreignKey: {
			fieldName: 'featureId',
		},
	});

// 	Job.hasMany(models.Task, {
// 		as: 'tasks',
// 		foreignKey: {
// 			fieldName: 'jobId',
// 			allowNull: false,
// 		},
// 	});
};

module.exports = { Job };
