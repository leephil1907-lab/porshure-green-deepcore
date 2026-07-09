// Admin credentials — email is porshuregreen@gmail.com
// Password: PorshureGreen2025!
// To change password, generate a new bcrypt hash and replace adminPasswordHash below

export const ADMIN_EMAIL = "porshuregreen@gmail.com";

// bcrypt hash of "PorshureGreen2025!"
export const ADMIN_PASSWORD_HASH = "$2b$10$WqWYZqjkLc8KJHesqQqdMe3k5kxG.MVljsVdwLehLu2mF8dWVCmaO";

// JWT secret for admin tokens
export const ADMIN_JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "porshure-green-admin-secret-key-2025"
);

export const ADMIN_TOKEN_COOKIE = "admin_session";
