const { Feature } = require('../../models');


const FeatureController = () => {
	const getFeatures = async (req, res) => {
		const features = await Feature.findAll({
			attributes: ['id', 'featureName'],
		});
		res.header('Access-Control-Expose-Headers', 'X-Total-Count')
			.header('X-Total-Count', features.length)
			.json({ features });
	};


	const getFeature = async (req, res) => {
		const feature = await Feature.findByPk(req.params.id, {
			attributes: ['id', 'featureName'],
		});

		if (feature) {
			res.json({ feature });
		} else {
			res.status(404).json({ message: 'Feature id not found.' });
		}
	};

	return {
		getFeatures,
		getFeature,
	};
};

module.exports = FeatureController;

