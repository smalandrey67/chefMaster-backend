import { authController } from "../controllers/auth.controller.js";
import { catchError } from "../utils/catchError.js";

import { authValidation } from "../validations/auth.validation.js";
import { validationErrors } from "../middleware/validationErrors.middleware.js";

export const authRoute = (router) => {
	router.post("/registration", authValidation, validationErrors, catchError(authController.registration));
	router.post("/login", catchError(authController.login));
	router.post("/logout", catchError(authController.logout));
	router.get("/refresh", catchError(authController.refresh));
	router.post("/update-email", catchError(authController.updateEmail)); // do a validation that email exist
	router.post("/update-userName", catchError(authController.updateUserName)); // do a validation that email exist
};
