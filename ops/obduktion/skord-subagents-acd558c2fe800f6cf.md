# Skörd: acd558c2fe800f6cf

> **OPRÖVAD.** Det här är agentens arbete, räddat ur harnessets transkript — inte ett
> bevisat fynd. Skörden visar att arbetet UTFÖRDES; om slutsatsen är sann avgörs av
> motprövning med ett körbart bevis, precis som för varje annan hypotes.

· körning: `subagents` · agent: `acd558c2fe800f6cf`
· slutsatser: 5 · körda kommandon: 33
· **bär analys**

## Uppdraget

```
(saknas i transkriptet)
```

## Vad agenten formulerade

### 1

I'll start by reading the bible and the target file.

### 2

Let me look at the related surfaces and tests in parallel.

### 3

Now let me write the initial notes file.

### 4

Strong findings. Let me record them.

### 5

You've hit your weekly limit · resets 8pm (UTC)

## Vad agenten faktiskt körde — de körbara bevisen

### Kommando 1

```bash
grep -rn "roomCounts" --include=*.js --include=*.mjs -l | head -20
```

```
src/lib/holdings.js
src/pages/Portfolio/index.js
tests/rumsredovisning.mjs
```

### Kommando 2

```bash
ls tests/ | head -80 && echo "---" && ls ops/obduktion/ 2>/dev/null
```

```
adobe-pricing.mjs
adobe-recommendation.mjs
adobe-rightsizing.mjs
avtal-fallor.mjs
balanskrav.mjs
bevakat-kort.mjs
branch-anchors.mjs
branchindex.mjs
briefinglage.mjs
business-intel.mjs
contract-clock.mjs
contract-intel.mjs
ct-ko.mjs
deadline-reminder.mjs
diagnos.mjs
domain-intel.mjs
domslut.mjs
dorrstat.mjs
el-intelligence.mjs
el-recommendation.mjs
enhetsantagandet.mjs
extract-simple-invoice.mjs
fakturanummer.mjs
fakturarader.mjs
fee.mjs
fixtures
forensics.mjs
fortnox-recommendation.mjs
fortnox.mjs
fraktjakt.mjs
google-workspace-recommendation.mjs
greeting.mjs
holdings.mjs
inbound-attachments.mjs
inbound-reply.mjs
ingest-bulk.mjs
jamforelsekalla.mjs
judgment-contract.mjs
kobokforing.mjs
korpusdiff.mjs
lasvagens-kolumner.mjs
lfl-produktionsvag.mjs
licensniva.mjs
loneadmin-recommendation.mjs
m365-rightsizing.mjs
market-movement.mjs
matriskrav.mjs
mattsystem.mjs
molnvaxel-recommendation.mjs
obduktion.mjs
outbound-identity.mjs
pastaendekontrakt.mjs
plan-pris.mjs
price-forecast.mjs
price-verdict.mjs
prisunderlag.mjs
property.mjs
radobservation.mjs
recommend-deterministic.mjs
recompute-shelfware.mjs
revisionsgrind.mjs
room-continuation.mjs
rumsidentitet.mjs
rumsredovisning.mjs
run.mjs
saas-avstamning.mjs
saas-like-for-like.mjs
saas-rad.mjs
saas-substitution.mjs
saas-tier-detection.mjs
sanity-verifier.mjs
schemakrav.mjs
scorekrav.mjs
session.mjs
shelfware.mjs
skordkontrakt.mjs
sondkontrakt.mjs
sondvakt.mjs
spiris-recommendation.mjs
spiris.mjs
---
skord-wf_3484bcdd-2c-a0c254b3fe03acdef.md
skord-wf_3484bcdd-2c-a0cd15a1a599de874.md
skord-wf_3484bcdd-2c-a1342b2c363a04803.md
skord-wf_3484bcdd-2c-a16aa8affcc57b6f8.md
skord-wf_3484bcdd-2c-a1d808ffc9b67ef27.md
skord-wf_3484bcdd-2c-a1df544331a5ceec6.md
skord-wf_3484bcdd-2c-a1f433f0574594c1b.md
skord-wf_3484bcdd-2c-a2061440baafb4469.md
skord-wf_3484bcdd-2c-a21801fcb13e78402.md
skord-wf_3484bcdd-2c-a2285bf51a23dff33.md
skord-wf_3484bcdd-2c-a315ec0f9f58dce8d.md
skord-wf_3484bcdd-2c-a3424c66d4930e100.md
skord-wf_3484bcdd-2c-a37d4d7690a6c0f48.md
skord-wf_3484bcdd-2c-a493d23e2160f2007.md
skord-wf_3484bcdd-2c-a4c0e5480d4405af3.md
skord-wf_3484bcdd-2c-a4ca654a003bd5172.md
skord-wf_3484bcdd-2c-a506c4193a767e115.md
skord-wf_3484bcdd-2c-a598ddc0245a361da.md
skord-wf_3484bcdd-2c-a610f8b6aa450a291.md
skord-wf_3484bcdd-2c-a6b99e5974b42a468.md
skord-wf_3484bcdd-2c-a6c5c714524e6b957.md
skord-wf_3484bcdd-2c-a6cf935e5280ab9e4.md
skord-wf_3484bcdd-2c-a733822388ad3a05a.md
skord-wf_3484bcdd-2c-a7400c9b1ffa81aa2.md
skord-wf_3484bcdd-2c-a79caa4015ef9c984.md
skord-wf_3484bcdd-2c-a7c37260e4cfc78a0.md
skord-wf_3484bcdd-2c-a987731de17ae6bf3.md
skord-wf_3484bcdd-2c-aa6d7c1c2e658af81.md
skord-wf_3484bcdd-2c-ab19533b6f8c8c057.md
skord-wf_3484bcdd-2c-ab7329ac03527372d.md
skord-wf_3484bcdd-2c-abf877f0cff604453.md
skord-wf_3484bcdd-2c-ac80c9decfd73f748.md
skord-wf_3484bcdd-2c-ace7f948656849f46.md
skord-wf_3484bcdd-2c-ad58e2e3fe85d0dec.md
skord-wf_3484bcdd-2c-ad69c815abcc253f6.md
skord-wf_3484bcdd-2c-ad81b259e8d296b22.md
skord-wf_3484bcdd-2c-ae5
```

### Kommando 3

```bash
grep -n "roomCounts" -A 60 /home/user/arvo-flow.github.io/src/lib/holdings.js | head -100
```

