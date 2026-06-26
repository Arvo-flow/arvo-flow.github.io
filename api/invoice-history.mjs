// api/invoice-history.mjs — GET /api/invoice-history?fingerprint=<fp>[&magic=<token>]
// Returnerar de senaste analyserna för en browser-fingerprint, och/eller —
// när en giltig magic token medföljer — analyserna nycklade på tokenets e-post.
//
// SÄKERHET: e-postnycklad historik kräver tokenbevis. Klienten får ALDRIG
// fråga på rå e-postadress — tokenet (levererat till kundens inkorg) är
// ägarskapsbeviset. Tokens accepteras inom expiry även om de förbrukats
// för inloggning (AuthContext konsumerar dem vid sidladdning).
import { getAnalysesByFingerprint, getAnalysesByEmail } from '../lib/invoice-store.js';
import { getMarketIntelligence } from '../lib/price-alert.js';
import { pendingCountBySender } from '../lib/ingest-queue.js';
import { getPublicBenchmark, normalizeSupplierName, CATEGORY_UNIT } from '../lib/public-prices.js';
import { contractClockFinding } from '../lib/contract-clock.js';
import { priceHikeForecast } from '../lib/price-forecast.js';
import { getSupplierCategoryChangesByKeyword, getRecentHike } from '../lib/price-db.js';
import { getSegmentStats } from '../lib/price-alert-store.js';
import { marketMovementFinding } from '../lib/market-movement.js';
import { extractSupplierKeyword } from '../lib/supplier-keyword.js';
import { catLabel } from '../lib/format.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { getLatestSweep } from '../lib/vakt.js';
import { TEST_EMAIL } from '../lib/test-surface.js';
import { getBenchmark } from '../lib/benchmark.js';
import { getDb } from '../lib/db.js';
import { verifySession } from '../lib/session.js';

export const config = { maxDuration: 10 };

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

