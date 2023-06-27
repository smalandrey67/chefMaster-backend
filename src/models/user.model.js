import mongoose from "mongoose";

const User = new mongoose.Schema(
	{
		email: { type: String, unique: true, require: [true, "please provide the email"] },
		password: { type: String, require: [true, "please provide the password"] },
		userName: { type: String, require: [true, "please provide the userName"] },
		avatar: { type: String, require: [true, "please provide the avatar"] }
	},
	{ timestamps: true }
);

export const UserModel = mongoose.model("User", User);
