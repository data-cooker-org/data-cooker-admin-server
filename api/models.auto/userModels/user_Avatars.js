const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Avatar', {
		// id: {
		//   type: DataTypes.INTEGER,
		//   primaryKey: true,
		//   autoIncrement: true,
		// },
		avatarData: {
			type: DataTypes.STRING,
			unique: false,
		},
		isPublic: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		creatorId: DataTypes.INTEGER,
	}, {
		sequelize, 
		tableName: 'user_Avatars',
		timestamps: true
	});
};
