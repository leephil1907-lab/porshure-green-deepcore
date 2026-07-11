import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { env } from "../lib/env";
import * as schema from "@db/schema";
import * as relations from "@db/relations";

const fullSchema = { ...schema, ...relations };

let instance: ReturnType<typeof drizzle<typeof fullSchema>>;

export function getDb() {
  if (!env.hasDatabase) {
    throw new Error(
      "DATABASE_URL is not configured. Set it in your Vercel project's environment variables to enable the contact form and admin dashboard.",
    );
  }
  if (!instance) {
    const sql = neon(env.databaseUrl);
    instance = drizzle(sql, { schema: fullSchema });
  }
  return instance;
}
