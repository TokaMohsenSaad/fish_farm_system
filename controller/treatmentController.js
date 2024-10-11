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
