#!/usr/bin/env node
/**
 * Skickar ett larmmail till administratören när prisändringar detekterats.
 *
 * Användning:
 *   node scripts/send-alert-email.mjs --pr-url https://github.com/.../pull/42
 *
 * Kräver miljövariabeln RESEND_API_KEY.
 * Läser /tmp/price-monitor-report.json och /tmp/apply-summary.json.
 */

import { readFileSync } from 'fs';
import { Resend } from 'resend';

const TO        = 'met.sogojeva@gmail.com';
const FROM      = 'Arvo Flow <onboarding@resend.dev>';
const T = { brand: '#1B7A6E', ink: '#0E1A17', muted: '#5C6E68', bg: '#F1F6F3', border: '#D5E2DC' };

// ── Args ──────────────────────────────────────────────────────────────────────
const prUrlIdx = process.argv.indexOf('--pr-url');
const prUrl    = prUrlIdx !== -1 ? process.argv[prUrlIdx + 1] : null;

if (!process.env.RESEND_API_KEY) {
  console.error('⚠️  RESEND_API_KEY saknas — mail kan inte skickas. Kontrollera GitHub Secret.');
  process.exit(0);
}

// ── Load data ─────────────────────────────────────────────────────────────────
const report  = JSON.parse(readFileSync('/tmp/price-monitor-report.json', 'utf8'));
let   summary = { applied: [], skipped: [] };
try {
  summary = JSON.parse(readFileSync('/tmp/apply-summary.json', 'utf8'));
} catch { /* file may not exist if apply step was skipped */ }

const alerts  = report.alerts ?? [];
const date    = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm',
  year: 'numeric', month: '2-digit', day: '2-digit' });

// ── Build alert rows ──────────────────────────────────────────────────────────
const alertRows = alerts.map(a => {
  const h          = a.haiku;
  const oldPrice   = a.check;
  const newPrice   = h?.extractedPrice ?? '(okänd)';
  const action     = h?.actionRequired ?? 'verify_manually';
  const confidence = h?.confidence != null ? `${Math.round(h.confidence * 100)} %` : '—';
  const auto       = summary.applied.some(ap => ap.oldCheck === a.check && ap.supplier === a.supplier)
    ? '✅ Auto-föreslagen'
    : '⚠️ Manuell koll';

  return `
    <tr>
      <td style="padding:12px 16px;border-top:1px solid ${T.border};font-size:13px;color:${T.ink}">${a.category}</td>
      <td style="padding:12px 16px;border-top:1px solid ${T.border};font-size:13px;color:${T.ink}">${a.supplier}</td>
      <td style="padding:12px 16px;border-top:1px solid ${T.border};font-size:13px;color:#b91c1c;font-weight:600">${oldPrice}</td>
      <td style="padding:12px 16px;border-top:1px solid ${T.border};font-size:13px;color:#15803d;font-weight:600">${newPrice}</td>
      <td style="padding:12px 16px;border-top:1px solid ${T.border};font-size:12px;color:${T.muted}">${confidence}</td>
      <td style="padding:12px 16px;border-top:1px solid ${T.border};font-size:12px">${auto}</td>
    </tr>`;
}).join('');

const skippedBlock = summary.skipped.length
  ? `<p style="margin:0 0 8px;font-size:12px;color:${T.muted}">Följande kräver manuell verifiering:</p>
     <ul style="margin:0;padding-left:20px">
       ${summary.skipped.map(s => `<li style="font-size:12px;color:${T.muted};margin-bottom:4px"><strong>${s.supplier} / ${s.check}</strong>: ${s.reason}</li>`).join('')}
     </ul>`
  : '<p style="margin:0;font-size:12px;color:${T.muted}">Inga</p>';

