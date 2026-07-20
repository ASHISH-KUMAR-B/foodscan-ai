// import axios from "axios";
// import FormData from "form-data";
// import fs from "fs";

// const OCR_SERVICE_URL = process.env.OCR_SERVICE_URL || "http://localhost:8001";

// export async function extractText(imagePath) {
//   try {
//     const formData = new FormData();
//     formData.append("file", fs.createReadStream(imagePath));

//     const response = await axios.post(`${OCR_SERVICE_URL}/ocr`, formData, {
//       headers: formData.getHeaders(),
//       timeout: 1200000, // 2 minutes timeout
//     });

//     if (!response.data?.success) {
//       throw new Error("OCR service returned unsuccessful response.");
//     }

//     return response.data.text || "";
//   } catch (error) {
//     console.error(
//       "PaddleOCR service error:",
//       error.response?.data || error.message
//     );
//     throw new Error("OCR processing failed.", { cause: error });
//   }
// }

import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { extractText as extractTextTesseract } from "./tesseractService.js";

const OCR_SERVICE_URL = process.env.OCR_SERVICE_URL || "http://localhost:8001";
const MIN_TEXT_LENGTH = 15; // below this, treat Paddle result as too weak to trust

export async function extractText(imagePath) {
  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(imagePath));

    const response = await axios.post(`${OCR_SERVICE_URL}/ocr`, formData, {
      headers: formData.getHeaders(),
      timeout: 1200000,
    });

    if (!response.data?.success) {
      throw new Error("OCR service returned unsuccessful response.");
    }

    const text = response.data.text || "";

    if (text.trim().length < MIN_TEXT_LENGTH) {
      console.warn(
        `PaddleOCR returned weak/empty text (${text.trim().length} chars). Falling back to Tesseract.`
      );
      return await extractTextTesseract(imagePath);
    }

    return text;
  } catch (error) {
    console.error(
      "PaddleOCR service error, falling back to Tesseract:",
      error.response?.data || error.message
    );
    return await extractTextTesseract(imagePath);
  }
}