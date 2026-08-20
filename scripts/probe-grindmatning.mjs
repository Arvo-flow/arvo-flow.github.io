// scripts/probe-grindmatning.mjs — HUR OFTA LARMAR DE AVVÄPNADE GRINDARNA FALSKT?
//
// BAKGRUNDEN (obduktion 2026-08-20). Fyra integritetsgrindar är byggda, testade och
// dokumenterade — och avväpnade. Ingen sätter deras enforce-flagga någonstans:
//   BALANSKRAV_ENFORCE · PROJEKTIONSKRAV_ENFORCE · PROSAKRAV_ENFORCE · SCHEMAKRAV_ENFORCE
//
// Motiveringen i koden är genomgående "armeras när falsklarmsfrekvensen är uppmätt", daterad
// 2026-06-10. Mätningen gjordes aldrig — och bibeln förklarar varför: fixturkorpusen är författad
// på METRIC-nivå (belopp per rad), medan balanskravet dömer på EXTRAKTIONS-nivå (antal × à-pris).
// Korpusen kan alltså inte mäta det.
//
// Men extraktionsnivå-data FINNS: line_items_json på de lagrade analyserna. Det är verkliga rader
// ur verkliga fakturor, extraherade av den riktiga pipelinen. Den här sonden kör balanskravet över
// dem och räknar utfallet — så beslutet "armera eller inte" vilar på en siffra, inte på att ingen
// hunnit titta.
//
// SONDKONTRAKTET:
//   MÄTER:  hur många lagrade fakturarader balanskravet (B2) skulle fälla om det armerades, och
//           vilka de är. En hög andel betyder att grinden inte kan armeras som den ser ut.
//   MÄTER INTE: om en fälld rad är ett SANT fel eller ett falsklarm. Det kräver att någon läser
//           pappret. Sonden ger underlaget för den bedömningen, aldrig bedömningen.
//
// Inga skrivningar. E-post maskeras (publikt repo).
import { getDb } from '../lib/db.js';
import { aldrigTyst } from '../lib/sondvakt.js';
import { judgeLineArithmetic } from '../lib/extraction-integrity.js';

const db = getDb();
if (!db) { console.log('Ingen DATABASE_URL — exit 0'); process.exit(0); }

const rows = await aldrigTyst(db`
  SELECT id, created_at, normalized_supplier, supplier, category, line_items_json
  FROM invoice_analyses
  WHERE line_items_json IS NOT NULL
  ORDER BY created_at DESC
  LIMIT 500
`, 'läsning av invoice_analyses (radposter)');

console.log(`\n═══ BALANSKRAVET (B2) MOT VERKLIGA RADER · ${rows.length} fakturor med radposter ═══\n`);

let fakturorMedDom = 0, faktureorFallda = 0, raderDomda = 0, raderFallda = 0;
const skalRakning = new Map();

for (const r of rows) {
  let rader = r.line_items_json;
  if (typeof rader === 'string') { try { rader = JSON.parse(rader); } catch { rader = null; } }
  if (!Array.isArray(rader) || !rader.length) continue;

  const dom = judgeLineArithmetic({ lineItems: rader });
  if (dom.judged === 0) continue;              // ingen rad bar både antal och à-pris → ingen åsikt

  fakturorMedDom++;
  raderDomda += dom.judged;
  if (dom.violations.length) {
    faktureorFallda++;
    raderFallda += dom.violations.length;
    for (const v of dom.violations) {
      skalRakning.set(v.reason, (skalRakning.get(v.reason) ?? 0) + 1);
    }
    console.log(`  ✗ ${(r.normalized_supplier || r.supplier || '?').slice(0, 24).padEnd(24)} ${String(r.category).slice(0, 18).padEnd(18)} ${new Date(r.created_at).toISOString().slice(0, 10)}`);
    for (const v of dom.violations.slice(0, 3)) {
      console.log(`      «${String(v.line ?? '').slice(0, 46)}» väntat ${v.expected} · faktiskt ${v.actual} · ${v.reason}`);
    }
  }
}

console.log('\n' + '─'.repeat(72));
console.log(`fakturor med dömbara rader (antal OCH à-pris):  ${fakturorMedDom}`);
console.log(`rader dömda:                                    ${raderDomda}`);
console.log(`rader FÄLLDA:                                   ${raderFallda}`);
console.log(`fakturor som skulle STOPPAS om grinden armeras: ${faktureorFallda}`);
const andel = raderDomda > 0 ? (raderFallda / raderDomda * 100) : null;
console.log(`fällandeandel per rad:                          ${andel == null ? '— (inget underlag)' : andel.toFixed(1) + ' %'}`);
for (const [skal, n] of skalRakning) console.log(`   · ${skal}: ${n}`);
console.log('─'.repeat(72));
console.log('Tolkning: en LÅG andel betyder att grinden kan armeras — den skulle sällan stoppa en');
console.log('faktura. En HÖG andel betyder att den fäller korrekta fakturor och måste lagas först.');
console.log('Sonden avgör INTE vilket; den ger talet som beslutet ska vila på.');
