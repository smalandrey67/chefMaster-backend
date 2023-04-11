import bcrypt from "bcrypt";

import { ApiError } from "../config/apiError.config.js";
import { messages } from "../constants/errorMessages.constants.js";

import { manageTokens } from "../utils/manageTokens.js";
import { UserModel } from "../models/user.model.js";
import { tokenService } from "./token.service.js";

export const authService = {
	async registration(email, password, userName) {
		const foundUser = await UserModel.findOne({ email });

		if (foundUser) {
			throw ApiError.Conflict(messages.EMAIL_ALREADY_EXIST);
		}

		const hashedPassword = await bcrypt.hash(password, 3);
		const createdUser = await UserModel.create({ email, password: hashedPassword, userName });

		return {
			user: { id: createdUser._id, email: createdUser.email, userName: createdUser.userName, createdAt: createdUser.createdAt }
		};
	},

	async login(email, password) {
		const foundUser = await UserModel.findOne({ email });

		if (!foundUser) {
			throw ApiError.BadRequest(messages.EMAIL_NOT_FOUND);
		}

		const isPasswordEqual = await bcrypt.compare(password, foundUser.password);

		if (!isPasswordEqual) {
			throw ApiError.BadRequest(messages.INCORRECT_PASSWORD);
		}

		const tokens = await manageTokens(foundUser);

		return {
			...tokens,
			user: { id: foundUser._id, email: foundUser.email, userName: foundUser.userName, createdAt: foundUser.createdAt }
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
			user: { id: foundUser._id, email: foundUser.email, userName: foundUser.userName, createdAt: foundUser.createdAt }
		};
	},

	async updateEmail(oldEmail, updatedEmail, refreshToken) {
		if (!refreshToken) {
			throw ApiError.Unauthorized();
		}

		if (oldEmail === updatedEmail) {
			throw ApiError.BadRequest(messages.EMAIL_UPDATE_THE_SAME);
		}

		const alreadyExistEmail = await UserModel.find({ email: updatedEmail });

		if (alreadyExistEmail.length) {
			throw ApiError.Conflict(messages.EMAIL_ALREADY_EXIST);
		}

		const userWithUpdatedEmail = await UserModel.findOneAndUpdate({ email: oldEmail }, { $set: { email: updatedEmail } }, { new: true });

		if (!userWithUpdatedEmail) {
			throw ApiError.BadRequest(messages.EMAIL_NOT_FOUND);
		}

		const tokens = await manageTokens(userWithUpdatedEmail);

		return {
			...tokens,
			user: {
				id: userWithUpdatedEmail._id,
				email: userWithUpdatedEmail.email,
				userName: userWithUpdatedEmail.userName,
				createdAt: userWithUpdatedEmail.createdAt
			}
		};
	},

	async updateUserName(oldUserName, updatedUserName, refreshToken) {
		if (!refreshToken) {
			throw ApiError.Unauthorized();
		}

		if (oldUserName === updatedUserName) {
			throw ApiError.BadRequest(messages.USER_NAME_UPDATE_THE_SAME);
		}

		const alreadyExistUserName = await UserModel.find({ userName: updatedUserName });

		if (alreadyExistUserName.length) {
			throw ApiError.Conflict(messages.USER_NAME_ALREADY_EXIST);
		}

		const userWithUpdatedName = await UserModel.findOneAndUpdate(
			{ userName: oldUserName },
			{ $set: { userName: updatedUserName } },
			{ new: true }
		);

		if (!userWithUpdatedName) {
			throw ApiError.BadRequest(messages.USER_NAME_NOT_FOUND);
		}

		const tokens = await manageTokens(userWithUpdatedName);

		return {
			...tokens,
			user: {
				id: userWithUpdatedName._id,
				email: userWithUpdatedName.email,
				userName: userWithUpdatedName.userName,
				createdAt: userWithUpdatedName.createdAt
			}
		};
	}
};
