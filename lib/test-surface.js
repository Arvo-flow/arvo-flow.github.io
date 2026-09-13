// lib/test-surface.js — isolerad TESTYTA för ingest-tester. Mail till en test-mottagaradress
// (t.ex. test@inbox.arvoflow.se) knyts till en FAST testidentitet — helt skild från riktig kunddata —
// och nollställs i början av varje testpass (auto). Så "N fakturor in → N analyser ut" går att läsa
// rent, och dup/tapp syns svart på vitt.
//
// SÄKERHET: all radering är HÅRDKODAD till testidentiteten (TEST_EMAIL) — kan aldrig röra annat data.

import { getDb } from './db.js';

// Mottagar-lokaldelar som aktiverar testytan (allt @inbox.arvoflow.se med denna lokaldel).
const TEST_LOCALPARTS = new Set(['test', 'testyta', 'nollstall', 'demo']);

// Fast, isolerad identitet. Alla testanalyser nycklas hit (ej avsändarens riktiga e-post).
export const TEST_EMAIL = 'testyta@arvoflow.se';
export const TEST_FINGERPRINT = 'mail:testyta';

const RESET_GAP_MIN = Number(process.env.TEST_SURFACE_RESET_GAP_MIN) || 15;

// ── TESTIDENTITETEN ÄR ETT BEGREPP, INTE EN E-POSTSTRÄNG (grundarbeslut 2026-09-11) ──────────
// Fable 5.1:s strategiska dom: «`segmentOkant` är fel grind för detta — den svarar på om SEGMENTET
// är avläst, inte på om FAKTURAN ÄR EN MARKNADSOBSERVATION. En testfaktura med korrekt segment är
// fortfarande en lögn om marknaden.»
//
// Skyddet som FANNS var en bieffekt: mail-in skickar `segmentOkant: true`, så testytans fakturor
// nådde aldrig prisboken. Men det skyddet gäller MAIL-VÄGEN, inte identiteten — en testfaktura
// uppladdad via `/testa-faktura` med vald bransch och storlek hade skrivit rakt in i moaten och
// förskjutit p25/medianen för en cell som redan bärs av ett fåtal skilda belopp.
//
// `arTestidentitet` är därför en EGEN fråga med ett eget svar, och `storeDatapoint` ställer den.
// Den läser ALDRIG `segmentOkant` och tvärtom — två frågor, två grindar, ingen av dem beroende
// av att den andra råkar vara satt.//
// ⚠️ `trim()` I POSTGRES ÄR `btrim` — DEN TAR BARA MELLANSLAG (rättat 2026-09-13 efter mätning).
// Granskaren startade en riktig PostgreSQL 16 och körde predikatet genom den verkliga satsen:
// `\ttest@inbox.arvoflow.se` och `test@inbox.arvoflow.se\n` BACKFILLADES in i prisboken medan
// `arTestidentitet` sa test — 7 glapp av 38 prövade former. `regexp_replace` med
// `[[:space:]]` stänger tabb, radbrytning, CR, VTAB och FF.
//
// KVARSTÅENDE GLAPP, UTTALAT: NBSP (U+00A0) och BOM (U+FEFF) räknas av JS `trim()` men inte av
// Postgres `[[:space:]]`. Nåbarheten är OBEVISAD åt båda hållen: varje `route='auto'`-skrivning
// passerar JS `.trim().toLowerCase()` innan den lagras, och mail-vägen avvisar varje blanksteg i
// adressen — men åtta anropare skickar rå `body.userEmail` och skiljs från moaten enbart av
// `route`. Det är därför ett känt hål, inte ett stängt.
export function arTestidentitet(userEmail) {
  if (typeof userEmail !== 'string') return false;          // null/undefined = anonym uppladdning, inte test
  const e = userEmail.toLowerCase().trim();
  if (!e) return false;
  if (e === TEST_EMAIL) return true;
  // Samma lokaldelar som aktiverar testytan i inkommande mejl — en adress som kan STARTA ett
  // testpass får aldrig kunna skriva till prisboken via en annan väg in.
  const [local, domain] = e.split('@');
  return domain === 'inbox.arvoflow.se' && TEST_LOCALPARTS.has(local?.replace(/\+.*$/, ''));
}

