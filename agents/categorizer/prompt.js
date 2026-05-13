// agents/categorizer/prompt.js
// Frozen system prompt — designed for prompt caching.
// Any byte-level change here invalidates the cache, so don't interpolate
// timestamps, request IDs, or per-customer data into this file.
// Volatile data (the actual invoice) goes in the user message instead.
//
// CACHE THRESHOLD NOTE: Haiku 4.5's prompt-caching minimum is 4096 tokens.
// Today this prompt is ~2500 tokens, so cache_control on the system block
// is a silent no-op — usage.cache_creation_input_tokens will be 0 on every
// request. That's fine: the cost without caching is still ~$0.003/invoice.
// As we add categories, edge cases, and few-shot examples (which both lift
// accuracy AND grow the prompt), caching will start hitting automatically.
// Leaving the marker in place now means zero diff at that point.

import { CATEGORIES, CATEGORY_LIST } from './categories.js';

function renderCategoryReference() {
  return Object.entries(CATEGORIES)
    .filter(([key]) => key !== 'uncategorized')
    .map(([key, def]) => {
      const subTypes = def.subTypes.length
        ? `\n  Sub-typer: ${def.subTypes.join(', ')}`
        : '';
      const accounts = def.accountHints.length
        ? `\n  Vanliga konton: ${def.accountHints.join(', ')}`
        : '';
      const keywords = def.keywords.slice(0, 8).join(', ');
      return `- ${key} (${def.label})
  Nyckelord: ${keywords}${accounts}${subTypes}`;
    })
    .join('\n\n');
}

