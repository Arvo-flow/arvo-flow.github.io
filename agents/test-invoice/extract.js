// agents/test-invoice/extract.js
// PDF → strukturerad fakturadata via Claude Opus 4.7 (native PDF-support).
// Output-formen matchar exakt vad categorize.js förväntar sig som input.
//
// Model: claude-opus-4-7 — verbatim per claude-api skill.
// Caching: system prompt har cache_control (no-op tills den växer förbi 4096 tokens).
// Output: tool_use + tool_choice för deterministisk strukturerad output.

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'node:fs';
import { extname } from 'node:path';

const MODEL = 'claude-opus-4-7';
const MAX_TOKENS = 1024;

export class ExtractorError extends Error {
  constructor(message, { cause } = {}) {
    super(message);
    this.name = 'ExtractorError';
    if (cause) this.cause = cause;
  }
}

const SYSTEM_PROMPT = `Du är en datauttagsexpert för svenska leverantörsfakturor.

Din enda uppgift är att läsa en PDF-faktura och extrahera följande fält som strukturerad data via verktyget "extract_invoice":

- **supplier**: Leverantörens fullständiga registrerade namn såsom det står på fakturan (t.ex. "Vattenfall Företag AB", "Telia Sverige AB"). Inkludera bolagsformen om den finns.
- **amount**: Det totala beloppet EXKLUSIVE moms i SEK. Heltal. Om bara totalt belopp inkl. moms anges, räkna baklänges från 25 % moms (totalt / 1.25 = belopp ex. moms).
- **date**: Fakturadatum i ISO-format YYYY-MM-DD.
- **account**: Bokföringskontot om det syns på fakturan eller framgår av kategorin (t.ex. "5310" för el, "6310" för försäkring). Lämna null om osäker.
- **description**: En kort fritextbeskrivning som sammanfattar vad fakturan avser (t.ex. "Elförbrukning mars 2025 - anl.nr 735999", "Företagsförsäkring årspremie").
- **recurring**: true om det är en månads-/årsfaktura som tydligt återkommer (abonnemang, premie, hyra), false om det är en engångsfaktura.
- **recurringAmount**: Summan ENBART av de återkommande raderna (abonnemang, hyra, fasta månadsavgifter) exkl. moms. Uteslut engångsavgifter, rörliga förbruknings- och trafikavgifter (t.ex. roaming, övertrafik, leveransavgifter). Heltal.
- **variableCharges**: Summan av alla ICKE-återkommande rader exkl. moms (t.ex. roaming utanför EU, övertrafik, engångsavgifter, utlägg). 0 om inga sådana rader finns. Heltal.
- **annualCost**: Basera ALLTID på recurringAmount, aldrig på amount. Månadsfaktura: recurringAmount × 12. Kvartalsfaktura: recurringAmount × 4. Årsfaktura: recurringAmount. Okänt mönster: recurringAmount.

KRITISKT:
- Belopp ska vara EXKLUSIVE moms (svensk standard för B2B-bokföring).
- annualCost ska ALDRIG inkludera variableCharges — rörliga avgifter är inte strukturella kostnader.
- Roaming, övertrafik och liknande trafikavgifter är alltid variableCharges, aldrig recurring.
- Fakturaavgifter räknas som återkommande (ingår i recurringAmount) om de syns varje månad.
- Returnera ALDRIG text utöver verktygsanropet — extract_invoice är obligatoriskt.
- Om du verkligen inte kan utläsa ett fält, returnera null för det fältet (men supplier och amount är obligatoriska).`;

const EXTRACT_TOOL = {
  name: 'extract_invoice',
  description: 'Extrahera strukturerad data från en svensk leverantörsfaktura.',
  input_schema: {
    type: 'object',
    properties: {
      supplier: {
        type: 'string',
        description: 'Leverantörens fullständiga registrerade namn',
      },
      amount: {
        type: 'integer',
        description: 'Totalt belopp exkl. moms i SEK, heltal',
      },
      date: {
        type: 'string',
        description: 'Fakturadatum i ISO-format YYYY-MM-DD',
      },
      account: {
        type: ['string', 'null'],
        description: 'Bokföringskonto, t.ex. "5310" — null om osäker',
      },
      description: {
        type: 'string',
        description: 'Kort fritextbeskrivning av vad fakturan avser',
      },
      recurring: {
        type: 'boolean',
        description: 'true om återkommande abonnemang/premie, false annars',
      },
      recurringAmount: {
        type: 'integer',
        description: 'Summan av enbart återkommande rader exkl. moms — uteslut roaming, övertrafik, engångsavgifter',
      },
      variableCharges: {
        type: 'integer',
        description: 'Summan av icke-återkommande rader exkl. moms (roaming, övertrafik, engångsavgifter). 0 om inga.',
      },
      annualCost: {
        type: 'integer',
        description: 'Årskostnad i SEK baserad på recurringAmount: månad × 12, kvartal × 4, år × 1',
      },
      confidence: {
        type: 'number',
        description: 'Hur säker du är på extraktionen (0.0–1.0)',
      },
      notes: {
        type: ['string', 'null'],
        description: 'Varningar, noteringar om variableCharges eller antaganden (t.ex. "Roaming 1 245 kr exkluderad från annualCost")',
      },
    },
    required: ['supplier', 'amount', 'date', 'description', 'recurring', 'recurringAmount', 'variableCharges', 'annualCost', 'confidence'],
  },
};

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
 * Extrahera strukturerad fakturadata från en PDF.
 *
 * @param {object} input
 * @param {string} [input.pdfPath]           - Sökväg till PDF-fil
 * @param {Buffer} [input.pdfBytes]          - Eller PDF som Buffer direkt
 * @param {object} [opts]
 * @param {Anthropic} [opts.client]
 * @returns {Promise<{
 *   supplier: string,
 *   amount: number,
 *   date: string,
 *   account: string|null,
 *   description: string,
 *   recurring: boolean,
 *   recurringAmount: number,
 *   variableCharges: number,
 *   annualCost: number,
 *   confidence: number,
 *   notes: string|null,
 *   usage: object,
 * }>}
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
  const client = opts.client ?? getClient();

  const requestParams = {
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
    tools: [EXTRACT_TOOL],
    tool_choice: { type: 'tool', name: 'extract_invoice' },
    messages: [
      {
        role: 'user',
        content: [
          { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 } },
          { type: 'text', text: 'Extrahera fakturadatan via verktyget extract_invoice.' },
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
        overloaded ? 'Tjänsten är tillfälligt överbelastad — försök igen om en stund.' : 'Analysen misslyckades — försök igen.',
        { cause: err }
      );
    }
  }

  const toolUseBlock = response.content.find((b) => b.type === 'tool_use' && b.name === 'extract_invoice');
  if (!toolUseBlock) {
    throw new ExtractorError(
      `Modellen returnerade inget verktygsanrop. stop_reason=${response.stop_reason}`
    );
  }

  return {
    ...toolUseBlock.input,
    usage: response.usage,
  };
}
