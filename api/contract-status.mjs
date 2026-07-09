// api/contract-status.mjs — KVITTERINGEN av ett avtalsfönster (grundardesign 2026-07-09).
//
// POST { analysisId, action: 'uppsagd' | 'stannar' | 'angra' }
//
// Principen: kvitteringen är en ÖVERLÄMNING till vakten, aldrig en mute.
//   'uppsagd' — kundens PÅSTÅENDE att avtalet är uppsagt. Servern beräknar utträdesdatumet
//               deterministiskt ur den färska klockan (aldrig klientens ord för ett datum);
//               klockan blir nedräkning, deadline-mejlen tystnar, om-vakten armeras
//               (invoice-history larmar om leverantören fakturerar efter utträdet).
//   'stannar' — medvetet val att behålla DENNA period. Nycklas på exakt den deadline som
//               kvitteras — nästa period varnar av sig själv igen. Vakten stängs aldrig av.
//   'angra'   — tar bort registreringen; klockan återgår till rått läge.
//
// Kapabilitetsmodell som save-contract/contract-upload: analysisId är nyckeln.

import { getDb } from '../lib/db.js';
import { buildAvtalView } from '../lib/contract-intel.js';

export const config = { maxDuration: 15 };

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
  const db = getDb();
  if (!db) return send(res, 500, { error: 'Ingen databas' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const { analysisId, action } = body ?? {};
  if (!analysisId || !['uppsagd', 'stannar', 'angra'].includes(action)) {
    return send(res, 400, { error: 'analysisId och action (uppsagd|stannar|angra) krävs' });
  }

  let row;
  try {
    const rows = await db`
      SELECT id, contract_terms_json FROM invoice_analyses WHERE id = ${analysisId}::uuid LIMIT 1`;
    row = rows[0];
  } catch { return send(res, 400, { error: 'Ogiltigt analysisId' }); }
  if (!row) return send(res, 404, { error: 'Analysen hittades inte' });
  if (!row.contract_terms_json) return send(res, 400, { error: 'Inget läst avtal på det här innehavet — ladda upp avtalet först.' });

  const terms = row.contract_terms_json;
  const raw = buildAvtalView({ ...terms, kundStatus: null });   // färsk RÅ klocka — serverns sanning
  if (!raw) return send(res, 400, { error: 'Avtalstermerna gick inte att räkna på.' });

  let newStatus = null;
  let newEndDate = null;

  if (action === 'uppsagd') {
    // Meningsfullt när det finns ett utträde att räkna: öppet fönster (utträde = periodslut)
    // eller tills vidare/rullande (utträde = tidigast möjliga). Redan utlöpt → inget att säga upp.
    if (!['window-open', 'rolling'].includes(raw.clock.status)) {
      return send(res, 200, { ok: false, reason: `Avtalet är i läget "${raw.clock.status}" — det finns inget öppet utträde att kvittera just nu.` });
    }
    newStatus = {
      typ: 'uppsagd',
      deadline: raw.clock.deadline ?? null,
      exitDate: raw.clock.currentPeriodEnd,     // SERVERNS deterministiska datum
      registrerad: new Date().toISOString(),
    };
    newEndDate = raw.clock.currentPeriodEnd;
  }

  if (action === 'stannar') {
    if (raw.clock.status !== 'window-open' || !raw.clock.deadline) {
      return send(res, 200, { ok: false, reason: 'Det finns inget öppet fönster att kvittera — larmet är redan tyst.' });
    }
    newStatus = { typ: 'stannar', deadline: raw.clock.deadline, registrerad: new Date().toISOString() };
    // Att stanna binder genom NÄSTA period — bevakningsdatumet följer med (deterministiskt).
    newEndDate = raw.nastaPeriodSlut ?? raw.clock.currentPeriodEnd;
  }

  if (action === 'angra') {
    newStatus = null;
    newEndDate = raw.clock.currentPeriodEnd;   // tillbaka till råa klockans sanning
  }

  const newTerms = { ...terms, kundStatus: newStatus };
  try {
    await db`
      UPDATE invoice_analyses
      SET contract_terms_json = ${JSON.stringify(newTerms)}::jsonb,
          contract_end_date = ${newEndDate}::date
      WHERE id = ${analysisId}::uuid`;
  } catch (err) {
    console.error('[contract-status] DB-fel:', err.message);
    return send(res, 500, { error: 'Kunde inte spara' });
  }

  const avtal = buildAvtalView(newTerms);
  console.log(`[contract-status] ${analysisId}: ${action} → status ${avtal?.clock?.status} · slut ${avtal?.clock?.currentPeriodEnd}`);
  return send(res, 200, { ok: true, avtal });
}
