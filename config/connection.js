const development = {
	database: 'databasename',
	username: 'username',
	password: 'password',
	host: 'localhost',
	dialect: 'sqlite' || 'mysql' || 'postgres',
};

const testing = {
	database: 'databasename',
	username: 'username',
	password: 'password',
	host: 'localhost',
	dialect: 'sqlite' || 'mysql' || 'postgres',
};

const production = {
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	host: process.env.DB_HOST || 'localhost',
	dialect: 'sqlite' || 'mysql' || 'postgres',
	// new added, may not neccssary
	secret: process.env.JWT_SECRET, /* services->auth-service.js */
	port: process.env.PORT, /* index.js */
};

module.exports = {
	development,
	testing,
	production,
};
