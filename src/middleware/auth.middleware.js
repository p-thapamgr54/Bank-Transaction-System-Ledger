import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

// Middleware to check user logged in or not
export const authorizationMiddleware = async (req, res, next) => {
  // Check token in both cookes and headers
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  // If token is null
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access, Token is missing",
    });
  }
  try {
    // Verify token with jwt secret key
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded id
    const user = await User.findById(decoded.userId);

    // Save user data in user variable
    req.user = user;
    return next();
  } catch (error) {}
  return res.status(401).json({
    success: false,
    message: "Unauthorized access, Token is invalid",
  });
};
