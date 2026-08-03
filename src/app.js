import express from "express";
import cookieParser from "cookie-parser";

const app = express(); // Creating an instance of the Express application

// Middlewares
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(cookieParser()); // Middleware to parse incoming cookie headers from the request

// Required routes
import authRoutes from "./routes/auth.routes.js"; // Importing the auth routes
import accountRoutes from "./routes/account.routes.js"; // Importing the account routes
import transactionRoutes from "./routes/transaction.routes.js"; // Importing the transaction routes

// Use Routes
app.use("/api/v2/auth", authRoutes); // Mounting the auth routes on the /api/v2/auth path
app.use("/api/v2/account", accountRoutes); // Mounting the account routes on the /api/v2/account path
app.use("/api/v2/transaction", transactionRoutes); // Mounting the transaction routes on the /api/v2/transaction path
export default app;
