import "dotenv/config";

console.log("ENV CHECK:");
console.log("ACCOUNT:", process.env.CLOUDFLARE_ACCOUNT_ID);
console.log("MODEL:", process.env.CLOUDFLARE_MODEL);
console.log("TOKEN:", process.env.CLOUDFLARE_API_TOKEN ? "Loaded" : "Missing");


export const CLOUDFLARE_ACCOUNT_ID =
  process.env.CLOUDFLARE_ACCOUNT_ID;

export const CLOUDFLARE_API_TOKEN =
  process.env.CLOUDFLARE_API_TOKEN;

export const CLOUDFLARE_MODEL =
  process.env.CLOUDFLARE_MODEL;