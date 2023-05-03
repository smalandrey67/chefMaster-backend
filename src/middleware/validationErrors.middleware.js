import { validationResult } from "express-validator";

import { ApiError } from "../config/apiError.config.js";

export const validationErrors = (req, res, next) => {
	const validationErrors = validationResult(req);

	if (!validationErrors.isEmpty()) {
		throw ApiError.ValidationFailed(validationErrors.errors);
	}

	next();
};
