import { extractIngredients } from "../parser/ingredientParser.js";
import { runPaddleOcrPipeline } from "../ocr/paddleOcrPipeline.js";
import { analyzeIngredients } from "../../analysis/ingredientAnalyzer.js";
import {
  detectAllergens,
  detectRestrictedIngredients,
  calculateHealthScore,
  getVerdict,
  generateTips,
  getSafetyStatus,
} from "../../analysis/healthScore.js";

export async function scanFoodProductPaddle(file) {
  if (!file) {
    throw new Error("Please upload an image.");
  }

  console.log(`\n========== PADDLE FOOD SCAN START ==========`);

  const { cleanedText, nutrition: mergedNutrition } = await runPaddleOcrPipeline(
    file.path,
    { debug: true }
  );

  const ingredients = extractIngredients(cleanedText);

  console.log("\n=== INGREDIENTS ===");
  console.log(ingredients);

  const ingredientAnalysis = analyzeIngredients(ingredients);

  const allergens = detectAllergens(ingredients);
  const restrictedIngredients = detectRestrictedIngredients(ingredients);
  const healthScore = calculateHealthScore(mergedNutrition, restrictedIngredients);
  const verdict = getVerdict(healthScore);
  const tips = generateTips(mergedNutrition, allergens);
  const { safetyStatus, safetyReasons } = getSafetyStatus(allergens, restrictedIngredients);

  const nutrition = {
    calories: mergedNutrition.energy,
    protein: mergedNutrition.protein,
    carbohydrates: mergedNutrition.carbohydrates,
    sugar: mergedNutrition.totalSugars,
    fat: mergedNutrition.fat,
    fiber: mergedNutrition.fiber,
    sodium: mergedNutrition.sodium,
  };

  console.log("\n========== PADDLE FOOD SCAN END ==========\n");

  return {
    ingredients,
    ingredientAnalysis,
    nutrition,
    healthScore,
    verdict,
    safetyStatus,
    safetyReasons,
    allergens,
    restrictedIngredients,
    tips,
  };
}