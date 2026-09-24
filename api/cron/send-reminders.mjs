// api/cron/send-reminders.mjs — Arvo:s proaktiva påminnelseloop.
//
// Körs dagligen kl. 08:00 (Europa/Stockholm).
// Hanterar tre typer av utgående e-post:
//
//   1. Fakturaklockan — varsel 30/7 dagar före SISTA UPPSÄGNINGSDAG (lib/paminnelse.js), eller
//      ett ärligt mejl när uppsägningstiden inte står på fakturan
//   2. Avtalsvyn      — samma varsel för uppladdade avtal (lib/deadline-reminder.js)
//   3. Utfallsenkät 60 dagar — "Bytte ni leverantör? Vi vill lära oss av er"
//
// Alla e-poster skickas bara en gång per analys (idempotent via sent_at-kolumner).
// Kräver: RESEND_API_KEY, DATABASE_URL

import { Resend } from 'resend';
import { getDb } from '../../lib/db.js';
import { deadlineReminderDecision } from '../../lib/deadline-reminder.js';
import { underlagFranRad, paminnelseBeslut, paminnelseMejl } from '../../lib/paminnelse.js';
import { cronAnropTillatet } from '../../lib/cronvakt.js';

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

// ── E-postmallar ──────────────────────────────────────────────────────────────
// Fakturaklockans mejl bor i lib/paminnelse.js (ren, PM-01..08). Här finns bara avtalsvyns och enkätens.

