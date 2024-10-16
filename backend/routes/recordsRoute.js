// routes/recordsRoutes.js
import express from "express";
import {
  getMeasurements,
  deleteAllRecords,
  deleteMeasurementById,
} from "../controller/measurementController.js"; // Correct the import path

const router = express.Router();

// Define the route for fetching records
router.get("/records", getMeasurements);

router.delete("/historyrecord", deleteAllRecords);

router.delete("/historyrecord/:id", deleteMeasurementById);

export default router;
