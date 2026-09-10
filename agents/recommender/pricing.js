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
// ── ADRESSERNA BYTTA PÅ EN MÄTNING, INTE EN GISSNING (2026-09-10) ─────────────────────────
// Skäl-loggningen gav rotorsaken på första körningen i produktion:
//     [pricing] Live FX-hämtning misslyckades — riksbank: HTTP 400 · ecb: HTTP 404
// Båda endpoints var fel, och det hade varit osynligt i fyra dygn bakom två tysta `catch`.
//
// `scripts/probe-fxkallor.mjs` mätte sju kandidater i GitHub Actions (sandlådan har ingen
// egress). Utfallet, ordagrant:
//     riksbank .../observations/SEKUSDPMI/latest     HTTP 400   ← vår gamla
//     riksbank .../Observations/Latest/SEKUSDPMI     HTTP 200   {"date":"2026-09-09","value":9.56874}
//     riksbank .../Observations/Latest/SEKEURPMI     HTTP 200   {"date":"2026-09-09","value":11.1495}
//     ecb .../EXR/D.USD.SEK.SP00.A                   HTTP 404   ← vår gamla
//     ecb .../EXR/D.SEK.EUR.SP00.A                   HTTP 200
//     frankfurter (ECB-spegel) USD 9,5687 · EUR 11,1495          ← bekräftar båda på fyra decimaler
//
// Riksbanken bytte alltså BÅDE sökväg och form: svaret är nu ETT OBJEKT `{date, value}`, inte en
// array. Formen spelar roll — `date` är det som gör kursen daterbar, och utan datum klassar
// `lib/fxfarskhet.js` den som «ingen kurs» hur färsk den än är.
const RIKSBANK_USD_URL =
  'https://api.riksbank.se/swea/v1/Observations/Latest/SEKUSDPMI';
// ⚠️ INGEN USD-RESERV, och det är ett VAL. ECB publicerar ingen direkt SEK/USD-serie; talet
// skulle behöva räknas fram ur två andra (SEK/EUR ÷ USD/EUR). Frankfurter svarar perfekt men är
// en TREDJEPARTSSPEGEL, och en tjänst som säger «verifierat» ska inte låta en aggregator bära
// kundens pengar (sondens egen deklarerade blindfläck). Faller Riksbanken finns alltså ingen
// USD-kurs — och då är tystnaden svaret, precis som `fxfarskhet` föreskriver. Fakturan analyseras
// ändå; det är bara besparingspåståendet som uteblir.
const ECB_USD_URL = null;

// Fallback: ECB-snitt maj 2026 (uppdateras manuellt vid stor avvikelse >5 %)
export const FALLBACK_RATE_USD_SEK = 10.42;
export const FALLBACK_RATE_DATE    = '2026-05-22';

let _memCacheUsd = null;

