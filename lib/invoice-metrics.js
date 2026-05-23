/**
 * Pure helpers for computing per-invoice financial metrics from extracted line items.
 *
 * Design principle: AI tags each line semantically (is_addon, addon_type).
 * Code does all arithmetic and categorisation. No AI arithmetic in this layer.
 */

// addon_type values that belong exclusively to the mobile-telephony domain
const MOBILE_ADDON_TYPES = new Set(['pbx', 'voip']);
// addon_type values that belong exclusively to the broadband domain
const BROADBAND_ADDON_TYPES = new Set(['static_ip', 'firewall', 'sla']);

// Safety-net regex: catches known addon descriptions when AI omits is_addon flag.
// Applied ONLY as a fallback when is_addon is missing or false.
const ADDON_FALLBACK_RX = {
  mobil:    /molnväxel|cloud[\s-]?pbx|\bpbx\b|ip-?pbx|teams[\s-]?direkt|teams[\s-]?integr|pstn|\bvoip\b/i,
  bredband: /statisk[\s-]?ip|managed[\s-]?firewall|brandv[äa]gg|extra[\s-]?sla|sla[\s-]?uppgr|\butm\b/i,
};

// Descriptions that indicate a line belongs to the OTHER category on combined invoices.
const CROSS_CATEGORY_RX = {
  mobil:    /bredband|fiber|internet|adsl|ftth/i,       // primary=mobil → exclude broadband lines
  bredband: /\bsim\b|mobilabonnemang|mobiltelefoni/i,   // primary=bredband → exclude mobile lines
};

// Same regex but in reverse: used to FIND the secondary category's lines.
const SECONDARY_CATEGORY_RX = {
  mobil:    /bredband|fiber|internet|adsl|ftth/i,          // secondary=bredband when primary=mobil
  bredband: /\bsim\b|mobilabonnemang|mobiltelefoni/i,      // secondary=mobil when primary=bredband
};

// Extract connection speed in Mbit/s from a broadband line description.
// Handles "500/500 Mbit/s", "1 Gbit", "1000 Mbit", etc.
const SPEED_DESC_RX = /(\d+)(?:\/\d+)?\s*(gbit|gbps|mbit)/i;
function extractSpeedMbitFromDesc(d) {
  const m = SPEED_DESC_RX.exec(d ?? '');
  if (!m) return null;
  const n = parseInt(m[1], 10);
  const isGbit = /gbit|gbps/i.test(m[2]);
  const mbit = isGbit ? n * 1000 : n;
  // Snap to nearest standard tier
  for (const t of [100, 250, 500, 1000]) { if (mbit <= t) return t; }
  return 1000;
}

function desc(li) {
  return li.description ?? li.name ?? '';
}

function sum(arr) {
  return arr.reduce((acc, li) => acc + (li.amount ?? 0), 0);
}

/**
 * True if this line is a mobile-domain addon (PBX, VoIP, etc.).
 * Primary signal: addon_type in MOBILE_ADDON_TYPES.
 * Fallback: is_addon=true + not a known broadband type + description matches.
 */
function isMobileAddon(li) {
  if (MOBILE_ADDON_TYPES.has(li.addon_type)) return true;
  if (li.is_addon === true && !BROADBAND_ADDON_TYPES.has(li.addon_type)) {
    return ADDON_FALLBACK_RX.mobil.test(desc(li));
  }
  // Regex-only fallback (AI missed is_addon)
  if (li.is_addon !== true && ADDON_FALLBACK_RX.mobil.test(desc(li))) return true;
  return false;
}

/**
 * True if this line is a broadband-domain addon (static IP, firewall, extra SLA).
 * Primary signal: addon_type in BROADBAND_ADDON_TYPES.
 * Fallback: is_addon=true + not a known mobile type + description matches.
 */
function isBroadbandAddon(li) {
  if (BROADBAND_ADDON_TYPES.has(li.addon_type)) return true;
  if (li.is_addon === true && !MOBILE_ADDON_TYPES.has(li.addon_type)) {
    return ADDON_FALLBACK_RX.bredband.test(desc(li));
  }
  if (li.is_addon !== true && ADDON_FALLBACK_RX.bredband.test(desc(li))) return true;
  return false;
}

