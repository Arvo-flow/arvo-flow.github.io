// api/kontor-ingest.mjs — POST /api/kontor-ingest
// Direkt-uppladdning från kontorets intagsdisk (intelligensintaget).
// Samma pipeline som mail-in (regel 1): internt anrop till /api/test-invoice
// med bypass-secret, nycklat på kundens e-post. Ägarskap bevisas med magic
// token (samma modell som invoice-history) — utan giltig token, ingen bypass.
import { createHash } from 'node:crypto';
import { getDb } from '../lib/db.js';

export const config = { maxDuration: 60 };

const BASE_URL = process.env.ARVO_BASE_URL ?? 'https://arvoflow.se';
const sha16 = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);
const MAX_PDF_BYTES = 6 * 1024 * 1024;

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
  if (req.method !== 'POST') return send(res, 405, { error: 'Endast POST stöds' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const { pdfBase64, magic, fingerprint } = body ?? {};

  if (!pdfBase64 || typeof pdfBase64 !== 'string') {
    return send(res, 400, { error: 'pdfBase64 krävs' });
  }
  if (Buffer.byteLength(pdfBase64, 'base64') > MAX_PDF_BYTES) {
    return send(res, 413, { error: 'Filen är större än 6 MB — ladda upp en mindre version.' });
  }

  // Ägarskapsbevis: magic token → e-post. Utan giltig token ges ingen bypass
  // (annars vore detta en öppen kringgång av sparkvoten).
  const email = await emailFromMagic(magic);
  if (!email) {
    return send(res, 401, { error: 'Öppna kontoret via länken i ert mejl för att ladda upp direkt — eller vidarebefordra fakturan till faktura@inbox.arvoflow.se.', needsMagic: true });
  }

  try {
    const r = await fetch(`${BASE_URL}/api/test-invoice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pdfBase64,
        industry:    'ovrigt',          // okänd vid intag — förfinas i kontoret
        employees:   10,
        bypass:      process.env.ARVO_BYPASS_SECRET,
        email,
        userEmail:   email,
        fingerprint: fingerprint || `kontor:${sha16(email)}`,
      }),
    });
    const a = await r.json().catch(() => null);
    if (!a || !a.route) {
      return send(res, 502, { ok: false, error: a?.error ?? 'Analysen misslyckades — försök igen.' });
    }
    return send(res, 200, {
      ok: true,
      route: a.route,
      supplier: a.extracted?.supplier ?? null,
      category: a.categorized?.category ?? null,
      netSaving: a.recommendation?.netSaving ?? null,
    });
  } catch (err) {
    console.error('[kontor-ingest] failed:', err.message);
    return send(res, 500, { ok: false, error: 'Kunde inte analysera just nu — försök igen om en stund.' });
  }
}
