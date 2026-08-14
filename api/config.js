import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const CONFIG_KEY = "portfolio:config";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const stored = await redis.get(CONFIG_KEY);
      return res.status(200).json({ config: stored || null });
    } catch (err) {
      console.error("Failed to read config from KV:", err);
      // No KV configured yet (or a transient error) — the frontend
      // will fall back to the bundled config.ts in this case.
      return res.status(200).json({ config: null });
    }
  }

  if (req.method === "POST") {
    const password = req.headers["x-admin-password"];
    if (!process.env.ADMIN_PASSWORD) {
      return res
        .status(500)
        .json({ error: "Server is missing ADMIN_PASSWORD env var" });
    }
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const { config } = req.body || {};
      if (!config) {
        return res.status(400).json({ error: "Missing config in request body" });
      }
      await redis.set(CONFIG_KEY, config);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Failed to save config to KV:", err);
      return res.status(500).json({ error: "Failed to save config" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: "Method not allowed" });
}
