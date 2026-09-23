// lib/paminnelse.js — FAKTURAKLOCKANS PÅMINNELSER: beslut, datum och mejl ur EN klocka.
//
// ══ VARFÖR (grundarorder 2026-09-23, systemöversynen) ══════════════════════════════════════
// Mätt genom att köra de gamla mallarna i api/cron/send-reminders.mjs med raden i exakt den form SQL
// ger: «Ert avtal med Telia löper ut om NaN dagar» och «NaN dagar kvar». Mallarna läste camelCase
// (`contractEndDate`, `netSaving`), raden var snake_case — och besparingen föll tyst bort. Och de gick
// 60/30 dagar före SLUTDATUM, alltså efter sista uppsägningsdag vid varje uppsägningstid över 30 dagar.
// Samtidigt lovade fakturavyn «Arvo påminner er [slutdatum − 3 mån]» — ett datum inget mejl bar.
//
// Nu fattar cronen, fakturavyn och rummet samma beslut härifrån:
//   · känd sista uppsägningsdag → varsel 30 och 7 dagar före DEN (VARSEL_DAGAR, delat med avtalsvyn)
//   · okänd uppsägningstid      → ETT ärligt mejl OKAND_VARSEL_DAGAR före slutdatum, som säger att
//                                 uppsägningstiden inte står på fakturan — aldrig «ni har tid»
//   · fönstret stängt           → inget mejl (det finns inget att agera på före slutet)
//   · ingen e-postadress        → inga datum, och kortet säger det (lib/contract-clock.js)
//
// FÅNGAR: en mall som läser ett fält raden inte bär · ett mejl som räknar mot slutdatum när sista
//   dagen är känd · ett löfte om ett datum cronen inte kommer att skicka på.
// BLIND: cronen går en gång per dygn (08:00). Ett fönster som öppnas efter körningen varslas nästa
//   dag — därför säger kortet «inom ett dygn», aldrig ett klockslag. Ett slutdatum som AI:n läst fel
//   ser modulen inte.

import { avtalsklocka, uppsagningText } from './contract-clock.js';
import { varselFranDeadline, VARSEL_DAGAR } from './deadline-reminder.js';
import { fmtNumber } from './format.js';

/** Dagar före SLUTDATUM då kunden varnas när uppsägningstiden inte står på fakturan. */
export const OKAND_VARSEL_DAGAR = 120;

