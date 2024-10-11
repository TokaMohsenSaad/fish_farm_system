import express from "express";

import {
  getAllControls,
  deleteControlRecordById,
} from "../controller/treatmentController.js";

const router = express.Router();
// Route to get all control records
router.get("/controls", getAllControls);

// DELETE /control/:id - Delete control record by id
router.delete("/delete-control/:id", deleteControlRecordById);

export default router;
