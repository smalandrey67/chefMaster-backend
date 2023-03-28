import { ApiError } from "../config/apiError.config.js";
import { statuses } from "../constants/httpStatuses.constants.js";

export const errorHandler = (error, req, res, next) => {
	if (error instanceof ApiError) {
		return res.status(error.status).json({
			message: error.message,
			error: error.errors
		});
	}

	return res.status(statuses.SERVER_ERROR).json({
		message: "Server Error"
	});
};
