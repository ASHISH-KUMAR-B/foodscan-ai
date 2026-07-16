import express from "express";
import upload from "../middleware/upload.js";
import { uploadImage } from "../controllers/scanController.js";

const router = express.Router();

router.post(
  "/upload",
  (req, res, next) => {
    console.log("➡️ /api/scan/upload called");
    next();
  },
  upload.single("image"),
  uploadImage
);

export default router;