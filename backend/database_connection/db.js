import mysql from "mysql2/promise"; // Import MySQL2 with promise support

// Create the connection pool (better than single connection for large apps)
const con = mysql.createPool({
  host: "localhost", // Change this to your MySQL host
  user: "root", // Your MySQL username
  password: "root", // Your MySQL password
  database: "fish_farm", // Your MySQL database name
  waitForConnections: true, // Allows the pool to wait for a connection if none are available
  connectionLimit: 10, // Max number of connections in the pool
  queueLimit: 0, // Unlimited queue size (you can limit this if needed)
});

// Export the connection pool
export default con;