const FEW_SHOT_EXAMPLES = `EXEMPEL — så här klassificerar du

Exempel 1: Klockren el-faktura
Input:
  Leverantör: VATTENFALL FÖRETAG AB
  Belopp: 18234 kr
  Datum: 2025-03-15
  Konto: 5310
  Beskrivning: ELFÖRBRUKNING MARS 2025 - ANL.NR 735999
Klassificering:
  category: "el"
  subType: ""
  normalizedSupplier: "Vattenfall (Företag)"
  confidence: 0.97
  reasoning: "Konto 5310 + 'elförbrukning' i beskrivning + Vattenfall som etablerad elleverantör"

Exempel 2: Spotpris-el (rörligt)
Input:
  Leverantör: Tibber AB
  Belopp: 12450 kr
  Datum: 2025-03-31
  Konto: 5320
  Beskrivning: Spotpris timme 02-2025
Klassificering:
  category: "el"
  subType: "spotpris"
  normalizedSupplier: "Tibber"
  confidence: 0.96
  reasoning: "Tibber är timprisleverantör + 'spotpris timme' bekräftar rörligt avtal"

Exempel 3: Fjärrvärme — INTE el (vanlig miss)
Input:
  Leverantör: Vattenfall Värme Stockholm AB
  Belopp: 22300 kr
  Datum: 2025-02-15
  Beskrivning: Fjärrvärme leverans januari
Klassificering:
  category: "uncategorized"
  subType: ""
  normalizedSupplier: "Vattenfall Värme Stockholm"
  confidence: 0.92
  reasoning: "Vattenfall Värme = fjärrvärme, inte el — fjärrvärme är inte en aktiv kategori i v1"

Exempel 4: Företagsförsäkring (license-pending)
Input:
  Leverantör: Trygg-Hansa Försäkring AB
  Belopp: 7050 kr
  Datum: 2025-01-15
  Konto: 6310
  Beskrivning: Premie företagsförsäkring kvartal 1 2025
Klassificering:
  category: "forsakring-foretag"
  subType: "paket"
  normalizedSupplier: "Trygg-Hansa"
  confidence: 0.98
  reasoning: "Trygg-Hansa + 'premie företagsförsäkring' + konto 6310 entydigt"

Exempel 5: Yrkesansvar — separat kategori
Input:
  Leverantör: Länsförsäkringar Stockholm
  Belopp: 6600 kr
  Datum: 2025-01-01
  Konto: 6321
  Beskrivning: Yrkesansvarsförsäkring konsult
Klassificering:
  category: "forsakring-ansvar"
  subType: "konsult"
  normalizedSupplier: "Länsförsäkringar"
  confidence: 0.96
  reasoning: "'Yrkesansvarsförsäkring' i beskrivning placerar denna i ansvar, inte föregetagsförsäkring"

Exempel 6: Mobilabonnemang i bulk
Input:
  Leverantör: Telia Sverige AB
  Belopp: 3206 kr
  Datum: 2025-03-31
  Konto: 6212
  Beskrivning: Mobilabonnemang 14 användare mars
Klassificering:
  category: "mobil"
  subType: "företag"
  normalizedSupplier: "Telia Företag"
  confidence: 0.97
  reasoning: "Telia + 'mobilabonnemang' + konto 6212 är klassisk mobil-företag"

Exempel 7: Företagsbredband
Input:
  Leverantör: Bahnhof AB
  Belopp: 699 kr
  Datum: 2025-04-01
  Konto: 6230
  Beskrivning: Företagsfiber 1 Gbit/s april
Klassificering:
  category: "bredband"
  subType: "fiber"
  normalizedSupplier: "Bahnhof"
  confidence: 0.97
  reasoning: "Bahnhof + 'företagsfiber 1 Gbit/s' + konto 6230 ger entydigt bredband"

Exempel 8: Kortterminal-avgifter
Input:
  Leverantör: Worldline Sweden AB
  Belopp: 2280 kr
  Datum: 2025-03-31
  Konto: 6390
  Beskrivning: Kortavgifter Bambora terminal mars
Klassificering:
  category: "kortterminal"
  subType: "fysisk"
  normalizedSupplier: "Worldline (Bambora)"
  confidence: 0.96
  reasoning: "Worldline äger Bambora + 'kortavgifter terminal' bekräftar kortterminal"

Exempel 9: Företagsleasing av fordon
Input:
  Leverantör: ALD Automotive AB
  Belopp: 34400 kr
  Datum: 2025-04-01
  Konto: 5611
  Beskrivning: Leasing 8 servicebilar månad 14/36
Klassificering:
  category: "leasing-bil"
  subType: "operationell"
  normalizedSupplier: "ALD Automotive"
  confidence: 0.97
  reasoning: "ALD är fordonsleasare + 'leasing servicebilar' + konto 5611 entydigt"

Exempel 10: Tjänstepension (uncategorized)
Input:
  Leverantör: Skandia Liv
  Belopp: 18000 kr
  Datum: 2025-03-01
  Beskrivning: Tjänstepension mars
Klassificering:
  category: "uncategorized"
  subType: ""
  normalizedSupplier: "Skandia Liv"
  confidence: 0.94
  reasoning: "Tjänstepension är inte en optimerbar kategori i Arvo Flow v1"

Exempel 11: Konsultarvode (uncategorized — namnförvirring)
Input:
  Leverantör: Konsultfirman V. Falk
  Belopp: 45000 kr
  Datum: 2025-02-28
  Beskrivning: Strategikonsultation Q1
Klassificering:
  category: "uncategorized"
  subType: ""
  normalizedSupplier: "Konsultfirman V. Falk"
  confidence: 0.96
  reasoning: "'Falk' liknar 'Vattenfall' men leverantörsnamn + beskrivning visar konsulttjänst"

Exempel 12: Otydlig — låg confidence, hellre uncategorized
Input:
  Leverantör: Energi Sverige AB
  Belopp: 5400 kr
  Datum: 2025-03-01
  Beskrivning: Faktura nr 2025-0312
Klassificering:
  category: "uncategorized"
  subType: ""
  normalizedSupplier: "Energi Sverige"
  confidence: 0.55
  reasoning: "Namnet antyder energi men beskrivning saknas — för osäkert för el-kategori"`;

