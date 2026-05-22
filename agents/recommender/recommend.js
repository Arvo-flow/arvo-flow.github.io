// agents/recommender/recommend.js
// Layer 2 worker: take a categorized invoice + customer profile → return a
// recommendation (switch or don't, which alternative, savings, switch steps).
//
// Model: claude-sonnet-4-6 — the multi-criteria reasoning (TCO, reliability,
// switching cost, license-pending guard) genuinely benefits from Sonnet over
// Haiku. Categorization was a simple labelling task; recommending is a
// judgment task.
//
// Thinking: disabled — tool_choice forces tool use which is incompatible.
//
// Caching: system prompt is ~6k chars (~1700 tokens). Sonnet 4.6's cache
// minimum is 2048 tokens, so the marker is a no-op until the prompt grows
// (more categories, more few-shot). Same documented pattern as Categorizer.

import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT, RECOMMEND_TOOL } from './prompt.js';
import { getBenchmark } from '../../lib/benchmark.js';
import { CATEGORIES } from '../categorizer/categories.js';
import { getElIntelligence } from '../../lib/el-intelligence.js';
import { BRANCHINDEX } from './branchindex.js';
import { getSekRate, usdToSek, FALLBACK_RATE_USD_SEK } from './pricing.js';

const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 1024;

// Mirrors REAL_PRICE_CATEGORIES in the frontend — categories with public list
// prices where naming the suggested supplier in reasoning is fine.
const REAL_PRICE_CATEGORIES = new Set(['saas-productivity', 'saas-devtools', 'mobil']);

export class RecommenderError extends Error {
  constructor(message, { cause } = {}) {
    super(message);
    this.name = 'RecommenderError';
    if (cause) this.cause = cause;
  }
}

let _client;
function getClient() {
  if (_client) return _client;
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new RecommenderError(
      'ANTHROPIC_API_KEY saknas i miljön. Sätt den i .env eller exportera variabeln.'
    );
  }
  _client = new Anthropic();
  return _client;
}

function formatBenchmark(benchmark, seatCount, employees) {
  if (!benchmark) {
    return '(Inget branschindex finns för denna kombination — modellen ska sätta confidence: low och shouldSwitch: false.)';
  }

  // Per-user categories: use actual seat count from invoice when available,
  // fall back to employee count. Ensures apples-to-apples comparison.
  const isPerUser = benchmark.note.toLowerCase().includes('per användare');
  const effectiveSeats = seatCount ?? employees;
  const scale = isPerUser && effectiveSeats > 0 ? effectiveSeats : 1;
  const totalMedian = benchmark.median * scale;
  const totalP25 = benchmark.p25 * scale;
  const scaleLabel = seatCount != null ? `${seatCount} licenser` : `${employees} anställda`;
  const scaleNote = isPerUser
    ? ` (${benchmark.median.toLocaleString('sv-SE')} kr/användare × ${scaleLabel})`
    : '';

  const altList = (benchmark.alternatives ?? [])
    .map(
      (a) =>
        `  - ${a.supplier} (reliability ${a.reliability})\n    ${a.positioning}`
    )
    .join('\n');

  const sourceStr = benchmark.source === 'real'
    ? `Arvo Flow branschindex — ${benchmark.n} verkliga datapunkter`
    : 'Estimat från publika listpriser (ersätts med riktig kunddata)';

  return `Bransch: ${benchmark.industry}, storlek: ${benchmark.size}
Median (total, per år): ${totalMedian.toLocaleString('sv-SE')} ${benchmark.unit}${scaleNote}
Arvo-volympris (förhandlat, per år): ${totalP25.toLocaleString('sv-SE')} ${benchmark.unit}${isPerUser ? ` (${benchmark.p25.toLocaleString('sv-SE')} kr/användare × ${scaleLabel})` : ''}

Alternativa leverantörer:
${altList}

Källa: ${sourceStr}`;
}

/**
 * Berikar el-kategorifakturor med realtids Nordpool-spotpris och
 * leverantörsjämförelse. Returnerar en formaterad svensk sträng som
 * injiceras i user-meddelandet till rekommenderaren.
 *
 * @param {object} params
 * @param {number} params.annualCost              - fakturans beräknade årskostnad kr
 * @param {object} params.categorized             - output från Categorizer
 * @returns {Promise<string|null>}
 */
