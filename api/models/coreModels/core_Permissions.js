const { Sequelize } = require('sequelize');

const sequelize = require('../../../config/database');
// const { Permission } = require("./Permission");

const Permission = sequelize.define('Permission', {
	// id: {
	//   type: Sequelize.INTEGER,
	//   primaryKey: true,
	//   autoIncrement: true,
	// },
	permisionNote: {
		type: Sequelize.STRING,
	}
	// featureId: {
	// 	type: Sequelize.INTEGER,
	// },
	// roleId: {
	// 	type: Sequelize.INTEGER,
	// 	allowNull: true
	// },
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Permission', // We need to choose the model name
	tableName: 'core_Permissions'
});

Permission.associate = (models) => {
	Permission.belongsTo(models.Role, {
		as: 'role',
		foreignKey: {
			fieldName: 'roleId',
			allowNull: false,
		},
	});
};


module.exports = { Permission };
