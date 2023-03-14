import { articlesService } from "../services/articles.service.js";
import { statuses } from "../config/statuses.config.js";

export const articlesController = {
	async getAllArticles(req, res) {
		try {
			const limit = req.query._limit;

			const articles = await articlesService.getAllArticles(limit);
			res.status(statuses.OK).json(articles);
		} catch (error) {
			res.status(statuses.SERVER_ERROR).json({ message: error.message });
		}
	}
};