const DAY_MS = 864e5;
const isoPlus = (iso, dagar) => new Date(new Date(`${iso}T00:00:00Z`).getTime() + dagar * DAY_MS).toISOString().slice(0, 10);
const idagIso = (today) => new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())).toISOString().slice(0, 10);
const svDatum = (iso) => new Intl.DateTimeFormat('sv-SE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
  .format(new Date(`${iso}T00:00:00Z`));
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/**
 * De datum då mejl KOMMER att gå för den här klockan — samma trösklar som cronen använder.
 * Ett datum som redan nåtts blir «snarast» (cronen tar det vid nästa körning, inom ett dygn).
 * @returns {{ kanal: 'epost'|null, datum: string[] }}
 */
export function planeradePaminnelser(klocka, { harEpost = false, today = new Date() } = {}) {
  if (!harEpost) return { kanal: null, datum: [] };
  const idag = idagIso(today);
  const ut = [];
  const lagg = (iso) => { const d = iso <= idag ? 'snarast' : iso; if (!ut.includes(d)) ut.push(d); };
  if (klocka?.lage === 'fonster_oppet' || klocka?.lage === 'sista_dag_idag') {
    const [forsta, sista] = VARSEL_DAGAR;
    if (klocka.dagarTillSistaDag > sista) lagg(isoPlus(klocka.sistaDag, -forsta));
    lagg(isoPlus(klocka.sistaDag, -sista));
  } else if (klocka?.lage === 'uppsagning_okand') {
    lagg(isoPlus(klocka.slutdatum, -OKAND_VARSEL_DAGAR));
  }
  return { kanal: 'epost', datum: ut };
}

/**
 * Cronens beslut för EN rad. `marker` är radens deadline_reminder_json.
 * @returns {{ typ: null|'varsel30'|'varsel7'|'okand', marker: object|null }}
 */
export function paminnelseBeslut({ klocka, marker = null, today = new Date() }) {
  if (!klocka) return { typ: null, marker };
  if (klocka.lage === 'fonster_oppet' || klocka.lage === 'sista_dag_idag') {
    const b = varselFranDeadline({ deadline: klocka.sistaDag, daysToDeadline: klocka.dagarTillSistaDag, marker, today });
    return { typ: b.send7 ? 'varsel7' : b.send30 ? 'varsel30' : null, marker: b.marker };
  }
  if (klocka.lage === 'uppsagning_okand') {
    const m = (marker && marker.slut === klocka.slutdatum) ? { ...marker } : { slut: klocka.slutdatum };
    if (klocka.dagarTillSlut <= OKAND_VARSEL_DAGAR && !m.sentOkand) {
      m.sentOkand = today.toISOString();
      return { typ: 'okand', marker: m };
    }
    return { typ: null, marker: m };
  }
  return { typ: null, marker };
}

/**
 * Raden ur SQL (snake_case) → mejlets underlag. Mappningen är UTTRYCKLIG: en mall som läser ett fält
 * raden inte bär var hela NaN-felet. Saknas slutdatumet finns inget underlag (null), aldrig ett NaN.
 */
export function underlagFranRad(row, { today = new Date() } = {}) {
  if (!row || !row.contract_end_date) return null;
  const slutIso = row.contract_end_date instanceof Date
    ? row.contract_end_date.toISOString().slice(0, 10) : String(row.contract_end_date).slice(0, 10);
  const klocka = avtalsklocka({ servicePeriodEnd: slutIso, uppsagning: row.uppsagning_json ?? null, today });
  if (klocka.lage === 'ingen_klocka') return null;
  const netto = Number(row.net_saving);
  const analysDag = row.analyserad_at ?? row.created_at ?? null;
  return {
    id: row.id,
    till: row.user_email,
    supplier: (row.normalized_supplier || row.supplier || '').trim() || 'er leverantör',
    klocka,
    // Talet är FRYST vid analysen (lib/invoice-store.js). Det sägs därför med sitt datum, aldrig i presens.
    besparing: Number.isFinite(netto) && netto > 0 && analysDag
      ? { netto, analysDatum: new Date(analysDag).toISOString().slice(0, 10) } : null,
  };
}

/** Mejlet. Varje tal kommer ur klockan eller underlaget — inget räknas här. */
export function paminnelseMejl({ typ, underlag, baseUrl = 'https://arvoflow.se' }) {
  const { klocka: k, supplier } = underlag;
  const sup = esc(supplier);
  const ut = uppsagningText(k.uppsagning);
  let rubrik; let subject; let brodtext;
  if (typ === 'varsel30' || typ === 'varsel7') {
    const dagar = k.dagarTillSistaDag;
    rubrik = dagar === 0 ? `Sista uppsägningsdag är i dag` : `Sista uppsägningsdag ${svDatum(k.sistaDag)} — ${fmtNumber(dagar)} ${dagar === 1 ? 'dag' : 'dagar'} kvar`;
    subject = dagar === 0 ? `I dag: sista uppsägningsdag för ${supplier}-avtalet`
      : `${fmtNumber(dagar)} ${dagar === 1 ? 'dag' : 'dagar'} till sista uppsägningsdag för ${supplier}-avtalet`;
    brodtext = `Avtalet med ${sup} löper till ${svDatum(k.slutdatum)}. Uppsägningstiden är ${ut}, så sista dagen att säga upp är ${svDatum(k.sistaDag)}. `
      + 'Båda uppgifterna kommer från er egen faktura.';
  } else if (typ === 'okand') {
    rubrik = `Avtalet med ${sup} löper till ${svDatum(k.slutdatum)}`;
    subject = `${supplier}-avtalet löper till ${svDatum(k.slutdatum)} — kontrollera uppsägningstiden`;
    brodtext = `Er faktura anger slutdatumet men inte uppsägningstiden. Den står i ert avtal och avgör sista dagen att säga upp — `
      + `som kan ha infallit eller infalla långt före ${svDatum(k.slutdatum)}. Kontrollera avtalet nu, eller dela det med oss så räknar vi fram datumet.`;
  } else {
    throw new Error(`paminnelseMejl: okänd typ ${typ}`);
  }
  const besp = underlag.besparing
    ? `<p style="font-size:15px;color:#5C6E68;margin:0 0 16px">Vid analysen den ${svDatum(underlag.besparing.analysDatum)} visade Arvo en möjlig nettobesparing på <strong style="color:#1B7A6E">${fmtNumber(underlag.besparing.netto)} kr/år</strong>.</p>`
    : '';
  const html = `
    <div style="font-family:-apple-system,Arial,sans-serif;max-width:520px;margin:0 auto;padding:40px 24px;color:#0E1A17">
      <img src="${baseUrl}/logo.png" alt="Arvo Flow" style="height:28px;margin-bottom:32px" />
      <p style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#D97706;margin:0 0 12px">Avtalsklockan · ${sup}</p>
      <h2 style="font-size:22px;font-weight:800;margin:0 0 12px;letter-spacing:-0.02em;line-height:1.3">${rubrik}</h2>
      <p style="color:#5C6E68;font-size:15px;line-height:1.65;margin:0 0 16px">${brodtext}</p>
      ${besp}
      <a href="${baseUrl}/portfolio" style="display:inline-block;padding:14px 28px;border-radius:100px;background:linear-gradient(135deg,#2BC4AC 0%,#1B7A6E 100%);color:#fff;font-weight:700;font-size:14px;text-decoration:none;margin-bottom:24px">Öppna ert rum →</a>
      <hr style="border:none;border-top:1px solid #E5E7EB;margin:28px 0" />
      <p style="color:#9CA3AF;font-size:12px;line-height:1.5;margin:0">
        Ni får det här mejlet för att Arvo bevakar ert avtal med ${sup}.<br>
        <a href="${baseUrl}/avsluta-bevakning?id=${esc(underlag.id)}" style="color:#9CA3AF">Avsluta bevakning</a>
      </p>
    </div>`;
  return { subject, html };
}
