import bcrypt from "bcrypt";

import { ApiError } from "../config/apiError.config.js";
import { messages } from "../constants/errorMessages.constants.js";

import { manageTokens } from "../utils/manageTokens.js";
import { tokenService } from "./token.service.js";
import { UserDto } from "../dtos/user.dto.js";

import { UserModel } from "../models/user.model.js";
import { ViewSettingsModel } from "../models/viewSettings.model.js";

export const authService = {
	async registration(email, password, userName) {
		const hashedPassword = await bcrypt.hash(password, 3);
		const createdUser = await UserModel.create({ email, password: hashedPassword, userName });
		const userDto = new UserDto(createdUser);

		return { user: userDto };
	},

	async login(email, password) {
		const foundUser = await UserModel.findOne({ email });
		const foundViewSettings = await ViewSettingsModel.find({ _id: foundUser._id });

		if (!foundViewSettings.length) {
			await ViewSettingsModel.create({
				_id: foundUser._id,
				main: { viewClass: "background: linear-gradient(45deg, var(--dark-10), var(--dark-20))" },
				navbar: { viewClass: "background: var(--dark-10)" }
			});
		}

		const userDto = new UserDto(foundUser);
		const tokens = await manageTokens(userDto);

		return { ...tokens, user: userDto };
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
		const userDto = new UserDto(foundUser);
		const tokens = await manageTokens(userDto);

		return { ...tokens, user: userDto };
	},

	async updateEmail(oldEmail, updatedEmail, refreshToken) {
		if (!refreshToken) {
			throw ApiError.Unauthorized();
		}

		const userWithUpdatedEmail = await UserModel.findOneAndUpdate({ email: oldEmail }, { $set: { email: updatedEmail } }, { new: true });

		if (!userWithUpdatedEmail) {
			throw ApiError.BadRequest(messages.EMAIL_NOT_FOUND);
		}

		const userDto = new UserDto(userWithUpdatedEmail);
		const tokens = await manageTokens(userDto);

		return { ...tokens, user: userDto };
	},

	async updateUserName(oldUserName, updatedUserName, refreshToken) {
		if (!refreshToken) {
			throw ApiError.Unauthorized();
		}

		const userWithUpdatedName = await UserModel.findOneAndUpdate(
			{ userName: oldUserName },
			{ $set: { userName: updatedUserName } },
			{ new: true }
		);

		if (!userWithUpdatedName) {
			throw ApiError.BadRequest(messages.USER_NAME_NOT_FOUND);
		}

		const userDto = new UserDto(userWithUpdatedName);
		const tokens = await manageTokens(userDto);

		return { ...tokens, user: userDto };
	}
};
