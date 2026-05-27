// agents/categorizer/categorize.js
// The Categorizer — Layer 2 worker that turns a raw Fortnox invoice into
// a structured classification.
//
// Model: claude-sonnet-4-6 — upgraded from Haiku 4.5 for better handling of
// edge cases where deterministicMatch() doesn't fire (unknown/regional suppliers).
// Caching: system prompt is sent with cache_control so the ~2k-token rules block
// is only paid for once per cache window.
// Output: structured via tool_use + tool_choice forcing the categorize tool.

import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT, CATEGORIZE_TOOL } from './prompt.js';
import { CATEGORIES } from './categories.js';

const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 512;

export class CategorizerError extends Error {
  constructor(message, { cause } = {}) {
    super(message);
    this.name = 'CategorizerError';
    if (cause) this.cause = cause;
  }
}

// Strong description signals that unambiguously identify a category.
// Keyed by category ID → array of lowercase substrings to scan for.
const STRONG_DESC_SIGNALS = {
  mobil:            ['mobilabonnemang', 'mobiltelefoni', 'telefonabonnemang', 'företagstelefoni', 'mobildata',
                     'sim-kort', 'sim kort', 'jobbmobil', 'företagsmobil', 'mobilplan'],
  serverhosting:    ['microsoft azure', 'azure förbrukning', 'aws ec2', 'amazon web services',
                     'google cloud platform', 'azure csp', 'compute instances', 'molnhosting',
                     'vps hosting', 'dedikerad server', 'cloud computing'],
  el:               ['elförbrukning', 'elavtal', 'elhandel', 'elcertifikat', 'spotpris timme', 'elenergi',
                     'spotpris el', 'elräkning', 'elkostnad', 'elabonnemang', 'spotprisavtal', 'strömkostnad',
                     'elförb', 'kwh', 'rörligt el'],
  bredband:         ['företagsfiber', 'bredbandsabonnemang', 'fiberabonnemang',
                     'företagsbredband', 'bredband fiber', 'bredband koaxial',
                     'fiber internet', 'fiberanslutning', 'stadsnät bredband',
                     'kabel-tv internet', 'fibertjänst'],
  kortterminal:     ['kortavgifter', 'transaktionsavgift', 'kortterminal', 'checkout', 'betalväxel', 'förmedlad volym', 'månadsavgift checkout'],
  'faktura-tjanst': ['fakturatjänst', 'e-faktura utskick', 'fakturautskick'],
  'leasing-bil':    ['leasing servicebilar', 'fordonsleasing', 'billeasing'],
  // managed-workplace MÅSTE ligga före saas-productivity — bundlade WaaS-paket
  // innehåller ofta "Microsoft 365" i beskrivningen men är INTE rena licens-fakturor.
  'managed-workplace': ['modern arbetsplats', 'workplace as a service', 'arbetsplats som tjänst',
                        'pc som tjänst', 'dator som tjänst', 'managed workplace',
                        'device as a service'],
  'saas-productivity': ['microsoft 365', 'office 365', 'm365 licens', 'google workspace business',
                        'zoom workplace', 'slack business', 'microsoft teams licens',
                        'programvarulicens microsoft', 'csp licens'],
  'saas-creative':     ['adobe creative cloud', 'creative cloud for teams', 'figma organization',
                        'canva for teams', 'adobe cc licens'],
  'saas-crm':          ['salesforce licens', 'hubspot licens', 'pipedrive prenumeration',
                        'zoho crm', 'dynamics 365 sales', 'crm-licens',
                        'crm licens', 'crm prenumeration', 'crm abonnemang'],
  'saas-finance':      ['bokföringsprogram licens', 'affärssystem licens', 'erp-licens',
                        'business central licens', 'björn lundén licens'],
  utrustningsleasing: ['laptop leasing', 'datorleasing', 'it-leasing', 'hårdvaruleasing',
                       'utrustningsleasing', 'it-utrustning leasing', 'laptops leasing',
                       'notebook leasing', 'datorer leasing', 'leasing it'],
  skrivarleasing:     ['skrivarhyra', 'kopiatorrhyra', 'multifunktionsskrivare', 'managed print',
                       'klickavgift', 'klickavtal', 'skrivarleasing', 'kopieringsavgift'],
  loneadmin:          ['löneadministration', 'löneprogram', 'lönesystem', 'lönekörning', 'löneutbetalning'],
  'larm-bevakning':   ['larmövervakning', 'larmabonnemang', 'säkerhetsövervakning', 'inbrottsalarm',
                       'brandlarm abonnemang', 'bevakningsavtal'],
  foretagshalsovard:  ['företagshälsovård', 'friskvårdsavtal', 'hälsovårdsavtal', 'arbetspsykolog',
                       'hälsoundersökning företag'],
  bankavgifter:       ['bankavgift', 'kontoavgift företag', 'bankpaket företag', 'betalningsförmedling'],
};

