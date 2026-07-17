import { ingredientKnowledge } from "../data/ingredientKnowledge.js";

function lookup(name) {
  const matchKey = Object.keys(ingredientKnowledge).find((key) =>
    name.toLowerCase().includes(key.toLowerCase())
  );

  if (!matchKey) {
    return {
      name: name.trim(),
      known: false,
      category: "Unknown",
      purpose: "Unknown",
      risk: "Unknown",
      description: "No information available.",
    };
  }

  return {
    name: name.trim(),
    known: true,
    ...ingredientKnowledge[matchKey],
  };
}

// Pulls out a top-level parenthetical sub-list, e.g.
// "Spices & Condiments (Green Chilli Powder (0.2%), Coriander, Turmeric)"
// -> { label: "Spices & Condiments", subItems: ["Green Chilli Powder (0.2%)", "Coriander", "Turmeric"] }
function splitCompound(ingredient) {
  const match = ingredient.match(/^(.*?)\(([^]*)\)\s*$/);
  if (!match) return null;

  const label = match[1].trim();
  const inner = match[2];

  // Only treat as a compound if the inner content itself has comma-separated parts
  const parts = [];
  let current = "";
  let depth = 0;

  for (const ch of inner) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      if (current.trim()) parts.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  if (current.trim()) parts.push(current.trim());

  if (parts.length < 2) return null;

  return { label, subItems: parts };
}

export function analyzeIngredients(ingredients) {
  return ingredients.map((ingredient) => {
    const original = ingredient.trim();
    const compound = splitCompound(original);

    if (compound) {
      return {
        name: original,
        known: false,
        isCompound: true,
        category: "Compound",
        purpose: compound.label,
        risk: "Mixed",
        description: `Contains: ${compound.subItems.join(", ")}`,
        subIngredients: compound.subItems.map(lookup),
      };
    }

    return lookup(original);
  });
}