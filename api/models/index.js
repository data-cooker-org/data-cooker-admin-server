'use strict';

// const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];
const treeService = require('../services/tree.service');
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// const walkSync = (dir, filelist = []) => {
// 	fs.readdirSync(dir).forEach(file => {
// 		filelist = fs.statSync(path.join(dir, file)).isDirectory()
// 			? walkSync(path.join(dir, file), filelist)
// 			: filelist.concat(path.join(dir, file));
// 	});
// 	return filelist;
// }

treeService().walkSync(__dirname)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (!file.endsWith(basename)) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		// console.log(file);
		// const model = require(file);
		// console.log(model.name);
		const model = require(file)(sequelize, Sequelize.DataTypes);
		// console.log(model.name);
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
