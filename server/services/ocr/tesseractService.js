import { createWorker, PSM } from "tesseract.js";

console.log(">>> NEW extractText running, PSM:", PSM.SINGLE_COLUMN);
export async function extractText(imagePath) {
  const worker = await createWorker("eng", 1, {
    logger: (info) => {
      if (info.status === "recognizing text") {
        console.log(`OCR Progress: ${Math.round(info.progress * 100)}%`);
      }
    },
  });

  await worker.setParameters({
    tessedit_pageseg_mode: PSM.SINGLE_COLUMN,
  });

  const { data } = await worker.recognize(imagePath);
  await worker.terminate();

  return data.text;
}