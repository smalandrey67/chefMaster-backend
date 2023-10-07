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

		const savedViewSettings = await ViewSettingsModel.findOneAndUpdate({ _id: userId }, { $set: { main, navbar } }, { new: true });
		return savedViewSettings;
	},

	async resetViewSettings(refreshToken, userId) {
		if (!refreshToken) {
			throw ApiError.Unauthorized();
		}

		const defaultViewSettings = await ViewSettingsModel.findOneAndUpdate(
			{ _id: userId },
			{ $set: { main: { background: "linear-gradient(45deg, #212121, #282828)" }, navbar: { background: "#212121" } } },
			{ new: true }
		);
		return defaultViewSettings;
	}
};
