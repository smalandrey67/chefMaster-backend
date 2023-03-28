import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { mongoConnect } from "./utils/mongoConnect.js";
import { appConfig } from "./config/app.config.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";

import { appRouter } from "./routes/app.route.js";

const app = express();
const PORT = appConfig.PORT;
const HOST = appConfig.HOST;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
		optionSuccessStatus: 200
	})
);
app.use("/api", appRouter);
app.use(errorHandler);

mongoConnect().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running at http://${HOST}:${PORT}`);
	});
});
