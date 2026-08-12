// scripts/probe-lfl-produktionsvag.mjs — KÖR PRODUKTIONENS like-for-like-väg, inte testernas.
//
// Bibeln säger att attribueringslåset är stängt (2026-06-11) och att `computeLikeForLikeSaasTarget`
// är EN sanning för like-for-like-mål (regel 1, CLAUDE.md rad 293). Sviten har sex tester som låser
// NMIT-texten. Den här sonden ställer den enda fråga testerna aldrig kunde ställa:
//
//   KÖRS den funktionen i produktion — och når dess fält fram till låset?
//
// Verifieringsplikten punkt 5: testerna bevisar att MEKANISMEN reagerar. De kan aldrig bevisa att
// SIGNALEN någonsin rör sig. Sonden matar därför låset med exakt det objekt produktionen bygger
// (api/test-invoice.mjs) och med det objekt sviten bygger, och visar båda utfallen sida vid sida.
import { deklarera } from '../lib/sondkontrakt.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { computeLikeForLikeSaasTarget, buildLikeForLikeReasoning } from '../agents/recommender/recommend.js';

deklarera({
  namn: 'probe-lfl-produktionsvag',
  fangar: 'Om produktionens likeForLikeTarget-objekt bär de fält attribueringslåset kräver — mätt genom att köra låset på båda objekten.',
  blind: 'Om produktionsvägen har ändrats sedan filen lästes. Sonden speglar api/test-invoice.mjs rad 1284–1310; den anropar inte HTTP-endpointen. Ändras kopian utan att sonden ändras mäter den fel väg utan att säga ifrån.',
});

const TIERS = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;

// NMIT-fakturan — samma rader som tests/balanskrav.mjs låser texten mot.
const LINES = [
  { type: 'recurring_subscription', description: 'Microsoft 365 E3',                quantity: 85, unitPrice: 420, amount: 35_700 },
  { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard', quantity: 12, unitPrice: 165, amount:  1_980 },
  { type: 'recurring_subscription', description: 'Acronis Backup',                  quantity: 85, unitPrice:  29, amount:  2_465 },
];
const ANNUAL = LINES.reduce((s, l) => s + l.amount, 0) * 12;

// ── DEN GAMLA KOPIAN, bevarad som obduktionspreparat ───────────────────────────────────────────
// Detta VAR api/test-invoice.mjs:1284–1310 fram till 2026-08-12. Kopian är borttagen ur
// produktionen; den står kvar här för att sonden ska kunna visa exakt vad som gick förlorat —
// och för att nästa läsare ska se felet, inte bara höra om det.
// kopia-ok: obduktionspreparat — kopian ÄR fyndet. Den körs aldrig i något kundflöde; den står här
// för att sonden ska kunna visa skillnaden mellan objektet som tände låset och det som inte gjorde det.
function gamlaKopian(lineItems, annualCost) {
  const RE = [
    { key: 'e5',                re: /\bE5\b/i },
    { key: 'e3',                re: /\bE3\b/i },
    { key: 'business-premium',  re: /business[\s-]premium/i },
    { key: 'business-standard', re: /business[\s-]standard/i },
    { key: 'business-basic',    re: /business[\s-]basic/i },
  ];
  const lines  = lineItems.filter((l) => l.type === 'recurring_subscription');
  const perTot = lines.reduce((s, l) => s + (l.amount ?? 0), 0);
  const mult   = perTot > 0 ? annualCost / perTot : 12;
  let sugg = 0, ok = true, domKey = null, domAmt = 0;
  for (const item of lines) {
    const m = RE.find((p) => p.re.test(item.description ?? ''));
    if (m && TIERS[m.key]) {
      if (item.quantity == null) { ok = false; break; }
      const bm = TIERS[m.key].arvoAnnual ?? TIERS[m.key].msrpAnnual;
      sugg += Math.round(bm * item.quantity * 12);
      if ((item.amount ?? 0) > domAmt) { domAmt = item.amount; domKey = m.key; }
    } else {
      sugg += Math.round((item.amount ?? 0) * mult);
    }
  }
  return (ok && sugg > 0) ? { suggestedAnnualCost: sugg, dominantTierKey: domKey } : null;
}

const gammal = gamlaKopian(LINES, ANNUAL);
const nu     = computeLikeForLikeSaasTarget(LINES, TIERS, ANNUAL);

const kor = (namn, lfl) => {
  console.log(`\n═══ ${namn} ═══`);
  if (!lfl) { console.log('  objektet blev null — ingen LFL alls'); return; }
  console.log(`  fält: ${Object.keys(lfl).join(', ')}`);
  console.log(`  tierLines: ${lfl.tierLines ? `${lfl.tierLines.length} rad(er)` : 'SAKNAS'}`);
  console.log(`  suggestedAnnualCost: ${Math.round(lfl.suggestedAnnualCost).toLocaleString('sv-SE')} kr/år`);
  const text = buildLikeForLikeReasoning({
    supplier: 'CloudReseller AB', lfl, annualCost: ANNUAL,
    suggestedAnnualCost: lfl.suggestedAnnualCost,
    savingPerYear: Math.round(ANNUAL - lfl.suggestedAnnualCost),
    billingCycleType: 'monthly',
  });
  console.log(`  ATTRIBUERINGSLÅSET: ${text ? 'FYRAR' : 'TYST (null) — AI:ns egen text överlever'}`);
  if (text) console.log(`  «${text.slice(0, 180)}…»`);

  // Prompt-blocket AI:n får (recommend.js:349–362) itererar över samma tierLines.
  const rader = (lfl.tierLines ?? []).length;
  console.log(`  PROMPTENS "ANVÄND EXAKT DESSA TAL": ${rader} tier-rad(er)${rader === 0 ? '  ⬅ noll tal att använda' : ''}`);
};

kor('DEN GAMLA KOPIAN (api/test-invoice.mjs t.o.m. 2026-08-12)', gammal);
kor('PRODUKTIONEN I DAG = SVITEN (computeLikeForLikeSaasTarget)', nu);

if (gammal && nu) {
  const diff = Math.round(gammal.suggestedAnnualCost - nu.suggestedAnnualCost);
  console.log(`\n  Måldifferens gammal − ny: ${diff.toLocaleString('sv-SE')} kr/år`);
  console.log('  Talet är noll på den här fakturan. Det är just därför felet överlevde två månader:');
  console.log('  kopian räknade rätt SUMMA och fel OBJEKT, och bara objektet tände låset.');
}

console.log('\nSonden kurerar ingenting. Den kör låset och redovisar om det fyrade.');
