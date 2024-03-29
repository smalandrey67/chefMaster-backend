import dotenv from "dotenv";

dotenv.config();

export const appConfig = {
	PORT: process.env.PORT || 8080,
	HOST: process.env.HOST,
	DB_URL: process.env.DB_URL,
	DB_NAME: process.env.DB_NAME,
	JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY,
	JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY,
	CLOUD_NAME: process.env.CLOUD_NAME,
	API_KEY: process.env.API_KEY,
	API_SECRET: process.env.API_SECRET
};
