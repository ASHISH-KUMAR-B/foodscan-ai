import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import scanRoutes from "./routes/scanRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/scan", scanRoutes);
app.use("/uploads",express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FoodScan AI API is running 🚀",
  });
});

export default app;