async function emailFromMagic(token) {
  if (!token || typeof token !== 'string' || token.length < 32) return null;
  const db = getDb();
  if (!db) return null;
  try {
    const rows = await db`
      SELECT email FROM magic_tokens
      WHERE token = ${token} AND expires_at > NOW()
      LIMIT 1
    `;
    return rows[0]?.email ?? null;
  } catch { return null; }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return send(res, 405, { error: 'Endast GET stöds' });

  const fp      = req.query?.fingerprint;
  const magic   = req.query?.magic;
  const session = req.query?.session;

  const hasFp = typeof fp === 'string' && fp.length >= 8;
  if (!hasFp && !magic && !session) {
    return send(res, 400, { error: 'fingerprint, magic eller session krävs' });
  }

  // E-postägarskap: en VARAKTIG session (signatur-verifierad) ELLER en färsk magic-token (24h).
  // Sessionen är primärnyckeln — den överlever 24h-token, så kontoret följer kunden, ej enheten.
  const email = verifySession(session)?.email || await emailFromMagic(magic);

  // TESTYTAN är ISOLERAD: öppnas rummet som testidentiteten visas ENBART testytans data — aldrig
  // webbläsarens fingerprint-historik (annars läcker den egna uppladdningar in och "ser inte nollställt ut").
  const isTestRoom = email === TEST_EMAIL;

  const [byFp, byEmail] = await Promise.all([
    (hasFp && !isTestRoom) ? getAnalysesByFingerprint(fp) : [],
    email ? getAnalysesByEmail(email)    : [],
  ]);

  // Slå ihop + dedupa (samma analys kan ha både fingerprint och user_email)
  const seen = new Set();
  const analyses = [...byEmail, ...byFp]
    .filter((a) => (seen.has(a.id) ? false : seen.add(a.id)))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    // Kontraktsklockan beräknas FRESH vid läsning (aldrig lagrad) så "dagar kvar" stämmer
    // varje gång rummet öppnas. Zero Trust: bara rader med ett verkligt bindningsslut bär klocka.
    .map((a) => ({
      ...a,
      contractClock: contractClockFinding({
        servicePeriodEnd: a.contract_end_date ?? null,
        supplier:         a.normalized_supplier || a.supplier || null,
      }),
    }));

  // ── Kohort-intelligens: vad betalar bolag hos samma leverantör? ───────────
  // Cross-customer-aggregat ur invoice_analyses (getMarketIntelligence gate:ar
  // själv på ≥3 datapunkter → null annars). Det enda Arvo kan ge som ingen
  // jämförelsesajt kan: nätverkseffektens levande sanning (regel 3: gate:ad till
  // verklig täckning, aldrig fabricerad).
  const cohort = await buildCohort(analyses);

  // ── Offentlig sektor: vad stora svenska köpare faktiskt betalar (per enhet) ──
  // Vår första MOAT-data innan kundflywheelet finns — verkliga kontraktspriser
  // ur öppen data. Fyller "kollektiva sanningen" med en SOURCAD jämförelse även
  // när privat kohort saknas. Gate:ad på ≥3 observationer (lib/public-prices.js).
  const publicBench = await buildPublicBench(analyses);

  // ── Maktkalendern: prognos ur leverantörens egen prishistorik (bibelns nya regel 4) ──
  // En källbelagd, konfidensmärkt BEDÖMNING (grund + konfidens + asymmetri) — vakten som
  // ser framåt. Zero Trust: byggs bara ur verkliga prisändringar; tunn historik → tystnad.
  const forecasts = await buildForecasts(analyses);

  // ── Branschankaret: den kollektiva sanningen blir ALDRIG tom (cold-start) ──
  // När varken privat kohort (≥3 bolag) eller offentligt golv (≥3 punkter) bär, visar vi ändå
  // vad branschen TYPISKT betalar ur verifierade publika listpriser (BRANCHINDEX) — tydligt märkt
  // branschestimat, aldrig "X bolag betalar". Ersätts av den verkliga kohorten när volymen kommer.
  const branchAnchors = await buildBranchAnchors(analyses);

  // ── Marknadsrörelsen: "Telia höjde — X av Y bolag vi följer för <kategori> ligger hos Telia" ──
  // Den vassaste "hur visste de det?": en VERIFIERAD publik höjning (supplier_price_history) korsad
  // med nätverkets breddsignal (getSegmentStats). Ett faktum, inte en bedömning (regel 3). Zero Trust:
  // bägge bevisen måste bära (färsk höjning + ≥3 bolag hos leverantören), annars tystnad.
  const movements = await buildMovements(analyses);

  // ── Rekommenderat byte: VAD marknaden erbjuder för er nivå (namngivet + verifierade specs) ──
  // En CFO som ser "spara X" frågar "till vad?". Vi svarar konkret: namngivna verifierade
  // alternativ ur BRANCHINDEX (real-public) med riktiga specs/priser + källa. Aldrig påhittat,
  // aldrig kundens nuvarande leverantör, aldrig estimat-kategorier (specs som fakta kräver källa).
  const switchTargets = buildSwitchTargets(analyses);

  // ── Vaktens hjärtslag: senaste verkliga svep (tidsstämplat) → radarns "senaste svep" ──
  // null tills första nattliga svepet registrerats; rummet faller då tillbaka på härledd text.
  const vakt = await getLatestSweep();

  // ── Pågående intag: fakturor PÅ VÄG (köade men ej klara) → rummet visar "analyserar N", ej tomt ──
  const ingesting = email ? await pendingCountBySender(email) : 0;

  return send(res, 200, { ok: true, analyses, cohort, publicBench, forecasts, branchAnchors, movements, switchTargets, vakt, ingesting, email: email ?? undefined });
}

