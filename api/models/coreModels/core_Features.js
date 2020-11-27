'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Feature extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			// Feature.hasMany(models.Role, {
			// 	as: 'permissions',
			// 	foreignKey: {
			// 		fieldName: 'featureId',
			// 		allowNull: false,
			// 	},
			// });
		}
	};
	Feature.init({
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
		sequelize, // We need to pass the connection instance
		modelName: 'Feature', // We need to choose the model name
		tableName: 'core_Features'
	});


	return Feature;
};
