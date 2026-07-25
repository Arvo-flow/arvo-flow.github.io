// scripts/probe-vakt.mjs — DIAGNOS: har vakt_events verkliga svep? (driver landningssidans puls)
import { getDb } from '../lib/db.js';
import { getLatestSweep } from '../lib/vakt.js';

const db = getDb();
console.log('DB-anslutning:', db ? 'JA' : 'NEJ (DATABASE_URL saknas)');
if (db) {
  try {
    const t = await db`SELECT to_regclass('public.vakt_events') AS finns`;
    console.log('vakt_events-tabell:', t[0]?.finns ?? 'SAKNAS');
    if (t[0]?.finns) {
      const c = await db`SELECT event_type, COUNT(*)::int AS n, MAX(swept_at) AS senast
                         FROM vakt_events GROUP BY event_type`;
      console.log('rader per typ:', JSON.stringify(c));
      const r = await db`SELECT swept_at, sources, price_points, changes FROM vakt_events
                         ORDER BY swept_at DESC LIMIT 3`;
      console.log('senaste 3:', JSON.stringify(r));
    }
  } catch (e) { console.log('FRÅGE-FEL:', e.message); }
}
console.log('getLatestSweep() →', JSON.stringify(await getLatestSweep()));
