import bcrypt from "bcrypt";
import { body } from "express-validator";

import { UserModel } from "../models/user.model.js";
import { ApiError } from "../config/apiError.config.js";
import { messages } from "../constants/errorMessages.constants.js";

export const registrationValidation = [
	body("userName").trim().not().isEmpty().withMessage("Not valid userName"),
	body("email")
		.trim()
		.isEmail()
		.withMessage("Not valid Email")
		.custom(async (value) => {
			const foundUser = await UserModel.findOne({ email: value });

			if (foundUser) {
				throw ApiError.Conflict(messages.EMAIL_ALREADY_EXIST);
			}
		}),
	body("password").trim().isLength({ min: 9, max: 32 }).withMessage("Not valid password")
];

export const loginValidation = [
	body("email")
		.trim()
		.isEmail()
		.withMessage("Not valid Email")
		.custom(async (value) => {
			const foundUser = await UserModel.findOne({ email: value });

			if (!foundUser) {
				throw ApiError.BadRequest(messages.EMAIL_NOT_FOUND);
			}
		}),
	body("password")
		.trim()
		.isLength({ min: 9, max: 32 })
		.withMessage("Not valid password")
		.custom(async (value, { req }) => {
			const foundUser = await UserModel.findOne({ email: req.body.email });
			const isPasswordEqual = await bcrypt.compare(value, foundUser.password);

			if (!isPasswordEqual) {
				throw ApiError.BadRequest(messages.INCORRECT_PASSWORD);
			}
		})
];

export const updatedEmailValidation = [
	body("oldEmail")
		.trim()
		.not()
		.isEmpty()
		.withMessage("oldEmail is required")
		.custom(async (value, { req }) => {
			if (value === req.body.updatedEmail) {
				throw ApiError.BadRequest(messages.EMAIL_UPDATE_THE_SAME);
			}
		}),
	body("updatedEmail")
		.trim()
		.not()
		.isEmpty()
		.withMessage("updatedEmail is required")
		.custom(async (value) => {
			const alreadyExistEmail = await UserModel.find({ email: value });

			if (alreadyExistEmail.length) {
				throw ApiError.Conflict(messages.EMAIL_ALREADY_EXIST);
			}
		})
];

export const updatedUserNameValidation = [
	body("oldUserName")
		.trim()
		.not()
		.isEmpty()
		.withMessage("oldUserName is required")
		.custom(async (value, { req }) => {
			if (value === req.body.updatedUserName) {
				throw ApiError.BadRequest(messages.USER_NAME_UPDATE_THE_SAME);
			}
		}),
	body("updatedUserName")
		.trim()
		.not()
		.isEmpty()
		.withMessage("updatedUserName is required")
		.custom(async (value) => {
			const alreadyExistUserName = await UserModel.find({ userName: value });

			if (alreadyExistUserName.length) {
				throw ApiError.Conflict(messages.USER_NAME_ALREADY_EXIST);
			}
		})
];

export const updateAvatarValidation = [body("userId").trim().not().isEmpty().withMessage("userId is required")];
