// api/ingest/retry.mjs — POST: "Försök igen" på fallna fakturor för den inloggade identiteten.
// Återställer status='failed' → 'pending' så drain-cronen kör om dem (PDF:en hämtas på nytt ur Resend
// via email_id + bilage-index — inget nytt mejl behövs). Återhämtar transienta fel (kredit-slut, timeout).
//
// SÄKERHET: ägarskap krävs (varaktig session, färsk magic-token eller rumsnyckel) — du kan bara köra om
// DINA egna. Rummets egen adress (faktura+<nyckel>@) körs om med samma identitetsregel som rummet läser
// den: bevisad e-post, annars enheten (IA-13).
import { getDb } from '../../lib/db.js';
import { retryFailedBySender, retryFailedByFingerprint } from '../../lib/ingest-queue.js';
import { rumsIdentitet } from '../inkorgsadress.mjs';
import { rumsadressForLasning, adressFingeravtryck } from '../../lib/inkorgsadress.js';

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

async function emailFromMagic(token) {
  if (!token || typeof token !== 'string' || token.length < 32) return null;
  const db = getDb();
  if (!db) return null;
  try {
    const rows = await db`SELECT email FROM magic_tokens WHERE token = ${token} AND expires_at > NOW() LIMIT 1`;
    return rows[0]?.email ?? null;
  } catch { return null; }
}

export default async function handler(req, res, { db = getDb(), magicTillEpost = emailFromMagic } = {}) {
  if (req.method !== 'POST') return send(res, 405, { error: 'POST krävs' });

  let body;
  try { body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}'); }
  catch { return send(res, 400, { error: 'ogiltig JSON' }); }

  const id = await rumsIdentitet({ rumsnyckel: body.rumsnyckel, session: body.session, magic: body.magic }, { magicTillEpost });
  if (!id) return send(res, 401, { error: 'ägarskap krävs (session, magic eller rumsnyckel)' });

  let requeued = id.agareEpost ? await retryFailedBySender(id.agareEpost) : 0;
  const adress = db ? await rumsadressForLasning(db, id) : null;   // ett läsfel kastar (500) — aldrig «0 omköade»
  if (adress) requeued += await retryFailedByFingerprint(adressFingeravtryck(adress.nyckel), { db });
  return send(res, 200, { ok: true, requeued });
}
