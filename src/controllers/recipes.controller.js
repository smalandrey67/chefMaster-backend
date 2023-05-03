import { recipesService } from "../services/recipes.service.js";
import { statuses } from "../constants/httpStatuses.constants.js";

import { messages } from "../constants/errorMessages.constants.js";
import { ApiError } from "../config/apiError.config.js";

export const recipesController = {
	async getPopularRecipes(req, res) {
		const limit = req.query._limit;

		const popularRecipes = await recipesService.getPopularRecipes(limit);

		if (!popularRecipes) {
			throw ApiError.ServerError(messages.SUBSCRIPTION_NOT_FOUND);
		}

		res.status(statuses.OK).json(popularRecipes);
	},

	async getRecipesByCategory(req, res) {
		const category = req.params.category;

		const recipesByCategory = await recipesService.getRecipesByCategory(category);

		if (!recipesByCategory) {
			throw ApiError.ServerError(messages.SUBSCRIPTION_NOT_FOUND);
		}

		res.status(statuses.OK).json(recipesByCategory);
	},

	async getRecipeDetails(req, res) {
		const recipeId = req.params.id;

		const recipeDetails = await recipesService.getRecipeDetails(recipeId);

		if (!recipeDetails) {
			throw ApiError.ServerError(messages.SUBSCRIPTION_NOT_FOUND);
		}

		res.status(statuses.OK).json(recipeDetails);
	}
};