// Known office supply suppliers + description signals → kontorsmaterial.
const OFFICE_SUPPLY_SUPPLIER_SIGNALS = ['staples', 'lyreco', 'viking', 'papyrus', 'office depot', 'grossisten'];
const OFFICE_SUPPLY_DESC_SIGNALS = ['kopieringspapper', 'kontorsmaterial', 'papper a4', 'gevalia', 'nespresso', 'förbrukningsvaror', 'office supply'];

// Known cleaning suppliers + description signals → städ-rengöring.
const CLEANING_SUPPLIER_SIGNALS = ['hemfrid', 'servicemaster', 'sodexo', 'iss facility', 'städa.se'];
const CLEANING_DESC_SIGNALS = ['städtjänst', 'lokalvård', 'städabonnemang', 'kontorsstäd', 'fönsterputs', 'rengöringstjänst'];

// Known freight suppliers + description signals → transport-frakt.
const FREIGHT_SUPPLIER_SIGNALS = ['postnord', 'dhl', 'fedex', 'ups', 'bring', 'schenker', 'db schenker', 'tnt express'];
const FREIGHT_DESC_SIGNALS = ['fraktavgift', 'fraktkostnad', 'godsfrakt', 'paketfrakt', 'leveransavgift frakt'];

// IT support description signals → it-support.
const IT_SUPPORT_DESC_SIGNALS = ['it-support abonnemang', 'driftavtal it', 'managed services', 'nätverksövervakning', 'it-drift abonnemang'];

// Known SaaS accounting/ERP suppliers → faktura-tjanst.
const ACCOUNTING_SAAS_SUPPLIERS = ['fortnox', 'visma', 'pe accounting', 'speedledger', 'bokio'];

// SaaS supplier → sub-category mapping (checked in order, first match wins).
const SAAS_SUPPLIER_MAP = [
  { signals: ['adobe', 'figma', 'canva'],                                                   category: 'saas-creative'     },
  { signals: ['salesforce', 'hubspot', 'pipedrive', 'zoho crm', 'freshsales', 'crm'],       category: 'saas-crm'          },
  { signals: ['microsoft', 'google', 'zoom video', 'slack technologies',
              'dropbox', 'box.com', 'webex'],                                                category: 'saas-productivity' },
  { signals: ['atlassian', 'jira', 'confluence', 'trello', 'bitbucket'],                   category: 'saas-devtools'     },
];
const LICENSE_DESC_SIGNALS = ['licens', 'license', 'prenumeration', 'subscription', 'licenser', 'saas'];

// Known print/copier suppliers → skrivarleasing.
const PRINT_SUPPLIER_SIGNALS = ['konica minolta', 'ricoh', 'xerox', 'kyocera', 'officeprint', 'sharp document'];
const PRINT_DESC_SIGNALS = ['skrivare', 'kopiator', 'mfp', 'klickavgift', 'klickavtal', 'toner'];

// Known alarm/security suppliers → larm-bevakning.
const ALARM_SUPPLIER_SIGNALS = ['sector alarm', 'verisure', 'safemore', 'securitas', 'teleguard'];

// Known payroll suppliers → loneadmin.
const PAYROLL_SUPPLIER_SIGNALS = ['hogia', 'azets'];
const PAYROLL_DESC_SIGNALS = ['lönekörning', 'löneutbetalning', 'löneadministration'];

// Known occupational health suppliers → foretagshalsovard.
const HEALTH_SUPPLIER_SIGNALS = ['previa', 'feelgood', 'falck health', 'avonova'];

// Known banking suppliers → bankavgifter.
const BANK_SUPPLIER_SIGNALS = ['lunar business', 'qred'];
const BANK_DESC_SIGNALS = ['bankavgift', 'kontoavgift', 'bankpaket'];

