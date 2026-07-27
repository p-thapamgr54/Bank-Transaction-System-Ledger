import express from "express";
import { userRegisterController } from "../controller /user.controller.js";
import { userLoginController } from "../controller /user.controller.js";

const router = express.Router(); // Creating an instance of the Express

// router to define routes related to authentication
router.post("/register", userRegisterController); // Route for user registration
router.post("/login", userLoginController); // Route for user login
export default router; // Exporting the router instance for use in other parts of the application
