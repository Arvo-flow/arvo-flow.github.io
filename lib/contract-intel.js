// lib/contract-intel.js — AVTALS-INTELLIGENSEN (C1): den deterministiska kärnan.
//
// Arkitekturen (formad av avtalskorpus-sonden, ops/probe-avtal-corpus.txt 2026-07-03):
// svenska B2B-avtal delar sig i TVÅ dokumentklasser med olika sanningsbärare —
//
//   1. ALLMÄNNA VILLKOR (publika, per leverantör) bär REGLERNA: uppsägningstid,
//      förlängningsmekanik, brytavgiftsmodell. Bahnhof ordagrant: "Uppsägningstid är tre (3)
//      månader. Efter Avtalstiden förlängs Avtalstiden automatiskt löpande med tre (3) månader"
//      och "slutfakturera för återstående avtalstid" (= brytavgiftsmodellen). Dessa kureras
//      EN gång per leverantör i VILLKORSBOKEN nedan (prisbokens syskon: källa + citat +
//      verifieringsdatum på varje post — regel 3).
//
//   2. INDIVIDUELLA AVTALET (kundens dokument) bär DATUMEN: leveransdag/avtalsstart och
//      avtalstidens längd ("Tjänstens Avtalstid anges i Avtalet och räknas från Tjänstens
//      leveransdag" — Bahnhofs egna villkor). AI läser dessa få fält; koden ACCEPTERAR
//      (acceptExtractedContract) och räknar (computeContractClock). AI:n räknar ALDRIG (regel 2).
//
// Sondens bevis för läsdelningen: Telias tvåspalts-PDF:er förvanskas av rå textextraktion
// (kolumner flätas mitt i meningar) — deterministisk regex på rå avtalstext är strukturellt
// skör; probabilistisk läsning + deterministisk acceptans är arkitekturen (jfr fakturapipen).
//
// RELATION TILL lib/contract-clock.js (regel 1 — EN visningssanning): contract-clock är
// VISNINGSFYNDET för ett redan känt bindningsslut (servicePeriodEnd ur fakturan). Den här
// modulen är MOTORN som räknar fram det datumet ur avtalets regler (start + längd + uppsägning
// + förlängning). Vid inkoppling matar computeContractClock().deadline/currentPeriodEnd samma
// fynd/timeline-väg — bygg ALDRIG en andra visningsväg.

// ── VILLKORSBOKEN ────────────────────────────────────────────────────────────────
// Kurerade, KÄLLBELAGDA regler per leverantör. En post får ENDAST läggas in med källa-URL,
// ordagrant citat och verifieringsdatum (maskinvaktad i tests/contract-intel.mjs).
// Telia: klausulerna kräver renare läsning (tvåspalts-förvanskning) — POST SAKNAS MEDVETET
// tills citatet kan beläggas ordagrant (hellre lucka än gissning, regel 4).
export const VILLKORSBOK = {
  bahnhof: {
    supplier: 'Bahnhof',
    uppsagningstidMan: 3,
    forlangningMan: 3,                       // automatisk löpande förlängning efter avtalstiden
    brytavgiftModell: 'aterstaende-avtalstid', // "slutfakturera för återstående avtalstid"
    avgiftsAviseringDagar: 30,
    kalla: 'https://www.bahnhof.se/filestorage/userfiles/Villkor/bahnhof-villkor-allmanna-foretag-brf-fastighet-se.pdf',
    citat: 'Uppsägningstid är tre (3) månader. Efter Avtalstiden förlängs Avtalstiden automatiskt löpande med tre (3) månader.',
    verifierad: '2026-07-03',
  },
};

export function villkorForSupplier(nameOrKeyword) {
  const s = String(nameOrKeyword || '').toLowerCase();
  for (const [key, post] of Object.entries(VILLKORSBOK)) {
    if (s.includes(key)) return post;
  }
  return null;
}

// ── Datumaritmetik (ren, klampad) ───────────────────────────────────────────────
const DAY_MS = 24 * 3600 * 1000;
const isoDate = (d) => d.toISOString().slice(0, 10);

