import { articlesController } from "../controllers/articles.controller.js";
import { catchError } from "../utils/catchError.js";

export const articlesRoute = (router) => {
	router.get("/articles", catchError(articlesController.getAllArticles));
};
