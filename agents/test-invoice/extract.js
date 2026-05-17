// agents/test-invoice/extract.js
// PDF → semantiskt klassificerade raddata via Claude Opus 4.7.
// Varje kostnadsrad klassificeras: recurring_subscription | variable_usage |
// one_time_fee | hardware. aggregateLineItems() summerar per typ och
// beräknar annualCost = recurringAmount × periodMultiplier.
//
// Model: claude-opus-4-7 — native PDF-support + högst tolkningsnoggrannhet.
// Output: tool_use + tool_choice för deterministisk strukturerad output.

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'node:fs';
import { extname } from 'node:path';

const MODEL = 'claude-opus-4-7';
const MAX_TOKENS = 2048;

export const CONFIDENCE_THRESHOLD = 0.70;

const PERIOD_MULTIPLIER = {
  monthly:   12,
  quarterly:  4,
  annual:     1,
  one_time:   0,
  unknown:   12,
};

export class ExtractorError extends Error {
  constructor(message, { cause } = {}) {
    super(message);
    this.name = 'ExtractorError';
    if (cause) this.cause = cause;
  }
}

const SYSTEM_PROMPT = `Du är en datauttagsexpert för svenska leverantörsfakturor.

Din uppgift är att läsa en PDF-faktura och returnera VARJE identifierad kostnadsrad som strukturerad data via verktyget "extract_invoice".

KLASSIFICERA VARJE RAD I EXAKT EN AV FYRA TYPER:

recurring_subscription
  Fasta, återkommande kostnader som gäller per period oavsett förbrukning.
  Exempel: månadsabonnemang, maskinleasing, fasta licensavgifter,
  fakturaavgifter som återkommer varje period, fasta paketavgifter,
  supportavtal, serviceavtal.
  SAMT klickkostnader för skrivare i Managed Print-avtal (förhandlingsbara kontraktsrader).
  SAMT bas-fraktavgifter i transport/frakt-fakturor (pallfrakt, styckegods, fraktavgift per pall/paket/kg)
  — dessa representerar en löpande månatlig tjänsterelation oavsett att volymen varierar.

variable_usage
  Rörliga kostnader som varierar med faktisk förbrukning. ENBART för mobiltelefoni.
  Exempel: roaming utanför EU, övertrafik, extra datapåslag, SMS-paket utanför plan.
  OBS: Klickkostnader för skrivare är INTE variable_usage — klassificera dem som recurring_subscription.
  OBS: Frakttillägg och bränslebaserade avgifter (DMT, drivmedelstillägg) är INTE variable_usage — klassificera dem som one_time_fee.

one_time_fee
  Engångskostnader som inte återkommer regelbundet.
  Exempel: installationsavgift, uppstartsavgift, aktiveringsavgift,
  påminnelseavgift, konsultarvode, reparation.
  SAMT bränsle- och frakttillägg (DMT, drivmedelstillägg, bränslerelaterat tillägg,
  bomkörning, terminalavgift) — dessa varierar med bränslepriser och är ej förhandlingsbara avtalsposter.
  SAMT krediteringar och minusposter för avslutade, uppsagda eller justerade
  licenser/avtal — dessa är historiska korrigeringar som inte återkommer och
  ska ALDRIG klassificeras som recurring_subscription. Kundens framtida
  run-rate påverkas inte av sådana engångsjusteringar.
  SAMT pro-rata-avgifter för licenser eller abonnemang som TILLKOMMIT mitt i
  en period (t.ex. "Pro-rata: Tillagd 16 maj", "delsperiod"). Dessa är
  periodjusteringar som inte återkommer — nästa period debiteras full avgift.
  Klassificera ALLTID sådana rader som one_time_fee.

hardware
  Köpt hårdvara eller utrustning (ej leasing eller hyra).
  Exempel: köp av telefon, skrivare, server, nätverksutrustning.

FAKTURERINGSPERIOD — välj exakt ett värde baserat på fakturans rader:
  monthly   = faktureras månadsvis (vanligast för abonnemang)
  quarterly = faktureras kvartalsvis
  annual    = faktureras årsvis (t.ex. försäkringspremie, årslicens)
  one_time  = engångsfaktura utan löpande abonnemang
  unknown   = kan ej avgöras med säkerhet

CONFIDENCE SCORE (0.0–1.0):
  1.0 = alla rader är tydligt beskrivna, period är otvetydig, inga antaganden krävdes.
  Sänk vid: otydliga radbeskrivningar, saknad periodinfo, blandade perioder,
  faktura på utländskt språk, skannad/handskriven faktura, antaganden som krävdes.
  Sänk alltid om du är osäker på klassificeringen av någon rad.

OUT OF SCOPE — sätt outOfScope: true om fakturan avser tjänster utan
  förhandlingsbar volymstruktur: redovisningstjänster, juridik, restaurang/mat,
  rekrytering, marknadsföring, bemanning, utbildning, myndighetsavgifter.
  ALDRIG out of scope: elavtal (spotpris, rörligt el), mobilabonnemang, bredband,
  leasing (bil, IT, skrivare), SaaS-licenser, kortterminaler, larm & bevakning,
  löneadministration, städ, frakt — dessa har alltid förhandlingsbara volymer.
  Fakturan kan fortfarande extraheras men flaggas.

KRITISKT:
  — Alla belopp EXKLUSIVE moms (svensk B2B-standard). Om bara ink. moms: dividera med 1.25.
  — Returnera VARJE synlig kostnadsrad — utelämna inga rader.
  — seatCount: Antal UNIKA ANVÄNDARE som licensieras. Summera rader med OLIKA TIERS av SAMMA
    produkt (t.ex. 45 Premium + 12 Basic = 57 unika användare). Räkna INTE ihop add-on-tjänster
    (backup, säkerhet, arkiv, e-signatur) med bastjänsten — om 57 M365-licenser + 57
    molnbackup-licenser är seatCount = 57, inte 114. Sätt null om fakturan inte avser
    per-användarlicenser.
  — projectedRecurringAmount: Det belopp som faktiskt kommer att debiteras nästa FULLA period,
    efter att engångsjusteringar (pro-rata, krediteringar) är normaliserade.
    Exempel: Faktura visar 20 licenser × 500 kr (recurring) + 5 licenser × 250 kr (pro-rata tillagda
    16 maj). Nästa månads fulla debitering = 25 × 500 = 12 500 kr.
    projectedRecurringAmount = 12 500.
    Om inga pro-rata-justeringar eller krediteringar förekommer: sätt samma värde som summan
    av recurring_subscription-rader.
  — Returnera ALDRIG text utanför verktygsanropet.

STARTUP-KREDITER — om fakturan visar att ett startup-program, promotional credit eller
  liknande kreditpost reducerar totalsumman:
  startup_credit_balance: Kvarvarande kreditbalans som visas explicit på fakturan (positivt tal).
  startup_credit_monthly_burn: Faktisk månadsförbrukning INNAN krediten applicerades (summan av alla tjänstrader).
  startup_credit_currency: Valutakod, t.ex. "USD" eller "SEK".
  Sätt alla tre till null om inga startup-/programkrediter förekommer på fakturan.

ELFAKTUROR — extrahera dessa fält om fakturan är från en elleverantör:
  el_kwh: Total förbrukning i kWh denna faktureringsperiod.
  el_billing_month: Månaden förbrukningen avser, t.ex. "maj", "februari".
  el_omrade: Elområde SE1, SE2, SE3 eller SE4. Identifiera från anläggnings-ID,
    ort eller adress. Defaulta till "SE3" om osäker. null om ej elfaktura.
  el_fast_avgift_kr: Leverantörens fasta månadsavgift (abonnemangsavgift) i kr exkl. moms.
    null om saknas eller ej elfaktura.
  el_energipris_per_kwh: Leverantörens rörliga energiavgift i kr/kWh exkl. moms
    och exkl. nätavgift, energiskatt och elcertifikat. Vid fastprisavtal: det fasta
    kWh-priset. null om ej elfaktura.
  el_skatter_kr: Summan av energiskatt och elcertifikatsavgifter för perioden i kr exkl. moms.
    Energiskatt och elcertifikat är lagstadgade avgifter som alltid syns explicit på elfakturan.
    null om saknas eller ej elfaktura.`;

