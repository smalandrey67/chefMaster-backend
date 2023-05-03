import { ViewSettingsModel } from "../models/viewSettings.model.js";

export const viewSettingsService = {
	async getViewSettings(userId) {
		const foundViewSettings = await ViewSettingsModel.findOne({ _id: userId });
		return foundViewSettings;
	},

	async saveViewSettings(userId, main, navbar) {
		await ViewSettingsModel.findOneAndUpdate({ _id: userId }, { $set: { main, navbar } }, { new: true });
	}
};
