// lib/radobservation.js — EN läsväg till fakturaradens öresobservationer.
//
// VARFÖR MODULEN FINNS (2026-08-24, ur att min egen fix från i går var död kod).
//
// Den 22 augusti gjordes den första riktiga grindmätningen: balanskravet fällde 8 av 69 rader och
// SJU var elfakturor. Orsaken var inte fakturorna utan enheten — `unitPrice` är ett heltalsfält i
// kronor och elpriser ligger på 0,80–1,90 kr/kWh, så aritmetiken är omöjlig per konstruktion.
// Fixen läste öresfälten i stället. Den fixen har aldrig kunnat fyra en enda gång.
//
//     agents/test-invoice/extract.js  (aggregateLineItems)  skriver  amountOre / unitPriceOre
//     lib/extraction-integrity.js     (judgeLineArithmetic)  läste   amount_ore / unit_price_ore
//
// Modellens råschema stavar snake_case; produktionens aggregerade rad stavar camelCase. Båda
// formerna är LEGITIMA — de tillhör två olika steg. Felet var att en konsument gissade vilket steg
// den fick, och en felstavad fältläsning ger `undefined`, som är omöjlig att skilja från
// «modellen fyllde aldrig fältet». Det är obduktionens felfamilj, ordagrant, i mitt eget arbete:
//
//     ett tillstånd som betyder «okänt / inte mätt», representerat med ett värde som är omöjligt
//     att skilja från ett giltigt svar.
//
// Körbart bevis (Fortum, 3 400 kWh × 1,12 kr = 3 808 kr):
//     judgeLineArithmetic(rådata)                  → judged: 1, balanced: true   ← testernas väg
//     judgeLineArithmetic(aggregateLineItems(...)) → judged: 0                   ← produktionens väg
//
// Och testerna var gröna hela tiden, för de matade rådataformen direkt till funktionen. Samma
// sjukdom som LFL-obduktionen (12 aug) och `tests/holdings.mjs` (19 aug): **mekanismen prövades,
// matningen aldrig.** Därför bor produktionsvägen numera i själva testet (RO-01), inte bara
// funktionen.
//
// Min egen TÄCKNINGSSOND bar exakt samma fel — `scripts/probe-grindarna.mjs` mätte
// `l.unit_price_ore` på det aggregerade objektet och hade rapporterat «0 rader bär öre» för
// samtliga 75 fakturor. Jag hade läst det som att modellen inte fyller fälten. Tjugonde gången
// under obduktionen som mätinstrumentet är felet och inte systemet.
//
// FÅNGAR: att en konsument läser fakturaradens öresfält i FEL stavning för det steg den befinner
//   sig i, och därför tyst behandlar ett avläst tal som ett saknat.
// BLIND: modulen vet vilket TAL som står i objektet, aldrig om talet är rätt avläst ur pappret.
//   Det bevisas av textlagret (`lib/pdf-textlager.js` + `scripts/probe-stickprov.mjs`), och SR-07
//   är den icke-cirkulära kontrollen. Den ser inte heller en konsument som läser fältet via
//   destrukturering eller beräknad nyckel — vakten RO-04 matchar punktnotation, som är den enda
//   form som förekommit i den här kodbasen.

/** De två legitima stavningarna. Råformen kommer ur modellens verktygsschema, den aggregerade
 *  ur `aggregateLineItems`. Listan är avsiktligt uttömmande — en tredje stavning ska aldrig
 *  uppstå, och RO-04 fäller den som inför en. */
const APRIS = ['unit_price_ore', 'unitPriceOre'];
const BELOPP = ['amount_ore', 'amountOre'];

function forstaHeltal(rad, namn) {
  for (const n of namn) {
    const v = rad?.[n];
    if (Number.isInteger(v)) return v;
  }
  return null;
}

/**
 * Radens öresobservationer, oavsett vilket steg raden kommer från.
 *
 * `beloppOre` faller tillbaka på kronorbeloppet × 100 när öresfältet saknas — det är en
 * ENHETSKONVERTERING av ett känt tal (ett belopp i hela kronor ÄR exakt i öre), aldrig en
 * härledning av ett okänt. À-priset får ALDRIG härledas så: det är just à-priset som förlorar
 * sin precision i kronorfältet, och att räkna 1 × 100 = 100 öre för Fortums 1,12 kr vore att
 * tillverka den precision grinden ska pröva.
 *
 * `beloppOreAvlast` är beloppet UTAN den fallbacken — för konsumenter vars hela värde är att talet
 * stod på pappret. Avstämningsgrinden (lib/saas-rad.js) härleder ett per-licenspris och får därför
 * inte nöja sig med en konvertering; balanskravet prövar en aritmetik och får det. Skillnaden är en
 * POLICY hos konsumenten, aldrig en egen fältläsning — det var just en egen fältläsning som gjorde
 * att grinden läste fel stavning i två dygn.
 *
 * @param {object} rad  fakturarad, rå eller aggregerad
 * @returns {{ aprisOre: number|null, beloppOre: number|null, beloppOreAvlast: number|null,
 *             iOre: boolean, kalla: 'ra'|'aggregerad'|null }}
 */
export function radensOre(rad) {
  const aprisOre = forstaHeltal(rad, APRIS);
  const beloppDirekt = forstaHeltal(rad, BELOPP);
  const beloppOre = beloppDirekt != null
    ? beloppDirekt
    : (Number.isFinite(rad?.amount) ? Math.round(rad.amount * 100) : null);

  const kalla = aprisOre == null && beloppDirekt == null
    ? null
    : (Number.isInteger(rad?.unit_price_ore) || Number.isInteger(rad?.amount_ore) ? 'ra' : 'aggregerad');

  return {
    aprisOre,
    beloppOre,
    beloppOreAvlast: beloppDirekt,
    iOre: aprisOre != null && beloppOre != null,
    kalla,
  };
}

/** Stavningarna, för maskinvakten. Exporteras så att RO-04 inte kan glida isär från listan ovan. */
export const ORESFALT = Object.freeze([...APRIS, ...BELOPP]);
