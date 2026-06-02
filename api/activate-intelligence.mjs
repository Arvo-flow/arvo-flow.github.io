// api/activate-intelligence.mjs
// POST { email, supplier, category, annualCost, suggestedAnnualCost, netSaving,
//        arvoFee, reasoning, diagScore, diagLabel, diagInsight }
// Stores activation intent in Postgres + fires first Intelligence briefing via Resend.

import { Resend } from 'resend';
import { getDb } from '../lib/db.js';

export const config = { maxDuration: 15 };

const resend   = new Resend(process.env.RESEND_API_KEY);
const FROM     = process.env.RESEND_FROM         ?? 'Arvo Intelligence <analys@arvo-flow.se>';
const INTERNAL = process.env.ARVO_INTERNAL_EMAIL ?? 'hej@arvo-flow.se';

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function fmt(n) {
  if (n == null || isNaN(n)) return '–';
  return new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);
}

function diagColors(score) {
  if (score < 45) return { dot: '#DC2626', bg: '#FEF2F2', labelClr: '#991B1B' };
  if (score < 65) return { dot: '#D97706', bg: '#FFFBEB', labelClr: '#92400E' };
  if (score < 80) return { dot: '#65A30D', bg: '#F7FEE7', labelClr: '#365314' };
  return { dot: '#1B7A6E', bg: '#DCEEEA', labelClr: '#0E4F47' };
}

function buildBriefingHtml({ supplier, annualCost, suggestedAnnualCost, netSaving, arvoFee, reasoning, diagScore, diagLabel, diagInsight }) {
  const dateStr = new Date().toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });
  const dc      = diagColors(diagScore ?? 72);
  const score   = diagScore ?? '–';
  const label   = diagLabel ?? '–';

  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Arvo Intelligence &middot; ${supplier ?? 'Er briefing'}</title>
</head>
<body style="margin:0;padding:0;background:#F2F7F6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td align="center" style="padding:40px 20px 60px;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:540px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #D5E2DC;">

<!-- accent bar -->
<tr><td height="3" style="background:#1B7A6E;font-size:0;line-height:0;">&nbsp;</td></tr>

<!-- header -->
<tr><td style="padding:24px 36px 20px;border-bottom:1px solid #EEF4F2;">
<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td><span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#1B7A6E;margin-right:7px;vertical-align:middle;"></span><span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.2em;color:#1B7A6E;vertical-align:middle;">Arvo Intelligence</span></td>
<td align="right"><span style="font-size:11px;color:#8A9E98;">${dateStr}</span></td>
</tr></table>
</td></tr>

<!-- supplier + score -->
<tr><td style="padding:28px 36px 24px;border-bottom:1px solid #EEF4F2;">
<p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#8A9E98;margin:0 0 6px;">Analyserad leverant&ouml;r</p>
<h1 style="font-size:30px;font-weight:800;color:#0E1A17;margin:0 0 18px;letter-spacing:-.025em;line-height:1.1;">${supplier ?? '&ndash;'}</h1>
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td style="vertical-align:middle;padding-right:20px;">
  <span style="display:inline-block;background:${dc.bg};border-radius:100px;padding:5px 13px 5px 10px;">
    <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${dc.dot};vertical-align:middle;margin-right:5px;"></span>
    <span style="font-size:12.5px;font-weight:700;color:${dc.labelClr};vertical-align:middle;">${label}</span>
  </span>
</td>
<td style="vertical-align:middle;">
  <span style="font-size:44px;font-weight:800;color:${dc.dot};letter-spacing:-.03em;line-height:1;">${score}</span>
  <span style="font-size:14px;color:#8A9E98;">/100</span>
</td>
</tr></table>
${diagInsight ? `<p style="font-size:13.5px;color:#3D5249;margin:14px 0 0;line-height:1.6;">${diagInsight}</p>` : ''}
</td></tr>

<!-- saving -->
<tr><td style="padding:24px 36px;background:#F0FDF9;border-bottom:1px solid #D5E2DC;">
<p style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.14em;color:#047857;margin:0 0 8px;">Din identifierade nettobesparing</p>
<p style="font-size:40px;font-weight:800;color:#0E1A17;margin:0 0 8px;letter-spacing:-.03em;line-height:1;">+${fmt(netSaving)}&nbsp;<span style="font-size:18px;font-weight:400;color:#5C6E68;">kr/&aring;r</span></p>
<p style="font-size:13px;color:#5C6E68;margin:0;">${fmt(annualCost)} &rarr; ${fmt(suggestedAnnualCost)} kr/&aring;r &middot; Arvos arvode ${fmt(arvoFee)} kr (20&nbsp;%)</p>
</td></tr>

${reasoning ? `<!-- reasoning -->
<tr><td style="padding:24px 36px;border-bottom:1px solid #EEF4F2;">
<p style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#8A9E98;margin:0 0 12px;">Arvos bed&ouml;mning</p>
<div style="border-left:2px solid #B8D4CB;padding-left:16px;">
<p style="font-size:14px;color:#1F2E2A;line-height:1.7;font-style:italic;margin:0;">&ldquo;${reasoning}&rdquo;</p>
</div>
</td></tr>` : ''}

