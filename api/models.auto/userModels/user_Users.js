const Sequelize = require('sequelize');
const bcryptSevice = require('../../services/bcrypt.service');

const hooks = {
	beforeCreate(user) {
		// eslint-disable-line no-param-reassign
		user.password = bcryptSevice().password(user);
	},
};

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('User', {
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
		sequelize, 
		tableName: 'user_Users',
		timestamps: true
	});
};
