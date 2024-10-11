import express from "express";

import { getAllControls } from "../controller/treatmentController.js";

const router = express.Router();
// Route to get all control records
router.get("/controls", getAllControls);

export default router;
