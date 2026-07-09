import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? "";
}

function optional(name: string): string | undefined {
  return process.env[name] || undefined;
}

export const env = {
  appId: required("APP_ID"),
  appSecret: required("APP_SECRET"),
  isProduction: process.env.NODE_ENV === "production",
  databaseUrl: required("DATABASE_URL"),
  kimiAuthUrl: optional("VITE_KIMI_AUTH_URL") || "https://kimi.com",
  kimiOpenUrl: optional("VITE_KIMI_OPEN_URL") || "https://open.kimi.com",
  ownerUnionId: optional("OWNER_UNION_ID"),
};
