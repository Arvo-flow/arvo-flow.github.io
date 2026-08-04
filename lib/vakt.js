// lib/vakt.js — Vaktens hjärtslag (1C). Gör radarns "senaste svep" och kvittona till VERKLIGA
// tidsstämplade händelser, inte härledd text.
//
// Zero Trust / anti-Potemkin: hjärtslaget får ALDRIG vara en tom tidsstämpel skriven varje natt
// "för syns skull" — det vore precis det fejkflöde bibeln förbjuder. Varje vakt_event registreras
// FRÅN ett verkligt svep: scripts/price-monitor.mjs sveper ~40 leverantörssidor med Playwright varje
// natt och skriver /tmp/price-monitor-report.json (passed/warnings/alerts) oavsett utfall.
// record-vakt-sweep.mjs läser den rapporten → en rad här. Siffrorna är vad maskinen FAKTISKT gjorde.

import { getDb } from './db.js';

// Härled svepets sammanfattning ur price-monitor-rapporten. Ren funktion (testbar offline):
//   sources      = distinkta leverantörssidor som svepts (passed + warnings + alerts)
//   pricePoints  = totalt antal priskontroller som kördes
//   changes      = verkliga avvikelser (alerts) — 0 = "allt lugnt", det premiumladdade tysta svepet
export function sweepSummaryFromReport(report) {
  if (!report || typeof report !== 'object' || !report.runAt) return null;
  const passed   = Array.isArray(report.passed)   ? report.passed   : [];
  const warnings = Array.isArray(report.warnings) ? report.warnings : [];
  const alerts   = Array.isArray(report.alerts)   ? report.alerts   : [];
  const all = [...passed, ...warnings, ...alerts];
  if (all.length === 0) return null;                       // inget svept → inget hjärtslag att påstå
  const sources = new Set(all.map((x) => x && x.supplier).filter(Boolean)).size;
  return {
    sweptAt:     report.runAt,
    sources:     sources || all.length,
    pricePoints: all.length,
    changes:     alerts.length,
    detail:      { passed: passed.length, warnings: warnings.length, alerts: alerts.length },
  };
}

// ── KEDJAN · vaktens obrutna nätter (grundarbeslut 2026-08-04) ───────────────
//
// BAKGRUND — smygtystnaden: 19–31 juli 2026 svepte vakten varje natt, men databasens kvot var
// slut och skrivningen misslyckades. Registreringen returnerade exit 0. Vakten förlorade minnet i
// TRETTON nätter utan att något larmade — exakt den tysta, gradvisa försämring vi säljer skydd mot.
// Vi hade en vakt utan vakt.
//
// SVARET: hjärtslaget slutar bevisa EN natt och börjar bevisa UTHÅLLIGHET. Kedjan räknas ur
// vakt_events och kan inte fejkas — ett gap nollställer den, synligt på framsidan i stället för i
// ett CI-mail ingen läser. Ett tal som kan genera oss är ett tal som går att lita på.
//
// INGEN BACKFILL, MEDVETET: svepen 19–31 juli KÖRDES (GitHub Actions), men vi kan inte BEVISA dem
// ur vår egen data. "Verifierat måste förtjänas, aldrig påstås" gäller oss själva hårdast — därför
// räknar kedjan bara nätter vakten faktiskt registrerade. Den står på tre, och växer med en per natt.

// Ett svep är färskt i 36 h: svepet går 21:00 UTC, så ett dygns marginal räcker för en sen körning
// men aldrig för en missad natt. Äldre än så → vi gör INGET aktualitetspåstående alls.
export const SWEEP_FRESH_HOURS = 36;

export function isSweepFresh(sweptAt, now = new Date()) {
  const t = new Date(sweptAt).getTime();
  if (!Number.isFinite(t)) return false;
  const age = new Date(now).getTime() - t;
  if (age < -3600e3) return false;                         // stämpel i framtiden = datafel, aldrig "färsk"
  return age <= SWEEP_FRESH_HOURS * 3600e3;
}

const dayKey = (d) => new Date(d).toISOString().slice(0, 10);
const dayNum = (key) => Math.round(Date.parse(`${key}T00:00:00Z`) / 86400000);

// Svep-tidsstämplar → { nights, fresh, latest }. `nights` = obrutna dygn bakåt från senaste svepet.
// Flera svep samma dygn (manuell dispatch) räknas som ETT. Är senaste svepet inte färskt är kedjan
// per definition bruten → nights 0, och kundytan gör inget påstående om att vakten är vaken.
export function sweepStreak(sweptAts, now = new Date()) {
  const stamps = (sweptAts || []).map((x) => new Date(x)).filter((d) => !Number.isNaN(d.getTime()));
  if (stamps.length === 0) return { nights: 0, fresh: false, latest: null };
  const latest = new Date(Math.max(...stamps.map((d) => d.getTime())));
  if (!isSweepFresh(latest, now)) return { nights: 0, fresh: false, latest: latest.toISOString() };
  const keys = [...new Set(stamps.map(dayKey))].sort().reverse();
  let nights = 1;
  for (let i = 1; i < keys.length; i += 1) {
    if (dayNum(keys[i - 1]) - dayNum(keys[i]) !== 1) break; // första hålet stänger kedjan
    nights += 1;
  }
  return { nights, fresh: true, latest: latest.toISOString() };
}

