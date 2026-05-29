// lib/supplier-fingerprints.js
// Deterministisk validering av AI-kategorisering för kända leverantörer.
// Ersätter INTE AI-analysen — validerar att output är rimlig för leverantören.
//
// Lägg till nya leverantörer när vi ser dem i produktion.
// namePatterns: matchar mot normalizedSupplier OCH raw extracted.supplier.
// expectedCategories: alla rimliga kategorier för denna leverantör.

const FINGERPRINTS = [
  // ── Telekom ───────────────────────────────────────────────────────────────
  {
    key: 'telia',
    namePatterns: [/\btelia\b/i, /teliasonera/i],
    expectedCategories: ['mobil', 'bredband', 'vaxel'],
  },
  {
    key: 'telenor',
    namePatterns: [/\btelenor\b/i],
    expectedCategories: ['mobil', 'bredband'],
  },
  {
    key: 'tele2',
    namePatterns: [/\btele2\b/i],
    expectedCategories: ['mobil', 'bredband'],
  },
  {
    key: 'tre',
    namePatterns: [/\btre\b/i, /\bhi3g\b/i],
    expectedCategories: ['mobil'],
  },
  {
    key: 'bahnhof',
    namePatterns: [/\bbahnhof\b/i],
    expectedCategories: ['bredband'],
  },
  {
    key: 'comviq',
    namePatterns: [/\bcomviq\b/i],
    expectedCategories: ['mobil'],
  },

  // ── SaaS / Programvara ───────────────────────────────────────────────────
  {
    key: 'microsoft',
    namePatterns: [/\bmicrosoft\b/i],
    expectedCategories: ['saas-productivity', 'serverhosting'],
  },
  {
    key: 'salesforce',
    namePatterns: [/\bsalesforce\b/i],
    expectedCategories: ['saas-crm', 'saas-other'],
  },
  {
    key: 'google',
    namePatterns: [/\bgoogle\b/i],
    expectedCategories: ['saas-productivity', 'saas-other', 'serverhosting'],
  },
  {
    key: 'adobe',
    namePatterns: [/\badobe\b/i],
    expectedCategories: ['saas-creative'],
  },
  {
    key: 'atlassian',
    namePatterns: [/\batlassian\b/i, /\bjira\b/i],
    expectedCategories: ['saas-other', 'saas-devtools'],
  },
  {
    key: 'slack',
    namePatterns: [/\bslack\b/i],
    expectedCategories: ['saas-other', 'saas-productivity'],
  },
  {
    key: 'zoom',
    namePatterns: [/\bzoom\b/i],
    expectedCategories: ['saas-other', 'saas-productivity'],
  },
  {
    key: 'hubspot',
    namePatterns: [/\bhubspot\b/i],
    expectedCategories: ['saas-crm', 'saas-other'],
  },
  {
    key: 'fortnox',
    namePatterns: [/\bfortnox\b/i],
    expectedCategories: ['saas-finance', 'faktura-tjanst'],
  },
  {
    key: 'visma',
    namePatterns: [/\bvisma\b/i],
    expectedCategories: ['saas-finance', 'loneadmin'],
  },

  // ── Skrivare / Print ─────────────────────────────────────────────────────
  {
    key: 'ricoh',
    namePatterns: [/\bricoh\b/i],
    expectedCategories: ['skrivarleasing'],
  },
  {
    key: 'konica',
    namePatterns: [/\bkonica\b/i, /\bminolta\b/i],
    expectedCategories: ['skrivarleasing'],
  },
  {
    key: 'xerox',
    namePatterns: [/\bxerox\b/i],
    expectedCategories: ['skrivarleasing'],
  },
  {
    key: 'canon',
    namePatterns: [/\bcanon\b/i],
    expectedCategories: ['skrivarleasing'],
  },
];

/**
 * Kontrollerar om leverantören matchar ett känt fingerprint och om AI:ns
 * kategori stämmer med vad vi förväntar oss.
 *
 * @returns {{ matched: false }}
 *        | {{ matched: true, key: string, categoryOk: true }}
 *        | {{ matched: true, key: string, categoryOk: false, expectedCategories: string[] }}
 */
export function checkSupplierFingerprint(normalizedSupplier, rawSupplier, category) {
  const name = (normalizedSupplier ?? rawSupplier ?? '').toLowerCase().trim();
  if (!name) return { matched: false };

  for (const fp of FINGERPRINTS) {
    if (fp.namePatterns.some((p) => p.test(name))) {
      const categoryOk = fp.expectedCategories.includes(category);
      return { matched: true, key: fp.key, categoryOk, expectedCategories: fp.expectedCategories };
    }
  }
  return { matched: false };
}
