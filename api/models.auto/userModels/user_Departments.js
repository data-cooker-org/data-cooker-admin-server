const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Department', {
		// id: {
		//   type: DataTypes.INTEGER,
		//   primaryKey: true,
		//   autoIncrement: true,
		// },
		department: {
			type: DataTypes.STRING,
			unique: true,
		},
	}, {
		sequelize, 
		tableName: 'user_Departments',
		timestamps: true
	});
};
