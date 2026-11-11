import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { inquiries } from "../db/schema.js";
import { eq, desc } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

function toTrpcError(err: unknown): TRPCError {
  if (err instanceof Error && err.message.includes("DATABASE_URL")) {
    return new TRPCError({
      code: "SERVICE_UNAVAILABLE",
      message:
        "This form isn't connected to a database yet. Please reach out via WhatsApp or email in the meantime.",
    });
  }
  return new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
}

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
      try {
        const db = getDb();
        const [row] = await db
          .insert(inquiries)
          .values({
            fullName: input.fullName,
            email: input.email,
            serviceNeeded: input.serviceNeeded || null,
            message: input.message,
            status: "new",
          })
          .returning({ id: inquiries.id });
        return { success: true, id: row.id };
      } catch (err) {
        throw toTrpcError(err);
      }
    }),

  list: adminQuery.query(async () => {
    try {
      const db = getDb();
      return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
    } catch (err) {
      throw toTrpcError(err);
    }
  }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "read", "replied", "archived"]),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const db = getDb();
        await db.update(inquiries).set({ status: input.status }).where(eq(inquiries.id, input.id));
        return { success: true };
      } catch (err) {
        throw toTrpcError(err);
      }
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      try {
        const db = getDb();
        await db.delete(inquiries).where(eq(inquiries.id, input.id));
        return { success: true };
      } catch (err) {
        throw toTrpcError(err);
      }
    }),

  stats: adminQuery.query(async () => {
    try {
      const db = getDb();
      const all = await db.select().from(inquiries);
      return {
        total: all.length,
        new: all.filter((i) => i.status === "new").length,
        read: all.filter((i) => i.status === "read").length,
        replied: all.filter((i) => i.status === "replied").length,
        archived: all.filter((i) => i.status === "archived").length,
      };
    } catch (err) {
      throw toTrpcError(err);
    }
  }),
});