<!-- CTA -->
<tr><td style="padding:28px 36px 24px;">
<a href="https://arvoflow.se/testa-faktura?bypass=dev" style="display:block;text-align:center;background:#1B7A6E;color:#ffffff;font-size:15px;font-weight:700;padding:16px 32px;border-radius:12px;text-decoration:none;letter-spacing:-.01em;">Aktivera bytet &rarr;</a>
<p style="text-align:center;font-size:12px;color:#8A9E98;margin:12px 0 0;line-height:1.6;">Arvo hanterar hela bytet &mdash; ni betalar 20&nbsp;% av realiserad besparing, inget annat.</p>
</td></tr>

<!-- portfolio bridge -->
<tr><td style="padding:0 24px 28px;">
<div style="border:1px solid #D5E2DC;border-top:2px solid #1B7A6E;border-radius:14px;padding:20px 22px;">
<p style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.18em;color:#1B7A6E;margin:0 0 8px;">Helhetsbilden</p>
<p style="font-size:16px;font-weight:800;color:#0E1A17;margin:0 0 8px;letter-spacing:-.02em;">Det h&auml;r var en faktura.</p>
<p style="font-size:13px;color:#5C6E68;margin:0 0 18px;line-height:1.6;">Koppla er inkorg &mdash; Arvo s&ouml;ker igenom era leverant&ouml;rsfakturor och kartl&auml;gger varje besparing, inte bara den h&auml;r.</p>
<a href="https://arvoflow.se/api/auth/gmail-init" style="display:inline-block;padding:10px 18px;border:1px solid #D5E2DC;border-radius:8px;font-size:13px;font-weight:600;color:#0E1A17;text-decoration:none;margin-right:8px;background:#ffffff;">G&nbsp;&nbsp;Koppla Gmail &rarr;</a>
<a href="https://arvoflow.se/api/auth/outlook-init" style="display:inline-block;padding:10px 18px;border:1px solid #D5E2DC;border-radius:8px;font-size:13px;font-weight:600;color:#0E1A17;text-decoration:none;background:#ffffff;">&#9632;&nbsp;&nbsp;Koppla Outlook &rarr;</a>
</div>
</td></tr>

<!-- footer -->
<tr><td style="padding:20px 36px 28px;border-top:1px solid #EEF4F2;">
<p style="font-size:11px;color:#8A9E98;margin:0;text-align:center;line-height:1.7;">Arvo Flow &middot; arvoflow.se &middot; hej@arvoflow.se<br>Arvo l&auml;ser bara faktura-mail &mdash; aldrig personlig korrespondens.</p>
</td></tr>

</table>
</td></tr></table>
</body></html>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });

  let body;
  try {
    body = typeof req.body === 'object' ? req.body : JSON.parse(req.body);
  } catch {
    return send(res, 400, { error: 'Invalid JSON' });
  }

  const {
    email, supplier, category,
    annualCost, suggestedAnnualCost, netSaving, arvoFee,
    reasoning, diagScore, diagLabel, diagInsight,
  } = body ?? {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return send(res, 400, { error: 'Ogiltig e-postadress' });
  }

  // Store activation intent
  const db = getDb();
  let activationId = null;
  if (db) {
    try {
      await db`
        CREATE TABLE IF NOT EXISTS intelligence_activations (
          id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
          email       TEXT        NOT NULL,
          supplier    TEXT,
          category    TEXT,
          annual_cost INTEGER,
          net_saving  INTEGER,
          diag_score  INTEGER,
          diag_label  TEXT,
          source      TEXT        NOT NULL DEFAULT 'email',
          created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      const rows = await db`
        INSERT INTO intelligence_activations (email, supplier, category, annual_cost, net_saving, diag_score, diag_label)
        VALUES (${email}, ${supplier ?? null}, ${category ?? null}, ${annualCost ?? null}, ${netSaving ?? null}, ${diagScore ?? null}, ${diagLabel ?? null})
        RETURNING id
      `;
      activationId = rows[0]?.id ?? null;
    } catch (err) {
      console.error('[activate-intelligence] DB error:', err.message);
    }
  }

  // Build + send briefing email to customer
  const html = buildBriefingHtml({ supplier, annualCost, suggestedAnnualCost, netSaving, arvoFee, reasoning, diagScore, diagLabel, diagInsight });
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: `Arvo Intelligence · ${supplier ?? 'Er leverantörsanalys'}`,
      html,
    });
  } catch (err) {
    console.error('[activate-intelligence] Resend failed:', err.message);
    return send(res, 500, { error: 'Kunde inte skicka briefing — försök igen.' });
  }

  // Internal activation alert (non-critical)
  try {
    await resend.emails.send({
      from: FROM,
      to: INTERNAL,
      subject: `[Intelligence] Ny aktivering: ${email} — ${supplier ?? '?'} ${netSaving ? `+${fmt(netSaving)} kr/år` : ''}`,
      html: `<p style="font-family:sans-serif;font-size:14px;line-height:1.6;">
        <b>E-post:</b> ${email}<br>
        <b>Leverant&ouml;r:</b> ${supplier ?? '–'}<br>
        <b>Kategori:</b> ${category ?? '–'}<br>
        <b>Score:</b> ${diagScore}/100 (${diagLabel})<br>
        <b>Nettobesparing:</b> +${fmt(netSaving)} kr/&aring;r<br>
        <b>ID:</b> ${activationId ?? '–'}
      </p>`,
    });
  } catch {
    // Non-critical — swallow
  }

  send(res, 200, { ok: true });
}
