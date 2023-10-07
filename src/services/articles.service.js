import { ArticleModel, ArticleDetailsModel } from "../models/article.model.js";

export const articlesService = {
	async getPopularArticles(limit) {
		const popularArticles = await ArticleModel.find({ likes: { $gt: 80 } }).limit(limit);
		return popularArticles;
	},

	async getArticleDetails(articleId) {
		const articleDetails = await ArticleDetailsModel.findOne({ _id: articleId });
		return articleDetails;
	}
};
