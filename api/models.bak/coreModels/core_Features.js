const { Sequelize } = require('sequelize');

const sequelize = require('../../../config/database');
// const { Feature } = require("./Feature");

const Feature = sequelize.define('Feature', {
	// id: {
	//   type: Sequelize.INTEGER,
	//   primaryKey: true,
	//   autoIncrement: true,
	// },
	featureName: {
		type: Sequelize.STRING,
		unique: true,
	},
	// roleId: {
	// 	type: Sequelize.INTEGER,
	// 	allowNull: true
	// },
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Feature', // We need to choose the model name
	tableName: 'core_Features'
});

Feature.associate = (models) => {
	Feature.hasMany(models.Role, {
		as: 'permissions',
		foreignKey: {
			fieldName: 'featureId',
			allowNull: false,
		},
	});
};


module.exports = { Feature };
