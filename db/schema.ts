import {
  pgTable,
  pgEnum,
  serial,
  varchar,
  text,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["user", "admin"]);
export const inquiryStatusEnum = pgEnum("inquiry_status", [
  "new",
  "read",
  "replied",
  "archived",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  serviceNeeded: varchar("serviceNeeded", { length: 255 }),
  message: text("message").notNull(),
  status: inquiryStatusEnum("status").default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = typeof inquiries.$inferInsert;


export type SiteContent = {
  heroHeadline: string;
  heroSubtitle: string;
  contactPhone: string;
  whatsappPhone: string;
  contactEmail: string;
  footerDescription: string;
  announcement: string;
};

export const siteContent = pgTable("site_content", {
  key: varchar("key", { length: 80 }).primaryKey(),
  value: jsonb("value").$type<SiteContent>().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});