const EXTRACT_TOOL = {
  name: 'extract_invoice',
  description: 'Extrahera semantiskt klassificerade raddata från en svensk leverantörsfaktura.',
  input_schema: {
    type: 'object',
    properties: {
      supplier: {
        type: 'string',
        description: 'Leverantörens fullständiga registrerade namn som det står på fakturan',
      },
      date: {
        type: 'string',
        description: 'Fakturadatum i ISO-format YYYY-MM-DD',
      },
      description: {
        type: 'string',
        description: 'Kort övergripande beskrivning av fakturans huvudändamål, t.ex. "Mobilabonnemang mars 2025" eller "Skrivarleasing Q2 2025"',
      },
      billingPeriod: {
        type: 'string',
        enum: ['monthly', 'quarterly', 'annual', 'one_time', 'unknown'],
        description: 'Faktureringsperiod baserat på radernas karaktär',
      },
      lineItems: {
        type: 'array',
        description: 'Varje identifierad kostnadsrad på fakturan',
        items: {
          type: 'object',
          properties: {
            description: {
              type: 'string',
              description: 'Radbeskrivning exakt som på fakturan',
            },
            amount: {
              type: 'integer',
              description: 'Belopp exkl. moms i SEK, heltal',
            },
            type: {
              type: 'string',
              enum: ['recurring_subscription', 'variable_usage', 'one_time_fee', 'hardware'],
              description: 'Semantisk klassificering av raden',
            },
          },
          required: ['description', 'amount', 'type'],
        },
      },
      confidenceScore: {
        type: 'number',
        description: 'Extraktionssäkerhet 0.0–1.0',
      },
      confidenceNotes: {
        type: ['string', 'null'],
        description: 'Förklaring om confidence understiger 0.85, annars null',
      },
      outOfScope: {
        type: 'boolean',
        description: 'true om fakturan avser en kategori utan förhandlingsbar volymstruktur',
      },
      seatCount: {
        type: ['integer', 'null'],
        description: 'Totalt antal seats/licenser. Summera alla licensrader oavsett tier. null om inte per-användarprenumeration.',
      },
      projectedRecurringAmount: {
        type: 'integer',
        description: 'Beräknat recurring-belopp nästa fulla period i SEK, efter normalisering av pro-rata och krediteringar. Identisk med summan av recurring_subscription-rader om inga justeringar förekommer.',
      },
      account: {
        type: ['string', 'null'],
        description: 'Bokföringskonto om det framgår, t.ex. "5310". null om osäker.',
      },
      el_kwh: {
        type: ['integer', 'null'],
        description: 'Total elförbrukning i kWh för perioden. null om ej elfaktura.',
      },
      el_billing_month: {
        type: ['string', 'null'],
        description: 'Månaden förbrukningen avser, t.ex. "maj". null om ej elfaktura.',
      },
      el_omrade: {
        type: ['string', 'null'],
        description: 'Elområde SE1/SE2/SE3/SE4. Default SE3 om osäker. null om ej elfaktura.',
      },
      el_fast_avgift_kr: {
        type: ['integer', 'null'],
        description: 'Fast månadsavgift hos elleverantören i kr exkl. moms. null om saknas/ej elfaktura.',
      },
      el_energipris_per_kwh: {
        type: ['number', 'null'],
        description: 'Rörlig energiavgift kr/kWh exkl. moms, nätavgift och skatter. null om ej elfaktura.',
      },
      el_skatter_kr: {
        type: ['integer', 'null'],
        description: 'Summa energiskatt + elcertifikat för perioden i kr exkl. moms. null om ej elfaktura.',
      },
      startup_credit_balance: {
        type: ['number', 'null'],
        description: 'Kvarvarande kreditbalans från startup-/kampanjprogram som visas på fakturan. null om ej tillämpligt.',
      },
      startup_credit_monthly_burn: {
        type: ['number', 'null'],
        description: 'Faktisk månadsförbrukning INNAN startup-kredit applicerades (summan av alla tjänstrader). null om ej tillämpligt.',
      },
      startup_credit_currency: {
        type: ['string', 'null'],
        description: 'Valutakod för krediten, t.ex. "USD" eller "SEK". null om ej tillämpligt.',
      },
    },
    required: [
      'supplier', 'date', 'description', 'billingPeriod',
      'lineItems', 'confidenceScore', 'outOfScope',
      'projectedRecurringAmount',
    ],
  },
};

