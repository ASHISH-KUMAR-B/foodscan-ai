import cvPromise from "@techstark/opencv-js";

async function main() {
  console.log("cvPromise type:", typeof cvPromise, cvPromise instanceof Promise);
  const cv = await cvPromise;
  console.log("cv loaded successfully!");
  console.log("cv keys:", Object.keys(cv).slice(0, 20));
  process.exit(0);
}

main().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
