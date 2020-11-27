const { Sequelize } = require('sequelize');
const sequelize = require('../../../config/database');
const Target = require("./agg_Targets");

const Source = sequelize.define('Source', {
	// id: {
	//   type: Sequelize.INTEGER,
	//   primaryKey: true,
	//   autoIncrement: true,
	// },
	sourceLabel: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter a project/stream label of the aggregation',
			},
		},
	},
	sourceData: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a source data name',
			},
		},
	},
	sourceEnabled: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable source',
			},
		},
	},
	sourceReadyTime: {
		type: Sequelize.DATE,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable source',
			},
		},
	},
	sourceCheckTime: {
		type: Sequelize.DATE,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable source',
			},
		},
	},
	sourceCheckQuery: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable source',
			},
		},
	},
	patternDefault: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable source',
			},
		},
	},
	patternFlexible: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable source',
			},
		},
	},
	transformation: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a description',
			},
		},
	},
	creatorId: Sequelize.INTEGER,
	// targetId: {
	// 	type: Sequelize.INTEGER,
	// 	allowNull: true
	// },
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Source', // We need to choose the model name
	tableName: 'agg_Sources'
});

Source.associate = (models) => {
	// define association between tables
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
};

module.exports = { Source };
