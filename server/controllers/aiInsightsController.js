import Scan from "../models/Scan.js";
import { analyzeIngredientSafety } from "../services/ai/cloudflareAI.js";

export const getAIInsights = async (req, res) => {
  try {
    const scan = await Scan.findOne({
      _id: req.params.scanId,
      user: req.user._id,
    });

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: "Scan not found.",
      });
    }

    if (!scan.ingredients || scan.ingredients.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No ingredients available for this scan.",
      });
    }

    const insights = await analyzeIngredientSafety(
      scan.ingredients,
      scan.nutrition
    );

    return res.status(200).json({
      success: true,
      data: insights,
    });
  } catch (error) {
    console.error("AI Insights Controller Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "AI insights are unavailable right now. Please try again later.",
    });
  }
};