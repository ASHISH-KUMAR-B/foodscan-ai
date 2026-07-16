function getValue(text, aliases, exclusions = []) {
  const lines = text.split("\n");
  let matchedIndex = -1;
  let matchedAlias = "";

  for (let i = 0; i < lines.length; i++) {
    const lowerLine = lines[i].toLowerCase();
    
    // Check exclusions first
    const matchesExclusion = exclusions.some(ex => lowerLine.includes(ex.toLowerCase()));
    if (matchesExclusion) continue;

    // Check aliases
    const foundAlias = aliases.find(alias => lowerLine.includes(alias.toLowerCase()));
    if (foundAlias) {
      matchedIndex = i;
      matchedAlias = foundAlias;
      break;
    }
  }

  if (matchedIndex === -1) return null;

  const line = lines[matchedIndex];
  console.log(aliases[0], "=> Found line:", line);

  // 1. Get the substring AFTER the matched label to prevent matching row-above offset numbers
  const labelPos = line.toLowerCase().indexOf(matchedAlias.toLowerCase());
  let targetText = line.substring(labelPos + matchedAlias.length);

  // 2. Clean plural 's' if left over at the start (e.g. "sugars" matching "sugar")
  targetText = targetText.replace(/^s\b/i, " ");

  // 3. Clean parentheticals, e.g. (g), (9), (mg)
  targetText = targetText.replace(/\([^)]*\)/g, " ");

  // 4. Strip percentage values (like 13%, 85%) as they belong to % RDA, not the main value
  targetText = targetText.replace(/\b\d+(\.\d+)?%/g, " ");

  // 5. Clean common OCR digit typos
  targetText = targetText
    .replace(/!/g, "1")    // ! misread as 1
    .replace(/\|/g, "1");  // | misread as 1

  // 6. Extract numbers from the target area
  let numbers = targetText.match(/\d+(\.\d+)?/g);

  // 7. Fallback: If no numbers found after the label on this line, check the line ABOVE
  if ((!numbers || numbers.length === 0) && matchedIndex > 0) {
    const lineAbove = lines[matchedIndex - 1];
    
    // Only use the line above if it doesn't contain another nutrient's label to avoid cross-row contamination
    const nutrientKeywords = ["energy", "protein", "carbohydrate", "sugar", "fiber", "fat", "sodium", "cholesterol", "kcal", "calories", "sydium"];
    const containsOtherLabel = nutrientKeywords.some(keyword => 
      lineAbove.toLowerCase().includes(keyword) && !aliases.some(a => keyword.includes(a.toLowerCase()))
    );

    if (!containsOtherLabel) {
      console.log(`  └─ No numbers on label line. Checking line above: "${lineAbove}"`);
      let cleanedAbove = lineAbove
        .replace(/\([^)]*\)/g, " ")
        .replace(/\b\d+(\.\d+)?%/g, " ")
        .replace(/!/g, "1");
      numbers = cleanedAbove.match(/\d+(\.\d+)?/g);
    } else {
      console.log(`  └─ Line above contains another nutrient label ("${lineAbove}"). Skipping fallback.`);
    }
  }

  if (!numbers || numbers.length === 0) return null;

  return Number(numbers[0]);
}

export function extractNutrition(text) {
  return {
    energy: getValue(text, ["energy", "eneray", "enerqy", "eneroy", "kcal", "calories"]),
    protein: getValue(text, ["protein", "protien", "proteina"]),
    carbohydrates: getValue(text, ["carbohydrates", "carbohydrate", "carbo", "carb"]),
    totalSugars: getValue(text, ["total sugars", "total sugar", "sugars", "sugar"], ["added"]),
    addedSugars: getValue(text, ["added sugars", "added sugar", "goed sugar", "goed sugars"]),
    fiber: getValue(text, ["dietary fiber", "fiber", "fibre"]),
    fat: getValue(text, ["total fat", "fat"], ["saturated", "trans"]),
    saturatedFat: getValue(text, ["saturated fat", "saturated"]),
    transFat: getValue(text, ["trans fat", "trans"]),
    cholesterol: getValue(text, ["cholesterol", "cholestrol"]),
    sodium: getValue(text, ["sodium", "sod", "sydium", "dium"]),
  };
}

// Merge two nutrition results — prefer A, fill nulls from B
export function mergeNutrition(a, b) {
  const merged = {};
  for (const key of Object.keys(a)) {
    merged[key] = a[key] ?? b[key] ?? null;
  }
  return merged;
}
