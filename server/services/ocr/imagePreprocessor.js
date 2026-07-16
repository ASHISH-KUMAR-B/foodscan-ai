import sharp from "sharp";
import path from "path";

export async function preprocessImage(imagePath) {
  const outputPath = path.join(
    path.dirname(imagePath),
    `processed-${path.basename(imagePath)}`
  );

  await sharp(imagePath)
    .grayscale()
    .normalize()
    .sharpen()
    .linear(1.2, -10)
    .png()
    .toFile(outputPath);

  return outputPath;
}