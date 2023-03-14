import express from "express";
import cors from "cors";

import { mongoConnect } from "./utils/mongo.utility.js";
import { appConfig } from "./config/app.config.js";

import { appRouter } from "./routes/app.route.js";

const app = express();
const PORT = appConfig.PORT;
const HOST = appConfig.HOST;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", appRouter);

mongoConnect().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running at http://${HOST}:${PORT}`);
	});
});
