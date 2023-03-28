import mongoose, { Schema } from "mongoose";

const Token = new mongoose.Schema({
	user: { type: Schema.Types.ObjectId, ref: "User" },
	refreshToken: { type: String, require: [true, "please provide the refreshToken"] }
});

export const TokenModel = mongoose.model("Token", Token);
