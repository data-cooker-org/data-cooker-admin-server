const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Target', {
		// id: {
		//   type: DataTypes.INTEGER,
		//   primaryKey: true,
		//   autoIncrement: true,
		// },
		targetLabel: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter an aggregation project/stream label',
				},
			},
		},
		targetData: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter an aggregation target data name',
				},
			},
		},
		batchControlColumn: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a data timestamp column name',
				},
			},
		},
		batchControlSize: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a aggregation batch size in minutes',
				},
			},
		},
		batchControlNext: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a batch step calculation function',
				},
			},
		},
		batchProcessed: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a timestamp of data aggregation is done',
				},
			},
		},
		batchProcessing: {
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a timestamp of data aggregation will be done',
				},
			},
		},
		batchMicroChunkCurrent: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		batchScheduleType: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a time unit about how often data change',
				},
			},
		},
		batchScheduleLast: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		patternColumns: {
			type: DataTypes.BLOB,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a column array for pattern space',
				},
			},
		},
		groupByColumns: {
			type: DataTypes.BLOB,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a column array for group by',
				},
			},
		},
		groupByPattern: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a bitwise value as group by result pattern',
				},
			},
		},
		groupByFlexible: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter true or false for fleible pattern allowed',
				},
			},
		},
		aggregateColumns: {
			type: DataTypes.BLOB,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a column array as aggregation measures',
				},
			},
		},
		aggregateFunctions: {
			type: DataTypes.BLOB,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a column array as aggregation functions',
				},
			},
		},
		suppoetSpVersions: {
			type: DataTypes.BLOB,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a column array for supported sp versions',
				},
			},
		},
		creatorId: DataTypes.INTEGER,
	}, {
		sequelize, 
		tableName: "agg_Targets",
		timestamps: true
	});
};
