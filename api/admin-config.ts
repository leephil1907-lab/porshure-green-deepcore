function requiredSecret(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const ADMIN_EMAIL = requiredSecret("ADMIN_EMAIL").toLowerCase();
export const ADMIN_PASSWORD_HASH = requiredSecret("ADMIN_PASSWORD_HASH");
export const ADMIN_JWT_SECRET = new TextEncoder().encode(requiredSecret("ADMIN_JWT_SECRET"));
export const ADMIN_TOKEN_COOKIE = "admin_session";
