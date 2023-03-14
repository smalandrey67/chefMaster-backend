import mongoose from "mongoose";
import { appConfig } from "../config/app.config.js";

export const mongoConnect = async () => {
	try {
		await mongoose.connect(appConfig.DB_URL);
		console.log("mongodb was successfully connected");
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
