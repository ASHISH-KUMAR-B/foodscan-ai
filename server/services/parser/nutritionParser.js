const NUTRITION_START_PATTERNS = [
  /nutrition facts/i,
  /nutrition information/i,
  /\bnutrition\b/i,
];

const NUTRITION_STOP_PATTERNS = [
  /^ingredients\b/i,
  /^allergen\b/i,
  /^contains\b/i,
  /^may contain\b/i,
  /^manufactured\b/i,
  /^processed in\b/i,
  /^storage\b/i,
  /^store\b/i,
  /^best before\b/i,
];

function normalizeLine(line) {
  return line.replace(/\s+/g, " ").trim();
}

function getNutritionLines(text) {
  if (!text) return [];

  const lines = text
    .replace(/\r/g, "")
    .split("\n")
    .map(normalizeLine)
    .filter(Boolean);

  let startIndex = lines.findIndex((line) =>
    NUTRITION_START_PATTERNS.some((pattern) => pattern.test(line))
  );

  if (startIndex === -1) {
    startIndex = lines.findIndex((line) =>
      /energy|protein|carbohydrate|carbohydrates|fat|sodium|fiber|fibre|sugars?|cholesterol/i.test(
        line
      )
    );
  }

  if (startIndex === -1) {
    return lines;
  }

  let endIndex = lines.length;

  for (let i = startIndex + 1; i < lines.length; i++) {
    if (NUTRITION_STOP_PATTERNS.some((pattern) => pattern.test(lines[i]))) {
      endIndex = i;
      break;
    }
  }

  return lines.slice(startIndex, endIndex);
}

function detectPreferredSide(lines) {
  const joined = lines.join("\n");
  const hasServing =
    /\bper\s*serving\b/i.test(joined) || /\bserving\s*size\b/i.test(joined);
  const hasPer100 =
    /\bper\s*100\s*(?:g|gm|gram)s?\b/i.test(joined) ||
    /\bper\s*100\b/i.test(joined) ||
    /\b100\s*[go9]\b/i.test(joined);

  if (!hasServing && !hasPer100) {
    return "first";
  }

  if (hasServing && !hasPer100) {
    return "first";
  }

  if (!hasServing && hasPer100) {
    return "first";
  }

  for (const line of lines) {
    const lower = line.toLowerCase();
    const servingIndex = lower.search(/\bper\s*serving\b|\bserving\s*size\b/);
    const per100Index = lower.search(
      /\bper\s*100\s*(?:g|gm|gram)s?\b|\bper\s*100\b|\b100\s*[go9]\b/
    );

    if (servingIndex !== -1 && per100Index !== -1) {
      return servingIndex > per100Index ? "last" : "first";
    }
  }

  return "first";
}

function cleanCandidateText(text) {
  return text
    .replace(/\([^)]*\)/g, " ")
    .replace(/\b\d+(?:\.\d+)?%/g, " ")
    .replace(/\bper\s*serving\b/gi, " ")
    .replace(/\bserving\s*size\b/gi, " ")
    .replace(/\bservings?\s+per\s+container\b/gi, " ")
    .replace(/\bper\s*100\s*(?:g|gm|gram)s?\b/gi, " ")
    .replace(/\bper\s*100\b/gi, " ")
    .replace(/!/g, "1")
    .replace(/\|/g, "1")
    .replace(/^s\b/i, " ");
}

function extractNumbers(text) {
  return cleanCandidateText(text).match(/\d+(?:\.\d+)?/g) ?? [];
}

function pickNumber(numbers, preferLast) {
  if (!numbers.length) {
    return null;
  }

  const value = preferLast && numbers.length > 1 ? numbers[numbers.length - 1] : numbers[0];
  return Number(value);
}

function findAliasMatch(lowerLine, aliases, exclusions) {
  for (const alias of aliases) {
    const aliasLower = alias.toLowerCase();
    let searchFrom = 0;

    while (true) {
      const idx = lowerLine.indexOf(aliasLower, searchFrom);
      if (idx === -1) break;

      const before = lowerLine.slice(Math.max(0, idx - 20), idx).trim();
      const isExcluded = exclusions.some((exclusion) =>
        before.endsWith(exclusion.toLowerCase())
      );

      if (!isExcluded) {
        return { index: idx, alias };
      }

      searchFrom = idx + aliasLower.length;
    }
  }

  return null;
}

