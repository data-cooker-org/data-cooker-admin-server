'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Note extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Note.belongsTo(models.Feature, {
				as: 'feature',
				foreignKey: {
					fieldName: 'featureId',
				},
			});
		}
	};

	Note.init({
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
		sequelize, // We need to pass the connection instance
		modelName: 'Note', // We need to choose the model name
		tableName: 'media_Notes'
	});

	return Note;
};

