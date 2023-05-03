import jwt from "jsonwebtoken";

import { ApiError } from "../config/apiError.config.js";
import { appConfig } from "../config/app.config.js";

import { messages } from "../constants/errorMessages.constants.js";
import { accessTokenJwtOptions, refreshTokenJwtOptions } from "../constants/token.constants.js";
import { TokenModel } from "../models/token.model.js";

export const tokenService = {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, appConfig.JWT_ACCESS_KEY, accessTokenJwtOptions);
		const refreshToken = jwt.sign(payload, appConfig.JWT_REFRESH_KEY, refreshTokenJwtOptions);

		return { accessToken, refreshToken };
	},

	async saveRefreshToken(userId, refreshToken) {
		const foundRefreshToken = await TokenModel.findOne({ user: userId });

		if (foundRefreshToken) {
			foundRefreshToken.refreshToken = refreshToken;
			return foundRefreshToken.save();
		}

		const token = await TokenModel.create({ user: userId, refreshToken });
		return token;
	},

	async removeToken(refreshToken) {
		return await TokenModel.deleteOne({ refreshToken });
	},

	async findToken(refreshToken) {
		const foundToken = await TokenModel.findOne({ refreshToken });
		return foundToken;
	},

	validateAccessToken(accessToken) {
		try {
			const decryptedUserData = jwt.verify(accessToken, appConfig.JWT_ACCESS_KEY);
			return decryptedUserData;
		} catch (error) {
			throw ApiError.Unauthorized(messages.UNAUTHORIZED);
		}
	},

	validateRefreshToken(refreshToken) {
		try {
			const decryptedUserData = jwt.verify(refreshToken, appConfig.JWT_REFRESH_KEY);
			return decryptedUserData;
		} catch (error) {
			throw ApiError.Unauthorized(messages.UNAUTHORIZED);
		}
	}
};
