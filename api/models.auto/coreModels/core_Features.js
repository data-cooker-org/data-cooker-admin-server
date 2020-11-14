const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Feature', {
		// id: {
		//   type: DataTypes.INTEGER,
		//   primaryKey: true,
		//   autoIncrement: true,
		// },
		featureName: {
			type: DataTypes.STRING,
			unique: true,
		},
		// roleId: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: true
		// },
	}, {
		sequelize, 
		tableName: 'core_Features',
		timestamps: true
	});
};
