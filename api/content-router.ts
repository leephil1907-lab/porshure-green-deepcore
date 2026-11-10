import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { siteContent, type SiteContent } from "@db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const defaultSiteContent: SiteContent = {
  heroHeadline: "Organized with clarity",
  heroSubtitle: "Premium document preparation, formatting, and submission services. From paperwork to peace of mind — fast, confidential, and professional.",
  contactPhone: "+1 (814) 791-5478",
  whatsappPhone: "+1 (814) 791-5478",
  contactEmail: "porshuregreen@gmail.com",
  footerDescription: "Secure document support, organized with clarity. Professional preparation, formatting, and submission services you can trust.",
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
        contactPhone: saved.contactPhone || defaultSiteContent.contactPhone,
        whatsappPhone: saved.whatsappPhone || defaultSiteContent.whatsappPhone,
        contactEmail: saved.contactEmail || defaultSiteContent.contactEmail,
      };
    } catch (error) {
      if (error instanceof Error && error.message.includes("DATABASE_URL")) return defaultSiteContent;
      throw new TRPCError({ code: "SERVICE_UNAVAILABLE", message: "Website content is temporarily unavailable." });
    }
  }),
  update: adminQuery.input(contentInput).mutation(async ({ input }) => {
    const db = getDb();
    await db.insert(siteContent).values({ key: "site", value: input })
      .onConflictDoUpdate({ target: siteContent.key, set: { value: input, updatedAt: new Date() } });
    return { success: true, content: input };
  }),
});
