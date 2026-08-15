// scripts/probe-ellevio-raden.mjs — SKREVS RADEN, ELLER SKREVS DEN UTAN IDENTITET?
//
// Läget: Ellevio-jobbet kördes om efter att nätavgifts-grinden fått sin storeTriaged, står nu
// `done` med ett försök — och rummet visar fortfarande nio fakturor av tio. Rotorsaksfixen var
// alltså inte tillräcklig, eller så var den inte rotorsaken.
//
// Två helt olika fel ser likadana ut i probe-bulk-jobb, som räknar rader per AVSÄNDARE:
//   (a) raden skrevs ALDRIG  → grinden nåddes inte, eller storeTriaged föll (anropet har en
//       sväljande catch, så ett fel där lämnar inget spår någonstans).
//   (b) raden skrevs UTAN identitet → user_email är null/annat, raden finns men når aldrig rummet.
// Åtgärderna är olika (fixa skrivningen vs fixa identiteten), så gissningen har ingen plats här.
//
// Sonden läser därför på LEVERANTÖR, inte på avsändare — den enda frågan som skiljer (a) från (b).
import { deklarera } from '../lib/sondkontrakt.js';
import { getDb } from '../lib/db.js';
import { kravKolumner, aldrigTyst } from '../lib/sondvakt.js';

deklarera({
  namn: 'probe-ellevio-raden',
  fangar: 'Om det finns någon rad i invoice_analyses för nätleverantören de senaste dygnen, oavsett vilken identitet den bär — och i så fall vilken väg, vilket triage-skäl och vilken (maskerad) e-post den nycklats på. Skiljer "aldrig skriven" från "skriven utan identitet".',
  blind: 'Sonden ser bara DATABASEN, och dess LEVERANTÖRSFILTER är blint för en faktura vars leverantör lästes som något annat — därför listas numera även alla färska rader utan filter. Nådde pipelinen aldrig fram till någon lagring — t.ex. för att extraktionen föll före kategoriseringen — ser det identiskt ut med en skrivning som kastades. Den skillnaden bor i Vercel-loggen för det interna anropet, inte här. Sonden vet heller inte vilken PDF drainen faktiskt matade in; den matchar på leverantörsnamn, så en faktura vars leverantör lästes som något annat är osynlig för den här frågan.',
});

const mask = (e) => { const [l, d] = String(e || '').split('@'); return d ? `${l.slice(0, 2)}***@${d}` : '(ingen/NULL)'; };

const db = getDb();
if (!db) { console.error('Ingen DATABASE_URL.'); process.exit(1); }

await kravKolumner(db, 'invoice_analyses',
  ['user_email', 'supplier', 'normalized_supplier', 'category', 'route', 'triage_reason', 'created_at', 'pdf_hash']);

const rader = await aldrigTyst(db`
  SELECT id, user_email, supplier, normalized_supplier, category, route, triage_reason,
         annual_cost, created_at, pdf_hash
  FROM invoice_analyses
  WHERE (supplier ILIKE '%ellevio%' OR normalized_supplier ILIKE '%ellevio%'
         OR supplier ILIKE '%elnät%' OR supplier ILIKE '%elnat%')
    AND created_at > NOW() - interval '3 days'
  ORDER BY created_at DESC
`, 'sökning efter nätleverantörsrader');

console.log(`\n═══ RADER FÖR NÄTLEVERANTÖREN (3 dygn): ${rader.length} ═══`);
for (const r of rader) {
  console.log(`  ${new Date(r.created_at).toISOString().slice(5, 19)}  ${mask(r.user_email).padEnd(24)}`
    + ` ${String(r.supplier).slice(0, 22).padEnd(22)} kat=${r.category ?? '—'} väg=${r.route}`
    + ` skäl=${r.triage_reason ?? '—'} pdf=${String(r.pdf_hash ?? '').slice(0, 8)}`);
}

