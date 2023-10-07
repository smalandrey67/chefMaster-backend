import { ApiError } from "../config/apiError.config.js";
import { authService } from "../services/auth.service.js";

import { statuses } from "../constants/httpStatuses.constants.js";
import { refreshTokenCookieOptions } from "../constants/token.constants.js";

import cloudinary from "../config/cloudinary.config.js";

export const authController = {
	async registration(req, res) {
		const { email, password, userName } = req.body;
		const registrationResult = await authService.registration(email, password, userName);

		return res.json(registrationResult);
	},

	async login(req, res) {
		const { email, password } = req.body;
		const loginResult = await authService.login(email, password);

		res.cookie("refreshToken", loginResult.refreshToken, refreshTokenCookieOptions);

		return res.json(loginResult);
	},

	async logout(req, res) {
		const { refreshToken } = req.cookies;
		await authService.logout(refreshToken);

		res.clearCookie("refreshToken");
		res.clearCookie("isLoggedIn");

		return res.status(statuses.NO_CONTENT).json({});
	},

	async refresh(req, res) {
		const { refreshToken } = req.cookies;

		const refreshResult = await authService.refresh(refreshToken);

		res.cookie("refreshToken", refreshResult.refreshToken, refreshTokenCookieOptions);

		return res.json(refreshResult);
	},

	async updateEmail(req, res) {
		const { oldEmail, updatedEmail } = req.body;
		const { refreshToken } = req.cookies;

		const updatedUser = await authService.updateEmail(oldEmail, updatedEmail, refreshToken);

		res.cookie("refreshToken", updatedUser.refreshToken, refreshTokenCookieOptions);

		return res.json(updatedUser);
	},

	async updateUserName(req, res) {
		const { oldUserName, updatedUserName } = req.body;
		const { refreshToken } = req.cookies;

		const updatedUser = await authService.updateUserName(oldUserName, updatedUserName, refreshToken);

		res.cookie("refreshToken", updatedUser.refreshToken, refreshTokenCookieOptions);

		return res.json(updatedUser);
	},

	async updateAvatar(req, res) {
		const { userId } = req.body;
		const { refreshToken } = req.cookies;

		if (req.fileValidationError) {
			throw ApiError.BadRequest(req.fileValidationError);
		}

		const uploadedAvatar = await cloudinary.uploader.upload(req.file.path);
		const updatedAvatar = await authService.updateAvatar(uploadedAvatar.secure_url, userId, refreshToken);

		res.cookie("refreshToken", updatedAvatar.refreshToken, refreshTokenCookieOptions);

		return res.json(updatedAvatar);
	}
};
