// api/cron/update-fx-rate.mjs
// Vercel Cron Job — kör dagligen kl 06:00 UTC.
// Hämtar live SEK/USD och SEK/EUR och sparar i Vercel KV.
//
// vercel.json: { "crons": [{ "path": "/api/cron/update-fx-rate", "schedule": "0 6 * * *" }] }

import { fetchLiveSekRate, fetchLiveEurSekRate } from '../../agents/recommender/pricing.js';

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
    const [usd, eur] = await Promise.all([fetchLiveSekRate(), fetchLiveEurSekRate()]);

    await Promise.all([
      kv.set('fx:USD:SEK', { rate: usd.rate, source: usd.source, date: usd.date, fetchedAt: new Date().toISOString() }),
      kv.set('fx:EUR:SEK', { rate: eur.rate, source: eur.source, date: eur.date, fetchedAt: new Date().toISOString() }),
    ]);

    console.log(`[cron/update-fx-rate] SEK/USD = ${usd.rate} (${usd.source})  SEK/EUR = ${eur.rate} (${eur.source})`);
    return res.status(200).json({ ok: true, usd: usd.rate, eur: eur.rate });
  } catch (err) {
    console.error('[cron/update-fx-rate] Fel:', err.message);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
