import { REGULATORY_RULES } from "../data/regulatoryRules.js";

const ALLERGENS = [
  "milk", "soy", "wheat", "gluten", "peanut", "peanuts", "tree nuts", "nuts",
  "almond", "cashew", "walnut", "egg", "fish", "shellfish", "sesame",
];

export function detectAllergens(ingredients) {
  const text = ingredients.join(" ").toLowerCase();
  return ALLERGENS.filter((item) => text.includes(item));
}

// Now country-aware. Returns { banned: [], restricted: [], all: [] }
export function detectRestrictedIngredients(ingredients, countryCode = "IN") {
  const text = ingredients.join(" ").toLowerCase();
  const rules = REGULATORY_RULES[countryCode] || REGULATORY_RULES.IN;

  const banned = rules.bannedAdditives.filter(
    (item) => text.includes(item.code.toLowerCase()) || text.includes(item.name.toLowerCase())
  );
  const restricted = rules.restrictedAdditives.filter(
    (item) => text.includes(item.code.toLowerCase()) || text.includes(item.name.toLowerCase())
  );

  return {
    banned: banned.map((b) => b.name),
    restricted: restricted.map((r) => r.name),
    all: [...banned.map((b) => b.name), ...restricted.map((r) => r.name)],
  };
}

export function calculateHealthScore(nutrition, restrictedResult, countryCode = "IN") {
  let score = 100;
  const rules = REGULATORY_RULES[countryCode] || REGULATORY_RULES.IN;
  const limits = rules.dailyLimits;

  // Sugar - scored relative to this country's daily limit
  const sugarPct = ((nutrition.sugar ?? 0) / limits.sugar) * 100;
  if (sugarPct > 80) score -= 25;
  else if (sugarPct > 40) score -= 10;

  // Sodium - relative to country limit
  const sodiumPct = ((nutrition.sodium ?? 0) / limits.sodium) * 100;
  if (sodiumPct > 25) score -= 25;   // single serving eating >25% of daily sodium is high
  else if (sodiumPct > 12) score -= 10;

  // Fat - relative to country limit
  const fatPct = ((nutrition.fat ?? 0) / limits.fat) * 100;
  if (fatPct > 25) score -= 15;
  else if (fatPct > 12) score -= 5;

  // Fiber / Protein bonuses (unchanged)
  if ((nutrition.fiber ?? 0) >= 5) score += 5;
  if ((nutrition.protein ?? 0) >= 8) score += 5;

  // Banned additives = heavy penalty, restricted = lighter
  score -= restrictedResult.banned.length * 20;
  score -= restrictedResult.restricted.length * 10;

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

export function getSafetyStatus(allergens, restrictedResult, countryCode = "IN") {
  const rules = REGULATORY_RULES[countryCode] || REGULATORY_RULES.IN;
  const safetyReasons = [];

  if (restrictedResult.banned.length > 0) {
    safetyReasons.push(
      `Contains additive(s) banned in ${rules.name}: ${restrictedResult.banned.join(", ")}`
    );
    return { safetyStatus: "🚫 Unsafe", safetyReasons };
  }

  if (restrictedResult.restricted.length > 0) {
    safetyReasons.push(
      `Contains restricted additive(s) in ${rules.name}: ${restrictedResult.restricted.join(", ")}`
    );
    return { safetyStatus: "⚠️ Caution", safetyReasons };
  }

  if (allergens.length > 0) {
    safetyReasons.push(`Contains allergen(s): ${allergens.join(", ")}`);
    return { safetyStatus: "⚠️ Caution", safetyReasons };
  }

  return {
    safetyStatus: "✅ Safe",
    safetyReasons: [`No additives restricted or banned in ${rules.name}, and no allergens detected.`],
  };
}

export function generateTips(nutrition, allergens) {
  // unchanged — keep your existing version
}