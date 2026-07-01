// src/utils/format.js — EN källa för formattering och etiketter i frontend.
// Backend-motsvarighet: lib/format.js. Håll dem i synk — aldrig lokala kopior i sidor.

export const formatKr = (n) =>
  new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n) + ' kr';

export const fmtNumber = (n) =>
  n != null ? new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n) : '–';

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

// Tidsanpassad hälsning — en premiumyta som säger "God morgon" kl. 15 avslöjar att ingen är hemma.
// Ren funktion (h = 0–23, kundens LOKALA timme) → regressionstestbar. Undviker medvetet "God natt"
// (i svenskan en AVSKEDSFRAS, inte en hälsning) — sena timmar faller på "God kväll", aldrig fel-känsla.
export function greetingForHour(h) {
  if (h >= 5 && h < 10) return 'God morgon';
  if (h >= 10 && h < 12) return 'God förmiddag';
  if (h >= 12 && h < 17) return 'God eftermiddag';
  return 'God kväll';                                  // 17–04 (inkl. natt — aldrig "god natt")
}

export const MX_LABELS = {
  microsoft365: 'Microsoft 365',
  google:       'Google Workspace',
  zoho:         'Zoho Mail',
  other:        'Anpassad e-postlösning',
};
