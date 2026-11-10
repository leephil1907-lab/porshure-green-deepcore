import { authRouter } from "./auth-router.js";
import { loginRouter } from "./login-router.js";
import { inquiryRouter } from "./inquiry-router.js";
import { contentRouter } from "./content-router.js";
import { createRouter, publicQuery } from "./middleware.js";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  login: loginRouter,
  inquiry: inquiryRouter,
  content: contentRouter,
});

export type AppRouter = typeof appRouter;