// ⚠️ TVÅ TYSTA `catch { /* fall through */ }` GJORDE ORSAKEN OKÄND (2026-09-10). Hämtningen har
// fallit tillbaka på majkonstanten i produktion, och ingen visste VARFÖR: föll anropet på nätet,
// på en 404, eller på att svarets form ändrats? Ingen av de tre lämnade ett spår. Bibeln säger
// det rakt ut för ingest-handlern — «tysta tidiga utgångar är förbjudna, varje return loggar sitt
// skäl» — och samma regel gäller här. Varje källa rapporterar nu exakt hur den föll.
export async function fetchLiveSekRate() {
  const skal = [];
  try {
    const res  = await fetch(RIKSBANK_USD_URL, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) {
      skal.push(`riksbank: HTTP ${res.status}`);
    } else {
      const data = await res.json();
      // Nya formen är ETT OBJEKT `{date, value}`; den gamla var en array. Båda läses, så en
      // återgång inte tyst tappar kursen — och `obs.date` är det som gör den daterbar.
      const obs  = (data && !Array.isArray(data) && data.value != null) ? data
        : (data?.observations?.[0] ?? data?.[0]);
      const rate = obs ? parseFloat(obs.value ?? obs.SEK ?? obs.sekusdpmi) : null;
      if (rate && rate > 5 && rate < 20) {
        return { rate, source: 'riksbank', date: obs.date ?? new Date().toISOString().slice(0, 10) };
      }
      // Formen ändrades, eller talet låg utanför bandet. Båda är LÄSFEL och ska namnges som sådana
      // — annars ser de ut som nätverksfel nästa gång någon felsöker.
      skal.push(`riksbank: svarade 200 men ingen brukbar kurs (nycklar: ${Object.keys(data ?? {}).join(',') || 'inga'})`);
    }
  } catch (err) { skal.push(`riksbank: ${err.name === 'TimeoutError' ? 'timeout 4s' : err.message}`); }

  if (!ECB_USD_URL) {
    skal.push('ecb: ingen direkt SEK/USD-serie finns — medvetet ingen reserv, se kommentaren vid URL:erna');
  } else try {
    const res  = await fetch(ECB_USD_URL, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) {
      skal.push(`ecb: HTTP ${res.status}`);
    } else {
      const data = await res.json();
      const obs  = data?.dataSets?.[0]?.series?.['0:0:0:0:0']?.observations;
      if (obs) {
        const lastKey = Object.keys(obs).sort().at(-1);
        const rate    = parseFloat(obs[lastKey]?.[0]);
        if (rate && rate > 5 && rate < 20) {
          return { rate, source: 'ecb', date: new Date().toISOString().slice(0, 10) };
        }
        skal.push(`ecb: observation ${lastKey} gav ingen brukbar kurs`);
      } else {
        skal.push(`ecb: svarade 200 men saknade dataSets (nycklar: ${Object.keys(data ?? {}).join(',') || 'inga'})`);
      }
    }
  } catch (err) { skal.push(`ecb: ${err.name === 'TimeoutError' ? 'timeout 4s' : err.message}`); }

  console.warn(`[pricing] Live FX-hämtning misslyckades — ${skal.join(' · ')}`);
  // Konstanten returneras fortfarande, men den bär ALDRIG en källa som ser hämtad ut.
  // `lib/fxfarskhet.js` klassar `source: 'fallback'` som «ingen kurs», och det är där
  // beslutet fattas — inte här. Den här funktionen rapporterar, den bedömer inte.
  return { rate: FALLBACK_RATE_USD_SEK, source: 'fallback', date: FALLBACK_RATE_DATE, skal };
}