if (!rader.length) {
  console.log('\n  ⛔ (a) INGEN RAD SKREVS. Grinden nåddes inte, eller storeTriaged föll tyst');
  console.log('     (anropet har en sväljande catch). Nästa avläsning är Vercel-loggen för');
  console.log('     det interna /api/test-invoice-anropet — inte ännu en gissning här.');
} else if (rader.every((r) => !r.user_email)) {
  console.log('\n  ⛔ (b) RADEN FINNS MEN SAKNAR IDENTITET — den kan aldrig nå kundens rum.');
  console.log('     Felet ligger i vad drainen skickar med, inte i om vi bokför.');
} else {
  console.log('\n  ✓ Rad med identitet finns. Når den inte rummet är felet i LÄSVÄGEN');
  console.log('    (invoice-history: triage-filter, route-lista eller identitetsgrinden).');
}

// ── VAD KÖN SVARADE, OCH VARFÖR DET FLYTTAR FRÅGAN (2026-08-15) ──────────────────────────────
// Med utfallet bokfört sa kön: `auto:saas-productivity`. Ellevio-fakturan går alltså ALDRIG via
// el-grenen — den kategoriseras som SaaS och tar huvudvägen, där storeAnalysis är en ren upsert
// som alltid returnerar ett id. pdf_hash är sha256 över råa bytes, så en krock är utesluten.
//
// Kvar står två möjligheter, och sondens leverantörsfilter kan inte skilja dem (dess deklarerade
// blindfläck): raden skrevs aldrig (INSERT kastade), eller raden finns under ett HELT ANNAT
// leverantörsnamn — vilket är precis vad en faktura läst som SaaS skulle få.
// Därför listas alla rader i fönstret utan filter. Tio rader = felet bor i LÄSVÄGEN eller i
// namnet; nio rader = skrivningen föll.
const alla = await aldrigTyst(db`
  SELECT id, user_email, supplier, normalized_supplier, category, route, annual_cost,
         created_at, pdf_hash
  FROM invoice_analyses
  WHERE created_at > NOW() - interval '3 days'
  ORDER BY created_at DESC LIMIT 40
`, 'läsning av alla färska rader');
console.log(`\n═══ ALLA RADER I FÖNSTRET (utan filter): ${alla.length} ═══`);
const perHash = new Map();
for (const r of alla) {
  perHash.set(r.pdf_hash, (perHash.get(r.pdf_hash) ?? 0) + 1);
  // id:t SKA skrivas ut: köns dom bär numera `·lagrad#<id>`, och matchningen mellan dem är hela
  // svaret. Jag hämtade kolumnen men glömde skriva den — en avläsning som inte når papperet är
  // ingen avläsning (samma klass av instrumentfel som sonden som rapporterade en sidstorlek).
  console.log(`  id=${String(r.id).padEnd(6)} ${new Date(r.created_at).toISOString().slice(5, 19)}  ${mask(r.user_email).padEnd(24)}`
    + ` ${String(r.supplier).slice(0, 24).padEnd(24)} kat=${String(r.category ?? '—').padEnd(18)}`
    + ` väg=${String(r.route).padEnd(12)} pdf=${String(r.pdf_hash ?? '').slice(0, 10)}`);
}
const dubbletter = [...perHash.entries()].filter(([, n]) => n > 1);
console.log(dubbletter.length
  ? `  ⚠️ ${dubbletter.length} pdf_hash förekommer mer än en gång — upserten kan ha slagit ihop rader`
  : '  ✓ varje pdf_hash är unik — ingen upsert har slagit ihop två fakturor');

// Kontrollfråga: hur ser en FUNGERANDE triagerad rad ut för samma avsändare? Utan jämförelsepunkt
// går det inte att se vad som skiljer — och det är skillnaden, inte raden, som bär svaret.
const triagerade = await aldrigTyst(db`
  SELECT user_email, supplier, category, route, triage_reason, created_at
  FROM invoice_analyses
  WHERE triage_reason IS NOT NULL AND created_at > NOW() - interval '3 days'
  ORDER BY created_at DESC LIMIT 12
`, 'läsning av triagerade rader');
console.log(`\n═══ ANDRA TRIAGERADE RADER (jämförelsepunkt): ${triagerade.length} ═══`);
for (const r of triagerade) {
  console.log(`  ${new Date(r.created_at).toISOString().slice(5, 19)}  ${mask(r.user_email).padEnd(24)}`
    + ` ${String(r.supplier).slice(0, 22).padEnd(22)} väg=${r.route} skäl=${r.triage_reason}`);
}
