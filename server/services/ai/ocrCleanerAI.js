import axios from "axios";

import {
  CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_API_TOKEN,
  CLOUDFLARE_MODEL,
} from "../../config/cloudflare.js";

import ocrCleanupPrompt from "../../prompts/ocrCleanupPrompt.js";

export async function cleanOCRWithAI(rawOCR) {
  const prompt = ocrCleanupPrompt.replace("{{OCR_TEXT}}", rawOCR);

  try {
    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/${CLOUDFLARE_MODEL}`,
      {
        prompt,
        max_tokens: 1024,
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        timeout: 120000,
      }
    );

    const result = response.data?.result || {};

    const cleaned =
      result.response ||
      result.text ||
      result.output ||
      result.description ||
      "";

    if (!cleaned.trim()) {
      console.log("AI returned empty response. Using rule-cleaned OCR.");
      return rawOCR;
    }

    return cleaned.trim();
  } catch (err) {
    console.error(
      "OCR AI Cleaner Error:",
      err.response?.data || err.message
    );

    return rawOCR;
  }
}