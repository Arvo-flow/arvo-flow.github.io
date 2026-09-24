// lib/premiumkrets.js — VEM FÅR DE PROAKTIVA UTSKICKEN (grundarorder 2026-09-24).
//
// Order: «Gratiskunder får endast den reaktiva fakturavyn, inga proaktiva utskick.» Månadsbriefen
// (api/cron/generate-briefings.mjs) och prislarmen (lib/price-alert-store.js → run-price-alerts och
// notify-price-changes) frågar den här modulen och ingen annan (regel 1).
//
// PREMIUM ÄR EN BEVILJAD RAD, INTE EN RAD. Ordern löd «konton med en intelligence_activations-rad».
// Mätt 2026-09-24: raden skapas av api/activate-intelligence.mjs, ett öppet POST utan inloggning,
// betalning eller bekräftelse — vem som helst kan skriva in vilken adress som helst. En grind på
// «raden finns» hade gett 1 995-kronorstjänsten gratis till den som fyller i formuläret, alltså
// exakt det övertramp ordern stänger. Därför: raden måste bära premium_beviljad_at (satt av grundaren
// via workflowen bevilja-premium) och sakna premium_avslutad_at. Tills betalning finns är beviljandet
// den enda mekanism som skiljer en kund från en anmälan.
//
// FÅNGAR: en adress utan rad, en rad som aldrig beviljats, en avslutad rad, skiftläge/blanksteg i
//   adressen (normaliseras på båda sidor).
// BLIND: vem som faktiskt betalat — det finns ingen fakturering; beviljandet är grundarens påstående.
//   Och en adress som beviljats får utskick för ALLA sina analyser, även dem hen laddat upp före.
//
// OKÄNT ÄR INTE TOMT: kan kretsen inte läsas KASTAR modulen. En tom mängd betyder «ingen är premium»
// och ger noll utskick av rätt skäl; ett fel får aldrig se likadant ut (samma lås som
// getAffectedCustomers, tystnadsfel.mjs).

/** Normaliserad adress, eller null när värdet inte är en adress. */
export function normaliseraEpost(e) {
  if (typeof e !== 'string') return null;
  const n = e.trim().toLowerCase();
  return n.includes('@') ? n : null;
}

/**
 * Läser premiumkretsen. Kastar när den inte kan läsas — aldrig en tom mängd i stället för ett fel.
 * @param {Function|null} db  sql-taggen ur lib/db.js
 * @returns {Promise<Set<string>>}
 */
export async function lasPremiumkrets(db) {
  if (!db) throw new Error('premiumkretsen: ingen databas — okänd krets, inte en tom');
  const rader = await db`
    SELECT email FROM intelligence_activations
    WHERE premium_beviljad_at IS NOT NULL
      AND premium_avslutad_at IS NULL
  `;
  if (!Array.isArray(rader)) throw new Error('premiumkretsen: oväntat svar från databasen');
  const krets = new Set();
  for (const r of rader) { const n = normaliseraEpost(r?.email); if (n) krets.add(n); }
  return krets;
}

/**
 * Delar mottagare i premium och övriga. Kräver en läst krets — null/undefined är ett programfel.
 * @template T
 * @param {T[]} mottagare
 * @param {Set<string>} krets
 * @param {(m: T) => unknown} epostAv
 * @returns {{ kvar: T[], utestangda: number }}
 */
export function premiumFilter(mottagare, krets, epostAv = (m) => m?.email) {
  if (!(krets instanceof Set)) throw new Error('premiumFilter: kretsen är inte läst — okänt får aldrig bli «alla» eller «ingen»');
  const kvar = [];
  let utestangda = 0;
  for (const m of mottagare ?? []) {
    const n = normaliseraEpost(epostAv(m));
    if (n && krets.has(n)) kvar.push(m); else utestangda++;
  }
  return { kvar, utestangda };
}

/**
 * Grundarens beviljande pekar ut EN adress med `sha256:<hex av lower(trim(adress))>` — en personlig
 * adress står aldrig i en workflow-input eller en publik logg. Klartext vägras. Exakt en skild
 * adress måste träffa; annars ett fel med skäl, aldrig ett val.
 * @param {unknown[]} adresser  e-postfält ur intelligence_activations
 * @param {string} arg
 * @param {(s: string) => string} sha256hex
 * @returns {{ adress: string } | { fel: string }}
 */
export function matchaAdress(adresser, arg, sha256hex) {
  if (typeof arg !== 'string' || !/^sha256:[0-9a-f]{64}$/.test(arg.trim())) {
    return { fel: 'ange adressen som sha256:<64 hex> — klartext skrivs aldrig i en publik logg' };
  }
  const mal = arg.trim().slice('sha256:'.length);
  const traffar = new Set();
  for (const a of adresser ?? []) { const n = normaliseraEpost(a); if (n && sha256hex(n) === mal) traffar.add(n); }
  if (traffar.size === 0) return { fel: 'ingen anmälan (intelligence_activations) för adressen — den måste anmäla sig först' };
  if (traffar.size > 1) return { fel: `${traffar.size} skilda adresser träffade — hashkollision eller fel indata` };
  return { adress: [...traffar][0] };
}
