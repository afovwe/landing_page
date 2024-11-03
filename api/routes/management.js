import express from "express";
import { getAdmins, getUserPerformance } from "../controllers/management.controller.js";

const router = express.Router();


router.get("/management/admins", getAdmins);
router.get("/management/performance/:id", getUserPerformance);

export default router;
