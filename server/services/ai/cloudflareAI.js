import axios from "axios";

import {
  CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_API_TOKEN,
  CLOUDFLARE_MODEL,
} from "../../config/cloudflare.js";

import safetyAnalysisPrompt from "../../prompts/foodPrompt.js";

function extractJSON(text) {
  if (!text) {
    throw new Error("Empty AI response");
  }

  let cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const start = cleaned.indexOf("{");
  if (start === -1) {
    throw new Error("No JSON object found");
  }

  let depth = 0;
  let end = -1;

  for (let i = start; i < cleaned.length; i++) {
    if (cleaned[i] === "{") depth++;
    if (cleaned[i] === "}") depth--;

    if (depth === 0) {
      end = i;
      break;
    }
  }

  if (end === -1) {
    throw new Error("Unterminated JSON object in AI response");
  }

  const jsonStr = cleaned.slice(start, end + 1);

  let parsed;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    throw new Error("AI response was not valid JSON");
  }

  if (!Array.isArray(parsed.ingredientNotes) || !Array.isArray(parsed.tips)) {
    throw new Error("Valid safety-analysis JSON not found");
  }

  return parsed;
}

export async function analyzeIngredientSafety(ingredients, nutrition) {
  if (!ingredients || ingredients.length === 0) {
    throw new Error("No ingredients provided.");
  }

  const prompt = safetyAnalysisPrompt
    .replace("{{INGREDIENTS_JSON}}", JSON.stringify(ingredients))
    .replace("{{NUTRITION_JSON}}", JSON.stringify(nutrition));

  try {
    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/${CLOUDFLARE_MODEL}`,
      {
        prompt,
        temperature: 0,
        max_tokens: 800,
      },
      {
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        timeout: 120000,
      }
    );

    const aiText =
      response.data?.result?.response || response.data?.result?.text || "";

    console.log("\nRAW AI RESPONSE:");
    console.log(aiText);

    const json = extractJSON(aiText);

    console.log("\nFINAL JSON:");
    console.log(JSON.stringify(json, null, 2));

    return json;
  } catch (error) {
    console.error(
      "Cloudflare AI Error:",
      error.response?.data || error.message
    );
    throw new Error("Ingredient safety analysis failed.", { cause: error });
  }
}