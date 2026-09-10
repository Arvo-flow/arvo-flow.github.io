// lib/prissattningsdom.js — DOMEN över korpusens utfall, som en REN FUNKTION.
//
// ══ VARFÖR DEN FLYTTADE HIT (2026-09-10, ur den fientliga granskningen av a7cf05d) ══════════
// Domen bodde inne i `scripts/prissattningsgrad.mjs`, och dess vakt (SV-20) var en KÄLLTEXTVAKT:
// `assert.match` mot två exakta strängar. Granskaren bevisade att den gick att göra HELT overksam
// på tre sätt utan att röra någon av strängarna den letade efter:
//   · `if (false && sammanfattning.fel > …)`   → kraschkontrollen onåbar, 0 test föll
//   · samma sak på avvikelsekontrollen          → 0 test föll
//   · filtret begränsat till nyckeln 'prissatt' → 0 test föll, och det ÅTERINFÖR exakt den brist
//     granskningen av a6f776b just hade stängt (77 kraschade fixturer rapporterade som «oförändrad»)
//
// En källtextvakt kan se att en rad STÅR där, aldrig att den KÖRS. Det är samma sjukdom som
// `indexOf`-vakten 8 september, och svaret är detsamma: flytta beslutet till en ren funktion som
// ett test kan ANROPA, så att invarianten prövas av beteende i stället för av vokabulär.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: att en kraschad korpus rapporteras som oförändrad; att en nyckel slutar jämföras;
//     att en krasch behandlas som en vanlig avvikelse (den får aldrig frysas bort med --update).
//   BLIND: den vet ingenting om VARFÖR ett tal ändrades. Att facit uppdateras utan att någon läser
//     diffen ser den inte. Den granskningen är mänsklig och kan inte automatiseras bort.
//     pastaende-ok: en DEKLARERAD blindfläck, inte ett påstående om vad koden gör (Verifieringsplikten p.5)

/**
 * @param {{fixturer:number, prissatt:number, tystad:number, offert:number, fel:number}} sammanfattning
 * @param {object|null} facit  fryst mätning, eller null när ingen finns än
 * @returns {{blockerar:boolean, kod:'ingen_facit'|'krasch'|'avvikelse'|'ok', avvikelser:string[], text:string}}
 */
// ⚠️ DOMÄNEN DEKLARERAS, DEN HÄRLEDS INTE UR INDATA (2026-09-10, andra granskningsvarvet).
// Första versionen itererade `Object.keys(sammanfattning)` — alltså bara de nycklar som RÅKADE
// finnas i det objekt som skickades in. Granskaren bevisade hålet genom den riktiga pre-commit-
// vägen: han tog bort `fel:` och `tystad:` ur `sammanfattning`-literalet i skriptet och tvingade
// en verklig krasch i fixturen `mob-13`. Utskriften sa «FEL … mob-13: sabotage-krasch-dold» och
// domen svarade ändå «✓ Oförändrad mot facit», EXIT 0 — samma felbild commiten påstod sig ha
// stängt, nådd genom nyckel-BORTTAGNING i stället för nyckel-BEGRÄNSNING.
//
// Och min egen docstring sa «VARJE nyckel jämförs». Den meningen var SKRIVEN, inte körd — precis
// den form Bevisplikten finns emot. En jämförelse kan bara vara fullständig om den vet vilka
// nycklar som SKA finnas; frågar den indata får den svaret indata vill ge.
const NYCKLAR = ['fixturer', 'prissatt', 'tystad', 'offert', 'fel'];

export function prissattningsdom(sammanfattning, facit) {
  // Ett tomt objekt är inte ett facit. `{}` är sant i JS men bär inget att jämföra mot, och att
  // behandla det som ett giltigt facit hade gjort «ingen mätning» omöjlig att skilja från «allt
  // stämmer» — felfamiljen, i domen som skrevs mot den.
  const harFacit = !!facit && NYCKLAR.some((k) => facit[k] !== undefined);
  if (!harFacit) {
    return { blockerar: false, kod: 'ingen_facit', avvikelser: [], text: 'Inget facit finns än. Kör med --update för att frysa dagens tal.' };
  }

  // ⚠️ EN ENDA SLINGA ÖVER NYCKLAR, och det är inte städning (2026-09-10).
  // Min första version hade TVÅ: en grind som letade saknade nycklar, och ett filter som jämförde
  // värden. Grinden gjorde filtrets `NYCKLAR` onåbart — sabotaget «härled domänen ur indata igen»
  // fällde NOLL test, eftersom grinden redan hade blockerat. Ett skydd som inte kan observeras är
  // inget skydd; det är tredje gången samma form i dag (`(?<!\d)`, `KURSORD_FONSTER`, denna).
  // Med en slinga är listan lastbärande: byts den mot indatas egna nycklar försvinner både
  // upptäckten av en borttagen nyckel OCH jämförelsen, och sviten faller.
  const omatta = NYCKLAR.filter((k) => !Number.isFinite(sammanfattning?.[k]));
  if (omatta.length) {
    return {
      blockerar: true,
      kod: 'omatt',
      avvikelser: omatta.map((k) => `${k}: saknas i mätningen`),
      text: `MÄTNINGEN ÄR OFULLSTÄNDIG: ${omatta.join(', ')} saknas. En nyckel utan tal är ett okänt, inte ett godkännande.`,
    };
  }

  // VARJE deklarerad nyckel jämförs — inte de som råkar finnas i indata. Samma lista som ovan,
  // och det är avsiktligt: två listor kan glida isär, och då vaktar den ena något den andra släppt.
  // Uttalat: att byta JUST den här raden mot indatas nycklar är inte observerbart av ett sabotage,
  // eftersom grinden ovan redan garanterat att varje deklarerad nyckel finns och är ett tal. Den
  // raden bär alltså ingen egen tand — den bär konsekvensen, och det säger jag hellre än låter
  // den se ut som ett skydd.
  const avvikelser = NYCKLAR
    .filter((k) => facit[k] !== undefined && facit[k] !== sammanfattning[k])
    .map((k) => `${k}: ${facit[k]} → ${sammanfattning[k]}`);

  // Ett FEL är aldrig en avsedd ändring att frysa bort — en kraschad fixtur är inte ett mätvärde,
  // den är frånvaron av ett. Därför en EGEN kod: den ska aldrig kunna kvitteras som «vi flyttade
  // en gräns» i en commit-rad.
  if (sammanfattning.fel > (facit.fel ?? 0)) {
    return {
      blockerar: true,
      kod: 'krasch',
      avvikelser,
      text: `FIXTURER KRASCHAR: ${facit.fel ?? 0} → ${sammanfattning.fel}. En kraschad fixtur mäter ingenting.`,
    };
  }
  if (avvikelser.length) {
    return { blockerar: true, kod: 'avvikelse', avvikelser, text: `KORPUSENS UTFALL ÄNDRADES: ${avvikelser.join(' · ')}` };
  }
  return {
    blockerar: false,
    kod: 'ok',
    avvikelser: [],
    text: `Oförändrad mot facit (${facit.fixturer ?? '?'} fixturer, ${facit.prissatt} prissatta, fryst ${facit.matt}).`,
  };
}
