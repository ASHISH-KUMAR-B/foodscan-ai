import { extractText } from "./tesseractService.js";
import { cleanOCRText } from "../parser/ocrCleaner.js";
import { preprocessImageOpenCV } from "./opencvPreprocessor.js";
import { extractNutrition, mergeNutrition } from "../parser/nutritionParser.js";

async function runPass(imagePath, { upscale = false, suffix }) {
  const processedImage = await preprocessImageOpenCV(imagePath, {
    upscale,
    suffix,
  });

  const rawText = await extractText(processedImage);
  const cleanedText = cleanOCRText(rawText);
  const nutrition = extractNutrition(cleanedText);

  return {
    processedImage,
    rawText,
    cleanedText,
    nutrition,
  };
}

function logPass(name, pass) {
  console.log(`\n=== ${name} ===`);
  console.log("Raw OCR:");
  console.log(pass.rawText || "[empty]");
  console.log("\nCleaned OCR:");
  console.log(pass.cleanedText || "[empty]");
  console.log("\nNutrition:");
  console.log(pass.nutrition);
}

export async function runOcrPipeline(imagePath, { debug = false } = {}) {
  if (!imagePath) {
    throw new Error("Please provide an image path.");
  }

  const standardPass = await runPass(imagePath, {
    suffix: "opencv",
  });

  const upscaledPass = await runPass(imagePath, {
    upscale: true,
    suffix: "opencv-up",
  });

  const mergedNutrition = mergeNutrition(
    standardPass.nutrition,
    upscaledPass.nutrition
  );

  if (debug) {
    logPass("PASS 1 (Standard)", standardPass);
    logPass("PASS 2 (2x Upscaled)", upscaledPass);
    console.log("\n=== MERGED NUTRITION ===");
    console.log(mergedNutrition);
  }

  return {
    standardPass,
    upscaledPass,
    mergedNutrition,
  };
}
