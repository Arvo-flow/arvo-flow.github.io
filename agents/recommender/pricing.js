// agents/recommender/pricing.js
// Live FX-konvertering USD → SEK och EUR → SEK.
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
//   EUR-fakturor   — Irländska/europeiska SaaS-bolag (HubSpot, CRM-leverantörer).
//                    Konverteras till SEK i API-lagret innan pipeline-analys.
//                    => EUR-belopp × live SEK/EUR (Riksbanken SEKEURPMI).
//
// Flöde:
//   1. Vercel cron (api/cron/update-fx-rate.mjs) kör kl 06:00 dagligen,
//      hämtar kurser från Riksbanken (fallback: ECB), sparar i Vercel KV.
//   2. recommend()/API anropar getSekRate()/getEurSekRate() som läser KV (< 1 ms).
//   3. Vid KV-miss (cold start, cron-fel): hämtar direkt och cachar i minnet.
//   4. Vid total nätverksfel: faller tillbaka på FALLBACK_RATE med tydlig logg.

// ── USD / SEK ──────────────────────────────────────────────────────────────────
const RIKSBANK_USD_URL =
  'https://api.riksbank.se/swea/v1/observations/SEKUSDPMI/latest';
const ECB_USD_URL =
  'https://data-api.ecb.europa.eu/service/data/EXR/D.USD.SEK.SP00.A?lastNObservations=1&format=jsondata';

// Fallback: ECB-snitt maj 2026 (uppdateras manuellt vid stor avvikelse >5 %)
export const FALLBACK_RATE_USD_SEK = 10.42;
export const FALLBACK_RATE_DATE    = '2026-05-22';

let _memCacheUsd = null;

export async function fetchLiveSekRate() {
  try {
    const res  = await fetch(RIKSBANK_USD_URL, { signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      const data = await res.json();
      const obs  = data?.observations?.[0] ?? data?.[0];
      const rate = obs ? parseFloat(obs.value ?? obs.SEK ?? obs.sekusdpmi) : null;
      if (rate && rate > 5 && rate < 20) {
        return { rate, source: 'riksbank', date: obs.date ?? new Date().toISOString().slice(0, 10) };
      }
    }
  } catch { /* fall through */ }

  try {
    const res  = await fetch(ECB_USD_URL, { signal: AbortSignal.timeout(4000) });
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

  console.warn(`[pricing] Live FX-hämtning misslyckades — använder fallback ${FALLBACK_RATE_USD_SEK} SEK/USD (${FALLBACK_RATE_DATE})`);
  return { rate: FALLBACK_RATE_USD_SEK, source: 'fallback', date: FALLBACK_RATE_DATE };
}

export async function getSekRate(kvStore = null) {
  if (kvStore) {
    try {
      const cached = await kvStore.get('fx:USD:SEK', { type: 'json' });
      if (cached?.rate && cached?.fetchedAt) {
        const ageH = (Date.now() - new Date(cached.fetchedAt).getTime()) / 3_600_000;
        if (ageH < 26) return { ...cached, source: 'kv' };
      }
    } catch { /* KV ej tillgänglig, fortsätt */ }
  }

  if (_memCacheUsd && (Date.now() - _memCacheUsd.fetchedAt) < 3_600_000) {
    return { ..._memCacheUsd, source: 'mem-cache' };
  }

  const result = await fetchLiveSekRate();
  _memCacheUsd = { ...result, fetchedAt: Date.now() };
  return result;
}

export function usdToSek(usdPerUserMonth, sekPerUsd) {
  return Math.round(usdPerUserMonth * sekPerUsd);
}

// ── EUR / SEK ──────────────────────────────────────────────────────────────────
const RIKSBANK_EUR_URL =
  'https://api.riksbank.se/swea/v1/observations/SEKEURPMI/latest';
const ECB_EUR_URL =
  'https://data-api.ecb.europa.eu/service/data/EXR/D.EUR.SEK.SP00.A?lastNObservations=1&format=jsondata';

// Fallback: ECB-snitt maj 2026 (uppdateras manuellt vid stor avvikelse >5 %)
export const FALLBACK_RATE_EUR_SEK = 11.47;

let _memCacheEur = null;

export async function fetchLiveEurSekRate() {
  try {
    const res  = await fetch(RIKSBANK_EUR_URL, { signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      const data = await res.json();
      const obs  = data?.observations?.[0] ?? data?.[0];
      const rate = obs ? parseFloat(obs.value ?? obs.SEK ?? obs.sekeurpmi) : null;
      if (rate && rate > 8 && rate < 16) {
        return { rate, source: 'riksbank', date: obs.date ?? new Date().toISOString().slice(0, 10) };
      }
    }
  } catch { /* fall through */ }

  try {
    const res  = await fetch(ECB_EUR_URL, { signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      const data = await res.json();
      const obs  = data?.dataSets?.[0]?.series?.['0:0:0:0:0']?.observations;
      if (obs) {
        const lastKey = Object.keys(obs).sort().at(-1);
        const rate    = parseFloat(obs[lastKey]?.[0]);
        if (rate && rate > 8 && rate < 16) {
          return { rate, source: 'ecb', date: new Date().toISOString().slice(0, 10) };
        }
      }
    }
  } catch { /* fall through */ }

  console.warn(`[pricing] EUR/SEK live fetch misslyckades — använder fallback ${FALLBACK_RATE_EUR_SEK} SEK/EUR (${FALLBACK_RATE_DATE})`);
  return { rate: FALLBACK_RATE_EUR_SEK, source: 'fallback', date: FALLBACK_RATE_DATE };
}

export async function getEurSekRate(kvStore = null) {
  if (kvStore) {
    try {
      const cached = await kvStore.get('fx:EUR:SEK', { type: 'json' });
      if (cached?.rate && cached?.fetchedAt) {
        const ageH = (Date.now() - new Date(cached.fetchedAt).getTime()) / 3_600_000;
        if (ageH < 26) return { ...cached, source: 'kv' };
      }
    } catch { /* KV ej tillgänglig, fortsätt */ }
  }

  if (_memCacheEur && (Date.now() - _memCacheEur.fetchedAt) < 3_600_000) {
    return { ..._memCacheEur, source: 'mem-cache' };
  }

  const result = await fetchLiveEurSekRate();
  _memCacheEur = { ...result, fetchedAt: Date.now() };
  return result;
}

export function eurToSek(eurAmount, sekPerEur) {
  return Math.round(eurAmount * sekPerEur);
}
