export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
export const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "";
export const ADMIN_JWT_SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || "");
export const ADMIN_TOKEN_COOKIE = "admin_session";