async function enrichElContext({ annualCost, categorized }) {
  try {
    // Estimera kWh och kr/kWh från årskostnaden.
    // Mediankr/kWh all-in för svenska SMB (energi + nät + skatt) ≈ 1.27 kr/kWh.
    const annualKwh      = Math.round(annualCost / 1.27);
    const currentPriceKwh = annualKwh > 0 ? annualCost / annualKwh : 1.27;

    const intel = await getElIntelligence({
      annualKwh,
      currentPriceKwh,
      supplierName: categorized.normalizedSupplier,
    });

    const { zone, spot, spotSource, best, ranked, saving, savingPct } = intel;
    const spotLabel = spotSource === 'live'
      ? `${spot.toFixed(4)} kr/kWh (Nordpool live)`
      : `${spot.toFixed(4)} kr/kWh (årsmedel 2025, API otillgängligt)`;

    const top3 = ranked.slice(0, 3).map((s, i) =>
      `  ${i + 1}. ${s.name}: ${s.energyPerKwh.toFixed(4)} kr/kWh energi + ${s.annualFee.toLocaleString('sv-SE')} kr/år avgift = ${s.totalAnnual.toLocaleString('sv-SE')} kr/år totalt`
    ).join('\n');

    return `\nEl-prisintelligens (Nordpool ${zone}):
  Dagens spotpris: ${spotLabel}
  Bästa leverantör: ${best.name} — ${best.energyPerKwh.toFixed(4)} kr/kWh energipris, ${best.totalAnnual.toLocaleString('sv-SE')} kr/år totalt (inkl. nät + skatt)
  Uppskattad besparing vs kund: ${saving.toLocaleString('sv-SE')} kr/år (${savingPct} %)
  Topp 3 alternativ:
${top3}
  OBS: Använd dessa siffror i din reasoning. Namnge leverantören (el är offentliga spotpriser).`;
  } catch (err) {
    console.warn('[Recommender] enrichElContext misslyckades (non-fatal):', err.message);
    return null;
  }
}

