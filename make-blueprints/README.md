# Make.com Blueprints — Arvo Sales Engine

Two scenarios that together replace ~95% of cold outreach admin:

1. **`arvo-outreach-writer.json`** — Watches Airtable for new leads, scrapes the prospect's website, has Haiku 4.5 write a personalized first-contact email, saves the draft to Airtable for human approval before send.
2. **`arvo-triage-engine.json`** — Watches Gmail for replies to your campaign, has Haiku 4.5 classify each reply into one of 4 buckets (hot lead / no / question / auto-reply), routes accordingly to Slack + drafts + Airtable updates.

> ⚠️ **Make.com blueprint imports are picky.** The JSON format evolves between Make versions and some module IDs/versions may differ in your account. If the import fails, **use the rebuild-from-scratch guide below** — it's actually faster than debugging an import error, and it gives you full visibility into what the scenario does.

---

## Prerequisites

| Need | Where to get it |
|---|---|
| Make.com account | https://make.com (free tier OK for first 1000 ops/month) |
| Airtable account + base | https://airtable.com (free tier OK to start) |
| Gmail account (for triage) | Or use Outlook — module names differ but logic is identical |
| Anthropic API key | https://console.anthropic.com — store as connection in Make.com, not in the blueprint |
| Slack workspace | For hot-lead notifications (optional but strongly recommended) |

**Cost expectation** at 100 outreach mails + ~30 replies/week:
- Anthropic API (Haiku 4.5): ~$0.50/week (~5 kr)
- Make.com: ~3 ops per outreach mail + 5 ops per triaged reply = ~450 ops/week → free tier
- Airtable: free tier handles up to 1200 records

---

## Step 1 — Create the Airtable base

Schema (one table called **Leads**):

| Field | Type | Notes |
|---|---|---|
| Bolagsnamn | Single line text | Required |
| VD Namn | Single line text | First name preferred (more personal) |
| Hemsida URL | URL | Required for outreach scraping |
| E-postadress | Email | Required |
| Bransch | Single line text | Optional but improves mail quality |
| Cohort | Single select | Options: `byraer`, `hantverkare`, `ehandel`, `wildcard` |
| Status | Single select | Options: `Ny`, `Utkast Skapat`, `Skickat`, `Svarat Positivt`, `Svarat Negativt`, `Behöver Svar`, `Auto-svar — Återförsök 5 dgr` |
| Skrapad Text | Long text | Filled by scenario |
| Claude Utkast | Long text | Filled by scenario |
| Senaste Svar | Long text | Filled by triage scenario |
| Triage Confidence | Number (decimal, 0.00) | Filled by triage scenario |
| Utkast Skapat At | Date (with time) | Filled by scenario |
| Återförsök Datum | Date | Filled by triage when intent=4 |
| Created | Date (auto) | Sort key |

**Make a view** called `Ny Outreach` filtered to `Status = Ny AND Cohort != ""` to keep the lead-source clean.

---

## Step 2 — Set up Make.com connections

In Make.com → **Connections** → **+ Add**:

1. **Airtable** — name it `Arvo Airtable` (any name works, but the blueprint references `AIRTABLE_CONNECTION`). Authorize with your Airtable PAT.
2. **Anthropic Claude** — name it `Arvo Anthropic`. Paste your API key.
3. **Gmail** (or Outlook) — name it `Arvo Gmail`. OAuth flow.
4. **Slack** — name it `Arvo Slack`. OAuth flow. Create channel `#sales-leads` first.

---

## Step 3 — Import the blueprints (or rebuild from scratch)

### Path A: JSON import (try this first)

1. Make.com → **Scenarios** → **Create new scenario**
2. Click the menu (three dots, top-right) → **Import Blueprint**
3. Upload `arvo-outreach-writer.json`
4. Replace the placeholders:
   - `AIRTABLE_BASE_ID` → your actual Airtable base ID (find in Airtable URL)
   - `AIRTABLE_CONNECTION`, `ANTHROPIC_CONNECTION`, `GMAIL_CONNECTION`, `SLACK_CONNECTION` → select from dropdowns when modules show "missing connection"
5. Repeat for `arvo-triage-engine.json`

If the import fails with "invalid module" or "version mismatch" errors, go to Path B.

### Path B: Manual rebuild (~30 min — more reliable)

#### Outreach Writer

Build modules in order, left-to-right:

**Module 1 — Airtable: Search Records**
- Base: your base · Table: `Leads`
- Formula: `AND({Status} = 'Ny', {Cohort} != '')`
- Limit: `10` · Sort: Created ascending

**Module 2 — HTTP: Make a Request**
- URL: `{{1.Hemsida URL}}`
- Method: GET · Timeout: 30s
- ⚠️ Don't enable "Parse response" — that breaks downstream HTML-to-text

**Module 3 — Text Parser: HTML to Text**
- HTML: `{{2.data}}`
- Strip tags, scripts, styles, comments: ON
- Max length: 4000 (caps token cost)

**Module 4 — Anthropic Claude: Create a Message**
- Model: `claude-haiku-4-5` (NOT Opus)
- Max tokens: 800
- System prompt: paste from `arvo-outreach-writer.json` field `flow[3].mapper.system`
- Messages: one user message with body from `flow[3].mapper.messages[0].content` (use `{{1.VD Namn}}` etc. for placeholders)

**Module 5 — Airtable: Update Record**
- Record ID: `{{1.id}}`
- Update: `Claude Utkast = {{4.content[].text}}`, `Status = Utkast Skapat`, `Utkast Skapat At = {{now}}`

