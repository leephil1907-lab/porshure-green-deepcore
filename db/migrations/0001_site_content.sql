CREATE TABLE IF NOT EXISTS "site_content" (
  "key" varchar(80) PRIMARY KEY NOT NULL,
  "value" jsonb NOT NULL,
  "updatedAt" timestamp DEFAULT now() NOT NULL
);