// Known electricity supplier name fragments → el.
const ELECTRICITY_SUPPLIER_SIGNALS = [
  'elhandel', 'elenergi', 'elbolag', 'krafthandel', 'energihandel',
  'vattenfall', 'fortum', 'tibber', 'jämtkraft', 'bixia', 'mälarenergi',
];

// Telecom supplier keywords — when combined with any subscription signal → mobil.
const TELECOM_SUPPLIER_SIGNALS = ['telekom', 'telecom', 'tele2', 'telia', 'telenor', ' tre ', 'hi3g', 'comviq', 'halebop', 'vimla', 'globalcom', 'connectsverige'];
const SUBSCRIPTION_DESC_SIGNALS = ['abonnemang', 'abonnement', 'subscription', 'månadsavgift telefon', 'telefonitjänst'];

// Returns a result object if a strong deterministic match is found, otherwise null.
function deterministicMatch(invoice) {
  const desc = (invoice.description ?? '').toLowerCase();
  const supplier = (invoice.supplier ?? '').toLowerCase();
  const combined = `${desc} ${supplier}`;

  // Rule 1: explicit service description anywhere in combined text
  for (const [category, signals] of Object.entries(STRONG_DESC_SIGNALS)) {
    const hit = signals.find((s) => combined.includes(s));
    if (hit) {
      return {
        category,
        subType: '',
        normalizedSupplier: invoice.supplier ?? '',
        confidence: 0.92,
        reasoning: `Deterministisk matchning: "${hit}" hittades i fakturatexten`,
        licensePending: CATEGORIES[category]?.licensePending ?? false,
      };
    }
  }

  // Rule 1b: electricity supplier name → el (catches cases where description is generic)
  const isElectricitySupplier = ELECTRICITY_SUPPLIER_SIGNALS.some((s) => supplier.includes(s));
  if (isElectricitySupplier) {
    return {
      category: 'el',
      subType: 'spotpris',
      normalizedSupplier: invoice.supplier ?? '',
      confidence: 0.85,
      reasoning: `Deterministisk matchning: elleverantör identifierad i leverantörsnamnet`,
      licensePending: false,
    };
  }

  // Rule 2: telecom supplier + any subscription signal → mobil
  const isTelesupplier = TELECOM_SUPPLIER_SIGNALS.some((s) => supplier.includes(s));
  const isSubscription = SUBSCRIPTION_DESC_SIGNALS.some((s) => desc.includes(s));
  if (isTelesupplier && isSubscription) {
    return {
      category: 'mobil',
      subType: 'företag',
      normalizedSupplier: invoice.supplier ?? '',
      confidence: 0.88,
      reasoning: `Deterministisk matchning: telecomleverantör + abonnemangsbeskrivning`,
      licensePending: false,
    };
  }

  // Rule 3: known accounting SaaS supplier → faktura-tjanst
  const isAccountingSaas = ACCOUNTING_SAAS_SUPPLIERS.some((s) => supplier.includes(s));
  if (isAccountingSaas) {
    return {
      category: 'faktura-tjanst',
      subType: 'affärssystem',
      normalizedSupplier: invoice.supplier ?? '',
      confidence: 0.87,
      reasoning: `Deterministisk matchning: känd bokförings-SaaS-leverantör`,
      licensePending: false,
    };
  }

  // Rule 3b: known devtools supplier → saas-devtools (no license signal required).
  // Atlassian invoices rarely contain words like "licens/subscription" — the product
  // name alone is sufficient to classify with high confidence.
  const DEVTOOLS_SUPPLIERS = ['atlassian', 'jira', 'confluence', 'trello', 'bitbucket', 'github', 'gitlab'];
  const isDevtools = DEVTOOLS_SUPPLIERS.some((s) => combined.includes(s));
  if (isDevtools) {
    return {
      category: 'saas-devtools',
      subType: '',
      normalizedSupplier: invoice.supplier ?? '',
      confidence: 0.90,
      reasoning: `Deterministisk matchning: känd devtools-leverantör → saas-devtools`,
      licensePending: false,
    };
  }

  // Rule 3c: leasing supplier + IT hardware description → utrustningsleasing.
  // Runs before Rule 4 so "FinansPartner Leasing AB + laptops" doesn't fall into saas-other.
  const IT_HARDWARE_DESC = ['laptop', 'notebook', 'dator', 'hårdvara', 'surfplatta', 'it-utrustning', 'chromebook'];
  const isLeasingSupplier = supplier.includes('leasing') || supplier.includes('finans');
  const isItHardwareDesc  = IT_HARDWARE_DESC.some((s) => combined.includes(s));
  if (isLeasingSupplier && isItHardwareDesc) {
    return {
      category: 'utrustningsleasing',
      subType: '',
      normalizedSupplier: invoice.supplier ?? '',
      confidence: 0.88,
      reasoning: `Deterministisk matchning: leasingleverantör + IT-hårdvarubeskrivning`,
      licensePending: false,
    };
  }

  // Rule 4: known SaaS supplier + license signal → route to correct saas sub-category.
  // Unknown supplier with license signal → saas-other (manual review).
  const isLicenseDesc = LICENSE_DESC_SIGNALS.some((s) => desc.includes(s) || supplier.includes(s));
  if (isLicenseDesc) {
    const match = SAAS_SUPPLIER_MAP.find(({ signals }) => signals.some((s) => supplier.includes(s)));
    const category = match?.category ?? 'saas-other';
    return {
      category,
      subType: '',
      normalizedSupplier: invoice.supplier ?? '',
      confidence: match ? 0.88 : 0.78,
      reasoning: match
        ? `Deterministisk matchning: känd SaaS-leverantör → ${category}`
        : `Licens/prenumerationssignal utan känd leverantörsmatchning → saas-other (manuell granskning)`,
      licensePending: false,
    };
  }

  // Rule 5: known print/copier supplier + printer description → skrivarleasing
  const isPrintSupplier = PRINT_SUPPLIER_SIGNALS.some((s) => supplier.includes(s));
  const isPrintDesc = PRINT_DESC_SIGNALS.some((s) => combined.includes(s));
  if (isPrintSupplier || (isPrintDesc && combined.includes('hyra'))) {
    return {
      category: 'skrivarleasing',
      subType: '',
      normalizedSupplier: invoice.supplier ?? '',
      confidence: 0.88,
      reasoning: `Deterministisk matchning: känd skrivar-/kopiatortillverkare eller skrivarhyra i fakturatexten`,
      licensePending: false,
    };
  }

  // Rule 6: known alarm supplier → larm-bevakning
  const isAlarmSupplier = ALARM_SUPPLIER_SIGNALS.some((s) => supplier.includes(s));
  if (isAlarmSupplier) {
    return {
      category: 'larm-bevakning',
      subType: '',
      normalizedSupplier: invoice.supplier ?? '',
      confidence: 0.90,
      reasoning: `Deterministisk matchning: känd larm-/bevakningsleverantör`,
      licensePending: false,
    };
  }

  // Rule 7: known payroll supplier + payroll description → loneadmin
  const isPayrollSupplier = PAYROLL_SUPPLIER_SIGNALS.some((s) => supplier.includes(s));
  const isPayrollDesc = PAYROLL_DESC_SIGNALS.some((s) => desc.includes(s));
  if (isPayrollSupplier || isPayrollDesc) {
    return {
      category: 'loneadmin',
      subType: '',
      normalizedSupplier: invoice.supplier ?? '',
      confidence: 0.88,
      reasoning: `Deterministisk matchning: känd löneadministrationsleverantör eller lönebeskrivning`,
      licensePending: false,
    };
  }

  // Rule 8: known occupational health supplier → foretagshalsovard
  const isHealthSupplier = HEALTH_SUPPLIER_SIGNALS.some((s) => supplier.includes(s));
  if (isHealthSupplier) {
    return {
      category: 'foretagshalsovard',
      subType: '',
      normalizedSupplier: invoice.supplier ?? '',
      confidence: 0.91,
      reasoning: `Deterministisk matchning: känd företagshälsovårdsleverantör`,
      licensePending: false,
    };
  }

  // Rule 9: known bank supplier + bank description → bankavgifter
  const isBankSupplier = BANK_SUPPLIER_SIGNALS.some((s) => supplier.includes(s));
  const isBankDesc = BANK_DESC_SIGNALS.some((s) => combined.includes(s));
  if (isBankSupplier || isBankDesc) {
    return {
      category: 'bankavgifter',
      subType: '',
      normalizedSupplier: invoice.supplier ?? '',
      confidence: 0.87,
      reasoning: `Deterministisk matchning: bankavgift/kontoavgift identifierad`,
      licensePending: false,
    };
  }

  // Rule 10: known office supply supplier OR office supply description → kontorsmaterial
  const isOfficeSupplier = OFFICE_SUPPLY_SUPPLIER_SIGNALS.some((s) => supplier.includes(s));
  const isOfficeDesc = OFFICE_SUPPLY_DESC_SIGNALS.some((s) => combined.includes(s));
  if (isOfficeSupplier || isOfficeDesc) {
    const subType = combined.includes('kaffe') || combined.includes('gevalia') || combined.includes('nespresso')
      ? 'kaffe-fika' : 'förbrukningsvaror';
    return {
      category: 'kontorsmaterial',
      subType,
      normalizedSupplier: invoice.supplier ?? '',
      confidence: isOfficeSupplier && isOfficeDesc ? 0.92 : 0.85,
      reasoning: `Deterministisk matchning: kontorsmaterial/förbrukningsvaror identifierad`,
      licensePending: false,
    };
  }

  // Rule 11: known cleaning supplier OR cleaning description → städ-rengöring
  const isCleaningSupplier = CLEANING_SUPPLIER_SIGNALS.some((s) => supplier.includes(s));
  const isCleaningDesc = CLEANING_DESC_SIGNALS.some((s) => combined.includes(s));
  if (isCleaningSupplier || isCleaningDesc) {
    return {
      category: 'städ-rengöring',
      subType: '',
      normalizedSupplier: invoice.supplier ?? '',
      confidence: isCleaningSupplier ? 0.92 : 0.87,
      reasoning: `Deterministisk matchning: städ/rengöringstjänst identifierad`,
      licensePending: false,
    };
  }

  // Rule 12: known freight supplier OR freight description → transport-frakt
  const isFreightSupplier = FREIGHT_SUPPLIER_SIGNALS.some((s) => supplier.includes(s));
  const isFreightDesc = FREIGHT_DESC_SIGNALS.some((s) => combined.includes(s));
  if (isFreightSupplier || isFreightDesc) {
    return {
      category: 'transport-frakt',
      subType: '',
      normalizedSupplier: invoice.supplier ?? '',
      confidence: isFreightSupplier ? 0.93 : 0.85,
      reasoning: `Deterministisk matchning: transport/fraktleverantör identifierad`,
      licensePending: false,
    };
  }

  // Rule 13: IT support description → it-support
  const isItSupportDesc = IT_SUPPORT_DESC_SIGNALS.some((s) => combined.includes(s));
  if (isItSupportDesc) {
    return {
      category: 'it-support',
      subType: '',
      normalizedSupplier: invoice.supplier ?? '',
      confidence: 0.87,
      reasoning: `Deterministisk matchning: IT-drift/supporttjänst identifierad`,
      licensePending: false,
    };
  }

  return null;
}

