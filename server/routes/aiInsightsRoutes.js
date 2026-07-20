import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getAIInsights } from "../controllers/aiInsightsController.js";

const router = express.Router();

router.post("/insights/:scanId", protect, getAIInsights);

export default router;