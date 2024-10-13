// router.js
import express from "express";
import ProductStat from "../models/ModelProductStat.js"; // Adjust the path as necessary
import { dataProductStat } from "../data/index.js"; // Import the dataProductStats array

const router = express.Router();

// Route to seed product statistics data /seed/products
router.get("/seed/productstats", async (req, res) => {
  try {
    // Insert data into MongoDB
    await ProductStat.insertMany(dataProductStat);
    res.status(200).json({ message: "Product statistics inserted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
