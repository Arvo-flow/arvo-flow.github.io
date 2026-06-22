// lib/session.js — varaktig, signerad session (det som gör magic-link till en RIKTIG inloggning).
//
// Magic-token lever 24h och är engångs. En session ska överleva det: efter att magic-token
// validerats utfärdar vi en HMAC-signerad token (e-post + utgång, default 90 dagar) som klienten
// bär. invoice-history verifierar SIGNATUREN (ingen DB-slagning som hinner gå ut) → e-post →
// e-postnycklad historik på vilken enhet som helst, tills man loggar ut.
//
// Beroendefritt (node:crypto HMAC, ingen JWT-lib). Kompakt format: base64url(payload).base64url(sig).
// Hemlighet: SESSION_SECRET, faller tillbaka på ARVO_ADMIN_SECRET. Saknas båda → ingen session
// utfärdas (degraderar gracefully till magic/fingerprint — aldrig en osignerad "session").

import { createHmac, timingSafeEqual } from 'node:crypto';

const SECRET = () => process.env.SESSION_SECRET || process.env.ARVO_ADMIN_SECRET || '';
const b64url = (buf) => Buffer.from(buf).toString('base64url');
const DAY_MS = 24 * 60 * 60 * 1000;

function sign(body, secret) {
  return b64url(createHmac('sha256', secret).update(body).digest());
}

export function issueSession(email, { days = 90, secret = SECRET() } = {}) {
  const e = (email ?? '').toString().trim().toLowerCase();
  if (!secret || !e) return null;
  const body = b64url(JSON.stringify({ e, exp: Date.now() + days * DAY_MS }));
  return `${body}.${sign(body, secret)}`;
}

export function verifySession(token, { secret = SECRET(), now = Date.now() } = {}) {
  if (!secret || !token || typeof token !== 'string') return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = sign(body, secret);
  const a = Buffer.from(sig), b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;     // signaturen måste stämma
  let payload;
  try { payload = JSON.parse(Buffer.from(body, 'base64url').toString()); } catch { return null; }
  if (!payload?.e || !payload?.exp || now > payload.exp) return null;   // utgången → ogiltig
  return { email: payload.e };
}
