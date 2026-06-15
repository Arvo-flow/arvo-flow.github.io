// lib/eurostat-el.js — ENDA läsvägen för Eurostats företagselpris (nrg_pc_205,
// icke-hushåll, SE, allt-in EXKL moms, per förbrukningsband). Används av både
// ingest-adaptern (scripts/ingest-public-prices.mjs) och driftvakten
// (scripts/verify.mjs eurostat-el (fabriken)) — ingen lokal kopia av läslogiken (regel 1).

const UA = 'ArvoFlow-DataIngest/1.0 (+https://arvoflow.se; team@arvoflow.se)';
const URL = 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_pc_205'
  + '?format=JSON&geo=SE&currency=NAC&tax=X_VAT&unit=KWH&siec=E7000&lastTimePeriod=1';

// SMB-relevanta förbrukningsband (band IA/IB/IC). Större band finns men når ej vår marknad.
export const SMB_BANDS = ['MWH_LT20', 'MWH20-499', 'MWH500-1999'];

// JSON-stat 2.0 — slå upp ett värde via {dimId: kod} (hanterar strides korrekt).
export function jsonstatValue(js, selection) {
  const { id, size, value, dimension } = js;
  let idx = 0;
  for (let d = 0; d < id.length; d++) {
    const pos = dimension[id[d]].category.index[selection[id[d]]];
    if (pos == null) return null;
    const stride = size.slice(d + 1).reduce((a, b) => a * b, 1);
    idx += pos * stride;
  }
  return value[idx] ?? value[String(idx)] ?? null;
}

/**
 * Hämtar Eurostats senaste företagselpris för SE per SMB-band.
 * @returns {Promise<{period:string, observedAt:string|null, url:string,
 *   bands:Array<{code:string,label:string,sekPerKwh:number,orePerKwh:number}>}>}
 */
export async function fetchEurostatElBands() {
  const r = await fetch(URL, { headers: { 'User-Agent': UA, Accept: 'application/json' } });
  if (!r.ok) throw new Error(`Eurostat HTTP ${r.status}`);
  const js = await r.json();
  if (!js?.dimension?.nrg_cons) throw new Error('Eurostat-svar saknar nrg_cons — kontrollera tax/currency-koder');

  const period = Object.keys(js.dimension.time.category.index)[0];
  const tm = String(period).match(/(\d{4}).?S([12])/);
  const observedAt = tm ? `${tm[1]}-${tm[2] === '1' ? '06' : '12'}-01` : null;
  const cats = js.dimension.nrg_cons.category;

  const bands = [];
  for (const code of SMB_BANDS) {
    if (!(code in cats.index)) continue;
    const sel = {};
    for (const dimId of js.id) {
      sel[dimId] = dimId === 'nrg_cons' ? code : Object.keys(js.dimension[dimId].category.index)[0];
    }
    const sek = jsonstatValue(js, sel);
    if (sek == null) continue;
    bands.push({
      code,
      label: cats.label[code],
      sekPerKwh: Number(sek),
      orePerKwh: Math.round(Number(sek) * 100 * 100) / 100, // SEK/kWh → öre/kWh
    });
  }
  return { period, observedAt, url: URL, bands };
}
