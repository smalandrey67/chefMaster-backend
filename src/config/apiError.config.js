import { statuses } from "../constants/httpStatuses.constants.js";
import { messages } from "../constants/errorMessages.constants.js";

export class ApiError extends Error {
	constructor(status, message, errors = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static Unauthorized() {
		return new ApiError(statuses.UNAUTHORIZED, messages.UNAUTHORIZED);
	}

	static ValidationFailed(errors = []) {
		return new ApiError(statuses.BAD_REQUEST, messages.VALIDATION_FAILED, errors);
	}

	static ServerError(message) {
		return new ApiError(statuses.SERVER_ERROR, message);
	}

	static Conflict(message) {
		return new ApiError(statuses.CONFLICT, message);
	}

	static BadRequest(message) {
		return new ApiError(statuses.BAD_REQUEST, message);
	}
}
