// Vercel executes this Hono application as a serverless function.
// Keep this entry point free of process listeners and filesystem-based
// static serving; Vercel serves the frontend assets from its CDN.
import app from "./app.js";

export default app;
