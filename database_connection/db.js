import mysql from "mysql2/promise"; // Import MySQL2 with promise support

// Create the connection pool (better than single connection for large apps)
const con = mysql.createPool({
  host: "localhost", // Change this to your MySQL host
  user: "root", // Your MySQL username
  password: "root", // Your MySQL password
  database: "fish_farm", // Your MySQL database name
});

con.getConnection((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Export the connection pool
export default con;
