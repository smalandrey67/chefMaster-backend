import { viewSettingsService } from "../services/viewSettings.service.js";
import { statuses } from "../constants/httpStatuses.constants.js";

export const viewSettingsController = {
	async getViewSettings(req, res) {
		const userId = req.params.userId;

		const viewSettings = await viewSettingsService.getViewSettings(userId);

		res.status(statuses.OK).json(viewSettings);
	},

	async saveViewSettings(req, res) {
		const userId = req.params.userId;
		const { main, navbar } = req.body;

		const viewSettings = await viewSettingsService.saveViewSettings(userId, main, navbar);

		res.status(statuses.OK).json(viewSettings);
	}
};