function getValue(source, aliases, exclusions = [], { preferLast = false } = {}) {
  const lines = Array.isArray(source) ? source : getNutritionLines(source);
  let matchedIndex = -1;
  let matchedPos = -1;

  for (let i = 0; i < lines.length; i++) {
    const match = findAliasMatch(lines[i].toLowerCase(), aliases, exclusions);
    if (match) {
      matchedIndex = i;
      matchedPos = match.index;
      break;
    }
  }

  if (matchedIndex === -1) return null;

  const candidateIndexes = [matchedIndex, matchedIndex + 1, matchedIndex - 1];

  for (const index of candidateIndexes) {
    if (index < 0 || index >= lines.length) continue;

    let candidateText = lines[index];

    if (index === matchedIndex) {
      const alias = aliases.find((a) =>
        lines[index].toLowerCase().slice(matchedPos, matchedPos + a.length).toLowerCase() === a.toLowerCase()
      ) ?? "";
      candidateText = candidateText.substring(matchedPos + alias.length);
    }

    const numbers = extractNumbers(candidateText);
    if (numbers.length) {
      return pickNumber(numbers, preferLast);
    }
  }

  return null;
}


export function extractNutrition(text) {
  const nutritionLines = getNutritionLines(text);
  const preferLast = detectPreferredSide(nutritionLines) === "last";

  return {
    energy: getValue(
      nutritionLines,
      ["energy", "eneray", "enerqy", "eneroy", "kcal", "calories"],
      [],
      { preferLast }
    ),
    protein: getValue(nutritionLines, ["protein", "protien", "proteina"], [], {
      preferLast,
    }),
    carbohydrates: getValue(
      nutritionLines,
      ["carbohydrates", "carbohydrate", "carbo", "carb"],
      [],
      { preferLast }
    ),
    totalSugars: getValue(
      nutritionLines,
      ["total sugars", "total sugar", "sugars", "sugar"],
      ["added"],
      { preferLast }
    ),
    addedSugars: getValue(
      nutritionLines,
      ["added sugars", "added sugar", "goed sugar", "goed sugars"],
      [],
      { preferLast }
    ),
    fiber: getValue(nutritionLines, ["dietary fiber", "fiber", "fibre"], [], {
      preferLast,
    }),
    fat: getValue(nutritionLines, ["total fat", "fat"], ["saturated", "trans"], {
      preferLast,
    }),
    saturatedFat: getValue(nutritionLines, ["saturated fat", "saturated"], [], {
      preferLast,
    }),
    transFat: getValue(nutritionLines, ["trans fat", "trans"], [], {
      preferLast,
    }),
    cholesterol: getValue(nutritionLines, ["cholesterol", "cholestrol"], [], {
      preferLast,
    }),
    sodium: getValue(nutritionLines, ["sodium", "sod", "sydium", "dium"], [], {
      preferLast,
    }),
  };
}

const GRAM_BOUNDED_FIELDS = [
  "protein", "carbohydrates", "totalSugars", "addedSugars",
  "fiber", "fat", "saturatedFat", "transFat",
];

function pickBetterValue(field, aVal, bVal) {
  if (aVal == null) return bVal ?? null;
  if (bVal == null) return aVal;

  if (GRAM_BOUNDED_FIELDS.includes(field)) {
    const aBad = aVal > 100;
    const bBad = bVal > 100;
    if (aBad && !bBad) return bVal;
    if (bBad && !aBad) return aVal;

    const aIsDecimal = !Number.isInteger(aVal);
    const bIsDecimal = !Number.isInteger(bVal);
    if (aIsDecimal && !bIsDecimal) return aVal;
    if (bIsDecimal && !aIsDecimal) return bVal;
  }

  return aVal; // default: prefer standard pass when no signal either way
}

export function mergeNutrition(a, b) {
  const merged = {};
  for (const key of Object.keys(a)) {
    merged[key] = pickBetterValue(key, a[key], b[key]);
  }
  return merged;
}