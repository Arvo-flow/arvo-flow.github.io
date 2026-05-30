// api/admin/magic-link.mjs — Genererar magic links för demo-åtkomst.
// POST { email, note?, expiresInHours? } → { ok, link }
import { randomBytes } from 'node:crypto';
import { Resend } from 'resend';
import { getDb } from '../../lib/db.js';

const FROM    = process.env.RESEND_FROM      ?? 'Arvo Flow <analys@arvo-flow.se>';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://arvoflow.se';

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Endast POST stöds' });

  const adminToken = req.headers['x-admin-token'];
  if (!adminToken || adminToken !== process.env.ADMIN_TOKEN) {
    return send(res, 401, { error: 'Ej behörig' });
  }

  let body;
  try {
    body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch {
    return send(res, 400, { error: 'Ogiltig JSON' });
  }

  const { email, note, expiresInHours = 72 } = body;
  if (!email || !email.includes('@')) return send(res, 400, { error: 'Ogiltig e-post' });

  const token      = randomBytes(32).toString('hex');
  const expiresAt  = new Date(Date.now() + expiresInHours * 3600 * 1000);
  const magicLink  = `${BASE_URL}/testa-faktura?magic=${token}`;

  const db = getDb();
  if (!db) return send(res, 503, { error: 'DB ej konfigurerad' });

  try {
    await db`
      CREATE TABLE IF NOT EXISTS magic_tokens (
        id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        token      TEXT NOT NULL UNIQUE,
        email      TEXT NOT NULL,
        note       TEXT,
        used_at    TIMESTAMPTZ,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await db`
      INSERT INTO magic_tokens (token, email, note, expires_at)
      VALUES (${token}, ${email.trim().toLowerCase()}, ${note ?? null}, ${expiresAt})
    `;
  } catch (err) {
    return send(res, 500, { error: 'DB-fel: ' + err.message });
  }

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from:    FROM,
        to:      email,
        subject: 'Din demo-länk till Arvo Flow',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
            <img src="https://arvoflow.se/logo.png" alt="Arvo Flow" style="height:32px;margin-bottom:24px" />
            <h2 style="font-size:22px;font-weight:800;color:#0E1A17;margin:0 0 12px">
              Din personliga demo-länk
            </h2>
            <p style="color:#5C6E68;font-size:15px;line-height:1.6;margin:0 0 24px">
              Klicka på länken nedan för att analysera era fakturor direkt —
              ingen registrering krävs.
            </p>
            <a href="${magicLink}"
               style="display:inline-block;padding:14px 28px;border-radius:100px;
                      background:linear-gradient(135deg,#5DD6CA,#1B6E66);
                      color:#fff;font-weight:700;font-size:15px;text-decoration:none">
              Öppna Arvo Flow →
            </a>
            <p style="color:#9CA3AF;font-size:12px;margin:24px 0 0">
              Länken är giltig i ${expiresInHours} timmar.
            </p>
          </div>
        `,
      });
    } catch (err) {
      console.warn('[magic-link] E-post misslyckades (non-fatal):', err.message);
    }
  }

  return send(res, 200, { ok: true, link: magicLink, expiresAt });
}
