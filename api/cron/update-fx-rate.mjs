// api/cron/update-fx-rate.mjs
// Vercel Cron Job — kör dagligen kl 06:00 UTC.
// Hämtar live SEK/USD-kurs och sparar i Vercel KV så att
// recommend() alltid har en färsk kurs att läsa (< 1 ms KV-lookup).
//
// vercel.json: { "crons": [{ "path": "/api/cron/update-fx-rate", "schedule": "0 6 * * *" }] }

import { fetchLiveSekRate } from '../../agents/recommender/pricing.js';

export const config = { maxDuration: 15 };

export default async function handler(req, res) {
  // Vercel Cron skickar Authorization-header; blockera externa anrop.
  if (
    process.env.NODE_ENV === 'production' &&
    req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  try {
    const { kv } = await import('@vercel/kv');
    const result = await fetchLiveSekRate();

    await kv.set('fx:USD:SEK', {
      rate:      result.rate,
      source:    result.source,
      date:      result.date,
      fetchedAt: new Date().toISOString(),
    });

    console.log(`[cron/update-fx-rate] SEK/USD = ${result.rate} (${result.source}, ${result.date})`);
    return res.status(200).json({ ok: true, rate: result.rate, source: result.source });
  } catch (err) {
    console.error('[cron/update-fx-rate] Fel:', err.message);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
