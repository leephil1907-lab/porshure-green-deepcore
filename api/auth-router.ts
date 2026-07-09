import { createRouter, publicQuery } from "./middleware";

export const authRouter = createRouter({
  me: publicQuery.query(() => ({ name: "Admin", role: "admin" })),
  logout: publicQuery.mutation(() => ({ success: true })),
});
