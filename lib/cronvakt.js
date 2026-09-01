// lib/cronvakt.js — EN sanning för cron-endpointernas grind (regel 1).
//
// ══ VARFÖR (2026-09-01, Fable 5.1:s granskning av Opus 5) ═══════════════════════════════════
//
// Tre cron-endpoints bar samma rad:  `auth !== \`Bearer ${process.env.CRON_SECRET}\``
// och bibeln kallade den «fail-closed — nekar allt när hemligheten är osatt». Påståendet var
// skrivet, inte mätt. Med osatt hemlighet blir mallsträngen bokstavligen «Bearer undefined» —
// och en anropare som skickar exakt den strängen SLÄPPS IN. Mätt:
//
//   node -e "const s=undefined; console.log('Bearer undefined' !== \`Bearer ${s}\`)"  → false
//
// Felfamiljen i sin renaste form: «ingen hemlighet» lånade ett giltigt värde (strängen
// "undefined") och blev ett lösenord. Att ordet är gissbart gör det värre, inte bättre.
//
// Regeln: en osatt hemlighet är en OKÄND, och en okänd nekar — utan att jämföras mot något.

/**
 * @param {{ headers?: Record<string, string|undefined> }} req
 * @param {{ env?: NodeJS.ProcessEnv }} [opts]   env injiceras i tester; produktionen läser process.env
 * @returns {boolean} true = anropet får köra
 */
export function cronAnropTillatet(req, { env = process.env } = {}) {
  if (env.NODE_ENV !== 'production') return true;
  const secret = env.CRON_SECRET;
  if (typeof secret !== 'string' || secret.trim() === '') return false;   // okänd hemlighet nekar
  return req?.headers?.authorization === `Bearer ${secret}`;
}