/**
 * Summera lineItems per typ och beräkna annualCost deterministiskt.
 * Alla aggregerade fält som categorize.js och recommend.js förväntar sig
 * genereras här — modellen räknar aldrig ut dem själv.
 */
export function aggregateLineItems(raw) {
  const sum = (type) =>
    (raw.lineItems ?? [])
      .filter((l) => l.type === type)
      .reduce((s, l) => s + l.amount, 0);

  const recurringAmount = sum('recurring_subscription');
  const variableCharges = sum('variable_usage');
  const oneTimeFees     = sum('one_time_fee') + sum('hardware');
  const multiplier      = PERIOD_MULTIPLIER[raw.billingPeriod] ?? 12;

  // projectedRecurringAmount: AI:ns beräkning av vad som faktiskt debiteras nästa fulla
  // period, normaliserat för pro-rata och krediteringar. Styr annualCost-beräkningen.
  // Sanity check: värdet måste vara ett positivt heltal. Annars fallback till recurringAmount
  // och sänkt confidence signaleras implicit via att annualCost matchar recurring-summan.
  const projected =
    typeof raw.projectedRecurringAmount === 'number' && raw.projectedRecurringAmount > 0
      ? raw.projectedRecurringAmount
      : recurringAmount;

  return {
    supplier:                 raw.supplier,
    date:                     raw.date,
    description:              raw.description,
    account:                  raw.account ?? null,
    billingPeriod:            raw.billingPeriod,
    lineItems:                raw.lineItems ?? [],
    amount:                   (raw.lineItems ?? []).reduce((s, l) => s + l.amount, 0),
    recurringAmount,
    projectedRecurringAmount: projected,
    variableCharges,
    oneTimeFees,
    annualCost:               projected * multiplier,
    recurring:                recurringAmount > 0,
    confidenceScore:          raw.confidenceScore,
    confidenceNotes:          raw.confidenceNotes ?? null,
    outOfScope:               raw.outOfScope ?? false,
    seatCount:                raw.seatCount ?? null,
    notes:                    raw.confidenceNotes ?? null,
    elKwh:            raw.el_kwh != null ? Number(raw.el_kwh) : null,
    elBillingMonth:   raw.el_billing_month ?? null,
    elOmrade:         raw.el_omrade ?? null,
    elFastAvgiftKr:   raw.el_fast_avgift_kr != null ? Number(raw.el_fast_avgift_kr) : null,
    elEnergiPerKwh:   raw.el_energipris_per_kwh != null ? Number(raw.el_energipris_per_kwh) : null,
    elSkatterKr:      raw.el_skatter_kr != null ? Number(raw.el_skatter_kr) : null,
    startupCreditBalance:      raw.startup_credit_balance != null ? Number(raw.startup_credit_balance) : null,
    startupCreditMonthlyBurn:  raw.startup_credit_monthly_burn != null ? Number(raw.startup_credit_monthly_burn) : null,
    startupCreditCurrency:     raw.startup_credit_currency ?? null,
  };
}


