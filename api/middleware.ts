import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";
import { jwtVerify } from "jose";
import { ADMIN_JWT_SECRET, ADMIN_TOKEN_COOKIE } from "./admin-config";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const createRouter = t.router;
export const publicQuery = t.procedure;

// Admin auth middleware — checks for admin JWT token in cookie or Authorization header
const requireAdmin = t.middleware(async (opts) => {
  const { ctx } = opts;

  // Try cookie first
  const cookie = ctx.req.headers.get("cookie") || "";
  const cookieMatch = cookie.match(new RegExp(`${ADMIN_TOKEN_COOKIE}=([^;]+)`));
  let token = cookieMatch ? cookieMatch[1] : null;

  // Fallback to Authorization header
  if (!token) {
    const authHeader = ctx.req.headers.get("authorization") || "";
    const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/);
    token = bearerMatch ? bearerMatch[1] : null;
  }

  if (!token) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Admin login required" });
  }

  try {
    const { payload } = await jwtVerify(token, ADMIN_JWT_SECRET, { clockTolerance: 60 });
    if (payload.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
    }
    return opts.next({ ctx: { ...ctx, admin: payload } });
  } catch {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid or expired session" });
  }
});

export const adminQuery = t.procedure.use(requireAdmin);
