import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";
import * as Sentry from "@sentry/node";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

Sentry.init({
  dsn: process.env.SENTRY_DSN_BACKEND,
  environment: process.env.NODE_ENV || "production",
  tracesSampleRate: 1.0, // captures performance data too; lower this (e.g. 0.1) later if you exceed free tier limits
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});