// router.js
import express from "express";
import Product from "../models/ModelProduct.js";

import { dataProduct } from "../data/index.js"; // Import the dataProduct array

const router = express.Router();

// Route to seed data
router.get("/seed/products", async (req, res) => {
  try {
    // Insert data into MongoDB
    await Product.insertMany(dataProduct);
    res.status(200).json({ message: "Products inserted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
