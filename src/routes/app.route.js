import { Router } from "express";

import { articlesRoute } from "./articles.route.js";
import { recipesRoute } from "./recipes.route.js";

export const appRouter = Router();

articlesRoute(appRouter);
recipesRoute(appRouter);
