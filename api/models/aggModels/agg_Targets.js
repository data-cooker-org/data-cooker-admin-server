const { Sequelize } = require('sequelize');

const sequelize = require('../../../config/database');
const { Source } = require('./agg_Sources');

const Target = sequelize.define('Target', {
	// id: {
	//   type: Sequelize.INTEGER,
	//   primaryKey: true,
	//   autoIncrement: true,
	// },
	targetLabel: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter an aggregation project/stream label',
			},
		},
	},
	targetData: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter an aggregation target data name',
			},
		},
	},
	batchControlColumn: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a data timestamp column name',
			},
		},
	},
	batchControlSize: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a aggregation batch size in minutes',
			},
		},
	},
	batchControlNext: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a batch step calculation function',
			},
		},
	},
	batchProcessed: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a timestamp of data aggregation is done',
			},
		},
	},
	batchProcessing: {
		type: Sequelize.INTEGER,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter a timestamp of data aggregation will be done',
			},
		},
	},
	batchMicroChunkCurrent: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	batchScheduleType: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a time unit about how often data change',
			},
		},
	},
	batchScheduleLast: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	patternColumns: {
		type: Sequelize.BLOB,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a column array for pattern space',
			},
		},
	},
	groupByColumns: {
		type: Sequelize.BLOB,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter a column array for group by',
			},
		},
	},
	groupByPattern: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a bitwise value as group by result pattern',
			},
		},
	},
	groupByFlexible: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter true or false for fleible pattern allowed',
			},
		},
	},
	aggregateColumns: {
		type: Sequelize.BLOB,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter a column array as aggregation measures',
			},
		},
	},
	aggregateFunctions: {
		type: Sequelize.BLOB,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter a column array as aggregation functions',
			},
		},
	},
	suppoetSpVersions: {
		type: Sequelize.BLOB,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter a column array for supported sp versions',
			},
		},
	},
	creatorId: Sequelize.INTEGER,
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Target', // We need to choose the model name
	tableName: "agg_Targets"
});

Target.associate = (models) => {
	Target.belongsTo(models.Feature, {
		as: 'feature',
		foreignKey: {
			fieldName: 'featureId',
		},
	});

// 	// define association between tables
// 	// a "Target" has many "courses"
// 	Target.hasMany(models.Source, {
// 		as: 'sources',
// 		foreignKey: {
// 			fieldName: 'targetId',
// 			allowNull: false,
// 		},
// 	});
};

module.exports = { Target };
