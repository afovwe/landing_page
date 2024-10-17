// router.js
import express from "express";
import Transaction from "../models/ModelTransaction.js"; // Import the Transaction model
import { dataTransaction } from "../data/index.js"; // Import the dataTransaction array

const router = express.Router();

// Route to seed transactions
router.get("/seed/transactions", async (req, res) => {
  try {
    // Insert data into MongoDB
    await Transaction.insertMany(dataTransaction);
    res.status(200).json({ message: "Transactions inserted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
