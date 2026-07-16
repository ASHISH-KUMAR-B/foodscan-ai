import axios from "axios";

import {
  CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_API_TOKEN,
  CLOUDFLARE_MODEL,
} from "../../config/cloudflare.js";

import foodPrompt from "../../prompts/foodPrompt.js";


console.log("Cloudflare Config Check:");
console.log("ACCOUNT:", CLOUDFLARE_ACCOUNT_ID);
console.log("MODEL:", CLOUDFLARE_MODEL);
console.log(
  "TOKEN:",
  CLOUDFLARE_API_TOKEN ? "Loaded" : "Missing"
);



function extractJSON(text) {

  if (!text) {
    throw new Error("Empty AI response");
  }


  let cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .replace(/^[a-zA-Z\s]*:/, "")
    .trim();



  /*
    Find all JSON objects.
    Choose the largest valid JSON object.
  */

  const matches =
    cleaned.match(/\{[\s\S]*?\}/g);


  if (!matches || matches.length === 0) {

    throw new Error(
      "No JSON object found"
    );

  }



  let validJSON = null;



  for (const item of matches) {

    try {

      const parsed =
        JSON.parse(item);


      if (
        parsed.isFood !== undefined &&
        parsed.nutrition
      ) {

        validJSON = parsed;

      }


    } catch {

      continue;

    }

  }



  if (!validJSON) {

    throw new Error(
      "Valid Food JSON not found"
    );

  }


  return validJSON;

}




export async function analyzeImage(ocrText) {


  if (
    !ocrText ||
    ocrText.trim().length === 0
  ) {

    throw new Error(
      "No OCR text received."
    );

  }



  const prompt =
    foodPrompt.replace(
      "{{OCR_TEXT}}",
      ocrText
    );



  try {


    const response =
      await axios.post(


        `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/${CLOUDFLARE_MODEL}`,


        {

          prompt,


          temperature: 0,


          max_tokens: 800


        },


        {


          headers: {

            Authorization:
              `Bearer ${CLOUDFLARE_API_TOKEN}`,

            "Content-Type":
              "application/json"

          },


          timeout: 120000

        }


      );




    const aiText =
      response.data?.result?.response ||
      response.data?.result?.text ||
      "";




    console.log(
      "\nRAW AI RESPONSE:"
    );

    console.log(aiText);




    const json =
      extractJSON(aiText);




    console.log(
      "\nFINAL JSON:"
    );

    console.log(
      JSON.stringify(
        json,
        null,
        2
      )
    );



    return json;



  } catch (error) {
  console.error(
    "Cloudflare AI Error:",
    error.response?.data || error.message
  );

  throw new Error(
    "Food analysis failed.",
    { cause: error }
  );
}


}