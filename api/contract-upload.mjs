// api/contract-upload.mjs — AVTALSUPPLADDNINGEN (C1): kundens avtal-PDF → AI läser datumfälten →
// koden accepterar (rimlighetsband) → villkorsboken/avtalet löser reglerna → kontraktsklockan
// räknar → contract_end_date uppdateras (SAMMA lagringsväg som api/save-contract — regel 1).
//
// POST { analysisId, pdfBase64, email? }
//  → { ok, clock: { currentPeriodEnd, deadline, daysToDeadline, renewals, status, regelKalla },
//      applied: { avtalsstart, avtalstidMan, uppsagningstidMan, forlangningMan }, citat }
//
// Ärlighetsgrindar (regel 4):
//  · isContract=false eller confidence < 0.7 → ok:false med skäl (aldrig en chansad tolkning)
//  · acceptansgrinden avvisar orimliga fält med skäl
//  · okända uppsägningsvillkor → ENDAST initial bindning lagras (faktum), aldrig gissad förnyelse
//  · 'expired' → ok:false ("avtalet har redan löpt ut") — vi lagrar aldrig ett passerat datum
import { getDb } from '../lib/db.js';
import { extractContract, ContractExtractError } from '../agents/contract/extract-contract.js';
import { acceptExtractedContract, resolveContractRules, computeContractOutcome, villkorForSupplier } from '../lib/contract-intel.js';

export const config = { maxDuration: 60 };

const MAX_PDF_BYTES = 6 * 1024 * 1024;
const MIN_CONFIDENCE = 0.7;

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Endast POST stöds' });

  let body;
  try {
    body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch { return send(res, 400, { error: 'Ogiltig JSON' }); }

  const { analysisId, pdfBase64, email } = body;
  if (!analysisId || typeof analysisId !== 'string') return send(res, 400, { error: 'analysisId saknas' });
  if (!pdfBase64 || typeof pdfBase64 !== 'string') return send(res, 400, { error: 'pdfBase64 saknas' });
  if (Buffer.byteLength(pdfBase64, 'base64') > MAX_PDF_BYTES) return send(res, 413, { error: 'PDF över 6 MB' });

  const db = getDb();
  if (!db) return send(res, 503, { error: 'DB ej konfigurerad' });

  // Analysraden (leverantören behövs för villkorsboken; raden måste finnas — analysisId är nyckeln,
  // samma kapabilitetsmodell som api/save-contract).
  let row;
  try {
    const rows = await db`
      SELECT id, supplier, normalized_supplier FROM invoice_analyses WHERE id = ${analysisId}::uuid LIMIT 1`;
    row = rows[0];
  } catch { return send(res, 400, { error: 'Ogiltigt analysisId' }); }
  if (!row) return send(res, 404, { error: 'Analysen hittades inte' });

  // 1 · AI läser (schema-tvingad) — fel här är ärliga fel, aldrig tysta.
  let extracted;
  try {
    extracted = await extractContract({ pdfBase64 });
  } catch (err) {
    const msg = err instanceof ContractExtractError ? err.message : 'Avtalet kunde inte läsas just nu';
    console.error('[contract-upload] extraktionsfel:', err.message);
    return send(res, 200, { ok: false, reason: msg });
  }

  if (!extracted.isContract) {
    return send(res, 200, { ok: false, reason: 'Dokumentet ser inte ut som ett avtal — ladda upp avtalet eller orderbekräftelsen (inte en faktura).' });
  }
  if (!(extracted.confidence >= MIN_CONFIDENCE)) {
    return send(res, 200, { ok: false, reason: 'Vi kunde inte läsa avtalsfälten med tillräcklig säkerhet — vi granskar hellre manuellt än gissar. Hör av er så tar vi det därifrån.' });
  }

  // 2 · Koden accepterar — orimliga fält stoppas med skäl.
  const accepted = acceptExtractedContract(extracted);
  if (!accepted.ok) {
    console.warn('[contract-upload] acceptans avvisade:', accepted.reason, JSON.stringify(extracted));
    return send(res, 200, { ok: false, reason: `Avtalsfälten klarade inte rimlighetskontrollen (${accepted.reason}). Vi granskar hellre manuellt än gissar.` });
  }

  // 3 · Reglerna löses upp: avtalets egna villkor vinner, villkorsboken täcker luckor.
  const villkor = villkorForSupplier(extracted.supplier || row.normalized_supplier || row.supplier);
  const rules = resolveContractRules(accepted.fields, villkor);

  // 4 · Klockan räknar (deterministiskt).
  const clock = computeContractOutcome(accepted.fields, rules);
  if (!clock) return send(res, 200, { ok: false, reason: 'Avtalstiden gick inte att beräkna ur de lästa fälten.' });
  if (clock.status === 'expired') {
    return send(res, 200, { ok: false, reason: `Avtalets bindning löpte ut ${clock.currentPeriodEnd} — det finns inget framtida datum att bevaka. Dela en färsk faktura så läser vi nuläget.` });
  }

  // 5 · Lagra — SAMMA väg som save-contract (regel 1): contract_end_date på analysraden.
  try {
    const cleanEmail = email ? String(email).trim().toLowerCase() : null;
    await db`
      UPDATE invoice_analyses
      SET contract_end_date = ${clock.currentPeriodEnd}::date,
          user_email = COALESCE(${cleanEmail}, user_email)
      WHERE id = ${analysisId}::uuid`;
  } catch (err) {
    console.error('[contract-upload] DB-fel:', err.message);
    return send(res, 500, { error: 'Kunde inte spara' });
  }

  console.log(`[contract-upload] ${row.supplier}: slut ${clock.currentPeriodEnd} · deadline ${clock.deadline ?? '–'} · regler: ${clock.regelKalla ?? 'okända'} · citat: ${JSON.stringify(extracted.citat)}`);
  return send(res, 200, { ok: true, clock, applied: accepted.fields, citat: extracted.citat ?? null });
}