// Deadline-vaktens mejl: sista uppsägningsdagen, fällan (vad ett missat fönster binder till)
// och vägen till rummet. Inga besparingslöften här — bara avtalets egna, verifierbara datum.
function deadlineReminderHtml({ supplier, view, analysisId }) {
  const c = view.clock;
  const fmtSv = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const falla = view.nastaPeriodSlut
    ? `<p style="color:#5C6E68;font-size:15px;line-height:1.65;margin:0 0 16px">
         <strong style="color:#0E1A17">Fällan i ert avtal:</strong> missas fönstret förlängs avtalet
         automatiskt och ni är bundna till <strong>${fmtSv(view.nastaPeriodSlut)}</strong>.
       </p>`
    : '';
  return `
    <div style="font-family:-apple-system,Arial,sans-serif;max-width:520px;margin:0 auto;padding:40px 24px;color:#0E1A17">
      <img src="${BASE_URL}/logo.png" alt="Arvo Flow" style="height:28px;margin-bottom:32px" />
      <p style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#D97706;margin:0 0 12px">Avtalsklockan · ${supplier}</p>
      <h2 style="font-size:22px;font-weight:800;margin:0 0 12px;letter-spacing:-0.02em;line-height:1.3">
        Sista uppsägningsdag ${fmtSv(c.deadline)} — ${c.daysToDeadline} dagar kvar
      </h2>
      <p style="color:#5C6E68;font-size:15px;line-height:1.65;margin:0 0 16px">
        Datumet kommer ur ert eget avtal, som Arvo läst och bevakar. Vill ni lämna eller omteckna
        är det här fönstret — efter det löper avtalet vidare.
      </p>
      ${falla}
      <a href="${BASE_URL}/portfolio"
         style="display:inline-block;padding:14px 28px;border-radius:100px;
                background:linear-gradient(135deg,#2BC4AC 0%,#1B7A6E 100%);
                color:#fff;font-weight:700;font-size:14px;text-decoration:none;margin-bottom:24px">
        Öppna ert rum →
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
  // GRINDEN (grundarorder 2026-09-24): loopen var ogrindad och kunde anropas av vem som helst. Samma grind
  // som övriga cron-jobb (lib/cronvakt.js): en osatt CRON_SECRET nekar i produktion — då nekas även
  // Vercels egen cron, och det syns i Vercels körlogg som 401. Mätinstrumentet är probe-cronvakt.
  if (!cronAnropTillatet(req)) return send(res, 401, { error: 'unauthorized' });

  const db = getDb();
  if (!db) return send(res, 200, { ok: true, skipped: 'no-db' });

  if (!process.env.RESEND_API_KEY) {
    console.warn('[send-reminders] RESEND_API_KEY saknas — hoppar över utskick');
    return send(res, 200, { ok: true, skipped: 'no-resend' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const stats  = { fakturaklocka: {}, outcome: 0, errors: 0 };

  // ── 1. FAKTURAKLOCKAN — varsel mot SISTA UPPSÄGNINGSDAG (2026-09-23) ─────────
  // Här stod två sektioner som mejlade 60/30 dagar före SLUTDATUM med mallar som läste camelCase ur
  // en snake_case-rad: «löper ut om NaN dagar», besparingen tappad, och varje varsel efter sista
  // uppsägningsdag vid uppsägningstid över 30 dagar (mätt i översynen). Nu fattar lib/paminnelse.js
  // beslutet ur samma klocka som fakturavyn och rummet visar. Rader med ett uppladdat AVTAL
  // (contract_terms_json) tas av avtalsvyn i 2b — aldrig två mejl om samma avtal.
  try {
    const rows = await db`
      SELECT id, supplier, normalized_supplier, user_email, contract_end_date, uppsagning_json,
             net_saving, created_at, analyserad_at, deadline_reminder_json
      FROM invoice_analyses   -- liggare: kundvy
      WHERE contract_end_date > CURRENT_DATE
        AND contract_terms_json IS NULL
        AND arkiverad_at IS NULL
        AND user_email IS NOT NULL
    `;
    for (const row of rows) {
      try {
        const underlag = underlagFranRad(row);
        if (!underlag) continue;
        const { typ, marker } = paminnelseBeslut({ klocka: underlag.klocka, marker: row.deadline_reminder_json });
        if (!typ) continue;
        const { subject, html } = paminnelseMejl({ typ, underlag, baseUrl: BASE_URL });
        await resend.emails.send({ from: FROM, to: underlag.till, subject, html });
        await db`UPDATE invoice_analyses SET deadline_reminder_json = ${JSON.stringify(marker)}::jsonb WHERE id = ${row.id}`;
        stats.fakturaklocka[typ] = (stats.fakturaklocka[typ] ?? 0) + 1;
      } catch (err) {
        console.error('[send-reminders] fakturaklockan misslyckades för', row.id, err.message);
        stats.errors++;
      }
    }
  } catch (err) {
    // Aldrig tyst: en fråga som faller betyder att INGEN påminnelse gick i dag.
    console.error('[send-reminders] fakturaklockans fråga föll — inga varsel skickade:', err.message);
    stats.errors++;
  }

  // ── 2b. DEADLINE-VAKTEN — 30/7 dagar före SISTA UPPSÄGNINGSDAGEN ──────────
  // Regel 9-fyndet 2026-07-08: 60/30-mejlen ovan räknar mot PERIODSLUTET — för
  // rullande avtal (Bahnhof 3+3) stänger fönstret långt tidigare. Denna gren
  // räknar klockan FÄRSK ur avtalstermerna (lib/deadline-reminder.js, testlåst)
  // och påminner mot deadlinen. Rullande avtal påminns per period (markören bär
  // deadline-datumet och nollställs när klockan rullat).
  try {
    const rows = await db`
      SELECT id, supplier, normalized_supplier, user_email, contract_terms_json, deadline_reminder_json
      FROM invoice_analyses   -- liggare: kundvy
      WHERE contract_terms_json IS NOT NULL
        AND arkiverad_at IS NULL
        AND user_email IS NOT NULL
    `.catch(async (e) => {
      if (!/deadline_reminder_json/.test(e.message)) throw e;
      await db`ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS deadline_reminder_json JSONB`;
      return db`
        SELECT id, supplier, normalized_supplier, user_email, contract_terms_json, deadline_reminder_json
        FROM invoice_analyses   -- liggare: kundvy
        WHERE contract_terms_json IS NOT NULL AND arkiverad_at IS NULL AND user_email IS NOT NULL`;
    });
    for (const row of rows) {
      try {
        const { send30, send7, marker, view } = deadlineReminderDecision({
          terms: row.contract_terms_json, marker: row.deadline_reminder_json,
        });
        if (!send30 && !send7) continue;
        const supplier = row.normalized_supplier || row.supplier || 'leverantören';
        const d = view.clock;
        await resend.emails.send({
          from:    FROM,
          to:      row.user_email,
          subject: send7
            ? `⏳ ${d.daysToDeadline} dagar kvar: sista uppsägningsdag för ${supplier}-avtalet`
            : `${d.daysToDeadline} dagar till sista uppsägningsdag för ${supplier}-avtalet`,
          html:    deadlineReminderHtml({ supplier, view, analysisId: row.id }),
        });
        await db`
          UPDATE invoice_analyses SET deadline_reminder_json = ${JSON.stringify(marker)}::jsonb WHERE id = ${row.id}
        `;
        stats.deadline = (stats.deadline ?? 0) + 1;
      } catch (err) {
        console.error('[send-reminders] deadline-vakten misslyckades för', row.id, err.message);
        stats.errors++;
      }
    }
  } catch (err) {
    // Kolumnen contract_terms_json kan saknas i äldre miljöer — då finns inget att bevaka (ofarligt).
    if (!/contract_terms_json/.test(err.message)) console.error('[send-reminders] deadline-vakt query failed:', err.message);
  }

  // ── 3. Utfallsenkät — 60 dagar efter analys ───────────────────────────────
  try {
    const rows = await db`
      SELECT id, supplier, net_saving, user_email
      FROM invoice_analyses   -- liggare: kundvy
      WHERE route = 'auto'
        AND arkiverad_at IS NULL
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
          // Uttrycklig mappning: `...row` gav mallen snake_case (`net_saving`) medan den läste
          // `netSaving` — besparingen föll tyst bort (mätt 2026-09-23, samma form som NaN-felet).
          html:    outcomeEmailHtml({ supplier: row.supplier, netSaving: Number(row.net_saving), analysisId: row.id }),
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
