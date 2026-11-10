import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import postgres from "postgres";
import { env } from "../lib/env";
import * as schema from "@db/schema";
import * as relations from "@db/relations";

const fullSchema = { ...schema, ...relations };

/**
 * Two drivers are supported:
 *  - Neon: HTTP driver (drizzle-orm/neon-http) — only works against Neon endpoints.
 *  - Any standard Postgres (Supabase, RDS, local, Docker): postgres.js.
 * The driver is picked from DATABASE_URL so swapping hosts is config-only.
 */
type Database = NeonHttpDatabase<typeof fullSchema>;

let instance: Database;

function isNeonUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return /(^|\.)neon\.(tech|build)$/.test(host);
  } catch {
    return false;
  }
}

function isLocalHost(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return host === "localhost" || host === "127.0.0.1" || host === "::1";
  } catch {
    return false;
  }
}

export function getDb(): Database {
  if (!env.hasDatabase) {
    throw new Error(
      "DATABASE_URL is not configured. Set it in your hosting environment to enable the contact form and admin dashboard.",
    );
  }
  if (!instance) {
    if (isNeonUrl(env.databaseUrl)) {
      const sql = neon(env.databaseUrl);
      instance = drizzleNeon(sql, { schema: fullSchema });
    } else {
      const client = postgres(env.databaseUrl, {
        // Supabase's pooler (pgbouncer, port 6543) doesn't support prepared statements.
        prepare: false,
        max: 1,
        idle_timeout: 20,
        ssl: isLocalHost(env.databaseUrl) ? false : "require",
      });
      // Same query API as the Neon HTTP driver, so we expose a single type.
      instance = drizzlePostgres(client, { schema: fullSchema }) as unknown as Database;
    }
  }
  return instance;
}
