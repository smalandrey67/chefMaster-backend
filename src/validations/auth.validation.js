import { body } from "express-validator";

export const authValidation = [
	body("email").isEmail().withMessage("Not valid email"),
	body("password").isLength({ min: 9, max: 32 }).withMessage("Not valid password")
];
