import { scanFoodProduct } from "../services/scanner/scanService.js";

export const analyzeController = async (req, res) => {
  try {
    const result = await scanFoodProduct(req.file);

    return res.status(200).json(result);
  } catch (error) {
    console.error("AI Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Image analysis failed.",
    });
  }
};