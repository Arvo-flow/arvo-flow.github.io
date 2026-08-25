# Spaning: invoice-history (kontorets datadörr)

Område: `api/invoice-history.mjs` + `src/lib/holdings.js` (`roomCounts`) + `src/pages/Portfolio/index.js`.
Felfamiljen som söks: *ett tillstånd som betyder «okänt / misslyckades / inte mätt», representerat
med ett värde som är omöjligt att skilja från ett giltigt svar.*

Status: pågående. Hypoteserna skrivs in löpande, INNAN de är prövade, och får sin dom efter körning.

---

## H1 — Branschankaret gissar `employees: 5` när `seat_count` saknas, under en kommentar som lovar motsatsen

**Fil:rad:** `api/invoice-history.mjs:482-485`

**Påstående:** `getPublicListBenchmark({ employees: ... ? a.seat_count : 5 })` ersätter ett OKÄNT
enhetsantal med talet 5, vilket för storleksberoende kategorier (loneadmin) väljer ett annat golv än
kundens verkliga band — och kommentaren tre rader upp intygar uttryckligen att «seat_count är
enheterna ur kundens egen faktura — aldrig en gissad personalstyrka».

**Bevis (kommando):** *ej kört än*

**Dom:** kunde-inte-provas (ännu)

---

## H2 — Den degraderade läsvägen tappar `triage_reason` och flyttar bevakade fakturor till prissatta

**Fil:rad:** `lib/invoice-store.js:268-284` och `335-350` (reservsatserna) mot
`api/invoice-history.mjs:128-135` (liggardelningen).

**Påstående:** reservsatsen SELECT:ar varken `triage_reason`, `line_items_json`, `invoice_number`
eller `lead_finding_json`; i `api/invoice-history.mjs` delas liggaren på just `a.triage_reason == null`,
så varje triagerad rad vars väg inte råkar vara `unsupported`/`review_queue` byter liggare tyst —
den räknas som prissatt i radarn i stället för bevakad.

**Bevis (kommando):** *ej kört än*

**Dom:** kunde-inte-provas (ännu)
