const {
	createNote,
	updateNote,
	deleteNote,
} = require('./NoteMutation');
const {
	createAvatar,
	updateAvatar,
	deleteAvatar,
} = require('./AvatarMutation');
const {
	createRole,
	updateRole,
	deleteRole,
} = require('./RoleMutation');
const {
	createUser,
	updateUser,
	deleteUser,
} = require('./UserMutation');
const {
	createTarget,
	updateTarget,
	deleteTarget,
} = require('./TargetMutation');
const {
	createSource,
	updateSource,
	deleteSource,
} = require('./SourceMutation');

module.exports = {
	createNote,
	updateNote,
	deleteNote,
	createAvatar,
	updateAvatar,
	deleteAvatar,
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
};
