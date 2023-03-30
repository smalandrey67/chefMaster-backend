import bcrypt from "bcrypt";

import { ApiError } from "../config/apiError.config.js";
import { messages } from "../constants/errorMessages.constants.js";

import { manageTokens } from "../utils/manageTokens.js";
import { UserModel } from "../models/user.model.js";
import { tokenService } from "./token.service.js";

export const authService = {
	async registration(email, password) {
		const foundUser = await UserModel.findOne({ email });

		if (foundUser) {
			throw ApiError.Conflict(messages.ALREADY_EXIST);
		}

		const hashedPassword = await bcrypt.hash(password, 3);
		const createdUser = await UserModel.create({ email, password: hashedPassword });

		return {
			user: { id: createdUser._id, email: createdUser.email }
		};
	},

	async login(email, password) {
		const foundUser = await UserModel.findOne({ email });

		if (!foundUser) {
			throw ApiError.BadRequest(messages.NOT_FOUND);
		}

		const isPasswordEqual = await bcrypt.compare(password, foundUser.password);

		if (!isPasswordEqual) {
			throw ApiError.BadRequest(messages.INCORRECT_PASSWORD);
		}

		const tokens = await manageTokens(foundUser);

		return {
			...tokens,
			user: { id: foundUser._id, email: foundUser.email }
		};
	},

	async logout(refreshToken) {
		await tokenService.removeToken(refreshToken);
	},

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.Unauthorized();
		}

		const decryptedUserData = tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = await tokenService.findToken(refreshToken);

		if (!decryptedUserData || !tokenFromDb) {
			throw ApiError.Unauthorized();
		}

		const foundUser = await UserModel.findById(decryptedUserData.id);

		const tokens = await manageTokens(foundUser);

		return {
			...tokens,
			user: { id: foundUser._id, email: foundUser.email }
		};
	}
};
