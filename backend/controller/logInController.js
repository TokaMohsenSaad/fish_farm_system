import bcrypt from "bcrypt";
import con from "../database_connection/db.js"; // your database connection

// Login Controller function
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Email and password are required",
    });
  }

  try {
    // Query for the user by email
    const [rows] = await con.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length > 0) {
      const hashedPassword = rows[0].password;

      // Compare provided password with stored hash
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        // Passwords match, send success response
        const { first_name, last_name, email, roleID } = rows[0];
        let isAdmin = false;
        let isEmployee = false;

        // Determine user role
        if (roleID === 1) {
          isAdmin = true;
        } else if (roleID === 2) {
          isEmployee = true;
        }

        return res.status(200).json({
          status: 200,
          data: {
            message: "Login successful",
            name: first_name + " " + last_name,
            email: email,
            isAdmin,
            isEmployee,
          },
        });
      } else {
        // Passwords do not match
        return res.status(401).json({
          status: 401,
          data: {
            message: "Incorrect password",
          },
        });
      }
    } else {
      // User not found
      return res.status(404).json({
        status: 404,
        data: {
          message: "User not found",
        },
      });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