function buildSwitchTargets(analyses) {
  const out = {};
  const seen = new Set();
  for (const a of analyses) {
    if (a.route !== 'auto' || !a.category || !a.should_switch || !(a.net_saving > 0)) continue;
    if (seen.has(a.category)) continue;
    seen.add(a.category);
    if (seen.size > 8) break;
    const bi = BRANCHINDEX[a.category];
    // ENDAST verifierade kategorier (real-public) — för estimat visar vi inte specs som fakta (regel 3).
    if (!bi || bi.source !== 'real-public' || !Array.isArray(bi.alternatives) || !bi.alternatives.length) continue;
    const custKw = extractSupplierKeyword(a.normalized_supplier || a.supplier || '');
    const alts = bi.alternatives
      .filter((alt) => alt.supplier && alt.positioning)
      .filter((alt) => !custKw || extractSupplierKeyword(alt.supplier) !== custKw)   // aldrig deras nuvarande
      .sort((x, y) => (y.reliability ?? 0) - (x.reliability ?? 0))
      .slice(0, 3)
      .map((alt) => ({ supplier: alt.supplier, positioning: alt.positioning }));
    if (!alts.length) continue;
    out[a.category] = { alternatives: alts, source: bi.source, lastVerified: bi.lastVerified ?? null };
  }
  return out;
}

