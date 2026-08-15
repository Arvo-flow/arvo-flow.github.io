// lib/fakturarader.js — VAD INGÅR I ÅRSKOSTNADEN? EN UPPDELNING SOM GÅR ATT RÄKNA HEM.
//
// VARFÖR (grundarbeslut 2026-08-15): rummet visade "Google · 72 900 kr/år · RÄTT PRISSATT" och en
// mening om att priset är konkurrenskraftigt. En finansdirektör kan inte analysera en post på det.
// Vad ÄR de 72 900 kronorna? Hur många licenser, till vilket à-pris, och vad av det är löpande
// respektive engångs? Utan svaret är kortet ett omdöme utan underlag — och omdömen utan underlag
// är precis vad en CFO betalar oss för att slippa.
//
// DEN FARLIGA DELEN: årskostnaden är INTE fakturans belopp. Den är
//     annualCost = projicerad LÖPANDE kostnad × periodmultiplikator
// Engångsavgifter och rörliga poster ingår aldrig. Visar vi rader som summerar till fakturans
// totalbelopp under rubriken "72 900 kr/år" har vi skapat exakt den motsägelse vi rensat bort ur
// resten av rummet: två tal bredvid varandra som inte går att addera (HELHETSKRAVET).
//
// DÄRFÖR FAIL-CLOSED: uppdelningen visas bara om den BEVISLIGEN stämmer mot den lagrade
// årskostnaden. Går den inte ihop returnerar vi null och kortet säger ingenting — hellre ingen
// uppdelning än en som inte adderar. Kunden kan alltid räkna efter, och det ska alltid gå.

// Samma karta som extract.js. Duplicerad MEDVETET som en läsande spegel: den här modulen får
// aldrig kunna ändra hur årskostnaden RÄKNAS, bara kontrollera att den summa vi visar stämmer
// mot det redan lagrade talet. Glider de isär fäller avstämningen nedan, vilket är hela poängen.
// (Kopidetektorns anda: en kopia är tillåten när den är ett OBEROENDE VITTNE, aldrig när den är
// en andra producent.)
const PERIOD_MULTIPLIER = { monthly: 12, quarterly: 4, annual: 1, one_time: 0, unknown: 12 };

// Radtyper som utgör den LÖPANDE kostnaden — de enda som annualiseras.
const LOPANDE = new Set(['recurring_subscription', 'recurring', 'subscription']);

// Hur många kronor får summan avvika från det lagrade talet? Noll vore fel: årskostnaden är
// avrundad vid lagring, och en prorata-rad projiceras till fullpris. En krona per rad räcker för
// avrundning; mer än så betyder att uppdelningen beskriver något annat än talet ovanför.
const TOLERANS_PER_RAD = 1;

// Number(null) är 0, inte NaN — och Number('') likaså. Utan den explicita kontrollen blir en rad
// UTAN belopp tyst en nolla, resten summerar "rätt", och kunden ser en uppdelning som saknar en
// post. Samma familj som ?? mot en tom miljövariabel: ett frånvarande värde som glider igenom som
// ett giltigt. Fångat av FR-05 innan det nådde någon.
const tal = (v) => {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

/**
 * Bygger en uppdelning av årskostnaden ur fakturans egna rader.
 *
 * @param {Array}  rader        - lagrade lineItems (kundens egna rader, ordagrant)
 * @param {object} o
 * @param {number} o.annualCost   - den LAGRADE årskostnaden som kortet visar
 * @param {string} o.billingPeriod
 * @returns {{ period, multiplikator, lopande, engangs, lopandePerPeriod, arstakt, avviker }|null}
 *          null när uppdelningen inte kan bevisas stämma — då visas ingenting.
 */
export function byggUppdelning(rader, { annualCost, billingPeriod } = {}) {
  if (!Array.isArray(rader) || rader.length === 0) return null;
  const arskostnad = tal(annualCost);
  if (!(arskostnad > 0)) return null;

  const period = String(billingPeriod || 'unknown');
  const multiplikator = PERIOD_MULTIPLIER[period] ?? 12;
  if (!(multiplikator > 0)) return null;              // engångsfaktura har ingen årstakt att dela upp

  const lopande = [];
  const engangs = [];
  for (const r of rader) {
    const belopp = tal(r?.amount);
    if (belopp == null) return null;                  // en rad utan belopp gör summan obevisbar
    const rad = {
      beskrivning: String(r?.description ?? '').trim() || 'Post utan beskrivning',
      antal:      tal(r?.quantity),
      aPris:      tal(r?.unitPrice),
      belopp,
      prorata:    r?.is_prorata === true,
    };
    (LOPANDE.has(String(r?.type)) ? lopande : engangs).push(rad);
  }
  if (lopande.length === 0) return null;              // inget löpande → årstakten kommer inte härifrån

  // Prorata-raden är delperiod; årstakten bygger på FULLT pris (CR-88412). Har vi antal × à-pris
  // använder vi det, annars kan raden inte projiceras och uppdelningen får inte visas.
  let lopandePerPeriod = 0;
  for (const r of lopande) {
    if (r.prorata) {
      if (!(r.antal > 0) || !(r.aPris > 0)) return null;
      r.fulltBelopp = Math.round(r.antal * r.aPris);
      lopandePerPeriod += r.fulltBelopp;
    } else {
      lopandePerPeriod += r.belopp;
    }
  }

  // AVSTÄMNINGEN. Stämmer inte vår summa mot det lagrade talet beskriver uppdelningen något annat
  // än rubriken — och då visar vi den inte. Det är samma disciplin som bevakat-korten: hellre
  // tystnad än en förklaring som inte håller.
  const arstakt = lopandePerPeriod * multiplikator;
  const avviker = Math.abs(arstakt - arskostnad);
  if (avviker > TOLERANS_PER_RAD * Math.max(1, lopande.length)) return null;

  // Periodetiketten följer MED uppdelningen. Klienten får aldrig härleda den själv:
  // CRA tillåter inte import utanför src/, och en kopia där hade kunnat glida isär från
  // multiplikatorn den beskriver — 'löpande per månad × 4' är en motsägelse som ingen vakt
  // hade fångat.
  return { period, periodOrd: periodEtikett(period), periodOrdPlural: periodEtikettPlural(period),
    multiplikator, lopande, engangs, lopandePerPeriod, arstakt, avviker };
}

/** Svensk periodetikett — en uppdelning måste säga VILKEN period raderna avser. */
export function periodEtikett(period) {
  return { monthly: 'månad', quarterly: 'kvartal', annual: 'år', one_time: 'engångsbetalning' }[period] ?? 'period';
}

/** Plural, för multiplikatorraden ("× 12 månader"). Svenska böjer inte som engelskan. */
export function periodEtikettPlural(period) {
  return { monthly: 'månader', quarterly: 'kvartal', annual: 'år', one_time: 'betalningar' }[period] ?? 'perioder';
}
