import "dotenv/config";
import { analyzeIngredientSafety } from "../services/ai/cloudflareAI.js";

const sampleIngredients = [
  "Chickpeas (Bengal Gram / Chana) (82%)",
  "Green Chilli Seasoning (12%)",
  "Iodised Salt",
  "Spices & Condiments (Green Chilli Powder (0.2%), Coriander, Dry Mango Powder, Cumin, Turmeric)",
  "Maltodextrin",
  "Sugar",
  "Garlic",
  "Tamarind",
  "Hydrolyzed Vegetable Protein (Soy)",
  "Acidity Regulator (INS 330, INS 296)",
  "Rice Bran Oil",
];

const sampleNutrition = {
  calories: 429,
  protein: 18,
  carbohydrates: 62,
  sugar: 4,
  fat: 13,
  fiber: 18,
  sodium: 719,
};

async function run() {
  console.log("=== INGREDIENT SAFETY ANALYSIS ===");
  const result = await analyzeIngredientSafety(sampleIngredients, sampleNutrition);
  console.log(JSON.stringify(result, null, 2));
}

run().catch((err) => {
  console.error("Test run failed:", err.message);
  process.exit(1);
});