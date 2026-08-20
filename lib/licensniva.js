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
 * Läser licensnivån ur fakturans egna radbeskrivningar.
 *
 * @param {Array<{description?: string}>} rader  line_items_json
 * @returns {{nyckel: string, namn: string, kalla: string}|null}  null = kunde inte bevisas
 */
export function lasLicensniva(rader) {
  if (!Array.isArray(rader) || !rader.length) return null;

  const traffar = new Map();          // nyckel → radtexten som bar den
  for (const r of rader) {
    const text = String(r?.description ?? '').trim();
    if (!text) continue;
    if (DISKVALIFICERAR.test(text)) continue;   // fel produktfamilj eller paketpris → rör den inte
    if (ANNAN_LEVERANTOR.test(text)) continue;  // annan leverantörs nivå med samma namn
    for (const n of NIVAER) {
      if (n.kravFamilj && !FAMILJ.test(text)) continue;   // nivån utan familjen bevisar ingenting
      if (n.re.test(text) && !traffar.has(n.nyckel)) traffar.set(n.nyckel, text);
    }
  }

  // Noll träffar → vi vet inte. TVÅ ELLER FLER olika nivåer → en blandad faktura, och då finns
  // ingen enskild nivå att jämföra hela årskostnaden mot. Båda fallen är samma svar: nej.
  if (traffar.size !== 1) return null;

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
