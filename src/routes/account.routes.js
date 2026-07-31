import express from "express";
import { authorizationMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router(); // Creating an instance of the Express

// Router to define routes related to Account
router.post("/", authorizationMiddleware, (req, res) => {
  res.send("Hello This is Account Routes");
}); // Route for Account
export default router;
