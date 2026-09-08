// lib/licensniva.js — VILKEN LICENSNIVÅ HAR KUNDEN FAKTISKT?
//
// BAKGRUNDEN (2026-08-19). Rummet visade "184 % över lägsta pris" och Arvo Score 15 på en
// Microsoft-rad. Fakturans egen radtext sa "Microsoft 365 E3". Vi jämförde mot Business Standard.
//
//   Business Standard  1 606 kr/anv/år  → kunden +184 %   ← det vi visade
//   E3 (deras nivå)    5 001 kr/anv/år  → kunden  −9 %    ← sanningen
//
// De ligger nio procent UNDER listpriset för sin egen nivå. Ett bra avtal, presenterat som en
// katastrof. Det var den blindfläck tests/prisunderlag.mjs deklarerade i klartext kvällen innan —
// "ligger kunden på Business Standard men golvet avser Starter är jämförelsen formellt korrekt
// och sakligt fel" — och den materialiserades inom ett dygn, åt kundens nackdel.
//
// Att jämföra en E3-licens mot Business Standards pris är samma fel som Copilot-fällan spegelvänt:
// två olika produkter ställda mot varandra som om de vore samma. Like-for-like-ärligheten gäller
// åt BÅDA håll — vi får varken lova en besparing som kräver nedgradering, eller anklaga en kund
// för överbetalning genom att mäta mot en billigare produkt än den de köpt.
//
// FAIL-CLOSED, ALLTID. Kan nivån inte bevisas ur kundens egen text säger vi det i stället för att
// gissa. En gissad nivå är värre än ingen: den bär precisionens auktoritet.

// ── PRODUKTFAMILJEN MÅSTE STÅ I TEXTEN (rättat 2026-08-19, samma dag som modulen skrevs) ─────
// Första versionen krävde familjen bara för E3/E5. Business-nivåerna matchade på "Business
// Standard" ensamt — och sonden mot produktionsdata visade omedelbart följden: en GOOGLE
// WORKSPACE-faktura ("Google Workspace Business Standard") lästes som Microsoft 365 Business
// Standard och fick Microsofts golv. Det är exakt fel-produkt-felet den här modulen byggdes för
// att ta bort, återinfört spegelvänt inom en timme.
//
// Google Workspace Business Standard finns på riktigt — och kostar $14/användare/månad. Vi har
// INGET verifierat SEK-pris för den (sekPublic:false), så den får aldrig bära ett svenskt golv.
//
// Regeln nu: produktfamiljen måste stå i samma radtext som nivån. Det kostar oss träffar på
// fakturor som bara skriver "Business Standard" — och det är rätt pris att betala. Fail-closed.
const FAMILJ = /\b(?:microsoft\s*365|microsoft365|m365|ms365)\b/i;

// Nycklarna motsvarar licenseTierBenchmarks i prisboken. Mönstren är avsiktligt SNÄVA —
// hellre "vet inte" än en nivå för mycket.
const NIVAER = [
  // Microsoft 365 Business-familjen. Både familjen OCH nivån måste stå i texten.
  { nyckel: 'business-basic',    re: /\bbusiness\s+basic\b/i,    namn: 'Microsoft 365 Business Basic',    kravFamilj: true },
  { nyckel: 'business-standard', re: /\bbusiness\s+standard\b/i, namn: 'Microsoft 365 Business Standard', kravFamilj: true },
  { nyckel: 'business-premium',  re: /\bbusiness\s+premium\b/i,  namn: 'Microsoft 365 Business Premium',  kravFamilj: true },
  // ── E3/E5-FÄLLAN ───────────────────────────────────────────────────────────────────────────
  // Microsoft 365 E3 ≠ Office 365 E3. Det är två produkter med olika pris (prisboken: Office 365
  // E3 kostar 256 kr, Microsoft 365 E3 kostar 416,77). Ett bart "E3" räcker därför ALDRIG —
  // produktfamiljen måste stå i texten, och "Office 365" diskvalificerar raden helt.
  { nyckel: 'e3', re: /\b(?:microsoft\s*365|m365|ms365)\s*e3\b/i, namn: 'Microsoft 365 E3' },
  { nyckel: 'e5', re: /\b(?:microsoft\s*365|m365|ms365)\s*e5\b/i, namn: 'Microsoft 365 E5' },
];

