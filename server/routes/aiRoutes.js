import express from "express";
import { analyzeController } from "../controllers/aiController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/analyze",
  upload.single("image"),
  analyzeController
);

export default router;