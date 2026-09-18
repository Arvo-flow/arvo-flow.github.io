#!/usr/bin/env node
// ⚖️ MÄTER DEN REGULATORISKA GRÄNSEN: kan en försäkringsfaktura få något annat än karantänkortet?
// De leverantörsspecifika grenarna (elnät, webbhotell) ligger FÖRE registret i watchedCard.
import { watchedCard } from '../api/invoice-history.mjs';
import { tystnadsbesked } from '../lib/tystnadsskal.js';

const BOLAG = [
  'Länsförsäkringar AB', 'Länsförsäkringar Skåne', 'Trygg-Hansa Försäkring AB', 'If Skadeförsäkring AB',
  'Folksam ömsesidig sakförsäkring', 'Moderna Försäkringar', 'Dina Försäkringar Nord',
  'Svedea AB', 'Gjensidige Försäkring', 'Protector Forsikring ASA', 'Söderberg & Partners',
  'ICA Försäkring AB', 'Aktsam Försäkring', 'Anticimex Försäkringar AB', 'Nordeuropa Försäkring',
];
const SKAL = ['categorization_conflict','credit_note','el_data_missing','fingerprint_mismatch',
  'foreign_currency','implausible_amounts','natavgift','no_benchmark','price_anomaly',
  'sanity_check_failed','volume_data_required', null];
const KATEGORIER = ['forsakring-foretag', 'forsakring-ansvar'];

const vantat = new Set(KATEGORIER.map((k) => tystnadsbesked(k).rubrik));
const lackor = [];
let provade = 0;

for (const kategori of KATEGORIER) {
  for (const bolag of BOLAG) {
    for (const reason of SKAL) {
      for (const route of ['unsupported', 'review_queue']) {
        provade += 1;
        const k = watchedCard({ supplier: bolag, normalized_supplier: bolag.toLowerCase(),
          category: kategori, triage_reason: reason, route });
        if (!vantat.has(k.kind)) {
          const hela = `${k.headline} ${k.detail} ${k.action}`;
          const lovar = /vi bevakar(?![^.;,]*\binte\b)|hör av oss|återkommer|bevakar er|förbereder/i.test(hela);
          lackor.push({ bolag, kategori, reason, route, kind: k.kind, lovar, hela: hela.slice(0, 120) });
        }
      }
    }
  }
}

console.log(`\n⚖️  MÄTNING · kan en försäkringsfaktura undslippa karantänen?\n`);
console.log(`Prövade kombinationer: ${provade}  (${BOLAG.length} bolag × ${SKAL.length} skäl × 2 rutter × ${KATEGORIER.length} kategorier)`);
console.log(`Förväntad rubrik: ${[...vantat].join(' / ')}\n`);

if (lackor.length === 0) {
  console.log('✓ INGEN LÄCKA. Varje kombination gav karantänkortet.');
} else {
  console.log(`✗ ${lackor.length} KOMBINATIONER UNDSLAPP KARANTÄNEN:\n`);
  const grupper = new Map();
  for (const l of lackor) {
    const nyckel = `${l.kind} | reason=${l.reason} | lovar=${l.lovar}`;
    if (!grupper.has(nyckel)) grupper.set(nyckel, []);
    grupper.get(nyckel).push(l.bolag);
  }
  for (const [nyckel, bolag] of grupper) {
    console.log(`  ${nyckel}`);
    console.log(`    bolag: ${[...new Set(bolag)].join(', ')}`);
    console.log(`    text:  ${lackor.find((l) => `${l.kind} | reason=${l.reason} | lovar=${l.lovar}` === nyckel).hela}\n`);
  }
  const medLofte = lackor.filter((l) => l.lovar).length;
  console.log(`  varav med ett BEVAKNINGSLÖFTE i texten: ${medLofte}`);
}
