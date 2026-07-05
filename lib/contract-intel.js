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
// Tele2: MEDVETET utelämnad — enda åtkomliga villkors-PDF:n är PRIVATtjänster (fel dokument-
// klass för företagskunder); posten läggs in när företagsvillkoren belagts (regel 4).
export const VILLKORSBOK = {
  bahnhof: {
    supplier: 'Bahnhof',
    uppsagningstidMan: 3,
    forlangningMan: 3,                       // automatisk löpande förlängning efter avtalstiden
    efterBindning: 'forlangning',            // modellen: rullande förlängning (jfr 'tillsvidare')
    brytavgiftModell: 'aterstaende-avtalstid', // "slutfakturera för återstående avtalstid"
    avgiftsAviseringDagar: 30,
    kalla: 'https://www.bahnhof.se/filestorage/userfiles/Villkor/bahnhof-villkor-allmanna-foretag-brf-fastighet-se.pdf',
    citat: 'Uppsägningstid är tre (3) månader. Efter Avtalstiden förlängs Avtalstiden automatiskt löpande med tre (3) månader.',
    verifierad: '2026-07-03',
  },
  telia: {
    supplier: 'Telia',
    // Tills-vidare-modellen: efter bindningstiden löper avtalet vidare; §19.6 ger varslet för
    // tills-vidare-läget. OBS: äldre villkorsversioner anger tre (3) månader — avtalets EGEN
    // uppsägningstid vinner alltid över boken (resolveContractRules), så gällande version bärs här.
    uppsagningstidMan: 1,
    forlangningMan: null,
    efterBindning: 'tillsvidare',
    brytavgiftModell: null,                 // ej ordagrant belagd ännu — kureras när klausulen är ren
    avgiftsAviseringDagar: null,
    kalla: 'https://www.telia.se/assets/m/2bcd4437783424fe/original/telias-allmanna-villkor-tjanster-foretag-260401.pdf',
    citat: '19.6 Om Avtalet gäller tills vidare utan särskild uppsägningstid får det skriftligen sägas upp med en (1) månads uppsägningstid.',
    verifierad: '2026-07-05',
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

// ── REGELUPPLÖSNINGEN — avtalets egna villkor vinner över villkorsboken (närmast källan) ──
// Returnerar { uppsagningstidMan|null, forlangningMan|null, kalla: 'avtalet'|'villkorsbok'|null }.
// Saknas båda → null-regler (ärligt: vi RÄKNAR då bara initial bindning, aldrig gissad förnyelse).
export function resolveContractRules(extracted = {}, villkorsbokPost = null) {
  const fromDoc = (v) => Number.isInteger(Number(v)) && v != null;
  const efterBindning = villkorsbokPost?.efterBindning ?? null;   // modellen kommer ur villkoren
  if (fromDoc(extracted.uppsagningstidMan)) {
    return {
      uppsagningstidMan: Number(extracted.uppsagningstidMan),
      forlangningMan: fromDoc(extracted.forlangningMan) ? Number(extracted.forlangningMan) : (villkorsbokPost?.forlangningMan ?? null),
      efterBindning,
      kalla: 'avtalet',
    };
  }
  if (villkorsbokPost) {
    return { uppsagningstidMan: villkorsbokPost.uppsagningstidMan, forlangningMan: villkorsbokPost.forlangningMan ?? null, efterBindning, kalla: 'villkorsbok' };
  }
  return { uppsagningstidMan: null, forlangningMan: null, efterBindning: null, kalla: null };
}

// ── UTFALLET — hela kedjan: accepterade fält + upplösta regler → klocka, ärligt vid luckor ──
// Kan reglerna inte lösas upp räknas ENDAST den initiala bindningen (start + längd) — ett
// faktum ur avtalet — med deadline null och regelKalla null. Aldrig en gissad förnyelse (regel 4).
export function computeContractOutcome(fields, rules, { today = new Date() } = {}) {
  if (!fields?.avtalsstart || !fields?.avtalstidMan) return null;

  // TILLS-VIDARE-MODELLEN (Telia/Tele2-klassen, sond v2/v3): efter bindningstiden löper avtalet
  // vidare utan slut, uppsägbart när som helst med uppsägningstiden som varsel. Före bindnings-
  // slutet är deadlinen (slut − varsel) vägen ut VID slutet; efter den är utgången alltid öppen
  // med varslet som enda fördröjning ('rolling' — ingen deadline-press, tidigaste utträde räknas).
  if (rules?.efterBindning === 'tillsvidare' && rules?.uppsagningstidMan != null) {
    const start = new Date(`${fields.avtalsstart}T00:00:00Z`);
    if (Number.isNaN(start.getTime())) return null;
    const DAY = 24 * 3600 * 1000;
    const end = addMonths(start, Number(fields.avtalstidMan));
    const deadline = addMonths(end, -Number(rules.uppsagningstidMan));
    if (today.getTime() <= deadline.getTime()) {
      return {
        currentPeriodEnd: end.toISOString().slice(0, 10),
        deadline: deadline.toISOString().slice(0, 10),
        daysToDeadline: Math.ceil((deadline.getTime() - today.getTime()) / DAY),
        renewals: 0, status: 'window-open',
        daysToEnd: Math.ceil((end.getTime() - today.getTime()) / DAY),
        regelKalla: rules.kalla,
      };
    }
    const earliestExit = new Date(Math.max(end.getTime(), addMonths(today, Number(rules.uppsagningstidMan)).getTime()));
    return {
      currentPeriodEnd: earliestExit.toISOString().slice(0, 10),   // tidigaste utträde = det datum bytet kan tajmas till
      deadline: null, daysToDeadline: null, renewals: 0, status: 'rolling',
      daysToEnd: Math.ceil((earliestExit.getTime() - today.getTime()) / DAY),
      regelKalla: rules.kalla,
    };
  }

  if (rules?.uppsagningstidMan != null) {
    const clock = computeContractClock({
      avtalsstart: fields.avtalsstart, avtalstidMan: fields.avtalstidMan,
      uppsagningstidMan: rules.uppsagningstidMan, forlangningMan: rules.forlangningMan,
    }, { today });
    return clock ? { ...clock, regelKalla: rules.kalla } : null;
  }
  // Regler okända: bara det initiala bindningsslutet (faktum ur dokumentet).
  const start = new Date(`${fields.avtalsstart}T00:00:00Z`);
  if (Number.isNaN(start.getTime())) return null;
  const end = addMonths(start, Number(fields.avtalstidMan));
  const daysToEnd = Math.ceil((end.getTime() - today.getTime()) / (24 * 3600 * 1000));
  return {
    currentPeriodEnd: end.toISOString().slice(0, 10),
    deadline: null, daysToDeadline: null, renewals: 0,
    status: daysToEnd >= 0 ? 'expires' : 'expired', daysToEnd, regelKalla: null,
  };
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