function formatPrompt({ customer, invoice, categorized, benchmark, elContext, convertedTierBm }) {
  const annualCost = invoice.annualCost ?? invoice.amount;
  const mobileAddonAnnual = (invoice.mobileAddonMonthly > 0) ? invoice.mobileAddonMonthly * 12 : null;
  const employees = customer.employees ?? 1;
  const seatCount = invoice.seatCount ?? null;
  const isAccountingSystem = categorized.subType === 'affärssystem';
  const bm = benchmark;
  const isPerUser = bm && bm.note.toLowerCase().includes('per användare');
  const effectiveSeats = seatCount ?? employees;
  const scale = isPerUser && effectiveSeats > 0 ? effectiveSeats : 1;
  const totalMedian = bm ? bm.median * scale : null;
  const isRealData      = bm?.source === 'real';
  const isVerifiedPublic = bm?.source === 'real-public';
  const isEstimated      = bm?.source === 'estimated';
  const dataPoints = bm?.n ?? 0;

  // Skip benchmark % comparison for accounting systems.
  const overpaymentPct =
    !isAccountingSystem && totalMedian && totalMedian > 0
      ? Math.round(((annualCost - totalMedian) / totalMedian) * 100)
      : null;

  // Annotation injected next to the annual cost — controls what the AI echoes back.
  // Three tiers: real DB data, verified public prices, range-based estimates.
  const overpaymentAnnotation = overpaymentPct !== null
    ? isRealData
      ? `  ← ${overpaymentPct > 0 ? overpaymentPct + ' % ÖVER medianen' : Math.abs(overpaymentPct) + ' % UNDER medianen'} (${dataPoints} analyserade fakturor i databasen)`
      : isVerifiedPublic
        ? `  ← ${overpaymentPct > 0 ? overpaymentPct + ' % ÖVER verifierat listpris' : Math.abs(overpaymentPct) + ' % UNDER verifierat listpris'}`
        : `  ← ${overpaymentPct > 0 ? overpaymentPct + ' % ÖVER branschstandarden' : Math.abs(overpaymentPct) + ' % UNDER branschstandarden'}`
    : '';

  // Explicit phrasing instruction so the AI uses the right language in reasoning.
  const phrasingRule = isAccountingSystem
    ? 'OBS: Detta är ett affärssystem. Jämför INTE kostnaden procentuellt mot medianen. Undersök om inbyggda funktioner täcker behovet och ge konkret åtgärdsrekommendation.'
    : isRealData
      ? `OBS: Benchmarkdatan är baserad på ${dataPoints} verkliga kundfakturor i Arvo Flows databas. I din reasoning, skriv "X % över medianen, baserat på ${dataPoints} analyserade fakturor i er bransch." — använd ALDRIG "referenspriser".`
      : isVerifiedPublic
        ? 'OBS: Benchmarkdatan är verifierade offentliga listpriser — INTE aggregerade kundfakturor. I din reasoning, skriv "X % över verifierat marknadspris" eller "listpriset hos billigaste leverantör är Y kr" — ALDRIG "medianen" eller "verkliga datapunkter".'
        : 'OBS: Benchmarkdatan är intervallbaserade branschuppskattningar — INTE exakta priser. I din reasoning, skriv "Vår data visar att branschstandarden för detta ligger på ca X–Y kr. Ni betalar idag Z kr, vilket indikerar en potentiell överdebitering." — ALDRIG "exakta priser", "garanterade" eller "medianen".';

  const benchmarkBlock = isAccountingSystem
    ? formatBenchmark(benchmark, seatCount, employees) + '\n\n' + phrasingRule
    : formatBenchmark(benchmark, seatCount, employees);

  const secretOverride = REAL_PRICE_CATEGORIES.has(categorized.category)
    ? `\nOVERRIDE SEKRETESSREGEL: Kategorin "${categorized.category}" har offentliga listpriser. Du FÅR och SKA namnge den föreslagna leverantören i reasoning-fältet för denna faktura.`
    : '';

  const speedNote = (categorized.category === 'bredband' && invoice.connectionSpeedMbit > 0)
    ? `\n  Nuvarande hastighet: ${invoice.connectionSpeedMbit} Mbit/s — benchmarken ovan gäller för EXAKT denna hastighets-tier. Jämför mot motsvarande produkt (${invoice.connectionSpeedMbit} Mbit/s eller bättre till samma pris). Nämn ALDRIG en annan hastighet i reasoning utan att explicit förklara att det är ett uppgrade.`
    : '';

  const saasNote = (() => {
    if (!['saas-productivity', 'saas-devtools'].includes(categorized.category)) return '';
    const isDevtools = categorized.category === 'saas-devtools';
    const lt  = invoice.licenseType;
    const bc  = invoice.billingCycleType;
    const pps = invoice.pricePerSeatMonthly;
    // Använd konverterade SEK-värden (convertedTierBm) om tillgängliga,
    // annars fallback till rådata från branchindex (Microsoft SEK-tiers).
    const _saasNoteKey = getSaasLicenseTierKey(lt, invoice.saasProductFamily ?? null);
    const tierBm  = convertedTierBm ?? (_saasNoteKey
      ? BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks?.[_saasNoteKey]
      : null);
    const seats   = (invoice.seatCount ?? customer.employees) || 1;
    // For devtools: target is msrpAnnual (public direct price). For productivity: arvoAnnual (CSP).
    const targetPrice = isDevtools ? tierBm?.msrpAnnual : tierBm?.arvoAnnual;
    const targetLabel = isDevtools ? 'Direktavtal årsavtal (Atlassian.com)' : 'Arvo årsavtal';

    const lines = [];
    if (lt) lines.push(`  Licensplan            : ${lt}`);
    lines.push(`  Faktureringsmodell    : ${bc === 'monthly' ? 'Månadsvis — kunden betalar löpande utan årsåtagande' : bc === 'annual' ? 'Årsavtal — kunden har redan åtagit sig 12 månader' : 'Okänt'}`);
    if (pps != null) lines.push(`  Aktuellt pris/seat    : ${pps.toFixed(0)} kr/mån`);

    if (tierBm) {
      lines.push(`\n  Tier-benchmarks (${isDevtools ? 'Atlassian publikt listpris' : 'Arvo CSP'} maj 2026, ${seats} seats):`);
      lines.push(`    MSRP månadsvis  : ${tierBm.msrpMonthly} kr/seat/mån  = ${(tierBm.msrpMonthly * 12 * seats).toLocaleString('sv-SE')} kr/år totalt`);
      if (tierBm.msrpAnnual != null) {
        lines.push(`    MSRP årsavtal   : ${tierBm.msrpAnnual} kr/seat/mån  = ${(tierBm.msrpAnnual * 12 * seats).toLocaleString('sv-SE')} kr/år totalt`);
        if (!isDevtools) lines.push(`    Arvo årsavtal   : ${tierBm.arvoAnnual} kr/seat/mån  = ${(tierBm.arvoAnnual * 12 * seats).toLocaleString('sv-SE')} kr/år totalt`);
        lines.push(`    → Målpris (${targetLabel}): ${targetPrice} kr/seat/mån = ${(targetPrice * 12 * seats).toLocaleString('sv-SE')} kr/år  ← DETTA ÄR ERT MÅL`);
        if (pps != null && bc === 'monthly') {
          const annualBilling = Math.round((pps - tierBm.msrpAnnual) * 12 * seats);
          const cspSaving     = Math.round((tierBm.msrpAnnual - tierBm.arvoAnnual) * 12 * seats);
          if (annualBilling > 0) lines.push(`    → Byta till årsavtal (same tier): ${annualBilling.toLocaleString('sv-SE')} kr/år`);
          if (cspSaving > 0)    lines.push(`    → Arvo CSP vs. MSRP årsavtal: ${cspSaving.toLocaleString('sv-SE')} kr/år`);
        }
      } else {
        // Atlassian tier-bucket: årsavtal är en fast summa per tier (101-200 users: $32 000 Jira + $23 000 Confluence).
        // För 110 users kostar årsavtal MER än månadsavtal. Arvo har inget Atlassian-återförsäljaravtal.
        lines.push(`    MSRP årsavtal   : Tier-bucket (fast summa per user-spann — årsavtal kostar MER vid ${seats} seats)`);

        // Visa kombinerat listpris om fakturan innehåller Confluence-produkt
        const invoiceText = [
          invoice.description ?? '',
          ...(invoice.lineItems ?? []).map((li) => li.description ?? ''),
        ].join(' ').toLowerCase();
        if (invoiceText.includes('confluence') && convertedTierBm) {
          const ltLower = (lt ?? '').toLowerCase();
          const confKey = ltLower.includes('premium') ? 'atlassian-confluence-premium' : 'atlassian-confluence-standard';
          const rawConf = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks?.[confKey];
          if (rawConf?.usdMonthly) {
            const confMonthly = usdToSek(rawConf.usdMonthly, convertedTierBm.fxRate ?? FALLBACK_RATE_USD_SEK);
            const combinedMonthly = tierBm.msrpMonthly + confMonthly;
            lines.push(`    Confluence ${ltLower.includes('premium') ? 'Premium' : 'Standard'}: ${confMonthly} kr/seat/mån`);
            lines.push(`    → Kombinerat listpris (Jira + Confluence): ${combinedMonthly} kr/seat/mån = ${(combinedMonthly * 12 * seats).toLocaleString('sv-SE')} kr/år`);
            if (pps != null) {
              const vsListPct = Math.round(((pps - combinedMonthly) / combinedMonthly) * 100);
              if (vsListPct <= 0) {
                lines.push(`    → Kunden betalar ${pps} kr vs ${combinedMonthly} kr kombinerat listpris — KUNDEN ÄR UNDER LISTPRIS. Inget bytespotential.`);
              } else {
                lines.push(`    → Kunden betalar ${pps} kr vs ${combinedMonthly} kr kombinerat listpris — ${vsListPct}% över listpris.`);
              }
            }
          }
        }
        lines.push(`    → Arvo saknar Atlassian-återförsäljaravtal — rekommendera advisory med uppmaning att koppla Fortnox/Visma`);
      }

      // Downsell note for enterprise tiers with SMF-sized companies
      if ((_saasNoteKey === 'e3' || _saasNoteKey === 'e5') && seats <= 300) {
        const bpTier = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks?.['business-premium'];
        if (bpTier) {
          const downsellSav = Math.round((tierBm.arvoAnnual - bpTier.arvoAnnual) * 12 * seats);
          lines.push(`\n  TIERANALYS — ${_saasNoteKey.toUpperCase()} för ${seats} seats:`);
          lines.push(`    ${_saasNoteKey.toUpperCase()} motiveras av: eDiscovery, avancerat auditlogg, Purview compliance, SIEM.`);
          lines.push(`    Saknas dessa krav: Business Premium (Intune + Defender) räcker för säkerhetsfokuserade SMF.`);
          lines.push(`    Möjlig tier-besparing (${_saasNoteKey.toUpperCase()} → Business Premium, Arvo CSP): ${downsellSav.toLocaleString('sv-SE')} kr/år`);
          lines.push(`    OBS: Nämn alltid tier-alternativet i reasoning om kunden troligen saknar E3-specifika behov.`);
        }
      }
    }

    // Feature overlap detection (M365 / Google Workspace only)
    const features = invoice.saasIncludedFeatures ?? null;
    if (features?.length > 0) {
      lines.push(`\n  INKLUDERADE TJÄNSTER: ${features.join(', ')}`);
      const overlaps = [];
      if (features.includes('Microsoft Teams'))
        overlaps.push('Zoom eller Google Meet (videokonferens ingår redan i Teams)');
      if (features.includes('OneDrive'))
        overlaps.push('Dropbox, Box eller Google Drive (molnlagring ingår redan)');
      if (features.includes('SharePoint'))
        overlaps.push('Confluence eller Notion (wiki/intranät ingår redan i SharePoint)');
      if (overlaps.length > 0) {
        lines.push(`  MÖJLIG DUPLICERAD KOSTNAD: Kunden kanske betalar separat för: ${overlaps.join('; ')}.`);
        lines.push(`  → Om du ser tecken på överlapp i fakturabeskrivningen: nämn det i reasoning.`);
      }
    }

    // Shadow IT / underage detection
    const _sc  = invoice.seatCount ?? null;
    const _emp = customer.employees || 1;
    if (_sc != null && _sc < _emp) {
      const unlic = _emp - _sc;
      lines.push(`\n  SHADOW IT-RISK: ${_sc} licenser men ${_emp} anst. → ${unlic} anst saknar troligen formell licens.`);
      lines.push(`  → Nämn compliance-risk och shadow IT i reasoning — det är ett argument för rätt licensantal.`);
    }

    return lines.length > 0
      ? `\n\nSaaS-licensintelligens:\n${lines.join('\n')}`
      : '';
  })();

  return `Kunden:
  Bolagstyp: ${customer.industry}
  Anställda: ${employees}
  Omsättning: ${customer.revenue ? customer.revenue.toLocaleString('sv-SE') + ' kr' : '(okänt)'}

Kategoriserad faktura:
  Kategori: ${categorized.category}
  Sub-typ: ${categorized.subType || '(okänd)'}
  Nuvarande leverantör: ${categorized.normalizedSupplier}
  Årskostnad (totalt): ${annualCost.toLocaleString('sv-SE')} kr${overpaymentAnnotation}${mobileAddonAnnual ? `
  Varav mobilabonnemang: ${(annualCost - mobileAddonAnnual).toLocaleString('sv-SE')} kr/år
  Varav tilläggstjänster (molnväxel/cloud PBX): ${mobileAddonAnnual.toLocaleString('sv-SE')} kr/år
  OBS: Prissätt ett KOMPLETT ersättningspaket inkl. motsvarande tilläggstjänst — jämförelsen ska vara total mot total.` : ''}
  Confidence från Categorizer: ${categorized.confidence}

Branschindex för segmentet:
${benchmarkBlock}

${phrasingRule}${secretOverride}${saasNote}${speedNote}${elContext ? elContext : ''}

Ge en rekommendation enligt instruktionerna. Returnera via verktyget "recommend".`;
}

