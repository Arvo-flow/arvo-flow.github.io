// lib/format.js — EN källa för sv-SE-formattering och etiketter i backend
// (API:er, scripts, agenter). Frontend-motsvarighet: src/utils/format.js.
// Håll dem i synk — aldrig lokala kopior i enskilda filer.

export const fmtNumber = (n) =>
  n != null && !Number.isNaN(n)
    ? new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n)
    : '–';

const SV_MONTHS = ['januari', 'februari', 'mars', 'april', 'maj', 'juni',
                   'juli', 'augusti', 'september', 'oktober', 'november', 'december'];

export function swMonthYear(dateStr) {
  if (!dateStr) return null;
  const [y, m] = dateStr.split('-');
  return `${SV_MONTHS[parseInt(m, 10) - 1]} ${y}`;
}

export function monthsAgo(dateStr) {
  if (!dateStr) return 0;
  return Math.round((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24 * 30.44));
}

export const MX_LABELS = {
  microsoft365: 'Microsoft 365',
  google:       'Google Workspace',
  zoho:         'Zoho Mail',
  other:        'Anpassad e-postlösning',
};

// EN källa för kategorins inline-etikett i backend (regel 1: etiketter bor här, aldrig i lokala
// kopior). Frontend har sin rikare categoryMeta (med inlineLabel) — den här speglar samma ord i
// gemen form för mail/API-prosa. Tidigare låg denna karta lokalt i briefing-generator.js.
export const CATEGORY_LABELS = {
  'mobil':              'mobilabonnemang',
  'bredband':           'företagsbredband',
  'el':                 'elavtal',
  'saas-productivity':  'produktivitets-SaaS',
  'saas-crm':           'CRM-system',
  'saas-finance':       'ekonomisystem',
  'saas-devtools':      'dev-SaaS',
  'saas-other':         'SaaS',
  'saas-creative':      'kreativ SaaS',
  'skrivarleasing':     'skrivarleasing',
  'kortterminal':       'betaltjänst',
  'faktura-tjanst':     'fakturatjänst',
  'leasing-bil':        'billeasing',
  'forsakring-foretag': 'företagsförsäkring',
  'loneadmin':          'lönesystem',
  'vaxel':              'växel',
  'larm-bevakning':     'larm & bevakning',
  'foretagshalsovard':  'företagshälsovård',
  'bankavgifter':       'bankavgifter',
  'it-support':         'IT-support',
  'serverhosting':      'serverhosting',
};

export function catLabel(cat) { return CATEGORY_LABELS[cat] ?? cat; }
