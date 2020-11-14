const { Sequelize, DataTypes } = require("sequelize");

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/_config.json')[env];


let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const models = {
	Source: require("./aggModels/agg_Sources")(sequelize, DataTypes),
	Target: require("./aggModels/agg_Targets")(sequelize, DataTypes),
	Permission: require("./coreModels/core_Permissions")(sequelize, DataTypes),
	Feature: require("./coreModels/core_Features")(sequelize, DataTypes),
	Course: require("./mediaModels/media_Courses")(sequelize, DataTypes),
	Note: require("./mediaModels/media_Notes")(sequelize, DataTypes),
	Job: require("./taskModels/task_Jobs")(sequelize, DataTypes),
	Task: require("./taskModels/task_Tasks")(sequelize, DataTypes),
	Avatar: require("./userModels/user_Avatars")(sequelize, DataTypes),
	Department: require("./userModels/user_Departments")(sequelize, DataTypes),
	Role: require("./userModels/user_Roles")(sequelize, DataTypes),
	User: require("./userModels/user_Users")(sequelize, DataTypes),
};

// models.Course.belongsTo(models.User, { as: 'user' });
// models.Note.belongsTo(models.User, { as: 'user' });
models.Permission.belongsTo(models.Role, { as: 'role' });
models.Source.belongsTo(models.Target, { as: 'target' });
models.Task.belongsTo(models.Job, { as: 'job' });
models.User.belongsTo(models.Avatar, { as: 'avatar' });
models.User.belongsTo(models.Role, { as: 'role' });
models.User.belongsTo(models.Department, { as: 'department' });

// models.Permission.belongsTo(models.Feature, { as: 'feature' });
models.Feature.hasMany(models.Permission, { as: 'permissions' });
// models.Role.belongsTo(models.Feature, { as: 'feature' });
// models.Avatar.belongsTo(models.Feature, { as: 'feature' });
// models.Department.belongsTo(models.Feature, { as: 'feature' });
// models.User.belongsTo(models.Feature, { as: 'feature' });
models.Job.belongsTo(models.Feature, { as: 'feature' });
models.Task.belongsTo(models.Feature, { as: 'feature' });
models.Source.belongsTo(models.Feature, { as: 'feature' });
models.Target.belongsTo(models.Feature, { as: 'feature' });
models.Note.belongsTo(models.Feature, { as: 'feature' });
models.Course.belongsTo(models.Feature, { as: 'feature' });

// models.Avatar.hasMany(models.User, { as: 'users', foreignKey: 'avatarId' });
// models.Role.hasMany(models.User, { as: 'users', foreignKey: 'roleId' });
// models.Target.hasMany(models.Source, { as: 'sources', foreignKey: 'targetId' });
// models.User.hasMany(models.Note, { as: 'notes', foreignKey: 'creatorId' });
// models.User.hasMany(models.Course, { as: 'courses', foreignKey: 'creatorId' });


const db = {
	...models,
	sequelize
};

module.exports = db;
