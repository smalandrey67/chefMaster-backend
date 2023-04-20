import { viewSettingsController } from "../controllers/viewSettings.controller.js";
import { catchError } from "../utils/catchError.js";

export const viewSettingsRoute = (router) => {
	router.get("/view/:userId", catchError(viewSettingsController.getViewSettings));
	router.post("/view/:userId", catchError(viewSettingsController.saveViewSettings));
};
