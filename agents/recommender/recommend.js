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

const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 1024;

// Mirrors REAL_PRICE_CATEGORIES in the frontend — categories with public list
// prices where naming the suggested supplier in reasoning is fine.
const REAL_PRICE_CATEGORIES = new Set(['saas-productivity', 'mobil']);

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

function formatPrompt({ customer, invoice, categorized, benchmark, elContext }) {
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
    if (categorized.category !== 'saas-productivity') return '';
    const lt  = invoice.licenseType;
    const bc  = invoice.billingCycleType;
    const pps = invoice.pricePerSeatMonthly;
    const tierKey = getSaasLicenseTierKey(lt);
    const tierBm  = tierKey ? BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks?.[tierKey] : null;
    const seats   = (invoice.seatCount ?? customer.employees) || 1;

    const lines = [];
    if (lt) lines.push(`  Licensplan            : ${lt}`);
    lines.push(`  Faktureringsmodell    : ${bc === 'monthly' ? 'Månadsvis — kunden betalar löpande utan årsåtagande' : bc === 'annual' ? 'Årsavtal — kunden har redan åtagit sig 12 månader' : 'Okänt'}`);
    if (pps != null) lines.push(`  Aktuellt pris/seat    : ${pps.toFixed(0)} kr/mån`);

    if (tierBm) {
      lines.push(`\n  Tier-benchmarks (Arvo CSP maj 2026, ${seats} seats):`);
      lines.push(`    MSRP månadsvis  : ${tierBm.msrpMonthly} kr/seat/mån  = ${(tierBm.msrpMonthly * 12 * seats).toLocaleString('sv-SE')} kr/år totalt`);
      lines.push(`    MSRP årsavtal   : ${tierBm.msrpAnnual} kr/seat/mån  = ${(tierBm.msrpAnnual * 12 * seats).toLocaleString('sv-SE')} kr/år totalt`);
      lines.push(`    Arvo årsavtal   : ${tierBm.arvoAnnual} kr/seat/mån  = ${(tierBm.arvoAnnual * 12 * seats).toLocaleString('sv-SE')} kr/år totalt  ← DETTA ÄR ERT MÅL`);

      if (pps != null && bc === 'monthly') {
        const annualBilling = Math.round((pps - tierBm.msrpAnnual) * 12 * seats);
        const cspSaving     = Math.round((tierBm.msrpAnnual - tierBm.arvoAnnual) * 12 * seats);
        if (annualBilling > 0) lines.push(`    → Byta till årsavtal (same tier): ${annualBilling.toLocaleString('sv-SE')} kr/år`);
        if (cspSaving > 0)    lines.push(`    → Arvo CSP vs. MSRP årsavtal: ${cspSaving.toLocaleString('sv-SE')} kr/år`);
      }

      // Downsell note for enterprise tiers with SMF-sized companies
      if ((tierKey === 'e3' || tierKey === 'e5') && seats <= 300) {
        const bpTier = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks?.['business-premium'];
        if (bpTier) {
          const downsellSav = Math.round((tierBm.arvoAnnual - bpTier.arvoAnnual) * 12 * seats);
          lines.push(`\n  TIERANALYS — ${tierKey.toUpperCase()} för ${seats} seats:`);
          lines.push(`    ${tierKey.toUpperCase()} motiveras av: eDiscovery, avancerat auditlogg, Purview compliance, SIEM.`);
          lines.push(`    Saknas dessa krav: Business Premium (Intune + Defender) räcker för säkerhetsfokuserade SMF.`);
          lines.push(`    Möjlig tier-besparing (${tierKey.toUpperCase()} → Business Premium, Arvo CSP): ${downsellSav.toLocaleString('sv-SE')} kr/år`);
          lines.push(`    OBS: Nämn alltid tier-alternativet i reasoning om kunden troligen saknar E3-specifika behov.`);
        }
      }
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
function getSaasLicenseTierKey(licenseType) {
  if (!licenseType) return null;
  const lt = licenseType.toLowerCase();
  if (lt.includes('business basic'))                              return 'business-basic';
  if (lt.includes('business standard') || lt.includes('apps for business')) return 'business-standard';
  if (lt.includes('business premium'))                           return 'business-premium';
  if (lt === 'e3' || lt.includes(' e3') || lt.includes('enterprise e3')) return 'e3';
  if (lt === 'e5' || lt.includes(' e5') || lt.includes('enterprise e5')) return 'e5';
  if (lt.includes('google') && lt.includes('starter'))           return 'google-starter';
  if (lt.includes('google') && lt.includes('standard'))          return 'google-standard';
  if (lt.includes('google') && lt.includes('plus'))              return 'google-plus';
  return null;
}

export async function recommend(input, opts = {}) {
  if (!input?.customer || !input?.categorized) {
    throw new RecommenderError(
      'input måste innehålla customer + categorized + invoice'
    );
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

  // License tier override for saas-productivity: use tier-specific CSP prices
  // instead of generic flat p25. arvoAnnual per seat (×12) becomes the new p25
  // so savings reflect what Arvo can actually deliver.
  const licenseType       = input.invoice?.licenseType ?? null;
  const billingCycleType  = input.invoice?.billingCycleType ?? null;
  const pricePerSeatMonthly = input.invoice?.pricePerSeatMonthly ?? null;
  let   saasLicenseTierKey = null;
  let   saasTierBm         = null;

  if (input.categorized.category === 'saas-productivity' && rawBenchmark) {
    saasLicenseTierKey = getSaasLicenseTierKey(licenseType);
    saasTierBm = saasLicenseTierKey
      ? BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks?.[saasLicenseTierKey]
      : null;
    if (saasTierBm) {
      // p25 = arvoAnnual per seat × 12 (best realistic annual price via Arvo CSP)
      // median = msrpMonthly × 12 (what most customers currently pay on monthly billing)
      benchmark = {
        ...rawBenchmark,
        p25:    saasTierBm.arvoAnnual * 12,
        median: saasTierBm.msrpMonthly * 12,
        note:   saasTierBm.note + ' Per användare/år.',
      };
    }
  }

  // Always compute annual billing saving (informational, independent of switch decision)
  let annualBillingSaving = null;
  if (billingCycleType === 'monthly' && saasTierBm) {
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
    messages: [{ role: 'user', content: formatPrompt({ ...input, benchmark, elContext }) }],
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

  // Deterministic shouldSwitch override: if the customer pays >15 % over p25,
  // always recommend a switch regardless of what the model decided.
  // This eliminates AI flip-flopping on clear-cut overpayment cases.
  if (!categoryDef?.licensePending && benchmark) {
    const _annualCost = input.invoice.annualCost ?? input.invoice.amount ?? 0;
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

    result.suggestedAnnualCost = Math.round(benchmark.p25 * scale);
    result.savingPerYear = Math.max(0, Math.round(annualCost - result.suggestedAnnualCost));
    result.overpaymentPercent = benchmark.median > 0
      ? Math.round(((annualCost - benchmark.median * scale) / (benchmark.median * scale)) * 100)
      : (result.overpaymentPercent ?? 0);

    if (seatCount != null && seatCount > employees) {
      result.licenseOverage = seatCount - employees;
      result.overageSavings = Math.round(result.licenseOverage * benchmark.p25);
    } else {
      result.licenseOverage = null;
      result.overageSavings = null;
    }

    // Minimigräns: ett leverantörsbyte under 500 kr nettobesparing per år är
    // operationellt orimligt — byteskostnad i tid överstiger vinsten.
    if ((result.savingPerYear ?? 0) < 500) {
      result.shouldSwitch = false;
      result.licenseOverage = null;
      result.overageSavings = null;
    }
  }

  return {
    ...result,
    recommendationType: result.recommendationType ?? (result.shouldSwitch ? 'switch' : 'no_action'),
    optimizationSaving: result.optimizationSaving ?? null,
    suggestedSupplier: result.suggestedSupplier ?? null,
    suggestedAnnualCost: result.suggestedAnnualCost ?? null,
    annualBillingSaving,
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
