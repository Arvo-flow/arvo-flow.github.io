// scripts/probe-lfl-tackning.mjs — HUR OFTA SKAPAR GISSNINGEN ETT TAL?
//
// Efter att like-for-like-kopiorna revs (2026-08-12) har textgissningen förlorat makten att skriva
// över kundens tal och att namnge bytesmålet. Den har EN makt kvar: på den väg där LFL saknas
// byggs benchmarken ur `getDominantSaasTierKey` — en tier läst ur radens beskrivningstext — och
// den benchmarken föder en kundsynlig besparing.
//
// Frågan innan vi tystar den vägen är inte "kan den ha fel?" (ja) utan "hur ofta går fakturor den
// vägen?". Att släcka blint vore samma fel som att tvinga in en kategori under en grind som inte
// kan fyra: en tyst vakt som ser ut som en vaken.
//
// Sonden kör därför den SKARPA pipelinen — extract.js mot verkliga fakturor i test-pdfs/ — och
// mäter tre saker per faktura:
//   1. Bär raderna det LFL kräver (quantity på varje tier-rad)?  → finns den bevisade vägen?
//   2. Om inte: vilket fält fattas, på vilken rad?
//   3. Skapas ändå en kundsynlig besparing på gissningsvägen?    → är tystnaden en förlust eller en vinst?
//
// Punkt 3 är den bärande. En gissningsväg som ändå aldrig producerar ett tal kostar ingenting att
// stänga; en som producerar tal för halva korpusen är ett beslut med pris, och priset ska mätas
// före beslutet — inte upptäckas efter.
import { readFileSync } from 'node:fs';
import { deklarera } from '../lib/sondkontrakt.js';
import { extractInvoice, routeExtraction } from '../agents/test-invoice/extract.js';
import { categorize } from '../agents/categorizer/categorize.js';
import { recommend, computeLikeForLikeSaasTarget, LFL_TIER_RE } from '../agents/recommender/recommend.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

deklarera({
  namn: 'probe-lfl-tackning',
  fangar: 'Hur ofta verkliga SaaS-fakturor saknar like-for-like-underlag, och om gissningsvägen ändå skapar ett kundsynligt tal.',
  blind: 'test-pdfs/ är den korpus vi själva samlat — den speglar inte nödvändigtvis fördelningen i inkommande kundtrafik. Sonden mäter alltså vägvalet på VÅR korpus, inte marknadens. Den mäter inte heller om en tier-gissning är RÄTT, bara om den fick skapa ett tal.',
});

const TIERS = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;

// Varje faktura i korpusen som rimligen bär M365/SaaS-licenser. Listan är bred med avsikt:
// kategoriseringen avgör, inte filnamnet (Tele2-prejudikatet — namnet ljuger).
const KANDIDATER = [
  'atea-m365-overskott.pdf', 'cloudreseller-norden.pdf', 'crayon-m365-azure.pdf',
  'dustin-m365-standard.pdf', 'microsoft.pdf', 'microsoft-new.pdf', 'microsoft-direkt-usd.pdf',
  'azure-csp-reseller.pdf', 'google-workspace-arsbetalning.pdf', 'omnicloud.pdf',
  'salesforce-enterprise.pdf', 'hubspot-marketing-pro.pdf', 'atlassian.pdf',
  'atlassian-cloud-manad.pdf', 'adobe-creative-cloud-ars.pdf', 'aws-reseller-komplex.pdf',
  'Faktura_1.pdf', 'Faktura_2.pdf', 'Faktura_3.pdf', 'Faktura_4.pdf',
];

const stubKv = { get: async () => ({ rate: 10.5, fetchedAt: new Date().toISOString() }) };

const rader = [];

