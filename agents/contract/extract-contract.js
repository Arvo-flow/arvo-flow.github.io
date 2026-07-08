// agents/contract/extract-contract.js — läser DATUMFÄLTEN ur kundens individuella avtal (C1).
//
// Arkitekturen (avtalskorpus-sonden 2026-07-03): AI läser (tvåspalts-PDF:er förvanskar
// deterministisk textextraktion), koden ACCEPTERAR (lib/contract-intel acceptExtractedContract)
// och RÄKNAR (computeContractClock). Modellen får ALDRIG räkna datum framåt (regel 2) —
// den återger vad dokumentet SÄGER, med ordagrant källcitat per fält (regel 3, spot-checkbart).
//
// Schema-tvingad output (tool_choice forced) — samma mönster som fakturapipen (extract.js).
// Modellval: sonnet (samma klass som categorize) — fältläsning ur ett dokument, inte tolkning.

import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 1500;

let _client = null;
function getClient() {
  if (!_client) _client = new Anthropic();
  return _client;
}

export const CONTRACT_TOOL = {
  name: 'extract_contract',
  description: 'Strukturerade avtalsfält lästa ur dokumentet — ENDAST vad som uttryckligen står.',
  input_schema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      isContract:        { type: 'boolean', description: 'Är dokumentet ett avtal/orderbekräftelse (inte en faktura/broschyr)?' },
      supplier:          { type: ['string', 'null'], description: 'Leverantörens namn som det står i avtalet' },
      avtalsstart:       { type: ['string', 'null'], description: 'Avtalsstart/leveransdag som ISO-datum (YYYY-MM-DD). null om inget uttryckligt datum står.' },
      avtalstidMan:      { type: ['integer', 'null'], description: 'Initial avtalstid/bindningstid i HELA månader, exakt som dokumentet anger. null om ej angiven.' },
      uppsagningstidMan: { type: ['integer', 'null'], description: 'Uppsägningstid i hela MÅNADER om dokumentet anger månader, annars null. Konvertera ALDRIG från dagar.' },
      uppsagningstidDagar: { type: ['integer', 'null'], description: 'Uppsägningstid i DAGAR om dokumentet anger dagar (t.ex. "trettio (30) dagar"), annars null. Konvertera ALDRIG från månader. Exakt en av månads-/dagfälten sätts.' },
      forlangningMan:    { type: ['integer', 'null'], description: 'Automatisk förlängningsperiod i hela månader om uttryckligen angiven. 0 om avtalet uttryckligen löper ut utan förnyelse. null om ej angiven.' },
      citat: {
        type: 'object', additionalProperties: false,
        description: 'ORDAGRANNA korta citat ur dokumentet som belägger respektive fält (proveniens).',
        properties: {
          avtalsstart:         { type: ['string', 'null'] },
          avtalstidMan:        { type: ['string', 'null'] },
          uppsagningstidMan:   { type: ['string', 'null'] },
          uppsagningstidDagar: { type: ['string', 'null'] },
          forlangningMan:      { type: ['string', 'null'] },
        },
        required: ['avtalsstart', 'avtalstidMan', 'uppsagningstidMan', 'forlangningMan'],
      },
      confidence: { type: 'number', description: '0–1: hur säkert dokumentet bär fälten ovan' },
    },
    required: ['isContract', 'supplier', 'avtalsstart', 'avtalstidMan', 'uppsagningstidMan', 'forlangningMan', 'citat', 'confidence'],
  },
};

const SYSTEM_PROMPT = `Du läser svenska B2B-avtal och orderbekräftelser åt Arvo.

REGLER (absoluta):
- Återge ENDAST vad dokumentet uttryckligen säger. Fält som inte står uttryckligen = null.
- RÄKNA ALDRIG datum framåt eller bakåt. Står "avtalstid 24 månader från leveransdagen 2025-03-01"
  är avtalsstart 2025-03-01 och avtalstidMan 24 — du beräknar INTE slutdatumet.
- Svenska sifferord: "tre (3) månader" = 3. "tolv (12) månader" = 12. "trettio (30) dagar" = 30.
- Uppsägningstidens ENHET läses exakt: månader → uppsagningstidMan, dagar → uppsagningstidDagar.
  KONVERTERA ALDRIG mellan enheterna (30 dagar är INTE 1 månad). Exakt en av dem sätts, den andra null.
- Löper avtalet tills vidare UTAN initial bindningstid → avtalstidMan: null (hitta inte på en period).
  Rullande perioder ("löper i perioder om tre (3) månader") är avtalstidMan = periodlängden.
- Varje icke-null-fält MÅSTE bära ett ordagrant kort citat i citat-objektet.
- Är dokumentet inte ett avtal (faktura, broschyr, prislista) → isContract: false och alla fält null.`;

export class ContractExtractError extends Error {}

export async function extractContract({ pdfBase64 }, opts = {}) {
  if (!pdfBase64) throw new ContractExtractError('pdfBase64 krävs');
  const client = opts.client ?? getClient();

  const response = await client.messages.create({
    model:      MODEL,
    max_tokens: MAX_TOKENS,
    system:     [{ type: 'text', text: SYSTEM_PROMPT }],
    tools:      [CONTRACT_TOOL],
    tool_choice: { type: 'tool', name: 'extract_contract' },
    messages: [{
      role: 'user',
      content: [
        { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 } },
        { type: 'text', text: 'Läs ut avtalsfälten via verktyget extract_contract. Endast vad som uttryckligen står.' },
      ],
    }],
  });

  const block = response.content.find((b) => b.type === 'tool_use' && b.name === 'extract_contract');
  if (!block) throw new ContractExtractError('Modellen returnerade inget extract_contract-anrop');

  // Schemakravet (B2): döm AI-utfallet mot verktygets eget schema innan det når
  // acceptansgrinden. SKUGGA → armeras via SCHEMAKRAV_ENFORCE=1.
  const schemaVerdict = guardToolPayload({ agent: 'extract-contract', tool: CONTRACT_TOOL, payload: block.input });
  if (!schemaVerdict.ok) {
    throw new ContractExtractError('Avtalet kunde inte struktureras tillförlitligt — försök igen.');
  }

  return block.input;
}
