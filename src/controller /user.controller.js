import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { sendRegisteredEmail } from "../service/email.service.js";

// Function for user register controller
export const userRegisterController = async (req, res) => {
    // Extracting user details from req.body
    const { name, email, password } = req.body;

    // Validating user details empty or not
    if ([name, email, password].some((field) => field?.trim() === "")) {
        return res.status(400).json({
            success: false,
            message: "All fields are required ....",
        });
    }

    // Find user exists or not
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        return res.status(422).json({
            success: false,
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
        success: true,
        message: "User registered sucessfully ....",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
        token,
    });
    // Send email to registered email address
    await sendRegisteredEmail(user.email, user.name);
};

// Function for user login controller
export const userLoginController = async (req, res) => {
    // Extracting email and password from req.body
    const { name, email, password } = req.body;

    // Find single user by email address
    const user = await User.findOne({ email }).select("+password");

    // Search for user with valid email address
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Email address is invalid ...",
        });
    }

    // Compare user login password with registered password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
        return res.status(401).json({
            success: false,
            message: "Password is invalid ....",
        });
    }
    // Create jwt token  using jwt secret key for login
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
        success: true,
        message: ` User logged in sucessfully ...`,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
        token,
    });
};