for (const fil of KANDIDATER) {
  let extracted, categorized;
  try {
    extracted = await extractInvoice({ pdfBytes: readFileSync(`test-pdfs/${fil}`) });
    const routing = routeExtraction(extracted);
    if (routing.route === 'unsupported') { rader.push({ fil, status: 'ej stödd', kategori: '—' }); continue; }
    categorized = await categorize({
      supplier:    extracted.supplier ?? '',
      description: (extracted.lineItems ?? []).map((l) => l.description).join(', '),
      amount:      extracted.amount ?? 0,
    });
  } catch (e) { rader.push({ fil, status: `fel: ${String(e.message).slice(0, 50)}`, kategori: '—' }); continue; }

  if (categorized.category !== 'saas-productivity') {
    rader.push({ fil, status: 'annan kategori', kategori: categorized.category });
    continue;
  }

  const lineItems = extracted.lineItems ?? [];
  const lfl = computeLikeForLikeSaasTarget(lineItems, TIERS, extracted.annualCost);

  // Varför saknas LFL? Enda deterministiska orsaken i funktionen är en tier-rad utan quantity.
  const utanAntal = lineItems
    .filter((l) => l.type === 'recurring_subscription' || l.is_prorata === true)
    // Mönstret LÅNAS ur recommend.js — sonden får aldrig ha sin egen uppfattning om vad en
    // tier-rad är. Mäter man med ett annat mått än produktionen mäter man inte produktionen.
    .filter((l) => LFL_TIER_RE.some((p) => p.re.test(l.description ?? '')))
    .filter((l) => l.quantity == null)
    .map((l) => (l.description ?? '').slice(0, 40));

  // Skapar gissningsvägen ändå ett tal? Kör recommend() UTAN likeForLikeTarget — exakt det
  // tillstånd produktionen hamnar i när LFL är null.
  let gissningensTal = null;
  try {
    const r = await recommend({
      customer:    { industry: 'it-tech', employees: extracted.seatCount ?? 10 },
      categorized: { category: 'saas-productivity', subType: 'produktivitet', normalizedSupplier: categorized.normalizedSupplier, confidence: categorized.confidence },
      invoice: {
        amount: extracted.amount, annualCost: extracted.annualCost,
        recurringAmount: extracted.recurringAmount, variableCharges: extracted.variableCharges,
        seatCount: extracted.seatCount ?? null, lineItems,
        licenseType: extracted.licenseType ?? null,
        billingCycleType: extracted.billingCycleType ?? null,
        saasProductFamily: extracted.saasProductFamily ?? null,
        likeForLikeTarget: null,                 // ← gissningsvägen, isolerad
      },
    }, { kvStore: stubKv });
    gissningensTal = r.shouldSwitch ? (r.savingPerYear ?? r.grossSaving ?? null) : null;
  } catch (e) { gissningensTal = `fel: ${String(e.message).slice(0, 40)}`; }

  rader.push({
    fil, kategori: 'saas-productivity',
    status: lfl ? 'LFL BÄR' : 'LFL SAKNAS',
    tierRader: lfl?.tierLines?.length ?? 0,
    utanAntal,
    gissningensTal,
  });
}

console.log(`\n  ${rader.length} fakturor körda genom den skarpa pipelinen.\n`);
for (const r of rader) {
  const huvud = `  ${r.fil.padEnd(36)} ${String(r.kategori).padEnd(20)} ${r.status}`;
  console.log(huvud);
  if (r.status === 'LFL BÄR') console.log(`      ${r.tierRader} tier-rad(er) → attribueringslåset kan fyra`);
  if (r.status === 'LFL SAKNAS') {
    console.log(`      tier-rader utan quantity: ${r.utanAntal.length ? r.utanAntal.join(' · ') : '(ingen — LFL föll av annat skäl)'}`);
    console.log(`      gissningsvägen skapade: ${r.gissningensTal == null ? 'INGET TAL (tyst ändå)' : `${r.gissningensTal} kr/år`}`);
  }
}

const saas = rader.filter((r) => r.kategori === 'saas-productivity');
const bar  = saas.filter((r) => r.status === 'LFL BÄR');
const saknas = saas.filter((r) => r.status === 'LFL SAKNAS');
const skaparTal = saknas.filter((r) => typeof r.gissningensTal === 'number' && r.gissningensTal > 0);

console.log(`\n  ── SUMMERING ──`);
console.log(`  saas-productivity: ${saas.length} fakturor`);
console.log(`  LFL bär:           ${bar.length}  → attribueringslåset fyrar, talet är bevisat per rad`);
console.log(`  LFL saknas:        ${saknas.length}`);
console.log(`  …och gissningen skapade ändå ett tal: ${skaparTal.length}`);
console.log(`\n  BESLUTSUNDERLAG: att tysta gissningsvägen kostar ${skaparTal.length} av ${saas.length} fakturor sitt tal.`);
console.log('  Sonden rekommenderar ingenting. Den mäter priset på beslutet.');
