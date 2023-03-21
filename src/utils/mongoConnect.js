import mongoose from "mongoose";
import { appConfig } from "../config/app.config.js";

export const mongoConnect = async () => {
	try {
		await mongoose.connect(appConfig.DB_URL + appConfig.DB_NAME);
		console.log("mongodb was successfully connected");
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};