```
112:export function roomCounts({ autoAnalyses = [], watched = [] } = {}) {
113-  const analyserade = autoAnalyses.length;
114-  const bevakade = watched.length;
115-  // ── «PRISSATT» BETYDER SAMMA SAK SOM I KORTET (2026-08-21, ur regel 8-genomgången) ─────────
116-  // Räknaren sa `prissatta = autoAnalyses.length` — alltså varje auto-rad, oavsett om den fick
117-  // ett pris. Kortet dömer på något annat: utan `prisunderlag` skriver det «Mottagen». En rad
118-  // rummet självt märker MOTTAGEN räknades alltså som PRISSATT i rubriken ovanför den. Två
119-  // sanningar om samma fråga (regel 1), och den kundsynliga använde den lösare.
120-  //
121-  // Gapet var litet förr och växte av mitt eget arbete samma dag: totalgrinden nollar bytet när
122-  // kohortdatan är en totalsumma, och `ovissNiva` håller tillbaka scoren när produktnivån inte
123-  // är bekräftad. Båda ger auto-rader UTAN prisunderlag — alltså fler «Mottagen» som räknades
124-  // som prissatta. En fix som gör ett gammalt redovisningsfel vanligare måste stänga det också.
125-  const prissatta = autoAnalyses.filter((a) => a?.prisunderlag != null).length;
126-  const mottagna = analyserade - prissatta;
127-  // `fakturor` är oförändrad (analyserade + bevakade) — invarianten prissatt + bevakat = totalt
128-  // gäller nu med mottagna inräknade, och RR-01 prövar den formen.
129-  return { fakturor: analyserade + bevakade, analyserade, prissatta, mottagna, bevakade };
130-}
131-
132-export function groupBySupplier(analyses) {
133-  const groups = new Map();
134-  for (const a of analyses ?? []) {
135-    const key = `${supplierName(a).trim().toLowerCase()}|${String(a.category || '').toLowerCase()}`;
136-    const g = groups.get(key);
137-    if (!g) groups.set(key, { key, latest: a, count: 1 });
138-    else {
139-      g.count += 1;
140-      if (new Date(a.created_at) > new Date(g.latest.created_at)) g.latest = a;
141-    }
142-  }
143-  return [...groups.values()].sort((x, y) => (y.latest.net_saving ?? 0) - (x.latest.net_saving ?? 0));
144-}
145-
146-// ── ARVO BEDÖMER: domens prosa ─────────────────────────────────────────────────────────────
147-// Flyttad hit från Portfolio 2026-08-19 så den kan prövas direkt av sviten. Se SK-08.
148-export function buildReasoning(a) {
149-  const meta = getCategoryMeta(a.category);
150-  const label = (meta?.label ?? a.category).toLowerCase();
151-  if (a.route === 'monitoring')
152-    return `Avtalet är tidsbegränsat. Arvo bevakar och förbereder bytet inför förnyelsen — ni betalar konkurrenskraftigt till dess.`;
153-  if (a.route === 'review_queue')
154-    return `Kategorin kräver manuell granskning — Arvo inhämtar offert för exakt prisjämförelse. Ni kontaktas när det är klart.`;
155-  if (a.should_switch && (a.net_saving ?? 0) > 0) {
156-    const ovPct = a.annual_cost > 0 && a.suggested_annual_cost > 0
157-      ? Math.round((a.annual_cost - a.suggested_annual_cost) / a.annual_cost * 100) : 0;
158-    // ── "MARKNADSPRIS" ÄR ETT PÅSTÅENDE VI
```

### Kommando 4

```bash
wc -l src/lib/holdings.js src/pages/Portfolio/index.js tests/rumsredovisning.mjs tests/bevakat-kort.mjs tests/branch-anchors.mjs lib/prisunderlag.js lib/licensniva.js
```

```
   208 src/lib/holdings.js
  1911 src/pages/Portfolio/index.js
   313 tests/rumsredovisning.mjs
   118 tests/bevakat-kort.mjs
   231 tests/branch-anchors.mjs
   135 lib/prisunderlag.js
   108 lib/licensniva.js
  3024 total
```

### Kommando 5

```bash
grep -n "getAnalysesByEmail\|getAnalysesByFingerprint" -A 45 lib/invoice-store.js | head -140
```

