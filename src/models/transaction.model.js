import mongoose from "mongoose";
import { Account } from "../models/account.model.js";

// Create transaction schema for transaction model
const transactionSchema = new mongoose.Schema(
    {
        fromAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: [
                true,
                "Transaction must be associated with a from account",
            ],
            index: true,
        },
        toAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: [
                true,
                "Transaction must be associated with a to account",
            ],
            index: true,
        },
        amount: {
            type: Number,
            required: [true, "Transaction amount is required"],
            min: [0, "Transaction amount must be greater than or equal to 0"],
        },
        status: {
            type: String,
            enum: {
                values: ["PENDING", "COMPLETED", "FAILED", "REVERSED"],
                message: "Status can be either PENDING, COMPLETED or FAILED",
            },
            default: "PENDING",
        },
        idempotencyKey: {
            type: String,
            required: [
                true,
                "Idempotency key is required for creating a transaction",
            ],
            index: true,
            unique: true,
        },
    },
    { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