function formatInvoice(invoice) {
  const lines = [
    'Klassificera denna leverantörsfaktura:',
    '',
    `Leverantör: ${invoice.supplier ?? '(saknas)'}`,
    `Belopp: ${invoice.amount != null ? `${invoice.amount} kr` : '(saknas)'}`,
    `Datum: ${invoice.date ?? '(saknas)'}`,
    `Konto: ${invoice.account ?? '(saknas)'}`,
    `Beskrivning: ${invoice.description ?? '(saknas)'}`,
  ];
  if (invoice.recurring != null) {
    lines.push(`Återkommande: ${invoice.recurring ? 'Ja' : 'Nej'}`);
  }
  return lines.join('\n');
}

let _client;
function getClient() {
  if (_client) return _client;
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new CategorizerError(
      'ANTHROPIC_API_KEY saknas i miljön. Sätt den i .env eller exportera variabeln.'
    );
  }
  _client = new Anthropic();
  return _client;
}

/**
 * Categorize a single invoice.
 *
 * @param {object} invoice
 * @param {string} invoice.supplier           - Raw supplier name from Fortnox
 * @param {number} [invoice.amount]           - Belopp i SEK (utan moms)
 * @param {string} [invoice.date]             - YYYY-MM-DD
 * @param {string} [invoice.account]          - Bokföringskonto, t.ex. "5310"
 * @param {string} [invoice.description]      - Fritextbeskrivning från fakturan
 * @param {boolean} [invoice.recurring]       - True om månatlig/återkommande
 * @param {object} [opts]
 * @param {Anthropic} [opts.client]           - Anthropic-klient att återanvända
 * @returns {Promise<{
 *   category: string,
 *   subType?: string,
 *   normalizedSupplier: string,
 *   confidence: number,
 *   reasoning: string,
 *   licensePending: boolean,
 *   usage: object,
 *   raw: object,
 * }>}
 */
