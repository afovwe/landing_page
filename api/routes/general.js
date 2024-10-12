import express from "express";
import { getUser, getDashboardStats } from "../controllers/general.controller.js";

const router = express.Router();


router.get("/general/user/:id", getUser);
router.get("/dashboard", getDashboardStats);


export default router;
