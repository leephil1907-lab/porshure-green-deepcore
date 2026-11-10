// Vercel's Node runtime expects a Node.js request/response handler.
// Adapt Hono's Fetch-based app through the official Node server adapter.
// Static assets remain served by Vercel's CDN via vercel.json routes.
import { getRequestListener } from "@hono/node-server";
import app from "./app.js";

export default getRequestListener(app.fetch);
