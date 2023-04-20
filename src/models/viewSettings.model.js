import mongoose from "mongoose";

const viewSettings = mongoose.Schema({
	main: {
		background: { type: String, default: "linear-gradient(45deg, var(--dark-10), var(--dark-20))" }
	},
	navbar: {
		background: { type: String, default: "var(--dark-10)" }
	}
});

export const ViewSettingsModel = mongoose.model("ViewSettings", viewSettings);
