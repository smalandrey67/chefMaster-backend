import { articlesService } from "../services/articles.service.js";
import { statuses } from "../constants/httpStatuses.constants.js";

import { messages } from "../constants/errorMessages.constants.js";
import { ApiError } from "../config/apiError.config.js";

export const articlesController = {
	async getAllArticles(req, res) {
		const limit = req.query._limit;

		const articles = await articlesService.getAllArticles(limit);

		if (!articles) {
			throw ApiError.ServerError(messages.SUBSCRIPTION_NOT_FOUND);
		}

		res.status(statuses.OK).json(articles);
	}
};
