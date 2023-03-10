import { articlesService } from "../services/articles.service.js";

export const articlesController = {
	async getAllArticles(_, res) {
		try {
			const articles = await articlesService.getAllArticles();
			res.json(articles);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
};
