// api/prospect.mjs
// GET  /api/prospect?token=XXX  — returns prospect briefing data (public magic link)
// POST /api/prospect?token=XXX  — records prospect action { action: 'upload'|'activate' }

import { getDb } from '../lib/db.js';
import { granskaLagradText } from '../lib/kundmeningar.js';
import { prospektAnkare } from '../lib/listprisankare.js';

export const config = { maxDuration: 10 };

/**
 * PROSPEKTET SOM DET SERVERAS (registergranskningen 2026-09-24). Kolumnen `estimates` bär profiler skrivna
 * av den gamla estimatorn — «sannolik premie», «typisk marknadskostnad», gissade abonnemang. De fryste vid
 * skrivning och får inte nå en ny läsare. Här passerar bara det som är avläst: Bolagsverket-raden, DNS-
 * fakta, och fynden som klarar registrets granskning. Listprisankaret räknas vid LÄSNING, så en utskickad
 * länk visar alltid dagens verifierade pris. Exporterad för KM-18.
 */
export function prospektSvar(lagrad) {
  const e = lagrad && typeof lagrad === 'object' ? lagrad : {};
  const fynd = Array.isArray(e.findings) ? e.findings.filter((f) => granskaLagradText(f).ren) : [];
  const business = e.business && granskaLagradText(e.business).ren ? e.business : null;
  return {
    ...(business ? { business } : {}),
    ...(e.foundedYear ? { foundedYear: e.foundedYear } : {}),
    ...(e.mxPlatform ? { mxPlatform: e.mxPlatform } : {}),
    ...(e.mxSince ? { mxSince: e.mxSince } : {}),
    ...(e.domainRegistered ? { domainRegistered: e.domainRegistered } : {}),
    ...(fynd.length ? { findings: fynd } : {}),
    ankare: prospektAnkare({ mxPlatform: e.mxPlatform ?? null }),
  };
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  const { token } = req.query ?? {};
  if (!token) return send(res, 400, { error: 'token required' });

  const db = getDb();

  if (req.method === 'GET') {
    if (!db) return send(res, 503, { error: 'db unavailable' });

    const [row] = await db`
      SELECT id, company_name, industry, segment, size_bucket, employees, estimates, created_at
      FROM outbound_prospects
      WHERE token = ${token}
      LIMIT 1
    `;

    if (!row) return send(res, 404, { error: 'not found' });

    // Record first open (idempotent)
    await db`
      UPDATE outbound_prospects
      SET opened_at = COALESCE(opened_at, now())
      WHERE token = ${token}
    `.catch(() => {});

    return send(res, 200, {
      ok: true,
      prospect: {
        companyName: row.company_name,
        industry:    row.industry,
        segment:     row.segment,
        sizeBucket:  row.size_bucket,
        employees:   row.employees,
        estimates:   prospektSvar(row.estimates),
        generatedAt: row.created_at,
      },
    });
  }

  if (req.method === 'POST') {
    const { action } = req.body ?? {};
    if (!['upload', 'activate', 'dismissed'].includes(action)) {
      return send(res, 400, { error: 'action must be upload | activate | dismissed' });
    }
    if (db) {
      await db`
        UPDATE outbound_prospects
        SET action = ${action}, action_at = COALESCE(action_at, now())
        WHERE token = ${token}
      `.catch(() => {});
    }
    return send(res, 200, { ok: true });
  }

  send(res, 405, { error: 'method not allowed' });
}