async function ensureTable(db) {
  await db`CREATE TABLE IF NOT EXISTS vakt_events (
    id           BIGSERIAL PRIMARY KEY,
    event_type   TEXT NOT NULL DEFAULT 'sweep',
    swept_at     TIMESTAMPTZ NOT NULL,
    sources      INT,
    price_points INT,
    changes      INT,
    detail       JSONB,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  await db`CREATE INDEX IF NOT EXISTS vakt_events_swept_idx ON vakt_events (swept_at DESC)`;
}

// Registrera ett svep (anropas av record-vakt-sweep.mjs efter en verklig price-monitor-körning).
// Returnerar en STATUS, inte en boolean: anroparen måste kunna skilja "ingen databas konfigurerad"
// (odramatiskt) från "databasen finns men vägrade skriva" (vaktens minne är trasigt → larma).
// Det var precis den skillnaden som saknades under smygtystnaden i juli.
export async function recordSweep(summary) {
  const db = getDb();
  if (!db) return 'no-db';
  if (!summary || !summary.sweptAt) return 'no-sweep';
  try {
    await ensureTable(db);
    await db`
      INSERT INTO vakt_events (event_type, swept_at, sources, price_points, changes, detail)
      VALUES ('sweep', ${summary.sweptAt}, ${summary.sources ?? null}, ${summary.pricePoints ?? null},
              ${summary.changes ?? null}, ${summary.detail ? JSON.stringify(summary.detail) : null})
    `;
    return 'ok';
  } catch (err) {
    console.error('[vakt] recordSweep:', err.message);
    return 'error';
  }
}

// Vaktens hälsa: senaste svepet PLUS kedjan. Driver hjärtslaget i rummet och på landningssidan.
// null → ytan faller tillbaka på den generiska meningen (aldrig ett påstått klockslag).
export async function getVaktHealth(now = new Date()) {
  const db = getDb();
  if (!db) return null;
  try {
    // 400 rader räcker för >ett års obruten kedja; kedjan bryts ändå vid första hålet.
    const rows = await db`
      SELECT swept_at, sources, price_points, changes
      FROM vakt_events
      WHERE event_type = 'sweep'
      ORDER BY swept_at DESC
      LIMIT 400
    `;
    if (!rows.length) return null;
    const streak = sweepStreak(rows.map((r) => r.swept_at), now);
    const r0 = rows[0];
    return {
      sweptAt: new Date(r0.swept_at).toISOString(),
      sources: r0.sources,
      pricePoints: r0.price_points,
      fresh: streak.fresh,
      streakNights: streak.nights,
      // ALL CLEAR — den ENDA slutsats vi får dra ur `changes` innan verifieringsjuryn körts.
      // NOLL detektioner ger bevisbart noll marknadsrörelser (juryn kan bara minska antalet), så
      // "allt lugnt" är sant. Ett POSITIVT antal säger däremot ingenting: 21 av 43 prispunkter tre
      // nätter i rad är detektorbrus, inte marknaden. Därför lämnar råtalet aldrig den här modulen —
      // det som inte får sägas ska inte heller kunna renderas av misstag (regel 3).
      allClear: r0.changes === 0,
    };
  } catch {
    return null;
  }
}

// Senaste svepet, RÅTT — endast för intern diagnos (scripts/probe-vakt.mjs) och självdiagnosen i
// record-vakt-sweep.mjs. Kundytor läser ALDRIG härifrån: de ska gå via getVaktHealth(), som bär
// färskhetsgrinden och kedjan. Råtalet `changes` returneras därför inte alls — det som inte får
// sägas ska inte heller kunna renderas av misstag (tre ytor hade hunnit rendera det innan vi såg det).
export async function getLatestSweep() {
  const db = getDb();
  if (!db) return null;
  try {
    const rows = await db`
      SELECT swept_at, sources, price_points
      FROM vakt_events
      WHERE event_type = 'sweep'
      ORDER BY swept_at DESC
      LIMIT 1
    `;
    const r = rows[0];
    if (!r) return null;
    return { sweptAt: r.swept_at, sources: r.sources, pricePoints: r.price_points };
  } catch {
    return null;                                           // tabell saknas ännu → tyst fallback (ingen brus-logg)
  }
}
