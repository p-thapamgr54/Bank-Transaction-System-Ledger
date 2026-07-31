import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Creating schema for user model
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required for creating an account"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please ... fill a valid email address",
      ],
      unique: [true, "Email already exists"],
    },
    name: {
      type: String,
      required: [true, "Name is required for creating an account"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required for creating an account"],
      trim: true,
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Exclude password from query results by default
    },
  },
  { timestamps: true },
);

// Creating method to hash password before saving to the database
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    // next();
  }
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  //  next();
});

// Creating method to compare password during login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
