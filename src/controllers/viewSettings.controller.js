import { viewSettingsService } from "../services/viewSettings.service.js";
import { statuses } from "../constants/httpStatuses.constants.js";

export const viewSettingsController = {
	async getViewSettings(req, res) {
		const { refreshToken } = req.cookies;
		const userId = req.params.userId;

		const viewSettings = await viewSettingsService.getViewSettings(refreshToken, userId);

		res.status(statuses.OK).json(viewSettings);
	},

	async saveViewSettings(req, res) {
		const { refreshToken } = req.cookies;
		const userId = req.params.userId;
		const { main, navbar } = req.body;

		const savedViewSettings = await viewSettingsService.saveViewSettings(refreshToken, userId, main, navbar);

		res.status(statuses.OK).json(savedViewSettings);
	},

	async resetViewSettings(req, res) {
		const { refreshToken } = req.cookies;
		const userId = req.params.userId;

		const defaultViewSettings = await viewSettingsService.resetViewSettings(refreshToken, userId);

		res.status(statuses.OK).json(defaultViewSettings);
	}
};
