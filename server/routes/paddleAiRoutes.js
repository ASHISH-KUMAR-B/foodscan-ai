import express from "express";
import { analyzeControllerPaddle } from "../controllers/paddleAiController.js";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/analyze-paddle", protect, upload.single("image"), analyzeControllerPaddle);

export default router;