/**
 * Recommend (or don't) a supplier switch.
 *
 * @param {object} input
 * @param {object} input.customer    - { industry, employees, revenue }
 * @param {object} input.invoice     - { amount?, annualCost? }
 * @param {object} input.categorized - output from Categorizer
 * @param {object} [opts]
 * @param {Anthropic} [opts.client]
 */
function closestSpeedTier(speedMbit) {
  for (const t of [100, 250, 500, 1000]) {
    if (speedMbit <= t) return t;
  }
  return 1000;
}

// Maps an extracted license type string to a branchindex tier key.
function getSaasLicenseTierKey(licenseType, productFamily) {
  const lt = (licenseType   || '').toLowerCase();
  const pf = (productFamily || '').toLowerCase();
  if (!lt && !pf) return null;

  // Microsoft 365
  if (lt.includes('business basic'))                                    return 'business-basic';
  if (lt.includes('business standard') || lt.includes('apps for business')) return 'business-standard';
  if (lt.includes('business premium'))                                  return 'business-premium';
  if (lt === 'e3' || lt.includes(' e3') || lt.includes('enterprise e3'))  return 'e3';
  if (lt === 'e5' || lt.includes(' e5') || lt.includes('enterprise e5'))  return 'e5';

  // Google Workspace
  if (pf.includes('google') || lt.includes('google workspace') || lt.includes('google workspace')) {
    if (lt.includes('starter'))  return 'google-starter';
    if (lt.includes('plus'))     return 'google-plus';
    if (lt.includes('standard')) return 'google-standard';
    return 'google-standard';
  }

  // Slack
  if (pf === 'slack' || lt.includes('slack')) {
    if (lt.includes('business')) return 'slack-business-plus';
    return 'slack-pro';
  }

  // Zoom
  if (pf === 'zoom' || lt.includes('zoom')) {
    if (lt.includes('business')) return 'zoom-business';
    return 'zoom-pro';
  }

  // Atlassian
  if (lt.includes('confluence') || pf === 'atlassian-confluence') {
    if (lt.includes('premium')) return 'atlassian-confluence-premium';
    return 'atlassian-confluence-standard';
  }
  if (lt.includes('jira') || pf === 'atlassian-jira' || pf.includes('atlassian')) {
    if (lt.includes('premium')) return 'atlassian-jira-premium';
    return 'atlassian-jira-standard';
  }

  return null;
}

