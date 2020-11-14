const {
	GraphQLSchema,
	GraphQLObjectType,
} = require('graphql');

const { roleQuery } = require('./queries');
const { userQuery } = require('./queries');
const { targetQuery } = require('./queries');
const { sourceQuery } = require('./queries');
const { noteQuery } = require('./queries');
const { createRole, updateRole, deleteRole } = require('./mutations');
const { createUser, updateUser, deleteUser } = require('./mutations');
const { createTarget, updateTarget, deleteTarget } = require('./mutations');
const { createSource, updateSource, deleteSource } = require('./mutations');
const { createNote, updateNote, deleteNote } = require('./mutations');

const RootQuery = new GraphQLObjectType({
	name: 'rootQuery',
	description: 'This is the root query which holds all possible READ entrypoints for the GraphQL API',
	fields: () => ({
		role: roleQuery,
		user: userQuery,
		target: targetQuery,
		source: sourceQuery,
		note: noteQuery,
	}),
});

const RootMutation = new GraphQLObjectType({
	name: 'rootMutation',
	description: 'This is the root mutation which holds all possible WRITE entrypoints for the GraphQL API',
	fields: () => ({
		createRole,
		updateRole,
		deleteRole,
		createUser,
		updateUser,
		deleteUser,
		createTarget,
		updateTarget,
		deleteTarget,
		createSource,
		updateSource,
		deleteSource,
		createNote,
		updateNote,
		deleteNote,
	}),
});

const schema = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation,
});

module.exports = { schema };
