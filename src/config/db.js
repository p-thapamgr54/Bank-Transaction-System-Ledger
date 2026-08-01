import mongoose from "mongoose";
import "dotenv/config";

// Function to connect to the MongoDB database
async function connectDB() {
    try {
        // Check if the MONGO_URI environment variable is defined
        if (!process.env.MONGO_URI) {
            throw new Error(
                "MONGO_URI is not defined in the environment variables ..."
            );
        }
        // Connect to the MongoDB database using the MONGO_URI environment variable
        await mongoose.connect(`${process.env.MONGO_URI}/DB_NAME`);
        console.log("MongoDB connected successfully ...");
    } catch (error) {
        console.error("Error connecting to MongoDB ...", error);
        process.exit(1); // Exit the process with an error
    }
}

export default connectDB;
