// routes/tankRoutes.js
import express from "express";
import { resetTankData } from "../controller/tankController.js"; // Adjust path to your controller

const router = express.Router();

// Route to reset the tank data by tank number
router.post("/reset/:tankno", resetTankData);

export default router;
