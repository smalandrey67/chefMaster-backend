import mongoose from "mongoose";

const Recipe = new mongoose.Schema({
	image: { type: String, required: [true, "please provide the image"] },
	title: { type: String, require: [true, "please provide the title"] },
	cookTime: { type: String, require: [true, "please provide the cookTime"] },
	cookLevel: { type: String, require: [true, "please provide the cookLevel"] }
});

export const RecipeModel = mongoose.model("Recipe", Recipe);
