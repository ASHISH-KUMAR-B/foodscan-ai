export function extractIngredients(text) {
  const upper = text.toUpperCase();

  const start = upper.indexOf("INGREDIENTS");

  if (start === -1) return [];

  let ingredientText = text.substring(start);

  // Remove heading
  ingredientText = ingredientText.replace(/^.*?INGREDIENTS\s*:?\s*/is, "");

  // Stop when another section starts
  const stopWords = [
    "ALLERGEN",
    "ALLERGEN INFORMATION",
    "CONTAINS ADDED",
    "CONTAINS SOY",
    "PROCESSED IN",
    "MANUFACTURED",
    "STORAGE",
    "STORE",
    "BEST BEFORE"
  ];

  let stop = ingredientText.length;

  for (const word of stopWords) {
    const idx = ingredientText.toUpperCase().indexOf(word);

    if (idx !== -1 && idx < stop) {
      stop = idx;
    }
  }

  ingredientText = ingredientText.substring(0, stop);

  // Cleanup
  ingredientText = ingredientText
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .replace(/Le A/gi, "")
    .replace(/%\s*o.*$/gi, "")
    .trim();

  // Split only on commas outside brackets
  const ingredients = [];

  let current = "";
  let depth = 0;

  for (const ch of ingredientText) {

    if (ch === "(" || ch === "[") depth++;

    if (ch === ")" || ch === "]") depth--;

    if (ch === "," && depth === 0) {
      if (current.trim()) {
        ingredients.push(current.trim());
      }

      current = "";
      continue;
    }

    current += ch;
  }

  if (current.trim()) {
    ingredients.push(current.trim());
  }

  return ingredients;
}