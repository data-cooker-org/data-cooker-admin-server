const { Permission } = require('../../models');


const PermissionController = () => {
	const getPermissions = async (req, res) => {
		const permissions = await Permission.findAll({
			attributes: ['id', 'featureId', 'roleId'],
		});
		res.header('Access-Control-Expose-Headers', 'X-Total-Count')
			.header('X-Total-Count', permissions.length)
			.json({ permissions });
	};

	const getPermission = async (req, res) => {
		const permission = await Permission.findByPk(req.params.id, {
			attributes: ['id', 'featureId', 'roleId'],
		});

		if (permission) {
			res.json(permission);
		} else {
			res.status(404).json({ message: 'Permission id not found.' });
		}
	};

	return {
		getPermissions,
		getPermission,
	};
};

module.exports = PermissionController;

