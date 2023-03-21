import { recipesService } from "../services/recipes.service.js";
import { statuses } from "../config/statuses.config.js";
import { ApiError } from "../config/apiError.config.js";

export const recipesController = {
	async getPopularRecipes(_, res) {
		const popularRecipes = await recipesService.getPopularRecipes();

		if (!popularRecipes) {
			throw new ApiError(statuses.SERVER_ERROR, "Subscription not found");
		}

		res.status(statuses.OK).json(popularRecipes);
	},

	async getRecipesByCategory(req, res) {
		const category = req.params.category;

		const recipesByCategory = await recipesService.getRecipesByCategory(category);

		if (!recipesByCategory) {
			throw new ApiError(statuses.SERVER_ERROR, "Subscription not found");
		}

		res.status(statuses.OK).json(recipesByCategory);
	},

	async getRecipeDetails(req, res) {
		const recipeId = req.params.id;

		const recipeDetails = await recipesService.getRecipeDetails(recipeId);

		if (!recipeDetails) {
			throw new ApiError(statuses.SERVER_ERROR, "Subscription not found");
		}

		res.status(statuses.OK).json(recipeDetails);
	}
};