function parseIso(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(s || ''))) return null;
  const d = new Date(`${s}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}

// Månadsaddition med dagklampning: 31 jan + 1 mån = 28/29 feb (aldrig 2/3 mars).
export function addMonths(date, months) {
  const y = date.getUTCFullYear(), m = date.getUTCMonth(), day = date.getUTCDate();
  const target = new Date(Date.UTC(y, m + months, 1));
  const daysInTarget = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate();
  target.setUTCDate(Math.min(day, daysInTarget));
  return target;
}

// ── ACCEPTANSGRINDEN — AI-lästa fält släpps ALDRIG vidare overifierade (regel 2/4) ──
// Fälten: avtalsstart (leveransdag, ISO), avtalstidMan (initial bindning i månader).
// Reglerna (uppsägning/förlängning) kommer ur villkorsboken eller — om lästa ur dokumentet —
// valideras mot samma band. Returnerar { ok, fields } eller { ok:false, reason }.
export function acceptExtractedContract({ avtalsstart, avtalstidMan, uppsagningstidMan = null, forlangningMan = null } = {}, { today = new Date() } = {}) {
  const start = parseIso(avtalsstart);
  if (!start) return { ok: false, reason: 'avtalsstart saknas eller är inte ett giltigt ISO-datum' };
  // Rimlighetsband: starten får inte ligga i framtiden (>60 dagar — leverans kan vara nära förestående)
  // och inte mer än 15 år bakåt (äldre avtal än så är inte en levande bindning att räkna på).
  if (start.getTime() > today.getTime() + 60 * DAY_MS) return { ok: false, reason: 'avtalsstart ligger orimligt långt fram i tiden' };
  if (start.getTime() < today.getTime() - 15 * 365.25 * DAY_MS) return { ok: false, reason: 'avtalsstart äldre än 15 år — utanför rimlighetsband' };

  const langd = Number(avtalstidMan);
  if (!Number.isInteger(langd) || langd < 1 || langd > 120) return { ok: false, reason: 'avtalstid utanför band (1–120 månader)' };

  const upps = uppsagningstidMan == null ? null : Number(uppsagningstidMan);
  if (upps != null && (!Number.isInteger(upps) || upps < 0 || upps > 12)) return { ok: false, reason: 'uppsägningstid utanför band (0–12 månader)' };
  if (upps != null && upps >= langd) return { ok: false, reason: 'uppsägningstid ≥ avtalstid — ologiskt avtal, kräver manuell läsning' };

  const forl = forlangningMan == null ? null : Number(forlangningMan);
  if (forl != null && (!Number.isInteger(forl) || forl < 0 || forl > 36)) return { ok: false, reason: 'förlängning utanför band (0–36 månader)' };

  return { ok: true, fields: { avtalsstart: isoDate(start), avtalstidMan: langd, uppsagningstidMan: upps, forlangningMan: forl } };
}

// ── KONTRAKTSKLOCKAN — ren deterministisk datumaritmetik (regel 2: kod räknar) ────
// Rullar automatiska förlängningar tills aktuell periods uppsägningsdeadline ligger framför oss.
// Returnerar allt kundytan/Switch behöver: periodslut, sista uppsägningsdag, dagar kvar, status.
//   status: 'window-open'  — uppsägning möjlig nu (deadline framför oss)
//           'expires'      — ingen förlängning: avtalet löper ut vid periodslut
//           'expired'      — ingen förlängning och slutet har passerat
export function computeContractClock({ avtalsstart, avtalstidMan, uppsagningstidMan, forlangningMan = null }, { today = new Date() } = {}) {
  const start = parseIso(avtalsstart);
  if (!start) return null;
  const upps = Number(uppsagningstidMan);
  const langd = Number(avtalstidMan);
  if (!Number.isInteger(langd) || langd < 1 || !Number.isInteger(upps) || upps < 0) return null;

  let periodEnd = addMonths(start, langd);
  let renewals = 0;
  const forl = forlangningMan == null ? null : Number(forlangningMan);

  if (forl == null || forl === 0) {
    // Ingen automatisk förlängning: avtalet löper ut.
    const daysToEnd = Math.ceil((periodEnd.getTime() - today.getTime()) / DAY_MS);
    return {
      currentPeriodEnd: isoDate(periodEnd),
      deadline: null,
      daysToDeadline: null,
      renewals: 0,
      status: daysToEnd >= 0 ? 'expires' : 'expired',
      daysToEnd,
    };
  }

  // Automatisk förlängning: deadline = periodslut − uppsägningstid. Har den passerat är perioden
  // redan förnyad — rulla tills deadline ligger framför oss (skydd: max 400 varv ≈ 100 års rullning).
  let deadline = addMonths(periodEnd, -upps);
  let guard = 0;
  while (deadline.getTime() < today.getTime() && guard++ < 400) {
    periodEnd = addMonths(periodEnd, forl);
    deadline = addMonths(periodEnd, -upps);
    renewals++;
  }

  return {
    currentPeriodEnd: isoDate(periodEnd),
    deadline: isoDate(deadline),
    daysToDeadline: Math.ceil((deadline.getTime() - today.getTime()) / DAY_MS),
    renewals,
    status: 'window-open',
    daysToEnd: Math.ceil((periodEnd.getTime() - today.getTime()) / DAY_MS),
  };
}
