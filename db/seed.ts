import "dotenv/config";
import { getDb } from "../api/queries/connection.js";
import { siteContent } from "./schema.js";
import { defaultSiteContent } from "../api/content-router.js";

async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  await db
    .insert(siteContent)
    .values({ key: "site", value: defaultSiteContent })
    .onConflictDoNothing({ target: siteContent.key });

  const [row] = await db.select().from(siteContent);
  console.log(`site_content seeded: ${row ? row.key : "none"}`);

  console.log("Done.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
