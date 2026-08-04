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
      // Hela svep-kalendern: en tom natt = svepet nådde aldrig databasen (t.ex. 402 kvot).
      const all = await db`SELECT to_char(swept_at, 'YYYY-MM-DD') AS d FROM vakt_events
                           WHERE event_type = 'sweep' ORDER BY swept_at ASC`;
      console.log('svep-kalender:', all.map((x) => x.d).join(' '));
    }
    // Kvotdiagnos: svarar beräkningen alls, och vad säger servern om sig själv?
    try {
      const v = await db`SELECT now() AS nu, version() AS v`;
      console.log('DB svarar NU:', v[0]?.nu, '·', String(v[0]?.v).slice(0, 60));
    } catch (e) { console.log('DB SVARAR INTE:', e.message);
    }
  } catch (e) { console.log('FRÅGE-FEL:', e.message); }
}
console.log('getLatestSweep() →', JSON.stringify(await getLatestSweep()));
