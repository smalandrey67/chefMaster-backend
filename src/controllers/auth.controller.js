import { authService } from "../services/auth.service.js";

import { statuses } from "../constants/httpStatuses.constants.js";
import { refreshTokenCookieOptions } from "../constants/token.constants.js";

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
		res.cookie("isLoggedIn", true, refreshTokenCookieOptions);

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
		res.cookie("isLoggedIn", true, refreshTokenCookieOptions);

		return res.json(refreshResult);
	},

	async updateEmail(req, res) {
		const { oldEmail, updatedEmail } = req.body;
		const { refreshToken } = req.cookies;

		const updatedUser = await authService.updateEmail(oldEmail, updatedEmail, refreshToken);

		res.cookie("refreshToken", updatedUser.refreshToken, refreshTokenCookieOptions);
		res.cookie("isLoggedIn", true, refreshTokenCookieOptions);

		return res.json(updatedUser);
	},

	async updateUserName(req, res) {
		const { oldUserName, updatedUserName } = req.body;
		const { refreshToken } = req.cookies;

		const updatedUser = await authService.updateUserName(oldUserName, updatedUserName, refreshToken);

		res.cookie("refreshToken", updatedUser.refreshToken, refreshTokenCookieOptions);
		res.cookie("isLoggedIn", true, refreshTokenCookieOptions);

		return res.json(updatedUser);
	}
};
