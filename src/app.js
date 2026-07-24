import express from "express";
import authRoutes from "./routes/auth.routes.js"; // Importing the auth routes

const app = express(); // Creating an instance of the Express application
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use("/api/v2/auth", authRoutes); // Mounting the auth routes on the /api/v2/auth path

export default app;
