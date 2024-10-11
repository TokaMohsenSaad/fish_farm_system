// controller/recordsController.js
import con from "../database_connection/db.js"; // Make sure this is the correct import path

// Function to get measurements from the database
export const getMeasurements = async (req, res) => {
  try {
    const [result] = await con.query("SELECT * FROM measurements LIMIT 100");
    res.status(200).json(result);
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
