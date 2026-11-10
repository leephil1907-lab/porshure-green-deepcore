import app from "./app.js";
import { env } from "./lib/env.js";

export default app;

// Traditional Node.js hosts need a listening HTTP server and local static
// file serving. Vercel imports api/vercel.ts instead, so no listener is
// started inside a serverless function.
if (env.isProduction && process.env.VERCEL !== "1") {
  const { serve } = await import("@hono/node-server");
  const { serveStaticFiles } = await import("./lib/vite.js");

  serveStaticFiles(app);

  const port = parseInt(process.env.PORT || "3000", 10);
  serve({ fetch: app.fetch, port }, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
