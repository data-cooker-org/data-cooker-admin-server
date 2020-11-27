'use strict';
const {
	Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Avatar extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};
	Avatar.init({
		// id: {
		//   type: DataTypes.INTEGER,
		//   primaryKey: true,
		//   autoIncrement: true,
		// },
		avatarData: {
			type: DataTypes.STRING(8000),
			unique: false,
		},
		isPublic: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		creatorId: DataTypes.INTEGER,
	}, {
		sequelize, // We need to pass the connection instance
		modelName: 'Avatar', // We need to choose the model name
		tableName: 'user_Avatars'
	});


	return Avatar;
};