/**
 * True if this line is any kind of addon (used to split base vs addons for
 * primaryComponentMonthly calculation).
 */
function isAnyAddon(li) {
  return isMobileAddon(li) || isBroadbandAddon(li);
}

/**
 * Compute per-invoice financial metrics from extracted line items.
 *
 * Returns fields that recommend.js uses for benchmark comparisons:
 *   mobileAddonMonthly       — monthly cost of mobile addons (PBX, VoIP)
 *   broadbandAddonMonthly    — monthly cost of broadband addons (static IP, firewall) — always
 *                              exposed regardless of primary category so the API can pass it
 *                              through as a cost centre on combined invoices.
 *   primaryComponentMonthly  — base lines of the dominant category (combined invoices only)
 *   secondaryComponentMonthly — base lines of the OTHER category (combined invoices only)
 *   secondaryConnectionSpeedMbit — speed tier of broadband secondary lines (primary=mobil only)
 *   secondarySeatCount       — number of mobile base lines found (primary=bredband only)
 *
 * @param {Array}   lineItems
 * @param {string}  category                - Dominant category from the categorizer
 * @param {boolean} potentialMixedCategories
 * @returns {object}
 */
export function computeInvoiceMetrics(lineItems, category, potentialMixedCategories) {
  const recurring = (lineItems ?? []).filter((li) => li.type === 'recurring_subscription');

  // Separate addon buckets
  const mobileAddons    = recurring.filter(isMobileAddon);
  const broadbandAddons = recurring.filter(isBroadbandAddon);
  // Base lines: everything that is not any kind of addon
  const base = recurring.filter((li) => !isAnyAddon(li));

  const mobileAddonSum    = sum(mobileAddons);
  const broadbandAddonSum = sum(broadbandAddons);

  // Always expose both addon buckets — recommend.js guards by category for addonAnnual,
  // but the API needs broadbandAddonMonthly as a pass-through on combined mobil invoices.
  const mobileAddonMonthly    = mobileAddonSum    > 0 ? mobileAddonSum    : null;
  const broadbandAddonMonthly = broadbandAddonSum > 0 ? broadbandAddonSum : null;

  // Primary component: only meaningful on combined invoices.
  let primaryComponentMonthly   = null;
  let secondaryComponentMonthly = null;
  let secondaryConnectionSpeedMbit = null;
  let secondarySeatCount        = null;

  if (potentialMixedCategories === true) {
    const crossRx     = CROSS_CATEGORY_RX[category] ?? null;
    const secondaryRx = SECONDARY_CATEGORY_RX[category] ?? null;

    const primaryLines   = crossRx     ? base.filter((li) => !crossRx.test(desc(li)))     : base;
    const secondaryLines = secondaryRx ? base.filter((li) =>  secondaryRx.test(desc(li))) : [];

    const primarySum   = sum(primaryLines);
    const secondarySum = sum(secondaryLines);

    primaryComponentMonthly   = primarySum   > 0 ? primarySum   : null;
    secondaryComponentMonthly = secondarySum > 0 ? secondarySum : null;

    // For mobil-primary: extract broadband speed from secondary line descriptions
    if (category === 'mobil' && secondaryLines.length > 0) {
      for (const li of secondaryLines) {
        const speed = extractSpeedMbitFromDesc(desc(li));
        if (speed != null) { secondaryConnectionSpeedMbit = speed; break; }
      }
    }

    // For bredband-primary: count secondary mobile lines as a seat proxy
    if (category === 'bredband' && secondaryLines.length > 0) {
      secondarySeatCount = secondaryLines.length;
    }
  }

  return {
    mobileAddonMonthly,
    broadbandAddonMonthly,
    primaryComponentMonthly,
    secondaryComponentMonthly,
    secondaryConnectionSpeedMbit,
    secondarySeatCount,
  };
}
