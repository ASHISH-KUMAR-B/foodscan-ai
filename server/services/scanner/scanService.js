import { extractIngredients } from "../parser/ingredientParser.js";
import { runOcrPipeline } from "../ocr/ocrPipeline.js";
import {
  detectAllergens,
  detectRestrictedIngredients,
  calculateHealthScore,
  getVerdict,
  generateTips,
} from "../analysis/healthScore.js";

export async function scanFoodProduct(file) {
  if (!file) {
    throw new Error("Please upload an image.");
  }

  console.log(`\n=== SCANNING FILE: ${file.filename || file.path} ===`);

  const { standardPass, mergedNutrition } = await runOcrPipeline(file.path, {
    debug: true,
  });

  const ingredients = extractIngredients(standardPass.cleanedText);
  console.log("\n=== INGREDIENT PARSER OUTPUT ===");
  console.log(ingredients);

  const allergens = detectAllergens(ingredients);
  const restrictedIngredients = detectRestrictedIngredients(ingredients);
  const healthScore = calculateHealthScore(mergedNutrition, restrictedIngredients);
  const verdict = getVerdict(healthScore);
  const tips = generateTips(mergedNutrition, allergens);

  console.log("\n=== HEALTH ANALYSIS OUTPUT ===");
  console.log({
    allergens,
    restrictedIngredients,
    healthScore,
    verdict,
    tips,
  });

  const nutrition = {
    calories: mergedNutrition.energy,
    protein: mergedNutrition.protein,
    carbohydrates: mergedNutrition.carbohydrates,
    sugar: mergedNutrition.totalSugars,
    fat: mergedNutrition.fat,
    fiber: mergedNutrition.fiber,
    sodium: mergedNutrition.sodium,
  };

  return {
    productName: "Unknown",
    brand: "Unknown",
    ingredients,
    nutrition,
    healthScore,
    verdict,
    allergens,
    restrictedIngredients,
    tips,
  };
}
