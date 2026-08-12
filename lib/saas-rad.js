// lib/saas-rad.js — MATAREN: fakturarad + fakturakontext → radobjektet SAAS-AVSTÄMNINGEN kräver.
//
import { stamAv, AVST } from './saas-avstamning.js';

// ── VARFÖR DEN HÄR MODULEN FINNS ────────────────────────────────────────────────────────────────
// `stamAv` (lib/saas-avstamning.js) vägrar med flit att laga sina indata: "Normalisering är
// extraktionens ansvar, inte grindens; grinden får aldrig laga indata åt sig själv för att kunna
// fyra." Någon måste alltså översätta extraktionens utdata till grindens radform — och den
// översättningen är precis där en tyst gissning skulle kunna smyga in. Därför bor den här, ensam,
// läsbar på en skärm, och med varje avvisning namngiven.
//
// ── REGELN SOM STYR VARJE RAD NEDAN ─────────────────────────────────────────────────────────────
// Mataren härleder ALDRIG ett värde. Den läser observationer och vidarebefordrar dem, eller så
// säger den nej. Den räknar inte om moms, den gångrar inte kronor till ören för att fylla ett hål,
// den antar inte att en period är månad för att det är vanligast. Varje sådant hopp hade gjort
// grinden matningsbar med sina egna antaganden — en vakt som bevakar sitt eget eko.
//
// ── DEN ENDA ARITMETIK SOM FÖREKOMMER ───────────────────────────────────────────────────────────
// En korsvalidering: om raden bär BÅDE kronor och ören måste de vara samma tal. De kommer från två
// olika fält i samma extraktion, och när två oberoende avläsningar av samma sak inte stämmer är det
// en varning — inte något att medla mellan. Vi avvisar hellre än väljer.

/** Varför en rad inte kunde matas fram. Varje skäl är ett tillstånd, aldrig ett tyst hopp. */
export const MATNING = {
  INGEN_RAD: 'raden saknas',
  INGEN_LEVERANTOR: 'ingen deterministiskt fastställd leverantör på fakturan',
  INGEN_VALUTA: 'fakturans valuta saknas — utan valuta finns inget ankare att stämma av mot',
  INGEN_MOMSBAS: 'fakturan uppger inte om radbeloppen är exkl. eller inkl. moms',
  INGEN_PERIOD: 'radens debiteringsperiod är varken månad eller år',
  INGET_ANTAL: 'raden saknar ett heltalsantal ur ett strukturerat fält',
  INGA_ORE: 'raden saknar belopp i öresprecision — kronorfältet kan inte bära ett per-licenspris',
  ORE_MOT_KRONOR: 'öresbeloppet och kronorbeloppet på samma rad säger olika saker',
  RADEN_GAR_INTE_IHOP: 'radens à-pris × antal är inte radens belopp — fakturans egna tal motsäger varandra',
};

// Periodkartan. Kvartal och engångs saknar med flit en översättning: ett kvartalspris är inte ett
// månadspris delat på tre förrän någon bevisat att raden faktiskt debiteras jämnt, och det beviset
// har vi inte. 'unknown' är per definition inte ett svar.
const PERIODKARTA = { monthly: 'manad', annual: 'ar' };

// Största tillåtna avstånd mellan kronor×100 och ören på samma rad. Kronorfältet är avrundat till
// heltal, så upp till 50 öre åt vardera hållet är förväntat. Mer än så är inte avrundning.
export const ORE_TOLERANS = 50;

/**
 * Bygger radobjektet `stamAv` vill ha — eller säger varför det inte gick.
 *
 * @param {object} rad      - en post ur extracted.lineItems
 * @param {object} kontext  - { leverantor, valuta, momsbas, period }
 * @returns {{ ok: true, rad: object } | { ok: false, skal: string }}
 */
