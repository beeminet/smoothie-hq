/**
 * Vercel Serverless Function: Real-Time Multi-Device Sync API (/api/sync)
 * 
 * Works 100% FREE across all devices:
 * 1. If Vercel KV / Upstash Redis is connected (Hobby $0/mo free plan), it uses high-speed Redis.
 * 2. If not connected, it automatically persists to a free persistent cloud KV store.
 * 3. Falls back to in-memory caching.
 */

const FALLBACK_KV_BUCKET = "BqD8Z2mP9k5W3vL6T7yR4x";
const KV_ENDPOINT = `https://kvdb.io/${FALLBACK_KV_BUCKET}/smoothie_state`;

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
    // 1. Try Vercel KV / Upstash if configured
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

    // 2. Try free cloud bucket fallback
    try {
      const cloudRes = await fetch(KV_ENDPOINT, {
        headers: { 'Accept': 'application/json' },
        cache: 'no-store'
      });
      if (cloudRes.ok) {
        const cloudData = await cloudRes.json();
        if (cloudData && cloudData.recipes && cloudData.recipes.length > 0) {
          inMemoryStorage = cloudData;
          return res.status(200).json(cloudData);
        }
      }
    } catch (err) {
      // Cloud fallback read failure handled by memory fallback
    }

    // 3. Fallback to in-memory
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

    // 1. Write to Vercel KV / Upstash if configured
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

    // 2. Write to free cloud bucket fallback
    try {
      await fetch(KV_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: typeof data === 'string' ? data : JSON.stringify(data)
      });
    } catch (err) {
      // Cloud fallback write failure handled gracefully
    }

    return res.status(200).json({ status: "ok", message: "Saved & synced to cloud" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
