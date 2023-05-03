import { ApiError } from "../config/apiError.config.js";
import { messages } from "../constants/errorMessages.constants.js";

import { tokenService } from "../services/token.service.js";

export const tokenCheck = (req, res, next) => {
	const authorizationHeader = req.headers.authorization;

	if (!authorizationHeader) {
		throw ApiError.Unauthorized(messages.UNAUTHORIZED);
	}

	const accessToken = authorizationHeader.split(" ")[1];
	const userData = tokenService.validateAccessToken(accessToken);

	if (!userData) {
		throw ApiError.Unauthorized(messages.UNAUTHORIZED);
	}

	req.user = userData;
	next();
};
