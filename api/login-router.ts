import { z } from "zod";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { createRouter, publicQuery } from "./middleware";
import { ADMIN_EMAIL, ADMIN_PASSWORD_HASH, ADMIN_JWT_SECRET, ADMIN_TOKEN_COOKIE } from "./admin-config";
import { TRPCError } from "@trpc/server";

export const loginRouter = createRouter({
  login: publicQuery
    .input(
      z.object({
        email: z.string().email("Valid email required"),
        password: z.string().min(1, "Password required"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH || ADMIN_JWT_SECRET.length < 32) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Administrator authentication is not configured." });
      }
      if (input.email !== ADMIN_EMAIL) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
      }

      const valid = await bcrypt.compare(input.password, ADMIN_PASSWORD_HASH);
      if (!valid) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
      }

      const token = await new SignJWT({ email: input.email, role: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(ADMIN_JWT_SECRET);

      // Set HTTP-only cookie
      ctx.resHeaders.append(
        "set-cookie",
        `${ADMIN_TOKEN_COOKIE}=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax${
          process.env.NODE_ENV === "production" ? "; Secure" : ""
        }`
      );

      return { success: true };
    }),

  me: publicQuery.query(async ({ ctx }) => {
    // Try cookie first
    const cookie = ctx.req.headers.get("cookie") || "";
    const cookieMatch = cookie.match(new RegExp(`${ADMIN_TOKEN_COOKIE}=([^;]+)`));
    let token = cookieMatch ? cookieMatch[1] : null;

    if (!token || ADMIN_JWT_SECRET.length < 32) return null;

    try {
      const { payload } = await jwtVerify(token, ADMIN_JWT_SECRET, { clockTolerance: 60 });
      if (payload.role !== "admin" || payload.email !== ADMIN_EMAIL) return null;
      return { email: payload.email as string, role: payload.role as string };
    } catch {
      return null;
    }
  }),

  logout: publicQuery.mutation(async ({ ctx }) => {
    ctx.resHeaders.append(
      "set-cookie",
      `${ADMIN_TOKEN_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`
    );
    return { success: true };
  }),
});
