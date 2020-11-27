'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Course extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Course.belongsTo(models.Feature, {
				as: 'feature',
				foreignKey: {
					fieldName: 'featureId',
				},
			});
		}
	};
	
	Course.init({
		// id: {
		//   type: DataTypes.INTEGER,
		//   primaryKey: true,
		//   autoIncrement: true,
		// },
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true,
		},
		estimatedTime: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		materialsNeeded: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		creatorId: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
	}, {
		sequelize, // We need to pass the connection instance
		modelName: 'Course', // We need to choose the model name
		tableName: 'media_Courses'
	});


	return Course;
};
