import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getHistory,
  getHistoryById,
  deleteHistory,
  getScanStats,
} from "../controllers/historyController.js";

const router = express.Router();

router.get("/stats", protect, getScanStats);
router.get("/", protect, getHistory);
router.get("/:id", protect, getHistoryById);
router.delete("/:id", protect, deleteHistory);

export default router;