const { Sequelize } = require('sequelize');

const sequelize = require('../../../config/database');
const { User } = require('./user_Users');

const Department = sequelize.define('Department', {
	// id: {
	//   type: Sequelize.INTEGER,
	//   primaryKey: true,
	//   autoIncrement: true,
	// },
	department: {
		type: Sequelize.STRING,
		unique: true,
	},
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Department', // We need to choose the model name
	tableName: 'user_Departments'
});


Department.associate = (models) => {
	// Department.belongsTo(models.Feature, {
	// 	as: 'feature',
	// 	foreignKey: {
	// 		fieldName: 'featureId',
	// 	},
	// });

	// Department.hasMany(models.User, {
	// 	as: 'users',
	// 	foreignKey: {
	// 		fieldName: 'departmentId',
	// 		allowNull: true,
	// 	},
	// });

	// Department.hasMany(models.Permission, {
	// 	as: 'permissions',
	// 	foreignKey: {
	// 		fieldName: 'departmentId',
	// 		allowNull: true,
	// 	},
	// });
};

module.exports = { Department };
