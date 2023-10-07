import { viewSettingsController } from "../controllers/viewSettings.controller.js";
import { catchError } from "../utils/catchError.js";

import { tokenCheck } from "../middleware/tokenCheck.middleware.js";

export const viewSettingsRoute = (router) => {
	router.get("/view/:userId", tokenCheck, catchError(viewSettingsController.getViewSettings));
	router.post("/view/:userId", tokenCheck, catchError(viewSettingsController.saveViewSettings));
	router.patch("/view/:userId", tokenCheck, catchError(viewSettingsController.resetViewSettings));
};
