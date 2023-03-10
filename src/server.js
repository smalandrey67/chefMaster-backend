import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import { recipesRouter } from "./routes/recipes.route.js";
import { articlesRoute } from "./routes/articles.route.js";

import { connectDB } from "./config/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", recipesRouter);
app.use("/api", articlesRoute);

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running at http://${HOST}:${PORT}`);
	});
});
