// lib/analysstampel.js — VILKEN KOD FÄLLDE DOMEN PÅ DEN HÄR RADEN?
//
// ══ VARFÖR (grundarbeslut 2026-09-23) ══════════════════════════════════════════════════════
// Mätt i produktion (scripts/probe-fyndgrad.mjs): de sju utländska SaaS-fakturorna som Ring 1
// fällde var daterade 14 aug och 9 sep — samma dag som eller FÖRE valutafixen (28ecd62). Fixen
// fanns; raderna kördes aldrig om. Poäng och prisunderlag räknas vid LÄSNING och följer koden,
// men route, triage-skäl och kategori FRYSES vid skrivning. Varje fix sedan dess hade alltså
// inte rört en enda lagrad dom — och ingen kunde se det, för raden bar ingen uppgift om vilken
// kod som dömde den. `PIPELINE_VERSION` fanns i API-svaret men sparades aldrig.
//
// `created_at` räcker inte: en omkörning upsertar raden och LÅTER created_at stå kvar. Ett
// datum som inte rör sig när domen byts ut är ett tal vars namn lovar mer än värdet.
//
// ══ VAD STÄMPELN ÄR ════════════════════════════════════════════════════════════════════════
// `analyserad_sha` = deployens commit (Vercel sätter VERCEL_GIT_COMMIT_SHA), `analyserad_at` =
// när domen föll. Båda skrivs vid VARJE lagring, även en omkörning — det är hela poängen.
//
// Utan SHA (lokalt, i tester) skrivs `null`, aldrig en platshållare som «lokal». Ett okänt får
// inte se ut som ett giltigt värde — det är felfamiljen i sin renaste form (`?? 75`, `?? 72`,
// `employees: 10`).
//
// FÅNGAR: vilken kod som fällde varje lagrad dom, och när — så att en dom äldre än en fix syns.
// BLIND: stämpeln säger VILKEN commit, inte OM commiten ändrade just den här radens dom. Att en
//   rad är stämplad före en fix betyder att den KAN vara inaktuell, aldrig att den ÄR det.

/** Deployens commit, avkortad. `null` när den är okänd — aldrig en platshållare. */
export function analysversion(env = process.env) {
  const sha = String(env?.VERCEL_GIT_COMMIT_SHA ?? '').trim();
  return sha ? sha.slice(0, 12) : null;
}

/**
 * Stämplar en lagrad analys. Egen sats, egen catch (grundarregeln 11 sep: en huvudinsert får
 * aldrig bero på en kolumn som kanske inte är migrerad). Returnerar true/false så att anroparen
 * kan veta — ett tyst nollutfall är ingen handling (markPending, 23 sep).
 *
 * @param {Function} db  neon-taggad mall
 * @param {{ id?: string, fingerprintHash?: string, pdfHash?: string }} rad  id ELLER (fp-hash + pdf_hash)
 */
export async function stamplaAnalys(db, { id = null, fingerprintHash = null, pdfHash = null } = {}, env = process.env) {
  if (!db) return false;
  const sha = analysversion(env);
  try {
    if (id) {
      await db`UPDATE invoice_analyses SET analyserad_sha = ${sha}, analyserad_at = NOW() WHERE id = ${id}`;
      return true;
    }
    if (fingerprintHash && pdfHash) {
      await db`UPDATE invoice_analyses SET analyserad_sha = ${sha}, analyserad_at = NOW()
               WHERE fingerprint = ${fingerprintHash} AND pdf_hash = ${pdfHash}`;
      return true;
    }
    return false;
  } catch (err) {
    console.error('[analysstampel] stämpeln skrevs INTE (raden finns kvar utan den):', err.message);
    return false;
  }
}
