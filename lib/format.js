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
