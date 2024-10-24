// router.js
import express from "express";
import OverallStat from "../models/ModelOverallStat.js"; // Adjust the path as necessary
import { dataOverallStat } from "../data/index.js"; // Import the dataOverallStat array

const router = express.Router();


// Route to seed overall statistics data /seed/overallstats
router.get("/seed/overallstats", async (req, res) => {
  try {
    // Insert data into MongoDB
    await OverallStat.insertMany(dataOverallStat);
    res.status(200).json({ message: "Overall statistics inserted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
