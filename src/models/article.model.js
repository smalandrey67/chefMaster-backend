import mongoose from "mongoose";

const Article = new mongoose.Schema({
	image: { type: String, required: [true, "please provide the image"] },
	title: { type: String, require: [true, "please provide the title"] },
	authorName: { type: String, require: [true, "please provide the author name"] },
	authorImage: { type: String, require: [true, "please provide the author image"] },
	likes: { type: Number, require: [true, "please provide the likes"] }
});

export const ArticleModel = mongoose.model("Article", Article);

const ArticleDetails = new mongoose.Schema({
	image: { type: String, required: [true, "please provide the image"] },
	title: { type: String, require: [true, "please provide the title"] },
	authorName: { type: String, require: [true, "please provide the author name"] },
	authorImage: { type: String, require: [true, "please provide the author image"] },
	description: { type: String, require: [true, "please provide the description"] },
	likes: { type: Number, require: [true, "please provide the likes"] }
});

export const ArticleDetailsModel = mongoose.model("ArticleDetails", ArticleDetails);
