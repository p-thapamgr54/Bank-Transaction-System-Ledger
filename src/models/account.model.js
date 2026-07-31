import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { type } from "express/lib/response.js";

// Create account schema for account model
const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Account must be associated with a user"],
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ACTIVE", "FREEZE", "CLOSED"],
        default: "ACTIVE",
      },
    },
    currency: {
      type: String,
      required: [true, "Currency is required for creating an account"],
      default: "NPR",
    },
  },
  { timestamps: true },
);

// Create compound index to sort accounts using user or status
accountSchema.index({ user: 1, status: 1 });

export const Account = mongoose.model("Account", accountSchema);
