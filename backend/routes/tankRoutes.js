// routes/tankRoutes.js
import express from "express";
import { resetTankData } from "../controller/tankController.js"; // Adjust path to your controller
import {
  getTanksWithFishImages,
  getTankofID,
} from "../controller/fishController.js";

import {
  addTank,
  updateFishName,
  getTankByNumber,
  updateTank,
} from "../controller/tankController.js";

const router = express.Router();

// Route to reset the tank data by tank number
router.post("/reset", resetTankData);

// Define route for getting tanks with fish images
router.get("/alltanksrecords", getTanksWithFishImages);

//route for adding a new tank
router.post("/add-tank", addTank);

// Route to update the fish_name of an existing tank
router.put("/update-fish-name", updateFishName);

// Route to get tank data by tank number
router.get("/get-tank-by-id/:tank_no", getTankByNumber);

// Define route for getting a specific tank by tank_no
router.get("/tanks/:tank_no", getTankofID);

router.get("/tanks/update/:tank_no", updateTank);

export default router;
