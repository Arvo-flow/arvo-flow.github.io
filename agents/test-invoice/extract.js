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

variable_usage
  Rörliga kostnader som varierar med faktisk förbrukning. ENBART för mobiltelefoni.
  Exempel: roaming utanför EU, övertrafik, extra datapåslag, SMS-paket utanför plan.
  OBS: Klickkostnader för skrivare är INTE variable_usage — klassificera dem som recurring_subscription.

one_time_fee
  Engångskostnader som inte återkommer regelbundet.
  Exempel: installationsavgift, uppstartsavgift, aktiveringsavgift,
  påminnelseavgift, konsultarvode, reparation.

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
  Fakturan kan fortfarande extraheras men flaggas.

KRITISKT:
  — Alla belopp EXKLUSIVE moms (svensk B2B-standard). Om bara ink. moms: dividera med 1.25.
  — Returnera VARJE synlig kostnadsrad — utelämna inga rader.
  — seatCount: summera ALLA licensrader oavsett tier (t.ex. 45 Premium + 12 Basic = 57).
    Sätt null om fakturan inte avser per-användarlicenser.
  — Returnera ALDRIG text utanför verktygsanropet.`;

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
      account: {
        type: ['string', 'null'],
        description: 'Bokföringskonto om det framgår, t.ex. "5310". null om osäker.',
      },
    },
    required: [
      'supplier', 'date', 'description', 'billingPeriod',
      'lineItems', 'confidenceScore', 'outOfScope',
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

  return {
    supplier:        raw.supplier,
    date:            raw.date,
    description:     raw.description,
    account:         raw.account ?? null,
    billingPeriod:   raw.billingPeriod,
    lineItems:       raw.lineItems ?? [],
    amount:          (raw.lineItems ?? []).reduce((s, l) => s + l.amount, 0),
    recurringAmount,
    variableCharges,
    oneTimeFees,
    annualCost:      recurringAmount * multiplier,
    recurring:       recurringAmount > 0,
    confidenceScore: raw.confidenceScore,
    confidenceNotes: raw.confidenceNotes ?? null,
    outOfScope:      raw.outOfScope ?? false,
    seatCount:       raw.seatCount ?? null,
    notes:           raw.confidenceNotes ?? null,
  };
}

/**
 * Triagera extraktionsresultatet.
 * Returnerar route: 'auto' | 'review_queue' | 'unsupported'
 */
export function routeExtraction(extracted) {
  if (extracted.outOfScope) {
    return { route: 'unsupported' };
  }
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
