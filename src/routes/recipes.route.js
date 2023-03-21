import { recipesController } from "../controllers/recipes.controller.js";
import { catchError } from "../utils/catchError.js";

export const recipesRoute = (router) => {
	router.get("/recipes/popular", catchError(recipesController.getPopularRecipes));
	router.get("/recipes/details/:id", catchError(recipesController.getRecipeDetails));
	router.get("/recipes/category/:category", catchError(recipesController.getRecipesByCategory));
};
