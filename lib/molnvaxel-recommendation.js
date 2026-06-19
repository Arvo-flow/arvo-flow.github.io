// lib/molnvaxel-recommendation.js — deterministisk molnväxel-rekommendation (ingen AI, ingen FX).
//
// Zero Trust: de enda talen är (a) kundens FAKTISKA per-användare-kostnad ur deras egen faktura
// (normaliserad, exkl moms), (b) Telias VERIFIERADE instegsgolv (Smart Connect, exkl moms bekräftat),
// (c) Telias EXAKTA tilläggspriser (funktionsnummer 99 / softphone 29 / extra nummer 39). "från"-priser
// är golv → vi påstår ALDRIG en hård besparing mot dem, bara en ärlig referens. Den hårda "ni betalar
// X, marknaden Y" kommer ur k-anonym tvärkund-jämförelse (Vallgraven) när datapunkterna räcker.

import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { normalizeTelekomInvoice, CANONICAL_TIERS } from './telekom-normalize.js';

const fmt0 = (n) => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);
const fmt2 = (n) => new Intl.NumberFormat('sv-SE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
const zeroUsage = { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 };

// Leverantörens egna tilläggsrader → rätt-storlek (verifierade exakta priser, advisory).
const ADDON_SIGNALS = {
  funktionsnummer: { rx: /funktionsnummer|funktions-nummer|huvudnummer/i, label: 'funktionsnummer' },
  softphone:       { rx: /softphone|mjukvarutelefon/i,                     label: 'softphone' },
  extraNummer:     { rx: /extra\s*(?:telefon)?nummer|extranummer/i,        label: 'extra telefonnummer' },
};
export function detectMolnvaxelAddons(lineItems, addonPrices) {
  const found = [];
  for (const [key, { rx, label }] of Object.entries(ADDON_SIGNALS)) {
    if ((lineItems ?? []).some((it) => rx.test(String(it?.description ?? '')))) {
      found.push({ addon: key, label, monthlyExVat: addonPrices?.[key] ?? null });
    }
  }
  return found;
}

/** Talfritt offert-svar (okänt/ej normaliserbart) — ingen siffra utan källa. */
function quoteResponse() {
  return {
    shouldSwitch: false, requiresQuote: true, recommendationType: 'requires_quote',
    reasoning: 'Vi ser en växeltjänst men kan inte säkert läsa per-användare-kostnaden ur fakturan. ' +
      'Vi gör en manuell genomgång mot Telias verifierade molnväxelpris istället för att visa en siffra vi inte kan stå för.',
    revisionGate: 'audited', molnvaxel: null, benchmark: null,
    suggestedSupplier: null, suggestedAnnualCost: null, grossSaving: null, arvoFee: null, netSaving: null,
    savingPerYear: null, optimizationSaving: null, licenseOverage: null, overageSavings: null,
    confidence: 'low', switchSteps: [], usage: zeroUsage,
  };
}

export function molnvaxelRecommendation(input) {
  const tv = BRANCHINDEX.molnvaxel?.teliaVerified;
  const normalized = normalizeTelekomInvoice(input?.invoice ?? {}, input?.categorized?.normalizedSupplier ?? null);
  if (!tv || !normalized) return quoteResponse();

  const tier = normalized.canonicalTier;
  const floor = tv.tiers[tier]?.fromMonthly ?? null;       // T1=89, T2=118, T3=null (offert)
  const plan = tv.tiers[tier]?.plan ?? 'Telia Smart Connect (skräddarsy)';
  const perUser = normalized.perUserMonthlyExVat;
  const seats = normalized.seats;
  const addons = detectMolnvaxelAddons(input?.invoice?.lineItems, tv.addons);
  const overFloorPct = floor && perUser > 0 ? Math.round(((perUser - floor) / floor) * 100) : null;

  // Kodskriven reasoning (regel 2: AI narrerar aldrig — kompletta fakta → mall). Alla tal källtäckta.
  let reasoning =
    `Ni betalar ${fmt2(perUser)} kr/användare och månad (exkl moms) för er växel på ${CANONICAL_TIERS[tier].label}-nivån. `;
  if (floor != null) {
    reasoning += `Telia Smart Connect — marknadens instegsväxel för motsvarande nivå — kostar från ${fmt0(floor)} kr/användare/mån (exkl moms). `;
    if (overFloorPct != null && overFloorPct >= 30) {
      reasoning += `Ni ligger ~${overFloorPct} % över instegsgolvet — värt en offertjämförelse. `;
    }
  } else {
    reasoning += `På kontaktcenter-nivå sätter leverantörerna pris via offert — vi jämför mot er faktiska kostnad i en genomgång. `;
  }
  if (addons.length) {
    const withPrice = addons.filter((a) => a.monthlyExVat != null);
    if (withPrice.length) {
      reasoning += `Ni betalar för ${withPrice.map((a) => `${a.label} (${fmt0(a.monthlyExVat)} kr/mån)`).join(', ')} — bekräfta att de används, annars är det ren besparing. `;
    }
  }

  return {
    shouldSwitch: false, requiresQuote: floor == null, recommendationType: 'optimize',
    reasoning: reasoning.trim(),
    revisionGate: 'audited',
    molnvaxel: {
      tier, tierLabel: CANONICAL_TIERS[tier].label, seats,
      perUserMonthlyExVat: perUser, perUserLabel: fmt2(perUser),
      teliaPlan: plan, teliaFloor: floor, teliaFloorLabel: floor != null ? fmt0(floor) : null,
      overFloorPct, addons,
    },
    // Benchmark-referens (verifierat golv) — aldrig en hård besparing.
    benchmark: floor != null
      ? { p25: floor * 12, median: floor * 12, source: 'real-public',
          note: `Telia Smart Connect instegsgolv ${tier} (${fmt0(floor)} kr/anv/mån exkl moms, telia.se verifierat). Per användare/år.` }
      : null,
    suggestedSupplier: floor != null ? 'Telia Smart Connect' : null,
    suggestedAnnualCost: null, grossSaving: null, arvoFee: null, netSaving: null,
    savingPerYear: null, optimizationSaving: null, licenseOverage: null, overageSavings: null,
    confidence: floor != null ? 'high' : 'low', switchSteps: [], usage: zeroUsage,
  };
}
