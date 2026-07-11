import "dotenv/config";

// NOTE: these used to hard-throw at import time when unset in production,
// which crashed the entire serverless function (including the static site)
// before a database was ever provisioned. They're now soft — code paths
// that actually need them (DB queries, Kimi OAuth) fail gracefully instead.
function softRequired(name: string): string {
  const value = process.env[name];
  if (!value && process.env.NODE_ENV === "production") {
    console.warn(
      `[env] ${name} is not set. Features that depend on it will be unavailable.`,
    );
  }
  return value ?? "";
}

function optional(name: string): string | undefined {
  return process.env[name] || undefined;
}

export const env = {
  appId: softRequired("APP_ID"),
  appSecret: softRequired("APP_SECRET"),
  isProduction: process.env.NODE_ENV === "production",
  databaseUrl: softRequired("DATABASE_URL"),
  hasDatabase: Boolean(process.env.DATABASE_URL),
  kimiAuthUrl: optional("VITE_KIMI_AUTH_URL") || "https://kimi.com",
  kimiOpenUrl: optional("VITE_KIMI_OPEN_URL") || "https://open.kimi.com",
  ownerUnionId: optional("OWNER_UNION_ID"),
};
