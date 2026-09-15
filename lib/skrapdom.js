// lib/skrapdom.js — DOMEN ÖVER EN SKRAPAD PRISSIDA. Deterministisk, utan modell, och den
// vägrar hellre än gissar (SD-01..12).
//
// ══ VARFÖR (grundarbeslut 2026-09-15, den kommersiella doktrinen) ═══════════════════════════
// *«Verifierade listpriser är inte vår vallgrav, men de är BROFÄSTET. Du MÅSTE ut på nätet och
// hämta priserna — men som en 0,1%-arkitekt, inte som en hallucinerande agent.»*
//
// Skrapan får därför ALDRIG gissa. Domen bor här som en REN funktion, skild från hämtningen, av
// exakt det skäl bibeln upprepar: en svit som bara kan köras mot nätet körs aldrig, och en dom
// som inte kan prövas är ett påstående. `scripts/skrapa-serverhosting.mjs` hämtar tecknen;
// den här modulen avgör om de får kallas ett pris.
//
// ── DE FEM FÄLLORNA ÄR REDAN KÄNDA, OCH DE GÄLLER HÄR OCKSÅ ─────────────────────────────────
// Prisboksvakterna stängde dem 6 augusti: PAKET (Copilot-priset draget som planpris), KAMPANJ
// (rabattpris läst som listpris), BELOPP (månad/år förväxlade), SEAT (fel enhetsantal) och
// HÄNGNING (en sida utan utfall). Domen nedan bär motsvarigheten till var och en — men den
// viktigaste regeln är enklare än alla fem:
//
//   **ETT TVETYDIGT PRIS ÄR INGET PRIS.** Två olika belopp i samma planblock, en okänd valuta,
//   eller en momsbas som inte står skriven → `blockerar`. Aldrig ett val, aldrig ett medelvärde,
//   aldrig «det som ser rimligast ut». Tystnad är svaret, och skälet namnges.
//
// ── MOMSBASEN LÄSES, ALDRIG ANTAS ───────────────────────────────────────────────────────────
// Bibeln, 12 augusti: prompten lät AI:n dividera med 1,25 på en ANTAGEN sats, varefter det inte
// längre gick att se vad sidan sa. Samma fälla här. Står det varken «exkl» eller «inkl moms» på
// sidan är basen OKÄND, och ett pris vars bas är okänd kan inte jämföras med kundens fakturarad.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: en sida som renderade men saknar planer (DOM:en ändrad); ett planblock med fler än
//     ett belopp; en okänd eller saknad valuta; en oskriven momsbas; ett pris utanför det
//     deklarerade sanitetsbandet; för få planer för att sidan ska vara den prislista vi tror.
//   BLIND: den ser SYNTAX, aldrig att ett giltigt pris hör till rätt PRODUKT (SD-12). Att
//     «2 GB RAM · 199 kr/mån» står på sidan bevisar inte att 199 kr är månadspriset för just
//     den planen — bara att de två stod nära varandra. Den sista milen är en människa som
//     öppnar sidan. Domen producerar därför ett FÖRSLAG, aldrig ett verifierat listpris.

/** Ett pris under detta är inte en hostingplan — det är en adressavgift eller ett stycktillägg. */
export const SANITET_MIN_KR = 20;
/** Och över detta är det en dedikerad server eller ett årspris draget som månad. */
export const SANITET_MAX_KR = 20000;
/** Färre planer än så är inte en prislista — då har DOM:en ändrats eller vi läser fel sida. */
export const MIN_PLANER = 3;

/** Momsbasen får bara vara något sidan FAKTISKT skriver. `okand` är ett eget utfall. */
export const MOMSBAS = Object.freeze(['exkl', 'inkl', 'okand']);

/**
 * Läs momsbasen ur sidans text. Returnerar 'exkl' | 'inkl' | 'okand'.
 *
 * Säger sidan BÅDA sakerna är svaret `okand` — två motsägande uppgifter är inte mer information
 * än ingen uppgift, de är mindre. (Samma rad som USD-fakturan som anger både «Moms (25 %)» och
 * «reverse charge», 12 augusti.)
 */
export function lasMomsbas(text) {
  const t = String(text ?? '').toLowerCase();
  const exkl = /\b(exkl\.?|exklusive|utan)\s*moms\b/.test(t) || /\bpriser\s+anges\s+exkl/.test(t);
  const inkl = /\b(inkl\.?|inklusive)\s*moms\b/.test(t);
  if (exkl && inkl) return 'okand';
  if (exkl) return 'exkl';
  if (inkl) return 'inkl';
  return 'okand';
}

/**
 * Döm en skrapad prissida.
 *
 * @param {object} indata
 * @param {string} indata.url        varifrån tecknen kom
 * @param {string} indata.sidtext    sidans renderade text (för momsbas och valuta)
 * @param {Array<{plan: string, belopp: number[]}>} indata.planer
 *        ett block per plan, med ALLA belopp blocket bar — aldrig ett förvalt
 * @returns {{blockerar: boolean, kod: string, skal: string, forslag: object|null}}
 */
