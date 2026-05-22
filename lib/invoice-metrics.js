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
 * Returns three fields that recommend.js uses for benchmark comparisons:
 *   mobileAddonMonthly    — monthly cost of mobile addons (PBX, VoIP); pass-through in savings calc
 *   broadbandAddonMonthly — monthly cost of broadband addons (static IP, firewall); pass-through
 *   primaryComponentMonthly — monthly cost of the dominant category's base lines on combined invoices
 *
 * @param {Array<{type:string, amount:number, description?:string, is_addon?:boolean, addon_type?:string}>} lineItems
 * @param {string}  category                - Dominant category from the categorizer (e.g. 'mobil')
 * @param {boolean} potentialMixedCategories - true when invoice spans multiple service categories
 * @returns {{ mobileAddonMonthly: number|null, broadbandAddonMonthly: number|null, primaryComponentMonthly: number|null }}
 */
export function computeInvoiceMetrics(lineItems, category, potentialMixedCategories) {
  const recurring = (lineItems ?? []).filter((li) => li.type === 'recurring_subscription');

  // Separate addon buckets — mobile and broadband addons are distinct cost centres
  const mobileAddons    = recurring.filter(isMobileAddon);
  const broadbandAddons = recurring.filter(isBroadbandAddon);
  // Base lines: everything that is not any kind of addon
  const base = recurring.filter((li) => !isAnyAddon(li));

  const mobileAddonSum    = sum(mobileAddons);
  const broadbandAddonSum = sum(broadbandAddons);

  const mobileAddonMonthly    = category === 'mobil'    && mobileAddonSum    > 0 ? mobileAddonSum    : null;
  const broadbandAddonMonthly = category === 'bredband' && broadbandAddonSum > 0 ? broadbandAddonSum : null;

  // primaryComponentMonthly: only meaningful on combined invoices.
  // Filter base lines to those that belong to the dominant category.
  let primaryComponentMonthly = null;
  if (potentialMixedCategories === true) {
    const crossRx = CROSS_CATEGORY_RX[category] ?? null;
    const primaryLines = crossRx
      ? base.filter((li) => !crossRx.test(desc(li)))
      : base;
    const primarySum = sum(primaryLines);
    primaryComponentMonthly = primarySum > 0 ? primarySum : null;
  }

  return { mobileAddonMonthly, broadbandAddonMonthly, primaryComponentMonthly };
}
