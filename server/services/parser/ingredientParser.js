// OCR stop markers
const LINE_STOP_PATTERNS = [
  /^allergen/i,
  /^ater\s+information/i,
  /^allergen\s+information/i,
  /^contains\b/i,
  /^may\s+contain/i,
  /^manufactured/i,
  /^processed/i,
  /^facility/i,
  /^storage/i,
  /^store/i,
  /^best before/i,

  /^contains added/i,
  /^added flavours?/i,
  /^added flavors?/i,
  /^natural\s*&/i,

  /^fssai/i,
  /^lic/i,
];

const INLINE_STOP_PATTERNS = [
  /\ballergen/i,
  /\bater information/i,
  /\bcontains added/i,
  /\badded flavours?/i,
  /\badded flavors?/i,
  /\bmay contain/i,
  /\bmanufactured/i,
  /\bprocessed/i,
  /\bfacility/i,
  /\bstorage/i,
  /\bbest before/i,
];

const INVALID_PATTERNS = [
  /^allergen/i,
  /^contains/i,
  /^may contain/i,
  /^manufactured/i,
  /^processed/i,
  /^facility/i,
  /^storage/i,
  /^best before/i,
];

function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

function truncateInline(text) {
  let stop = text.length;

  for (const pattern of INLINE_STOP_PATTERNS) {
    const match = pattern.exec(text);

    if (match && match.index < stop) {
      stop = match.index;
    }
  }

  return text.substring(0, stop).trim();
}

function extractIngredientBlock(text) {
  const lines = text
    .replace(/\r/g, "")
    .split("\n")
    .map(normalize)
    .filter(Boolean);

  const start = lines.findIndex((l) =>
    /^ingredients\b/i.test(l)
  );

  if (start === -1) return "";

  const collected = [];

  let first = lines[start]
    .replace(/^ingredients\s*:?\s*/i, "")
    .trim();

  first = truncateInline(first);

  if (first) {
    collected.push(first);
  }

  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];

    if (LINE_STOP_PATTERNS.some((p) => p.test(line))) {
      break;
    }

    collected.push(truncateInline(line));
  }

  return collected
    .join(" ")
    .replace(/\s+/g, " ")
    .replace(/\s+,/g, ",")
    .trim();
}


function stripWrapperParens(item) {
  if (item.startsWith("(") && item.endsWith(")")) {
    let depth = 0;
    let isWrapper = true;

    for (let i = 0; i < item.length; i++) {
      if (item[i] === "(") depth++;
      if (item[i] === ")") depth--;
      if (depth === 0 && i < item.length - 1) {
        isWrapper = false;
        break;
      }
    }

    if (isWrapper) return item.slice(1, -1);
  }
  return item;
}

function cleanIngredient(item) {
  item = stripWrapperParens(item);

  return item
    .replace(/\*/g, "")
    .replace(/\+/g, "")
    .replace(/\bPowde!\b/gi, "Powder")
    .replace(/\bReg ator\b/gi, "Regulator")
    .replace(/\bOi\b/gi, "Oil")
    .replace(/\bBin\b/gi, "Bran")
    .replace(/\bSo\b/gi, "Soy")
    .replace(/\s+/g, " ")
    .replace(/\.$/, "")
    .trim();
}

export function extractIngredients(text) {
  const ingredientBlock = extractIngredientBlock(text);

  if (!ingredientBlock) return [];

  // OCR fixes
  let block = ingredientBlock
    .replace(/\n/g, " ")
    .replace(/\*/g, "")
    .replace(/\bPowde!\b/gi, "Powder")
    .replace(/\bReg ator\b/gi, "Regulator")
    .replace(/\bSo\b/gi, "Soy")
    .replace(/\bOi\b/gi, "Oil")
    .replace(/\bBin\b/gi, "Bran")
    .replace(/\s+/g, " ");

  // Remove outer wrapper after seasoning
  block = block.replace(
    /(Green Chilli Seasoning\s*\(\d+%\))\s*\(/i,
    "$1, "
  );

  block = block.replace(/\)\s*$/, "");

  const ingredients = [];

  let current = "";
  let depth = 0;

  for (const ch of block) {

    if (ch === "(") depth++;

    if (ch === ")") depth--;

    if (ch === "," && depth === 0) {

      if (current.trim())
        ingredients.push(current.trim());

      current = "";
      continue;
    }

    current += ch;
  }

  if (current.trim())
    ingredients.push(current.trim());

  return ingredients
    .map(cleanIngredient)
    .filter(Boolean)
    .filter(x => !INVALID_PATTERNS.some(p => p.test(x)));
}