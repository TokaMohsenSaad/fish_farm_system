import express from "express";

import {
  getAllControls,
  deleteControlRecordById,
  addControlRecord,
} from "../controller/treatmentController.js";

const router = express.Router();
// Route to get all control records
router.get("/controls", getAllControls);

// DELETE /control/:id - Delete control record by id
router.delete("/delete-control/:id", deleteControlRecordById);

// Add a new control record
router.post("/addcontrol", addControlRecord);

export default router;