Schedule: every 30 min during work hours.

#### Triage Engine

**Module 1 — Gmail: Watch Emails**
- Folder: INBOX · Criteria: subject contains `Re:` · Mark as seen: NO

**Module 2 — Airtable: Search Records**
- Formula: `FIND(LOWER('{{1.from.address}}'), LOWER({E-postadress})) > 0`
- Limit: 1 (matches reply to lead)

**Module 3 — Anthropic Claude: Create a Message**
- Model: `claude-haiku-4-5`
- Max tokens: 300
- System prompt: paste from `arvo-triage-engine.json` field `flow[2].mapper.system`
- User message: include `{{1.from.name}}`, `{{1.from.address}}`, `{{1.subject}}`, `{{1.text}}`

**Module 4 — JSON: Parse JSON**
- JSON: `{{3.content[].text}}`
- Type: object

**Module 5 — Router** (4 branches, filter on `{{4.intent}}` equal to 1 / 2 / 3 / 4)

**Branch 1 — intent = 1 (Hot Lead)**
- Slack: post to `#sales-leads` with lead info + AI reasoning + Gmail link
- Gmail: Create Draft (reply with calendar link — replace `YOUR_CALENDAR_LINK`)
- Airtable: update Status to `Svarat Positivt`

**Branch 2 — intent = 2 (No)**
- Airtable: update Status to `Svarat Negativt`. Done.

**Branch 3 — intent = 3 (Question)**
- Slack: ping yourself with the question + warning to NOT auto-respond
- Airtable: update Status to `Behöver Svar`

**Branch 4 — intent = 4 (Auto-reply)**
- Util: Sleep 1 second (so we don't double-process)
- Airtable: update Status to `Auto-svar — Återförsök 5 dgr`, set `Återförsök Datum = {{addDays(now; 5)}}`

Schedule: instant (webhook-triggered by Gmail).

---

## Why these specific design choices

### Model: Haiku 4.5 in both scenarios

The original draft you sent specified `claude-opus-4-7`. That's **10× the cost for marginal quality gain on these tasks**. For 1000 outreach mails:
- Haiku 4.5: ~$5 total
- Opus 4.7: ~$300 total

Save Opus for the **Recommender** (Layer 2 worker in the product) where reasoning across leverantörsavtal genuinely benefits from the depth.

### Cohort-aware system prompt

The outreach mail's system prompt branches on `{{1.Cohort}}` and chooses the relevant pain-point per industry:
- `byraer` → SaaS-licenser, bredband, tjänstepensioner
- `hantverkare` → drivmedelsavtal, leasing, grossistfakturor (NOT fordonsförsäkring — FI-licensfälla)
- `ehandel` → kortterminal, fraktavtal
- `wildcard` → generic but signals genuine outreach

The model picks the right pain-point from the system prompt without you needing 4 separate scenarios.

### 4-category triage instead of 3

The original draft had 3 categories (hot/no/question). Adding `auto-reply` as a 4th catches *"Jag är på semester tillbaka 1 maj, Lars hanterar mina mejl"* — which would otherwise show up as a hot lead in Slack and waste your time. The Branch 4 sets a `Återförsök Datum` so you can build a separate scenario that re-triggers outreach after 5 days.

### Manual draft approval before send (intent = 1)

Branch 1 creates a **draft** in Gmail rather than auto-sending. This is intentional:
- Reply rates double when the founder personally hits Send
- You catch any AI-generated weirdness before it leaves
- Once you have ~50 hot leads handled and the draft template is solid, you can switch to auto-send

---

## Tracking & metrics

The Airtable base + scenarios produce all the data you need to know what's working:

```
SELECT Cohort, COUNT(*) as Sent, 
       SUM(IIF(Status='Svarat Positivt', 1, 0)) as HotLeads,
       SUM(IIF(Status='Svarat Negativt', 1, 0)) as Nos,
       SUM(IIF(Status='Behöver Svar', 1, 0)) as Questions,
       HotLeads / Sent * 100 as ConversionPct
FROM Leads
WHERE Status != 'Ny'
GROUP BY Cohort
```

Run this weekly to see which cohort converts best — that's where you double down marketing spend post-launch.

---

## What this does NOT do (intentionally)

- **Auto-send the outreach mail.** Drafts only. You hit Send manually for the first 100 mails to learn what's working.
- **Generate the lead list.** Use Allabolag.se Premium API or LinkedIn Sales Navigator to populate the Airtable. The blueprints assume the lead list exists.
- **Handle GDPR consent.** B2B cold mail to org email addresses is legitimate-interest based in Sweden but you must include an unsubscribe link in your mail signature. Add that to the Gmail draft template.
- **Track open/click rates.** Gmail doesn't expose this natively. Add tracking pixel via Mailgun/SendGrid in a follow-up scenario if needed.
- **Replace your judgment.** The triage AI gets things wrong sometimes. The Slack notifications include AI confidence + reasoning so you can second-guess fast.

---

## Where to go next

1. **Run 30 outreach mails** through the writer scenario, hand-Send them, see how the personalization quality holds up.
2. **Iterate the system prompt** based on the first 10 replies you get — what cohort-specific phrasing works, what falls flat.
3. **Add a "warmup" scenario** that gradually ramps your sending volume to avoid Gmail spam-filter penalties.
4. When you have 100+ leads in the system, **pair this with the Categorizer worker** (`agents/categorizer/`) so when a hot lead actually onboards, the product itself is ready to deliver value on day 1.
