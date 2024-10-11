// routes/recordsRoutes.js
import express from "express";
import { getMeasurements } from "../controller/measurementController.js"; // Correct the import path

const router = express.Router();

// Define the route for fetching records
router.get("/records", getMeasurements);

export default router;
