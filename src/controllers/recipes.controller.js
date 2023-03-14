import { recipesService } from "../services/recipes.service.js";
import { statuses } from "../config/statuses.config.js";

export const recipesController = {
	async getPopularRecipes(_, res) {
		try {
			const popularRecipes = await recipesService.getPopularRecipes();
			res.status(statuses.OK).json(popularRecipes);
		} catch (error) {
			res.status(statuses.SERVER_ERROR).json({ message: error.message });
		}
	}
};
