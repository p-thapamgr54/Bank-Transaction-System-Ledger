import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

// function for user register controller
export const userRegisterController = async (req, res) => {
  // Extracting user details from req.body
  const { name, email, password } = req.body;

  // Validating user details empty or not
  if ([name, email, password].some((field) => field?.trim() === "")) {
    return res.status(400).json({
      sucess: false,
      message: "All fields are required ....",
    });
  }

  // Find user exists or not
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return res.status(422).json({
      sucess: false,
      message: " User already exists with same email address ....",
    });
  }

  // Creating user object to store in database
  const user = await User.create({
    name,
    email,
    password,
  });

  // Create jwt token  using jwt secret key
  const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  // Pass token inside an HttpOnly cookie
  res.cookie("token", token, {
    httpOnly: true, // Prevents frontend JS from reading the cookie
    sameSite: "strict", // Protects against CSRF attacks
    maxAge: 3600000 * 3, // Cookie expiry matching token (3 hour in ms)
  });

  res.status(201).json({
    sucess: true,
    message: "User registered sucessfully ....",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });
};
