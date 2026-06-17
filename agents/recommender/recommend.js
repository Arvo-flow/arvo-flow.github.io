// agents/recommender/recommend.js
// Layer 2 worker: take a categorized invoice + customer profile → return a
// recommendation (switch or don't, which alternative, savings, switch steps).
//
// Model: claude-opus-4-7 — upgraded from Sonnet 4.6 for richer reasoning
// quality. The recommendation text ("Vad analysen visar") is customer-facing
// and benefits from Opus's more nuanced judgment on Swedish market context,
// tier-fit analysis, and business rationale.
//
// Thinking: disabled — tool_choice forces tool use which is incompatible.
//
// Caching: system prompt is ~6k chars (~1700 tokens). Cache minimum is
// 1024 tokens for Opus 4.7, so the marker is effective.

import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT, RECOMMEND_TOOL } from './prompt.js';
import { checkProseNumbers } from '../../lib/prose-guard.js';
import { getBenchmark } from '../../lib/benchmark.js';
import { CATEGORIES } from '../categorizer/categories.js';
import { getElIntelligence } from '../../lib/el-intelligence.js';
import { BRANCHINDEX, bredbandSpeedBenchmark } from './branchindex.js';
import { getSekRate, usdToSek, FALLBACK_RATE_USD_SEK } from './pricing.js';
import { detectFeeSignals } from '../../lib/fee-signals.js';
import { isAudited, ungatedQuoteResponse } from '../../lib/revision-gate.js';
import { computeShelfware } from '../../lib/shelfware.js';
import { saasFinanceRightsizing } from '../../lib/fortnox-rightsizing.js';

const MODEL = 'claude-opus-4-8';
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
  // isTotal: live_analyses data is already company-level totals — do NOT multiply by seats
  const scale = (isPerUser && effectiveSeats > 0 && !benchmark.isTotal) ? effectiveSeats : 1;
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

  const sourceStr = benchmark.source === 'live_analyses'
    ? `Arvo Flows analys-databas — ${benchmark.n} anonymiserade kundfakturor`
    : benchmark.source === 'real'
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
async function enrichElContext({ annualCost, elKwh, categorized }) {
  try {
    // Use extracted kWh from invoice when available — avoids the calibration error
    // where annualCost/1.27 overestimates kWh for above-average-priced invoices
    // (e.g. TryggEl fixed 1.85 kr/kWh → kWh underestimated by 1.85/1.27 = 1.46×,
    // inflating supplier costs and compressing apparent saving to near-zero).
    const invoicePeriodMonths = 1; // enrichElContext always receives monthly/annual cost
    const factualAnnualKwh = elKwh != null && elKwh > 0
      ? Math.round(elKwh * 12)   // scale monthly kWh to annual
      : null;
    const kwhIsEstimated   = factualAnnualKwh == null;
    const annualKwh        = factualAnnualKwh ?? Math.round(annualCost / 1.27);
    const currentPriceKwh  = annualKwh > 0 ? annualCost / annualKwh : 1.27;

    const intel = await getElIntelligence({
      annualKwh,
      currentPriceKwh,
      supplierName: categorized.normalizedSupplier,
      kwhIsEstimated,
    });

    const { zone, spot, spotSource, best, ranked, saving, savingPct,
            marketFloor, achievablePriceKwh, floorApplied, current } = intel;
    const spotLabel = spotSource === 'live'
      ? `${spot.toFixed(4)} kr/kWh (Nordpool live)`
      : `${spot.toFixed(4)} kr/kWh (årsmedel 2025, API otillgängligt)`;
    const kwhNote = kwhIsEstimated
      ? ` (kWh estimerat — saknas på fakturan)`
      : ` (${annualKwh.toLocaleString('sv-SE')} kWh/år från fakturan)`;

    // Visa den BYTBARA energidelen per leverantör (inte all-in-total) — nätavgift +
    // energiskatt är monopol/skatt som följer med vid byte och ska inte se bytbara ut.
    const top3 = ranked.slice(0, 3).map((s, i) =>
      `  ${i + 1}. ${s.name}: ${s.energyPerKwh.toFixed(4)} kr/kWh energipris + ${s.annualFee.toLocaleString('sv-SE')} kr/år avgift`
    ).join('\n');

    // Marknadsgolv-rad: bara som BEKRÄFTAD marknadsposition när kWh är faktiskt
    // (annars vet vi inte säkert kundens förbrukningsband).
    const floorLine = (marketFloor && !kwhIsEstimated)
      ? `\n  Verifierat marknadsgolv för er storlek: ${marketFloor.allInKwh.toFixed(4)} kr/kWh all-in (${marketFloor.label}, Eurostat ${marketFloor.period}) — nätavgift är monopol och följer med vid byte`
      : '';
    const floorRule = marketFloor
      ? `\n  FÖRBJUDET: påstå ett lägre uppnåeligt all-in-pris än ${marketFloor.allInKwh.toFixed(4)} kr/kWh för ett bolag av denna storlek — besparingen är redan begränsad till det verifierade golvet.`
      : '';

    return `\nEl-prisintelligens (Nordpool ${zone})${kwhNote}:
  Dagens spotpris: ${spotLabel}
  Bästa elhandlare (bytbar energidel): ${best.name} — ${best.energyPerKwh.toFixed(4)} kr/kWh energipris + ${best.annualFee.toLocaleString('sv-SE')} kr/år avgift${floorLine}
  Realistiskt uppnåeligt all-in: ${achievablePriceKwh.toFixed(4)} kr/kWh${floorApplied ? ' (golvat vid verifierat marknadspris)' : ''}
  Ni betalar: ${current.priceKwh.toFixed(4)} kr/kWh all-in
  Uppskattad besparing vs kund: ${saving.toLocaleString('sv-SE')} kr/år (${savingPct} %) — aldrig under det verifierade golvet
  Topp 3 elhandlare (energidel):
${top3}
  OBS: Använd dessa siffror i din reasoning. Namnge leverantören (el är offentliga spotpriser).${floorRule}`;
  } catch (err) {
    console.warn('[Recommender] enrichElContext misslyckades (non-fatal):', err.message);
    return null;
  }
}

