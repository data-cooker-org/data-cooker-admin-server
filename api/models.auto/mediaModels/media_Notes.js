const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Note', {
		// id: {
		//   type: DataTypes.INTEGER,
		//   primaryKey: true,
		//   autoIncrement: true,
		// },
		note: {
			type: DataTypes.STRING,
		},
		creatorId: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
	}, {
		sequelize, 
		tableName: 'media_Notes',
		timestamps: true
	});
};
