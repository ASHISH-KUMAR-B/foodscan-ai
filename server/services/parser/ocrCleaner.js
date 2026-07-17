// ocrCleaner.js

const OCR_REPLACEMENTS = [
  [/Eneray/gi, "Energy"],
  [/Enerqy/gi, "Energy"],
  [/Nutstrition/gi, "Nutrition"],
  [/Nutrition Fac/gi, "Nutrition Facts"],

  [/lodised/gi, "Iodised"],
  [/AcidityRegulator/gi, "Acidity Regulator"],
  [/Acidity Reg.?tor/gi, "Acidity Regulator"],

  [/Hydrolyzed Vegetable Protein\s*\(So\)/gi,
    "Hydrolyzed Vegetable Protein (Soy)"],

  [/Rice Bin Oil/gi, "Rice Bran Oil"],
  [/Rice Bn Oil/gi, "Rice Bran Oil"],
  [/Rice R.?in Oil/gi, "Rice Bran Oil"],

  [/Green Chl\b/gi, "Green Chilli"],
  [/Green Chil\b/gi, "Green Chilli"],
  [/Powde!/gi, "Powder"],
  [/Powde\b/gi, "Powder"],

  [/Dry Mango Powde!/gi, "Dry Mango Powder"],

  [/INS\s*330,INS\s*296/gi,
    "INS 330, INS 296"],

  [/So\./gi, "Soy"],
  [/\bi ny on Reg\s*ator\b/gi, "Acidity Regulator"],
  [/\bGreen Chill\b(?!i)/gi, "Green Chilli"],
];

const GARBAGE_LINES = [
  /SRCH/i,
  /SERON/i,
  /SECONT/i,
  /SCONT/i,
  /AROID/i,
  /RIDE$/i,
  /HAL IAB/i,
  /EE NATURE/i,
];

function fixLine(line) {
  let result = line;

  for (const [pattern, replacement] of OCR_REPLACEMENTS) {
    result = result.replace(pattern, replacement);
  }

  result = result
    .replace(/[|`~]/g, "")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\t/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return result;
}
export function cleanOCRText(text) {
  if (!text) return "";

  const cleaned = [];
  const lines = text.replace(/\r/g, "").split("\n");

  for (let line of lines) {
    line = fixLine(line);
    if (!line) continue;
    if (GARBAGE_LINES.some(r => r.test(line))) continue;
    cleaned.push(line);
  }

  let result = cleaned.join("\n");

  // ---- structural fixes (whole-text, not per-line) ----

  // Chickpeas (Bengal Gram / Chana (82%)  ->  Chickpeas (Bengal Gram / Chana) (82%)
  result = result.replace(
    /Chickpeas\s*\(\s*Bengal\s*Gram\s*\/\s*Chana\s*\((\d+%)\)/gi,
    "Chickpeas (Bengal Gram / Chana) ($1)"
  );

  // Green Chilli Seasoning (12%) (Iodised Salt  ->  ...(12%), Iodised Salt
  result = result.replace(/\((\d+%)\)\s*\(/g, "($1), ");

  // line-wrap ate the comma: "Garlic\nTamarind" -> "Garlic, Tamarind"
  result = result.replace(/\bGarlic\s+Tamarind\b/gi, "Garlic, Tamarind");
  // line-wrap ate the comma: "Powder\nCumin" -> "Powder, Cumin"
  result = result.replace(/\bPowder\s+Cumin\b/gi, "Powder, Cumin");
  // missing closing paren + comma at ingredient boundary:
  // stray extra ")" left over from removing the outer wrapper paren earlier
  // "INS 296)),Rice" -> "INS 296), Rice"
  result = result.replace(/\)\)\s*(,)/g, ")$1");
  // "(Soy Acidity Regulator" -> "(Soy), Acidity Regulator"
  result = result.replace(
  /\(Soy\s+Acidity Regulator/gi,
  "(Soy), Acidity Regulator"
);
  return result;
}