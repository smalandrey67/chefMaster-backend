import { authController } from "../controllers/auth.controller.js";
import { catchError } from "../utils/catchError.js";

import {
	loginValidation,
	registrationValidation,
	updatedEmailValidation,
	updatedUserNameValidation
} from "../validations/auth.validation.js";
import { validationErrors } from "../middleware/validationErrors.middleware.js";

export const authRoute = (router) => {
	router.post("/registration", registrationValidation, validationErrors, catchError(authController.registration));
	router.post("/login", loginValidation, validationErrors, catchError(authController.login));
	router.post("/logout", catchError(authController.logout));
	router.get("/refresh", catchError(authController.refresh));
	router.post("/update-email", updatedEmailValidation, validationErrors, catchError(authController.updateEmail));
	router.post("/update-userName", updatedUserNameValidation, validationErrors, catchError(authController.updateUserName));
};
