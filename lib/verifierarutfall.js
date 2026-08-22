// lib/verifierarutfall.js — VAD BETYDER EN VERIFIERARES SVAR?
//
// Beslutet bodde inline i scripts/verify.mjs och kunde därför bara prövas genom att läsa
// källtext. Obduktionen 2026-08-20 visade varför det inte räcker: sabotaget som stängde av
// skip-kravet lämnade ordet `skippSkal` kvar i en console.log, och den källtextvakten förblev
// grön. En vakt som inte fäller för sitt eget sabotage är ingen vakt.
//
// Beslutet är nu en ren funktion som både fabriken och sviten anropar (regel 1).
//
// TRE UTFALL, och bara ett av dem är tystnad:
//   'gron'   — checkar finns och alla håller
//   'rott'   — drift, oåtkomlig källa, noll checkar, ELLER en skip utan deklarerat skäl
//   'vantar' — en DEKLARERAD strukturell orsak (t.ex. saknad credential)
//
// Varför skip-kravet finns: lib/verifiers/atlassian.mjs returnerade `{ skipped: true }` när den
// läst NOLL tal ur källan — exakt det tillstånd `!checks.length` finns för att göra rött. En
// verifierare kunde alltså tysta sig själv, och fabriken lyste grönt medan en prisbokspost stod
// obevakad. Sommaren 2026 kostade det mönstret 16 dygn av oupptäckta smyghöjningar.

export const UTFALL = { GRON: 'gron', ROTT: 'rott', VANTAR: 'vantar' };

/** core.mjs skriver '(saknas)' i `actual` när värdet inte gick att läsa ur källan. Det är EN
 *  sträng, satt på ett ställe (numCheck/presenceCheck) — inte en gissning om texten. */
const SAKNAS_RE = /^\(saknas\)$/;

/**
 * @param {object} res - verifierarens returvärde
 * @returns {{ utfall: string, skal: string|null, drift: number }}
 */
export function bedomVerifierarutfall(res) {
  const r = res ?? {};
  const checks = Array.isArray(r.checks) ? r.checks : [];

  if (r.skipped) {
    // En skip UTAN deklarerat skäl är en självutfärdad dispens från den röda grinden.
    if (typeof r.skippSkal !== 'string' || !r.skippSkal.trim()) {
      return { utfall: UTFALL.ROTT, drift: 0,
        skal: 'skipped utan deklarerat skäl (skippSkal) — en vakt får inte tysta sig själv' };
    }
    // Och skälet får aldrig vara "jag hittade inget": det är precis vad rött betyder.
    if (checks.length === 0 && /hittade\s+ing|noll\s+check|inga\s+check|inget\s+att\s+verifiera/i.test(r.skippSkal)) {
      return { utfall: UTFALL.ROTT, drift: 0,
        skal: '"hittade inget" är rött, inte väntande — källan kunde inte verifieras' };
    }
    return { utfall: UTFALL.VANTAR, skal: r.skippSkal.trim(), drift: 0 };
  }

  if (r.fatal) return { utfall: UTFALL.ROTT, skal: 'källa oåtkomlig/parse-fel — kan inte verifiera', drift: 0 };
  if (checks.length === 0) return { utfall: UTFALL.ROTT, skal: 'noll checkar — inget verifierades', drift: 0 };

  // ── «KUNDE INTE LÄSA» ÄR INTE «HAR DRIVIT» (2026-08-22) ─────────────────────────────────────
  // Google-vakten rapporterade tre gånger `✗ DRIFT … prisbok finns · live (saknas)` och
  // «3 post(er) har drivit». Priserna hade inte drivit — sidan gick inte att läsa (core.mjs
  // sätter actual '(saknas)' när värdet uteblir, och den checken är `ok: false` precis som en
  // verklig avvikelse). Femton minuter tidigare hade samma vakt läst samma sida grönt.
  //
  // Båda tillstånden är RÖDA — vi kan inte bekräfta priset i något av dem — men de kräver rakt
  // MOTSATTA åtgärder: drift betyder «rätta prisboken», oläsbar betyder «laga vakten eller
  // kolla sidan». Och ett larm som säger att priset ändrats när det inte har det urholkar varje
  // framtida larm. Det är exakt så smyghöjningsvakten blev avstängd 20 juli, till en kostnad av
  // 16 dygn osedda prishöjningar.
  const olasbara = checks.filter((c) => !c?.ok && SAKNAS_RE.test(String(c?.actual ?? '')));
  const drivna   = checks.filter((c) => !c?.ok && !SAKNAS_RE.test(String(c?.actual ?? '')));
  if (drivna.length > 0 || olasbara.length > 0) {
    const delar = [];
    if (drivna.length > 0) delar.push(`${drivna.length} post(er) har drivit`);
    if (olasbara.length > 0) delar.push(`${olasbara.length} post(er) kunde inte läsas ur källan`);
    return {
      utfall: UTFALL.ROTT, skal: delar.join(' · '),
      drift: drivna.length, olasbara: olasbara.length,
    };
  }
  return { utfall: UTFALL.GRON, skal: null, drift: 0, olasbara: 0 };
}