export async function getSekRate(kvStore = null) {
  if (kvStore) {
    try {
      const cached = await kvStore.get('fx:USD:SEK', { type: 'json' });
      if (cached?.rate && cached?.fetchedAt) {
        const ageH = (Date.now() - new Date(cached.fetchedAt).getTime()) / 3_600_000;
        // ⚠️ `source: 'kv'` SKREV ÖVER KÄLLAN (rättat 2026-09-10). Spreaden lade `cached.source`
        // först och etiketten sist, så en lagrad `'fallback'` kom ut som `'kv'`: transporten
        // maskerad som proveniens. Det var den raden som gjorde majkonstanten omöjlig att skilja
        // från en hämtad kurs i varje konsument nedströms. Källan är nu orörd; VAR den hämtades
        // ifrån är en separat upplysning som ingen får förväxla med VEM som mätte den.
        if (ageH < 26) return { ...cached, hamtadFran: 'kv' };
      }
    } catch (err) {
      // Tyst förut. En KV som slutat svara ser då exakt ut som en KV som saknar nyckeln, och
      // båda leder vidare till en nätverkshämtning — men bara den ena är ett fel vi vill veta om.
      console.warn('[pricing] KV-läsning av valutakursen föll:', err.message);
    }
  }

  if (_memCacheUsd && (Date.now() - _memCacheUsd.fetchedAt) < 3_600_000) {
    return { ..._memCacheUsd, hamtadFran: 'mem-cache' };
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
  'https://api.riksbank.se/swea/v1/Observations/Latest/SEKEURPMI';
// ECB:s EXR kvoterar «valuta per EUR», så serien D.SEK.EUR ÄR SEK per euro — vår kurs, direkt
// och utan mellanräkning. Mätt HTTP 200. Den gamla D.EUR.SEK finns inte och svarade 404.
const ECB_EUR_URL =
  'https://data-api.ecb.europa.eu/service/data/EXR/D.SEK.EUR.SP00.A?lastNObservations=1&format=jsondata';

// Fallback: ECB-snitt maj 2026 (uppdateras manuellt vid stor avvikelse >5 %)
export const FALLBACK_RATE_EUR_SEK = 11.47;

let _memCacheEur = null;

// SYSKONFALLET till USD-grenen, rättat i samma pass: samma två tysta fall-through fanns här, och
// EUR-fakturorna (Google Ireland m.fl.) är precis de som drabbade grundarens bunt.
export async function fetchLiveEurSekRate() {
  const skal = [];
  try {
    const res  = await fetch(RIKSBANK_EUR_URL, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) {
      skal.push(`riksbank: HTTP ${res.status}`);
    } else {
      const data = await res.json();
      // Nya formen är ETT OBJEKT `{date, value}`; den gamla var en array. Båda läses, så en
      // återgång inte tyst tappar kursen — och `obs.date` är det som gör den daterbar.
      const obs  = (data && !Array.isArray(data) && data.value != null) ? data
        : (data?.observations?.[0] ?? data?.[0]);
      const rate = obs ? parseFloat(obs.value ?? obs.SEK ?? obs.sekeurpmi) : null;
      if (rate && rate > 8 && rate < 16) {
        return { rate, source: 'riksbank', date: obs.date ?? new Date().toISOString().slice(0, 10) };
      }
      skal.push(`riksbank: svarade 200 men ingen brukbar kurs (nycklar: ${Object.keys(data ?? {}).join(',') || 'inga'})`);
    }
  } catch (err) { skal.push(`riksbank: ${err.name === 'TimeoutError' ? 'timeout 4s' : err.message}`); }

  try {
    const res  = await fetch(ECB_EUR_URL, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) {
      skal.push(`ecb: HTTP ${res.status}`);
    } else {
      const data = await res.json();
      const obs  = data?.dataSets?.[0]?.series?.['0:0:0:0:0']?.observations;
      if (obs) {
        const lastKey = Object.keys(obs).sort().at(-1);
        const rate    = parseFloat(obs[lastKey]?.[0]);
        if (rate && rate > 8 && rate < 16) {
          return { rate, source: 'ecb', date: new Date().toISOString().slice(0, 10) };
        }
        skal.push(`ecb: observation ${lastKey} gav ingen brukbar kurs`);
      } else {
        skal.push(`ecb: svarade 200 men saknade dataSets (nycklar: ${Object.keys(data ?? {}).join(',') || 'inga'})`);
      }
    }
  } catch (err) { skal.push(`ecb: ${err.name === 'TimeoutError' ? 'timeout 4s' : err.message}`); }

  console.warn(`[pricing] EUR/SEK live fetch misslyckades — ${skal.join(' · ')}`);
  return { rate: FALLBACK_RATE_EUR_SEK, source: 'fallback', date: FALLBACK_RATE_DATE, skal };
}

export async function getEurSekRate(kvStore = null) {
  if (kvStore) {
    try {
      const cached = await kvStore.get('fx:EUR:SEK', { type: 'json' });
      if (cached?.rate && cached?.fetchedAt) {
        const ageH = (Date.now() - new Date(cached.fetchedAt).getTime()) / 3_600_000;
        if (ageH < 26) return { ...cached, hamtadFran: 'kv' };   // se USD-grenen: transporten får aldrig maskera källan
      }
    } catch (err) {
      // Tyst förut. En KV som slutat svara ser då exakt ut som en KV som saknar nyckeln, och
      // båda leder vidare till en nätverkshämtning — men bara den ena är ett fel vi vill veta om.
      console.warn('[pricing] KV-läsning av valutakursen föll:', err.message);
    }
  }

  if (_memCacheEur && (Date.now() - _memCacheEur.fetchedAt) < 3_600_000) {
    return { ..._memCacheEur, hamtadFran: 'mem-cache' };
  }

  const result = await fetchLiveEurSekRate();
  _memCacheEur = { ...result, fetchedAt: Date.now() };
  return result;
}

export function eurToSek(eurAmount, sekPerEur) {
  return Math.round(eurAmount * sekPerEur);
}
