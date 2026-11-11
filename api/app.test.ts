import { describe, expect, it } from "vitest";
import app from "./app.js";

describe("API health endpoint", () => {
  it("returns a successful response without requiring database credentials", async () => {
    const response = await app.request("/api/health");

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      ok: true,
      service: "porshure-green-api",
    });
  });
});
