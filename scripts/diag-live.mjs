// scripts/diag-live.mjs — verifierar den LIVE-utlagda Vercel-sajten (arvoflow.se) end-to-end:
// hämtar token → POSTar PDF:en till /api/test-invoice → skriver ut route + dom. Bevisar att
// fixen faktiskt är deployad, inte bara på main. Körs på Actions (HTTP-egress). Diagnostik.
import { readFileSync } from 'node:fs';

const BASE = process.env.ARVO_BASE_URL || 'https://arvoflow.se';
const pdfBase64 = readFileSync('test-pdfs/diag-bredband.pdf').toString('base64');

const tr = await fetch(`${BASE}/api/token`, { method: 'POST' });
const token = (await tr.json().catch(() => ({})))?.token ?? null;
console.log('token:', token ? 'OK' : 'SAKNAS');

const res = await fetch(`${BASE}/api/test-invoice`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ pdfBase64, industry: 'ovrigt', employees: 10, token }),
});
const data = await res.json().catch(() => ({}));

console.log('=== LIVE-RESULTAT (arvoflow.se) ===');
console.log('HTTP', res.status);
console.log(JSON.stringify({
  route:               data.route,
  reason:              data.reason,
  category:            data.categorized?.category,
  cached:              data.cached ?? false,
  billingPeriodAssumed: data.extracted?.billingPeriodAssumed,
  recommendationType:  data.recommendation?.recommendationType,
  requiresQuote:       data.recommendation?.requiresQuote,
  suggestedAnnualCost: data.recommendation?.suggestedAnnualCost,
  savingPerYear:       data.recommendation?.savingPerYear,
  error:               data.error,
}, null, 2));
