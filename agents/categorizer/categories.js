// agents/categorizer/categories.js
// Leverantörskategorier som Arvo Flow kan optimera.
// Försäkring är "license-pending" — kategoriseras men byts inte förrän FI-licensen är klar.

export const CATEGORIES = {
  el: {
    label: 'Elavtal',
    licensePending: false,
    subTypes: ['rörligt', 'fast', 'mixat', 'spotpris'],
    keywords: [
      'el', 'elavtal', 'elförbrukning', 'spotpris', 'kWh',
      'vattenfall', 'fortum', 'eon', 'tibber', 'jämtkraft', 'bixia', 'mälarenergi',
      'elnät', 'elhandel', 'elcertifikat',
    ],
    accountHints: ['5310', '5311', '5320'],
  },
  'forsakring-foretag': {
    label: 'Företagsförsäkring',
    licensePending: true,
    subTypes: ['egendom', 'avbrott', 'ansvar', 'cyber', 'paket'],
    keywords: [
      'företagsförsäkring', 'egendomsförsäkring', 'avbrottsförsäkring',
      'trygg-hansa', 'if skadeförsäkring', 'länsförsäkringar', 'folksam',
      'gjensidige', 'moderna försäkringar', 'svedea', 'skandia',
    ],
    accountHints: ['6310', '6320'],
  },
  'forsakring-ansvar': {
    label: 'Yrkesansvarsförsäkring',
    licensePending: true,
    subTypes: ['konsult', 'hantverkare', 'styrelse'],
    keywords: [
      'yrkesansvar', 'ansvarsförsäkring', 'konsultansvar',
      'styrelseansvar', 'directors and officers',
    ],
    accountHints: ['6310', '6321'],
  },
  mobil: {
    label: 'Mobilabonnemang',
    licensePending: false,
    subTypes: ['anställd', 'företag', 'data'],
    keywords: [
      'mobil', 'mobilabonnemang', 'telefoni', 'telia', 'tele2', 'telenor',
      'tre', 'halebop', 'vimla', 'comviq', 'telekom', 'telecom', 'b2b mobil',
    ],
    accountHints: ['6210', '6212'],
  },
  bredband: {
    label: 'Företagsbredband',
    licensePending: false,
    subTypes: ['fiber', 'mobilt', 'adsl'],
    keywords: [
      'bredband', 'fiber', 'internet', 'bahnhof', 'tele2 företag',
      'telenor business', 'glocalnet', 'a3', 'comhem', 'tele2 bredband',
    ],
    accountHints: ['6230', '6231'],
  },
  kortterminal: {
    label: 'Kortterminal',
    licensePending: false,
    subTypes: ['fysisk', 'mobil', 'integrerad'],
    keywords: [
      'kortterminal', 'kortavgift', 'transaktionsavgift',
      'worldline', 'bambora', 'nets', 'zettle', 'sumup', 'iyzico',
    ],
    accountHints: ['6390', '6991', '6800'],
  },
  'faktura-tjanst': {
    label: 'Fakturatjänst / Affärssystem',
    licensePending: false,
    subTypes: ['kivra', 'efaktura', 'utskick', 'affärssystem'],
    keywords: [
      'fakturatjänst', 'kivra', 'e-faktura', 'utskickstjänst',
      'billogram', 'fortnox', 'visma', 'bokföringsprogram', 'affärssystem',
    ],
    accountHints: ['6110', '6230', '6540'],
  },
  'leasing-bil': {
    label: 'Företagsleasing',
    licensePending: false,
    subTypes: ['operationell', 'finansiell', 'restvärdesleasing'],
    keywords: [
      'leasing', 'företagsleasing', 'fordonsleasing', 'ald automotive',
      'arval', 'lease plan', 'autoplan', 'volvofinans',
    ],
    accountHints: ['5611', '5612', '5615'],
  },
  'mjukvara-saas': {
    label: 'Programvarulicenser / SaaS',
    licensePending: false,
    subTypes: ['microsoft-365', 'google-workspace', 'adobe', 'kommunikation', 'ovrigt-saas'],
    keywords: [
      'microsoft 365', 'office 365', 'm365', 'google workspace', 'adobe',
      'programvarulicens', 'saas', 'molntjänst', 'slack', 'zoom', 'teams',
      'onedrive', 'sharepoint', 'cloudtech', 'csp', 'licens', 'prenumeration',
    ],
    accountHints: ['6540', '5460', '6230'],
  },
  skrivarleasing: {
    label: 'Skrivare & Managed Print',
    licensePending: false,
    subTypes: ['a3-mfp', 'a4-mfp', 'klickavtal', 'managed-print'],
    keywords: [
      'skrivarhyra', 'kopiatorrhyra', 'multifunktionsskrivare', 'managed print',
      'klickavgift', 'klickavtal', 'skrivarleasing', 'kopieringsavgift',
      'konica minolta', 'ricoh', 'xerox', 'sharp', 'kyocera', 'canon',
      'officeprint', 'toner', 'serviceavtal skrivare',
    ],
    accountHints: ['5610', '6570', '6900'],
  },
  loneadmin: {
    label: 'Löneadministration',
    licensePending: false,
    subTypes: ['program', 'outsourcad', 'hybrid'],
    keywords: [
      'löneadministration', 'löneprogram', 'lönesystem', 'löneutbetalning',
      'hogia lön', 'hogia', 'azets', 'lön och hr', 'payroll',
      'lönekörning', 'lönehantering',
    ],
    accountHints: ['7699', '6540', '7690'],
  },
  'larm-bevakning': {
    label: 'Larm & Bevakning',
    licensePending: false,
    subTypes: ['inbrott', 'brand', 'kamera', 'bevakning'],
    keywords: [
      'larmövervakning', 'larmabonnemang', 'säkerhetsövervakning',
      'inbrottsalarm', 'brandlarm', 'bevakningsavtal',
      'sector alarm', 'verisure', 'safemore', 'securitas', 'teleguard',
    ],
    accountHints: ['6530', '6900', '6991'],
  },
  foretagshalsovard: {
    label: 'Företagshälsovård',
    licensePending: false,
    subTypes: ['bas', 'standard', 'premium'],
    keywords: [
      'företagshälsovård', 'friskvårdsavtal', 'hälsovårdsavtal',
      'arbetspsykolog', 'previa', 'feelgood', 'falck', 'avonova',
      'hälsoundersökning', 'rehab', 'friskvård',
    ],
    accountHints: ['7620', '7622', '6900'],
  },
  bankavgifter: {
    label: 'Bankavgifter & Betaltjänster',
    licensePending: false,
    subTypes: ['kontoavgift', 'betaltjänst', 'valuta'],
    keywords: [
      'bankavgift', 'kontoavgift företag', 'banktjänster', 'betalningsförmedling',
      'lunar', 'qred', 'företagskonto', 'bankpaket', 'kontohavare avgift',
    ],
    accountHints: ['6570', '6980', '6900'],
  },
  kontorsmaterial: {
    label: 'Kontorsmaterial & Förbrukning',
    licensePending: false,
    subTypes: ['förbrukningsvaror', 'papper', 'kaffe-fika', 'städmaterial'],
    keywords: [
      'kopieringspapper', 'kontorsmaterial', 'papper a4', 'kuvert', 'pärm',
      'pennor', 'kaffe', 'te', 'gevalia', 'nespresso', 'staples', 'lyreco',
      'viking', 'papyrus', 'förbrukningsvaror', 'office supply',
    ],
    accountHints: ['6110', '5410', '5411'],
  },
  'städ-rengöring': {
    label: 'Städ & Rengöring',
    licensePending: false,
    subTypes: ['kontorsstäd', 'industristäd', 'fönsterputs', 'storstäd'],
    keywords: [
      'städning', 'städtjänst', 'lokalvård', 'rengöring', 'fönsterputs',
      'hemfrid', 'servicemaster', 'sodexo', 'iss facility', 'städabonnemang',
    ],
    accountHints: ['6960', '6900'],
  },
  'transport-frakt': {
    label: 'Transport & Frakt',
    licensePending: false,
    subTypes: ['paket', 'pall', 'express', 'kyla', 'bulk'],
    keywords: [
      'frakt', 'transport', 'postnord', 'dhl', 'fedex', 'ups', 'bring',
      'schenker', 'db schenker', 'tnt', 'fraktavgift', 'leveransavgift',
      'paketfrakt', 'godsfrakt',
    ],
    accountHints: ['5800', '5820', '7320'],
  },
  'it-support': {
    label: 'IT-drift & Support',
    licensePending: false,
    subTypes: ['supportavtal', 'hosting', 'nätverk', 'backup', 'drift'],
    keywords: [
      'it-support', 'it-drift', 'driftavtal', 'hostingavgift', 'serviceavtal it',
      'managed services', 'nätverksövervakning', 'it-konsult', 'it-tjänster',
      'infrastruktur', 'server',
    ],
    accountHints: ['6540', '6230', '6900'],
  },
  uncategorized: {
    label: 'Okategoriserat',
    licensePending: false,
    subTypes: [],
    keywords: [],
    accountHints: [],
  },
};

export const CATEGORY_LIST = Object.keys(CATEGORIES);

export const ACTIVE_CATEGORIES = CATEGORY_LIST.filter(
  (k) => !CATEGORIES[k].licensePending && k !== 'uncategorized'
);

export const PENDING_CATEGORIES = CATEGORY_LIST.filter(
  (k) => CATEGORIES[k].licensePending
);
