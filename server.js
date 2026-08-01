import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import "dotenv/config";

const PORT = process.env.PORT || 3000; // Define the port to listen on, defaulting to 3000 if not specified in environment variables

// Connect to the MongoDB database
connectDB();
app.listen(PORT, (req, res) => {
    console.log(`Your server is running on http://localhost:${PORT}`); // Log a message indicating that the server is running and on which port
});
