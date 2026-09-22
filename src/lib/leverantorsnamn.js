// src/lib/leverantorsnamn.js — NÄR FÅR VI DÖLJA ETT LEVERANTÖRSNAMN, OCH NÄR FÖRSTÖR DET MENINGEN?
//
// ══ VARFÖR MODULEN FINNS (2026-09-22, fynd ur en skärmdump) ════════════════════════════════
// `redactSupplier` bodde inuti `src/pages/TestaFaktura/index.js` med fyra anropare och noll
// tester. Den byter ut det föreslagna leverantörsnamnet mot «en verifierad lägre leverantör», och
// syftet är rimligt: alternativets VARUMÄRKE är det kunden betalar för att få veta.
//
// Men rätt-storleks-rekommendationen för saas-finance byter inte leverantör — den sänker NIVÅN
// hos kundens egen. `suggestedSupplier` är då «Fortnox Mellan», alltså namnger redigeringen
// kundens EGET varumärke och skriver över det. Renderat i det byggda paketet 22 september blev
// meningen:
//
//     «Ni betalar för en verifierad lägre leverantör-paketet Stor (710 kr/mån).»
//
// Två fel i en mening: bruten svenska, och en antydan om ett leverantörsbyte som inte existerar
// (regel 9 — ett löfte utan mekanik). Ingen maskinvakt kunde se det: strängen är korrekt   // pastaende-ok: historik om varför felet fanns, inte ett påstående om nuvarande beteende
// interpolerad, och sviten nådde aldrig funktionen eftersom den satt inne i en sidkomponent.
//
// Begreppet fanns dessutom redan i sidan, under namnet `_isSameSupplier`, men i ett ANNAT block
// och med ett extra villkor (`isRealPrice`) som gäller en annan fråga. Två kopior av samma
// jämförelse glider isär (regel 1) — och den här gången hade de redan gjort det.
//
// FÅNGAR: en redigering som skulle skriva över kundens egen leverantör.
// BLIND: jämförelsen är på NAMN, inte på identitet. Två olika bolag med samma förled
//   («Visma Spcs» och «Visma Enterprise») räknas som samma leverantör och redigeras alltså inte.
//   Riktningen är medvetet vald: att VISA ett namn som redan står på kundens egen faktura är
//   ofarligt, att dölja det bryter meningen. Okänt namn → redigera (LN-03, fail-closed på varumärket).

/**
 * Är «bytet» i själva verket en nivåändring hos kundens EGEN leverantör?
 *
 * Saknas något av namnen svarar den `false` MED FLIT: då vet vi inte, och det säkra draget är att
 * redigera. «Ingen frågade» får aldrig likna «samma leverantör».
 */
export function samaLeverantor(foreslagen, nuvarande) {
  const f = String(foreslagen ?? '').toLowerCase().trim();
  const n = String(nuvarande ?? '').toLowerCase().trim();
  if (!f || !n) return false;
  return f === n || f.includes(n) || n.includes(f);
}

/**
 * Döljer det FÖRESLAGNA leverantörsnamnet i en brödtext — men aldrig kundens eget.
 *
 * @param {string} text        AI:ns eller kodens resonemang
 * @param {string} foreslagen  `recommendation.suggestedSupplier`
 * @param {string} nuvarande   kundens egen leverantör (normalizedSupplier ?? extracted.supplier)
 */
export function redigeraLeverantor(text, foreslagen, nuvarande) {
  if (!text || !foreslagen) return text;
  if (samaLeverantor(foreslagen, nuvarande)) return text;

  const ord = foreslagen.split(/\s+/);
  const termer = [foreslagen];
  if (ord[0].length >= 4) termer.push(ord[0]);
  if (ord.length >= 2) termer.push(`${ord[0]} ${ord[1]}`);
  let ut = text;
  for (const term of [...new Set(termer)]) {
    ut = ut.replace(
      new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
      'en verifierad lägre leverantör',
    );
  }
  return ut;
}
