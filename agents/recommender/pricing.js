// agents/recommender/pricing.js
// Live FX-konvertering USD → SEK.
//
// Prisstrategi per produktfamilj:
//   Microsoft 365  — Microsoft sätter lokala SEK-priser via Partner Center.
//                    Dessa ÄNDRAS inte med valutan löpande; uppdateras manuellt
//                    när Microsoft annonserar prisrevision (typiskt 1–2 ggr/år).
//                    => Lagras i SEK i branchindex, ingen FX nödvändig.
//
//   Atlassian      — Prissätter i USD globalt; svenska kunder betalar USD-pris
//   Slack, Zoom      konverterat vid checkout. Rörlig SEK-kostnad.
//   Google Workspace => USD-baspris × live SEK/USD = dagsaktuellt SEK-pris.
//
// Flöde:
//   1. Vercel cron (api/cron/update-fx-rate.mjs) kör kl 06:00 dagligen,
//      hämtar kurs från Riksbanken (fallback: ECB), sparar i Vercel KV.
//   2. recommend() anropar getSekRate() som läser från KV (< 1 ms).
//   3. Vid KV-miss (cold start, cron-fel): hämtar direkt och cachar i minnet.
//   4. Vid total nätverksfel: faller tillbaka på FALLBACK_RATE med tydlig logg.

const RIKSBANK_URL =
  'https://api.riksbank.se/swea/v1/observations/SEKUSDPMI/latest';
const ECB_URL =
  'https://data-api.ecb.europa.eu/service/data/EXR/D.USD.SEK.SP00.A?lastNObservations=1&format=jsondata';

// Fallback: ECB-snitt maj 2026 (uppdateras manuellt vid stor avvikelse >5 %)
export const FALLBACK_RATE_USD_SEK = 10.42;
export const FALLBACK_RATE_DATE    = '2026-05-22';

let _memCache = null; // { rate, fetchedAt }

// Hämtar live SEK/USD-kurs. Returnerar { rate: number, source: string, date: string }.
export async function fetchLiveSekRate() {
  // 1. Riksbanken (auktoritativ källa för SEK)
  try {
    const res  = await fetch(RIKSBANK_URL, { signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      const data = await res.json();
      // Riksbanken returnerar { observations: [{ date, value }] }
      const obs  = data?.observations?.[0] ?? data?.[0];
      const rate = obs ? parseFloat(obs.value ?? obs.SEK ?? obs.sekusdpmi) : null;
      if (rate && rate > 5 && rate < 20) {
        return { rate, source: 'riksbank', date: obs.date ?? new Date().toISOString().slice(0, 10) };
      }
    }
  } catch { /* fall through */ }

  // 2. ECB (European Central Bank — publikt, ingen auth)
  try {
    const res  = await fetch(ECB_URL, { signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      const data = await res.json();
      const obs  = data?.dataSets?.[0]?.series?.['0:0:0:0:0']?.observations;
      if (obs) {
        const lastKey = Object.keys(obs).sort().at(-1);
        const rate    = parseFloat(obs[lastKey]?.[0]);
        if (rate && rate > 5 && rate < 20) {
          return { rate, source: 'ecb', date: new Date().toISOString().slice(0, 10) };
        }
      }
    }
  } catch { /* fall through */ }

  // 3. Fallback — hårdkodad kurs med tydlig varning
  console.warn(`[pricing] Live FX-hämtning misslyckades — använder fallback ${FALLBACK_RATE_USD_SEK} SEK/USD (${FALLBACK_RATE_DATE})`);
  return { rate: FALLBACK_RATE_USD_SEK, source: 'fallback', date: FALLBACK_RATE_DATE };
}

// Hämtar kurs med minnescache (giltig 1 h inom samma serverless-instans).
export async function getSekRate(kvStore = null) {
  // Försök Vercel KV först (satt av daglig cron)
  if (kvStore) {
    try {
      const cached = await kvStore.get('fx:USD:SEK', { type: 'json' });
      if (cached?.rate && cached?.fetchedAt) {
        const ageH = (Date.now() - new Date(cached.fetchedAt).getTime()) / 3_600_000;
        if (ageH < 26) return { ...cached, source: 'kv' }; // max 26h gammal
      }
    } catch { /* KV ej tillgänglig, fortsätt */ }
  }

  // Minnescache (< 1 h)
  if (_memCache && (Date.now() - _memCache.fetchedAt) < 3_600_000) {
    return { ..._memCache, source: 'mem-cache' };
  }

  const result = await fetchLiveSekRate();
  _memCache = { ...result, fetchedAt: Date.now() };
  return result;
}

// Konverterar USD/user/mån → SEK/user/mån med live-kurs.
export function usdToSek(usdPerUserMonth, sekPerUsd) {
  return Math.round(usdPerUserMonth * sekPerUsd);
}