// ── HTML email ────────────────────────────────────────────────────────────────
const html = `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Arvo Price Alert</title>
</head>
<body style="margin:0;padding:0;background:${T.bg}">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${T.bg};padding:40px 16px">
<tr><td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;max-width:620px;width:100%;box-shadow:0 2px 16px rgba(14,26,23,0.08)">

  <!-- Top bar -->
  <tr><td style="height:4px;background:linear-gradient(90deg,#5DD6CA,#1B6E66);font-size:0">&nbsp;</td></tr>

  <!-- Header -->
  <tr>
    <td style="padding:28px 40px 20px;border-bottom:1px solid ${T.border}">
      <p style="margin:0 0 4px;font-size:20px;font-weight:700;color:#b91c1c">🚨 Prisändring detekterad</p>
      <p style="margin:0;font-size:13px;color:${T.muted}">Arvo Flow Nightly Price Monitor · ${date}</p>
    </td>
  </tr>

  <!-- Summary -->
  <tr>
    <td style="padding:24px 40px">
      <p style="margin:0 0 16px;font-size:14px;color:${T.ink};line-height:1.6">
        Prismonitorn har detekterat <strong>${alerts.length} möjlig(a) prisändring(ar)</strong>.
        ${summary.applied.length > 0
          ? `AI har föreslagit automatiska uppdateringar för <strong>${summary.applied.length}</strong> av dem i en Pull Request.`
          : 'Alla kräver manuell verifiering.'}
      </p>

      ${prUrl ? `
      <!-- PR CTA -->
      <table cellpadding="0" cellspacing="0" style="margin-bottom:24px">
        <tr>
          <td style="border-radius:10px;background:linear-gradient(135deg,#5DD6CA,#1B6E66)">
            <a href="${prUrl}"
               style="display:inline-block;color:#fff;font-weight:600;font-size:14px;padding:14px 36px;text-decoration:none;letter-spacing:.02em">
              Granska Pull Request &rarr;
            </a>
          </td>
        </tr>
      </table>
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:${T.brand};text-transform:uppercase;letter-spacing:.08em">Åtgärder</p>
      <ol style="margin:0 0 24px;padding-left:20px;font-size:13px;color:${T.ink};line-height:1.7">
        <li>Klicka på länken ovan och granska ändringarna i PRen</li>
        <li>Verifiera priser mot leverantörens webbplats</li>
        <li>Om korrekt: <strong>merga</strong> — Vercel deployar automatiskt</li>
        <li>Uppdatera matrisvärdena i <code>branchindex.js</code> om prisnivån förändrats markant</li>
      </ol>` : `
      <div style="margin-bottom:24px;padding:16px;background:#fefce8;border:1px solid #fde68a;border-radius:8px">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#92400e">Manuell verifiering krävs</p>
        <p style="margin:0;font-size:13px;color:${T.ink}">AI-analysen var inte tillräckligt säker för att skapa en automatisk PR. Verifiera priserna manuellt via länkarna i tabellen nedan.</p>
      </div>
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:${T.brand};text-transform:uppercase;letter-spacing:.08em">Åtgärder</p>
      <ol style="margin:0 0 24px;padding-left:20px;font-size:13px;color:${T.ink};line-height:1.7">
        <li>Besök länkarna i tabellen och kontrollera aktuellt pris</li>
        <li>Uppdatera <code>price-monitor.mjs</code> och <code>branchindex.js</code> manuellt vid prisändring</li>
        <li>Stäng issue #72 efter verifiering</li>
      </ol>`}

      <!-- Alert table -->
      <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:${T.brand};text-transform:uppercase;letter-spacing:.08em">Detekterade avvikelser</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${T.border};border-radius:8px;overflow:hidden;font-family:Arial,sans-serif">
        <tr style="background:#f8faf9">
          <th style="padding:10px 16px;font-size:11px;font-weight:700;color:${T.muted};text-align:left;text-transform:uppercase;letter-spacing:.06em">Kategori</th>
          <th style="padding:10px 16px;font-size:11px;font-weight:700;color:${T.muted};text-align:left;text-transform:uppercase;letter-spacing:.06em">Leverantör</th>
          <th style="padding:10px 16px;font-size:11px;font-weight:700;color:${T.muted};text-align:left;text-transform:uppercase;letter-spacing:.06em">Gammalt pris</th>
          <th style="padding:10px 16px;font-size:11px;font-weight:700;color:${T.muted};text-align:left;text-transform:uppercase;letter-spacing:.06em">AI-förslag</th>
          <th style="padding:10px 16px;font-size:11px;font-weight:700;color:${T.muted};text-align:left;text-transform:uppercase;letter-spacing:.06em">Säkerhet</th>
          <th style="padding:10px 16px;font-size:11px;font-weight:700;color:${T.muted};text-align:left;text-transform:uppercase;letter-spacing:.06em">Status</th>
        </tr>
        ${alertRows}
      </table>

      ${summary.skipped.length ? `
      <div style="margin-top:20px;padding:16px;background:#fefce8;border:1px solid #fde68a;border-radius:8px">
        <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:.06em">Kräver manuell verifiering</p>
        ${skippedBlock}
      </div>` : ''}
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="padding:20px 40px;border-top:1px solid ${T.border};text-align:center">
      <p style="margin:0;font-size:11px;color:${T.muted}">
        Arvo Flow Nightly Price Monitor${prUrl ? ` · <a href="${prUrl}" style="color:${T.brand};text-decoration:none">Visa PR</a>` : ''}
      </p>
      <p style="margin:4px 0 0;font-size:10px;color:#aaa">AI-extraherade priser är indikativa — verifiera alltid manuellt innan merge.</p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;

// ── Send ──────────────────────────────────────────────────────────────────────
const resend  = new Resend(process.env.RESEND_API_KEY);
const subject = prUrl
  ? `🚨 Arvo: ${alerts.length} prisändring(ar) detekterade — PR kräver granskning`
  : `🚨 Arvo: ${alerts.length} prisändring(ar) detekterade — manuell verifiering krävs`;

try {
  const { error } = await resend.emails.send({ from: FROM, to: TO, subject, html });
  if (error) throw new Error(JSON.stringify(error));
  console.log(`✅  Larmmail skickat till ${TO}`);
} catch (err) {
  console.error('❌  Kunde inte skicka mail:', err.message);
  process.exit(1);
}
