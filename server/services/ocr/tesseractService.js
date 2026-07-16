import Tesseract from "tesseract.js";

export async function extractText(imagePath) {

  const { data } = await Tesseract.recognize(
    imagePath,
    "eng",
    {
      logger: (info) => {
        if (info.status === "recognizing text") {
          console.log(
            `OCR Progress: ${Math.round(info.progress * 100)}%`
          );
        }
      }
    }
  );

  return data.text;
}