async function buildMovements(analyses) {
  const seen = new Set();
  const out = {};
  for (const a of analyses) {
    if (a.route !== 'auto' || !a.category) continue;
    const raw = a.normalized_supplier || a.supplier;
    if (!raw) continue;
    const keyword = extractSupplierKeyword(raw);
    if (!keyword) continue;
    const key = `${keyword}|${a.category}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (seen.size > 10) break;
    try {
      const [hike, segment] = await Promise.all([
        getRecentHike({ supplierKeyword: keyword, category: a.category }),
        getSegmentStats({ category: a.category, supplierKeyword: keyword }),
      ]);
      const finding = marketMovementFinding(hike, segment, {
        supplier:      keyword.replace(/\b\w/g, (c) => c.toUpperCase()),   // varumärket, snyggt: "Telia"
        categoryLabel: catLabel(a.category),
      });
      // category bärs med så rummet kan undertrycka prognosen för samma kategori: ett VERIFIERAT
      // nyss-inträffat (rörelsen) gör en "höjer sannolikt"-bedömning för samma kategori motsägande.
      if (finding) out[key] = { ...finding, category: a.category };
    } catch { /* fail-open → ingen rörelse för det paret */ }
  }
  return out;
}

// Enhetsfras per kategori — BRANCHINDEX-medianen är PER ENHET (per användare/år, per
// abonnemang/år), aldrig en totalsumma. unit-fältet ('kr/år') ljuger; noten bär sanningen.
// Därför en explicit allowlist: en kategori utan känd enhetsfras får ALDRIG bli ett ankare
// (då skulle vi riskera att märka ett per-enhet-tal som vore det en totalsumma — enhetsfelet
// som enhetskarantänen finns för att stoppa). Bandet visas, kundjämförelse görs ALDRIG här
// (den bor i innehavskortet, byggt ur kundens egen verifierade analys).
export const BRANCH_ANCHOR_UNIT = {
  'saas-productivity': { label: 'per användare/år', noun: 'användare',   nounPl: 'användare' },
  'saas-creative':     { label: 'per användare/år', noun: 'användare',   nounPl: 'användare' },
  'saas-crm':          { label: 'per användare/år', noun: 'användare',   nounPl: 'användare' },
  mobil:               { label: 'per abonnemang/år', noun: 'abonnemang', nounPl: 'abonnemang' },
  bredband:            { label: 'per anslutning/år', noun: 'anslutning', nounPl: 'anslutningar' },
};

export async function buildBranchAnchors(analyses) {
  const seen = new Set();
  const out = {};
  for (const a of analyses) {
    if (a.route !== 'auto' || !a.category || seen.has(a.category)) continue;
    const unit = BRANCH_ANCHOR_UNIT[a.category];
    if (!unit) continue;                            // okänd enhet → inget ankare (aldrig gissa enheten)
    seen.add(a.category);
    if (seen.size > 8) break;
    try {
      const b = await getBenchmark({ category: a.category, industry: a.industry, employees: a.employees });
      // ENDAST 'real-public' (BRANCHINDEX verifierat publikt listpris) — det är den enda källan
      // vars median är PER ENHET och matchar unitLabel. 'real' (invoice_datapoints) och
      // 'live_analyses' percentilerar TOTAL årskostnad → fel enhet för per-enhet-frasen, exkluderas.
      if (b && b.median > 0 && !b.isTotal && b.source === 'real-public') {
        // seats = antal enheter ur kundens egen faktura. median (per enhet) × seats = bransch-TOTAL,
        // jämförbar med kundens annual_cost (bägge totaler, samma enhet). null → ingen total-jämförelse.
        const seats = (typeof a.seat_count === 'number' && a.seat_count > 0) ? a.seat_count : null;
        out[a.category] = {
          category: a.category, median: b.median, p25: b.p25 ?? null,
          source: b.source, unitLabel: unit.label, unitNoun: unit.noun, unitNounPl: unit.nounPl,
          customerCost: a.annual_cost ?? null, seats,
        };
      }
    } catch { /* benchmark fail-open → inget ankare för den kategorin */ }
  }
  return out;
}

async function buildForecasts(analyses) {
  // Varumärkesbrygga (samma som buildMovements): nyckelord + ILIKE, annars matchar prognosen aldrig
  // juryns/price-monitorns beskrivande leverantörsnamn i supplier_price_history.
  const pairs = new Map();
  for (const a of analyses) {
    if (a.route !== 'auto' || !a.category) continue;
    const keyword = extractSupplierKeyword(a.normalized_supplier || a.supplier);
    if (!keyword) continue;
    const key = `${keyword}|${a.category}`;
    if (!pairs.has(key)) pairs.set(key, { keyword, category: a.category });
    if (pairs.size >= 10) break;
  }
  if (pairs.size === 0) return {};

  const entries = await Promise.all(
    [...pairs.entries()].map(async ([key, { keyword, category }]) => {
      try {
        const rows = await getSupplierCategoryChangesByKeyword({ supplierKeyword: keyword, category });
        const supplier = keyword.replace(/\b\w/g, (c) => c.toUpperCase());   // snyggt varumärke i titeln
        const f = priceHikeForecast(rows, { supplier });
        return f ? [key, { ...f, category }] : null;   // category → rummet kan undertrycka mot rörelsen
      } catch { return null; }
    }),
  );
  return Object.fromEntries(entries.filter(Boolean));
}

async function buildPublicBench(analyses) {
  const seenCat = new Set();
  const out = {};
  for (const a of analyses) {
    if (a.route !== 'auto' || !a.category || !CATEGORY_UNIT[a.category]) continue;
    if (seenCat.has(a.category)) continue;
    seenCat.add(a.category);
    if (seenCat.size > 8) break;
    // Försök leverantörsspecifikt först, fall tillbaka på kategori-snitt.
    const ns = a.normalized_supplier ? normalizeSupplierName(a.supplier || a.normalized_supplier) : null;
    let pb = ns ? await getPublicBenchmark({ category: a.category, normalizedSupplier: ns }) : null;
    let scope = 'supplier';
    if (!pb) { pb = await getPublicBenchmark({ category: a.category }); scope = 'category'; }
    if (pb) out[a.category] = { ...pb, scope, supplier: a.supplier ?? null };
  }
  return out;
}

async function buildCohort(analyses) {
  // Distinkta (normalized_supplier, category) bland auto-analyser.
  const pairs = new Map();
  for (const a of analyses) {
    if (a.route !== 'auto') continue;
    const ns = a.normalized_supplier;
    if (!ns || !a.category) continue;
    pairs.set(`${ns}|${a.category}`, { normalizedSupplier: ns, category: a.category });
    if (pairs.size >= 10) break;
  }
  if (pairs.size === 0) return {};

  const entries = await Promise.all(
    [...pairs.entries()].map(async ([key, { normalizedSupplier, category }]) => {
      const mi = await getMarketIntelligence({ normalizedSupplier, category });
      return mi ? [key, mi] : null;
    }),
  );
  return Object.fromEntries(entries.filter(Boolean));
}
