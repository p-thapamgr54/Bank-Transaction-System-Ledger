import express from "express";
import { authorizationMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router(); // Create a new router instance

// Define a route for handling transactions
router.post("/", authorizationMiddleware, async (req, res) => {
    res.send("Transaction route is working");
});

export default router;