export function skrapdom({ url, sidtext, planer } = {}) {
  const text = String(sidtext ?? '');

  // ── Kom skrapan fram? En tom sida är «jag läste inte», aldrig «inga planer». ───────────────
  if (text.length < 400) {
    return { blockerar: true, kod: 'sidan_oläsbar', forslag: null,
      skal: `sidan gav ${text.length} tecken — det är ett utfall om HÄMTNINGEN, aldrig om priset` };
  }
  if (!Array.isArray(planer)) {
    return { blockerar: true, kod: 'ogiltig_indata', forslag: null, skal: 'planer är inte en lista — domen kördes aldrig' };
  }

  // ── Valutan måste stå SKRIVEN. Ett tal utan valuta är inget pris. ──────────────────────────
  const harSek = /\b(kr|sek)\b/i.test(text);
  const harAnnan = /[$€£]|\b(usd|eur|gbp)\b/i.test(text);
  if (!harSek) {
    return { blockerar: true, kod: 'ingen_sek', forslag: null,
      skal: 'sidan skriver ingen SEK-valuta — ett SEK-golv får aldrig härledas ur en runtime-kurs' };
  }

  // ── Är det här ens en prislista? ───────────────────────────────────────────────────────────
  if (planer.length < MIN_PLANER) {
    return { blockerar: true, kod: 'for_fa_planer', forslag: null,
      skal: `${planer.length} plan(er) hittades, kräver ${MIN_PLANER} — DOM:en har sannolikt ändrats` };
  }

  // ── Varje plan måste bära EXAKT ett belopp. ────────────────────────────────────────────────
  // Två belopp i samma block betyder att sidan visar månad OCH år, eller ordinarie OCH kampanj.
  // Vilketdera går inte att avgöra härifrån — och att välja det lägre vore att välja åt vårt
  // eget håll (ett lägre golv ökar påvisad överbetalning och därmed vår success fee). Regel 3
  // känner ingen avvägning: tvetydigt är tyst.
  const tvetydiga = planer.filter((p) => (p?.belopp?.length ?? 0) !== 1);
  if (tvetydiga.length) {
    return { blockerar: true, kod: 'tvetydigt_pris', forslag: null,
      skal: `${tvetydiga.length} plan(er) bar inte exakt ett belopp: `
        + tvetydiga.slice(0, 4).map((p) => `${p.plan}=[${(p.belopp ?? []).join(', ')}]`).join(' · ') };
  }

  // ── Sanitetsbandet dödar enhets- och periodfel. ────────────────────────────────────────────
  const utanfor = planer.filter((p) => p.belopp[0] < SANITET_MIN_KR || p.belopp[0] > SANITET_MAX_KR);
  if (utanfor.length) {
    return { blockerar: true, kod: 'utanfor_band', forslag: null,
      skal: `${utanfor.length} pris utanför ${SANITET_MIN_KR}–${SANITET_MAX_KR} kr/mån: `
        + utanfor.slice(0, 4).map((p) => `${p.plan}=${p.belopp[0]}`).join(' · ') };
  }

  // ── Momsbasen LÄSES. Okänd bas = inget jämförbart pris. ────────────────────────────────────
  const momsbas = lasMomsbas(text);
  if (momsbas === 'okand') {
    return { blockerar: true, kod: 'momsbas_okand', forslag: null,
      skal: 'sidan skriver varken exkl eller inkl moms (eller säger båda) — ett pris vars bas är '
        + 'okänd kan inte ställas mot kundens fakturarad' };
  }

  const sorterade = [...planer].sort((a, b) => a.belopp[0] - b.belopp[0]);
  return {
    blockerar: false,
    kod: 'forslag',
    skal: `${planer.length} planer lästa, alla entydiga`,
    // ⚠️ FÖRSLAG, ALDRIG ETT VERIFIERAT LISTPRIS. Ordet «verifierat» måste förtjänas: en människa
    // öppnar sidan och bekräftar att beloppet hör till planen, och FÖRST då går talet in i
    // prisboken med källa och datum. Domen kan se att tecknen är entydiga — aldrig att de är rätt.
    forslag: {
      url,
      momsbas,
      valutaVarning: harAnnan ? 'sidan bär även annan valuta — kontrollera att beloppen är SEK' : null,
      antalPlaner: planer.length,
      billigaste: { plan: sorterade[0].plan, kronorPerManad: sorterade[0].belopp[0] },
      dyraste: { plan: sorterade.at(-1).plan, kronorPerManad: sorterade.at(-1).belopp[0] },
      alla: sorterade.map((p) => ({ plan: p.plan, kronorPerManad: p.belopp[0] })),
    },
  };
}
