import { scanFoodProductPaddle } from "../services/scanner/paddleScanService.js";
import Scan from "../models/Scan.js";

export const analyzeControllerPaddle = async (req, res) => {
  try {
    const result = await scanFoodProductPaddle(req.file, req.body.country);

    const savedScan = await Scan.create({
      user: req.user._id,
      ...result,
    });

    return res.status(200).json({
      success: true,
      data: result,
      scanId: savedScan._id,
    });
  } catch (error) {
    console.error("Paddle AI Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Image analysis failed.",
    });
  }
};