'use strict';
const { password } = require('../api/services/bcrypt.service')();
module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		*/
		return queryInterface.bulkInsert('user_Users', [
			{
				"userName": "Joe.Smith",
				"firstName": "Joe",
				"lastName": "Smith",
				"email": "joe@smith.com",
				"password": password({password:"joepassword"}),
				"departmentId": 1,
				"avatarId": 1,
				"roleId": 1,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"userName": "Sally.Jones",
				"firstName": "Sally",
				"lastName": "Jones",
				"email": "sally@jones.com",
				"password": password({password:"sallypassword"}),
				"departmentId": 2,
				"avatarId": 2,
				"roleId": 2,
				createdAt: new Date(),
				updatedAt: new Date()

			},
			{
				"userName": "John.Doe",
				"firstName": "John",
				"lastName": "Doe",
				"email": "john@doe.com",
				"password": password({password:"johnpassword"}),
				"departmentId": 1,
				"avatarId": 3,
				"roleId": 3,
				createdAt: new Date(),
				updatedAt: new Date()

			}
		], {});
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		return queryInterface.bulkDelete('user_Users', [
			{
				id: 0
			}
		])
	}
};

