import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
} from "../controllers/client.controller.js";

const router = express.Router();

router.get("/client/products", getProducts);
router.get("/client/customers", getCustomers);
router.get("/client/transactions", getTransactions);
router.get("/client/geography", getGeography);

export default router;
