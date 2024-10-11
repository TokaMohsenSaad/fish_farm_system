import express from "express";
import tankRoutes from "./routes/tankRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import recordsRoutes from "./routes/recordsRoute.js";

const app = express();
const PORT = 9000;

// Middleware to parse JSON
app.use(express.json());

app.use("/api/tank", tankRoutes);
app.use("/api/users", userRoutes);

app.use("/api", recordsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
