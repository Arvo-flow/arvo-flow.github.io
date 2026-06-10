// lib/invoice-lines.js — RAD-FÖRST-MODELLENS FRÖ (fas 1: skugga)
//
// Slutmålet (CLAUDE.md skuldlista): varje fakturarad bär egen kategori,
// kvantitet och à-pris, och ALLA aggregat härleds ur raderna — så att
// blandade fakturor blir normalfall som uttrycks, inte specialfall som
// lappas (mobileAddonMonthly, primaryComponentMonthly, …).
//
// Fas 1 (denna modul): körs i SKUGGA bredvid pipelinen och loggar hur
// flerkategori-verkligheten ser ut — hur ofta fakturor spänner flera
// kategorier och hur stora sekundärbeloppen är. Det är mätdatan som
// styr den fulla migreringen (strypare, aldrig big bang).
//
// OBS REGEL 1: detta är INSTRUMENTERING, inte en andra sanning.
// Ingenting härifrån når kund — kundflödet ägs av categorize.js.

/** Deterministisk radklassning — medvetet grov; precision mäts innan den litas på. */
const LINE_CATEGORY_RE = [
  ['mobil',      /mobil|abonnemang|sim|surf|samtal|roaming|mms|sms/i],
  ['bredband',   /bredband|fiber|internet|mbit|gbit|wifi|router/i],
  ['saas',       /licens|microsoft|m365|office|google workspace|slack|zoom|atlassian|jira|adobe|användare|user|seat/i],
  ['el',         /\bel\b|elhandel|elnät|kwh|spotpris|energiskatt/i],
  ['telefoni',   /växel|telefoni|anknytning|pbx|voip/i],
  ['print',      /skrivare|kopiator|utskrift|klick|toner/i],
  ['hårdvara',   /hårdvara|telefon \d|iphone|samsung|dator|laptop|avbetalning|delbetalning/i],
];

export function classifyLine(description = '') {
  for (const [cat, re] of LINE_CATEGORY_RE) {
    if (re.test(description)) return cat;
  }
  return 'övrigt';
}

/**
 * Härleder kategorifördelningen ur raderna — bottom-up.
 * Run-rate per rad: prorata till fullt pris (qty × à-pris), övriga radbelopp.
 *
 * @param {Array} lineItems
 * @returns {{ categories: Record<string, number>, primary: string|null,
 *             primaryShare: number, isMultiCategory: boolean, periodicTotal: number }}
 */
export function aggregateByCategory(lineItems = []) {
  const categories = {};
  let periodicTotal = 0;

  for (const l of lineItems) {
    if (l.type === 'one_time_fee' && l.is_prorata !== true) continue; // engångs ≠ run-rate
    const runRate = (l.is_prorata === true && l.quantity != null && l.unitPrice != null)
      ? l.quantity * l.unitPrice
      : (l.amount ?? 0);
    if (!(runRate > 0)) continue;

    const cat = l.is_addon ? `addon:${l.addon_type ?? 'other'}` : classifyLine(l.description);
    categories[cat] = (categories[cat] ?? 0) + runRate;
    periodicTotal += runRate;
  }

  const entries = Object.entries(categories).sort((a, b) => b[1] - a[1]);
  const primary = entries[0]?.[0] ?? null;
  const primaryShare = periodicTotal > 0 ? (entries[0]?.[1] ?? 0) / periodicTotal : 0;

  return {
    categories,
    primary,
    primaryShare: Math.round(primaryShare * 100) / 100,
    isMultiCategory: entries.filter(([k, v]) => !k.startsWith('addon:') && v / (periodicTotal || 1) >= 0.10).length > 1,
    periodicTotal,
  };
}

/**
 * Skuggdiff — loggas per analys för att bygga beslutsunderlaget till
 * den fulla rad-först-migreringen. Returnerar loggsträngen (testbar).
 */
export function shadowReport(lineItems, pipelineCategory) {
  try {
    const agg = aggregateByCategory(lineItems);
    const dist = Object.entries(agg.categories)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `${k}:${Math.round(v)}`)
      .join(' ');
    return `[rad-först SKUGGA] pipeline=${pipelineCategory} rad-primär=${agg.primary} ` +
           `andel=${agg.primaryShare} flerkategori=${agg.isMultiCategory} fördelning={ ${dist} }`;
  } catch (err) {
    return `[rad-först SKUGGA] fail-open: ${err.message}`;
  }
}
