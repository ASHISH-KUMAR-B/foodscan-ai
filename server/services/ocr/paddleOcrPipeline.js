import { extractText } from "./paddleOcrService.js";
import { cleanOCRText } from "../parser/ocrCleaner.js";
import { extractNutrition } from "../parser/nutritionParser.js";

export async function runPaddleOcrPipeline(imagePath, { debug = false } = {}) {
  if (!imagePath) {
    throw new Error("Please provide an image path.");
  }

  const rawText = await extractText(imagePath);
  const cleanedText = cleanOCRText(rawText);
  const nutrition = extractNutrition(cleanedText);

  if (debug) {
    console.log("\n=== PADDLE RAW OCR ===");
    console.log(rawText || "[empty]");
    console.log("\n=== PADDLE CLEANED OCR ===");
    console.log(cleanedText || "[empty]");
    console.log("\n=== PADDLE NUTRITION ===");
    console.log(nutrition);
  }

  return {
    cleanedText,
    nutrition,
  };
}