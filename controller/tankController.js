// controller/tankController.js
import con from "../database_connection/db.js"; // Adjust path to your db connection file

// Controller function to reset data for a given tank
export const resetTankData = async (req, res) => {
  const { tankno } = req.params; // Get the tank number from the route parameters

  if (!tankno) {
    return res.status(400).json({
      status: 400,
      message: "Tank number is required",
    });
  }

  // SQL query to reset data in the 'tank' table
  const resetQuery =
    "UPDATE tanks SET fish_name = NULL, temp = 0, Ph = 0, turbidity = 0 WHERE tank_no = ?";

  try {
    const [result] = await con.query(resetQuery, [tankno]);

    if (result.affectedRows > 0) {
      // If the data was successfully reset
      res.status(200).json({
        status: 200,
        message: `Data reset successfully for tank number: ${tankno}`,
      });
    } else {
      // If no tank was found with the provided tank number
      res.status(404).json({
        status: 404,
        message: `Tank number ${tankno} not found.`,
      });
    }
  } catch (err) {
    console.error("Error resetting data in database:", err);
    res.status(500).json({
      status: 500,
      message: "Error resetting data in database",
    });
  }
};
