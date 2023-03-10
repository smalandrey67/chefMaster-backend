import mongoose from "mongoose";

const Article = new mongoose.Schema({
	image: { type: String, required: [true, "please provide the image"] },
	title: { type: String, require: [true, "please provide the title"] }
});

export const ArticleModel = mongoose.model("Article", Article);
