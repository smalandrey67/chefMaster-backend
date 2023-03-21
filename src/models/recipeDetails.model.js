import mongoose from "mongoose";

const RecipeDetails = new mongoose.Schema({
	title: { type: String, require: [true, "please provide the title"] },
	image: { type: String, require: [true, "please provide the image"] },
	cookTime: { type: String, require: [true, "please provide the cookTime"] },
	rating: { type: Number, require: [true, "please provide the rating"] },
	cookLevel: { type: String, require: [true, "please provide the cookLevel"] },
	instruction: { type: Array, require: [true, "please provide the instruction"] },
	ingredients: { type: Array, require: [true, "please provide the ingredients"] },
	cooking: { type: Array, require: [true, "please provide the cooking"] }
});

export const RecipeDetailsModel = mongoose.model("RecipeDetails", RecipeDetails);
