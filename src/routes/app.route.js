import { Router } from "express";

import { articlesRoute } from "./articles.route.js";
import { recipesRoute } from "./recipes.route.js";
import { authRoute } from "./auth.route.js";
import { viewSettingsRoute } from "./viewSettings.route.js";

export const appRouter = Router();

articlesRoute(appRouter);
recipesRoute(appRouter);
authRoute(appRouter);
viewSettingsRoute(appRouter);
