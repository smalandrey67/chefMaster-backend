import { RecipeModel } from "../models/recipe.model.js";
import { RecipeDetailsModel } from "../models/recipeDetails.model.js";

export const recipesService = {
	async getPopularRecipes() {
		const popularRecipes = await RecipeModel.find({ rating: { $gt: 3.5 } });
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
