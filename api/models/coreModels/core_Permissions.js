'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
	  Permission.belongsTo(models.Role, {
		as: 'role',
		foreignKey: {
			fieldName: 'roleId',
			allowNull: false,
		},
	});
    }
  };
  Permission.init({
	// id: {
	//   type: DataTypes.INTEGER,
	//   primaryKey: true,
	//   autoIncrement: true,
	// },
	permisionNote: {
		type: DataTypes.STRING,
	}
	// featureId: {
	// 	type: DataTypes.INTEGER,
	// },
	// roleId: {
	// 	type: DataTypes.INTEGER,
	// 	allowNull: true
	// },
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Permission', // We need to choose the model name
	tableName: 'core_Permissions'
});


return Permission;
};
