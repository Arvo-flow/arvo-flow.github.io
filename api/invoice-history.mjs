// api/invoice-history.mjs — GET /api/invoice-history?fingerprint=<fp>[&magic=<token>]
// Returnerar de senaste analyserna för en browser-fingerprint, och/eller —
// när en giltig magic token medföljer — analyserna nycklade på tokenets e-post.
//
// SÄKERHET: e-postnycklad historik kräver tokenbevis. Klienten får ALDRIG
// fråga på rå e-postadress — tokenet (levererat till kundens inkorg) är
// ägarskapsbeviset. Tokens accepteras inom expiry även om de förbrukats
// för inloggning (AuthContext konsumerar dem vid sidladdning).
import { getAnalysesByFingerprint, getAnalysesByEmail } from '../lib/invoice-store.js';
import { getDb } from '../lib/db.js';

export const config = { maxDuration: 10 };

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
    const rows = await db`
      SELECT email FROM magic_tokens
      WHERE token = ${token} AND expires_at > NOW()
      LIMIT 1
    `;
    return rows[0]?.email ?? null;
  } catch { return null; }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return send(res, 405, { error: 'Endast GET stöds' });

  const fp    = req.query?.fingerprint;
  const magic = req.query?.magic;

  const hasFp = typeof fp === 'string' && fp.length >= 8;
  if (!hasFp && !magic) {
    return send(res, 400, { error: 'fingerprint (minst 8 tecken) eller magic krävs' });
  }

  const email = await emailFromMagic(magic);

  const [byFp, byEmail] = await Promise.all([
    hasFp ? getAnalysesByFingerprint(fp) : [],
    email ? getAnalysesByEmail(email)    : [],
  ]);

  // Slå ihop + dedupa (samma analys kan ha både fingerprint och user_email)
  const seen = new Set();
  const analyses = [...byEmail, ...byFp]
    .filter((a) => (seen.has(a.id) ? false : seen.add(a.id)))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return send(res, 200, { ok: true, analyses, email: email ?? undefined });
}
