import { articlesService } from "../services/articles.service.js";
import { statuses } from "../constants/httpStatuses.constants.js";

import { messages } from "../constants/errorMessages.constants.js";
import { ApiError } from "../config/apiError.config.js";

export const articlesController = {
	async getPopularArticles(req, res) {
		const limit = req.query._limit;

		const articles = await articlesService.getPopularArticles(limit);

		if (!articles) {
			throw ApiError.ServerError(messages.SUBSCRIPTION_NOT_FOUND);
		}

		res.status(statuses.OK).json(articles);
	},

	async getArticlesDetails(req, res) {
		const articleId = req.params.id;

		const articleDetails = await articlesService.getArticleDetails(articleId);

		if (!articleDetails) {
			throw ApiError.ServerError(messages.SUBSCRIPTION_NOT_FOUND);
		}

		res.status(statuses.OK).json(articleDetails);
	}
};
