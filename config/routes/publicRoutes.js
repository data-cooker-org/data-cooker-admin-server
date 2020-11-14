const publicRoutes = {
	'POST /register': 'AuthController/AuthController.register',
	'POST /login': 'AuthController/AuthController.login',
	'POST /validate': 'AuthController/AuthController.validate',
};

module.exports = publicRoutes;