// Rader som diskvalificerar en träff helt: en annan produktfamilj, eller ett paket där priset
// inte är planens pris (Copilot-fällan, ordagrant ur prisbokens egen varning).
// Namnger raden en ANNAN leverantörs produkt är den diskvalificerad oavsett vad som mer står där.
// Google Workspace, Zoho Workplace och Dropbox har alla nivåer som heter "Business Standard" eller
// "Business Plus". Utan den här raden hade en Google-faktura fått Microsofts listpris som golv.
const ANNAN_LEVERANTOR = /\bgoogle\b|\bworkspace\b|\bzoho\b|\bdropbox\b|\bslack\b|\batlassian\b|\bzoom\b/i;
const DISKVALIFICERAR = /\boffice\s*365\b|\bcopilot\b|\bexkl\.?\s*teams\b/i;

/**
 * EN RAD → EN NIVÅ, ELLER INGEN. Den enda platsen i kodbasen där frågan «vilken licensnivå är
 * den här radtexten?» besvaras.
 *
 * ── VARFÖR DEN FINNS (2026-09-08, ur grundarens Microsoft-kort) ────────────────────────────
 * Regeln på rad 42–48 — «ett bart E3 räcker ALDRIG, produktfamiljen måste stå i texten, och
 * Office 365 diskvalificerar raden helt» — skrevs den 19 augusti och tillämpades HÄR. Den bars
 * aldrig till `LFL_TIER_RE` i recommend.js, som matchade `/\bE3\b/i` utan familjekrav och utan
 * diskvalificering. Det var den listan som byggde meningen kunden läste:
 *
 *   «era 12 E3-licenser … Microsofts publika årsavtalspris för exakt samma licens är 416,77 kr»
 *
 * Fakturan sa **Office 365 E3**. 416,77 kr är **Microsoft 365 E3** — och prisbokens egen not på
 * just den posten säger «Förväxla ej med Office 365 E3». Två läsare av samma fråga, den ena
 * vaktad och den andra inte, och den OVAKTADE var den som skrev till kunden. Regel 1 bruten på
 * det dyraste möjliga stället.
 *
 * Vi har inget verifierat publikt SEK-pris för Office 365 E3 (ingen post i prisboken — talet
 * «256 kr» står bara i en prosa-not, utan källa och utan datum). Rätt svar för den raden är
 * alltså tystnad, inte ett omvänt påstående.
 *
 * @param {string} text  radbeskrivningen
 * @returns {string|null}  nyckel i licenseTierBenchmarks, eller null = kan inte bevisas
 */
export function radensNiva(text) {
  const t = String(text ?? '').trim();
  if (!t) return null;
  if (DISKVALIFICERAR.test(t))  return null;   // annan produktfamilj eller paketpris
  if (ANNAN_LEVERANTOR.test(t)) return null;   // annan leverantörs nivå med samma namn
  for (const n of NIVAER) {
    if (n.kravFamilj && !FAMILJ.test(t)) continue;   // nivån utan familjen bevisar ingenting
    if (n.re.test(t)) return n.nyckel;
  }
  return null;
}

/** true om raden namnger en ANNAN licensierad produkt än de nivåer vi kan prissätta. */
export function annanLicensprodukt(text) {
  const t = String(text ?? '').trim();
  return !!t && (DISKVALIFICERAR.test(t) || ANNAN_LEVERANTOR.test(t));
}

/**
 * Läser licensnivån ur fakturans egna radbeskrivningar.
 *
 * @param {Array<{description?: string}>} rader  line_items_json
 * @returns {{nyckel: string, namn: string, kalla: string}|null}  null = kunde inte bevisas
 */
