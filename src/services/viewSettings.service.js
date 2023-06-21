import { ApiError } from "../config/apiError.config.js";
import { ViewSettingsModel } from "../models/viewSettings.model.js";

export const viewSettingsService = {
	async getViewSettings(refreshToken, userId) {
		if (!refreshToken) {
			throw ApiError.Unauthorized();
		}

		const foundViewSettings = await ViewSettingsModel.findOne({ _id: userId });
		return foundViewSettings;
	},

	async saveViewSettings(refreshToken, userId, main, navbar) {
		if (!refreshToken) {
			throw ApiError.Unauthorized();
		}

		await ViewSettingsModel.findOneAndUpdate({ _id: userId }, { $set: { main, navbar } }, { new: true });
	}
};
