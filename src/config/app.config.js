import * as dotenv from "dotenv";

dotenv.config();

export const appConfig = {
	PORT: process.env.PORT || 8080,
	HOST: process.env.HOST,
	DB_URL: process.env.DB_URL
};
