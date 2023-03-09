import { Router } from "express";

import { recipesController } from "../controllers/recipes.controller.js";

export const recipesRouter = Router();

recipesRouter.get("/recipes/popular", recipesController.getPopularRecipes);
