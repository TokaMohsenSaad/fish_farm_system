import bcrypt from "bcrypt";
import con from "../database_connection/db.js"; // assuming you have a file that handles the database connection

export const signupUser = async (req, res) => {
  const { email, first_name, password, last_name } = req.body;
  const role_id = 0; // Assign role_id as 0 for new users
  console.log("Reached the API endpoint");

  if (!first_name || !last_name || !email || !password) {
    return res.status(409).json({
      status: 409,
      message: "One of the fields is null or missing",
    });
  }

  try {
    const [rows] = await con.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length > 0) {
      console.log("User already exists:", email); // Log existing user
      return res.status(409).json({
        status: 409,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await con.query(
      "INSERT INTO users (password, email, first_name, last_name, role_id) VALUES (?, ?, ?, ?, ?)",
      [hashedPassword, email, first_name, last_name, role_id]
    );

    console.log("User created:", email); // Log successful user creation

    res.status(200).json({
      status: 200,
      data: {
        first_name,
        last_name,
        email,
      },
    });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({
      status: 500,
      message: "Database or hashing error",
    });
  }
};