```
229:export async function getAnalysesByFingerprint(fingerprint, { limit = 30 } = {}) {
230-  const db = getDb();
231-  if (!db) return [];
232-  const hashedFp = hashFp(fingerprint);
233-  try {
234-    return await db`
235-      SELECT
236-        id, supplier, normalized_supplier, category,
237-        annual_cost, suggested_annual_cost, gross_saving, net_saving,
238-        should_switch, route, industry, employees, billing_period, created_at,
239-        seat_count, price_per_seat_monthly, lead_finding_json, contract_end_date, health_score, triage_reason, contract_terms_json, invoice_number, line_items_json
240-      FROM invoice_analyses
241-      WHERE fingerprint = ${hashedFp}
242-      ORDER BY created_at DESC
243-      LIMIT ${limit}
244-    `;
245-  } catch (forsta) {
246-    // LÄK FÖRST. En saknad valfri kolumn är ett schemafel, inte ett skäl att visa kunden ett
247-    // sämre rum. Lyckas läkningen kör vi om den FULLA satsen och kunden märker ingenting.
248-    if (await lakSaknadeKolumner(db)) {
249-      try {
250-        return await db`
251-          SELECT
252-            id, supplier, normalized_supplier, category,
253-            annual_cost, suggested_annual_cost, gross_saving, net_saving,
254-            should_switch, route, industry, employees, billing_period, created_at,
255-            seat_count, price_per_seat_monthly, lead_finding_json, contract_end_date, health_score, triage_reason, contract_terms_json, invoice_number, line_items_json
256-          FROM invoice_analyses
257-          WHERE fingerprint = ${hashedFp}
258-          ORDER BY created_at DESC
259-          LIMIT ${limit}
260-        `;
261-      } catch (efterLakning) {
262-        console.error('[invoice-store] full läsning föll även efter läkning:', efterLakning.message);
263-      }
264-    }
265-    // Reserven är sista utvägen och kostar rummet sin kvalitet — den får aldrig vara tyst.
266-    console.error('[invoice-store] DEGRADERAD LÄSNING (fingerprint): utan health_score, fynd och '
267-      + 'triage-skäl. Rummet visar fallback-score. Ursprungsfel:', forsta.message);
268-    try {
269-      return await db`
270-        SELECT
271-          id, supplier, normalized_supplier, category,
272-          annual_cost, suggested_annual_cost, gross_saving, net_saving,
273-          should_switch, route, industry, employees, billing_period, created_at,
274-          seat_count, price_per_seat_monthly
--
287:      console.error('[invoice-store] getAnalysesByFingerprint failed:', err.message);
288-      throw new Error(`Kunde inte läsa analyser via fingerprint (${err.message}) — tomt är inte ett svar här.`);
289-    }
290-  }
291-}
292-
293-/**
294- * E-postnycklad historik — kontorets dörr för mail-in-kunder.
295- * Anropas ALDRIG direkt med ett email-värde från klienten: e-posten ska
296- * komma ur en validerad magic token (se api/invoice-history.mjs).
297- */
298:export async function getAnalysesByEmail(email, { limit = 30 } = {}) {
299-  const db = getD
```

### Kommando 6

```bash
node -e "
import('./lib/benchmark.js').then(async (m) => {
  for (const cat of ['loneadmin','saas-productivity','mobil','bredband']) {
    for (const emp of [5, 12, 40, 200]) {
      const b = m.getPublicListBenchmark({ category: cat, employees: emp });
      console.log(cat, 'emp='+emp, b ? JSON.stringify({median:b.median,p25:b.p25,src:b.source,lv:b.lastVerified,rp:b.referensProdukt}) : null);
    }
  }
});
"
```

```
loneadmin emp=5 {"median":778,"p25":778,"src":"real-public","lv":"2026-05-22","rp":"Fortnox Lön"}
loneadmin emp=12 {"median":419,"p25":419,"src":"real-public","lv":"2026-05-22","rp":"Fortnox Lön"}
loneadmin emp=40 {"median":419,"p25":419,"src":"real-public","lv":"2026-05-22","rp":"Fortnox Lön"}
loneadmin emp=200 {"median":324,"p25":324,"src":"real-public","lv":"2026-05-22","rp":"Fortnox Lön"}
saas-productivity emp=5 {"median":1927,"p25":1606,"src":"real-public","lv":"2026-08-24","rp":"Microsoft 365 Business Standard"}
saas-productivity emp=12 {"median":1927,"p25":1606,"src":"real-public","lv":"2026-08-24","rp":"Microsoft 365 Business Standard"}
saas-productivity emp=40 {"median":1927,"p25":1606,"src":"real-public","lv":"2026-08-24","rp":"Microsoft 365 Business Standard"}
saas-productivity emp=200 {"median":1927,"p25":1606,"src":"real-public","lv":"2026-08-24","rp":"Microsoft 365 Business Standard"}
mobil emp=5 {"median":3588,"p25":3228,"src":"real-public","lv":"2026-08-24","rp":"Tele2 Företag mobilabonnemang"}
mobil emp=12 {"median":3588,"p25":3228,"src":"real-public","lv":"2026-08-24","rp":"Tele2 Företag mobilabonnemang"}
mobil emp=40 {"median":3588,"p25":3228,"src":"real-public","lv":"2026-08-24","rp":"Tele2 Företag mobilabonnemang"}
mobil emp=200 {"median":3588,"p25":3228,"src":"real-public","lv":"2026-08-24","rp":"Tele2 Företag mobilabonnemang"}
bredband emp=5 null
bredband emp=12 null
bredband emp=40 null
bredband emp=200 null
```

### Kommando 7

```bash
grep -n "branchAnchor\|prisunderlag\|ingesting\|ingestFailed\|frånDennaEnhet\|mottagna\|roomCounts\|arvoScore\|vakt\b" src/pages/Portfolio/index.js | head -60
```

```
14:import { groupBySupplier, supplierName, supplierDiagScore, computeActing, roomCounts } from '../../lib/holdings';
221:  const [branchAnchors, setBranchAnchors] = useState({});
225:  const [vakt, setVakt] = useState(null);
226:  const [ingesting, setIngesting] = useState(0);   // fakturor på väg (köade, ej klara) → "analyserar N"
227:  const [ingestFailed, setIngestFailed] = useState(0);   // fakturor som föll → ärligt bortfalls-besked
228:  const [ingestFailedFiles, setIngestFailedFiles] = useState([]);   // namnen på de fallna
279:    setBranchAnchors(data.branchAnchors ?? {});
283:    setVakt(data.vakt ?? null);
284:    setIngesting(data.ingesting ?? 0);
285:    setIngestFailed(data.ingestFailed ?? 0);
286:    setIngestFailedFiles(data.ingestFailedFiles ?? []);
287:    setFranDennaEnhet(Number(data.frånDennaEnhet) || 0);
325:    if (ingesting <= 0) return undefined;
328:  }, [ingesting, loadOffice]);
535:  const counts = useMemo(() => roomCounts({ autoAnalyses, watched: watched ?? [] }), [autoAnalyses, watched]);
573:  const arvoScore    = computeArvoScore(suppliers);
574:  const standing     = marketStanding(arvoScore);
622:  const branchAnchor = useMemo(() => {
626:      const an = branchAnchors[g.latest.category];
632:  }, [featured, publicFeatured, suppliers, branchAnchors]);
669:    rows.push({ tag: 'Bevakar', what: vakt?.sweptAt
670:      ? <>{vakt.streakNights >= 2
671:            ? <><b>{vakt.streakNights} nätter i rad</b> utan ett avbrott i bevakningen. </>
673:          {vakt.allClear
685:      const _vagda = roomCounts({ autoAnalyses, watched: watched ?? [] }).prissatta;
701:  }, [suppliers.length, autoAnalyses.length, latestDate, vakt, featured, roomMovement, roomForecast, roomClock]);
774:        {ingestFailed > 0 && (
779:            <strong style={{ color: '#F5B45A' }}>{ingestFailed} {ingestFailed === 1 ? 'faktura kunde' : 'fakturor kunde'} inte läsas in.</strong>{' '}
781:            {ingestFailedFiles.length > 0 && (
783:                {ingestFailedFiles.map((f, i) => (
796:                {retrying ? 'Kör om…' : `Försök igen — Arvo kör om ${ingestFailed === 1 ? 'den' : 'dem'} åt er`}
839:                        {vakt?.sweptAt
840:                          ? new Date(vakt.sweptAt).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
843:                      <span className="dial-k">{vakt?.sweptAt ? 'senaste svep' : 'bevakning aktiv'}</span>
858:                      från mottagna (2026-08-21) — helhetskravets kärna: varje tal i en yta ska
860:                  <div className="rstat"><span>{(counts.bevakade > 0 || counts.mottagna > 0) ? 'Prissatta' : 'Fakturor'}</span><span className="v">{counts.prissatta}</span></div>
873:                    <span>{vakt?.sweptAt
874:                      ? <>{vakt.sources ? <><b>{vakt.sources} marknadskällor</b> svepta</> : <>Marknaden svept</>}
875:                          {vakt.allClear ? ' · allt lugnt' : ''}</>
919:                  <span className="idx-num">{arvoScore 
```

### Kommando 8

```bash
grep -rn "storeTriaged" lib/*.js api/*.mjs | head -20; echo "---"; grep -n "export async function storeTriaged" -A 60 lib/invoice-store.js
```

```
lib/ingest-queue.js:172:  // Triage-vägarna returnerar inget id (storeTriaged svarar inte till klienten), så markören
lib/invoice-store.js:12:export async function storeTriaged({ fingerprint, pdfHash, supplier, category, route, reason, userEmail, invoiceNumber = null }) {
lib/invoice-store.js:65:      console.warn('[invoice-store] storeTriaged: självläkte triage_reason-kolumnen och lagrade med skäl');
lib/invoice-store.js:76:      } catch (e3) { console.error('[invoice-store] storeTriaged failed:', e3.message); return null; }
api/test-invoice.mjs:29:import { storeAnalysis, storeTriaged } from '../lib/invoice-store.js';
api/test-invoice.mjs:329:// Alla tretton storeTriaged-anrop hade `.catch(() => {})`. Avsikten var rätt — en faktura ska
api/test-invoice.mjs:335:const bokforFel = (err) => console.error('[test-invoice] storeTriaged misslyckades:', err?.message ?? err);
api/test-invoice.mjs:599:      await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, supplier: extracted.supplier, category: extracted.category ?? null,
api/test-invoice.mjs:666:      await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, supplier: extracted.supplier, category: extracted.category ?? null,
api/test-invoice.mjs:692:        await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, supplier: extracted.supplier, category: extracted.category ?? null,
api/test-invoice.mjs:756:      await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, supplier: extracted.supplier, category: extracted.category ?? null,
api/test-invoice.mjs:775:      await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, supplier: extracted.supplier, category: extracted.category ?? null,
api/test-invoice.mjs:837:        await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, supplier: extracted.supplier, category: categorized.category ?? null,
api/test-invoice.mjs:885:          await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, supplier: extracted.supplier, category: categorized.category ?? null,
api/test-invoice.mjs:914:        await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, supplier: extracted.supplier, category: categorized.category ?? null,
api/test-invoice.mjs:1134:      await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, supplier: extracted.supplier, category: categorized.category ?? null,
api/test-invoice.mjs:1170:      await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, supplier: extracted.supplier, category: categorized.category ?? null,
api/test-invoice.mjs:1207:        await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, supplier: extracted.supplier,
api/test-invoice.mjs:1298:        await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, supplier: extr
```

### Kommando 9

```bash
grep -n "storeTriaged" -A 3 api/test-invoice.mjs | grep -o "route: *'[a-z_]*'" | sort | uniq -c
```

```
     15 route: 'review_queue'
      4 route: 'unsupported'
```

### Kommando 10

```bash
grep -n "storeTriaged" -A 4 api/test-invoice.mjs | grep -o "reason: *[^,]*" | sort -u
```

```
reason: 'categorization_conflict'
reason: 'credit_note'
reason: 'el_data_missing'
reason: 'fingerprint_mismatch'
reason: 'foreign_currency'
reason: 'implausible_amounts'
reason: 'natavgift'
reason: 'no_benchmark'
reason: 'price_anomaly'
reason: 'sanity_check_failed'
reason: 'volume_data_required'
reason: `foreign_currency:${extracted.currency}`
reason: routing.reason
reason: routing.reason ?? 'out_of_scope'
```

### Kommando 11

```bash
node -e "
import('./api/invoice-history.mjs').then(({ watchedCard }) => {
  const reasons = ['categorization_conflict','credit_note','el_data_missing','fingerprint_mismatch','foreign_currency','implausible_amounts','natavgift','no_benchmark','price_anomaly','sanity_check_failed','volume_data_required','foreign_currency:USD','out_of_scope','review_queue','unsupported'];
  for (const r of reasons) {
    const c = watchedCard({ triage_reason: r, route: 'review_queue', supplier: 'Kraftringen Nät AB' });
    console.log((r+'                       ').slice(0,26), '|', c.kind, '|', c.headline);
  }
});
"
```

```
categorization_conflict    | Våra kontroller sa emot varandra | Vi blev inte överens med oss själva om vad fakturan är
credit_note                | Kreditnota | En kreditfaktura — ingen kostnad att prissätta
el_data_missing            | Under granskning | Mottagen — men vi stoppade prissättningen
fingerprint_mismatch       | Våra kontroller sa emot varandra | Vi blev inte överens med oss själva om vad fakturan är
foreign_currency           | Internationell SaaS | Prissatt i utländsk valuta — vi gissar aldrig kursen
implausible_amounts        | Beloppskontroll | Beloppen bär ett troligt format-/valutafel
natavgift                  | Under granskning | Mottagen — men vi stoppade prissättningen
no_benchmark               | Ej prissatt kategori | Mottagen och klassad — men utan verifierat golv att prissätta mot
price_anomaly              | Under granskning | Mottagen — men vi stoppade prissättningen
sanity_check_failed        | Under granskning | Mottagen — men vi stoppade prissättningen
volume_data_required       | Under granskning | Mottagen — men vi stoppade prissättningen
foreign_currency:USD       | Internationell SaaS | Prissatt i utländsk valuta — vi gissar aldrig kursen
out_of_scope               | Ej prissatt kategori | Mottagen och klassad — men utan verifierat golv att prissätta mot
review_queue               | Under granskning | Mottagen — men vi stoppade prissättningen
unsupported                | Under granskning | Mottagen — men vi stoppade prissättningen
```

### Kommando 12

```bash
node -e "
import('./api/invoice-history.mjs').then(({ watchedCard }) => {
  const cases = [
    ['Ellevio AB','natavgift'], ['Kraftringen Nät AB','natavgift'], ['Jönköping Energi Nät AB','natavgift'],
    ['Leonardo Consulting AB','no_benchmark'], ['Pantheon Media','no_benchmark'], ['Neonode AB','no_benchmark'],
    ['Simeon Städ AB','no_benchmark'], ['Aeon Retail','review_queue'],
    ['Tidningen Affärsvärlden.se','no_benchmark'], ['bokio.se','no_benchmark'],
    ['Slack Technologies','fingerprint_mismatch'], ['Slack Technologies','review_queue'],
    ['Boxer TV','review_queue'], ['Sandvik Coromant','review_queue'],
  ];
  for (const [sup, r] of cases) {
    const c = watchedCard({ triage_reason: r, route: 'review_queue', supplier: sup });
    console.log((sup+'                             ').slice(0,30), (r+'            ').slice(0,24), '=>', c.kind);
  }
});
"
```

```
Ellevio AB                     natavgift             => Reglerad nätkostnad
Kraftringen Nät AB             natavgift             => Under granskning
Jönköping Energi Nät AB        natavgift             => Under granskning
Leonardo Consulting AB         no_benchmark             => Reglerad nätkostnad
Pantheon Media                 no_benchmark             => Reglerad nätkostnad
Neonode AB                     no_benchmark             => Reglerad nätkostnad
Simeon Städ AB                 no_benchmark             => Reglerad nätkostnad
Aeon Retail                    review_queue             => Reglerad nätkostnad
Tidningen Affärsvärlden.se     no_benchmark             => Fragmenterad marknad
bokio.se                       no_benchmark             => Fragmenterad marknad
Slack Technologies             fingerprint_mismatch     => Våra kontroller sa emot varandra
Slack Technologies             review_queue             => Internationell SaaS
Boxer TV                       review_queue             => Under granskning
Sandvik Coromant               review_queue             => Under granskning
```

### Kommando 13

```bash
node -e "
import('./api/invoice-history.mjs').then(({ watchedCard }) => {
  for (const [sup, r, cat] of [['Vattenfall AB','el_data_missing','el'],['Vattenfall Försäljning AB','volume_data_required','el'],['E.ON Energilösningar','no_benchmark','el'],['E.ON Försäljning Sverige AB','el_data_missing','el']]) {
    const c = watchedCard({ triage_reason: r, route: 'review_queue', supplier: sup, category: cat });
    console.log(sup, '|', r, '=>', c.kind, '|', c.headline, '|', c.detail);
  }
});
"
```

```
Vattenfall AB | el_data_missing => Reglerad nätkostnad | Elnätet går inte att byta — men vi bevakar tariffen | Elnätsavgiften är en reglerad monopolkostnad utan marknad att byta till. Att lova en besparing vore oärligt.
Vattenfall Försäljning AB | volume_data_required => Reglerad nätkostnad | Elnätet går inte att byta — men vi bevakar tariffen | Elnätsavgiften är en reglerad monopolkostnad utan marknad att byta till. Att lova en besparing vore oärligt.
E.ON Energilösningar | no_benchmark => Reglerad nätkostnad | Elnätet går inte att byta — men vi bevakar tariffen | Elnätsavgiften är en reglerad monopolkostnad utan marknad att byta till. Att lova en besparing vore oärligt.
E.ON Försäljning Sverige AB | el_data_missing => Reglerad nätkostnad | Elnätet går inte att byta — men vi bevakar tariffen | Elnätsavgiften är en reglerad monopolkostnad utan marknad att byta till. Att lova en besparing vore oärligt.
```

### Kommando 14

```bash
node -e "
import('./api/invoice-history.mjs').then(({watchedCard})=>{
  for (const r of ['lineSum mismatch','lineSum','radsumma 100 ≠ 200','linesum'])
    console.log(JSON.stringify(r), '=>', watchedCard({triage_reason:r,route:'review_queue',supplier:'Okänd AB'}).kind);
});"
```

```
"lineSum mismatch" => Under granskning
"lineSum" => Under granskning
"radsumma 100 ≠ 200" => Fakturan går inte ihop
"linesum" => Under granskning
```

### Kommando 15

```bash
grep -rn "lineSum" --include=*.js --include=*.mjs . | grep -v node_modules | head -20
```

```
./agents/test-invoice/extract.js:1063:    const lineSum = (extracted.lineItems ?? []).reduce((s, l) => s + (l.amount ?? 0), 0);
./agents/test-invoice/extract.js:1064:    if (extracted.invoiceTotal > 0 && lineSum > 0) {
./agents/test-invoice/extract.js:1065:      const diff      = Math.abs(lineSum - extracted.invoiceTotal);
./agents/test-invoice/extract.js:1082:      const forklarar = (v) => Math.abs(lineSum * (1 + v) - extracted.invoiceTotal) <= tolerance;
./agents/test-invoice/extract.js:1093:        emit('radsumma', 'ok', `radsumman stämmer mot fakturatotalen (${lineSum.toLocaleString('sv-SE')} kr)`);
./agents/test-invoice/extract.js:1105:          `radsumma ${lineSum.toLocaleString('sv-SE')} kr ≠ fakturatotal ${extracted.invoiceTotal.toLocaleString('sv-SE')} kr`);
./agents/test-invoice/extract.js:1108:          reason: `Ring1: radsumma ${lineSum.toLocaleString('sv-SE')} kr ≠ fakturatotal ${extracted.invoiceTotal.toLocaleString('sv-SE')} kr (avvikelse ${diff.toLocaleString('sv-SE')} kr)`,
./api/invoice-history.mjs:312:  } else if (reason.includes('lineSum') || reason.includes('radsumma') || reason.includes('≠')) {
./tests/obduktion.mjs:226:    // lineSum 9 400, total 10 000 → glapp 600 (6,4 %). Tolerans = 300. 6 % förklarar; 25 % inte.
```

### Kommando 16

```bash
grep -n "pendingCountBySender\|failedCountBySender\|failedFilesBySender" -A 22 lib/ingest-queue.js | head -80
```

```
214:export async function pendingCountBySender(sender) {
215-  const db = getDb();
216-  if (!db || !sender) return 0;
217-  try {
218-    const [r] = await db`SELECT COUNT(*)::int AS n FROM ingest_jobs WHERE sender=${sender} AND status IN ('pending','processing')`;
219-    return r?.n ?? 0;
220-  } catch { return 0; }
221-}
222-
223-// Hur många fakturor FÖLL (efter alla omtag) för en identitet — driver rummets ärliga bortfalls-besked.
224-// Tyst tapp är oacceptabelt: kunden ska veta att N inte gick igenom, inte tro att de finns.
225:export async function failedCountBySender(sender) {
226-  const db = getDb();
227-  if (!db || !sender) return 0;
228-  try {
229-    const [r] = await db`SELECT COUNT(*)::int AS n FROM ingest_jobs WHERE sender=${sender} AND status='failed'`;
230-    return r?.n ?? 0;
231-  } catch { return 0; }
232-}
233-
234-// De fallna fakturornas FILNAMN — så kunden ser EXAKT vilka, inte bara "N stycken".
235:export async function failedFilesBySender(sender, { limit = 25 } = {}) {
236-  const db = getDb();
237-  if (!db || !sender) return [];
238-  try {
239-    const rows = await db`
240-      SELECT filename FROM ingest_jobs WHERE sender=${sender} AND status='failed'
241-      ORDER BY created_at DESC LIMIT ${limit}`;
242-    return rows.map((r) => r.filename).filter(Boolean);
243:  } catch (err) { console.error('[ingest-queue] failedFilesBySender:', err.message); return []; }
244-}
245-
246-// "Försök igen": återställ fallna jobb → pending (attempts=0) så drain-cronen kör om dem. Vi har kvar
247-// email_id + bilage-index, så PDF:en hämtas på nytt ur Resend — kunden behöver inte skicka något mejl.
248-// Återhämtar transienta fel (kredit-slut, timeout, glitch). En äkta bild-/icke-faktura faller igen.
249-export async function retryFailedBySender(sender) {
250-  const db = getDb();
251-  if (!db || !sender) return 0;
252-  try {
253-    const rows = await db`
254-      UPDATE ingest_jobs SET status='pending', attempts=0, error=NULL, claimed_at=NULL
255-      WHERE sender=${sender} AND status='failed'
256-      RETURNING id`;
257-    if (rows.length) await markPending();        // omköade jobb är också arbete
258-    return rows.length;
259-  } catch (err) {
260-    console.error('[ingest-queue] retryFailedBySender:', err.message);
261-    return 0;
262-  }
263-}
```

### Kommando 17

```bash
grep -n "counts\." src/pages/Portfolio/index.js
```

```
734:        ? <>Vi jämförde <b>{counts.prissatta} {plural(counts.prissatta, 'faktura', 'fakturor')}</b> mot verifierat publikt listpris.
737:        : <>Vi jämförde <b>{counts.prissatta} {plural(counts.prissatta, 'faktura', 'fakturor')}</b> mot verifierat publikt listpris.
740:      ? <>Vi jämförde <b>{counts.prissatta} {plural(counts.prissatta, 'faktura', 'fakturor')}</b> mot verifierat publikt listpris.
744:      : <>Vi jämförde <b>{counts.prissatta} {plural(counts.prissatta, 'faktura', 'fakturor')}</b> mot verifierat publikt listpris — priserna står sig.
855:                  {counts.bevakade > 0 && <div className="rstat"><span>Fakturor</span><span className="v">{counts.fakturor}</span></div>}
857:                      counts.prissatta blev osant i samma sekund som räknaren skilde prissatta
860:                  <div className="rstat"><span>{(counts.bevakade > 0 || counts.mottagna > 0) ? 'Prissatta' : 'Fakturor'}</span><span className="v">{counts.prissatta}</span></div>
862:                  {counts.bevakade > 0 && <div className="rstat"><span>Bevakade</span><span className="v">{counts.bevakade}</span></div>}
901:                  : <><span className="pct">Verifierat</span> · grundat på {counts.prissatta} {plural(counts.prissatta, 'prissatt faktura', 'prissatta fakturor')} · publika listpriser</>}
913:                    {counts.bevakade > 0
914:                      ? `${counts.prissatta} av ${counts.fakturor} fakturor prissatta`
1205:                Innehavet · {counts.prissatta} {plural(counts.prissatta, 'prissatt', 'prissatta')}
1206:                {counts.mottagna > 0
1207:                  ? ` · ${counts.mottagna} ${plural(counts.mottagna, 'mottagen', 'mottagna')}, inte ${plural(counts.mottagna, 'prissatt', 'prissatta')}`
1208:                  : ` ${plural(counts.prissatta, 'leverantör', 'leverantörer')}`}
```

### Kommando 18

```bash
node -e "
import('./src/lib/holdings.js').then(({ roomCounts, groupBySupplier }) => {
  const u = { perEnhet: 1000, golv: 900 };
  const rows = [
    { id:1, normalized_supplier:'Telia Sverige AB', category:'mobil', created_at:'2026-08-01', prisunderlag:u },
    { id:2, normalized_supplier:'Telia Företag',    category:'mobil', created_at:'2026-08-10', prisunderlag:u },
    { id:3, normalized_supplier:'Telia',           category:'mobil', created_at:'2026-08-20', prisunderlag:u },
  ];
  console.log('roomCounts:', JSON.stringify(roomCounts({ autoAnalyses: rows, watched: [] })));
  console.log('suppliers (kort i innehavet):', groupBySupplier(rows).length);
});"
```

```
roomCounts: {"fakturor":3,"analyserade":3,"prissatta":3,"mottagna":0,"bevakade":0}
suppliers (kort i innehavet): 1
(node:5922) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///home/user/arvo-flow.github.io/src/lib/holdings.js is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to /home/user/arvo-flow.github.io/package.json.
(Use `node --trace-warnings ...` to show where the warning was created)
```

### Kommando 19

```bash
cat >> /home/user/arvo-flow.github.io/ops/obduktion/spana-invoice-history.md << 'EOF'

**Dom (H6): håller (död kod, ingen kundskada)**

**Domskäl:** `reason` är gemener-satt på rad 278; literalen `'lineSum'` bär versal S och kan aldrig
finnas i den strängen. Utfall: `"lineSum mismatch" → Under granskning`, `"linesum" → Under granskning`,
`"radsumma 100 ≠ 200" → Fakturan går inte ihop`. Den verkliga koden är
`Ring1: radsumma X kr ≠ fakturatotal Y kr (avvikelse Z kr)` (`agents/test-invoice/extract.js:1108`),
alltså fångas fallet av `radsumma`/`≠`. Villkoret är ett tredje lås på en dörr som redan har två —
men det ser ut som täckning och gör att ingen upptäcker om skälsformatet en dag byter till en
engelsk kod. Samma form som «vaktens deklaration som glidit isär från nyckeln».

---

## H7 — «Innehavet · N prissatta leverantörer» räknar FAKTUROR under en etikett som säger leverantörer

**Fil:rad:** `src/pages/Portfolio/index.js:1205-1208` (mot `src/lib/holdings.js:112-130`)

**Påstående:** När `counts.mottagna === 0` skriver rubriken `${counts.prissatta} prissatta
leverantörer` — men `counts.prissatta` räknar auto-ANALYSER med prisunderlag, medan raderna under
är `groupBySupplier`-grupper (leverantör + kategori). Tre Telia-fakturor ger «3 prissatta
leverantörer» ovanför ETT kort.

**Bevis:**
```
node -e "import('./src/lib/holdings.js').then(({roomCounts,groupBySupplier})=>{
 const u={perEnhet:1000,golv:900};
 const rows=[{id:1,normalized_supplier:'Telia Sverige AB',category:'mobil',created_at:'2026-08-01',prisunderlag:u},
             {id:2,normalized_supplier:'Telia Företag',category:'mobil',created_at:'2026-08-10',prisunderlag:u},
             {id:3,normalized_supplier:'Telia',category:'mobil',created_at:'2026-08-20',prisunderlag:u}];
 console.log(roomCounts({autoAnalyses:rows,watched:[]}), groupBySupplier(rows).length)})"
```
Utfall: `{ fakturor: 3, prissatta: 3, mottagna: 0, bevakade: 0 }` och `suppliers = 1`.

**Dom: håller**

**Domskäl:** Detta är ordagrant felet 
```

```
ok
```

### Kommando 20

```bash
node -v; grep -n "export function getDb" -A 25 lib/db.js | head -40
```

```
v22.22.2
8:export function getDb() {
9-  const url =
10-    process.env.DATABASE_URL ??
11-    process.env.POSTGRES_URL ??
12-    process.env.POSTGRES_URL_DATABASE_URL ??
13-    process.env.POSTGRES_PRISMA_URL;
14-  if (!url) return null;
15-  if (!_sql) _sql = neon(url);
16-  return _sql;
17-}
```

### Kommando 21

```bash
mkdir -p /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad && cat > /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/h9.mjs << 'EOF'
import { mock } from 'node:test';

const rows = [
  { id: 'FP-1', supplier: 'iPad-butiken', normalized_supplier: 'Dustin', category: 'saas-productivity',
    annual_cost: 50000, route: 'auto', created_at: '2026-08-01T10:00:00Z', seat_count: 10, triage_reason: null },
];

function fakeDb(strings, ...vals) {
  const sql = Array.isArray(strings) ? strings.join('?') : String(strings);
  if (/magic_tokens/i.test(sql)) throw new Error('relation "magic_tokens" does not exist');
  if (/FROM invoice_analyses/i.test(sql)) {
    // e-postvägen svarar tomt, fingerprint-vägen svarar med enhetens historik
    return Promise.resolve(/user_email/i.test(sql) ? [] : rows);
  }
  return Promise.resolve([]);
}

mock.module('../../../../home/user/arvo-flow.github.io/lib/db.js', {
  namedExports: { getDb: () => fakeDb },
});

process.env.DATABASE_URL = 'postgres://x/y';
const { default: handler } = await import('/home/user/arvo-flow.github.io/api/invoice-history.mjs');

const res = { statusCode: 0, headers: {}, body: null,
  setHeader(k, v) { this.headers[k] = v; }, end(b) { this.body = b; } };

await handler({ method: 'GET', query: { fingerprint: 'abcdefgh12345678', magic: 'x'.repeat(40) } }, res);
const out = JSON.parse(res.body);
console.log('status:', res.statusCode);
console.log('email i svaret:', out.email);
console.log('antal analyser som visas:', (out.analyses || []).length,
  '→ leverantörer:', (out.analyses || []).map((a) => a.normalized_supplier));
console.log('frånDennaEnhet (det ärliga separat-talet):', out.frånDennaEnhet);
EOF
node --experimental-test-module-mocks --no-warnings /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/h9.mjs 2>&1 | tail -20
```

```
node:internal/modules/run_main:123
    triggerUncaughtException(
    ^
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/tmp/home/user/arvo-flow.github.io/lib/db.js' imported from /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/h9.mjs
Did you mean to import "../../../../../home/user/arvo-flow.github.io/lib/db.js"?
    at finalizeResolution (node:internal/modules/esm/resolve:275:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:985:11)
    at nextResolve (node:internal/modules/esm/hooks:748:28)
    at resolve (node:internal/test_runner/mock/loader:74:35)
    at nextResolve (node:internal/modules/esm/hooks:748:28)
    at Hooks.resolve (node:internal/modules/esm/hooks:240:30)
    at handleMessage (node:internal/modules/esm/worker:199:24)
    at Immediate.checkForMessages [as _onImmediate] (node:internal/modules/esm/worker:141:28)
    at process.processImmediate (node:internal/timers:484:21) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///tmp/home/user/arvo-flow.github.io/lib/db.js'
}

Node.js v22.22.2
```

### Kommando 22

```bash
sed -i "s#mock.module('../../../../home/user/arvo-flow.github.io/lib/db.js'#mock.module('file:///home/user/arvo-flow.github.io/lib/db.js'#" /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/h9.mjs && node --experimental-test-module-mocks --no-warnings /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/h9.mjs 2>&1 | tail -20
```

```
status: 200
email i svaret: undefined
antal analyser som visas: 1 → leverantörer: [ 'Dustin' ]
frånDennaEnhet (det ärliga separat-talet): 0
```

### Kommando 23

```bash
grep -n "kundStatus\|exitDate\|omVaktLarm" lib/contract-intel.js | head -30
```

```
344:  const { fields, rules = null, citat = null, supplier = null, readAt = null, kundStatus = null } = terms;
356:  // 'uppsagd': klockan byter karaktär från larm till NEDRÄKNING mot utträdet. exitDate
360:  if (kundStatus?.typ === 'uppsagd' && kundStatus.exitDate) {
361:    const exit = parseIso(kundStatus.exitDate);
365:        currentPeriodEnd: kundStatus.exitDate,
377:  const stannarAktiv = kundStatus?.typ === 'stannar'
379:    && kundStatus.deadline === clock.deadline;
393:    kundStatus: kundStatus ?? null, stannarAktiv, nastaFonster,
```

### Kommando 24

```bash
cat > /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/h17.mjs << 'EOF'
import { mock } from 'node:test';

// Två rader ur SAMMA leverantör. Kunden sade upp 31 jan 2026. I augusti mejlar hen in en bunt
// GAMLA fakturor (perioden nov 2025) — de får created_at = intagsdatum, inte fakturadatum.
const rows = [
  { id: 'A', supplier: 'Telia', normalized_supplier: 'Telia', category: 'mobil', annual_cost: 40000,
    route: 'auto', created_at: '2026-08-20T09:00:00Z', seat_count: 10, triage_reason: null,
    contract_terms_json: { supplier: 'Telia', fields: {},
      kundStatus: { typ: 'uppsagd', exitDate: '2026-01-31' } } },
  { id: 'B', supplier: 'Telia', normalized_supplier: 'Telia', category: 'mobil', annual_cost: 40000,
    route: 'auto', created_at: '2026-08-20T09:05:00Z', seat_count: 10, triage_reason: null },
];

function fakeDb(strings) {
  const sql = Array.isArray(strings) ? strings.join('?') : String(strings);
  if (/FROM invoice_analyses/i.test(sql)) return Promise.resolve(/user_email/i.test(sql) ? rows : []);
  return Promise.resolve([]);
}
mock.module('file:///home/user/arvo-flow.github.io/lib/db.js', { namedExports: { getDb: () => fakeDb } });
mock.module('file:///home/user/arvo-flow.github.io/lib/session.js', {
  namedExports: { verifySession: () => ({ email: '<e-post maskerad>' }) },
});

process.env.DATABASE_URL = 'postgres://x/y';
const { default: handler } = await import('/home/user/arvo-flow.github.io/api/invoice-history.mjs');
const res = { statusCode: 0, setHeader() {}, end(b) { this.body = b; } };
await handler({ method: 'GET', query: { session: 's'.repeat(40) } }, res);
const out = JSON.parse(res.body);
for (const a of out.analyses) {
  console.log(a.id, '· kundStatus:', a.avtal?.kundStatus?.typ ?? '—', '· omVaktLarm:', a.avtal?.omVaktLarm ?? false);
}
EOF
node --experimental-test-module-mocks --no-warnings /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/h17.mjs 
```

```
B · kundStatus: — · omVaktLarm: false
A · kundStatus: — · omVaktLarm: false
```

### Kommando 25

```bash
sed -n '335,400p' lib/contract-intel.js
```

```
  };
}

// ── AVTALSVYN — allt "Avtalet · läst"-avsnittet i rummet behöver, ur persisterade termer ──
// Termerna (fields/rules/citat) är FAKTA lästa ur dokumentet och fryses vid uppladdningen;
// KLOCKAN räknas alltid FÄRSK vid läsning (deadlines rullar — en fryst deadline ljuger inom
// en period). nastaPeriodSlut = vad kunden är bunden till OM fönstret missas (fällans andra
// halva — ren månadsaritmetik ur avtalets egen förlängningsperiod, regel 2/3).
export function buildAvtalView(terms = {}, { today = new Date() } = {}) {
  const { fields, rules = null, citat = null, supplier = null, readAt = null, kundStatus = null } = terms;
  if (!fields?.avtalsstart) return null;
  let clock = computeContractOutcome(fields, rules ?? {}, { today });
  if (!clock) return null;

  const forl = rules?.forlangningMan ?? null;
  const nastaPeriodSlut = (clock.status === 'window-open' && Number(forl) > 0 && clock.currentPeriodEnd)
    ? isoDate(addMonths(new Date(`${clock.currentPeriodEnd}T00:00:00Z`), Number(forl)))
    : null;

  // KVITTERINGEN (grundardesign 2026-07-09): kundens registrerade handling — aldrig en mute.
  //
  // 'uppsagd': klockan byter karaktär från larm till NEDRÄKNING mot utträdet. exitDate
  // beräknades deterministiskt av SERVERN vid registreringen (aldrig klientens ord för
  // ett datum). Kundens klick är ett PÅSTÅENDE — vyn säger alltid "markerad av er",
  // och om-vakten (invoice-history) larmar om leverantören fakturerar efter utträdet.
  if (kundStatus?.typ === 'uppsagd' && kundStatus.exitDate) {
    const exit = parseIso(kundStatus.exitDate);
    if (exit) {
      const daysToEnd = Math.ceil((exit.getTime() - today.getTime()) / DAY_MS);
      clock = {
        currentPeriodEnd: kundStatus.exitDate,
        deadline: null, daysToDeadline: null,
        renewals: clock.renewals ?? 0,
        status: daysToEnd >= 0 ? 'terminating' : 'terminated',
        daysToEnd,
        regelKalla: clock.regelKalla ?? null,
      };
    }
  }

  // 'stannar': lugnet gäller EXAKT den deadline det registrerades för — när klockan
  // rullat in i nästa period matchar nyckeln inte längre och larmet väcks av sig själv.
  const stannarAktiv = kundStatus?.typ === 'stannar'
    && clock.status === 'window-open'
    && kundStatus.deadline === clock.deadline;
  const nastaFonster = (stannarAktiv && Number(forl) > 0)
    ? isoDate(addMonths(new Date(`${clock.deadline}T00:00:00Z`), Number(forl)))
    : null;

  const uppsagningLabel = rules?.uppsagningstidDagar != null
    ? `${rules.uppsagningstidDagar} dagar`
    : rules?.uppsagningstidMan != null ? `${rules.uppsagningstidMan} mån` : null;
  const bindningLabel = fields.avtalstidMan == null ? 'tills vidare' : `${fields.avtalstidMan} mån`;
  const forlangningLabel = forl == null ? null : Number(forl) === 0 ? 'ingen — avtalet löper ut' : `+${forl} mån i taget`;

  return {
    supplier, readAt, fields, rules, citat, clock, nastaPeriodSlut,
    bindningLabel, uppsagningLabel, forlangningLabel,
    kundStat
```

### Kommando 26

```bash
cd /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad && sed -i "s#fields: {},#fields: { avtalsstart: '2024-02-01', avtalstidMan: 24 }, rules: { forlangningMan: 12, uppsagningstidMan: 3 },#" h17.mjs && node --experimental-test-module-mocks --no-warnings h17.mjs 2>&1 | tail -10
```

```
B · kundStatus: — · omVaktLarm: false
A · kundStatus: uppsagd · omVaktLarm: true
```

### Kommando 27

```bash
grep -n "export async function getMarketIntelligence" -A 12 lib/price-alert.js | head -20; echo "=== vakt"; grep -n "export async function getVaktHealth" -A 20 lib/vakt.js | head -30; echo "=== segstats"; grep -n "export async function getSegmentStats" -A 10 lib/price-alert-store.js | head -15
```

```
64:export async function getMarketIntelligence({ normalizedSupplier, category }) {
65-  if (!normalizedSupplier || !category) return null;
66-  const db = getDb();
67-  if (!db) return null;
68-
69-  try {
70-    // En kund = en röst. Räkna DISTINKTA kunder (user_email, annars fingerprint), aldrig rådata —
71-    // annars blir ett testkontos 5 uppladdningar "5 bolag" (falsk kollektiv sanning). Ett representativt
72-    // värde per kund (senaste) → statistiken skevar inte av en tung uppladdare.
73-    const rows = await db`
74-      WITH per_customer AS (
75-        SELECT DISTINCT ON (COALESCE(NULLIF(user_email, ''), fingerprint))
76-               COALESCE(NULLIF(user_email, ''), fingerprint) AS cust,
=== vakt
118:export async function getVaktHealth(now = new Date()) {
119-  const db = getDb();
120-  if (!db) return null;
121-  try {
122-    // 400 rader räcker för >ett års obruten kedja; kedjan bryts ändå vid första hålet.
123-    const rows = await db`
124-      SELECT swept_at, sources, price_points, changes
125-      FROM vakt_events
126-      WHERE event_type = 'sweep'
127-      ORDER BY swept_at DESC
128-      LIMIT 400
129-    `;
130-    if (!rows.length) return null;
131-    const streak = sweepStreak(rows.map((r) => r.swept_at), now);
132-    const r0 = rows[0];
133-    return {
134-      sweptAt: new Date(r0.swept_at).toISOString(),
135-      sources: r0.sources,
136-      pricePoints: r0.price_points,
137-      fresh: streak.fresh,
138-      streakNights: streak.nights,
=== segstats
110:export async function getSegmentStats({ category, supplierKeyword }) {
111-  const db = getDb();
112-  if (!db) return { total: 0, withSupplier: 0 };
113-
114-  try {
115-    const [totalRow, supplierRow] = await Promise.all([
116-      db`
117-        SELECT COUNT(DISTINCT user_email) AS n
118-        FROM invoice_analyses
119-        WHERE category   = ${category}
120-          AND route       = 'auto'
```

### Kommando 28

```bash
sed -n '110,150p' lib/price-alert-store.js; echo "=== movement"; sed -n '1,80p' lib/market-movement.js | grep -n "withSupplier\|total\|return null\|>=" 
```

```
export async function getSegmentStats({ category, supplierKeyword }) {
  const db = getDb();
  if (!db) return { total: 0, withSupplier: 0 };

  try {
    const [totalRow, supplierRow] = await Promise.all([
      db`
        SELECT COUNT(DISTINCT user_email) AS n
        FROM invoice_analyses
        WHERE category   = ${category}
          AND route       = 'auto'
          AND user_email IS NOT NULL
      `,
      db`
        SELECT COUNT(DISTINCT user_email) AS n
        FROM invoice_analyses
        WHERE category          = ${category}
          AND route              = 'auto'
          AND user_email        IS NOT NULL
          AND normalized_supplier ILIKE ${'%' + supplierKeyword + '%'}
      `,
    ]);

    return {
      total:        Number(totalRow[0]?.n  ?? 0),
      withSupplier: Number(supplierRow[0]?.n ?? 0),
    };
  } catch (err) {
    console.error('[price-alert-store] getSegmentStats error:', err.message);
    return { total: 0, withSupplier: 0 };
  }
}

// Returnerar true om ett alert redan skickats för denna pris-monitor-körning,
// leverantör och kategori — förhindrar dubblett-notifieringar vid retry eller
// manuell om-körning av price-monitor-workflödet.
export async function hasAlertBeenSent({ monitorRunId, supplier, category }) {
  const db = getDb();
  if (!db) return false;

  try {
=== movement
22: * @param {object} segment  - { total, withSupplier } (ur getSegmentStats)
27:  if (!hike || !segment) return null;
30:  if (!when || Number.isNaN(when.getTime())) return null;
32:  if (when > today || (today - when) > recentMonths * MONTH_MS) return null;
36:  if (oldM == null || newM == null || oldM <= 0 || newM <= oldM) return null;   // bara höjningar
39:  const withSupplier = Number(segment.withSupplier ?? 0);
40:  const total        = Number(segment.total ?? 0);
42:  if (!(withSupplier >= minPeers) || !(total >= withSupplier)) return null;
56:        + `Bland bolagen Arvo följer för ${cat} ligger ${withSupplier} av ${total} hos ${sup}; ni är ett av dem. `
59:    withSupplier, total,
```

### Kommando 29

```bash
grep -rn "referensProdukt" src/ | head -20
```

```
src/lib/holdings.js:189:      + `${u.referensProdukt ? ` (${u.referensProdukt})` : ''} — men priserna i kategorin skiljer `
src/lib/holdings.js:195:      + `${u.referensProdukt ? ` (${u.referensProdukt})` : ''}. Arvo har inget verifierat bytesmål `
src/lib/holdings.js:201:      + `${u.referensProdukt ? ` (${u.referensProdukt})` : ''}. Inget byte rekommenderas i dag — `
src/pages/Portfolio/index.js:1294:                                  {p.referensProdukt ? <em className="u-prod">{p.referensProdukt}</em> : null}
```

### Kommando 30

```bash
node -e "
import('./api/invoice-history.mjs').then(async ({ buildBranchAnchors }) => {
  const rows = [
    { route:'auto', category:'saas-productivity', supplier:'Google Ireland Ltd', normalized_supplier:'Google', seat_count:10, annual_cost:24000 },
    { route:'auto', category:'loneadmin', supplier:'Hogia', normalized_supplier:'Hogia', seat_count:null, annual_cost:9000 },
  ];
  console.log(JSON.stringify(await buildBranchAnchors(rows), null, 1));
});"
```

```
{
 "saas-productivity": {
  "category": "saas-productivity",
  "median": 1927,
  "p25": 1606,
  "source": "real-public",
  "unitLabel": "per användare/år",
  "unitNoun": "användare",
  "unitNounPl": "användare",
  "lastVerified": "2026-08-24",
  "referensProdukt": "Microsoft 365 Business Standard",
  "kraverBekraftadNiva": true,
  "customerCost": 24000,
  "seats": 10
 },
 "loneadmin": {
  "category": "loneadmin",
  "median": 778,
  "p25": 778,
  "source": "real-public",
  "unitLabel": "per anställd/år",
  "unitNoun": "anställd",
  "unitNounPl": "anställda",
  "lastVerified": "2026-05-22",
  "referensProdukt": "Fortnox Lön",
  "kraverBekraftadNiva": false,
  "customerCost": 9000,
  "seats": null
 }
}
```

### Kommando 31

```bash
cat >> /home/user/arvo-flow.github.io/ops/obduktion/spana-invoice-history.md << 'EOF'

**Bevis (H9) — hela handlern körd med `magic_tokens` oläsbar men `invoice_analyses` frisk:**
```
node --experimental-test-module-mocks scratchpad/h9.mjs
# mockar lib/db.js: kastar på magic_tokens, svarar med enhetens rader på invoice_analyses
```
Utfall:
```
status: 200
email i svaret: undefined
antal analyser som visas: 1 → leverantörer: [ 'Dustin' ]
frånDennaEnhet (det ärliga separat-talet): 0
```
Noll rader på stderr.

**Dom: håller**

**Domskäl:** Kunden klickar sin magic-länk, får 200, och rummet fyller sig med WEBBLÄSARENS
historik — precis det grundaren såg 2026-08-14 (elva leverantörer och en iPad han aldrig skickat).
Det ärliga separat-talet `frånDennaEnhet` läser **0**, eftersom det är grindat på `identitetBevisad`;
fältet som byggdes för att göra sammanblandningen synlig blir alltså tyst just i det läge där den
sker. Ingen loggrad: `} catch { return null; }` (rad 52) sväljer felet utan `console.error`, till
skillnad från analys-läsningen 40 rader ned som uttryckligen loggar och svarar 503 med
motiveringen «ett tomt rum får aldrig betyda att vi inte kunde läsa». Samma modul, motsatt
disciplin. Scenariot kräver inte ett totalt DB-haveri: en miljö där `magic_tokens`-migreringen
aldrig kördes ger exakt detta, varje gång, för alltid — och tyst.

---

## H10 — Om-vakten mäter INTAGSDATUM, inte fakturadatum, och larmar därför på en bunt gamla mejlade fakturor

**Fil:rad:** `api/invoice-history.mjs:171-181`

**Påstående:** `new Date(b.created_at) > exit` jämför utträdesdatumet mot när ANALYSEN skapades
(uppladdnings-/intagstidpunkten), inte mot fakturans period. Kundens huvudväg är enligt bibeln att
mejla in 50–100 gamla fakturor på en gång — alla får `created_at = i dag`. En kund som sade upp i
januari och i augusti mejlar in sitt arkiv får därmed larmet «ni sade upp, men leverantören
fakturerar fortfarande».

**Bevis:** *(hela handlern körd; båda raderna intagna samma minut, 
```

```
ok
```

### Kommando 32

```bash
grep -n "RR-0\|Innehavet\|leverantör" tests/rumsredovisning.mjs | head -30
```

```
40:  test('RR-01 · prissatt + mottaget + bevakat = totalt, alltid (produktionsfallet 5/4/9)', () => {
74:  test('RR-02 · radarn läser räknarna ur den delade funktionen, inte ur egna längder', () => {
85:  test('RR-03 · disciplinmontern lovar aldrig fullständighet', () => {
101:  test('RR-04 · manifestet räknar inte upp de tysta skälen', () => {
109:  test('RR-05 · konfidensraden följer domens faktiska källa', () => {
120:  test('RR-06 · inget bolagsnamn tillverkas ur en domän', () => {
129:  test('RR-07 · det fyllda rummet har kvar en väg att skicka in fler fakturor', () => {
180:    // Och det motsatta fallet får INTE dela text med det normala. Att ligga över leverantörens
185:    assert.match(platt, /mer än\s*(?:<\/em>)?\s*leverantörens eget listpris|ni ligger över/i,
189:  test('RR-08 · datumet får inte sluta på dubbel punkt', () => {
200:  test('RR-09 · slutbetald avbetalning räknar fram vad som REDAN är överbetalt', () => {
235:    assert.match(ny.letter.body, /Till Telia/, 'brevet ska adresseras till leverantören på raden');
241:    // Nivå 3 i Switch-doktrinen: Arvo BEVÄPNAR. Vi har ingen kanal mot leverantörens kundtjänst
250:    assert.match(f.letter.body, /Till Telia/, 'brevet ska adresseras till leverantören på raden');
283:  test('RR-09 · ingen kundsynlig räknare renderar suppliers.length', () => {
284:    // 2026-08-21, ur regel 8-genomgången. `suppliers.length` räknar varje leverantör i innehavet
```

### Kommando 33

```bash
sed -n '283,313p' tests/rumsredovisning.mjs
```

```
  test('RR-09 · ingen kundsynlig räknare renderar suppliers.length', () => {
    // 2026-08-21, ur regel 8-genomgången. `suppliers.length` räknar varje leverantör i innehavet
    // — även de vars kort säger «Mottagen». Fyra ytor citerade det som «prissatta»/«vi kunde
    // prissätta», alltså ett arbete vi inte utfört på de raderna. roomCounts är den enda källan.
    //
    // Villkor (`suppliers.length > 0`) är legitima och fälls inte; vakten letar efter talet
    // RENDERAT bredvid en enhet.
    const brott = [];
    RUM.split('\n').forEach((rad, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(rad.trim())) return;
      if (/\{suppliers\.length\}\s*[A-Za-zÅÄÖåäö]/.test(rad)) brott.push(`rad ${i + 1}: ${rad.trim().slice(0, 90)}`);
    });
    assert.deepEqual(brott, [],
      'ett kundsynligt tal om hur många fakturor vi PRISSATT måste komma ur roomCounts — ' +
      'suppliers.length räknar även de mottagna:\n  ' + brott.join('\n  '));
  });

  test('RR-10 · räknaretiketten namnger det tal som står under den', () => {
    // «Fakturor» stod över counts.prissatta. Det var sant så länge de två alltid var lika —
    // och blev osant i samma sekund räknaren skilde prissatta från mottagna. En etikett som
    // bara råkar stämma är inte en etikett (helhetskravet).
    // Ankaret är etikettvalet självt, inte «rstat» — det senare förekommer flera gånger och
    // första träffen var en annan rad. En vakt som ankrar för brett fäller på fel grund.
    const i = RUM.indexOf("'Prissatta' : 'Fakturor'");
    assert.ok(i > 0, 'hittade inte radarns etikettval — vakten mäter fel objekt');
    const block = RUM.slice(Math.max(0, i - 120), i + 160);
    assert.match(block, /counts\.mottagna/,
      'etiketten måste växla till «Prissatta» så snart någon rad är mottagen men inte prissatt');
  });

});
```
