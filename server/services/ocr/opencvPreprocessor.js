import sharp from "sharp";
import path from "path";
import cvPromise from "@techstark/opencv-js";

export async function preprocessImageOpenCV(imagePath, { upscale = false, suffix = "opencv" } = {}) {
  const cv = await cvPromise;

  // Optionally upscale 2x for better OCR on small/blurry rows
  let sharpInstance = sharp(imagePath);
  if (upscale) {
    const meta = await sharp(imagePath).metadata();
    sharpInstance = sharpInstance.resize(meta.width * 2, meta.height * 2, { fit: "fill" });
  }

  // Load into raw RGBA buffer
  const { data: rawBuffer, info } = await sharpInstance
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;

  // Load into OpenCV
  const src = new cv.Mat(height, width, cv.CV_8UC4);
  src.data.set(rawBuffer);

  // Grayscale
  const gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    // Detect inverted-color labels (light text on dark background) and flip them
  const meanVal = cv.mean(gray)[0];
  if (meanVal < 128) {
    cv.bitwise_not(gray, gray);
  }

  // Gaussian blur
  const blurred = new cv.Mat();
  const ksize = new cv.Size(3, 3);
  cv.GaussianBlur(gray, blurred, ksize, 0, 0, cv.BORDER_DEFAULT);


  // Adaptive thresholding - handles uneven lighting better than Otsu global
const thresholded = new cv.Mat();
cv.adaptiveThreshold(
  blurred,
  thresholded,
  255,
  cv.ADAPTIVE_THRESH_GAUSSIAN_C,
  cv.THRESH_BINARY,
  15,
  10
);

  // Save with 300 DPI so Tesseract uses the correct resolution hint
  const outputPath = path.join(
    path.dirname(imagePath),
    `${suffix}-${path.basename(imagePath)}`
  );

  await sharp(Buffer.from(thresholded.data), {
    raw: {
      width: thresholded.cols,
      height: thresholded.rows,
      channels: 1
    }
  })
  .png()
  .withMetadata({ density: 300 })
  .toFile(outputPath);

  
  // Cleanup
  src.delete();
  gray.delete();
  blurred.delete();
  thresholded.delete();

  return outputPath;
}
