import { Router } from "express";

import { articlesController } from "../controllers/articles.controller.js";

export const articlesRoute = Router();

articlesRoute.get("/articles", articlesController.getAllArticles);
