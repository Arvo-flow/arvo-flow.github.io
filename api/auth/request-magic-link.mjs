// api/auth/request-magic-link.mjs — User-facing magic link för inloggning.
// POST { email } → { ok: true }
// Rate-limit: max 1 e-post per 5 min per adress.
import { randomBytes } from 'node:crypto';
import { Resend } from 'resend';
import { getDb } from '../../lib/db.js';

const FROM     = process.env.RESEND_FROM      ?? 'Arvo Flow <analys@arvo-flow.se>';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://arvoflow.se';
const RATE_MS  = 5 * 60 * 1000; // 5 minuter

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
  } catch {
    return send(res, 400, { error: 'Ogiltig JSON' });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return send(res, 400, { error: 'Ogiltig e-postadress' });
  }

  const db = getDb();
  if (!db) return send(res, 200, { ok: true }); // soft fail — blockerar inte

  // Rate-limit: blocka om ett outgånget token skickades de senaste 5 min
  try {
    const recent = await db`
      SELECT id FROM magic_tokens
      WHERE email = ${email}
        AND created_at > NOW() - INTERVAL '5 minutes'
        AND used_at IS NULL
        AND expires_at > NOW()
      LIMIT 1
    `;
    if (recent.length > 0) {
      // Returnera 200 ändå — avslöja inte för angripare att adressen finns
      return send(res, 200, { ok: true });
    }
  } catch { /* non-fatal */ }

  const token     = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 24 * 3600 * 1000); // 24h
  const magicLink = `${BASE_URL}/testa-faktura?magic=${token}`;

  try {
    await db`
      INSERT INTO magic_tokens (token, email, note, expires_at)
      VALUES (${token}, ${email}, ${'user-self-service'}, ${expiresAt})
    `;
  } catch (err) {
    console.error('[auth/request-magic-link] DB-fel:', err.message);
    return send(res, 200, { ok: true }); // soft fail
  }

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from:    FROM,
        to:      email,
        subject: 'Din inloggningslänk till Arvo Flow',
        html: `
          <div style="font-family:-apple-system,Arial,sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;color:#0E1A17">
            <img src="https://arvoflow.se/logo.png" alt="Arvo Flow" style="height:30px;margin-bottom:32px" />
            <h2 style="font-size:22px;font-weight:800;margin:0 0 10px;letter-spacing:-0.02em">
              Klicka för att logga in
            </h2>
            <p style="color:#5C6E68;font-size:15px;line-height:1.6;margin:0 0 28px">
              Din Arvo Flow-länk är redo. Klicka nedan — ingen kod, inget lösenord.
            </p>
            <a href="${magicLink}"
               style="display:inline-block;padding:14px 32px;border-radius:100px;
                      background:linear-gradient(135deg,#5DD6CA 0%,#1B6E66 100%);
                      color:#fff;font-weight:700;font-size:15px;text-decoration:none;
                      letter-spacing:-0.01em">
              Logga in på Arvo Flow →
            </a>
            <p style="color:#9CA3AF;font-size:12px;margin:28px 0 0;line-height:1.5">
              Länken är giltig i 24 timmar och kan bara användas en gång.<br>
              Om du inte begärt den här länken kan du ignorera mejlet.
            </p>
          </div>
        `,
      });
    } catch (err) {
      console.warn('[auth/request-magic-link] E-post misslyckades (non-fatal):', err.message);
    }
  }

  return send(res, 200, { ok: true });
}