export async function categorize(invoice, opts = {}) {
  if (!invoice || typeof invoice !== 'object') {
    throw new CategorizerError('invoice måste vara ett objekt');
  }
  if (!invoice.supplier) {
    throw new CategorizerError('invoice.supplier är obligatorisk');
  }

  // For mixed-category invoices, use the highest-cost recurring line item's
  // description as the primary signal — not the aggregated invoice description.
  // This ensures a bredband-heavy invoice isn't mis-categorized as mobil just
  // because a mobile line happens to appear first in the description.
  let effectiveInvoice = invoice;
  if (invoice.potentialMixedCategories && Array.isArray(invoice.lineItems) && invoice.lineItems.length > 0) {
    const dominant = invoice.lineItems
      .filter((l) => l.type === 'recurring_subscription')
      .sort((a, b) => b.amount - a.amount)[0];
    if (dominant) {
      effectiveInvoice = { ...invoice, description: dominant.description, amount: dominant.amount };
    }
  }

  // Short-circuit for unambiguous cases — avoids AI non-determinism on clear signals.
  const fast = deterministicMatch(effectiveInvoice);
  if (fast) {
    return {
      ...fast,
      usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
      raw: fast,
    };
  }

  const client = opts.client ?? getClient();

  let response;
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      response = await client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: [
          {
            type: 'text',
            text: SYSTEM_PROMPT,
            cache_control: { type: 'ephemeral' },
          },
        ],
        tools: [CATEGORIZE_TOOL],
        tool_choice: { type: 'tool', name: 'categorize' },
        messages: [{ role: 'user', content: formatInvoice(effectiveInvoice) }],
      });
      break;
    } catch (err) {
      const overloaded = err instanceof Anthropic.APIError && err.status === 529;
      if (overloaded && attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, attempt * 1500));
        continue;
      }
      if (err instanceof Anthropic.RateLimitError) {
        throw new CategorizerError('Rate limit hit — backa av och försök igen', {
          cause: err,
        });
      }
      if (overloaded) {
        throw new CategorizerError(
          'Tjänsten är tillfälligt överbelastad — försök igen om en stund',
          { cause: err }
        );
      }
      if (err instanceof Anthropic.APIError) {
        throw new CategorizerError(
          `Anthropic API fel ${err.status}: ${err.message}`,
          { cause: err }
        );
      }
      throw err;
    }
  }

  const toolUse = response.content.find((b) => b.type === 'tool_use');
  if (!toolUse) {
    throw new CategorizerError(
      'Inget tool_use-block i svaret — modellen avvek från instruktionerna'
    );
  }

  const result = toolUse.input;
  const categoryDef = CATEGORIES[result.category];
  if (!categoryDef) {
    throw new CategorizerError(
      `Modellen returnerade okänd kategori: "${result.category}"`
    );
  }

  return {
    category: result.category,
    subType: result.subType ?? '',
    normalizedSupplier: result.normalizedSupplier,
    confidence: result.confidence,
    reasoning: result.reasoning,
    licensePending: categoryDef.licensePending,
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
 * Batch-categorize. Sequential med rate-limit-respekt; kör inte tusentals parallellt.
 * För större volymer: använd Anthropic Message Batches API (50 % rabatt).
 */
export async function categorizeBatch(invoices, opts = {}) {
  const client = opts.client ?? getClient();
  const concurrency = opts.concurrency ?? 4;
  const results = new Array(invoices.length);

  let cursor = 0;
  async function worker() {
    while (cursor < invoices.length) {
      const i = cursor++;
      try {
        results[i] = await categorize(invoices[i], { client });
      } catch (err) {
        results[i] = { error: err.message, invoice: invoices[i] };
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, invoices.length) }, worker)
  );
  return results;
}

export { MODEL };
