import mongoose from "mongoose";

const User = new mongoose.Schema({
	email: { type: String, unique: true, require: [true, "please provide the email"] },
	password: { type: String, require: [true, "please provide the password"] }
});

export const UserModel = mongoose.model("User", User);
