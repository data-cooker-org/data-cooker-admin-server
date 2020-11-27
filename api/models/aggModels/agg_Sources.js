'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Source extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Source.belongsTo(models.Feature, {
				as: 'feature',
				foreignKey: {
					fieldName: 'featureId',
				},
			});

			// a "Source" belongs to a single "target"
			Source.belongsTo(models.Target, {
				as: 'target',
				foreignKey: {
					fieldName: 'targetId',
					allowNull: false,
				},
			});
		}
	};
	Source.init({
		// id: {
		//   type: DataTypes.INTEGER,
		//   primaryKey: true,
		//   autoIncrement: true,
		// },
		sourceLabel: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a project/stream label of the aggregation',
				},
			},
		},
		sourceData: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a source data name',
				},
			},
		},
		sourceEnabled: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable source',
				},
			},
		},
		sourceReadyTime: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable source',
				},
			},
		},
		sourceCheckTime: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable source',
				},
			},
		},
		sourceCheckQuery: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable source',
				},
			},
		},
		patternDefault: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable source',
				},
			},
		},
		patternFlexible: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable source',
				},
			},
		},
		transformation: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a description',
				},
			},
		},
		creatorId: DataTypes.INTEGER,
		// targetId: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: true
		// },
	}, {
		sequelize, // We need to pass the connection instance
		modelName: 'Source', // We need to choose the model name
		tableName: 'agg_Sources'
	});

	return Source;
};
