const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Role', {
		// id: {
		//   type: DataTypes.INTEGER,
		//   primaryKey: true,
		//   autoIncrement: true,
		// },
		roleName: {
			type: DataTypes.STRING,
			unique: true,
		},
	}, {
		sequelize, 
		tableName: 'user_Roles',
		timestamps: true
	});
};
