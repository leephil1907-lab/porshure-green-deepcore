import { authRouter } from "./auth-router";
import { loginRouter } from "./login-router";
import { inquiryRouter } from "./inquiry-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  login: loginRouter,
  inquiry: inquiryRouter,
});

export type AppRouter = typeof appRouter;
