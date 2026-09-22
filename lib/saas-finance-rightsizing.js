// lib/saas-finance-rightsizing.js — deterministisk rätt-storleks-rådgivning för saas-finance.
// Motorn är vendor-agnostisk: Fortnox + Spiris/Visma eEkonomi, samma stege, olika config.
//
// ⚠️ HETTE `lib/fortnox-rightsizing.js` till 2026-09-22. Filnamnet var «historiskt», och det
// stod skrivet i huvudet — men ett namn som beskriver EN leverantör i en motor som betjänar
// flera är inte historik, det är en felskyltning nästa läsare tror på. Samma byte gjordes i
// hela kedjan samtidigt (fältet `recommendation.fortnoxRightsizing`, dispatch-funktionen och
// kundytans proveniensmening), eftersom en halv omdöpning är värre än ingen: då finns BÅDA
// namnen och ingen vet vilket som gäller.
//
// Zero Trust: vi gissar ALDRIG en besparing. Den enda siffra vi visar är skillnaden mellan TVÅ
// publika, verifierade listpriser (BRANCHINDEX.fortnoxVerified / spirisVerified, vaktade veckovis).
// Betalar kunden för en nivå med en billigare nivå under sig är prisskillnaden ett FAKTUM.
// Huruvida den gäller beror på användningen (moduler/volym) — det kan vi INTE läsa ur en faktura,
// så vi ställer revisorsfrågan (rådgivande revisor, precis som shelfware). Igenkänns ingen
// nivå → null (recommend() faller till talfritt offert-läge; estimat når ALDRIG kund).

import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

// Leverantörskonfig: algoritmen är delad (regel 1), endast config skiljer.
function vendorConfigs() {
  const fin = BRANCHINDEX['saas-finance'] ?? {};
  const cfgs = [];
  if (fin.fortnoxVerified?.paket) cfgs.push({
    vendor: 'Fortnox', label: 'Fortnox-paketet',
    order: ['Mini', 'Liten', 'Mellan', 'Stor'],
    ladder: fin.fortnoxVerified.paket,
    matchRx: /fortnox|paket/i, urlText: 'fortnox.se/produkt/prislista',
  });
  if (fin.spirisVerified?.niva) cfgs.push({
    vendor: 'Spiris', label: 'Spiris-nivån',
    order: ['Starta', 'Driva', 'Skala', 'Växa', 'Lyfta'],
    ladder: fin.spirisVerified.niva,
    matchRx: /spiris|visma|eekonomi|e-ekonomi/i, urlText: 'spiris.se/priser',
  });
  return cfgs;
}

function detectInLadder(lineItems, cfg) {
  for (const item of lineItems ?? []) {
    const desc = String(item?.description ?? '');
    if (!cfg.matchRx.test(desc)) continue;
    for (const name of cfg.order) {
      if (new RegExp(`\\b${name}\\b`, 'i').test(desc)) {
        return { name, monthly: cfg.ladder[name], billedMonthly: item?.amount ?? null };
      }
    }
  }
  return null;
}

function rightsize(lineItems, cfg) {
  const current = detectInLadder(lineItems, cfg);
  if (!current) return null;
  const idx = cfg.order.indexOf(current.name);
  if (idx <= 0) return null; // redan på billigaste nivån → inget att nedgradera
  const targetName = cfg.order[idx - 1];
  const targetMonthly = cfg.ladder[targetName];
  const deltaMonthly = current.monthly - targetMonthly;
  if (!(deltaMonthly > 0)) return null;
  const annualSaving = deltaMonthly * 12;
  return {
    vendor: cfg.vendor,
    currentPaket: current.name, currentMonthly: current.monthly,
    targetPaket: targetName, targetMonthly, deltaMonthly, annualSaving,
    needsReview: true,
    reviewPrompt: `Ni betalar för ${cfg.label} ${current.name} (${current.monthly} kr/mån). Nivån under, ${targetName}, kostar ${targetMonthly} kr/mån — ${deltaMonthly} kr/mån billigare. Ryms er användning (moduler, antal användare, verifikationsvolym) i ${targetName}? Bekräfta så realiserar vi ${annualSaving} kr/år.`,
    note: `Verifierad prisskillnad ${current.name}→${targetName}: ${deltaMonthly} kr/mån × 12 = ${annualSaving} kr/år (publikt listpris, ${cfg.urlText}). Förutsätter att behovet ryms i ${targetName}.`,
  };
}

/** Vendor-agnostisk: prova varje konfigurerad saas-finance-leverantör, returnera första träff. */
export function saasFinanceRightsizing(lineItems) {
  for (const cfg of vendorConfigs()) {
    const r = rightsize(lineItems, cfg);
    if (r) return r;
  }
  return null;
}

/**
 * Vendor-agnostisk paketigenkänning — EN nivå ned från `saasFinanceRightsizing`, och den enda
 * vägen till stegdetektionen. Exporterad för sviten: `saasFinanceRightsizing` svarar `null` både
 * när inget paket kändes igen OCH när kunden redan ligger på billigaste nivån, alltså kan den inte
 * ensam pröva falsklarmet «Stor skärm 27 tum» mot paketet «Stor». Två `null` med olika betydelse
 * är felfamiljen; den här funktionen skiljer dem åt.
 *
 * ⚠️ 2026-09-20 ersätter den `detectFortnoxPaket`/`fortnoxRightsizing` — två Fortnox-specifika
 * skal vars kommentar sa «tester + ev. äldre kod». Mätt: det fanns ingen äldre kod (noll
 * produktionsimportörer, noll interna anropare, noll skript). Värre var namnkollisionen:
 * `recommendation.fortnoxRightsizing` ÄR ett levande kundsynligt fält, så den som grep:ade namnet
 * fick en död funktion och ett levande fält i samma träfflista. Produktionen har alltid kört den
 * leverantörsagnostiska vägen; sviten prövar nu samma väg i stället för ett skal ingen anropar.
 */
export function detectSaasFinancePaket(lineItems) {
  for (const cfg of vendorConfigs()) {
    const träff = detectInLadder(lineItems, cfg);
    if (träff) return träff;
  }
  return null;
}
