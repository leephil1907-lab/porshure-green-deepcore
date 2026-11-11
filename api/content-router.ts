import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { siteContent, type SiteContent } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const defaultSiteContent: SiteContent = {
  heroHeadline: "Professional Document Preparation, Formatting & Submission—Without the Stress.",
  heroSubtitle: "Porshure Green helps individuals, professionals, students, and businesses worldwide prepare polished, accurate, submission-ready documents with careful handling and dependable support.",
  contactPhone: "+1 (814) 791-5478",
  whatsappPhone: "+1 (814) 791-5478",
  contactEmail: "porshuregreen@gmail.com",
  footerDescription: "Professional document preparation, formatting and submission support for individuals, professionals and businesses worldwide.",
  announcement: "",
};

const contentInput = z.object({
  heroHeadline: z.string().trim().min(3).max(120),
  heroSubtitle: z.string().trim().min(10).max(500),
  contactPhone: z.string().trim().max(40),
  whatsappPhone: z.string().trim().max(40),
  contactEmail: z.string().trim().email().max(320),
  footerDescription: z.string().trim().min(10).max(300),
  announcement: z.string().trim().max(180),
});

export const contentRouter = createRouter({
  get: publicQuery.query(async () => {
    try {
      const db = getDb();
      const [row] = await db.select().from(siteContent).where(eq(siteContent.key, "site")).limit(1);
      const saved = row?.value ?? {};
      return {
        ...defaultSiteContent,
        ...saved,
        heroHeadline: saved.heroHeadline && saved.heroHeadline !== 'Organized with clarity' ? saved.heroHeadline : defaultSiteContent.heroHeadline,
        heroSubtitle: saved.heroSubtitle && !saved.heroSubtitle.startsWith('Premium document preparation, formatting, and submission services.') ? saved.heroSubtitle : defaultSiteContent.heroSubtitle,
        footerDescription: saved.footerDescription && !saved.footerDescription.startsWith('Secure document support, organized with clarity.') ? saved.footerDescription : defaultSiteContent.footerDescription,
        contactPhone: saved.contactPhone && saved.contactPhone.replace(/\D/g, "") !== "14155345986" ? saved.contactPhone : defaultSiteContent.contactPhone,
        whatsappPhone: saved.whatsappPhone && saved.whatsappPhone.replace(/\D/g, "") !== "14155345986" ? saved.whatsappPhone : defaultSiteContent.whatsappPhone,
        contactEmail: saved.contactEmail || defaultSiteContent.contactEmail,
      };
    } catch (error) {
      // The marketing site must still render if the database is unreachable,
      // unprovisioned, or mid-migration: fall back to the approved defaults.
      console.warn(
        "[content.get] falling back to default site content:",
        error instanceof Error ? error.message : error,
      );
      return defaultSiteContent;
    }
  }),
  update: adminQuery.input(contentInput).mutation(async ({ input }) => {
    const db = getDb();
    await db.insert(siteContent).values({ key: "site", value: input })
      .onConflictDoUpdate({ target: siteContent.key, set: { value: input, updatedAt: new Date() } });
    return { success: true, content: input };
  }),
});
