import { RecipeModel } from "../models/recipe.model.js";

export const recipesService = {
	async getPopularRecipes() {
		const popularRecipes = await RecipeModel.find();
		return popularRecipes;
	}
};
