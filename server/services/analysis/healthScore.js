// Common allergen keywords to detect in ingredient lists
const ALLERGEN_MAP = {
  Gluten: ["wheat", "gluten", "barley", "rye", "oats", "semolina", "spelt"],
  Soy: ["soy", "soya", "soybean", "hydrolyzed vegetable protein"],
  Milk: ["milk", "dairy", "lactose", "cheese", "butter", "cream", "whey", "casein"],
  Nuts: ["peanut", "tree nut", "almond", "cashew", "walnut", "hazelnut", "pistachio", "pecan", "nuts"],
  Eggs: ["egg"],
  Fish: ["fish", "anchovy", "salmon", "tuna", "cod"],
  Shellfish: ["shellfish", "shrimp", "crab", "lobster", "prawn"],
  Mustard: ["mustard"],
  Sesame: ["sesame"],
};

// Harmful additives to flag as restricted
const RESTRICTED_KEYWORDS = [
  "partially hydrogenated",
  "sodium nitrite",
  "sodium nitrate",
  "potassium bromate",
  "high fructose corn syrup",
  "ins 102", "ins 110", "ins 124", "ins 127", "ins 129",
  "bha", "bht",
];

export function detectAllergens(ingredients) {
  const ingredientText = ingredients.join(" ").toLowerCase();
  const found = [];

  for (const [allergen, keywords] of Object.entries(ALLERGEN_MAP)) {
    const detected = keywords.some(kw => ingredientText.includes(kw.toLowerCase()));
    if (detected) found.push(allergen);
  }

  return found;
}

export function detectRestrictedIngredients(ingredients) {
  const ingredientText = ingredients.join(" ").toLowerCase();
  return RESTRICTED_KEYWORDS.filter(kw => ingredientText.includes(kw.toLowerCase()));
}

export function calculateHealthScore(nutrition, restrictedIngredients) {
  let score = 70;

  const { energy, totalSugars, sodium, saturatedFat, transFat, protein, fiber } = nutrition;

  // Deductions
  if (energy   != null && energy   > 500) score -= 5;
  if (totalSugars != null && totalSugars > 10)  score -= 10;
  if (sodium   != null && sodium   > 500) score -= 10;
  if (saturatedFat != null && saturatedFat > 5)   score -= 5;
  if (transFat != null && transFat > 0)   score -= 15;
  if (restrictedIngredients.length > 0)          score -= restrictedIngredients.length * 10;

  // Additions
  if (protein != null && protein > 10) score += 10;
  if (fiber   != null && fiber   > 5)  score += 10;

  // Clamp between 0 and 100
  return Math.max(0, Math.min(100, score));
}

export function getVerdict(score) {
  if (score >= 90) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Moderate";
  if (score >= 30) return "Poor";
  return "Unhealthy";
}

export function generateTips(nutrition, allergens) {
  const tips = [];

  if (nutrition.sodium != null && nutrition.sodium > 500) {
    tips.push("High in sodium. Consider limiting intake if you have blood pressure concerns.");
  }
  if (nutrition.totalSugars != null && nutrition.totalSugars > 10) {
    tips.push("High sugar content. Frequent consumption may contribute to weight gain.");
  }
  if (nutrition.transFat != null && nutrition.transFat > 0) {
    tips.push("Contains trans fat. This is associated with increased cardiovascular risk.");
  }
  if (nutrition.saturatedFat != null && nutrition.saturatedFat > 5) {
    tips.push("High in saturated fat. Best consumed in moderation.");
  }
  if (nutrition.fiber != null && nutrition.fiber > 5) {
    tips.push("Good source of dietary fiber. Supports digestive health.");
  }
  if (nutrition.protein != null && nutrition.protein > 10) {
    tips.push("Good source of protein. Supports muscle maintenance and satiety.");
  }
  if (allergens.includes("Gluten")) {
    tips.push("Contains gluten. Not suitable for those with celiac disease or gluten intolerance.");
  }
  if (allergens.includes("Soy")) {
    tips.push("Contains soy. Check with your doctor if you have a soy allergy.");
  }

  if (tips.length === 0) {
    tips.push("This product appears to have a balanced nutritional profile.");
  }

  return tips;
}
