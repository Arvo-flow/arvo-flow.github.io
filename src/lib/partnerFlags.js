// Partner availability per category.
// When a real partner agreement is in place, flip the `live` flag to true.
// The activation page and TestaFaktura SwitchCard consult this to decide
// whether to show "Bytet aktiveras direkt" vs "Arvo tar över inom 5 dagar".

const PARTNER_CONFIG = {
  mobil:              { live: false, name: 'Tele2 Företag' },
  bredband:           { live: false, name: null },
  el:                 { live: false, name: 'Tibber' },
  'saas-productivity':{ live: false, name: 'Dustin Group' },
  vaxel:              { live: false, name: 'Telavox' },
  kortterminal:       { live: false, name: 'Bambora' },
  serverhosting:      { live: false, name: 'Elastx' },
};

// Returns true if Arvo has a live partner for the given category,
// meaning the switch can be executed immediately (48h).
export function hasLivePartner(category) {
  return PARTNER_CONFIG[category]?.live === true;
}

// Returns the partner name for display purposes (e.g. "Tele2 Företag"),
// or null if no partner is configured for this category.
export function getPartnerName(category) {
  const cfg = PARTNER_CONFIG[category];
  if (!cfg?.live) return null;
  return cfg.name ?? null;
}

// Human-readable activation message depending on partner status.
export function getActivationMessage(category) {
  return hasLivePartner(category)
    ? 'Bytet aktiveras direkt — Arvo hanterar allt inom 48 timmar.'
    : 'Arvo tar över — ni hör av oss inom 5 dagar.';
}
