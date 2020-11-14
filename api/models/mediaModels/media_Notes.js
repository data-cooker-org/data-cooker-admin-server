const { Sequelize } = require('sequelize');

const sequelize = require('../../../config/database');
const { User } = require("../userModels/user_Users");

const Note = sequelize.define('Note', {
	// id: {
	//   type: Sequelize.INTEGER,
	//   primaryKey: true,
	//   autoIncrement: true,
	// },
	note: {
		type: Sequelize.STRING,
	},
	creatorId: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Note', // We need to choose the model name
	tableName: 'media_Notes'
});

Note.associate = (models) => {
	Note.belongsTo(models.Feature, {
		as: 'feature',
		foreignKey: {
			fieldName: 'featureId',
		},
	});

	// Note.belongsTo(models.User, {
	// 	as: 'user',
	// 	foreignKey: {
	// 		fieldName: 'creatorId',
	// 		allowNull: false,
	// 	},
	// });
};

module.exports = { Note };
