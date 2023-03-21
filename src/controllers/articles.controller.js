import { articlesService } from "../services/articles.service.js";
import { statuses } from "../config/statuses.config.js";
import { ApiError } from "../config/apiError.config.js";

export const articlesController = {
	async getAllArticles(req, res) {
		const limit = req.query._limit;

		const articles = await articlesService.getAllArticles(limit);

		if (!articles) {
			throw new ApiError(statuses.SERVER_ERROR, "Subscription not found");
		}

		res.status(statuses.OK).json(articles);
	}
};
