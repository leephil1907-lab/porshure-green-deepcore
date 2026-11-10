import { authRouter } from "./auth-router";
import { loginRouter } from "./login-router";
import { inquiryRouter } from "./inquiry-router";
import { contentRouter } from "./content-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  login: loginRouter,
  inquiry: inquiryRouter,
  content: contentRouter,
});

export type AppRouter = typeof appRouter;