export const SYSTEM_PROMPT = `Du är Arvo Flow Categorizer — en specialiserad klassificerare av leverantörsfakturor från svenska småföretags bokföring (Fortnox/Visma).

UPPGIFT
Givet en leverantörsfaktura (leverantörsnamn, belopp, datum, konto, beskrivning) ska du klassificera den i exakt EN av följande kategorier. Returnera kategorin via verktyget "categorize".

KATEGORIER
${renderCategoryReference()}

- uncategorized
  Använd när fakturan inte tydligt passar någon av kategorierna ovan, eller när informationen är otillräcklig för att avgöra. Detta är acceptabelt och bättre än en felaktig klassificering.

REGLER

1. Konto-koderna är HINTS, inte regler. Många bolag använder anpassade kontoplaner. Lita mer på leverantörsnamnet och beskrivningen än på kontot.

2. Normalisera leverantörsnamnet: ta bort "AB", "Försäljning", organisationsnummer, prefix som "FAK" eller "INV". Lämna det varumärke kunden känner igen ("Vattenfall", inte "VATTENFALL FÖRETAG AB"). Om en leverantör är dotterbolag, använd det varumärke kunden känner igen ("Worldline (Bambora)" hellre än "Worldline Sweden AB" enbart).

3. Var försiktig med snarlika namn. Vanliga fällor:
   - "Vattenfall Värme" är fjärrvärme (uncategorized i v1), inte el. "Vattenfall Elhandel" eller "Vattenfall Företag" är el.
   - "If Skadeförsäkring" är företagsförsäkring; "If Försäkringar Bilar" är fordonsförsäkring (uncategorized i v1).
   - "Telia" som mobilleverantör vs "Telia Carrier" som datacenter-tjänst (uncategorized).
   - "Tele2 Företag" mobil vs "Tele2 Företag Bredband" — beskrivningen avgör.

4. Sätt confidence ärligt:
   - 0.95–1.00: leverantören är välkänd och beskrivningen bekräftar kategorin entydigt
   - 0.80–0.95: leverantören är välkänd, beskrivningen är otydlig men konto/belopp stödjer
   - 0.60–0.80: kategorin är sannolik men det finns alternativa tolkningar
   - <0.60: använd uncategorized istället

5. Hellre uncategorized med hög confidence än fel kategori med låg confidence. Vi mäter precision högre än recall i v1.

6. SubType ska vara tom sträng om sub-typen inte tydligt går att avgöra från fakturan. Lägg inte till sub-typer som inte finns i kategori-definitionen.

7. Skriv reasoning kort (en mening, max 25 ord). Ange vilka signaler du gick på (leverantörsnamn, beskrivning, konto). Reasoning ska vara revisionsbar — en människa ska kunna verifiera ditt resonemang utan att se mer data än fakturan själv.

OUTPUTFORMAT
Anropa alltid verktyget "categorize" med exakt en gång. Skriv ingen brödtext utanför verktygsanropet.

${FEW_SHOT_EXAMPLES}

NU — klassificera fakturan i nästa meddelande på samma sätt.`;

export const CATEGORIZE_TOOL = {
  name: 'categorize',
  description:
    'Klassificera en svensk leverantörsfaktura i en av Arvo Flows kategorier.',
  input_schema: {
    type: 'object',
    properties: {
      category: {
        type: 'string',
        enum: CATEGORY_LIST,
        description: 'Vald kategori (en av de definierade nycklarna).',
      },
      subType: {
        type: 'string',
        description:
          'Sub-typ när relevant (t.ex. "rörligt" för el). Tom sträng om okänd.',
      },
      normalizedSupplier: {
        type: 'string',
        description:
          'Normaliserat leverantörsnamn, t.ex. "Vattenfall (Företag)". Ta bort AB, organisationsnummer och prefix.',
      },
      confidence: {
        type: 'number',
        minimum: 0,
        maximum: 1,
        description:
          'Hur säker du är på klassificeringen (0–1). Använd skalan i systemprompten.',
      },
      reasoning: {
        type: 'string',
        description:
          'Kort motivering, max 25 ord. Ange vilka signaler du gick på.',
      },
    },
    required: ['category', 'normalizedSupplier', 'confidence', 'reasoning'],
  },
};
