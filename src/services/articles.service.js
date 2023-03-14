import { ArticleModel } from "../models/article.model.js";

export const articlesService = {
	async getAllArticles(limit) {
		const articles = await ArticleModel.find().limit(limit);
		return articles;
	}
};
