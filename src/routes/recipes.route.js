import { recipesController } from "../controllers/recipes.controller.js";

export const recipesRoute = (router) => {
	router.get("/recipes", recipesController.getPopularRecipes);
	router.get("/recipes/:category", recipesController.getRecipesByCategory);
};
