'use strict';

const path = require('path');
const basename = path.basename(__filename);
const treeService = require('../services/tree.service');
const Executors = {};


treeService().walkSync(__dirname)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (!file.endsWith(basename)) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		// console.log(file);
		// const executor = require(file);
		// console.log(executor.name);
		const executor = require(file)();
		Executors[executor.name] = executor;
	});


module.exports = Executors;
