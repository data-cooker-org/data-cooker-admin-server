const { Sequelize } = require('sequelize');

const sequelize = require('../../../config/database');
const { User } = require('./user_Users');

const Avatar = sequelize.define('Avatar', {
	// id: {
	//   type: Sequelize.INTEGER,
	//   primaryKey: true,
	//   autoIncrement: true,
	// },
	avatarData: {
		type: Sequelize.STRING(8000),
		unique: false,
	},
	isPublic: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	creatorId: Sequelize.INTEGER,
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Avatar', // We need to choose the model name
	tableName: 'user_Avatars'
});

Avatar.associate = (models) => {
	// Avatar.belongsTo(models.Feature, {
	// 	as: 'feature',
	// 	foreignKey: {
	// 		fieldName: 'featureId',
	// 	},
	// });

	// Avatar.hasMany(models.User, {
	// 	as: 'users',
	// 	foreignKey: {
	// 		fieldName: 'avatarId',
	// 		allowNull: true,
	// 	},
	// });
};

module.exports = { Avatar };
