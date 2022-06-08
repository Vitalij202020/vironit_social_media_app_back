import mongoose from "mongoose";
import logger from "./logger";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL as string);
        logger.info("DB connected");
    } catch (error) {
        logger.error("Could not connect to db");
        process.exit(1);
    }
}

export default connectDB;