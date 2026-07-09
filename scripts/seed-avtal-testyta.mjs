// scripts/seed-avtal-testyta.mjs — AVTALS-TESTYTAN: ett rent, förberett testrum för avtalsflödet.
// Körning 2 (2026-07-09): färsk länk till grundaren (gårdagens 24h-token åldrad; mejlen till
// testyta@arvoflow.se studsade — root-domänen saknar MX, inkorgen bor på inbox.arvoflow.se).
//
// Nollställer testytan (hårdkodat TEST_EMAIL — kan aldrig röra kunddata) och seedar FEM innehav,
// ett per fäll-leverantör (test-pdfs/avtal/), så varje fäll-avtal kan laddas upp på RÄTT innehav
// (leverantörsmatchningen passerar) — och fel avtal på fel innehav kan testas med flit.
// Avslutar med en magic-länk (24 h) rakt in i testrummet.
//
// OBS beloppen är TESTYTANS REKVISITA (Bahnhofs 4 900 kr/mån är ur fäll-avtalet; övriga runda tal)
// — testytan är den isolerade QA-sandlådan (isTestRoom), aldrig en kundyta.
// OBS 2: maila INTE till testyta@inbox efter seed — inbound-vägen auto-nollställer ytan vid nytt pass.
// OBS 3: länken hamnar i Actions-loggen (publik). Medveten avvägning: testytan innehåller enbart
// fiktiva bolag och nollställs vid nästa pass — nedsidan är noll, bekvämligheten hög.
import { randomBytes } from 'node:crypto';
import { getDb } from '../lib/db.js';
import { forceResetTestSurface, TEST_EMAIL } from '../lib/test-surface.js';

const db = getDb();
if (!db) { console.log('Ingen DATABASE_URL — exit'); process.exit(1); }

// Fäll-innehaven — leverantörsnamn EXAKT som i testavtalen (matchningen ska passera).
const HOLDINGS = [
  { supplier: 'Telia Sverige AB',               category: 'molnvaxel',    annual: 114_000, note: 'FÄLLA 1 · 24 mån → +12, fönstret missat' },
  { supplier: 'Bahnhof AB',                     category: 'bredband',     annual: 58_800,  note: 'FÄLLA 2 · rullande 3+3 (AKUT fönster)' },
  { supplier: 'Fortnox AB',                     category: 'saas-finance', annual: 21_600,  note: 'FÄLLA 3 · uppsägning i 30 DAGAR' },
  { supplier: 'GleSYS AB',                      category: 'serverhosting', annual: 46_800, note: 'FÄLLA 4 · äkta tills vidare + indexklausul' },
  { supplier: 'Nordic Managed IT Services AB',  category: 'it-support',   annual: 180_000, note: 'FÄLLA 5 · 36 mån, 6 mån varsel, +24' },
];

const { deleted } = await forceResetTestSurface();
console.log(`Testytan nollställd (${TEST_EMAIL}): ${deleted} rader bort.`);

for (const [i, h] of HOLDINGS.entries()) {
  await db`
    INSERT INTO invoice_analyses (
      fingerprint, pdf_hash, supplier, normalized_supplier, category,
      annual_cost, should_switch, route, user_email
    ) VALUES (
      ${'seed:avtal-testyta'}, ${`seed-avtal-${i + 1}`}, ${h.supplier}, ${h.supplier},
      ${h.category}, ${h.annual}, false, 'auto', ${TEST_EMAIL}
    )
    ON CONFLICT (fingerprint, pdf_hash) DO UPDATE
      SET supplier = EXCLUDED.supplier, category = EXCLUDED.category,
          annual_cost = EXCLUDED.annual_cost, contract_end_date = NULL, contract_terms_json = NULL
  `.catch(async (e) => {
    if (!/contract_terms_json/.test(e.message)) throw e;
    await db`ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS contract_terms_json JSONB`;
    return db`
      INSERT INTO invoice_analyses (fingerprint, pdf_hash, supplier, normalized_supplier, category, annual_cost, should_switch, route, user_email)
      VALUES (${'seed:avtal-testyta'}, ${`seed-avtal-${i + 1}`}, ${h.supplier}, ${h.supplier}, ${h.category}, ${h.annual}, false, 'auto', ${TEST_EMAIL})
      ON CONFLICT (fingerprint, pdf_hash) DO UPDATE SET supplier = EXCLUDED.supplier`;
  });
  console.log(`  ✓ ${h.supplier.padEnd(32)} ${h.category.padEnd(14)} — ${h.note}`);
}

// Magic-länk (24 h) rakt in i testrummet.
const token = randomBytes(32).toString('hex');
const expiresAt = new Date(Date.now() + 24 * 3600 * 1000);
await db`INSERT INTO magic_tokens (token, email, note, expires_at) VALUES (${token}, ${TEST_EMAIL}, ${'avtal-testyta-seed'}, ${expiresAt})`;

const url = `https://arvoflow.se/portfolio?magic=${token}`;
console.log('\n═══════ AVTALS-TESTYTAN ÄR KLAR ═══════');
console.log('Rum:', url);
console.log('Giltig 24 h · fem innehav i amber · ladda upp fäll-avtalen (test-pdfs/avtal/) på respektive innehav.');
console.log('Testa även FEL avtal på FEL innehav — leverantörsflaggan ska fyras.');
console.log('MAILA INTE testyta@inbox under passet (auto-reset nollar ytan).');
