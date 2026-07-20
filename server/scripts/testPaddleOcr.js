// server/scripts/testPaddleOcr.js
import "dotenv/config";
import { extractText } from "../services/ocr/paddleOcrService.js";

async function run() {
  const text = await extractText("C:\\Users\\Ashish Kumar B\\Downloads\\foodscan-ai\\server\\uploads\\test.jpeg");
  console.log(text);
}

run().catch(console.error);