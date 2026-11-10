-- Core tables required by admin authentication, user records, and enquiries.
-- site_content is created separately by 0001_site_content.sql.

DO $$ BEGIN
  CREATE TYPE "role" AS ENUM ('user', 'admin');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "inquiry_status" AS ENUM ('new', 'read', 'replied', 'archived');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "users" (
  "id" serial PRIMARY KEY NOT NULL,
  "unionId" varchar(255) NOT NULL UNIQUE,
  "name" varchar(255),
  "email" varchar(320),
  "avatar" text,
  "role" "role" DEFAULT 'user' NOT NULL,
  "createdAt" timestamp DEFAULT now() NOT NULL,
  "updatedAt" timestamp DEFAULT now() NOT NULL,
  "lastSignInAt" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "inquiries" (
  "id" serial PRIMARY KEY NOT NULL,
  "fullName" varchar(255) NOT NULL,
  "email" varchar(320) NOT NULL,
  "serviceNeeded" varchar(255),
  "message" text NOT NULL,
  "status" "inquiry_status" DEFAULT 'new' NOT NULL,
  "createdAt" timestamp DEFAULT now() NOT NULL,
  "updatedAt" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "inquiries_createdAt_idx" ON "inquiries" ("createdAt" DESC);
