// controllers/controlController.js

// Import the database connection
import db from "../database_connection/db.js";

// Controller to retrieve all control records
export const getAllControls = async (req, res) => {
  try {
    // Query the database for all records in the control table
    const [controls] = await db.query("SELECT * FROM control");

    // If no records are found, respond with a 404 message
    if (controls.length === 0) {
      return res.status(404).json({ message: "No control records found" });
    }

    // Respond with the control records
    return res.status(200).json(controls);
  } catch (error) {
    console.error("Error while retrieving control records:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/////////////////////delete a control record
export const deleteControlRecordById = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the control record exists
    const [rows] = await db.query("SELECT * FROM control WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Control record not found" });
    }

    // Delete the control record
    await db.query("DELETE FROM control WHERE id = ?", [id]);

    return res
      .status(200)
      .json({ message: "Control record deleted successfully" });
  } catch (error) {
    console.error("Error deleting control record:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

//////////////////////////////////manual treatment endpoint

export const addControlRecord = async (req, res) => {
  const { tank_no, treatment, state } = req.body;

  // Initialize control values
  let pump = 0;
  let motor = 0;
  let feeder = 0;
  let heater = 0;

  // Validate treatment
  const validTreatments = ["pump", "motor", "feeder", "heater"];
  if (!validTreatments.includes(treatment)) {
    return res.status(400).json({ message: "Invalid treatment type" });
  }

  try {
    // If state is active, set the treatment field to 1
    if (state === "active") {
      if (treatment === "pump") pump = 1;
      else if (treatment === "motor") motor = 1;
      else if (treatment === "feeder") feeder = 1;
      else if (treatment === "heater") heater = 1;
    }

    // If state is inactive, all values should remain 0
    // (this is already the case by default)

    // Insert the new control record into the database
    const [result] = await db.query(
      `INSERT INTO control (tank_no, pump, motor, feeder, heater) 
      VALUES (?, ?, ?, ?, ?)`,
      [tank_no, pump, motor, feeder, heater]
    );

    return res.status(201).json({
      message: "Control record created successfully",
    });
  } catch (error) {
    console.error("Error creating control record:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