/**
 * Triagera extraktionsresultatet.
 * Returnerar route: 'auto' | 'review_queue' | 'unsupported'
 *
 * Kontroller körs i två lager:
 *   1. Sanity checks — fångar "confident wrong" oberoende av AI:ns self-reported confidence
 *   2. Confidence threshold — fångar fall där AI:n själv signalerar osäkerhet
 */
export function routeExtraction(extracted) {
  if (extracted.outOfScope) {
    return { route: 'unsupported' };
  }

  // ── Lager 1: Sanity checks ────────────────────────────────────────────────
  if (!extracted.supplier || extracted.supplier.trim() === '') {
    return { route: 'review_queue', reason: 'Leverantörsnamn saknas' };
  }

  if ((extracted.lineItems ?? []).length === 0) {
    return { route: 'review_queue', reason: 'Inga kostnadsrader extraherades' };
  }

  if (extracted.billingPeriod === 'unknown') {
    return { route: 'review_queue', reason: 'Faktureringsperiod okänd — annualisering otillförlitlig' };
  }

  if (extracted.annualCost === 0 && extracted.billingPeriod !== 'one_time') {
    return { route: 'review_queue', reason: 'Beräknad årskostnad är 0 kr trots återkommande fakturering' };
  }

  // ── Lager 2: AI:ns self-reported confidence ───────────────────────────────
  if (extracted.confidenceScore < CONFIDENCE_THRESHOLD) {
    return {
      route:  'review_queue',
      reason: `Confidence ${extracted.confidenceScore.toFixed(2)} under tröskel ${CONFIDENCE_THRESHOLD}`,
    };
  }

  return { route: 'auto' };
}

