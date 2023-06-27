import multer from "multer";

export const multerUploader = multer({
	storage: multer.diskStorage({}),
	fileFilter: function (req, file, callback) {
		const fileSize = parseInt(req.headers["content-length"] || "0");
		if (
			file.mimetype !== "image/png" &&
			file.mimetype !== "image/jpg" &&
			file.mimetype !== "image/jpeg" &&
			file.mimetype !== "image/webp"
		) {
			req.fileValidationError = "Invalid file format";
			return callback(null, false);
		}
		if (fileSize >= 3500000) {
			req.fileValidationError = "File is too large. Max size is 3 MB.";
			return callback(null, false);
		}
		callback(null, true);
	}
});
