import { Router } from "express";

import { articlesRoute } from "./articles.route.js";
import { recipesRoute } from "./recipes.route.js";
import { authRoute } from "./auth.route.js";

export const appRouter = Router();

articlesRoute(appRouter);
recipesRoute(appRouter);
authRoute(appRouter);
