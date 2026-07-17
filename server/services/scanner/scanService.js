import { extractIngredients } from "../parser/ingredientParser.js";
import { runOcrPipeline } from "../ocr/ocrPipeline.js";

import { analyzeIngredients } from "../../analysis/ingredientAnalyzer.js";

import {
  detectAllergens,
  detectRestrictedIngredients,
  calculateHealthScore,
  getVerdict,
  generateTips,
  getSafetyStatus,   // ADD THIS
} from "../../analysis/healthScore.js";

export async function scanFoodProduct(file) {
  if (!file) {
    throw new Error("Please upload an image.");
  }

  console.log(`\n========== FOOD SCAN START ==========`);

  // ---------------- OCR ----------------
  const { standardPass, mergedNutrition } = await runOcrPipeline(file.path, {
    debug: true,
  });

  // ---------------- INGREDIENT EXTRACTION ----------------
  const ingredients = extractIngredients(standardPass.cleanedText);

  console.log("\n=== INGREDIENTS ===");
  console.log(ingredients);

  // ---------------- INGREDIENT ANALYSIS ----------------
  const ingredientAnalysis = analyzeIngredients(ingredients);

  console.log("\n=== INGREDIENT ANALYSIS ===");
  console.table(ingredientAnalysis);

  // ---------------- HEALTH ANALYSIS ----------------
  const allergens = detectAllergens(ingredients);

  const restrictedIngredients =
    detectRestrictedIngredients(ingredients);

  const healthScore = calculateHealthScore(
    mergedNutrition,
    restrictedIngredients
  );

  const verdict = getVerdict(healthScore);

const tips = generateTips(
    mergedNutrition,
    allergens
  );

  const { safetyStatus, safetyReasons } = getSafetyStatus(
    allergens,
    restrictedIngredients
  );

  console.log("\n=== HEALTH ANALYSIS ===");

 console.log({
    allergens,
    restrictedIngredients,
    healthScore,
    verdict,
    safetyStatus,
    safetyReasons,
    tips,
  });

  // ---------------- NUTRITION ----------------
  const nutrition = {
    calories: mergedNutrition.energy,
    protein: mergedNutrition.protein,
    carbohydrates: mergedNutrition.carbohydrates,
    sugar: mergedNutrition.totalSugars,
    fat: mergedNutrition.fat,
    fiber: mergedNutrition.fiber,
    sodium: mergedNutrition.sodium,
  };

  console.log("\n=== FINAL RESULT ===");

console.log({
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
});

  console.log("\n========== FOOD SCAN END ==========\n");

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