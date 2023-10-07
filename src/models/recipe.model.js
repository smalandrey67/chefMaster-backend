import mongoose from "mongoose";

const Recipe = new mongoose.Schema({
	image: { type: String, required: [true, "please provide the image"] },
	title: { type: String, require: [true, "please provide the title"] },
	cookTime: { type: String, require: [true, "please provide the cookTime"] },
	cookLevel: { type: String, require: [true, "please provide the cookLevel"] },
	category: { type: String, require: [true, "please provide the category"] },
	rating: { type: Number, require: [true, "please provide the rating"] }
});

export const RecipeModel = mongoose.model("Recipe", Recipe);

const RecipeDetails = new mongoose.Schema({
	title: { type: String, require: [true, "please provide the title"] },
	image: { type: String, require: [true, "please provide the image"] },
	cookTime: { type: String, require: [true, "please provide the cookTime"] },
	rating: { type: Number, require: [true, "please provide the rating"] },
	cookLevel: { type: String, require: [true, "please provide the cookLevel"] },
	description: { type: String, require: [true, "please provide the description"] },
	ingredients: { type: Array, require: [true, "please provide the ingredients"] },
	cooking: { type: Array, require: [true, "please provide the cooking"] }
});

export const RecipeDetailsModel = mongoose.model("RecipeDetails", RecipeDetails);
