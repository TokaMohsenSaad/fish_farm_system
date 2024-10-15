import express from "express";
import tankRoutes from "./routes/tankRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import recordsRoutes from "./routes/recordsRoute.js";
import fishRoutes from "./routes/tankRoutes.js";
import controlRoutes from "./routes/controlRoutes.js";
import cors from "cors";

const app = express();
const PORT = 9000;

//http://localhost:9000/api/users/manage/
//http://localhost:9000/api/controls

//http://localhost:9000/api/controls?daynum=<formattedDate>

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

app.use("/api/tank", tankRoutes);
app.use("/api/users", userRoutes);

app.use("/api", recordsRoutes);
app.use("/api/fish", fishRoutes);

app.use("/api", controlRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
