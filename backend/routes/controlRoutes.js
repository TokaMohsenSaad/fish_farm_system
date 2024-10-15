import express from "express";

import {
  getAllControls,
  deleteControlRecordById,
  addControlRecord,
  getControlsByDate,
} from "../controller/treatmentController.js";

const router = express.Router();
// Route to get all control records
router.get("/controls", getAllControls);

// DELETE /control/:id - Delete control record by id
router.delete("/delete-control/:id", deleteControlRecordById);

// Add a new control record
router.post("/addcontrol", addControlRecord);

//retrieve records of specific date
router.post("/control_by_date", getControlsByDate);

export default router;
