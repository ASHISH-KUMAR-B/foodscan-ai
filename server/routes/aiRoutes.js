import express from "express";
import { analyzeController } from "../controllers/aiController.js";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/analyze",
  protect,
  (req, res, next) => {
    console.log("➡️ /api/ai/analyze called");
    next();
  },
  upload.single("image"),
  analyzeController
);

export default router;