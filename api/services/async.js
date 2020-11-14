// Helper function so that we don't need to add try/catch to every route
module.exports = function asyncHandler(cb) {
	return async (req, res, next) => {
		try {
			await cb(req, res, next);
		} catch (err) {
			next(err);
		}
	};
};
