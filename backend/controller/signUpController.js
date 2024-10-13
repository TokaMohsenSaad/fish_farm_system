import bcrypt from "bcrypt";
import con from "../database_connection/db.js"; // assuming you have a file that handles the database connection

// Signup Controller function
export const signupUser = async (req, res) => {
  const { email, first_name, password, last_name } = req.body;
  console.log("reached the API endpoint");

  // Check if any field is missing or null
  if (!first_name || !last_name || !email || !password) {
    return res.status(409).json({
      status: 409,
      message: "One of the fields is null or missing",
    });
  }

  try {
    // Check if the user already exists
    const [rows] = await con.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length > 0) {
      return res.status(409).json({
        status: 409,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await con.query(
      "INSERT INTO users (password, email, first_name, last_name) VALUES (?, ?, ?, ?)",
      [hashedPassword, email, first_name, last_name]
    );

    // Send success response
    res.status(200).json({
      status: 200,
      data: {
        first_name,
        last_name,
        email,
      },
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      status: 500,
      message: "Database or hashing error",
    });
  }
};