export function byggAvstamningsrad(rad, kontext = {}) {
  const nej = (skal) => ({ ok: false, skal });

  if (!rad || typeof rad !== 'object') return nej(MATNING.INGEN_RAD);
  if (!kontext.leverantor) return nej(MATNING.INGEN_LEVERANTOR);
  if (!kontext.valuta) return nej(MATNING.INGEN_VALUTA);

  // Momsbasen är en OBSERVATION ur fakturan. Saknas den finns ingen ersättning — minst av allt
  // "exkl, för det är svensk B2B-standard". Standarden är ett antagande om populationen, inte ett
  // faktum om den här fakturan, och grinden jämför just den här fakturan.
  if (kontext.momsbas !== 'exkl' && kontext.momsbas !== 'inkl') return nej(MATNING.INGEN_MOMSBAS);

  const period = PERIODKARTA[kontext.period] ?? null;
  if (!period) return nej(MATNING.INGEN_PERIOD);

  // Antalet måste vara ett heltal ur ett strukturerat fält. Ingen typomvandling: strängen '5' bär
  // inte sitt ursprung, och ursprunget är hela poängen.
  const antal = rad.quantity;
  if (typeof antal !== 'number' || !Number.isInteger(antal) || antal < 1) return nej(MATNING.INGET_ANTAL);

  // Ören är obligatoriska. Ett per-licenspris som 133,82 kr överlever inte kronorfältet, och en
  // avstämning på 133 kr mot 133,82 kr är inte en avstämning — den är en ungefärlighet som utger
  // sig för att vara ett bevis.
  const ore = rad.amountOre;
  if (typeof ore !== 'number' || !Number.isInteger(ore) || ore <= 0) return nej(MATNING.INGA_ORE);

  // Korsvalideringen: två avläsningar av samma belopp måste vara överens.
  if (typeof rad.amount === 'number' && Math.abs(ore - Math.round(rad.amount * 100)) > ORE_TOLERANS) {
    return nej(MATNING.ORE_MOT_KRONOR);
  }

  // ── RADENS EGEN ARITMETIK (2026-08-12) ────────────────────────────────────────────────────
  // Sonden som mätte att öresfälten kommer fram kunde inte se om modellen läste RÄTT ruta — den
  // såg bara att den svarade. Ett hallucinerat öresbelopp ser exakt ut som ett avläst, och bär
  // dessutom precisionens auktoritet. Att kontrollera talet mot prisboken vore cirkulärt: prisboken
  // är just det grinden ska stämma av MOT.
  //
  // Den här kontrollen är oberoende av prisboken. Den ställer fakturans egna tal mot varandra:
  // à-priset gånger antalet ÄR radbeloppet. Går det inte ihop har minst en av avläsningarna fel,
  // och vilken vet vi inte — alltså avvisar vi. Exakt likhet, ingen tolerans: enhetspriset som
  // grinden sedan härleder (belopp ÷ antal) skulle annars motsäga det à-pris fakturan själv anger,
  // och vi vore tillbaka i ett "nästan" som utger sig för ett bevis.
  if (Number.isInteger(rad.unitPriceOre) && rad.unitPriceOre > 0 && rad.unitPriceOre * antal !== ore) {
    return nej(MATNING.RADEN_GAR_INTE_IHOP);
  }

  return {
    ok: true,
    rad: {
      leverantor: kontext.leverantor,
      antal,
      beloppOre: ore,
      period,
      momsbas: kontext.momsbas,
      valuta: kontext.valuta,
    },
  };
}

// ── PRISBOKEN → VAKTADE RADER ────────────────────────────────────────────────────────────────
// Grinden kräver rader som är `vaktad` OCH `farsk`. Båda måste vara SANNA påståenden om en maskin,
// inte fält vi fyller i för att grinden ska kunna fyra.
//
// `vaktad` avgörs av vad verifieraren FAKTISKT läser (dess `bevakadeTiers`), aldrig av att
// leverantören råkar ha en verifierare. Det var precis den förväxlingen som lät E3 och E5 —
// prisbokens största tal — stå obevakade bakom en grön audit.
//
// `farsk` mäts mot verifierarens takt. Källverifieringen går veckovis (verify-sources.yml,
// måndagar). Ett ankare som inte lästs på en månad har alltså missat fyra körningar; då är
// tystnad rätt svar. Prisbokens egen läxa: sexton obevakade dygn tillverkade besparingar.
export const FARSKHET_DAGAR = 30;

/** Antal hela dygn mellan ett ISO-datum och referensdagen. */
function alderIDagar(isoDatum, idag) {
  const t = Date.parse(`${isoDatum}T00:00:00Z`);
  if (Number.isNaN(t)) return Infinity;
  return Math.floor((idag.getTime() - t) / 86_400_000);
}

/**
 * Bygger grindens vaktade rader ur prisbokens tier-poster.
 *
 * En tier ger TVÅ rader: månadspriset (utan åtagande) och årsavtalspriset. Båda är listpris —
 * vilket kunden möter beror på avtalsform, och att bara bära det ena hade gjort halva marknaden
 * osynlig för grinden. Är två priser identiska ser grinden själv tvetydigheten (FLERA_TRAFFAR)
 * och tiger; vi behöver inte lösa det här.
 *
 * @param {object} tierBenchmarks - BRANCHINDEX['saas-productivity'].licenseTierBenchmarks
 * @param {object} opts - { leverantor, bevakadeTiers: string[], idag: Date }
 */
