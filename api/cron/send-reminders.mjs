// api/cron/send-reminders.mjs — Arvo:s proaktiva påminnelseloop.
//
// Körs dagligen kl. 08:00 (Europa/Stockholm).
// Hanterar tre typer av utgående e-post:
//
//   1. Avtalsbevakning 60 dagar — "Ni har 2 månader kvar att förhandla"
//   2. Avtalsbevakning 30 dagar — "Nu är rätt tid — avtalet löper ut om en månad"
//   3. Utfallsenkät 60 dagar    — "Bytte ni leverantör? Vi vill lära oss av er"
//
// Alla e-poster skickas bara en gång per analys (idempotent via sent_at-kolumner).
// Kräver: RESEND_API_KEY, DATABASE_URL

import { Resend } from 'resend';
import { getDb } from '../../lib/db.js';

export const config = { maxDuration: 30 };

const FROM     = process.env.RESEND_FROM      ?? 'Arvo Flow <analys@arvoflow.se>';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://arvoflow.se';

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function formatKr(n) {
  return new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n ?? 0);
}

function daysUntil(dateStr) {
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((d - now) / 86_400_000);
}

// ── E-postmallar ──────────────────────────────────────────────────────────────

function reminder60Html({ supplier, annualCost, netSaving, contractEndDate, analysisId }) {
  const days   = daysUntil(contractEndDate);
  const saving = netSaving > 0 ? `<p style="color:#1B7A6E;font-weight:700;font-size:16px;margin:0 0 20px">Potentiell besparing: +${formatKr(netSaving)} kr/år netto</p>` : '';
  return `
    <div style="font-family:-apple-system,Arial,sans-serif;max-width:520px;margin:0 auto;padding:40px 24px;color:#0E1A17">
      <img src="${BASE_URL}/logo.png" alt="Arvo Flow" style="height:28px;margin-bottom:32px" />
      <p style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#1B7A6E;margin:0 0 12px">Avtalsbevakning</p>
      <h2 style="font-size:22px;font-weight:800;margin:0 0 12px;letter-spacing:-0.02em;line-height:1.3">
        Ert avtal med ${supplier} löper ut om ${days} dagar
      </h2>
      <p style="color:#5C6E68;font-size:15px;line-height:1.65;margin:0 0 20px">
        Nu är rätt tid att inleda förhandlingen — leverantörerna är mest flexibla
        2–3 månader innan avtalsslutet. Väntar ni tills sista veckan förlorar ni förhandlingsutrymme.
      </p>
      ${saving}
      <a href="${BASE_URL}/testa-faktura?analysisId=${analysisId}"
         style="display:inline-block;padding:14px 28px;border-radius:100px;
                background:linear-gradient(135deg,#5DD6CA 0%,#1B6E66 100%);
                color:#fff;font-weight:700;font-size:14px;text-decoration:none">
        Se er analys och nästa steg →
      </a>
      <hr style="border:none;border-top:1px solid #E5E7EB;margin:32px 0" />
      <p style="color:#9CA3AF;font-size:12px;line-height:1.5;margin:0">
        Ni får det här mejlet för att ni bad Arvo bevaka ert avtal med ${supplier}.<br>
        <a href="${BASE_URL}/avsluta-bevakning?id=${analysisId}" style="color:#9CA3AF">Avsluta bevakning</a>
      </p>
    </div>
  `;
}

function reminder30Html({ supplier, annualCost, netSaving, contractEndDate, analysisId }) {
  const days   = daysUntil(contractEndDate);
  const saving = netSaving > 0 ? `<p style="font-size:15px;color:#5C6E68;margin:0 0 8px">Er Arvo-analys visar en nettobesparing på <strong style="color:#1B7A6E">+${formatKr(netSaving)} kr/år</strong>.</p>` : '';
  return `
    <div style="font-family:-apple-system,Arial,sans-serif;max-width:520px;margin:0 auto;padding:40px 24px;color:#0E1A17">
      <img src="${BASE_URL}/logo.png" alt="Arvo Flow" style="height:28px;margin-bottom:32px" />
      <p style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#D97706;margin:0 0 12px">Sista chansen att förhandla</p>
      <h2 style="font-size:22px;font-weight:800;margin:0 0 12px;letter-spacing:-0.02em;line-height:1.3">
        ${days} dagar kvar — ert ${supplier}-avtal avslutas snart
      </h2>
      <p style="color:#5C6E68;font-size:15px;line-height:1.65;margin:0 0 16px">
        Om ni inte agerar nu förlängs avtalet automatiskt på nuvarande villkor.
        Arvo kan ta hand om hela bytet och förhandlingen — ni behöver inte lägga en timme på det.
      </p>
      ${saving}
      <a href="${BASE_URL}/testa-faktura?analysisId=${analysisId}"
         style="display:inline-block;padding:14px 28px;border-radius:100px;
                background:linear-gradient(135deg,#F59E0B 0%,#D97706 100%);
                color:#fff;font-weight:700;font-size:14px;text-decoration:none;margin-bottom:24px">
        Aktivera leverantörsbytet nu →
      </a>
      <hr style="border:none;border-top:1px solid #E5E7EB;margin:28px 0" />
      <p style="color:#9CA3AF;font-size:12px;line-height:1.5;margin:0">
        <a href="${BASE_URL}/avsluta-bevakning?id=${analysisId}" style="color:#9CA3AF">Avsluta bevakning</a>
      </p>
    </div>
  `;
}

