import { ApiError } from "../config/apiError.config.js";
import { statuses } from "../config/statuses.config.js";

export const errorHandler = (error, req, res, next) => {
	if (error.name === "ValidationError") {
		return res.status(statuses.BAD_REQUEST).json({
			type: "ValidationError",
			details: error.details
		});
	}

	if (error instanceof ApiError) {
		return res.status(error.statusCode).json({
			message: error.message
		});
	}

	return res.status(statuses.SERVER_ERROR).json({
		message: "Server Error"
	});
};
