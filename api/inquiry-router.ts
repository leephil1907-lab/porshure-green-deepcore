import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { inquiries } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const inquiryRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        fullName: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        serviceNeeded: z.string().optional(),
        message: z.string().min(1, "Message is required"),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(inquiries).values({
        fullName: input.fullName,
        email: input.email,
        serviceNeeded: input.serviceNeeded || null,
        message: input.message,
        status: "new",
      });
      return { success: true, id: Number(result[0].insertId) };
    }),

  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  }),

  updateStatus: publicQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "read", "replied", "archived"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(inquiries)
        .set({ status: input.status })
        .where(eq(inquiries.id, input.id));
      return { success: true };
    }),

  delete: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(inquiries).where(eq(inquiries.id, input.id));
      return { success: true };
    }),

  stats: publicQuery.query(async () => {
    const db = getDb();
    const all = await db.select().from(inquiries);
    return {
      total: all.length,
      new: all.filter((i) => i.status === "new").length,
      read: all.filter((i) => i.status === "read").length,
      replied: all.filter((i) => i.status === "replied").length,
      archived: all.filter((i) => i.status === "archived").length,
    };
  }),
});
