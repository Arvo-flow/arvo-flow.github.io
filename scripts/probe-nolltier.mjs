// scripts/probe-nolltier.mjs — DEN TREDJE TILLSTÅNDET: LFL finns, men bär noll tier-rader.
//
// Sonden probe-lfl-tackning avslöjade en rad jag inte hade förutsett: en faktura där
// computeLikeForLikeSaasTarget returnerar ett OBJEKT men med tom tierLines (bara add-on-rader
// matchade). Min egen sond etiketterade den "attribueringslåset kan fyra" — vilket är falskt, för
// låset kräver tier-rader. Sondens etikett var en gissning som gick igenom som en mätning.
//
// Men den falska etiketten var det MINDRE felet. Frågan den ställde är den farliga:
//
//   `_useLfl` sätts på `suggestedAnnualCost > 0` — inte på att det finns tier-rader.
//   Med noll tier-rader är hela LFL-summan add-on-genomsläpp, och `_benchBase` blir
//   suggestedAnnualCost − addonAnnual ≈ 0. Vad blir då `savingPerYear`?
//
// Om svaret är "hela fakturan" har vi en fabricerad besparing på 100 % — den värsta sorten under
// en success fee på realiserad besparing. Sonden mäter det i stället för att resonera om det.
import { deklarera } from '../lib/sondkontrakt.js';
import { recommend, computeLikeForLikeSaasTarget } from '../agents/recommender/recommend.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

deklarera({
  namn: 'probe-nolltier',
  fangar: 'Vad recommend() svarar när like-for-like-objektet finns men saknar tier-rader — dvs. om noll-tier-vägen kan skapa en fabricerad besparing.',
  blind: 'Sonden konstruerar fakturaraderna själv i stället för att läsa dem ur en PDF. Den bevisar att KODVÄGEN finns och vad den gör; den bevisar inte hur ofta extraktionen producerar just den radformen.',
});

const TIERS = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
const stubAi = { messages: { create: async () => ({
  content: [{ type: 'tool_use', input: { shouldSwitch: true, recommendationType: 'switch', reasoning: 'AI-text.' } }],
  usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
}) } };
const stubKv = { get: async () => ({ rate: 10.5, fetchedAt: new Date().toISOString() }) };

// Äkta Microsoft-SKU:er som INTE matchar de fem tier-mönstren. Inget påhitt: Exchange Online
// Plan 1 och Microsoft 365 Apps säljs båda av Microsoft SE och står på verkliga fakturor.
const FALL = [
  { namn: 'Enbart icke-tier-rader (Exchange Online + Apps)', lines: [
    { type: 'recurring_subscription', description: 'Exchange Online Plan 1',       quantity: 20, unitPrice: 95,  amount: 1_900 },
    { type: 'recurring_subscription', description: 'Microsoft 365 Apps for business', quantity: 20, unitPrice: 120, amount: 2_400 },
  ] },
  { namn: 'Kontrollfall: en riktig tier-rad finns', lines: [
    { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard', quantity: 20, unitPrice: 250, amount: 5_000 },
  ] },
];

for (const f of FALL) {
  const annualCost = f.lines.reduce((s, l) => s + l.amount, 0) * 12;
  const lfl = computeLikeForLikeSaasTarget(f.lines, TIERS, annualCost);
  console.log(`\n═══ ${f.namn} ═══`);
  console.log(`  årskostnad: ${annualCost.toLocaleString('sv-SE')} kr`);
  console.log(`  LFL-objekt: ${lfl ? 'finns' : 'null'} · tierLines: ${lfl?.tierLines?.length ?? '—'} · addonLines: ${lfl?.addonLines?.length ?? '—'}`);
  if (lfl) console.log(`  LFL suggestedAnnualCost: ${lfl.suggestedAnnualCost.toLocaleString('sv-SE')} kr`);

  const r = await recommend({
    customer:    { industry: 'it-tech', employees: 20 },
    categorized: { category: 'saas-productivity', subType: 'produktivitet', normalizedSupplier: 'Microsoft', confidence: 0.95 },
    invoice: {
      amount: f.lines.reduce((s, l) => s + l.amount, 0), annualCost,
      billingPeriod: 'monthly', seatCount: 20, lineItems: f.lines,
      likeForLikeTarget: lfl,
    },
  }, { client: stubAi, kvStore: stubKv });

  const andel = r.savingPerYear > 0 ? Math.round((r.savingPerYear / annualCost) * 100) : 0;
  console.log(`  → shouldSwitch: ${r.shouldSwitch}`);
  console.log(`  → suggestedAnnualCost: ${r.suggestedAnnualCost?.toLocaleString('sv-SE') ?? 'null'} kr`);
  console.log(`  → savingPerYear: ${r.savingPerYear?.toLocaleString('sv-SE') ?? 'null'} kr  (${andel} % av fakturan)`);
  if (andel >= 90) console.log('  ⚠ FABRICERAD BESPARING — nästan hela fakturan påstås vara besparing.');
}

console.log('\nSonden kurerar ingenting. Den visar vad koden svarar.');
