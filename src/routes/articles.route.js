import { articlesController } from "../controllers/articles.controller.js";

export const articlesRoute = (router) => {
	router.get("/articles", articlesController.getAllArticles);
};
