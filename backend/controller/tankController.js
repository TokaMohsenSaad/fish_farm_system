import con from "../database_connection/db.js";

///////////////////////////////////// Controller function to reset data for a given tank
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

////////////////////////////////Add tank

// Controller to add a new tank
export const addTank = async (req, res) => {
  const { tank_no } = req.body;

  if (!tank_no) {
    return res.status(400).json({ message: "Tank number is required" });
  }

  try {
    // Check if the tank already exists
    const [existingTank] = await con.query(
      "SELECT * FROM tanks WHERE tank_no = ?",
      [tank_no]
    );

    if (existingTank.length > 0) {
      return res.status(409).json({ message: "Tank already exists" });
    }

    // Insert new tank record
    await con.query(
      "INSERT INTO tanks (tank_no, fish_name, ph, temp, turbidity) VALUES (?, ?, ?, ?, ?)",
      [tank_no, null, 0, 0, 0]
    );

    // Respond with success
    return res.status(200).json({ message: "Tank saved successfully" });
  } catch (error) {
    console.error("Error while adding tank:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

////////////////////////////////Add Fish to tank

// Controller to update the fish_name for an existing tank
export const updateFishName = async (req, res) => {
  const { tank_no, fish_name } = req.body;

  if (!tank_no || !fish_name) {
    return res
      .status(400)
      .json({ message: "Tank number and fish name are required" });
  }

  try {
    // Check if the tank exists
    const [existingTank] = await con.query(
      "SELECT * FROM tanks WHERE tank_no = ?",
      [tank_no]
    );

    if (existingTank.length === 0) {
      return res.status(404).json({ message: "Tank not found" });
    }

    // Update the tank with the new fish_name
    await con.query("UPDATE tanks SET fish_name = ? WHERE tank_no = ?", [
      fish_name,
      tank_no,
    ]);

    // Respond with success
    return res.status(200).json({ message: "Fish name updated successfully" });
  } catch (error) {
    console.error("Error while updating fish name:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

////////////////////////////// Get specifc tank details

// Controller to retrieve tank data by tank number
export const getTankByNumber = async (req, res) => {
  const { tank_no } = req.params;

  try {
    // Check if the tank exists in the database
    const [tank] = await con.query("SELECT * FROM tanks WHERE tank_no = ?", [
      tank_no,
    ]);

    if (tank.length === 0) {
      return res.status(404).json({ message: "Tank not found" });
    }

    // Respond with the tank data
    return res.status(200).json(tank[0]);
  } catch (error) {
    console.error("Error while retrieving tank:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
