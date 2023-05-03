import { RecipeModel } from "../models/recipe.model.js";
import { RecipeDetailsModel } from "../models/recipeDetails.model.js";

export const recipesService = {
	async getPopularRecipes(limit) {
		const popularRecipes = await RecipeModel.find({ rating: { $gt: 3.5 } }).limit(limit);
		return popularRecipes;
	},

	async getRecipesByCategory(category) {
		const recipesByCategory = await RecipeModel.find({ category });
		return recipesByCategory;
	},

	async getRecipeDetails(recipeId) {
		const recipeDetails = await RecipeDetailsModel.findOne({ _id: recipeId });
		return recipeDetails;
	}
};
