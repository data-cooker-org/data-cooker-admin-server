'use strict';
const {
	Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Role extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};
	Role.init({
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
		sequelize, // We need to pass the connection instance
		modelName: 'Role', // We need to choose the model name
		tableName: 'user_Roles'
	});

	return Role;
};
