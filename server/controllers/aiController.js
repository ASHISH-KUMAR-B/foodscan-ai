import { scanFoodProduct } from "../services/scanner/scanService.js";
import Scan from "../models/Scan.js";

export const analyzeController = async (req, res) => {
  try {
    const result = await scanFoodProduct(req.file);

    const savedScan = await Scan.create({
      user: req.user._id,
      ingredients: result.ingredients,
      ingredientAnalysis: result.ingredientAnalysis,
      nutrition: result.nutrition,
      healthScore: result.healthScore,
      verdict: result.verdict,
      safetyStatus: result.safetyStatus,
      safetyReasons: result.safetyReasons,
      allergens: result.allergens,
      restrictedIngredients: result.restrictedIngredients,
      tips: result.tips,
    });

    return res.status(200).json({
      success: true,
      data: result,
      scanId: savedScan._id,
    });
  } catch (error) {
    console.error("AI Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Image analysis failed.",
    });
  }
};