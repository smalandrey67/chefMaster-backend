import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const connectInfo = await mongoose.connect(process.env.DB_URL);
		console.log(`MongoDB Connected ${connectInfo.connection.host}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
