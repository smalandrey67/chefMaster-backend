import { recipesController } from "../controllers/recipes.controller.js";

export const recipesRoute = (router) => {
	router.get("/recipes/popular", recipesController.getPopularRecipes);
};