// ── SAMMA FRÅGA I SQL — HÄRLEDD UR SAMMA KONSTANTER (2026-09-13, ur granskningen) ─────────────
// Den fientliga granskningen mätte hålet: moat-satserna filtrerade `user_email <> TEST_EMAIL`,
// alltså EN sträng, medan `arTestidentitet` känner FEM adresser plus varje `+tag`-variant.
//
//     testyta@arvoflow.se           testidentitet: true  · SQL uteslöt: JA
//     test@inbox.arvoflow.se        testidentitet: true  · SQL uteslöt: NEJ   ← glapp
//     testyta@inbox.arvoflow.se     testidentitet: true  · SQL uteslöt: NEJ   ← glapp
//     nollstall@inbox.arvoflow.se   testidentitet: true  · SQL uteslöt: NEJ   ← glapp
//     demo@inbox.arvoflow.se        testidentitet: true  · SQL uteslöt: NEJ   ← glapp
//     test+bunt2@inbox.arvoflow.se  testidentitet: true  · SQL uteslöt: NEJ   ← glapp
//
// Fem av sex testidentiteter passerade grinden — rubriken «TESTIDENTITETEN ÄR ETT BEGREPP, INTE
// EN E-POSTSTRÄNG» återkollapsad till en e-poststräng i SQL-halvan, i samma commit som citerade
// beslutet. Nåbart: mail FRÅN `test@inbox.arvoflow.se` till produktionsinkorgen ger
// `identityEmail = avsändaren` och `route='auto'`.
//
// SVARET ÄR INTE EN LÄNGRE IN-LISTA — `+tag` gör mängden obegränsad, så en uppräkning kan inte
// bli komplett.  // pastaende-ok: resonemang om varför formen valdes, inte ett mekanikpåstående
// De två renderingarna HÄRLEDS i stället ur samma två konstanter. LV-04 kräver att varje
// moat-sats bär villkorets skelett tecken för tecken; LV-07 kräver att listorna inte är tomma och
// att varje post i dem faktiskt känns igen av `arTestidentitet`. En andra implementation utan ett
// likhetsbevis är en kopia som glider isär.
//
// ⚠️ KVARSTÅENDE, UTTALAT: maskinerna bevisar att kopiorna är IDENTISKA och att listorna är
// icke-tomma — aldrig att SQL:en BETYDER samma sak som `arTestidentitet`. Den likheten är läst
// av en människa, inte körd mot en databas.
//
// Ingen ny kolumn, med flit: en kolumn hade krävt migrering FÖRE deploy, och glappet däremellan
// är pdf_hash-fallet 10 september — varje moat-läsning hade kastat på en okänd kolumn.
//
// ── VARFÖR VILLKORET SKRIVS UT I VARJE SATS ─────────────────────────────────────────────────
// `@neondatabase/serverless` binder varje `${}` som en PARAMETER; det finns ingen väg att
// interpolera ett färdigt SQL-fragment. Villkoret MÅSTE därför stå i varje moat-sats, och det
// är per definition en kopia. Bibeln tillåter en kopia endast med en maskin som bevisar att
// kopiorna är identiska: LV-04 jämför varje moat-sats SKELETT mot `EJ_TESTIDENTITET_SKELETT`
// nedan (interpolationer och blanksteg normaliserade bort). En sats som stavar villkoret
// annorlunda — eller tappar det — fäller sviten.
export const TEST_EXAKTA = [TEST_EMAIL];
export const TEST_DOMAN = 'inbox.arvoflow.se';
export const TEST_LOKALDELAR = [...TEST_LOCALPARTS];

/**
 * Villkoret som varje `liggare: moat`-sats måste bära, som SKELETT: interpolationer ersatta med
 * `?` och blanksteg kollapsade. Det här är jämförelsenormen, inte körbar SQL.
 *
 * Formen i en sats ska vara exakt:
 *
 *   AND (user_email IS NULL OR NOT (
 *         lower(regexp_replace(user_email, '^[[:space:]]+|[[:space:]]+$', '', 'g')) = ANY(${TEST_EXAKTA})
 *         OR (split_part(lower(regexp_replace(user_email, '^[[:space:]]+|[[:space:]]+$', '', 'g')), '@', 2) = ${TEST_DOMAN}
 *             AND split_part(split_part(lower(regexp_replace(user_email, '^[[:space:]]+|[[:space:]]+$', '', 'g')), '@', 1), '+', 1) = ANY(${TEST_LOKALDELAR}))))
 */
