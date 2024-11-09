import express from "express";
import { getSales } from "../controllers/sales.controller.js";


const router = express.Router();

router.get("/", getSales);


export default router;
