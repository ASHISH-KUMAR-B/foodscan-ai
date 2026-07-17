const ALLERGENS = [
  "milk",
  "soy",
  "wheat",
  "gluten",
  "peanut",
  "peanuts",
  "tree nuts",
  "nuts",
  "almond",
  "cashew",
  "walnut",
  "egg",
  "fish",
  "shellfish",
  "sesame",
];

const RESTRICTED = [
  "ins 102",
  "ins 110",
  "ins 122",
  "ins 124",
  "ins 129",
  "ins 211",
  "high fructose corn syrup",
  "aspartame",
];

export function detectAllergens(ingredients) {
  const text = ingredients.join(" ").toLowerCase();

  return ALLERGENS.filter((item) => text.includes(item));
}

export function detectRestrictedIngredients(ingredients) {
  const text = ingredients.join(" ").toLowerCase();

  return RESTRICTED.filter((item) => text.includes(item));
}

export function calculateHealthScore(nutrition, restrictedIngredients) {
  let score = 100;

  // Sugar
  if ((nutrition.sugar ?? 0) > 20) score -= 25;
  else if ((nutrition.sugar ?? 0) > 10) score -= 10;

  // Sodium
  if ((nutrition.sodium ?? 0) > 600) score -= 25;
  else if ((nutrition.sodium ?? 0) > 300) score -= 10;

  // Fat
  if ((nutrition.fat ?? 0) > 20) score -= 15;
  else if ((nutrition.fat ?? 0) > 10) score -= 5;

  // Fiber Bonus
  if ((nutrition.fiber ?? 0) >= 5) score += 5;

  // Protein Bonus
  if ((nutrition.protein ?? 0) >= 8) score += 5;

  // Restricted additives
  score -= restrictedIngredients.length * 10;

  if (score > 100) score = 100;
  if (score < 0) score = 0;

  return score;
}

export function getVerdict(score) {
  if (score >= 85) return "🟢 Excellent";
  if (score >= 70) return "🟢 Healthy";
  if (score >= 55) return "🟡 Moderate";
  if (score >= 40) return "🟠 Consume Occasionally";
  return "🔴 Unhealthy";
}

// --- SAFETY (separate from nutrition health score) ---
// Answers "is this safe to eat" independently of "is this nutritionally good".
// A product can be Safe but Unhealthy (e.g. high-sodium chips with no
// restricted additives), or in principle Unsafe regardless of how clean
// its nutrition profile looks.
export function getSafetyStatus(allergens, restrictedIngredients) {
  const safetyReasons = [];

  if (restrictedIngredients.length > 0) {
    safetyReasons.push(
      `Contains restricted/flagged ingredient(s): ${restrictedIngredients.join(", ")}`
    );
    return {
      safetyStatus: "🚫 Unsafe",
      safetyReasons,
    };
  }

  if (allergens.length > 0) {
    safetyReasons.push(`Contains allergen(s): ${allergens.join(", ")}`);
    return {
      safetyStatus: "⚠️ Caution",
      safetyReasons,
    };
  }

  return {
    safetyStatus: "✅ Safe",
    safetyReasons: ["No restricted ingredients or allergens detected."],
  };
}

export function generateTips(nutrition, allergens) {
  const tips = [];

  if ((nutrition.protein ?? 0) >= 8) {
    tips.push("✅ Good source of protein.");
  }

  if ((nutrition.fiber ?? 0) >= 5) {
    tips.push("✅ Good source of dietary fiber.");
  }

  if ((nutrition.sodium ?? 0) > 400) {
    tips.push("⚠️ High sodium content.");
  }

  if ((nutrition.sugar ?? 0) > 15) {
    tips.push("⚠️ High sugar content.");
  }

  if ((nutrition.fat ?? 0) > 20) {
    tips.push("⚠️ High fat content.");
  }

  if (allergens.length) {
    tips.push(`🚨 Contains allergens: ${allergens.join(", ")}`);
  }

  if (tips.length === 0) {
    tips.push("✅ Suitable for occasional consumption.");
  }

  return tips;
}