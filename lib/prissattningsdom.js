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
export function prissattningsdom(sammanfattning, facit) {
  if (!facit) {
    return { blockerar: false, kod: 'ingen_facit', avvikelser: [], text: 'Inget facit finns än. Kör med --update för att frysa dagens tal.' };
  }

  // VARJE nyckel jämförs. Att bara läsa `prissatt` var hela bristen: en grind kan tysta en faktura
  // genom att välja tystnad ELLER genom att dö, och bara det ena syntes.
  const avvikelser = Object.keys(sammanfattning)
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
