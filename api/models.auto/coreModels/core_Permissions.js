
const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Permission', {
		// id: {
		//   type: DataTypes.INTEGER,
		//   primaryKey: true,
		//   autoIncrement: true,
		// },
		permisionNote: {
			type: DataTypes.STRING,
		}
		// featureId: {
		// 	type: DataTypes.INTEGER,
		// },
		// roleId: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: true
		// },
	}, {
		sequelize, 
		tableName: 'core_Permissions',
		timestamps: true
	});
};
