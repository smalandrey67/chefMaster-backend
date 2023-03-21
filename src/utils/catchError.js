export const catchError = (controller) => {
	return async (req, res, next) => {
		try {
			await controller(req, res);
		} catch (error) {
			return next(error);
		}
	};
};
