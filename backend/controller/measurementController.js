// controller/recordsController.js
import con from "../database_connection/db.js"; // Make sure this is the correct import path

import { DateTime } from "luxon";

export const getMeasurements = async (req, res) => {
  try {
    const [result] = await con.query("SELECT * FROM measurements LIMIT 100");

    // Convert the date_time to Cairo time zone for each record
    const adjustedResults = result.map((record) => {
      return {
        ...record,
        // Use fromJSDate for converting MySQL DATETIME field (which may return as JS Date object)
        date_time: DateTime.fromJSDate(new Date(record.date_time)) // Create a JS Date and parse with Luxon
          .setZone("Africa/Cairo") // Convert to Cairo time zone
          .toFormat("yyyy-MM-dd HH:mm:ss"), // Format as required
      };
    });

    res.status(200).json(adjustedResults);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({
      status: 500,
      data: {
        message: "Database error",
      },
    });
  }
};

/////////////////////////////delete all history records

export const deleteAllRecords = async (req, res) => {
  try {
    const [result] = await con.query("DELETE FROM measurements"); // Correct async/await syntax with promises
    res.status(200).json({
      message: "All records deleted successfully",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error("Error deleting all records:", error);
    res.status(500).json({ message: "Error deleting records" });
  }
};

////////////////////////delete a record by id
export const deleteMeasurementById = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters

  try {
    const result = await con.query("DELETE FROM measurements WHERE id = ?", [
      id,
    ]); // Adjust based on your database library
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Record deleted successfully" });
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    console.error("Error deleting record:", error);
    res.status(500).json({ message: "Error deleting record" });
  }
};
