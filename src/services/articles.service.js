import { ArticleModel } from "../models/article.model.js";

export const articlesService = {
	async getAllArticles() {
		const articles = await ArticleModel.find();
		return articles;
	}
};
