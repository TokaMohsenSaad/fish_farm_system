// controller/adminController.js or controller/userController.js
import con from "../database_connection/db.js"; // Ensure the correct import path

// Controller function to handle fetching non-admin users
export const manageUsers = async (req, res) => {
  try {
    const [result] = await con.query(
      "SELECT id, email, first_name, last_name, role_id FROM users WHERE role_id != 2"
    );

    // If needed, log the result for debugging (in development only)
    if (process.env.NODE_ENV === "development") {
      console.log(result);
    }

    // Send the result back to the client
    res.status(200).json(result);
  } catch (err) {
    console.error("Database query error:", err);
    return res.status(500).json({
      status: 500,
      data: {
        message: "Database query error",
      },
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params; // Get the user ID from the route parameters

  try {
    const [result] = await con.query("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows > 0) {
      // If a user is deleted successfully
      res.status(200).json({
        status: 200,
        message: `User with id:${id} has been deleted.`,
      });
    } else {
      // If no user found with the given ID
      res.status(404).json({
        status: 404,
        message: `User with id:${id} not found.`,
      });
    }
  } catch (err) {
    console.error("Database deletion error:", err);
    res.status(500).json({
      status: 500,
      message: "Error occurred while deleting the user.",
    });
  }
};

// Controller function to handle promoting a user to admin
export const promoteUserToAdmin = async (req, res) => {
  const { id } = req.params; // Get the user ID from the route parameters

  try {
    const [result] = await con.query(
      "UPDATE users SET role_id = 2 WHERE id = ?",
      [id]
    );

    if (result.affectedRows > 0) {
      // If the user was successfully promoted
      res.status(200).json({
        status: 200,
        message: `User with id:${id} has been updated and accepted as admin.`,
      });
    } else {
      // If no user was found or updated
      res.status(404).json({
        status: 404,
        message: `User with id:${id} not found.`,
      });
    }
  } catch (err) {
    console.error("Database update error:", err);
    res.status(500).json({
      status: 500,
      message: "Error occurred while promoting the user.",
    });
  }
};

// Controller function to handle promoting a user to employee
export const promoteUserToEmployee = async (req, res) => {
  const { id } = req.params; // Get the user ID from the route parameters

  try {
    const [result] = await con.query(
      "UPDATE users SET role_id = 1 WHERE id = ?",
      [id]
    );

    if (result.affectedRows > 0) {
      // If the user was successfully promoted
      res.status(200).json({
        status: 200,
        message: `User with id:${id} has been updated and accepted as employee.`,
      });
    } else {
      // If no user was found or updated
      res.status(404).json({
        status: 404,
        message: `User with id:${id} not found.`,
      });
    }
  } catch (err) {
    console.error("Database update error:", err);
    res.status(500).json({
      status: 500,
      message: "Error occurred while promoting the user.",
    });
  }
};
