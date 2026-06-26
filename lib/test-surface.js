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

// Nollställ testytan om ett NYTT pass börjar (ingen testaktivitet senaste RESET_GAP_MIN).
// En bunt över flera mejl inom gapet hänger ihop; ett senare pass börjar rent. Returnerar {reset, deleted}.
export async function resetTestSurfaceIfStale() {
  const db = getDb();
  if (!db) return { reset: false, deleted: 0 };
  try {
    // Senaste testaktivitet = senaste testanalys ELLER senaste test-jobb (täcker en pågående bunt).
    const [a] = await db`SELECT MAX(created_at) AS t FROM invoice_analyses WHERE user_email = ${TEST_EMAIL}`;
    let lastJob = null;
    try { [lastJob] = await db`SELECT MAX(created_at) AS t FROM ingest_jobs WHERE sender = ${TEST_EMAIL}`; }
    catch { /* tabell kanske inte finns ännu */ }
    const last = [a?.t, lastJob?.t].filter(Boolean).map((x) => new Date(x).getTime());
    const newest = last.length ? Math.max(...last) : 0;
    const stale = !newest || (Date.now() - newest) > RESET_GAP_MIN * 60 * 1000;
    if (!stale) return { reset: false, deleted: 0 };

    // HÅRDKODAT till TEST_EMAIL — kan aldrig radera annat än testytan.
    const del = await db`DELETE FROM invoice_analyses WHERE user_email = ${TEST_EMAIL} RETURNING id`;
    try { await db`DELETE FROM ingest_jobs WHERE sender = ${TEST_EMAIL}`; } catch { /* non-fatal */ }
    return { reset: true, deleted: del.length };
  } catch (err) {
    console.error('[test-surface] resetIfStale:', err.message);
    return { reset: false, deleted: 0 };
  }
}
