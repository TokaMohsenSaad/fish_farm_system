// routes/tankRoutes.js
import express from "express";
import { resetTankData } from "../controller/tankController.js"; // Adjust path to your controller
import { getTanksWithFishImages } from "../controller/fishController.js";

import {
  addTank,
  updateFishName,
  getTankByNumber,
} from "../controller/tankController.js";

const router = express.Router();

// Route to reset the tank data by tank number
router.post("/reset/:tankno", resetTankData);

// Define route for getting tanks with fish images
router.get("/alltanksrecords", getTanksWithFishImages);

//route for adding a new tank
router.post("/add-tank", addTank);

// Route to update the fish_name of an existing tank
router.put("/update-fish-name", updateFishName);

// Route to get tank data by tank number
router.get("/get-tank-by-id/:tank_no", getTankByNumber);

export default router;
