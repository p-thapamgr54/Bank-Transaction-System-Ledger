import mongoose from "mongoose";
import { Account } from "../models/account.model.js";
import { Transaction } from "../models/transaction.model.js";

// Create ledger schema for ledger model
const ledgerSchema = new mongoose.Schema(
    {
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: [true, "Ledger must be associated with an account"],
            index: true,
            immutable: true,
        },
        amount: {
            type: Number,
            required: [true, "Ledger amount is required"],
            immutable: true,
        },
        transaction: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction",
            required: [true, "Ledger must be associated with a transaction"],
            index: true,
            immutable: true,
        },
        transactionType: {
            type: String,
            enum: {
                values: ["DEBIT", "CREDIT"],
                message: "Transaction type can be either DEBIT or CREDIT",
            },
            required: [true, "Ledger must have a transaction type"],
            immutable: true,
        },
    },
    { timestamps: true }
);

function preventLedgerModification() {
    throw new Error(
        "Ledger entries are immutable and cannot be modified or deleted"
    );
}

// Prevent any modifications or deletions to ledger entries
ledgerSchema.pre("updateOne", preventLedgerModification);
ledgerSchema.pre("deleteOne", preventLedgerModification);
ledgerSchema.pre("findOneAndUpdate", preventLedgerModification);
ledgerSchema.pre("remove", preventLedgerModification);
ledgerSchema.pre("deleteMany", preventLedgerModification);
ledgerSchema.pre("findOneAndDelete", preventLedgerModification);
ledgerSchema.pre("updateMany", preventLedgerModification);
ledgerSchema.pre("findOneAndReplace", preventLedgerModification);

export const Ledger = mongoose.model("Ledger", ledgerSchema);
