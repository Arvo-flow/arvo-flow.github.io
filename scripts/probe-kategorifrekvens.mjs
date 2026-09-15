#!/usr/bin/env node
// scripts/probe-kategorifrekvens.mjs — I VILKEN ORDNING SKA TYSTNADEN BRYTAS?
//
// ══ VARFÖR ══════════════════════════════════════════════════════════════════════════════════
// Grundarbeslut 2026-09-13 (den kommersiella doktrinen): *«Verifierade listpriser är inte vår
// vallgrav, men de är BROFÄSTET för att bygga den. Vi kan inte lansera 19 tysta kategorier.»*
//
// Ordningen ska inte väljas efter vilken prislista som är lättast att hitta — den ska följa
// **vad kunderna faktiskt skickar in**. En kategori som ingen kund har en faktura i kostar
// ingenting att låta tiga; en kategori som ligger högt i liggaren tystar rummet varje dag.
//
// Sonden svarar på exakt två frågor, per kategori:
//   1. Hur många fakturor har vi FAKTISKT sett? (`invoice_analyses`, kundvy-oberoende)
//   2. Talar kategorin redan? (`REVIDERADE_KATEGORIER` i lib/revision-gate.js — den enda sanningen)
//
// Den räknar ALDRIG ut vilken prislista som ska skrapas. Det är ett beslut som kräver en
// verifierbar publik SEK-källa, och den frågan besvaras av en människa med källan framför sig.
//
// EN SOND SOM INTE KOM FRAM ÄR INGET MÄTVÄRDE (SV-01..11): utan `DATABASE_URL` avslutar den 1.
// Ett tomt utfall får aldrig läsas som «inga fakturor».

import { getDb } from '../lib/db.js';
import { isAudited } from '../lib/revision-gate.js';

const db = getDb();
if (!db) {
  console.error('✗ Ingen DATABASE_URL — sonden kom aldrig fram. Detta är INTE ett mätvärde.');
  process.exit(1);
}

// liggare: internt: ops-mätning av kategorifrekvens — inget tal når en kundyta, och arkiverade
// rader räknas MED eftersom frågan är «vad har vi sett», inte «vad visar vi i dag».
const rader = await db`
  SELECT category,
         COUNT(*)::int                                  AS fakturor,
         COUNT(DISTINCT COALESCE(user_email, fingerprint))::int AS avsandare,
         MAX(created_at)                                AS senast
    FROM invoice_analyses
   WHERE category IS NOT NULL
     AND category <> 'uncategorized'
   GROUP BY category
   ORDER BY fakturor DESC
`;

if (rader.length === 0) {
  console.error('✗ Noll kategorier i liggaren — det är ett utfall om LIGGAREN, inte om kategorierna.');
  console.error('  En tom liggare kan inte rangordna något. Detta är INTE ett mätvärde.');
  process.exit(1);
}

const tysta = rader.filter((r) => !isAudited(r.category));
const talande = rader.filter((r) => isAudited(r.category));

console.log(`\n═══ KATEGORIFREKVENS · ${rader.length} kategorier i liggaren ═══\n`);
console.log('  TYSTA — rummet säger inget tal här, och det kostar en kund varje gång:\n');
if (tysta.length === 0) {
  console.log('    (inga — varje kategori med fakturor talar redan)\n');
} else {
  console.log('    fakturor  avsändare  senast       kategori');
  for (const r of tysta) {
    const d = new Date(r.senast).toISOString().slice(0, 10);
    console.log(`    ${String(r.fakturor).padStart(8)}  ${String(r.avsandare).padStart(9)}  ${d}   ${r.category}`);
  }
}

console.log('\n  TALAR REDAN (kontroll — listan ska stämma med REVIDERADE_KATEGORIER):\n');
console.log('    fakturor  avsändare  senast       kategori');
for (const r of talande) {
  const d = new Date(r.senast).toISOString().slice(0, 10);
  console.log(`    ${String(r.fakturor).padStart(8)}  ${String(r.avsandare).padStart(9)}  ${d}   ${r.category}`);
}

const tystaFakturor = tysta.reduce((s, r) => s + r.fakturor, 0);
const alla = rader.reduce((s, r) => s + r.fakturor, 0);
console.log(`\n  Fakturor i tysta kategorier: ${tystaFakturor} av ${alla}`
  + ` (${alla ? Math.round((tystaFakturor / alla) * 100) : 0} %)\n`);

// ⚠️ ANTALET ÄR EN AVLÄSNING AV LIGGAREN, ALDRIG AV MARKNADEN. Liggaren speglar vilka fakturor
// VI råkat få in — inte vad svenska småföretag har. En kategori som saknas här kan vara vanlig
// i verkligheten och ovanlig hos oss. Ordningen är alltså «var tystnaden kostar oss mest i dag»,
// vilket är rätt fråga för brofästet — men den får aldrig läsas som en marknadsandel.
console.log('  OBS: talen mäter VÅR liggare, aldrig marknaden. En kategori vi sällan ser kan');
console.log('  vara vanlig i verkligheten — ordningen säger var tystnaden kostar oss i dag.\n');
