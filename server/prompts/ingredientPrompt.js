const ingredientPrompt = `
You are a food label analyzer.

Analyze the uploaded food product image.

Return ONLY valid JSON.

{
  "productName":"",
  "brand":"",
  "ingredients":[],
  "nutrition":{},
  "allergens":[],
  "claims":[]
}

Rules:

- No markdown
- No explanation
- No extra text
- Return JSON only
`;

export default ingredientPrompt;