export async function recommend(input, opts = {}) {
  if (!input?.customer || !input?.categorized) {
    throw new RecommenderError(
      'input måste innehålla customer + categorized + invoice'
    );
  }

  // Hämta live SEK/USD-kurs för USD-prissatta produkter (Atlassian, Slack, Zoom, Google).
  // Microsoft-priser är SEK-satta av Microsoft SE och behöver ingen konvertering.
  const fxResult = await getSekRate(opts.kvStore ?? null);
  const sekPerUsd = fxResult.rate ?? FALLBACK_RATE_USD_SEK;
  if (fxResult.source === 'fallback') {
    console.warn(`[recommend] Använder fallback FX-kurs ${sekPerUsd} SEK/USD`);
  }

  const rawBenchmark = await getBenchmark({
    category: input.categorized.category,
    industry: input.customer.industry,
    employees: input.customer.employees,
  });

  // Speed-tier override för bredband: ersätt median/p25 med hastighetsspecifika värden
  // när connection_speed_mbit är känt. Fiberpriser beror på hastighet, inte bolagets storlek.
  const connectionSpeedMbit = input.invoice?.connectionSpeedMbit ?? null;
  let benchmark = rawBenchmark;
  if (input.categorized.category === 'bredband' && connectionSpeedMbit > 0 && rawBenchmark) {
    const speedTiers = BRANCHINDEX.bredband?.speedTierBenchmarks;
    const tier = closestSpeedTier(connectionSpeedMbit);
    const speedBm = speedTiers?.[tier];
    if (speedBm) {
      benchmark = { ...rawBenchmark, median: speedBm.median, p25: speedBm.p25, note: speedBm.note };
    }
  }

  // License tier override for saas-productivity / saas-devtools: swap generic p25
  // for tier-specific pricing so savings reflect what Arvo can actually deliver.
  // saas-productivity → arvoAnnual (CSP price)
  // saas-devtools     → msrpAnnual (public direct price — Arvo facilitates, not resells)
  const licenseType       = input.invoice?.licenseType ?? null;
  const billingCycleType  = input.invoice?.billingCycleType ?? null;
  const pricePerSeatMonthly = input.invoice?.pricePerSeatMonthly ?? null;
  const isSaasDevtools    = input.categorized.category === 'saas-devtools';
  let   saasLicenseTierKey = null;
  let   saasTierBm         = null;

  // OBS: rawBenchmark kan vara null för saas-devtools (ingen matrix i branchindex).
  // Tier-override bygger benchmark från grunden om tier hittas — rawBenchmark krävs EJ.
  if (['saas-productivity', 'saas-devtools'].includes(input.categorized.category)) {
    saasLicenseTierKey = getSaasLicenseTierKey(licenseType, input.invoice?.saasProductFamily ?? null);
    const rawTierBm = saasLicenseTierKey
      ? BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks?.[saasLicenseTierKey]
      : null;

    if (rawTierBm) {
      // Konvertera USD-tiers till SEK med live-kurs. Microsoft-tiers har currency:'SEK' och
      // lagrar SEK-priser direkt — konvertering ej nödvändig/möjlig.
      if (rawTierBm.currency === 'USD') {
        saasTierBm = {
          ...rawTierBm,
          msrpMonthly: usdToSek(rawTierBm.usdMonthly, sekPerUsd),
          // Atlassian: usdAnnual === null (tier-bucket, inte per-user). Behåll null.
          msrpAnnual:  rawTierBm.usdAnnual != null ? usdToSek(rawTierBm.usdAnnual, sekPerUsd) : null,
          arvoAnnual:  rawTierBm.usdArvoAnnual ? usdToSek(rawTierBm.usdArvoAnnual, sekPerUsd) : null,
          fxRate: sekPerUsd, fxSource: fxResult.source, fxDate: fxResult.date,
        };
      } else {
        saasTierBm = rawTierBm; // SEK — Microsoft, direkt användbart
      }

      const targetP25 = isSaasDevtools
        ? saasTierBm.msrpAnnual                              // devtools: publik direktpris (null för Atlassian tier-bucket)
        : (saasTierBm.arvoAnnual ?? saasTierBm.msrpAnnual); // productivity: Arvo CSP
      // Bygg benchmark bara om targetP25 finns.
      // Atlassian (tier-bucket annual): targetP25 är null → benchmark förblir null.
      // Licensrensningssparande beräknas från fakturapris i Atlassian-override nedan.
      if (targetP25 != null) {
        benchmark = {
          ...(rawBenchmark ?? {}),
          p25:    targetP25 * 12,
          median: saasTierBm.msrpMonthly * 12,
          note:   saasTierBm.note + ' Per användare/år.',
        };
      }
    }
  }

  // Always compute annual billing saving (informational, independent of switch decision)
  let annualBillingSaving = null;
  if (billingCycleType === 'monthly' && saasTierBm && saasTierBm.msrpAnnual != null) {
    const _seats = input.invoice?.seatCount ?? input.customer?.employees ?? 1;
    const sav = Math.round((saasTierBm.msrpMonthly - saasTierBm.msrpAnnual) * 12 * _seats);
    annualBillingSaving = sav > 0 ? sav : null;
  }

  // Managed Print guard: if click costs dominate (>35 % of invoice), one month's
  // data is too volatile to annualise. Return a requires_quote state immediately,
  // skipping the AI call entirely.
  if (input.categorized.category === 'skrivarleasing') {
    const fixed    = input.invoice.recurringAmount   ?? 0;
    const clicks   = input.invoice.variableCharges   ?? 0;
    const total    = fixed + clicks;
    const clickRatio = total > 0 ? clicks / total : 0;
    if (clickRatio > 0.35) {
      return {
        shouldSwitch:       false,
        requiresQuote:      true,
        recommendationType: 'requires_quote',
        reasoning:          'Era utskriftskostnader drivs av hög volym på färgutskrifter, inte bara maskinhyran. Arvo behöver analysera ert snitt över 3–6 månader för att förhandla fram ett rättvist klick-avtal.',
        suggestedSupplier:  null,
        suggestedAnnualCost: null,
        grossSaving:        null,
        arvoFee:            null,
        netSaving:          null,
        confidence:         'low',
        switchSteps:        [],
        licenseOverage:     null,
        overageSavings:     null,
        optimizationSaving: null,
        benchmark,
        usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
      };
    }
  }

  const client = opts.client ?? getClient();

  // Berika el-fakturor med realtids spotpris och leverantörsjämförelse (non-fatal).
  let elContext = null;
  if (input.categorized.category === 'el') {
    // Om annualCost = 0 (elförbrukning felklassificerad som variable_usage),
    // estimera från fakturabeloppet × 12 för att ändå kunna berika med spotdata.
    let annualCost = input.invoice.annualCost ?? 0;
    if (annualCost === 0 && (input.invoice.amount ?? 0) > 0) {
      annualCost = Math.round(input.invoice.amount * 12);
    }
    elContext = await enrichElContext({ annualCost, categorized: input.categorized });
  }

  const requestParams = {
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
    tools: [RECOMMEND_TOOL],
    tool_choice: { type: 'tool', name: 'recommend' },
    messages: [{ role: 'user', content: formatPrompt({ ...input, benchmark, elContext, convertedTierBm: saasTierBm }) }],
  };

  let response;
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      response = await client.messages.create(requestParams);
      break;
    } catch (err) {
      const overloaded = err instanceof Anthropic.APIError && err.status === 529;
      if (overloaded && attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, attempt * 1500));
        continue;
      }
      if (err instanceof Anthropic.RateLimitError) {
        throw new RecommenderError('Tjänsten är tillfälligt överbelastad — försök igen om en stund.', { cause: err });
      }
      if (err instanceof Anthropic.APIError && err.status === 529) {
        throw new RecommenderError('Tjänsten är tillfälligt överbelastad — försök igen om en stund.', { cause: err });
      }
      if (err instanceof Anthropic.APIError) {
        throw new RecommenderError('Analysen misslyckades — försök igen.', { cause: err });
      }
      throw err;
    }
  }

  const toolUse = response.content.find((b) => b.type === 'tool_use');
  if (!toolUse) {
    throw new RecommenderError(
      'Inget tool_use-block i svaret — modellen avvek från instruktionerna'
    );
  }

  const result = toolUse.input;

  // Accounting-system guard: 'optimize' is never valid when subType is
  // 'affärssystem'. The main accounting license (Fortnox, Visma…) IS the
  // primary product — classifying it as a redundant add-on is logically wrong.
  // The few-shot example for Fortnox e-faktura uses subType 'efaktura'; if the
  // model pattern-matches on supplier name alone and fires optimize for the main
  // license, we strip it here before any financial overrides run.
  if (
    result.recommendationType === 'optimize' &&
    input.categorized.subType === 'affärssystem'
  ) {
    console.warn(
      `[Recommender] Stripped optimize route: subType=affärssystem (${input.categorized.normalizedSupplier}). ` +
      'Main accounting license cannot be classified as redundant add-on.'
    );
    result.recommendationType = 'no_action';
    result.optimizationSaving = null;
    result.shouldSwitch = false;
  }

  // Belt-and-suspenders: enforce license-pending guard at the code level too,
  // not just trust the model. If the category is license-pending and the model
  // somehow returned a suggested supplier, strip it and force VIP queue.
  const categoryDef = CATEGORIES[input.categorized.category];
  if (categoryDef?.licensePending) {
    if (result.suggestedSupplier !== null && result.suggestedSupplier !== undefined) {
      console.warn(
        `[Recommender] Model returned suggestedSupplier="${result.suggestedSupplier}" for license-pending category "${input.categorized.category}". Stripping at code level.`
      );
    }
    result.suggestedSupplier = null;
    result.suggestedAnnualCost = null;
    result.shouldSwitch = false;
    result.vipQueue = true;
    result.switchSteps = [];
  }

  // Hard block: saas-other och saas-devtools kan inte producera bytesrekommendation.
  // saas-other: inget branschindex.
  // saas-devtools (Atlassian): inget återförsäljaravtal, årsavtal är tier-bucket och
  // ofta dyrare, faktisk licensanvändning okänd utan Fortnox/Visma-integration.
  if (input.categorized.category === 'saas-other' ||
      input.categorized.category === 'saas-devtools') {
    result.shouldSwitch        = false;
    result.suggestedSupplier   = null;
    result.suggestedAnnualCost = null;
    result.grossSaving         = null;
    result.savingPerYear       = null;
    result.arvoFee             = null;
    result.netSaving           = null;
    result.licenseOverage      = null;
    result.overageSavings      = null;
    result.savingsBreakdown    = null;
    result.recommendationType  = 'advisory';
  }

  // Deterministic shouldSwitch override: if the customer pays >15 % over p25,
  // always recommend a switch regardless of what the model decided.
  // This eliminates AI flip-flopping on clear-cut overpayment cases.
  if (!categoryDef?.licensePending && benchmark) {
    // For combined invoices: compare only the primary component (not bundled unrelated services)
    const _isCombined = input.invoice.potentialMixedCategories ?? false;
    const _primaryMonthly = input.invoice.primaryComponentMonthly ?? null;
    // Guard: skip the override when combined+primaryComponentMonthly missing.
    // Comparing the full invoice cost against a single-category benchmark would
    // produce absurdly overstated savings (e.g. 45 k total vs 1.5 k mobile p25).
    if (!_isCombined || _primaryMonthly != null) {
      const _addonMonthly = (input.invoice.mobileAddonMonthly ?? 0) + (input.invoice.broadbandAddonMonthly ?? 0);
      const _annualCost = (_isCombined && _primaryMonthly != null)
        ? Math.round((_primaryMonthly + _addonMonthly) * 12)
        : (input.invoice.annualCost ?? input.invoice.amount ?? 0);
      const _employees  = input.customer.employees ?? 1;
      const _seatCount  = input.invoice.seatCount ?? null;
      const _isPerUser  = benchmark.note.toLowerCase().includes('per användare');
      const _seats      = _isPerUser ? (_seatCount ?? _employees) : 1;
      // Take the minimum of seat-based and employee-based p25 so the override still
      // triggers even when seatCount is inflated by add-on licenses (e.g. 57+57=114).
      const _p25BySeat  = Math.round(benchmark.p25 * _seats);
      const _p25ByEmp   = _isPerUser ? Math.round(benchmark.p25 * _employees) : _p25BySeat;
      const _p25Total   = Math.min(_p25BySeat, _p25ByEmp);
      if (_p25Total > 0 && _annualCost > _p25Total * 1.15) {
        result.shouldSwitch = true;
      }
    }
  }

  // Deterministic financial overrides — AI provides reasoning only.
  // All SEK figures are locked to benchmark.p25 so results never vary
  // between runs. The model must not be trusted for financial arithmetic.
  if (result.shouldSwitch && benchmark) {
    const annualCost = input.invoice.annualCost ?? input.invoice.amount ?? 0;
    const employees = input.customer.employees ?? 1;
    const seatCount = input.invoice.seatCount ?? null;
    const isPerUser = benchmark.note.toLowerCase().includes('per användare');
    const effectiveSeats = seatCount ?? employees;
    const scale = isPerUser && effectiveSeats > 0 ? effectiveSeats : 1;

    // For mobile/broadband invoices with add-on services, the benchmark covers
    // the base product only (bare SIM / bare fiber). Exclude the add-on from the
    // saving calculation and pass it through to suggestedAnnualCost so we never
    // claim savings on components the benchmark doesn't price.
    const mobileAddonAnnual = (input.categorized.category === 'mobil' && (input.invoice.mobileAddonMonthly ?? 0) > 0)
      ? Math.round(input.invoice.mobileAddonMonthly * 12)
      : 0;
    const broadbandAddonAnnual = (input.categorized.category === 'bredband' && (input.invoice.broadbandAddonMonthly ?? 0) > 0)
      ? Math.round(input.invoice.broadbandAddonMonthly * 12)
      : 0;
    const addonAnnual = mobileAddonAnnual + broadbandAddonAnnual;

    // For combined invoices: benchmark only the primary component so we never
    // claim savings on bundled services (e.g. bredband on a mobil invoice) that
    // the category benchmark doesn't cover.
    const isCombined = input.invoice.potentialMixedCategories ?? false;
    const primaryComponentMonthly = input.invoice.primaryComponentMonthly ?? null;
    const primaryComponentAnnual = isCombined && primaryComponentMonthly != null
      ? Math.round(primaryComponentMonthly * 12)
      : null;

    // Guard: for combined invoices where AI failed to return primaryComponentMonthly,
    // the full annualCost cannot reliably be compared against a single-category benchmark.
    // Skip the deterministic override (AI values stand) and mark nonPrimaryAnnual = 0.
    if (isCombined && primaryComponentAnnual == null) {
      result.nonPrimaryAnnual = 0;
      // Exit the financial override block — use AI-provided values as-is.
    } else {

    const comparableAnnualCost = primaryComponentAnnual != null
      ? primaryComponentAnnual                 // bare primary only, addons excluded
      : annualCost - addonAnnual;              // full invoice minus addon pass-throughs

    // Non-primary: portion of the invoice outside the benchmarked component (shown in UI)
    result.nonPrimaryAnnual = primaryComponentAnnual != null
      ? Math.max(0, Math.round(annualCost - primaryComponentAnnual - addonAnnual))
      : 0;

    result.suggestedAnnualCost = Math.round(benchmark.p25 * scale) + addonAnnual;
    result.savingPerYear = Math.max(0, Math.round(comparableAnnualCost - Math.round(benchmark.p25 * scale)));
    result.overpaymentPercent = benchmark.median > 0
      ? Math.round(((comparableAnnualCost - benchmark.median * scale) / (benchmark.median * scale)) * 100)
      : (result.overpaymentPercent ?? 0);

    if (seatCount != null && seatCount > employees) {
      result.licenseOverage = seatCount - employees;
      result.overageSavings = Math.round(result.licenseOverage * benchmark.p25);
    } else {
      result.licenseOverage = null;
      result.overageSavings = null;
    }

    // Tier optimization potential — advisory saving if on E3/E5 and could downgrade
    let tierOptimizationSaving = null;
    if ((saasLicenseTierKey === 'e3' || saasLicenseTierKey === 'e5') && saasTierBm) {
      const bpTier = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks?.['business-premium'];
      if (bpTier && effectiveSeats > 0) {
        tierOptimizationSaving = Math.round((saasTierBm.arvoAnnual - bpTier.arvoAnnual) * 12 * effectiveSeats);
      }
    }

    // Savings breakdown — decompose total saving by channel
    result.savingsBreakdown = {
      cspDiscount:         Math.max(0, comparableAnnualCost - (result.suggestedAnnualCost - addonAnnual)),
      billingOptimization: (billingCycleType === 'monthly' && saasTierBm && saasTierBm.msrpAnnual != null && effectiveSeats > 0)
        ? Math.max(0, Math.round((saasTierBm.msrpMonthly - saasTierBm.msrpAnnual) * 12 * effectiveSeats))
        : null,
      tierOptimization:    tierOptimizationSaving,
      licenseCleanup:      result.overageSavings ?? null,
    };

    // Minimigräns: ett leverantörsbyte under 500 kr nettobesparing per år är
    // operationellt orimligt — byteskostnad i tid överstiger vinsten.
    if ((result.savingPerYear ?? 0) < 500) {
      result.shouldSwitch = false;
      result.licenseOverage = null;
      result.overageSavings = null;
    }

    } // end else (combined+null guard)
  }

  return {
    ...result,
    recommendationType: result.recommendationType ?? (result.shouldSwitch ? 'switch' : 'no_action'),
    optimizationSaving: result.optimizationSaving ?? null,
    suggestedSupplier: result.suggestedSupplier ?? null,
    suggestedAnnualCost: result.suggestedAnnualCost ?? null,
    annualBillingSaving,
    savingsBreakdown: result.savingsBreakdown ?? null,
    benchmark,
    usage: {
      input_tokens: response.usage.input_tokens,
      output_tokens: response.usage.output_tokens,
      cache_creation_input_tokens:
        response.usage.cache_creation_input_tokens ?? 0,
      cache_read_input_tokens: response.usage.cache_read_input_tokens ?? 0,
    },
    raw: result,
  };
}

/**
 * Batch with concurrency. Same shape as Categorizer for consistency.
 */
export async function recommendBatch(inputs, opts = {}) {
  const client = opts.client ?? getClient();
  const concurrency = opts.concurrency ?? 4;
  const results = new Array(inputs.length);

  let cursor = 0;
  async function worker() {
    while (cursor < inputs.length) {
      const i = cursor++;
      try {
        results[i] = await recommend(inputs[i], { client });
      } catch (err) {
        results[i] = { error: err.message, input: inputs[i] };
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, inputs.length) }, worker)
  );
  return results;
}

export { MODEL };
