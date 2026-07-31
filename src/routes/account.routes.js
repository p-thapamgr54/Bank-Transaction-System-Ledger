import express from "express";
import { authorizationMiddleware } from "../middleware/auth.middleware.js";
import { createAccountController } from "../controller /account.controller.js";

const router = express.Router(); // Creating an instance of the Express

// Router to define routes related to Account
router.post("/", authorizationMiddleware, createAccountController); // Route for Account
export default router;
