import { v2 as cloudinary } from "cloudinary";
import { appConfig } from "./app.config.js";

cloudinary.config({
	cloud_name: appConfig.CLOUD_NAME,
	api_key: appConfig.API_KEY,
	api_secret: appConfig.API_SECRET
});

export default cloudinary;
