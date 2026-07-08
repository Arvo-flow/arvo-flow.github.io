// scripts/diag-avtal-live.mjs — C1:s E2E-PROV mot den LIVE-utlagda kedjan (arvoflow.se):
// grundarens fem fäll-avtal (test-pdfs/avtal/) körs genom den skarpa pipelinen
// (extractContract → acceptansgrind → villkorsbok → klocka → contract_end_date) och
// varje utfall MASKINDIFFAS mot det handlästa+handräknade facit. Guldmyntfoten
// (verifieringsplikten): den riktiga maskinen, aldrig en modell av den.
//
// Kör på Actions (HTTP-egress + Vercel-deployen hunnit ikapp). Diagnostik, ingen prod-kod.
import { readFileSync } from 'node:fs';

const BASE = process.env.ARVO_BASE_URL || 'https://arvoflow.se';

// Handläst ur avtalen + handräknat facit (frusna datumfält — dagräknare jämförs EJ,
// de skiftar med kördatum). renewals för FÄLLA 2 växer per kvartal → jämförs EJ.
const FACIT = [
  {
    pdf: 'test-pdfs/avtal/falla1-telia-touchpoint.pdf',
    label: 'FÄLLA 1 · Telia Touchpoint (24 mån → +12, fönstret missat)',
    expect: { status: 'window-open', currentPeriodEnd: '2027-07-01', deadline: '2027-04-01', regelKalla: 'avtalet' },
    applied: { avtalstidMan: 24, uppsagningstidMan: 3, uppsagningstidDagar: null, forlangningMan: 12, avtalsstart: '2024-07-01' },
  },
  {
    pdf: 'test-pdfs/avtal/falla2-bahnhof-3plus3.pdf',
    label: 'FÄLLA 2 · Bahnhof rullande 3+3 (AKUT fönster)',
    expect: { status: 'window-open', currentPeriodEnd: '2026-10-15', deadline: '2026-07-15', regelKalla: 'avtalet' },
    applied: { avtalstidMan: 3, uppsagningstidMan: 3, uppsagningstidDagar: null, forlangningMan: 3, avtalsstart: '2025-01-15' },
  },
  {
    pdf: 'test-pdfs/avtal/falla3-fortnox-30dagar.pdf',
    label: 'FÄLLA 3 · Fortnox årsvis (30 DAGAR — inte en månad)',
    expect: { status: 'window-open', currentPeriodEnd: '2026-08-15', deadline: '2026-07-16', regelKalla: 'avtalet' },
    applied: { avtalstidMan: 12, uppsagningstidMan: null, uppsagningstidDagar: 30, forlangningMan: 12, avtalsstart: '2025-08-15' },
  },
  {
    pdf: 'test-pdfs/avtal/falla4-glesys-tillsvidare.pdf',
    label: 'FÄLLA 4 · GleSYS äkta tills vidare (1 mån varsel)',
    expect: { status: 'rolling', deadline: null, regelKalla: 'avtalet' },   // currentPeriodEnd = idag+1 mån → jämförs EJ (kördatum)
    applied: { avtalstidMan: null, uppsagningstidMan: 1, uppsagningstidDagar: null, forlangningMan: null, avtalsstart: '2025-11-01' },
  },
  {
    pdf: 'test-pdfs/avtal/falla5-nordic-36man.pdf',
    label: 'FÄLLA 5 · Nordic Managed IT (36 mån, 6 mån varsel, +24)',
    expect: { status: 'window-open', currentPeriodEnd: '2028-03-01', deadline: '2027-09-01', regelKalla: 'avtalet' },
    applied: { avtalstidMan: 36, uppsagningstidMan: 6, uppsagningstidDagar: null, forlangningMan: 24, avtalsstart: '2025-03-01' },
  },
];

// 1 · Mynta ett analysId genom den vanliga fakturapipen (avtalsuppladdningen hänger på en analysrad).
const tr = await fetch(`${BASE}/api/token`, { method: 'POST' });
const token = (await tr.json().catch(() => ({})))?.token ?? null;
console.log('token:', token ? 'OK' : 'SAKNAS');

const invRes = await fetch(`${BASE}/api/test-invoice`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    pdfBase64: readFileSync('test-pdfs/diag-bredband.pdf').toString('base64'),
    industry: 'ovrigt', employees: 10, token,
  }),
});
const inv = await invRes.json().catch(() => ({}));
const analysisId = inv.analysisId ?? null;
console.log(`analys: HTTP ${invRes.status} · route ${inv.route} · analysisId ${analysisId ?? 'SAKNAS'}`);
if (!analysisId) { console.log('AVBRYTER — ingen analysrad att hänga avtalen på.'); process.exit(1); }

// 2 · Kör varje fäll-avtal genom den skarpa kedjan och diffa mot facit.
let pass = 0, fail = 0;
for (const c of FACIT) {
  console.log(`\n═══ ${c.label} ═══`);
  const res = await fetch(`${BASE}/api/contract-upload`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ analysisId, pdfBase64: readFileSync(c.pdf).toString('base64') }),
  });
  const data = await res.json().catch(() => ({}));
  if (!data.ok) {
    console.log(`  ✗ AVVISAD (HTTP ${res.status}): ${data.reason ?? data.error ?? 'okänt'}`);
    fail++; continue;
  }
  console.log(`  AI läste  → ${JSON.stringify(data.applied)}`);
  console.log(`  citat     → ${JSON.stringify(data.citat)}`);
  console.log(`  klockan   → status ${data.clock.status} · slut ${data.clock.currentPeriodEnd} · deadline ${data.clock.deadline} · regler: ${data.clock.regelKalla}`);
  const diffs = [];
  for (const [k, v] of Object.entries(c.expect)) {
    if (data.clock?.[k] !== v) diffs.push(`clock.${k}: väntade ${v}, fick ${data.clock?.[k]}`);
  }
  for (const [k, v] of Object.entries(c.applied)) {
    if ((data.applied?.[k] ?? null) !== v) diffs.push(`applied.${k}: väntade ${v}, fick ${data.applied?.[k] ?? null}`);
  }
  if (diffs.length === 0) { console.log('  ✓ MATCHAR FACIT'); pass++; }
  else { console.log('  ✗ AVVIKELSER:\n    ' + diffs.join('\n    ')); fail++; }
}

console.log(`\n═══ E2E-PROVETS DOM: ${pass}/${FACIT.length} fällor klarade mot facit ═══`);
process.exit(fail > 0 ? 1 : 0);
