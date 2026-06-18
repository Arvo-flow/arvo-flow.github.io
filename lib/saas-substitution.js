// lib/saas-substitution.js — strategisk substitution: slå ut överflödig SaaS med M365 vi redan bevisat.
//
// Dropbox (och Box) prissätter Sverige i USD (stealth-verifierat 2026-06-18). Zero Trust → vi vägrar
// FX-konvertera, så kortet visar INGEN påhittad SEK-besparing. Istället en stenhård arkitektonisk insikt:
// (a) USD-prissättning = rörliga kurser + dolda bankavgifter (valutapåslag), (b) fildelning/lagring
// (OneDrive/SharePoint) ingår redan i Microsoft 365. Vi slår ut dubbelbetald lagring med saas-productivity.
//
// PUSHBACK INBYGGD (Motståndsplikten): copyn antar INTE att kunden har M365 ("ert paket") utan att vi
// vet det — den säger "ingår i M365 Business Basic och uppåt; har ni redan M365…". Vi påstår aldrig något
// vi inte kan stå för. Har vi bevis (m365Present) skarpar vi formuleringen.

const DROPBOX_RX = /\bdropbox\b/i;
const BOX_RX = /\bbox\.com\b|\bbox enterprise\b|\bbox\b(?!\s*(?:office|pack))/i;

/**
 * Detektera molnlagrings-SaaS som kan substitueras med M365. Returnerar insikts-objekt eller null.
 * @param {Array} lineItems
 * @param {string|null} supplier  normaliserad leverantör
 * @param {boolean} m365Present   true om vi VET att kunden har M365 (t.ex. tidigare analys) → skarpare copy
 */
export function detectStorageSubstitution(lineItems, supplier, m365Present = false) {
  const hay = `${supplier ?? ''} ${(lineItems ?? []).map((l) => l?.description ?? '').join(' ')}`;
  let vendor = null;
  if (DROPBOX_RX.test(hay)) vendor = 'Dropbox';
  else if (BOX_RX.test(hay)) vendor = 'Box';
  if (!vendor) return null;

  const owns = m365Present
    ? 'Fildelning och lagring (OneDrive + SharePoint) ingår redan i ert Microsoft 365-paket — ni betalar Dropbox för lagring ni redan äger.'
    : 'Fildelning och lagring (OneDrive + SharePoint) ingår i Microsoft 365 Business Basic och uppåt. Har ni redan M365 betalar ni Dropbox för lagring ni redan äger.';

  return {
    vendor,
    m365Present,
    usdPain: `Ni betalar för molnlagring (${vendor}) i amerikanska dollar — rörliga växelkurser och dolda bankavgifter (valutapåslag) ovanpå listpriset.`,
    substitution: owns.replace(/Dropbox/g, vendor),
    note: 'Vi visar ingen påhittad kronbesparing — molnlagring prissätts i USD och vi FX-konverterar aldrig. Substitutionen bekräftas i en kort genomgång av ert M365-paket.',
  };
}
