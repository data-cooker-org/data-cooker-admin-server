const { Role } = require('../../models');


const RoleController = () => {
	const getRoles = async (req, res) => {
		const roles = await Role.findAll({
			attributes: ['id', 'roleName'],
		});
		res.header('Access-Control-Expose-Headers', 'X-Total-Count')
			.header('X-Total-Count', roles.length)
			.json({ roles });
	};


	const getRole = async (req, res) => {
		const role = await Role.findByPk(req.params.id, {
			attributes: ['id', 'roleName'],
		});

		if (role) {
			res.json({ role });
		} else {
			res.status(404).json({ message: 'Role id not found.' });
		}
	};

	return {
		getRoles,
		getRole,
	};
};

module.exports = RoleController;

