// lib/price-verdict.js — verifieringsjuryn. Ersätter människan-i-loopen för prisändringar med
// en jury av oberoende maskinvittnen som måste vara överens. GRUNDARBESLUT 2026-06-26: en modern
// high-tech-vakt verifierar maskinellt, inte manuellt — MEN bara om juryn är mätbart strängare än
// ett mänskligt ögonkast. Integritetslinjen är orörd: "verifierat" måste förtjänas, aldrig påstås.
//
// Juryns grindar (felar OLIKA, så ett fel i en fångas av en annan):
//   gSource     — rätt produkt nämns på sidan (priset hör inte till grannraden / fel sida).
//   gSanity     — ny siffra är en rimlig ändring av den gamla (magnitud inom band). Dödar
//                 enhets-/valutafel och grova skrapfel (+400 %, 10× från medianen).
//   gConsensus  — sidans råtext bekräftar siffran deterministiskt (price-extract). Dödar AI-hallucination.
//   gConfidence — AI:ns egen konfidens ≥ tröskel.
//   gStability  — SAMMA nya siffra sedd över ≥2 oberoende körningar. Dödar tillfälliga glitchar/kampanjer.
//   corroborated (valfri) — andra oberoende källa/kundfaktura. Höjer, krävs ej.
//
// Nivå → vad vi får SÄGA (bibelns regel 4: precision vs grundad bedömning):
//   'verified'    — alla grindar (inkl. stabilitet + konsensus) → får kallas "verifierat" på rörelse-
//                   kortet OCH skrivas till supplier_price_history. Högre tröskel än ett mänskligt klick.
//   'provisional' — upptäckt, sund, rätt produkt, men ännu ej stabil/konsensus-bekräftad → matar ENBART
//                   prognosen (som redan är hedgad "höjer sannolikt", konfidensmärkt). Aldrig "verifierat".
//   'rejected'    — fel produkt eller orimlig magnitud → tystnad (artefakt, inte en sanning).
//
// Asymmetrin som gör auto-verifiering trygg (regel 4): ett sällsynt falskt "Telia höjde" kostar kunden
// INGET (vi bad dem aldrig agera oåterkalleligt — bara "vi bevakar"). En besparingssiffra eller ett
// faktiskt byte skulle ALDRIG auto-verifieras så — där är nedsidan oåterkallelig. Gränsen går vid
// konsekvensen, inte vid tekniken.

const DEFAULTS = {
  minConfidence: 0.85,   // AI-konfidensgolv för 'verified'
  maxChangePct:  0.40,   // magnitud-tak: en "ändring" > 40 % är nästan alltid ett artefaktfel
  minChangePct:  0.005,  // under 0,5 % = brus, inte en ändring
};

const num = (v) => (v == null ? null : Number(v));

/**
 * @param {object} c  - kandidat:
 *   { oldNumeric, newNumeric, haikuConfidence, productPresent, pageConfirmsNew, priorSeen, corroborated?, categoryBand? }
 *   categoryBand (valfri): { min, max } absolut rimligt prisband för kategorin (per enhet) — extra sundhetslås.
 * @param {object} [opts] - trösklar (se DEFAULTS)
 * @returns {{ tier:'verified'|'provisional'|'rejected', confidence:number, gates:object, reasons:string[] }}
 */
export function priceChangeVerdict(c = {}, opts = {}) {
  const o = { ...DEFAULTS, ...opts };
  const oldN = num(c.oldNumeric);
  const newN = num(c.newNumeric);
  const reasons = [];

  // ── Grindar ────────────────────────────────────────────────────────────────
  const gSource = c.productPresent === true;
  if (!gSource) reasons.push('produkten nämns inte på sidan (kan vara fel sida/produkt)');

  let gSanity = oldN != null && newN != null && oldN > 0 && newN > 0;
  if (gSanity) {
    const changePct = Math.abs(newN - oldN) / oldN;
    if (changePct < o.minChangePct) { gSanity = false; reasons.push('ingen meningsfull ändring (brus)'); }
    else if (changePct > o.maxChangePct) { gSanity = false; reasons.push(`magnitud ${(changePct * 100).toFixed(0)} % > ${o.maxChangePct * 100} % — sannolikt artefakt`); }
  } else {
    reasons.push('gammalt/nytt pris saknas eller ogiltigt');
  }
  // Absolut kategoriband (om angivet): nya priset måste ligga rimligt (enhetskarantänens anda).
  if (gSanity && c.categoryBand && newN != null) {
    const { min, max } = c.categoryBand;
    if ((min != null && newN < min) || (max != null && newN > max)) {
      gSanity = false; reasons.push('nytt pris utanför kategorins rimliga band');
    }
  }

  const gConsensus = c.pageConfirmsNew === true;
  if (!gConsensus) reasons.push('sidans råtext bekräftar inte siffran (möjlig AI-härledning/hallucination)');

  const gConfidence = num(c.haikuConfidence) != null && num(c.haikuConfidence) >= o.minConfidence;
  if (!gConfidence) reasons.push(`AI-konfidens < ${o.minConfidence}`);

  const gStability = c.priorSeen === true;
  if (!gStability) reasons.push('ännu ej sedd över ≥2 körningar (ej tidsstabil)');

  const corroborated = c.corroborated === true;

  const gates = { gSource, gSanity, gConsensus, gConfidence, gStability, corroborated };

  // ── Nivå ─────────────────────────────────────────────────────────────────────
  // Hårda integritetsfel (fel produkt / orimlig magnitud) → tystnad, oavsett resten.
  if (!gSource || !gSanity) {
    return { tier: 'rejected', confidence: 0, gates, reasons };
  }

  const verified = gConsensus && gConfidence && gStability;
  // Konfidens-poäng (för loggning/ordning) — ej kundvänd. Korroboration höjer.
  let confidence = 0.5;
  if (gConsensus)   confidence += 0.2;
  if (gConfidence)  confidence += 0.15;
  if (gStability)   confidence += 0.1;
  if (corroborated) confidence += 0.05;
  confidence = Math.min(1, Math.round(confidence * 100) / 100);

  if (verified) {
    return { tier: 'verified', confidence, gates, reasons: reasons.length ? reasons : ['alla grindar passerade'] };
  }
  // Upptäckt, sund, rätt produkt — men inte fullt bekräftad → matar ENBART prognosen (hedgad).
  return { tier: 'provisional', confidence, gates, reasons };
}
