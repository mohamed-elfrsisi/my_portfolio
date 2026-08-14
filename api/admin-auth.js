export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.ADMIN_PASSWORD) {
    return res
      .status(500)
      .json({ error: "Server is missing ADMIN_PASSWORD env var" });
  }

  const { password } = req.body || {};
  if (password && password === process.env.ADMIN_PASSWORD) {
    return res.status(200).json({ ok: true });
  }

  return res.status(401).json({ ok: false });
}
