import { Account } from "../models/account.model.js";

// Function for create account controller
export const createAccountController = async (req, res) => {
  // Extracting User details
  const user = req.user;
  // Create account object to store in database
  const account = await Account.create({
    user: user._id,
  });

  return res.status(201).json({
    success: true,
    message: "Account created sucessfully ...",
    account,
  });
};
