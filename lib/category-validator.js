// P1.1 — Dual-model category cross-validation
// Kör en oberoende Haiku-klassificering för leverantörer som INTE finns i
// fingerprint-databasen. Fail-open: ett timeout eller API-fel blockerar aldrig
// en korrekt analys — det loggas och passerar.
// Kostnad: ~$0.001 per anrop (Haiku 4.5), körs bara för okända leverantörer.

import Anthropic from '@anthropic-ai/sdk';

const VALIDATOR_MODEL = 'claude-haiku-4-5-20251001';
const VALIDATOR_TIMEOUT_MS = 4500;

const VALID_CATEGORIES = [
  'mobil', 'bredband', 'saas-productivity', 'saas-crm', 'saas-finance',
  'saas-other', 'saas-creative', 'el', 'skrivarleasing', 'utrustningsleasing',
  'kortterminal', 'faktura-tjanst', 'leasing-bil', 'it-support', 'serverhosting',
  'transport-frakt', 'kontorsmaterial', 'städ-rengöring', 'larm-bevakning',
  'foretagshalsovard', 'loneadmin', 'forsakring-foretag', 'forsakring-ansvar',
  'vaxel', 'bankavgifter', 'avfall-atervinning', 'uncategorized',
];

// Kategori-par som är nära besläktade — om validatorn väljer ett närstående
// alternativ räknas det inte som konflikt (undviker false positives).
// Legitima närliggande kategorier — en oenighet HÄR är benign (relaterade familjer), aldrig en konflikt.
// #3-fix (2026-06-28): kartan var ofullständig/felaktig — den saknade NYCKLAR för molnvaxel, loneadmin
// och faktura-tjanst, och använde 'vaxel' istället för 'molnvaxel'. Resultat: RELATED[kategori]=undefined
// → VARJE validator-oenighet blev en konflikt → review_queue stal prissättbara fakturor (Telavox/Fortnox/
// Visma/Tre). Nu täcker kartan varje granskad kategori och dess legitima grannar (telekom-familjen +
// finans/lön/faktura-familjen). Håll symmetrisk: om A→B så B→A.
const RELATED = {
  'saas-productivity': ['saas-other', 'saas-crm', 'saas-finance', 'saas-creative'],
  'saas-other':        ['saas-productivity', 'saas-crm', 'saas-finance', 'saas-creative'],
  'saas-crm':          ['saas-productivity', 'saas-other', 'saas-finance'],
  'saas-finance':      ['saas-productivity', 'saas-other', 'saas-crm', 'faktura-tjanst', 'loneadmin'],
  'saas-creative':     ['saas-productivity', 'saas-other'],
  'faktura-tjanst':    ['saas-finance', 'loneadmin'],
  'loneadmin':         ['saas-finance', 'faktura-tjanst'],
  'kortterminal':      ['saas-finance', 'faktura-tjanst'],
  'mobil':             ['bredband', 'molnvaxel', 'telefoni'],
  'bredband':          ['mobil', 'molnvaxel', 'telefoni'],
  'molnvaxel':         ['mobil', 'bredband', 'telefoni'],
  'telefoni':          ['mobil', 'bredband', 'molnvaxel'],
};

const SYSTEM = `Du är ett precist B2B-faktura-kategoriseringsverktyg för svenska SMF.
Analysera leverantör och radbeskrivningar. Returnera EXAKT ETT ord — kategorinamnet.
Giltiga kategorier: ${VALID_CATEGORIES.join(', ')}.
Svar: ett ord. Ingen förklaring.`;

export async function validateCategory({ supplier, amount, lineItems, proposedCategory }) {
  const client = new Anthropic();
  const lineDesc = (lineItems ?? [])
    .slice(0, 6)
    .map(l => `${l.description ?? ''}: ${(l.amount ?? 0).toLocaleString('sv-SE')} kr`)
    .join('\n');

  try {
    const response = await Promise.race([
      client.messages.create({
        model: VALIDATOR_MODEL,
        max_tokens: 20,
        system: SYSTEM,
        messages: [{
          role: 'user',
          content: `Leverantör: ${supplier}\nBelopp: ${(amount ?? 0).toLocaleString('sv-SE')} kr\nRader:\n${lineDesc || '(saknas)'}`,
        }],
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('validator-timeout')), VALIDATOR_TIMEOUT_MS)
      ),
    ]);

    const raw = (response.content[0]?.text ?? '').trim().toLowerCase();
    const validatorCategory = VALID_CATEGORIES.find(c => raw === c || raw.startsWith(c + ' ') || raw.startsWith(c + '\n'))
      ?? 'uncategorized';

    const isRelated = (RELATED[proposedCategory] ?? []).includes(validatorCategory);
    const agrees = validatorCategory === proposedCategory || isRelated || validatorCategory === 'uncategorized';

    console.log(`[category-validator] proposed=${proposedCategory} validator=${validatorCategory} agrees=${agrees}`);

    return { validatorCategory, agrees, conflict: !agrees, usage: response.usage };
  } catch (err) {
    console.warn('[category-validator] fail-open:', err.message);
    return { validatorCategory: null, agrees: true, conflict: false, usage: null };
  }
}
