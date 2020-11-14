const { Op } = require('sequelize');
const { Avatar } = require('../../models');


const AvatarController = () => {
	const getAvatars = async (req, res) => {
		const avatars = await Avatar.findAll({
			attributes: ['id', 'avatarData'],
			where: {
				[Op.or]: [
					{ isPublic: [1, (req.token.id !== 1)] },
					{ creatorId: req.token.id }
				]
			}
		});
		res.header('Access-Control-Expose-Headers', 'X-Total-Count')
			.header('X-Total-Count', avatars.length)
			.json({ avatars });
	};

	const getAvatar = async (req, res) => {
		const avatar = await Avatar.findByPk(req.params.id, {
			attributes: ['id', 'avatarData'],
		});

		if (avatar) {
			res.json({ avatar });
		} else {
			res.status(404).json({ message: 'Avatar id not found.' });
		}
	};

	return {
		getAvatars,
		getAvatar,
	};
};

module.exports = AvatarController;