export const EJ_TESTIDENTITET_SKELETT = normaliseraSQL(`
  (user_email IS NULL OR NOT (
    lower(regexp_replace(user_email, '^[[:space:]]+|[[:space:]]+$', '', 'g')) = ANY(?)
    OR (split_part(lower(regexp_replace(user_email, '^[[:space:]]+|[[:space:]]+$', '', 'g')), '@', 2) = ?
        AND split_part(split_part(lower(regexp_replace(user_email, '^[[:space:]]+|[[:space:]]+$', '', 'g')), '@', 1), '+', 1) = ANY(?))))
`);

/** Normalisera en SQL-sats till sitt skelett: `${…}` → `?`, alla blanksteg → ett mellanslag. */
export function normaliseraSQL(text) {
  return String(text).replace(/\$\{[^}]*\}/g, '?').replace(/\s+/g, ' ').trim();
}

const emailsFrom = (field) => {
  if (!field) return [];
  const arr = Array.isArray(field) ? field : [field];
  return arr.map((x) => (typeof x === 'string' ? x : x?.email)).filter(Boolean).map((s) => s.toLowerCase().trim());
};

// Är mejlet riktat till testytan? (kollar mottagaradressens lokaldel)
export function isTestRecipient(toField) {
  for (const e of emailsFrom(toField)) {
    const local = e.split('@')[0]?.replace(/\+.*$/, '');   // strippa ev. +tag
    if (TEST_LOCALPARTS.has(local)) return true;
  }
  return false;
}

// Forcerad nollställning — raderar testytan NU, oavsett gap (för att starta ett rent pass på begäran).
// Samma HÅRDKODADE omfång (TEST_EMAIL) som auto-reset → kan aldrig röra annan data. Returnerar {deleted, jobs}.
export async function forceResetTestSurface() {
  const db = getDb();
  if (!db) return { deleted: 0, jobs: 0 };
  const del = await db`DELETE FROM invoice_analyses /* liggare: internt: testytans egen städning — testrader är inte bevis */ WHERE user_email = ${TEST_EMAIL} RETURNING id`;
  let jobs = 0;
  try { const j = await db`DELETE FROM ingest_jobs WHERE sender = ${TEST_EMAIL} RETURNING id`; jobs = j.length; }
  catch { /* tabell kanske inte finns ännu */ }
  return { deleted: del.length, jobs };
}

// Nollställ testytan om ett NYTT pass börjar (ingen testaktivitet senaste RESET_GAP_MIN).
// En bunt över flera mejl inom gapet hänger ihop; ett senare pass börjar rent. Returnerar {reset, deleted}.
export async function resetTestSurfaceIfStale() {
  const db = getDb();
  if (!db) return { reset: false, deleted: 0 };
  try {
    // Senaste testaktivitet = senaste testanalys ELLER senaste test-jobb (täcker en pågående bunt).
    const [a] = await db`SELECT MAX(created_at) AS t FROM invoice_analyses /* liggare: internt: testytans egen tidsstämpel */ WHERE user_email = ${TEST_EMAIL}`;
    let lastJob = null;
    try { [lastJob] = await db`SELECT MAX(created_at) AS t FROM ingest_jobs WHERE sender = ${TEST_EMAIL}`; }
    catch { /* tabell kanske inte finns ännu */ }
    const last = [a?.t, lastJob?.t].filter(Boolean).map((x) => new Date(x).getTime());
    const newest = last.length ? Math.max(...last) : 0;
    const stale = !newest || (Date.now() - newest) > RESET_GAP_MIN * 60 * 1000;
    if (!stale) return { reset: false, deleted: 0 };

    // HÅRDKODAT till TEST_EMAIL — kan aldrig radera annat än testytan.
    const del = await db`DELETE FROM invoice_analyses /* liggare: internt: testytans egen städning — testrader är inte bevis */ WHERE user_email = ${TEST_EMAIL} RETURNING id`;
    try { await db`DELETE FROM ingest_jobs WHERE sender = ${TEST_EMAIL}`; } catch { /* non-fatal */ }
    return { reset: true, deleted: del.length };
  } catch (err) {
    console.error('[test-surface] resetIfStale:', err.message);
    return { reset: false, deleted: 0 };
  }
}
