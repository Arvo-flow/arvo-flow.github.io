// P1.2 — Supplier-specific price intelligence
// Verifierade publika listpriser för kända leverantörer.
// Används för att validera extraherat pricePerSeatMonthly mot MSRP —
// ett pris >1.30× MSRP indikerar faktureringsfel eller felaktig klassificering.

export const SUPPLIER_PRICE_INTEL = {
  microsoft: {
    lastUpdated: '2026-05',
    source: 'microsoft.com/sv-se/microsoft-365/business/compare-all-plans',
    currency: 'SEK',
    tiers: {
      'business-basic':    { msrpMonthly: 69,  msrpAnnual: 828  },
      'business-standard': { msrpMonthly: 149, msrpAnnual: 1788 },
      'business-premium':  { msrpMonthly: 289, msrpAnnual: 3468 },
      'e3':                { msrpMonthly: 349, msrpAnnual: 4188 },
      'e5':                { msrpMonthly: 589, msrpAnnual: 7068 },
    },
    expectedCategories: ['saas-productivity'],
    maxReasonableMonthlyPerSeat: 800,
  },
  google: {
    lastUpdated: '2026-05',
    source: 'workspace.google.com/pricing',
    currency: 'SEK',
    tiers: {
      'business-starter':  { msrpMonthly: 72,  msrpAnnual: 864  },
      'business-standard': { msrpMonthly: 144, msrpAnnual: 1728 },
      'business-plus':     { msrpMonthly: 216, msrpAnnual: 2592 },
      'enterprise':        { msrpMonthly: 360, msrpAnnual: 4320 },
    },
    expectedCategories: ['saas-productivity'],
    maxReasonableMonthlyPerSeat: 600,
  },
  adobe: {
    lastUpdated: '2026-05',
    source: 'adobe.com/se/creativecloud/business',
    currency: 'SEK',
    tiers: {
      'all-apps': { msrpMonthly: 699, msrpAnnual: 8388 },
      'single':   { msrpMonthly: 349, msrpAnnual: 4188 },
    },
    expectedCategories: ['saas-creative'],
    maxReasonableMonthlyPerSeat: 1200,
  },
};

const SUPPLIER_KEY_MAP = {
  'microsoft':             'microsoft',
  'microsoft 365':         'microsoft',
  'microsoft corporation': 'microsoft',
  'google':                'google',
  'google workspace':      'google',
  'google llc':            'google',
  'adobe':                 'adobe',
  'adobe inc':             'adobe',
  'adobe systems':         'adobe',
};

export function getSupplierPriceIntel(normalizedSupplier) {
  const key = SUPPLIER_KEY_MAP[(normalizedSupplier ?? '').toLowerCase().trim()];
  return key ? (SUPPLIER_PRICE_INTEL[key] ?? null) : null;
}

// Validerar pricePerSeatMonthly mot känt MSRP.
// Returnerar { ok, anomaly, detail, msrp, ratio }.
// anomaly=true → troligt faktureringsfel eller felklassificering → review_queue.
export function validateSeatPrice({ normalizedSupplier, pricePerSeatMonthly, tierKey }) {
  if (!pricePerSeatMonthly || pricePerSeatMonthly <= 0 || !normalizedSupplier) {
    return { ok: true, anomaly: false };
  }
  const intel = getSupplierPriceIntel(normalizedSupplier);
  if (!intel) return { ok: true, anomaly: false };

  // Välj rätt tier om känd, annars använd max-tier som tak
  const tierData = tierKey ? intel.tiers[tierKey] : null;
  const msrp = tierData?.msrpMonthly
    ?? Math.max(...Object.values(intel.tiers).map(t => t.msrpMonthly));

  const ceiling = intel.maxReasonableMonthlyPerSeat ?? msrp * 2;
  const ratio = pricePerSeatMonthly / msrp;

  if (pricePerSeatMonthly > ceiling) {
    return {
      ok: false,
      anomaly: true,
      detail: `pricePerSeat ${pricePerSeatMonthly} kr > tak ${ceiling} kr — troligt fel (${normalizedSupplier})`,
      msrp,
      ratio: ratio.toFixed(2),
      source: intel.source,
    };
  }

  if (ratio > 1.30) {
    return {
      ok: false,
      anomaly: true,
      detail: `pricePerSeat ${pricePerSeatMonthly} kr > 1.30× MSRP ${msrp} kr — ratio ${ratio.toFixed(2)} (${intel.source}, ${intel.lastUpdated})`,
      msrp,
      ratio: ratio.toFixed(2),
      source: intel.source,
    };
  }

  return { ok: true, anomaly: false, msrp, ratio: ratio.toFixed(2), source: intel.source };
}

// Returnerar beräkningsunderlag för beräkningskedjan (P2.1).
export function getBenchmarkBasis({ normalizedSupplier, seatCount, suggestedAnnualCost, tierKey }) {
  const intel = getSupplierPriceIntel(normalizedSupplier);
  if (!intel || !seatCount || !suggestedAnnualCost) return null;

  const tierData = tierKey ? intel.tiers[tierKey] : null;
  if (tierData) {
    const pricePerSeatMonthly = Math.round(suggestedAnnualCost / (seatCount * 12));
    return {
      formula: `${seatCount} licenser × ${pricePerSeatMonthly} kr/mån × 12`,
      source: `${intel.source} (${intel.lastUpdated})`,
      msrpMonthly: tierData.msrpMonthly,
    };
  }
  return null;
}
