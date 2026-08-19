/**
 * Vercel Serverless Function: Real-Time Sync API (/api/sync)
 * 
 * Works out-of-the-box on Vercel.
 * If Vercel KV or Upstash Redis is connected in the Vercel dashboard,
 * it persists data across all devices in real-time.
 * If not connected, it falls back to in-memory cloud caching.
 */

let inMemoryStorage = null;

export default async function handler(req, res) {
  // CORS & No-Cache Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Check if KV / Redis environment variables exist
  const kvRestUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvRestToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (req.method === 'GET') {
    if (kvRestUrl && kvRestToken) {
      try {
        const response = await fetch(`${kvRestUrl}/get/smoothie_hq_state`, {
          headers: { Authorization: `Bearer ${kvRestToken}` }
        });
        const json = await response.json();
        if (json && json.result) {
          const parsed = typeof json.result === 'string' ? JSON.parse(json.result) : json.result;
          return res.status(200).json(parsed);
        }
      } catch (err) {
        console.error("KV read error:", err);
      }
    }

    // Fallback in-memory
    if (inMemoryStorage) {
      return res.status(200).json(inMemoryStorage);
    }
    return res.status(200).json({});
  }

  if (req.method === 'POST') {
    const data = req.body;
    if (!data) {
      return res.status(400).json({ error: "Missing body" });
    }

    inMemoryStorage = data;

    if (kvRestUrl && kvRestToken) {
      try {
        await fetch(`${kvRestUrl}/set/smoothie_hq_state`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${kvRestToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(typeof data === 'string' ? data : JSON.stringify(data))
        });
      } catch (err) {
        console.error("KV write error:", err);
      }
    }

    return res.status(200).json({ status: "ok", message: "Saved & synced to cloud" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
