// agents/categorizer/categories.js
// The 8 leverantörskategorier som Arvo Flow kan optimera idag.
// Försäkring är "license-pending" — vi kategoriserar den men byter den inte
// förrän FI-licensen är klar.

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
      'tre', 'halebop', 'vimla', 'comviq',
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
    label: 'Fakturatjänst',
    licensePending: false,
    subTypes: ['kivra', 'efaktura', 'utskick'],
    keywords: [
      'fakturatjänst', 'kivra', 'e-faktura', 'utskickstjänst',
      'billogram', 'fortnox e-faktura', 'visma e-faktura',
    ],
    accountHints: ['6110', '6230'],
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