export function lasLicensniva(rader) {
  if (!Array.isArray(rader) || !rader.length) return null;

  const traffar = new Map();          // nyckel → radtexten som bar den
  // ── EN DISKVALIFICERAD RAD FÖRSVINNER INTE — DEN GÖR FAKTURAN BLANDAD (2026-09-08) ─────────
  // Grundarens Microsoft-faktura: «Microsoft 365 Business Premium» (32 % av pengarna) och
  // «Office 365 E3» (68 %). Diskvalificeringen nedan gjorde rätt sak med E3-raden — den fick
  // aldrig M365 E3:s golv — men raden `continue`:ades, alltså blev den OSYNLIG i stället för att
  // räknas. Kvar stod exakt en träff, `traffar.size !== 1` passerade, och HELA årskostnaden
  // jämfördes mot Business Premiums listpris: +44 %, +164 % eller +217 % beroende på vilket antal
  // enheter extraktionen råkade läsa, allt med `nivaBekraftad: true`. Sanningen var att
  // Premium-raden låg på öret på listpris.
  //
  // Det är bibelns centrala felfamilj: «jag kunde bara läsa EN DEL av fakturan» representerat med
  // ett värde omöjligt att skilja från «jag läste hela». En diskvalificerad rad är per definition
  // en ANNAN licensierad produkt vars pengar ligger i samma årskostnad — och då finns ingen
  // enskild nivå att mäta helheten mot, precis som för två igenkända nivåer.
  //
  // Spärren är AVSIKTLIGT smal: bara rader som namnger en annan produkt/familj tystar oss. En
  // rad som helt enkelt saknar nivåträff (support, frakt, avgift) är inte en annan licens och
  // tystar ingenting — en spärr som fäller varje faktura hade blivit avstängd inom en vecka.
  let annanProdukt = false;
  for (const r of rader) {
    const text = String(r?.description ?? '').trim();
    if (!text) continue;
    // fel produktfamilj eller paketpris → rör den inte, och räkna den som en annan produkt
    if (annanLicensprodukt(text)) { annanProdukt = true; continue; }
    const nyckel = radensNiva(text);            // EN läsare, samma som LFL:en använder (regel 1)
    if (nyckel && !traffar.has(nyckel)) traffar.set(nyckel, text);
  }

  // Noll träffar → vi vet inte. TVÅ ELLER FLER olika nivåer → en blandad faktura, och då finns
  // ingen enskild nivå att jämföra hela årskostnaden mot. Båda fallen är samma svar: nej.
  if (traffar.size !== 1) return null;
  if (annanProdukt) return null;      // en igenkänd nivå bredvid en annan produkt = blandad faktura

  const [nyckel, radtext] = [...traffar.entries()][0];
  return { nyckel, namn: NIVAER.find((n) => n.nyckel === nyckel).namn, kalla: radtext };
}

/**
 * Nivåns verifierade pris per enhet och år — ur prisboken, aldrig räknat här.
 * Endast SEK-nivåer med ett publikt listpris duger; USD-nivåer (sekPublic:false) är per
 * konstruktion uteslutna ur varje SEK-tal vi visar.
 *
 * @returns {{arsprisPerEnhet: number, lastVerified: string|null, namn: string}|null}
 */
export function nivaGolv(niva, licenseTierBenchmarks) {
  if (!niva || !licenseTierBenchmarks) return null;
  const t = licenseTierBenchmarks[niva.nyckel];
  if (!t || t.currency !== 'SEK' || !(t.msrpAnnual > 0)) return null;
  return {
    arsprisPerEnhet: Math.round(t.msrpAnnual * 12),
    // Samma licens utan bindning — nivåns EGET månadspris. Utan det skulle kortet visa E3:s golv
    // (5 001 kr) bredvid Business Standards tak (1 927 kr): två tal som inte hör ihop, staplade
    // på varandra. Det är Helhetskravet — varje del sann, helheten omöjlig.
    manadsprisPerEnhet: t.msrpMonthly > 0 ? Math.round(t.msrpMonthly * 12) : null,
    lastVerified: t.lastVerified ?? null,
    namn: niva.namn,
  };
}
