'use strict';
const {
	Model
} = require('sequelize');
// const { Sequelize } = require('sequelize');
const bcryptSevice = require('../../services/bcrypt.service');

const hooks = {
	beforeCreate(user) {
		// eslint-disable-line no-param-reassign
		user.password = bcryptSevice().password(user);
	},
};

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.belongsTo(models.Avatar, {
				as: 'avatar',
				foreignKey: {
					fieldName: 'avatarId',
				},
			});

			User.belongsTo(models.Department, {
				as: 'department',
				foreignKey: {
					fieldName: 'departmentId',
				},
			});

			User.belongsTo(models.Role, {
				as: 'role',
				foreignKey: {
					fieldName: 'roleId',
				},
			});
		}
	};
	User.init({
		// id: {
		//   type: DataTypes.INTEGER,
		//   primaryKey: true,
		//   autoIncrement: true,
		// },
		userName: {
			type: DataTypes.STRING,
			unique: true,
		},
		firstName: {
			type: DataTypes.STRING,
			unique: false,
		},
		lastName: {
			type: DataTypes.STRING,
			unique: false,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
		},
		// creatorId: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: true,
		// },
		// avatarId: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: true
		// },
		// roleId: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: true,
		// },
	}, {
		hooks,
		sequelize, // We need to pass the connection instance
		modelName: 'User', // We need to choose the model name
		tableName: 'user_Users'
	});

	return User;
};
