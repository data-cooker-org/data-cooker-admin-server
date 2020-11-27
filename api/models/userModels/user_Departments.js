'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Department extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};
	Department.init({
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
		sequelize, // We need to pass the connection instance
		modelName: 'Department', // We need to choose the model name
		tableName: 'user_Departments'
	});


	return Department;
};
