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


// Svenskt organisationsnummer i dokumentform: 5562309004 → 556230-9004.
// Vi strippar bindestrecket internt (normalizeOrgnr) för jämförelser — men en CFO läser
// råa siffror som maskinutdata, inte som ett dokument. Bindestrecket tillbaka i VYN.
export function fmtOrgnr(orgnr) {
  const d = String(orgnr || '').replace(/\D/g, '');
  return d.length === 10 ? `${d.slice(0, 6)}-${d.slice(6)}` : String(orgnr || '');
}

// ── SINGULAR/PLURAL (2026-08-21) ─────────────────────────────────────────────────────────────
// Rummet skrev «Vi jämförde de 1 fakturor» och «1 PRISSATTA» efter att räknarna delats upp.
// Grammatiken är inte kosmetik i den här produkten: en finansdirektör som ser ett brutet
// numerus läser hela sidan som maskingenererad, och då tappar varje siffra sin auktoritet.
// EN källa (regel 1) så nästa yta inte skriver sin egen böjning.
export function plural(n, singular, pluralform) {
  return Number(n) === 1 ? singular : pluralform;
}
