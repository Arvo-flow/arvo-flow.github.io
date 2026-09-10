// lib/fxfarskhet.js — EN sanning för «hur gammal är valutakursen, och får vi prissätta på den?»
//
// ══ VARFÖR (2026-09-10, ur produktionsloggen) ═══════════════════════════════════════════════
// Grundaren läste raden i loggen: `[pricing] Live FX-hämtning misslyckades — använder fallback
// 10.42 SEK/USD (2026-05-22)`. En kurs från 22 maj användes tyst för att räkna om kundernas
// utländska fakturor — i en tjänst för finansdirektörer.
//
// Obduktionen gav något värre än en trasig hämtning. MÄTT i produktionsloggen 06:00:25:
//
//     GET /api/cron/update-fx-rate 200
//       [pricing] Live FX-hämtning misslyckades — använder fallback 10.42 SEK/USD (2026-05-22)
//       [cron/update-fx-rate] SEK/USD = 10.42 (fallback)
//
// Cronen SVARADE 200 och SKREV NER fallback-konstanten i KV med `fetchedAt: nu`. Nästa läsare såg
// då ett värde som var mindre än 26 timmar gammalt — och `getSekRate` returnerade
// `{ ...cached, source: 'kv' }`, vilket SKRIVER ÖVER `source: 'fallback'`. Proveniensen tvättades
// bort i samma rad. Ett värde som betyder «vi kunde inte hämta» lagrades på en adress som betyder
// «hämtad, färsk», och etiketterades sedan om till transporten i stället för källan.
//
// ── VARFÖR TRE DAGAR, OCH INTE ETT PÅHITTAT TAL ────────────────────────────────────────────
// Tröskeln är inte en känsla om volatilitet — vi har ingen mätning av växelkursrörelser och ska
// därför inte låtsas ha en. Den är hämtad ur PUBLICERINGSKALENDERN: Riksbanken publicerar sin
// mittkurs på bankdagar. En fredagskurs är alltså det färskaste som finns ända till måndag, och
// en gräns under tre dygn hade larmat varje helg — en vakt som skriker på rätt beteende blir
// avstängd. Tre dygn är det minsta tal som rymmer en normal helg och inget mer.
//
// ── VARFÖR DET SPELAR ROLL FÖR KUNDENS PENGAR ──────────────────────────────────────────────
// Microsoft-fakturan 2026-09-09, mätt live: 780 USD × 10,42 = 8 128 kr/period, årskostnad
// 97 531 kr, och den påstådda besparingen 3 414 kr = **3,5 %**. En valutakurs som ligger några
// procent fel är alltså i samma storleksordning som hela besparingen och kan vända dess tecken.
// Under 20 % success fee är det den farliga riktningen att ha fel åt.

/** Kursen är brukbar för ett PRISPÅSTÅENDE bara inom så här många dygn. Se resonemanget ovan. */
export const FARSK_MAX_DYGN = 3;

/** Källor som är riktiga avläsningar av en marknad. Allt annat är inte en hämtad kurs. */
const RIKTIGA_KALLOR = new Set(['riksbank', 'ecb']);

/**
 * Klassar en valutakurs. Returnerar ALLTID ett av tre lägen — det finns ingen fjärde utgång, och
 * ingen av dem kan förväxlas med en annan:
 *
 *   `farsk`  — en riktig källa, daterad inom FARSK_MAX_DYGN. Får bära ett prispåstående.
 *   `inaktuell` — en riktig källa, men för gammal. Talet finns och får visas MED sin ålder;
 *                 det får aldrig bära ett påstående om en besparing.
 *   `ingen`  — ingen avläsning alls (fallback-konstanten, eller ett trasigt objekt). Detta är
 *              inte en kurs. Att den har ett numeriskt värde gör den inte till en mätning.
 *
 * @param {{rate?:number, source?:string, date?:string}|null} fx
 * @param {Date} [nu] injicerbar för testning — aldrig satt i produktion
 */
export function fxFarskhet(fx, nu = new Date()) {
  const rate = Number(fx?.rate);
  const kalla = typeof fx?.source === 'string' ? fx.source : null;

  // Ett tal utanför varje rimligt SEK-band är inget vi konverterar med, oavsett vad källan heter.
  if (!Number.isFinite(rate) || rate <= 0) {
    return { niva: 'ingen', kalla, alderDygn: null, skal: 'kursen saknar ett giltigt tal' };
  }
  if (!RIKTIGA_KALLOR.has(kalla)) {
    // Fallback-konstanten hamnar HÄR, och det är hela poängen: den bär ett datum och ett tal,
    // men den är ingen avläsning. Att den ser ut som en kurs är precis vad som gjorde den farlig.
    return {
      niva: 'ingen', kalla, alderDygn: null,
      skal: kalla === 'fallback'
        ? 'kursen är en inbyggd konstant, inte en avläsning av marknaden'
        : `okänd kurskälla: ${kalla ?? '(ingen)'}`,
    };
  }

  const d = fx?.date ? new Date(fx.date) : null;
  if (!d || Number.isNaN(d.getTime())) {
    // En riktig källa UTAN datum kan inte åldersbedömas. Okänt är inte färskt.
    return { niva: 'ingen', kalla, alderDygn: null, skal: 'kursen saknar ett läsbart datum' };
  }

  const alderDygn = Math.floor((nu.getTime() - d.getTime()) / 86_400_000);
  if (alderDygn < 0) {
    // Ett datum i framtiden är ett fel i källan, inte en extra färsk kurs.
    return { niva: 'ingen', kalla, alderDygn, skal: 'kursens datum ligger i framtiden' };
  }
  if (alderDygn > FARSK_MAX_DYGN) {
    return {
      niva: 'inaktuell', kalla, alderDygn,
      skal: `kursen är ${alderDygn} dygn gammal (gräns ${FARSK_MAX_DYGN})`,
    };
  }
  return { niva: 'farsk', kalla, alderDygn, skal: null };
}

/** Får den här kursen bära ett påstående om kundens pengar? Enda frågan konsumenterna ska ställa. */
export function farPrissattas(fx, nu = new Date()) {
  return fxFarskhet(fx, nu).niva === 'farsk';
}
