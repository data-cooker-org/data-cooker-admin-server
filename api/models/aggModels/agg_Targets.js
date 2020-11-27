'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Target extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Target.belongsTo(models.Feature, {
				as: 'feature',
				foreignKey: {
					fieldName: 'featureId',
				},
			});

		}
	};
	Target.init({
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
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a timestamp of data aggregation is done',
				},
			},
		},
		batchProcessing: {
			type: DataTypes.DATE,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a timestamp of data aggregation will be done',
				},
			},
		},
		batchMicroChunkCurrent: {
			type: DataTypes.DATE,
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
			type: DataTypes.DATE,
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
			type: DataTypes.BOOLEAN,
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
		supportSpVersions: {
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
		sequelize, // We need to pass the connection instance
		modelName: 'Target', // We need to choose the model name
		tableName: "agg_Targets"
	});

	return Target;
};
