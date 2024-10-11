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
