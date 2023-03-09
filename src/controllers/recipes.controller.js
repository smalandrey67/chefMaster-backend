import { recipesService } from "../services/recipes.service.js";

export const recipesController = {
	async getPopularRecipes(req, res) {
		try {
			const popularRecipes = await recipesService.getPopularRecipes();
			res.json(popularRecipes);
		} catch (error) {
			res.status(500).json(error);
		}
	}
};