function outcomeEmailHtml({ supplier, netSaving, analysisId }) {
  const saving = netSaving > 0 ? `Vi beräknade en nettobesparing på <strong>${formatKr(netSaving)} kr/år</strong> om ni bytte från ${supplier}.` : `Vi analyserade er faktura från ${supplier} för 60 dagar sedan.`;
  return `
    <div style="font-family:-apple-system,Arial,sans-serif;max-width:520px;margin:0 auto;padding:40px 24px;color:#0E1A17">
      <img src="${BASE_URL}/logo.png" alt="Arvo Flow" style="height:28px;margin-bottom:32px" />
      <h2 style="font-size:20px;font-weight:800;margin:0 0 12px;letter-spacing:-0.02em;line-height:1.3">
        Hände det något med ert ${supplier}-avtal?
      </h2>
      <p style="color:#5C6E68;font-size:15px;line-height:1.65;margin:0 0 24px">
        ${saving} Vi frågar för att bli bättre — varje svar gör Arvo mer precis för alla kunder.
      </p>
      <div style="display:flex;gap:12px;margin-bottom:32px">
        <a href="${BASE_URL}/utfall?id=${analysisId}&svar=ja"
           style="display:inline-block;padding:12px 24px;border-radius:100px;
                  background:linear-gradient(135deg,#5DD6CA,#1B6E66);
                  color:#fff;font-weight:700;font-size:14px;text-decoration:none">
          Ja, vi bytte →
        </a>
        <a href="${BASE_URL}/utfall?id=${analysisId}&svar=nej"
           style="display:inline-block;padding:12px 24px;border-radius:100px;
                  border:1.5px solid #D1D5DB;
                  color:#374151;font-weight:600;font-size:14px;text-decoration:none">
          Inte än
        </a>
      </div>
      <p style="color:#9CA3AF;font-size:12px;line-height:1.5;margin:0">
        Det tar 30 sekunder. Inga fler e-poster efter detta.
      </p>
    </div>
  `;
}

// ── Handler ───────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  // Tillåt manuell körning via GET (för testning) och Vercel Cron via GET
  if (req.method !== 'GET' && req.method !== 'POST') {
    return send(res, 405, { error: 'Metod ej tillåten' });
  }

  const db = getDb();
  if (!db) return send(res, 200, { ok: true, skipped: 'no-db' });

  if (!process.env.RESEND_API_KEY) {
    console.warn('[send-reminders] RESEND_API_KEY saknas — hoppar över utskick');
    return send(res, 200, { ok: true, skipped: 'no-resend' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const stats  = { reminder60: 0, reminder30: 0, outcome: 0, errors: 0 };

  // ── 1. Avtalsbevakning — 60 dagar ─────────────────────────────────────────
  try {
    const rows = await db`
      SELECT id, supplier, annual_cost, net_saving, contract_end_date, user_email
      FROM invoice_analyses
      WHERE contract_end_date BETWEEN CURRENT_DATE + 59 AND CURRENT_DATE + 61
        AND reminder_60_sent_at IS NULL
        AND user_email IS NOT NULL
    `;
    for (const row of rows) {
      try {
        await resend.emails.send({
          from:    FROM,
          to:      row.user_email,
          subject: `Ert avtal med ${row.supplier} löper ut om 60 dagar`,
          html:    reminder60Html({ ...row, analysisId: row.id }),
        });
        await db`
          UPDATE invoice_analyses SET reminder_60_sent_at = NOW() WHERE id = ${row.id}
        `;
        stats.reminder60++;
      } catch (err) {
        console.error('[send-reminders] reminder60 misslyckades för', row.id, err.message);
        stats.errors++;
      }
    }
  } catch (err) {
    console.error('[send-reminders] reminder60 query failed:', err.message);
  }

  // ── 2. Avtalsbevakning — 30 dagar ─────────────────────────────────────────
  try {
    const rows = await db`
      SELECT id, supplier, annual_cost, net_saving, contract_end_date, user_email
      FROM invoice_analyses
      WHERE contract_end_date BETWEEN CURRENT_DATE + 29 AND CURRENT_DATE + 31
        AND reminder_30_sent_at IS NULL
        AND user_email IS NOT NULL
    `;
    for (const row of rows) {
      try {
        await resend.emails.send({
          from:    FROM,
          to:      row.user_email,
          subject: `⚡ ${row.supplier}-avtalet löper ut om 30 dagar`,
          html:    reminder30Html({ ...row, analysisId: row.id }),
        });
        await db`
          UPDATE invoice_analyses SET reminder_30_sent_at = NOW() WHERE id = ${row.id}
        `;
        stats.reminder30++;
      } catch (err) {
        console.error('[send-reminders] reminder30 misslyckades för', row.id, err.message);
        stats.errors++;
      }
    }
  } catch (err) {
    console.error('[send-reminders] reminder30 query failed:', err.message);
  }

  // ── 3. Utfallsenkät — 60 dagar efter analys ───────────────────────────────
  try {
    const rows = await db`
      SELECT id, supplier, net_saving, user_email
      FROM invoice_analyses
      WHERE route = 'auto'
        AND created_at BETWEEN NOW() - INTERVAL '61 days' AND NOW() - INTERVAL '59 days'
        AND outcome_email_sent_at IS NULL
        AND user_email IS NOT NULL
    `;
    for (const row of rows) {
      try {
        await resend.emails.send({
          from:    FROM,
          to:      row.user_email,
          subject: `Hände det något med ert ${row.supplier}-avtal?`,
          html:    outcomeEmailHtml({ ...row, analysisId: row.id }),
        });
        await db`
          UPDATE invoice_analyses SET outcome_email_sent_at = NOW() WHERE id = ${row.id}
        `;
        stats.outcome++;
      } catch (err) {
        console.error('[send-reminders] outcome misslyckades för', row.id, err.message);
        stats.errors++;
      }
    }
  } catch (err) {
    console.error('[send-reminders] outcome query failed:', err.message);
  }

  console.log('[send-reminders] klar:', stats);
  return send(res, 200, { ok: true, stats });
}
