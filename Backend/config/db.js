import mongoose from "mongoose";

const connectDb = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URI)
	} catch (error) {
		console.log(error)
	}
}

export default connectDb