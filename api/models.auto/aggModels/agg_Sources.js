const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Source', {
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
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable source',
				},
			},
		},
		sourceReadyTime: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable source',
				},
			},
		},
		sourceCheckTime: {
			type: DataTypes.STRING,
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
			type: DataTypes.INTEGER,
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
		sequelize, 
		tableName: 'agg_Sources',
		timestamps: true
	});
};

