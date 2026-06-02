// api/auth/outlook-callback.mjs
// GET ?code=...&state=<email>&error=...
// Byter auth-kod mot tokens, lagrar i DB, söker inkorg, skickar bekräftelsemail.
// Kräver env: MICROSOFT_CLIENT_ID, MICROSOFT_CLIENT_SECRET, MICROSOFT_TENANT_ID, MICROSOFT_REDIRECT_URI

import { Resend } from 'resend';
import { getDb } from '../../lib/db.js';

export const config = { maxDuration: 30 };

const resend   = new Resend(process.env.RESEND_API_KEY);
const FROM     = process.env.RESEND_FROM         ?? 'Arvo Intelligence <analys@arvo-flow.se>';
const INTERNAL = process.env.ARVO_INTERNAL_EMAIL ?? 'hej@arvo-flow.se';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://arvoflow.se';

function redirect(res, path) {
  res.writeHead(302, { Location: `${BASE_URL}${path}` });
  res.end();
}

async function outlookSearch(accessToken, maxResults = 10) {
  const filter = encodeURIComponent(
    "hasAttachments eq true and (contains(subject,'faktura') or contains(subject,'invoice') or contains(subject,'räkning'))"
  );
  const res = await fetch(
    `https://graph.microsoft.com/v1.0/me/messages?$filter=${filter}&$top=${maxResults}&$select=id,subject`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.value ?? [];
}

export default async function handler(req, res) {
  const { code, state: stateEmail, error } = req.query ?? {};

  if (error) {
    return redirect(res, `/testa-faktura?oauth_error=${encodeURIComponent(error)}&provider=outlook`);
  }
  if (!code) {
    return redirect(res, '/testa-faktura?oauth_error=no_code&provider=outlook');
  }

  const clientId     = process.env.MICROSOFT_CLIENT_ID;
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET;
  const tenantId     = process.env.MICROSOFT_TENANT_ID ?? 'common';
  const redirectUri  = process.env.MICROSOFT_REDIRECT_URI ?? `${BASE_URL}/api/auth/outlook-callback`;

  if (!clientId || !clientSecret) {
    return redirect(res, '/testa-faktura?oauth_pending=outlook');
  }

  // ── Token exchange ────────────────────────────────────────────────────────
  let accessToken, refreshToken, expiresIn;
  try {
    const tokenRes = await fetch(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id:     clientId,
          client_secret: clientSecret,
          redirect_uri:  redirectUri,
          grant_type:    'authorization_code',
        }),
      }
    );
    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      console.error('[outlook-callback] Token exchange failed:', err);
      return redirect(res, '/testa-faktura?oauth_error=token_exchange&provider=outlook');
    }
    const tokens = await tokenRes.json();
    accessToken  = tokens.access_token;
    refreshToken = tokens.refresh_token ?? null;
    expiresIn    = tokens.expires_in ?? 3600;
  } catch (err) {
    console.error('[outlook-callback] Token fetch error:', err.message);
    return redirect(res, '/testa-faktura?oauth_error=network&provider=outlook');
  }

  // ── Get user email ────────────────────────────────────────────────────────
  let userEmail = stateEmail || null;
  try {
    const meRes = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (meRes.ok) {
      const me = await meRes.json();
      userEmail = me.mail ?? me.userPrincipalName ?? userEmail;
    }
  } catch {
    // Non-critical — fall back to state email
  }

  // ── Store connection in DB ────────────────────────────────────────────────
  const db = getDb();
  let connectionId = null;
  if (db) {
    try {
      await db`
        CREATE TABLE IF NOT EXISTS oauth_connections (
          id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
          email         TEXT        NOT NULL,
          provider      TEXT        NOT NULL,
          access_token  TEXT        NOT NULL,
          refresh_token TEXT,
          token_expiry  TIMESTAMPTZ,
          scope         TEXT,
          created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          UNIQUE (email, provider)
        )
      `;
      const tokenExpiry = new Date(Date.now() + expiresIn * 1000).toISOString();
      const rows = await db`
        INSERT INTO oauth_connections (email, provider, access_token, refresh_token, token_expiry, scope)
        VALUES (
          ${userEmail ?? 'unknown'},
          'outlook',
          ${accessToken},
          ${refreshToken},
          ${tokenExpiry},
          'https://graph.microsoft.com/Mail.Read'
        )
        ON CONFLICT (email, provider) DO UPDATE
          SET access_token  = EXCLUDED.access_token,
              refresh_token = COALESCE(EXCLUDED.refresh_token, oauth_connections.refresh_token),
              token_expiry  = EXCLUDED.token_expiry,
              updated_at    = NOW()
        RETURNING id
      `;
      connectionId = rows[0]?.id ?? null;
    } catch (err) {
      console.error('[outlook-callback] DB error:', err.message);
    }
  }

  // ── Search Outlook for invoice emails ─────────────────────────────────────
  let invoiceCount = 0;
  try {
    const messages = await outlookSearch(accessToken, 20);
    invoiceCount = messages.length;
  } catch (err) {
    console.error('[outlook-callback] Outlook search error:', err.message);
  }

  // ── Send confirmation email ───────────────────────────────────────────────
  if (userEmail) {
    const dateStr = new Date().toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });
    const countText = invoiceCount > 0
      ? `Vi hittade <strong>${invoiceCount} leverantörsfakturor</strong> i er inkorg.`
      : 'Vi har kopplat er Outlook-inkorg.';

    const html = `<!DOCTYPE html>
<html lang="sv"><head><meta charset="utf-8"><title>Arvo Intelligence aktiverat</title></head>
<body style="margin:0;padding:0;background:#F2F7F6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 20px 60px;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background:#fff;border-radius:20px;overflow:hidden;border:1px solid #D5E2DC;">
<tr><td height="3" style="background:#1B7A6E;font-size:0;">&nbsp;</td></tr>
<tr><td style="padding:24px 36px 20px;border-bottom:1px solid #EEF4F2;">
  <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.2em;color:#1B7A6E;">&#9679; Arvo Intelligence</span>
  <span style="float:right;font-size:11px;color:#8A9E98;">${dateStr}</span>
</td></tr>
<tr><td style="padding:32px 36px 28px;border-bottom:1px solid #EEF4F2;">
  <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#1B7A6E;margin:0 0 12px;">Outlook kopplat</p>
  <h1 style="font-size:26px;font-weight:800;color:#0E1A17;margin:0 0 14px;letter-spacing:-.025em;line-height:1.2;">Arvo bevakar nu er inkorg.</h1>
  <p style="font-size:14.5px;color:#3D5249;line-height:1.7;margin:0 0 10px;">${countText}</p>
  <p style="font-size:14px;color:#5C6E68;line-height:1.7;margin:0;">Er fullst&auml;ndiga Intelligence-briefing med samtliga leverant&ouml;rsanalyser skickas inom kort.</p>
</td></tr>
<tr><td style="padding:24px 36px;">
  <p style="font-size:12px;color:#8A9E98;text-align:center;margin:0;line-height:1.6;">
    Arvo l&auml;ser bara faktura-mail &mdash; aldrig personlig korrespondens.<br>
    Arvo Flow &middot; arvoflow.se &middot; hej@arvoflow.se
  </p>
</td></tr>
</table></td></tr></table>
</body></html>`;

    try {
      await resend.emails.send({
        from: FROM,
        to: userEmail,
        subject: 'Arvo Intelligence aktiverat — Outlook kopplat',
        html,
      });
    } catch (err) {
      console.error('[outlook-callback] Confirmation email failed:', err.message);
    }
  }

  // ── Internal notification ─────────────────────────────────────────────────
  try {
    await resend.emails.send({
      from: FROM,
      to: INTERNAL,
      subject: `[Outlook kopplat] ${userEmail ?? 'okänd'} — ${invoiceCount} fakturor hittade`,
      html: `<p style="font-family:sans-serif;font-size:14px;line-height:1.6;">
        <b>E-post:</b> ${userEmail ?? '–'}<br>
        <b>Fakturor hittade:</b> ${invoiceCount}<br>
        <b>Connection ID:</b> ${connectionId ?? '–'}<br>
        <b>Åtgärd:</b> Kör manuell analys via /api/intelligence/process-inbox
      </p>`,
    });
  } catch {
    // Non-critical
  }

  // ── Redirect to success ───────────────────────────────────────────────────
  const params = new URLSearchParams({ intelligence_connected: 'outlook' });
  if (invoiceCount > 0) params.set('invoices', String(invoiceCount));
  if (userEmail) params.set('email', userEmail);
  redirect(res, `/testa-faktura?${params}`);
}