export function vaktadeRaderUrPrisbok(tierBenchmarks, { leverantor, bevakadeTiers = [], idag = new Date() } = {}) {
  const rader = [];
  for (const [nyckel, post] of Object.entries(tierBenchmarks ?? {})) {
    if (!post || post.currency !== 'SEK') continue;         // ingen FX, någonsin
    const vaktad = bevakadeTiers.includes(nyckel);
    const farsk  = typeof post.lastVerified === 'string' && alderIDagar(post.lastVerified, idag) <= FARSKHET_DAGAR;
    for (const [falt, form] of [['msrpMonthly', 'månadsavtal'], ['msrpAnnual', 'årsavtal']]) {
      const pris = post[falt];
      if (typeof pris !== 'number' || !(pris > 0)) continue;
      // Öre ur ett kronorpris med två decimaler: 133.82 → 13382. Math.round stänger flyttalsdriften
      // (133.82 * 100 = 13381.999…), som annars hade gjort exakt likhet omöjlig att träffa.
      rader.push({
        leverantor, tier: `${nyckel} (${form})`, tierNyckel: nyckel,
        prisOre: Math.round(pris * 100), period: 'manad', momsbas: 'exkl', valuta: 'SEK',
        vaktad, farsk, kalla: `${post.source ?? 'okänd källa'}, verifierad ${post.lastVerified ?? 'okänt datum'}`,
      });
    }
  }
  return rader;
}

// ── GRINDEN SOM MOTVITTNE MOT TEXTGISSNINGEN ─────────────────────────────────────────────────
// Hela like-for-like-beräkningen vilar på att en radbeskrivning avgör vilken licensnivå raden är
// ("Microsoft 365 E3" → E3 → jämför mot E3:s listpris). Det är en TEXTAVLÄSNING som bestämmer
// vilket pris kundens besparing räknas mot — och den har ingen andra åsikt.
//
// Aritmetiken kan ge den andra åsikten. Radens bevisade enhetspris (belopp ÷ antal, i öre) ställs
// mot prisbokens vaktade nivåer. Säger texten E3 medan priset exakt motsvarar Business Standards
// listpris har vi två vittnen som pekar åt olika håll — och då vet vi inte vilket som har rätt.
//
// Utfallet är ENDAST ett veto. Grinden får aldrig omklassificera raden till den nivå priset
// antyder: likhet är inte identitet (lib/saas-avstamning.js), och en produkt utanför boken är
// osynlig för matchningen. Den får tysta ett påstående, aldrig skapa ett.
//
// Ingen träff betyder ingenting alls — det normala fallet är en kund med påslag, vars pris inte
// motsvarar något listpris. Tystnad från motvittnet är alltså inte ett godkännande.
export function granskaTierrader({ lineItems, tierNyckel, kontext, vaktade } = {}) {
  const motsagelser = [], bekraftade = [];
  if (typeof tierNyckel !== 'function') return { motsagelser, bekraftade };

  for (const rad of (Array.isArray(lineItems) ? lineItems : [])) {
    const textTier = tierNyckel(rad?.description ?? '');
    if (!textTier) continue;                                  // ingen tier-rad → inget att motsäga

    const byggd = byggAvstamningsrad(rad, kontext);
    if (!byggd.ok) continue;                                  // kan inte bevisas → ingen åsikt

    const dom = stamAv(byggd.rad, vaktade);
    if (dom.utfall !== AVST.BEVISAD_LIKHET) continue;          // ingen exakt träff → ingen åsikt

    const post = { beskrivning: rad.description, textTier, prisTier: dom.likhet.tierNyckel,
      enhetOre: dom.enhetOre, kalla: dom.likhet.kalla };
    if (dom.likhet.tierNyckel === textTier) bekraftade.push(post);
    else motsagelser.push(post);
  }
  return { motsagelser, bekraftade };
}

/**
 * Kör mataren över en hel faktura och redovisar utfallet per rad.
 * Ren funktion — läser inget, skriver inget, kallar ingen tjänst.
 */
export function byggAvstamningsrader(lineItems, kontext = {}) {
  return (Array.isArray(lineItems) ? lineItems : []).map((l, i) => ({
    index: i,
    beskrivning: l?.description ?? null,
    ...byggAvstamningsrad(l, kontext),
  }));
}
