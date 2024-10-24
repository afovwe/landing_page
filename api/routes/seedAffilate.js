// router.js
import express from "express";
import AffiliateStat from "../models/ModelAffiliateStat.js"; // Import the AffiliateStat model
import { dataAffiliateStat } from "../data/index.js"; // Import the dataAffiliateStat array

const router = express.Router();

// Route to seed affiliate statistics data /seed/affiliatestats
router.get("/seed/affiliatestats", async (req, res) => {
  try {
    // Insert data into MongoDB
    await AffiliateStat.insertMany(dataAffiliateStat);
    res.status(200).json({ message: "Affiliate statistics inserted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
