# Spaning: invoice-store + inbound-ingest

Område: `lib/invoice-store.js`, `api/inbound-email.mjs`, `lib/ingest-queue.js`, `api/cron/drain-ingest.mjs`
Felfamilj som söks: *ett tillstånd som betyder "okänt / misslyckades / inte mätt", representerat
med ett värde som är omöjligt att skilja från ett giltigt svar.*

Status: PÅGÅENDE (skrivs inkrementellt).

---

## H1 — `claimBatch` svarar `[]` på DB-fel, och drainen tolkar det som "kön är tom" och SLÄCKER köflaggan

**Fil:rad:** `lib/ingest-queue.js:114-141` (catch → `return []`), `api/cron/drain-ingest.mjs:126-136`
(`if (!jobs.length) break;` … `if (claimed === 0) await clearPending();`)

**Påstående:** Ett Postgres-fel i `claimBatch` returnerar samma tomma lista som en bevisat tom kö,
varpå drainen inte bara avslutar utan aktivt raderar KV-flaggan `ingest:pending` — den enda signal
som talar om att arbete finns — så att nästa 14 cron-körningar hoppar över Postgres helt.

**Bevis:** (körs nedan)

**Dom:** (ej prövad än)

---

## H2 — Idempotensnyckeln sätts INNAN arbetet, och inline-analysen har ingen timeout

**Fil:rad:** `api/inbound-email.mjs:328-336` (`kv.set(..., nx:true)` direkt efter auth) vs
`api/inbound-email.mjs:488-503` (internt `fetch` till `/api/test-invoice` UTAN AbortController,
medan `api/cron/drain-ingest.mjs:49-51` har `JOB_TIMEOUT_MS`).

**Påstående:** Dör invokationen efter att nyckeln satts (Vercel `maxDuration: 60` under två
inline-analyser à upp till 60 s) blir Resends omleverans avvisad som "redan hanterad" — fakturan
är borta, kunden får aldrig något svarsmail, och loggen säger "hoppar över (idempotens)", vilket
är omöjligt att skilja från en äkta dubblett.

**Bevis:** (körs nedan)

**Dom:** (ej prövad än)

---

## H3 — `user_email` skrivs RÅTT i triage- och monitoring-vägarna men läses NORMALISERAT

**Fil:rad:** skrivning rå: `api/test-invoice.mjs:600,667,693,757,776,838,886,915,1040,1135,1171,1209,1248,1300,1595`
(`userEmail: body.userEmail`); skrivning normaliserad: `api/test-invoice.mjs:1343,1642`
(`body.userEmail.trim().toLowerCase()`); läsning: `lib/invoice-store.js:309,325,343`
(`WHERE user_email = ${email.trim().toLowerCase()}`).

**Påstående:** Med en e-post som bär versaler landar de prissatta (`auto`) raderna på gemener och
syns i rummet, medan varje triagerad och avtalsbevakad rad landar med versaler och är osynlig för
kontorets läsväg — bokförd enligt bokföringsplikten, men omöjlig att skilja från ett tapp för kunden.

**Bevis:** (körs nedan)

**Dom:** (ej prövad än)

---

## H4 — `failStuck` finns inte: ett jobb som dör i `processing` på sista försöket blir permanent "på väg"

**Fil:rad:** `lib/ingest-queue.js:113` (kommentaren "plockas av failStuck → 'failed'"),
`lib/ingest-queue.js:122-123` (stale-reclaim kräver `attempts < MAX_ATTEMPTS`),
`lib/ingest-queue.js:214-221` (`pendingCountBySender` räknar `processing` som pågående).

**Påstående:** Funktionen kommentaren hänvisar till existerar inte i kodbasen; ett jobb vars sista
claim dog (Vercel-timeout) står kvar i `processing` med `attempts = 3`, plockas aldrig av
stale-reclaimen, räknas aldrig som `failed` — och rummet visar det för evigt som "Arvo analyserar
N fakturor".

**Bevis:** (körs nedan)

**Dom:** (ej prövad än)
