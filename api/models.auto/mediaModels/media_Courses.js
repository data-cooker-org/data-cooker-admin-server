module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Course', {
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
		sequelize, 
		tableName: 'media_Courses',
		timestamps: true
	});
};
