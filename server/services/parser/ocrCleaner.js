export function cleanOCRText(text) {
  if (!text) return "";

  let cleaned = text
    // Normalize line endings
    .replace(/\r/g, "")

    // Remove tabs
    .replace(/\t/g, " ")

    // Remove repeated spaces
    .replace(/[ ]{2,}/g, " ")

    // Remove repeated blank lines
    .replace(/\n{2,}/g, "\n")

    // -------------------------
    // Common OCR corrections
    // -------------------------
    .replace(/Eneray/gi, "Energy")
    .replace(/Fotai/gi, "Total")
    .replace(/lodised/gi, "Iodised")
    .replace(/AcidityRegulator/gi, "Acidity Regulator")
    .replace(/Acidity Reg[,.\s]*ator/gi, "Acidity Regulator")
    .replace(/Hydrolyzed Vegetable Protein\s*\(So\)/gi, "Hydrolyzed Vegetable Protein (Soy)")
    .replace(/Rice Bran Oi\b/gi, "Rice Bran Oil")

    // Image-specific OCR mistakes
    .replace(/Green\s+Chil\b/gi, "Green Chilli")
    .replace(/Green Chilli\s*\*\s*Powder/gi, "Green Chilli Powder")
    .replace(/Iu Tamarind/gi, "Tamarind")
    .replace(/Mikmay/gi, "Milk may")
    .replace(/Nu['®]*/gi, "Nuts")

    // -------------------------
    // Ingredient corrections
    // -------------------------
    .replace(
      /Chickpeas\s*\(Bengal Gram\s*\/\s*be Chana\s*\(82%\)/gi,
      "Chickpeas (Bengal Gram / Chana) (82%)"
    )

    .replace(
      /Chickpeas\s*\(Bengal Gram\s*\/\s*Chana\s*\(82%\)/gi,
      "Chickpeas (Bengal Gram / Chana) (82%)"
    )

    // -------------------------
    // Remove OCR symbols
    // -------------------------
    .replace(/[|`~]/g, "")
    .replace(/[‘’]/g, "")
    .replace(/[“”]/g, '"')

    // -------------------------
    // Remove obvious garbage
    // -------------------------
    .replace(/\bA\s+\d+\b/g, "")
    .replace(/EE NATURE.*$/gim, "")
    .replace(/Job\s+\w+\s+\d+/gi, "")

    // -------------------------
    // Fix punctuation
    // -------------------------
    .replace(/\.\s+/g, ", ")
    .replace(/,\)/g, ")")
    .replace(/INS\s*330,INS\s*296/gi, "INS 330, INS 296")
    .replace(/Dry Mango Powder Cumin/gi, "Dry Mango Powder, Cumin")
    .replace(/Garlic,\s*Tamarind/gi, "Garlic, Tamarind")

    // -------------------------
    // Join ingredient lines only
    // -------------------------
    .replace(/\/\s*\n\s*/g, "/ ")
    .replace(/,\s*\n\s*/g, ", ")
    .replace(/\(\s*\n\s*/g, "(")
    .replace(/\n\s*\)/g, ")");

  // Restore headings
  cleaned = cleaned
    .replace(/Nutrition Facts/gi, "\nNutrition Facts\n")
    .replace(/INGREDIENTS:/gi, "\nINGREDIENTS:\n")
    .replace(/ALLERGEN INFORMATION/gi, "\nALLERGEN INFORMATION:\n");

  // Balance parentheses
  const open = (cleaned.match(/\(/g) || []).length;
  const close = (cleaned.match(/\)/g) || []).length;

  if (open > close) {
    cleaned += ")".repeat(open - close);
  }

  return cleaned
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)
    .join("\n");
}