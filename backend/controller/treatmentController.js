// controllers/controlController.js

// Import the database connection
import db from "../database_connection/db.js";

// Controller to retrieve all control records
export const getAllControls = async (req, res) => {
  try {
    // Query the database for all records in the control table and convert date_time to local time
    const [controls] = await db.query(`
      SELECT id, tank_no, pump, motor, feeder, heater, 
             CONVERT_TZ(date_time, '+00:00', @@session.time_zone) AS date_time
      FROM control
    `);

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
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

//////////////////////////////////manual treatment endpoint

export const addControlRecord = async (req, res) => {
  const { tank_no, treatment, state } = req.body;

  // Initialize control values
  let pump = "inactive";
  let motor = "inactive";
  let feeder = "inactive";
  let heater = "inactive";

  // Validate treatment
  const validTreatments = ["pump", "motor", "feeder", "heater"];
  if (!validTreatments.includes(treatment)) {
    return res.status(400).json({ message: "Invalid treatment type" });
  }

  try {
    // If state is active, set the treatment field to 1
    if (state === "active") {
      if (treatment === "pump") pump = "active";
      else if (treatment === "motor") motor = "active";
      else if (treatment === "feeder") feeder = "active";
      else if (treatment === "heater") heater = "active";
    }

    // Insert the new control record into the database, including date_time
    const [result] = await db.query(
      `INSERT INTO control (tank_no, pump, motor, feeder, heater, date_time) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [tank_no, pump, motor, feeder, heater, new Date()] // Add current date_time here
    );

    // Fetch the newly created record using the result.insertId
    const [newRecord] = await db.query(`SELECT * FROM control WHERE id = ?`, [
      result.insertId,
    ]);

    return res.status(201).json({
      message: "Control record created successfully",
      record: newRecord[0], // Send the new record back to the frontend
    });
  } catch (error) {
    console.error("Error creating control record:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

////////////////////////////////////retrieve records based on a specific date
export const getControlsByDate = async (req, res) => {
  const { daynum } = req.query; // Get the date from query parameters

  try {
    // Query the database for records where the date part of date_time matches the provided date
    const [controls] = await db.query(
      "SELECT * FROM control WHERE DATE(date_time) = ?",
      [daynum]
    );

    // If no records are found, respond with a 404 message
    if (controls.length === 0) {
      return res
        .status(404)
        .json({ message: "No control records found for the specified date" });
    }

    // Respond with the control records for the specified date
    return res.status(200).json(controls);
  } catch (error) {
    console.error("Error while retrieving control records:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