function formatPrompt({ customer, invoice, categorized, benchmark, elContext, convertedTierBm }) {
  const annualCost = invoice.annualCost ?? invoice.amount;
  const mobileAddonAnnual = (invoice.mobileAddonMonthly > 0) ? invoice.mobileAddonMonthly * 12 : null;

  // For combined invoices: compute the exact primary-component annual cost in code
  // so the AI echoes the correct figure in reasoning (not an approximation from total - addons).
  const _primaryMonthly    = invoice.primaryComponentMonthly ?? null;
  const _secondaryMonthly  = invoice.secondaryComponentMonthly ?? null;
  const _secondarySaving   = invoice.secondarySaving ?? null;
  const _isCombined        = invoice.potentialMixedCategories === true;
  const primaryAnnualForPrompt = (_isCombined && _primaryMonthly != null)
    ? Math.round(_primaryMonthly * 12)
    : null;
  // Prefer the code-computed secondary monthly when available (excludes addons).
  // Fallback: annualCost minus primary minus mobile addons (over-estimates by broadband addon amount).
  const nonPrimaryAnnualForPrompt = (_isCombined && primaryAnnualForPrompt != null)
    ? (_secondaryMonthly != null
        ? Math.round(_secondaryMonthly * 12)
        : Math.max(0, Math.round(annualCost - primaryAnnualForPrompt - (mobileAddonAnnual ?? 0))))
    : null;

  const employees = customer.employees ?? 1;
  const seatCount = invoice.seatCount ?? null;
  const isAccountingSystem = categorized.subType === 'affärssystem';
  const bm = benchmark;
  const isPerUser = bm && bm.note.toLowerCase().includes('per användare');
  const effectiveSeats = seatCount ?? employees;
  // isTotal: live_analyses data is already company-level totals — do NOT multiply by seats
  const scale = (isPerUser && effectiveSeats > 0 && !bm?.isTotal) ? effectiveSeats : 1;
  const totalMedian = bm ? bm.median * scale : null;
  const totalP25    = bm ? bm.p25    * scale : null;
  const isRealData       = bm?.source === 'real';
  const isLiveData       = bm?.source === 'live_analyses';
  const isVerifiedPublic = bm?.source === 'real-public';
  const isEstimated      = bm?.source === 'estimated';
  const dataPoints       = bm?.n ?? 0;

  // Skip benchmark % comparison for accounting systems.
  // Compare against p25 (the achievable benchmark), not median.
  // Comparing against median masks overpayment for customers between p25 and median.
  const overpaymentPct =
    !isAccountingSystem && totalP25 && totalP25 > 0
      ? Math.round(((annualCost - totalP25) / totalP25) * 100)
      : null;

  // Annotation injected next to the annual cost — controls what the AI echoes back.
  // Four tiers: live cross-customer data, real DB data, verified public prices, estimates.
  const _pctLabel = (pct) => pct > 0
    ? `${pct} % ÖVER`
    : `${Math.abs(pct)} % UNDER`;
  const overpaymentAnnotation = overpaymentPct !== null
    ? isLiveData
      ? `  ← ${_pctLabel(overpaymentPct)} branschsnittet (baserat på ${dataPoints} fakturor från liknande bolag i Arvo-databasen)`
      : isRealData
        ? `  ← ${_pctLabel(overpaymentPct)} branschsnittet (p25) (${dataPoints} analyserade fakturor i databasen)`
        : isVerifiedPublic
          ? `  ← ${_pctLabel(overpaymentPct)} verifierat listpris`
          : `  ← ${_pctLabel(overpaymentPct)} branschstandarden`
    : '';

  // Explicit phrasing instruction so the AI uses the right language in reasoning.
  const phrasingRule = isAccountingSystem
    ? 'OBS: Detta är ett affärssystem. Jämför INTE kostnaden procentuellt mot branschsnittet. Undersök om inbyggda funktioner täcker behovet och ge konkret åtgärdsrekommendation.'
    : isLiveData
      ? `OBS: Benchmarkdatan är baserad på ${dataPoints} anonymiserade fakturor från liknande bolag i Arvo Flows databas. I din reasoning, skriv "jämförbara bolag i er bransch betalar väsentligt lägre" eller "Ni betalar mer än vad vi ser i liknande bolag" — ALDRIG "medianen", "referenspriser" eller interna procentsatser.`
      : isRealData
        ? `OBS: Benchmarkdatan är baserad på ${dataPoints} verkliga kundfakturor i Arvo Flows databas. I din reasoning, jämför mot "branschsnittet" — skriv t.ex. "Ni betalar mer än jämförbara bolag i er bransch" eller "Välförhandlat avtalspris för er storlek är väsentligt lägre." — ALDRIG "medianen", "referenspriser" eller interna procentsatser.`
        : isVerifiedPublic
          ? 'OBS: Benchmarkdatan är verifierade offentliga listpriser — INTE aggregerade kundfakturor. I din reasoning, skriv "mer än det verifierade marknadspriset" eller "välförhandlat avtalspris finns tillgängligt" — ALDRIG "medianen" eller interna procentsatser.'
          : 'OBS: Benchmarkdatan är intervallbaserade branschuppskattningar — INTE exakta priser. I din reasoning, jämför mot "branschsnittet" och skriv "välförhandlat avtalspris är lägre" — ALDRIG "exakta priser", "garanterade" eller "medianen".';

  const benchmarkBlock = isAccountingSystem
    ? formatBenchmark(benchmark, seatCount, employees) + '\n\n' + phrasingRule
    : formatBenchmark(benchmark, seatCount, employees);

  const secretOverride = REAL_PRICE_CATEGORIES.has(categorized.category)
    ? `\nOVERRIDE SEKRETESSREGEL: Kategorin "${categorized.category}" har offentliga listpriser. Du FÅR och SKA namnge den föreslagna leverantören i reasoning-fältet för denna faktura.`
    : '';

  const speedNote = (categorized.category === 'bredband' && invoice.connectionSpeedMbit > 0)
    ? `\n  Nuvarande hastighet: ${invoice.connectionSpeedMbit} Mbit/s — benchmarken ovan gäller för EXAKT denna hastighets-tier. Jämför mot motsvarande produkt (${invoice.connectionSpeedMbit} Mbit/s eller bättre till samma pris). Nämn ALDRIG en annan hastighet i reasoning utan att explicit förklara att det är ett uppgrade.`
    : '';

  const mobileNote = (() => {
    if (categorized.category !== 'mobil') return '';
    const recurringItems = (invoice.lineItems ?? []).filter(l => l.type === 'recurring_subscription');
    const planNames = [...new Set(recurringItems.map(l => l.description).filter(Boolean))].slice(0, 3);
    const planLine = planNames.length > 0
      ? `\n  Nuvarande abonnemangstyp (från fakturan): ${planNames.join(', ')}`
      : '';
    const tele2Alt = (benchmark?.alternatives ?? []).find(a =>
      a.supplier?.toLowerCase().includes('tele2') &&
      a.positioning?.toLowerCase().includes('obegränsad')
    );
    const unlimitedLine = tele2Alt && !categorized.normalizedSupplier?.toLowerCase().includes('tele2')
      ? `\nOBS MOBIL: Tele2 Företag har en Obegränsad-plan nära det medianpris vi visar (entrétiern på p25 är datakapad). ` +
        `Om kundens nuvarande plan är datakapad (t.ex. 100GB, 50GB) ska du nämna i reasoning att obegränsad surf finns utan stort prispåslag. ` +
        `Formulera det som ett värdetillägg, inte ett kritikpåstående om nuvarande leverantör. ` +
        `FÖRBJUDET: hitta på egna kronor- eller GB-tal — använd bara de siffror som redan finns i prompten.`
      : '';
    return planLine + unlimitedLine;
  })();

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
    // For devtools: target is msrpAnnual (public direct price). For productivity: msrpAnnual (Microsoft annual list).
    const targetPrice = tierBm?.msrpAnnual;
    const targetLabel = isDevtools ? 'Direktavtal årsavtal (Atlassian.com)' : 'Microsoft årsavtal';

    const lines = [];
    if (lt) lines.push(`  Licensplan            : ${lt}`);
    lines.push(`  Faktureringsmodell    : ${bc === 'monthly' ? 'Månadsvis — kunden betalar löpande utan årsåtagande' : bc === 'annual' ? 'Årsavtal — kunden har redan åtagit sig 12 månader' : 'Okänt'}`);
    if (pps != null) lines.push(`  Aktuellt pris/seat    : ${pps.toFixed(0)} kr/mån`);

    if (tierBm) {
      lines.push(`\n  Tier-benchmarks (${isDevtools ? 'Atlassian publikt listpris' : 'Microsoft publikt listpris'} maj 2026, ${seats} seats):`);
      lines.push(`    MSRP månadsvis  : ${tierBm.msrpMonthly} kr/seat/mån  = ${(tierBm.msrpMonthly * 12 * seats).toLocaleString('sv-SE')} kr/år totalt`);
      if (tierBm.msrpAnnual != null) {
        lines.push(`    MSRP årsavtal   : ${tierBm.msrpAnnual} kr/seat/mån  = ${(tierBm.msrpAnnual * 12 * seats).toLocaleString('sv-SE')} kr/år totalt`);
        lines.push(`    → Målpris (${targetLabel}): ${targetPrice} kr/seat/mån = ${(targetPrice * 12 * seats).toLocaleString('sv-SE')} kr/år  ← DETTA ÄR ERT MÅL`);
        if (pps != null && bc === 'monthly') {
          const annualBilling = Math.round((pps - tierBm.msrpAnnual) * 12 * seats);
          if (annualBilling > 0) lines.push(`    → Byta till årsavtal (same tier): ${annualBilling.toLocaleString('sv-SE')} kr/år`);
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
          const downsellSav = Math.round((tierBm.msrpAnnual - bpTier.msrpAnnual) * 12 * seats);
          lines.push(`\n  TIERANALYS — ${_saasNoteKey.toUpperCase()} för ${seats} seats:`);
          lines.push(`    ${_saasNoteKey.toUpperCase()} motiveras av: eDiscovery, avancerat auditlogg, Purview compliance, SIEM.`);
          lines.push(`    Saknas dessa krav: Business Premium (Intune + Defender) räcker för säkerhetsfokuserade SMF.`);
          lines.push(`    Möjlig tier-besparing (${_saasNoteKey.toUpperCase()} → Business Premium): ${downsellSav.toLocaleString('sv-SE')} kr/år`);
          lines.push(`    OBS: Nämn alltid tier-alternativet i reasoning om kunden troligen saknar E3-specifika behov.`);
        }
      }
    }

    // Like-for-like context: pre-computed deterministic target passed from test-invoice.
    // Tells the AI exactly what the override will set so reasoning matches the numbers shown.
    if (invoice.likeForLikeTarget) {
      const lfl = invoice.likeForLikeTarget;
      const tierLabel = LFL_TIER_LABELS[lfl.dominantTierKey] ?? lfl.dominantTierKey ?? 'nuvarande tier';
      lines.push(`\n  LIKE-FOR-LIKE PRISSÄTTNING (deterministisk beräkning — ANVÄND EXAKT DESSA TAL):`);
      for (const t of (lfl.tierLines ?? [])) {
        const tLabel = LFL_TIER_LABELS[t.key] ?? t.key;
        const billed = t.billedUnitMonthly != null ? `fakturerat à-pris ${t.billedUnitMonthly} kr/mån → ` : '';
        lines.push(`    ${tLabel}: ${t.quantity} licenser · ${billed}${t.benchmarkMonthly} kr/mån (Microsoft årsavtal) = ${t.tierAnnual.toLocaleString('sv-SE')} kr/år`);
      }
      lines.push(`    Marknadspris SAMMA licensmix (inkl. licenser tillagda under perioden): ${lfl.suggestedAnnualCost.toLocaleString('sv-SE')} kr/år`);
      lines.push(`    → HELA besparingen kommer från PRISGAPET — kunden överprisas av sin nuvarande återförsäljare för exakt samma licenser.`);
      lines.push(`    → KRITISKT: Nämn INTE tier-byte eller nedgradering i main reasoning. Tier-alternativ är valfri extraoptimering som visas separat i gränssnittet.`);
      lines.push(`    → Reasoning ska förklara: Varför betalar kunden markant mer än marknadspriset för ${tierLabel}-licenser? Återförsäljarens marginal? Månadsavtal vs årsavtal?`);
      lines.push(`    → FÖRBJUDET: räkna egna per-användare-, procent- eller besparingstal i reasoning. Varje siffra du nämner ska vara hämtad ordagrant från raderna ovan eller från "Aktuellt pris/seat".`);
      lines.push(`    → ATTRIBUERING: "Aktuellt pris/seat" är kundens TOTALA kostnad per användare inkl. eventuella tilläggstjänster (support, säkerhet) — kalla den ALDRIG licenspris. Licensprisjämförelser görs ENDAST mellan tier-radens fakturerade à-pris och årsavtalspriset ovan.`);
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

  // Smyghöjning-indikator — injiceras när kundens historik visar tydlig prisförändring.
  // Ger AI:n faktaunderlag för det proaktiva moment som är kärnan i Arvo Intelligence.
  const priceHistoryBlock = (() => {
    const ph = invoice.priceHistoryContext;
    if (!ph) return '';
    const direction   = ph.isIncrease ? 'ÖKAT' : 'MINSKAT';
    const absPct      = Math.abs(ph.deltaPct);
    const monthsLabel = ph.monthsSince === 1 ? '1 månad' : `${ph.monthsSince} månader`;
    const prevFmt     = ph.prevAnnualCost.toLocaleString('sv-SE');
    if (ph.isIncrease) {
      return `\n\nSMYGHÖJNINGS-INDIKATOR (KRITISK KONTEXTSIGNAL):
  Kundens kostnad hos denna leverantör har ÖKAT med ${absPct} % sedan Arvo:s senaste analys (${monthsLabel} sedan).
  Förra analyserade kostnad: ${prevFmt} kr/år.
  → Du MÅSTE nämna denna prisökning i din reasoning. Formulera det exakt som:
    "Vi noterade att er kostnad hos [leverantör] stigit med ${absPct} % sedan vår senaste analys (${monthsLabel} sedan)."
  → Prisökningen är ett starkt argument för att agera nu — framhåll det som den primära drivkraften.
  → Kombinera med överprisargumentet mot marknaden om det är relevant.`;
    }
    return `\n\nPRISFÖRÄNDRINGS-KONTEXT:
  Kundens kostnad hos denna leverantör har MINSKAT med ${absPct} % sedan Arvo:s senaste analys (${monthsLabel} sedan).
  Förra analyserade kostnad: ${prevFmt} kr/år.
  → Du KAN nämna att kostnaden minskat. Fokusera ändå på om ytterligare besparingsmöjligheter finns.`;
  })();

  return `Kunden:
  Bolagstyp: ${customer.industry}
  Anställda: ${employees}
  Omsättning: ${customer.revenue ? customer.revenue.toLocaleString('sv-SE') + ' kr' : '(okänt)'}

Kategoriserad faktura:
  Kategori: ${categorized.category}
  Sub-typ: ${categorized.subType || '(okänd)'}
  Nuvarande leverantör: ${categorized.normalizedSupplier}
  Årskostnad (totalt): ${annualCost.toLocaleString('sv-SE')} kr${overpaymentAnnotation}${
  _isCombined && primaryAnnualForPrompt != null ? (() => {
    const _secLabel = categorized.category === 'mobil'
      ? `bredband${_secondarySaving?.speedMbit ? ` ${_secondarySaving.speedMbit} Mbit` : ''}`
      : `mobilabonnemang`;
    const _secBenchmarkNote = _secondarySaving
      ? ` ← BENCHMARKAD: p25 = ${_secondarySaving.suggestedAnnual.toLocaleString('sv-SE')} kr/år, bruttobesparing ${_secondarySaving.grossSaving.toLocaleString('sv-SE')} kr/år`
      : ' ← ej benchmarkad separat';
    const _hasSavingBoth   = _secondarySaving?.grossSaving > 0;
    const _reasoningSecFrag = _secondarySaving
      ? (() => {
          const _secCostFmt  = nonPrimaryAnnualForPrompt.toLocaleString('sv-SE');
          const _action = _hasSavingBoth
            ? `Arvo förhandlar ned bredbandskostnaden mot marknadsbenchmark.`
            : `Bredbandskomponenten är marknadsmässig.`;
          return `Fakturan innehåller även ${_secLabel} (${_secCostFmt} kr/år) — ${_action}`;
        })()
      : `Övriga tjänster (${nonPrimaryAnnualForPrompt.toLocaleString('sv-SE')} kr+) analyseras via Fortnox/Visma.`;
    const _secActionInstruction = _hasSavingBoth
      ? `KRITISKT: Bredbandskomponenten har en identifierad besparing mot marknadsbenchmark. Skriv reasoning som tydligt anger att BÅDE mobilkomponenten (primär) OCH bredbandskomponenten (sekundär) åtgärdas — formulera detta som en aktiv åtgärd ("Arvo förhandlar ned bredbandskostnaden"), ALDRIG som "bevaka vid nästa förnyelse". Texten EXAKT: `
      : `KRITISKT: Ange i reasoning EXAKT `;
    return `
  OBS KOMBINERAT FAKTURA — fakturan innehåller tjänster i FLERA kategorier:
    Primär komponent (${categorized.category}): ${primaryAnnualForPrompt.toLocaleString('sv-SE')} kr/år ← DETTA är jämförelsebasen för primärbesparingen${mobileAddonAnnual ? `
    Tilläggstjänster (molnväxel/PBX): ${mobileAddonAnnual.toLocaleString('sv-SE')} kr/år` : ''}
    Sekundär komponent (${_secLabel}): ${nonPrimaryAnnualForPrompt.toLocaleString('sv-SE')} kr/år${_secBenchmarkNote}
  ${_secActionInstruction}"Kombinerat faktura — analysen avser ${categorized.category}abonnemang (${primaryAnnualForPrompt.toLocaleString('sv-SE')} kr/år). ${_reasoningSecFrag}" — fortsätt sedan med din analys av primärkomponenten. Använd INGA interna mätvärden (p25, percentil, procentsatser) i reasoning.`;
  })() :
  mobileAddonAnnual ? `
  Varav mobilabonnemang: ${(annualCost - mobileAddonAnnual).toLocaleString('sv-SE')} kr/år
  Varav tilläggstjänster (molnväxel/cloud PBX): ${mobileAddonAnnual.toLocaleString('sv-SE')} kr/år
  OBS: Prissätt ett KOMPLETT ersättningspaket inkl. motsvarande tilläggstjänst — jämförelsen ska vara total mot total.` : ''}
  Confidence från Categorizer: ${categorized.confidence}

Branschindex för segmentet:
${benchmarkBlock}

${phrasingRule}${secretOverride}${saasNote}${speedNote}${mobileNote}${elContext ? elContext : ''}${priceHistoryBlock}

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

// Maps detected dominant M365 tier to the recommended (downgrade) tier for benchmarking.
// Standard/Basic are already entry-level: no downgrade — benchmark at the same tier.
export const SAAS_DOWNGRADE_TARGET = {
  'business-premium':  'business-standard',
  'e3':                'business-premium',
  'e5':                'e3',
  'business-standard': 'business-standard',
  'business-basic':    'business-basic',
};

// Returns the tier key for the dominant (highest-spend) M365 license tier on a mixed-tier invoice.
// Scans recurring_subscription line items, maps each description to a tier via getSaasLicenseTierKey,
// and returns the tier with the largest total amount.
// Falls back to getSaasLicenseTierKey(fallbackLicenseType, fallbackProductFamily) when no tier
// descriptions are found in line items.
export function getDominantSaasTierKey(lineItems, fallbackLicenseType, fallbackProductFamily) {
  if (!Array.isArray(lineItems) || lineItems.length === 0) {
    return getSaasLicenseTierKey(fallbackLicenseType, fallbackProductFamily);
  }
  const tierAmounts = {};
  for (const item of lineItems) {
    if (item.type !== 'recurring_subscription') continue;
    const tierKey = getSaasLicenseTierKey(item.description ?? '', null);
    if (!tierKey) continue;
    const amt = item.amount ?? 0;
    tierAmounts[tierKey] = (tierAmounts[tierKey] ?? 0) + amt;
  }
  const entries = Object.entries(tierAmounts);
  if (entries.length === 0) {
    return getSaasLicenseTierKey(fallbackLicenseType, fallbackProductFamily);
  }
  return entries.reduce((best, cur) => cur[1] > best[1] ? cur : best)[0];
}

// Tier patterns reused for like-for-like calculation.
const LFL_TIER_RE = [
  { key: 'e5',               re: /\bE5\b/i },
  { key: 'e3',               re: /\bE3\b/i },
  { key: 'business-premium', re: /business[\s-]premium/i },
  { key: 'business-standard',re: /business[\s-]standard/i },
  { key: 'business-basic',   re: /business[\s-]basic/i },
];

/**
 * Like-for-like SaaS cost calculation: mirrors the customer's actual license mix.
 * Each tier is benchmarked at its own price (no downgrade). Non-tier add-ons
 * (backup, security) are passed through at invoice price.
 *
 * Pro-rata-rader (typade one_time_fee + is_prorata=true av extraktionen) är nya
 * licenser som från nästa period debiteras fullt. De ingår i annualCost-baslinjen
 * (aggregateLineItems projicerar quantity × unitPrice) — exkluderas de här jämförs
 * t.ex. 73 licensers kostnad mot 65 licensers målpris, och besparingen blåses upp
 * med de nya licensernas hela årskostnad. Source: CloudReseller CR-88412.
 *
 * Returns null when quantity is missing on any tier line (can't compute accurately).
 *
 * @param {Array}  lineItems      - extracted lineItems (must include quantity per tier line)
 * @param {Object} tierBenchmarks - BRANCHINDEX['saas-productivity'].licenseTierBenchmarks
 * @param {number} annualCost     - extracted.annualCost (used to derive billing multiplier)
 * @returns {{ suggestedAnnualCost, savingPerYear, dominantTierKey, tierLines, addonLines } | null}
 */
export function computeLikeForLikeSaasTarget(lineItems, tierBenchmarks, annualCost) {
  if (!Array.isArray(lineItems) || lineItems.length === 0) return null;

  const recurringLines = lineItems.filter(l => l.type === 'recurring_subscription');
  const proRataLines   = lineItems.filter(l => l.is_prorata === true && l.type !== 'recurring_subscription');
  const lines = [...recurringLines, ...proRataLines];
  if (lines.length === 0) return null;

  // Run-rate per faktureringsperiod för en rad: prorata till fullt pris
  // (quantity × unitPrice — inte det fakturerade delperiodsbeloppet), övriga radbelopp.
  const runRate = (l) => (l.is_prorata === true && l.quantity != null && l.unitPrice != null)
    ? l.quantity * l.unitPrice
    : (l.amount ?? 0);

  const periodicTotal = lines.reduce((s, l) => s + runRate(l), 0);
  const billMult = periodicTotal > 0 ? annualCost / periodicTotal : 12;

  // Summera quantity per tier (ordinarie + prorata på samma tier slås ihop),
  // beräkna tierAnnual EN gång per tier — en avrundning per tier, inte per rad.
  const tierAcc    = {};
  const addonLines = [];
  let addonAnnualTotal = 0;

  for (const item of lines) {
    const match = LFL_TIER_RE.find(p => p.re.test(item.description ?? ''));
    if (match && tierBenchmarks[match.key]) {
      const qty = item.quantity;
      if (qty == null) return null;  // can't compute like-for-like without seat count

      const bm = tierBenchmarks[match.key];
      tierAcc[match.key] = tierAcc[match.key] ?? { quantity: 0, billedRunRate: 0, benchmarkMonthly: bm.arvoAnnual ?? bm.msrpAnnual };
      tierAcc[match.key].quantity += qty;
      tierAcc[match.key].billedRunRate += runRate(item);
    } else {
      // Add-on / unrecognised: pass through at invoice run-rate
      const addonAnnual = Math.round(runRate(item) * billMult);
      addonAnnualTotal += addonAnnual;
      addonLines.push({
        description: item.description,
        amount:      item.amount,
        addonAnnual,
        is_addon:    item.is_addon  ?? false,
        addon_type:  item.addon_type ?? null,
      });
    }
  }

  const tierLines = Object.entries(tierAcc).map(([key, t]) => ({
    key,
    quantity:         t.quantity,
    benchmarkMonthly: t.benchmarkMonthly,
    // Fakturerat à-pris (kr/mån) — normaliserat via billMult oavsett faktureringsperiod.
    // Ges till AI:n så att licensjämförelser görs på RADENS pris, aldrig på den
    // blandade per-seat-totalen (683-kronorsfelet: totalkostnad kallades licenspris).
    billedUnitMonthly: Math.round((t.billedRunRate * billMult / 12 / t.quantity) * 100) / 100,
    tierAnnual:       Math.round(t.benchmarkMonthly * t.quantity * 12),
  }));

  const suggestedAnnualCost = tierLines.reduce((s, t) => s + t.tierAnnual, 0) + addonAnnualTotal;
  if (suggestedAnnualCost === 0) return null;

  // Dominant tier = the tier with the highest total invoice amount (for supplier label).
  const dominantEntry = tierLines.reduce(
    (best, t) => t.tierAnnual > (best?.tierAnnual ?? 0) ? t : best,
    null
  );

  return {
    suggestedAnnualCost,
    savingPerYear: Math.max(0, annualCost - suggestedAnnualCost),
    dominantTierKey: dominantEntry?.key ?? null,
    tierLines,
    addonLines,
  };
}

// Managed Print klickanalys. Benchmarks läses ur BRANCHINDEX.skrivarleasing
// .clickRateBenchmarks (EN källa, regel 1) — aldrig lokala konstanter.
// Svea-läxan (faktura 440192): den gamla versionen hade (a) egna benchmarks som
// motsade prisboken, (b) "X % mer"-copy där formeln räknade andel-av-priset,
// (c) ett syntetiskt intervall (benchmark × 1,15), (d) billingMult-heuristik.
// Allt här är nu bandbaserat, deterministiskt och miniräknar-reproducerbart.

const PRINT_PERIOD_MULTIPLIER = { monthly: 12, quarterly: 4, annual: 1 };

// ── Attribueringslåset: LFL-resonemanget skrivs av KOD, inte AI ────────────────
//
// 683-läxan (NMIT 8840219, två gånger): AI:n kallade den blandade per-seat-
// totalen (licenser + tilläggstjänster) för "licenspris" — TROTS explicit
// ATTRIBUERING-regel i prompten. Promptregler är råd; modellen kan bryta dem.
// Prosakravet är blint för felet (talet finns i prompten — rätt tal, fel etikett).
// Enda hållbara låset: när like-for-like-fakta finns kompletta skrivs hela
// resonemanget deterministiskt — en maskinskriven mening kan inte felattribuera.

export const LFL_TIER_LABELS = {
  'business-premium': 'Business Premium', 'business-standard': 'Business Standard',
  'business-basic': 'Business Basic', 'e3': 'E3', 'e5': 'E5',
};

const fmtKrUnit = (n) => Number.isInteger(n)
  ? n.toLocaleString('sv-SE')
  : n.toFixed(2).replace('.', ',');

export function buildLikeForLikeReasoning({
  supplier, lfl, annualCost, suggestedAnnualCost, savingPerYear, billingCycleType,
}) {
  const tiers = (lfl?.tierLines ?? []).filter(t => t.quantity > 0 && t.benchmarkMonthly != null);
  if (tiers.length === 0 || !(savingPerYear > 0)) return null;

  const supplierName = supplier || 'er nuvarande leverantör';
  const dominant = tiers.find(t => t.key === lfl.dominantTierKey) ?? tiers[0];
  const rest     = tiers.filter(t => t !== dominant);
  const parts = [];

  const dLabel = LFL_TIER_LABELS[dominant.key] ?? dominant.key;
  if (dominant.billedUnitMonthly != null) {
    parts.push(
      `Ni betalar ${fmtKrUnit(dominant.billedUnitMonthly)} kr per användare och månad för era ` +
      `${dominant.quantity} ${dLabel}-licenser via ${supplierName} — Microsofts publika årsavtalspris ` +
      `för exakt samma licens är ${fmtKrUnit(dominant.benchmarkMonthly)} kr.`
    );
  } else {
    parts.push(
      `Era ${dominant.quantity} ${dLabel}-licenser via ${supplierName} prissätts över Microsofts ` +
      `publika årsavtalspris ${fmtKrUnit(dominant.benchmarkMonthly)} kr per användare och månad.`
    );
  }
  for (const t of rest) {
    const label = LFL_TIER_LABELS[t.key] ?? t.key;
    const billed = t.billedUnitMonthly != null ? `à ${fmtKrUnit(t.billedUnitMonthly)} kr ` : '';
    parts.push(`${label}: ${t.quantity} licenser ${billed}mot årsavtalspriset ${fmtKrUnit(t.benchmarkMonthly)} kr.`);
  }

  parts.push(
    `Skillnaden ligger helt i fakturerat à-pris mot Microsofts publika årsavtalspris för samma licens` +
    (billingCycleType === 'monthly' ? ` — ni faktureras månadsvis utan årsåtagande, vilket är en del av gapet.` : `.`)
  );

  if (annualCost > 0 && suggestedAnnualCost > 0) {
    parts.push(
      `På årsbasis: ${Math.round(annualCost).toLocaleString('sv-SE')} kr i dag mot ` +
      `${Math.round(suggestedAnnualCost).toLocaleString('sv-SE')} kr för identisk licensmix — ` +
      `${Math.round(savingPerYear).toLocaleString('sv-SE')} kr utan att en enda funktion ändras.`
    );
  }

  const addonAnnual = (lfl.addonLines ?? []).reduce((s, a) => s + (a.addonAnnual ?? 0), 0);
  if (addonAnnual > 0) {
    parts.push(
      `Era tilläggstjänster (${addonAnnual.toLocaleString('sv-SE')} kr/år) ingår oförändrade i ` +
      `jämförelsen — besparingen avser enbart licenspriset.`
    );
  }

  if (['e3', 'e5'].includes(dominant.key)) {
    parts.push(
      `Saknar ni ${dLabel}-nivåns compliance-funktioner kan en lägre licensnivå sänka kostnaden ` +
      `ytterligare — Arvo verifierar behovet i bytesprocessen.`
    );
  }

  return parts.join(' ');
}

const fmtRate = (n) => String(n).replace('.', ',');
const fmtX    = (n) => n.toFixed(1).replace('.', ',');

export function analyzeClickRates(lineItems, supplierName, invoiceData = null) {
  const bm = BRANCHINDEX.skrivarleasing?.clickRateBenchmarks;
  if (!bm) return null;

  const varItems = (lineItems ?? []).filter(l => l.type === 'variable_usage');
  let bwRate = null, bwAmount = 0;
  let colorRate = null, colorAmount = 0;

  for (const item of varItems) {
    if (!item.quantity || item.quantity === 0) continue;
    const rate = (item.amount ?? 0) / item.quantity;
    const desc = (item.description ?? '').toLowerCase();
    if (/svartvit|bw|b&w|mono|svart|black/.test(desc)) {
      bwRate = Math.round(rate * 10000) / 10000;
      bwAmount = item.amount ?? 0;
    } else if (/färg|color|colour/.test(desc)) {
      colorRate = Math.round(rate * 10000) / 10000;
      colorAmount = item.amount ?? 0;
    }
  }

  if (!bwRate && !colorRate) return null;

  const totalClick  = bwAmount + colorAmount;
  const colorShare  = totalClick > 0 ? colorAmount / totalClick : 0;

  // Gap räknas mot BANDETS TOPP (ärligaste minimum): "X % mer" = (rate − high) / high.
  // Andel-av-priset-formeln ((rate−bm)/rate) får ALDRIG kallas "mer än" (Svea-läxan).
  const bwGapPct    = bwRate    && bwRate    > bm.bw.high
    ? Math.round((bwRate    - bm.bw.high)    / bm.bw.high    * 100) : null;
  const colorGapPct = colorRate && colorRate > bm.color.high
    ? Math.round((colorRate - bm.color.high) / bm.color.high * 100) : null;

  // priceGapScore (0–100, lägre = större gap) viktas på överprisandelen mot bandtopp.
  const bwExcessShare    = bwRate    > bm.bw.high    ? (bwRate    - bm.bw.high)    / bwRate    : 0;
  const colorExcessShare = colorRate > bm.color.high ? (colorRate - bm.color.high) / colorRate : 0;
  const weightedExcess   = (colorShare * colorExcessShare + (1 - colorShare) * bwExcessShare) * 100;
  const priceGapScore    = Math.max(5, Math.round(100 - weightedExcess * 1.5));

  const supplier = supplierName || 'Leverantören';
  const parts = [];

  // Ny avgift/tariff-signal först — leverantörens egen dokumenterade höjning är fyndet.
  const periodMultiplier = PRINT_PERIOD_MULTIPLIER[invoiceData?.billingPeriod] ?? 12;
  const feeSignals = detectFeeSignals(lineItems, periodMultiplier);
  for (const sig of feeSignals) {
    parts.push(`Notera: leverantören har själv markerat en ny avgift på fakturan — "${sig.description}", ${sig.amount.toLocaleString('sv-SE')} kr/mån = ${sig.annualImpact.toLocaleString('sv-SE')} kr/år. En nyinförd kostnadspost är alltid förhandlingsbar.`);
  }

  if (colorRate && colorRate > bm.color.high) {
    parts.push(`${supplier} fakturerar er ${fmtRate(colorRate)} kr/sida för färgutskrifter — ${fmtX(colorRate / bm.color.high)}–${fmtX(colorRate / bm.color.low)}× marknadsbandet för kommersiella SMF-klickavtal, ${fmtRate(bm.color.low)}–${fmtRate(bm.color.high)} kr/sida (estimat, maj 2026).`);
  }
  if (bwRate && bwRate > bm.bw.high) {
    parts.push(`Svartvita sidor kostar er ${fmtRate(bwRate)} kr/sida — marknadsbandet är ${fmtRate(bm.bw.low)}–${fmtRate(bm.bw.high)} kr/sida (${fmtX(bwRate / bm.bw.high)}–${fmtX(bwRate / bm.bw.low)}×).`);
  }

  // Maskinhyran — fakturans största fasta rad ska inte passera oanalyserad.
  let lease = null;
  const leaseLine = (lineItems ?? []).find(
    l => l.type === 'recurring_subscription' && /hyra|leasing|lease/i.test(l.description ?? '')
  );
  if (leaseLine && leaseLine.unitPrice > 0) {
    const contractMonths = Number((leaseLine.description ?? '').match(/avtal:?\s*(\d+)\s*mån/i)?.[1] ?? 0) || null;
    lease = {
      perMachineMonthly: leaseLine.unitPrice,
      machineCount:      leaseLine.quantity ?? 1,
      contractMonths,
      bandLow:  bm.leasePerMachineMonthly.low,
      bandHigh: bm.leasePerMachineMonthly.high,
    };
    const leaseBits = [];
    if (leaseLine.unitPrice > bm.leasePerMachineMonthly.high) {
      leaseBits.push(`Maskinhyran ${leaseLine.unitPrice.toLocaleString('sv-SE')} kr/mån per maskin ligger över A4-normen ${bm.leasePerMachineMonthly.low}–${bm.leasePerMachineMonthly.high} kr/mån — är maskinerna A3 kan nivån vara motiverad; ange modell i offertsteget så jämför vi exakt.`);
    }
    if (contractMonths && contractMonths > bm.contractMonthsNorm) {
      leaseBits.push(`Bindningstiden ${contractMonths} månader överstiger marknadsnormen ${bm.contractMonthsNorm} — förhandlingsbart vid förnyelse.`);
    }
    if (leaseBits.length) parts.push(leaseBits.join(' '));
  }

  parts.push(`Klickpriset är ett kontraktspris och gäller oberoende av volym. Koppla Fortnox/Visma eller ladda upp fler månaders fakturor för att beräkna er exakta besparing per år.`);

  // Besparingsband per år, deterministiskt ur fakturans egna rader:
  // rad-besparing = radbelopp × (rate − mål) / rate, mål = bandtopp (low-änden) resp. bandbotten (high-änden).
  // Annualisering via explicit fakturaperiod — ALDRIG härledd ur en kvot (Svea-läxan).
  const savePerMonth = (amount, rate, target) =>
    amount > 0 && rate > target ? amount * (rate - target) / rate : 0;
  const lowMonthly  = savePerMonth(bwAmount, bwRate, bm.bw.high) + savePerMonth(colorAmount, colorRate, bm.color.high);
  const highMonthly = savePerMonth(bwAmount, bwRate, bm.bw.low)  + savePerMonth(colorAmount, colorRate, bm.color.low);
  let estimatedAnnualSavingsLow  = Math.round(lowMonthly  * periodMultiplier);
  let estimatedAnnualSavingsHigh = Math.round(highMonthly * periodMultiplier);
  if (estimatedAnnualSavingsHigh <= 2000) {
    estimatedAnnualSavingsLow = null;
    estimatedAnnualSavingsHigh = null;
  }

  return {
    bwRate,    bwBand:    bm.bw,    bwGapPct,
    colorRate, colorBand: bm.color, colorGapPct,
    colorSharePct: Math.round(colorShare * 100),
    priceGapScore,
    estimatedAnnualSavingsLow,
    estimatedAnnualSavingsHigh,
    // Bakåtkompatibelt alias = konservativa änden (bandtopp). Kundytor visar BANDET.
    estimatedAnnualSavingsGross: estimatedAnnualSavingsLow,
    feeSignals,
    lease,
    benchmarkSource: bm.source,
    reasoning: parts.join(' '),
  };
}

// Deterministisk saas-finance-rekommendation (Fortnox rätt-storlek). Ren funktion av fakturan
// + verifierade publika priser — ingen AI, ingen estimerad matris. Advisory/review: besparingen
// är en verifierad prisskillnad men realiseras först när kunden bekräftat att behovet ryms.
function fortnoxFinanceRecommendation(input) {
  const zeroUsage = { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 };
  const rs = saasFinanceRightsizing(input.invoice?.lineItems ?? []);
  if (!rs) {
    // Inget igenkänt paket (Fortnox/Spiris) → talfritt offert-läge (aldrig den estimerade matrisen).
    return {
      shouldSwitch: false, requiresQuote: true, recommendationType: 'requires_quote',
      reasoning: 'Vi ser ert bokföringssystem men kan inte säkert läsa vilken paketnivå ni ligger på ur fakturan. ' +
        'Vi gör en manuell genomgång mot Fortnox/Vismas publika prislista istället för att visa en siffra vi inte kan stå för — ' +
        'koppla ert system eller ladda upp en tydligare faktura så rätt-storlekar vi ert abonnemang.',
      revisionGate: 'audited', fortnoxRightsizing: null,
      suggestedSupplier: null, suggestedAnnualCost: null, savingPerYear: null,
      grossSaving: null, arvoFee: null, netSaving: null, optimizationSaving: null,
      licenseOverage: null, overageSavings: null, confidence: 'low', switchSteps: [],
      benchmark: null, usage: zeroUsage,
    };
  }
  // Igenkänt paket → advisory optimize. Siffran är VERIFIERAD (prisskillnad) men i review:
  // optimizationSaving hålls null tills kunden bekräftat (rådgivande revisor). Potentialen
  // lever i fortnoxRightsizing.annualSaving + den kodskrivna reasoning-texten.
  return {
    shouldSwitch: false, requiresQuote: false, recommendationType: 'optimize',
    reasoning: rs.reviewPrompt, revisionGate: 'audited', fortnoxRightsizing: rs,
    suggestedSupplier: `${rs.vendor} ${rs.targetPaket}`, suggestedAnnualCost: null,
    savingPerYear: null, grossSaving: null, arvoFee: null, netSaving: null,
    optimizationSaving: null, licenseOverage: null, overageSavings: null,
    confidence: 'high', switchSteps: [], benchmark: null, usage: zeroUsage,
  };
}

export async function recommend(input, opts = {}) {
  if (!input?.customer || !input?.categorized) {
    throw new RecommenderError(
      'input måste innehålla customer + categorized + invoice'
    );
  }

  // Revisionsgrinden (regel 4 som arkitektur): oreviderade kategorier får ALDRIG
  // visa siffror — de faller till ärligt offert-läge med talfri copy, före all
  // beräkning och före AI-anropet. Väg in: dedikerad regressionssvit + grönt i
  // sifferrevisorn. Se lib/revision-gate.js.
  {
    const _cat = input.categorized.category;
    if (!isAudited(_cat)) {
      console.log(`[revisionsgrind] '${_cat}' är oreviderad → offert-läge utan siffror`);
      return ungatedQuoteResponse(_cat, CATEGORIES[_cat]?.label ?? null);
    }
  }

  // ── saas-finance: deterministisk rätt-storleks-rådgivning (Fortnox) ────────────
  // Ingen AI, ingen estimerad matris. Enda kundsynliga siffran är skillnaden mellan TVÅ
  // verifierade publika Fortnox-listpriser (lib/fortnox-rightsizing.js, vaktad veckovis).
  // Igenkänns inget paket → talfritt offert-läge — det ESTIMERADE matrisvärdet når ALDRIG kund.
  if (input.categorized.category === 'saas-finance') {
    return fortnoxFinanceRecommendation(input);
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

  // Bredband-benchmark är HASTIGHETSBASERAD och härleds ur tele2Verified (regel 1) — ingen
  // industry×size-matris finns längre. Utan känd hastighet finns ingen verifierbar benchmark
  // (Zero Trust: ingen gissad siffra). Fiberpris beror på hastighet/nät, inte bolagets storlek.
  const connectionSpeedMbit = input.invoice?.connectionSpeedMbit ?? null;
  let benchmark = rawBenchmark;
  if (input.categorized.category === 'bredband') {
    benchmark = connectionSpeedMbit > 0 ? bredbandSpeedBenchmark(connectionSpeedMbit) : null;
  }

  // License tier override for saas-productivity / saas-devtools: swap generic p25
  // for tier-specific pricing so savings reflect what customers can actually achieve.
  // saas-productivity → msrpAnnual (Microsoft public annual list price)
  // saas-devtools     → msrpAnnual (public direct price — Arvo facilitates, not resells)
  const licenseType       = input.invoice?.licenseType ?? null;
  const billingCycleType  = input.invoice?.billingCycleType ?? null;
  const pricePerSeatMonthly = input.invoice?.pricePerSeatMonthly ?? null;
  const isSaasDevtools    = input.categorized.category === 'saas-devtools';
  let   saasLicenseTierKey = null;
  let   saasTierBm         = null;
  let   saasNonLicenseAddonAnnual = 0;  // recurring add-ons that aren't an M365 tier (backup, security…)

  // OBS: rawBenchmark kan vara null för saas-devtools (ingen matrix i branchindex).
  // Tier-override bygger benchmark från grunden om tier hittas — rawBenchmark krävs EJ.
  if (['saas-productivity', 'saas-devtools'].includes(input.categorized.category)) {
    const _lineItems = input.invoice?.lineItems ?? [];
    const dominantTierKey = getDominantSaasTierKey(_lineItems, licenseType, input.invoice?.saasProductFamily ?? null);
    // AI context uses dominant tier (like-for-like): benchmarks the customer against the SAME tier
    // at Microsoft public list price. No downgrade in the AI's pricing context.
    // SAAS_DOWNGRADE_TARGET is only used for the advisory tierOptimizationSaving calculation.
    saasLicenseTierKey = dominantTierKey;

    // Non-license add-ons (backup, security, etc.) are pass-throughs:
    // excluded from the savings calculation but added back to suggestedAnnualCost.
    if (input.categorized.category === 'saas-productivity') {
      let _nonTierMonthly = 0;
      for (const item of _lineItems) {
        if (item.type !== 'recurring_subscription') continue;
        if (!getSaasLicenseTierKey(item.description ?? '', null)) {
          _nonTierMonthly += item.amount ?? 0;
        }
      }
      saasNonLicenseAddonAnnual = Math.round(_nonTierMonthly * 12);
    }

    const rawTierBm = dominantTierKey
      ? BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks?.[dominantTierKey]
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
        : saasTierBm.msrpAnnual; // productivity: Microsoft public annual list price
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
    const fixed      = input.invoice.recurringAmount ?? 0;
    const clicks     = input.invoice.variableCharges ?? 0;
    const total      = fixed + clicks;
    const clickRatio = total > 0 ? clicks / total : 0;
    if (clickRatio > 0.35) {
      const clickRateAnalysis = analyzeClickRates(
        input.invoice.lineItems,
        input.categorized.normalizedSupplier,
        { billingPeriod: input.invoice.billingPeriod ?? 'monthly' },
      );
      const reasoning = clickRateAnalysis?.reasoning ??
        'Era utskriftskostnader drivs av klickvolymer — Arvo behöver er printhistorik för att förhandla rätt klick-avtal.';
      return {
        shouldSwitch:        false,
        requiresQuote:       true,
        recommendationType:  'requires_quote',
        reasoning,
        clickRateAnalysis:   clickRateAnalysis ?? null,
        suggestedSupplier:   null,
        suggestedAnnualCost: null,
        grossSaving:         null,
        arvoFee:             null,
        netSaving:           null,
        confidence:          'low',
        switchSteps:         [],
        licenseOverage:      null,
        overageSavings:      null,
        optimizationSaving:  null,
        benchmark,
        usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
      };
    }
  }

  // Kortterminal guard: om fakturan innehåller volymbaserade avgifter (% på omsättning
  // eller per-transaktion) kan den fasta månadsavgiften ensam inte benchmarkas rättvist.
  // Benchmarken är byggd på total transaktionskostnad; pipelinen annualiserar bara det fasta.
  // Rätt jämförelse kräver GMV, kortmix och avtalslängd — Arvo gör manuell genomgång.
  if (input.categorized.category === 'kortterminal') {
    const variableCharges = input.invoice.variableCharges ?? 0;
    if (variableCharges > 0) {
      const fixed    = input.invoice.recurringAmount ?? 0;
      const total    = fixed + variableCharges;
      const varRatio = total > 0 ? variableCharges / total : 0;
      const varPct   = Math.round(varRatio * 100);
      return {
        shouldSwitch:        false,
        requiresQuote:       true,
        recommendationType:  'requires_quote',
        reasoning:           `Fakturan innehåller volymbaserade avgifter (${varPct} % av total). ` +
                             'Rättvis benchmarking av betaltjänster kräver er transaktionsvolym, kortmix ' +
                             'och avtalslängd — Arvo gör en kostnadsfri manuell genomgång och jämför mot ' +
                             'aktuella rater från Stripe, Adyen och Klarna Checkout.',
        suggestedSupplier:   null,
        suggestedAnnualCost: null,
        grossSaving:         null,
        arvoFee:             null,
        netSaving:           null,
        confidence:          'low',
        switchSteps:         [],
        licenseOverage:      null,
        overageSavings:      null,
        optimizationSaving:  null,
        benchmark,
        usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
      };
    }
  }

  // Managed Workplace / WaaS guard: bundled PC + licens + helpdesk kan inte
  // benchmarkas automatiskt — priset beror på hårdvaruspec, SLA och avtalslängd.
  // Falskt larm på ett bra WaaS-avtal är mer skadligt än att be om offert.
  if (input.categorized.category === 'managed-workplace') {
    return {
      shouldSwitch:        false,
      requiresQuote:       true,
      recommendationType:  'requires_quote',
      reasoning:           'Det här är ett bundlat WaaS-avtal (dator + licenser + support). ' +
                           'Rättvisande benchmarking kräver komponentspecifikation — ' +
                           'Arvo gör en kostnadsfri manuell genomgång.',
      suggestedSupplier:   null,
      suggestedAnnualCost: null,
      grossSaving:         null,
      arvoFee:             null,
      netSaving:           null,
      confidence:          'low',
      switchSteps:         [],
      licenseOverage:      null,
      overageSavings:      null,
      optimizationSaving:  null,
      benchmark,
      usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
    };
  }

  // Avfall-guard: deterministisk bedömning mot branschindex — kräver offert för exakt anbud
  // men ger ändå riktningsbedömning (dyr/rimlig) baserat på kr/år vs benchmark.
  if (input.categorized.category === 'avfall-atervinning') {
    const annualCost = input.invoice?.annualCost ?? 0;
    const bm = benchmark;
    const alts = (bm?.alternatives ?? []).slice(0, 3).map(a => a.supplier).join(', ');

    let shouldSwitch = false;
    let reasoning;
    let suggestedAnnualCost = null;
    let grossSaving = null;
    let arvoFee = null;
    let netSaving = null;

    if (bm && annualCost > 0) {
      shouldSwitch = annualCost > bm.p25 * 1.10;
      const overMedianPct = Math.round(((annualCost - bm.median) / bm.median) * 100);
      if (shouldSwitch) {
        reasoning = `Er avfallskostnad på ${annualCost.toLocaleString('sv-SE')} kr/år är sämre än branschsnittet för er verksamhetsstorlek. Välförhandlat avtalspris med rikstäckande aktörer är väsentligt lägre. Arvo begär offert från ${alts} baserat på ert tömningsschema och fraktionsfördelning.`;
        suggestedAnnualCost = bm.p25;
        grossSaving = Math.max(0, annualCost - bm.p25);
        arvoFee = Math.round(grossSaving * 0.20);
        netSaving = grossSaving - arvoFee;
      } else {
        reasoning = `Er avfallskostnad på ${annualCost.toLocaleString('sv-SE')} kr/år är inom marknadsnormen för er verksamhetsstorlek (branschindex undre kvartil: ${bm.p25.toLocaleString('sv-SE')} kr/år, median: ${bm.median.toLocaleString('sv-SE')} kr/år). En offertförfrågan kan ändå ge bekräftelse — avfallspriser varierar med tömningsfrekvens, container och fraktioner.`;
      }
    } else {
      reasoning = 'Avfallskostnader styrs av tömningsfrekvens, vikt och fraktioner — Arvo begär offert för att ge er en rättvis jämförelse.';
    }

    return {
      shouldSwitch,
      requiresQuote:      true,
      recommendationType: 'requires_quote',
      reasoning,
      suggestedSupplier:   shouldSwitch ? 'Arvo-verifierad avfallspartner' : null,
      suggestedAnnualCost,
      grossSaving,
      arvoFee,
      netSaving,
      confidence:          bm ? 'medium' : 'low',
      switchSteps:         shouldSwitch ? [
        'Arvo sammanställer ert tömningsschema och fraktionsfördelning',
        'Offertförfrågan skickas till rikstäckande avfallspartners',
        'Arvo presenterar bästa erbjudandet — ni behöver inte göra något',
      ] : [],
      licenseOverage:      null,
      overageSavings:      null,
      optimizationSaving:  null,
      benchmark,
      usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
    };
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
    // Pass extracted elKwh (monthly period) so enrichElContext can derive accurate
    // annual kWh instead of falling back on the 1.27 kr/kWh average estimate.
    const elKwh = input.invoice.elKwh ?? null;
    elContext = await enrichElContext({ annualCost, elKwh, categorized: input.categorized });
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

  // ── Shelfware (FRISTÅENDE) — oanvända SaaS-licenser ───────────────────────────
  // Svinnet existerar OBEROENDE av om vi rekommenderar ett leverantörsbyte: en kund kan
  // ha helt rätt pris men ändå betala för 20 tomma platser. Därför räknas shelfware här,
  // utanför shouldSwitch-blocket, så att revisorsfrågan/svinnet alltid når kunden.
  // Endast SaaS (per-plats-licenser). Gapet mot kundens EGNA pris/plats är verifierbart
  // utan extern benchmark (regel 3/4) — revisionsgrinden har redan släppt igenom kategorin.
  if (input.categorized.category?.startsWith('saas')) {
    const _shelfware = computeShelfware({
      seatCount:           input.invoice?.seatCount ?? null,
      pricePerSeatMonthly,
      employees:           input.customer?.employees ?? 1,
      knownExceptions:     input.invoice?.licenseKnownExceptions ?? null,
    });
    result.shelfware = _shelfware ?? null;
    if (_shelfware && !_shelfware.needsReview) {
      result.licenseOverage = _shelfware.confirmedIdle;
      result.overageSavings = _shelfware.annualWaste;
    } else {
      // review-läge eller inget gap → ingen besparingssiffra (precision eller tystnad)
      result.licenseOverage = null;
      result.overageSavings = null;
    }
  }

  // ── Prosakravet (SKUGGA): varje tal i AI:ns reasoning måste finnas i prompten ──
  // (prompten innehåller alla injicerade kodberäknade fakta — ett tal utanför den
  // kan modellen bara ha räknat fram själv, vilket är förbjudet). Loggas alltid;
  // vid PROSAKRAV_ENFORCE=1 ersätts texten aldrig — analysen routas till granskning
  // genom att reasoning töms (UI visar då det deterministiska beskedet istället).
  if (typeof result.reasoning === 'string' && result.reasoning) {
    const factsText = SYSTEM_PROMPT + '\n' + requestParams.messages[0].content;
    const prose = checkProseNumbers(result.reasoning, factsText);
    if (!prose.ok) {
      console.warn(`[prosakrav] ${process.env.PROSAKRAV_ENFORCE === '1' ? 'STOPP' : 'SKUGGA'}: ` +
        `${prose.violations.length} tal utan källtäckning i reasoning: ${prose.violations.join(', ')} ` +
        `(${prose.checked} tal kontrollerade)`);
      if (process.env.PROSAKRAV_ENFORCE === '1') {
        result.reasoning = '';
      }
    }
  }

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

  // Deterministic shouldSwitch override for saas-productivity with a like-for-like target.
  // The generic benchmark uses dominant-tier × total seats — wrong for mixed-tier invoices
  // (e.g. 50 BP + 23 BS: benchmark would price all 73 as BP, masking the real saving).
  // The LFL target already accounts for tier mix; use it directly.
  const _lflInvoice = input.invoice?.likeForLikeTarget;
  if (
    input.categorized.category === 'saas-productivity' &&
    _lflInvoice?.suggestedAnnualCost > 0 &&
    !categoryDef?.licensePending
  ) {
    const _lflAnnualCost = input.invoice.annualCost ?? 0;
    const _lflOverpayPct = (_lflAnnualCost - _lflInvoice.suggestedAnnualCost) / _lflInvoice.suggestedAnnualCost;
    if (_lflOverpayPct > 0.05) {
      result.shouldSwitch = true;
    }
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
    // For saas-productivity: scale against employees (the correct headcount), not seatCount
    // (which may be inflated by add-on/overage licenses on the invoice).
    const isSaasProductivity = input.categorized.category === 'saas-productivity';
    const scale = isPerUser && effectiveSeats > 0
      ? (isSaasProductivity ? employees : effectiveSeats)
      : 1;

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
    // saas-productivity non-license add-ons (backup, security…) are passed through identically
    // to mobile/bredband add-ons: excluded from savings base, added back to suggestedAnnualCost.
    const addonAnnual = mobileAddonAnnual + broadbandAddonAnnual + saasNonLicenseAddonAnnual;

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

    // For saas-productivity with a like-for-like target: use LFL suggestedAnnualCost
    // (tier-mix-aware) rather than benchmark.p25 × scale (dominant tier only, wrong for mixed).
    const _lflTarget = input.invoice?.likeForLikeTarget;
    const _useLfl = isSaasProductivity && _lflTarget?.suggestedAnnualCost > 0;
    const _benchBase = _useLfl
      ? _lflTarget.suggestedAnnualCost - addonAnnual  // strip addon pass-throughs already included in LFL total
      : Math.round(benchmark.p25 * scale);

    result.suggestedAnnualCost = _benchBase + addonAnnual;
    result.savingPerYear = Math.max(0, Math.round(comparableAnnualCost - _benchBase));
    result.overpaymentPercent = benchmark.median > 0
      ? Math.round(((comparableAnnualCost - benchmark.median * scale) / (benchmark.median * scale)) * 100)
      : (result.overpaymentPercent ?? 0);

    // Licensrensning (shelfware) räknas fristående ovan, oberoende av shouldSwitch —
    // result.overageSavings är redan satt och plockas upp av savingsBreakdown nedan.

    // Tier optimization: saasTierBm now holds the RECOMMENDED tier (already downgraded).
    // The tier saving is embedded in the primary savingPerYear — no separate advisory needed.
    const tierOptimizationSaving = null;

    // Savings breakdown — decompose total saving by channel
    result.savingsBreakdown = {
      cspDiscount:         Math.max(0, comparableAnnualCost - (result.suggestedAnnualCost - addonAnnual)),
      billingOptimization: (billingCycleType === 'monthly' && saasTierBm && saasTierBm.msrpAnnual != null && scale > 0)
        ? Math.max(0, Math.round((saasTierBm.msrpMonthly - saasTierBm.msrpAnnual) * 12 * scale))
        : null,
      tierOptimization:    tierOptimizationSaving,
      licenseCleanup:      result.overageSavings ?? null,
    };

    // Minimigräns: ett leverantörsbyte under 500 kr nettobesparing per år är
    // operationellt orimligt — byteskostnad i tid överstiger vinsten. OBS: detta rör
    // ENBART leverantörsbytet. Shelfware (licensrensning) är en fristående besparing och
    // röjs aldrig av en liten bytesvinst — den lever kvar i result.shelfware/overageSavings.
    if ((result.savingPerYear ?? 0) < 500) {
      result.shouldSwitch = false;
    }

    // Attribueringslåset: när LFL-fakta är kompletta ersätts AI:ns resonemang med
    // den kodskrivna versionen — 683-felklassen (blandad per-seat-total kallad
    // licenspris) kan inte återuppstå i en maskinskriven mening.
    if (_useLfl && result.shouldSwitch) {
      const deterministicReasoning = buildLikeForLikeReasoning({
        supplier:            input.categorized.normalizedSupplier,
        lfl:                 _lflTarget,
        annualCost:          comparableAnnualCost + addonAnnual,
        suggestedAnnualCost: result.suggestedAnnualCost,
        savingPerYear:       result.savingPerYear,
        billingCycleType,
      });
      if (deterministicReasoning) {
        if (result.reasoning && result.reasoning !== deterministicReasoning) {
          console.log('[attribueringslås] AI-reasoning ersatt med deterministisk LFL-text');
        }
        result.reasoning = deterministicReasoning;
      }
    }

    } // end else (combined+null guard)
  }

  return {
    ...result,
    recommendationType: result.recommendationType ?? (result.shouldSwitch ? 'switch' : 'no_action'),
    requiresQuote:      result.requiresQuote ?? false,
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