let _client;
function getClient() {
  if (_client) return _client;
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new ExtractorError(
      'ANTHROPIC_API_KEY saknas i miljön. Sätt den i .env eller exportera variabeln.'
    );
  }
  _client = new Anthropic();
  return _client;
}

/**
 * Extrahera och aggregera fakturadata från en PDF.
 *
 * @param {{ pdfPath?: string, pdfBytes?: Buffer }} input
 * @param {{ client?: Anthropic }} [opts]
 * @returns {Promise<ReturnType<aggregateLineItems> & { usage: object }>}
 */
export async function extractInvoice(input, opts = {}) {
  let pdfBytes;
  if (input.pdfBytes) {
    pdfBytes = input.pdfBytes;
  } else if (input.pdfPath) {
    if (extname(input.pdfPath).toLowerCase() !== '.pdf') {
      throw new ExtractorError(`Förväntade .pdf, fick: ${input.pdfPath}`);
    }
    pdfBytes = readFileSync(input.pdfPath);
  } else {
    throw new ExtractorError('Antingen pdfPath eller pdfBytes måste anges');
  }

  const pdfBase64 = pdfBytes.toString('base64');
  const client    = opts.client ?? getClient();

  const requestParams = {
    model:      MODEL,
    max_tokens: MAX_TOKENS,
    system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
    tools:      [EXTRACT_TOOL],
    tool_choice: { type: 'tool', name: 'extract_invoice' },
    messages: [
      {
        role: 'user',
        content: [
          {
            type:   'document',
            source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 },
          },
          {
            type: 'text',
            text: 'Extrahera alla kostnadsrader med semantisk klassificering via verktyget extract_invoice.',
          },
        ],
      },
    ],
  };

  let response;
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      response = await client.messages.create(requestParams);
      break;
    } catch (err) {
      const overloaded = err.status === 529;
      if (overloaded && attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, attempt * 1500));
        continue;
      }
      throw new ExtractorError(
        overloaded
          ? 'Tjänsten är tillfälligt överbelastad — försök igen om en stund.'
          : 'Analysen misslyckades — försök igen.',
        { cause: err }
      );
    }
  }

  const toolUseBlock = response.content.find(
    (b) => b.type === 'tool_use' && b.name === 'extract_invoice'
  );
  if (!toolUseBlock) {
    throw new ExtractorError(
      `Modellen returnerade inget verktygsanrop. stop_reason=${response.stop_reason}`
    );
  }

  const aggregated = aggregateLineItems(toolUseBlock.input);
  return { ...aggregated, usage: response.usage };
}
