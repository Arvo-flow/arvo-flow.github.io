# Skörd: a0b9a5d4f9e6e0d50

> **OPRÖVAD.** Det här är agentens arbete, räddat ur harnessets transkript — inte ett
> bevisat fynd. Skörden visar att arbetet UTFÖRDES; om slutsatsen är sann avgörs av
> motprövning med ett körbart bevis, precis som för varje annan hypotes.

· körning: `subagents` · agent: `a0b9a5d4f9e6e0d50`
· slutsatser: 55 · körda kommandon: 10
· **bär analys**

## Uppdraget

```
(saknas i transkriptet)
```

## Vad agenten formulerade

### 1

I'll start by understanding the test setup and the failing fixtures.

### 2

Let me look at the failing test output in detail and the secondary-savings logic.

### 3

The logic confirms the formula. Now I need the actual engine outputs. Let me write a small script that prints, for each failing fixture, the computed secondary values so I can verify against the formula. Let me first read the fixture files.

### 4

Rather than read every file manually, let me build a verification script that computes the new engine output for each fixture with a `secondary` key and prints the formula breakdown. This gives me ground-truth values to apply.

### 5

Let me use absolute paths in the script.

### 6

I now have all the new engine outputs. The bredband-secondary fixtures (secCat=bredband) are the ones I must update. The mobil-secondary ones (secCat=mobil) are unchanged — I'll confirm none of those are flagged FLIP (none are). 

Let me identify exactly which tests are currently failing to make sure my scope matches. The failing list earlier matches all secCat=bredband fixtures. Let me cross-check: failing comb tests were comb-01,02,03,04,05,06,07,08,09,12,15,16,17,18,19,20,21,22,24,26,27,28,29,30,47,48,49,50,52,53,55 — all secCat=bredband. Good. And edge: 09,10,16,17,18,19,20,26,27. And 08: telia-05, tele2-04, tele2-05, combo-01..05, combo-09,10, misc-16, misc-21. All bredband-secondary.

Note comb-28,29,30,50 are flagged in failing list — comb-28,29,30 appear as bredband secondary in my output (yes). Let me build the authoritative list of bredband-secondary fixtures and their new values. Let me filter:

### 7

This is my authoritative table. Note all FLIPs here are null→set (more invoices now clear the 500 threshold since p25 dropped). All grosses are ≥500 so no set→null flips among these. 

I now have everything. Let me work through each file. Starting with **01-mobil.mjs** — mob-28, mob-29, mob-30. I already saw their current content. Let me update them with new values and fix comments.

mob-28: tier=500, p25 7200→3828, cur 10788, gross 3588→6960, net 2870→5568.

### 8

mob-29: tier=1000, p25 9000→4020, cur 11940, gross 2940→7920, net→6336. Note the comment said "1*1000=1000" and "9000". The name says "Fiber 1 Gbit → speed snappas till 1000". Old secondary had suggestedAnnual:10200 (not 9000 — comment lied already). New is 4020.

### 9

mob-30: tier=100, p25 4200→3156, cur 5400, gross 1200→2244, net 960→1795.

### 10

File 01 done. Now read 03-combined.mjs.

### 11

Now I have the full picture for comb-01 through comb-30. The mobil-secondary fixtures (comb-31 to comb-45) are unchanged. Let me also note the header comment at line 35-37 mentions the old p25 table — I should fix that too. Let me start editing the bredband-secondary fixtures in 03. I'll process each one.

First the header comment (line 35):

### 12

The truncated read counts as not-fully-read for editing. Let me read the relevant portions explicitly. The file is read for lines 1-1177; editing within that range should work. Let me retry — actually the error means the Read was partial. Let me re-read the header range.

### 13

Now comb-01: tier=500, p25→3828, cur 10788, gross→6960, net→5568.

### 14

comb-02: tier=250, p25→3156, cur 6588, gross→3432, net→2746. Name says "950 kr/år" — update to 2746.

### 15

I'll start by understanding the test structure and running the tests to see the failures.

### 16

Let me look at the test runner output format and the fixture files.

### 17

The runner gives me actual values. Let me capture the full failure list with the "got" values, which I'll verify.

### 18

I have all 51 failures. Let me also check the mobil fixtures (mob-28, mob-29, mob-30) which the task mentioned but I don't see failing — let me verify, and get the missing ones from 07-edge-cases header.

### 19

mob-28/29/30 are not failing — their secondary is mobil or the assertion doesn't check the changed values. I'll leave them unless their comments lie. Let me read each fixture file. Starting with 03-combined.

### 20

This is a large file. The B section (comb-31+) has bredband-primary/mobil-secondary which is unchanged. Only the A section (comb-01 to comb-30) has bredband-as-secondary. Let me work through the failing comb fixtures. I'll edit each. Let me start systematically.

**comb-01** (not failing — currentAnnual 10788, p25 3828 already correct). Good.

**comb-02**: tier 250, monthly 549 → currentAnnual=6588, p25=3156, gross=3432, net=round(3432*0.8)=2746. Comment says p25=3156 already. Need: suggestedAnnual 5400→3156, grossSaving 1188→3432, netSaving 950→2746, and name "2746 kr/år" is already correct.

### 21

The system says I need to re-read since truncated. Actually I read lines 1-1176. The edit target is within that range. Let me retry — the error suggests the harness wants a fresh read. Let me read the full file in pages to be safe, then edit. Actually the issue: I only got a partial view. Let me read the rest first.

### 22

Now I have the full file. Note comb-01 was NOT in the failure list — its suggestedAnnual was already 3828 and currentAnnual 10788. Wait, comb-01 has p25=3828 already in the file (line 82) and the comment at line 56 already says p25=3828. So comb-01 was pre-updated. Good — it didn't fail.

Now let me make all edits to 03-combined. I'll go through each failing comb fixture. Let me build the verified values for each from the new table.

The failing comb ones: 02,03,04,05,06,07,08,09,12,15,16,17,18,19,20,21,22,24,26,27,28,29,30,47,48,49,50,52,53,55.

Let me compute each:
- **02**: 250, monthly 549 → cur 6588, p25 3156, gross 3432, net 2746 ✓ (done above)
- **03**: 100, monthly 350 → cur 4200, p25 3156, gross 1044≥500 → **FLIP null→set**, net round(1044*.8)=835
- **04**: 1000, monthly 849 → cur 10188, p25 4020, gross 6168≥500 → **FLIP null→set**, net 4934
- **05**: 1000, monthly 799 → cur 9588, p25 4020, gross 5568 → **FLIP null→set**, net 4454
- **06**: 500, monthly 749 → cur 8988, p25 3828, gross 5160, net round(5160*.8)=4128
- **07**: 250, monthly 549 → cur 6588, p25 3156, gross 3432, net 2746
- **08**: 500, monthly 699 → cur 8388, p25 3828, gross 4560, net 3648
- **09**: 1000, monthly 995 → cur 11940, p25 4020, gross 7920, net 6336
- **12**: 500, monthly 1398 → cur 16776, p25 3828, gross 12948, net round(12948*.8)=10358
- **15**: 500, monthly 749 → cur 8988, p25 3828, gross 5160, net 4128
- **16**: 1000, monthly 995 → cur 11940, p25 4020, gross 7920, net 6336
- **17**: 500, monthly 599 → cur 7188, p25 3828, gross 3360≥500 → **FLIP null→set**, net 2688
- **18**: 500, monthly 620 → cur 7440, p25 3828, gross 3612 → **FLIP null→set**, net 2890
- **19**: 1000, monthly 850 → cur 10200, p25 4020, gross 6180 → **FLIP null→set**, net 4944
- **20**: 500, monthly 642 → cur 7704, p25 3828, gross 3876, net round(3876*.8)=3101
- **21**: 500, monthly 600 → cur 7200, p25 3828, gross 3372 → **FLIP null→set**, net 2698
- **22**: 500, monthly 641 → cur 7692, p25 3828, gross 3864 → **FLIP null→set**, net 3091
- **24**: 1000, monthly 995 → cur 11940, p25 4020, gross 7920, net 6336
- **26**: 1000, monthly 4995 → cur 59940, p25 4020, gross 55920, net round(55920*.8)=44736
- **27**: 100, monthly 399 → cur 4788, p25 3156, gross 1632, net round(1632*.8)=1306
- **28**: 500, monthly 699 → cur 8388, p25 3828, gross 4560, net 3648
- **29**: 500, monthly 899 → cur 10788, p25 3828, gross 6960, net 5568
- **30**: 500, monthly 799 → cur 9588, p25 3828, gross 5760, net 4608
- **47**: 500, monthly 699 → cur 8388, p25 3828, gross 4560, net 3648
- **48**: 500, monthly 1498 → cur 17976, p25 3828, gross 14148, net round(14148*.8)=11318
- **49**: 1000, monthly 995 → cur 11940, p25 4020, gross 7920, net 6336
- **50**: 500, monthly 699 → cur 8388, p25 3828, gross 4560, net 3648
- **52**: 500, monthly 799 → cur 9588, p25 3828, gross 5760, net 4608
- **53**: 500, monthly 2197 → cur 26364, p25 3828, gross 22536, net round(22536*.8)=18029
- **55**: 500, monthly 899 → cur 10788, p25 3828, gross 6960, net 5568

Let me verify a few net roundings: 5160*.8=4128 ✓; 4560*.8=3648 ✓; 7920*.8=6336 ✓; 12948*.8=10358.4→10358 ✓; 55920*.8=44736 ✓; 1632*.8=1305.6→1306 ✓; 5760*.8=4608 ✓; 14148*.8=11318.4→11318 ✓; 22536*.8=18028.8→18029 ✓; 6960*.8=5568 ✓; 3876*.8=3100.8→3101 ✓; 6168*.8=4934.4→4934 ✓; 5568*.8=4454.4→4454 ✓; 1044*.8=835.2→835 ✓; 3360*.8=2688 ✓; 3612*.8=2889.6→2890 ✓; 6180*.8=4944 ✓; 3372*.8=2697.6→2698 ✓; 3864*.8=3091.2→3091 ✓; 7920... done.

Now make the edits. comb-02 first:

### 23

comb-02 name says "2746 kr/år" — already correct. Now comb-03 flip null→set:

### 24

comb-04 flip null→set:

### 25

comb-05 flip null→set:

### 26

comb-06 update values:

### 27

comb-07 values:

### 28

comb-08 values:

### 29

comb-09 values:

### 30

comb-10 didn't fail (gross stays 0/null: monthly 249→cur 2988, p25 3156, gross max(0,-168)=0→null). Comment said p25=4200 — let me fix that stale comment to avoid lying.

### 31

comb-13 didn't fail (monthly 300→3600, p25 3156, gross 444<500→null). Wait — old comment said p25=4200, gross=0. New: gross=444<500→still null. Fix comment:

### 32

comb-12 (failing). Update comment and values:

### 33

comb-15 (failing):

### 34

comb-16 (failing):

### 35

comb-17 flip null→set (gross 3360≥500):

### 36

comb-18 flip null→set:

### 37

comb-19 flip null→set:

### 38

comb-20 values:

### 39

comb-21 flip null→set:

### 40

comb-22 flip null→set:

### 41

comb-24 (failing):

### 42

comb-26 (failing):

### 43

comb-27 (failing):

### 44

comb-28 (failing): monthly 699, 500 → cur 8388, p25 3828, gross 4560, net 3648. Comment doesn't show p25. Update values:

### 45

comb-29 (failing): monthly 899, 500 → cur 10788, p25 3828, gross 6960, net 5568.

### 46

comb-30 (failing):

### 47

Now comb-47, 48, 49, 50, 52, 53, 55 (all 500 except 49=1000). comb-47:

### 48

comb-48:

### 49

comb-49:

### 50

comb-50:

### 51

comb-52:

### 52

comb-53:

### 53

comb-55:

### 54

Now let me run the tests to confirm 03-combined is clean before moving to the other files.

### 55

You've hit your session limit · resets 3am (UTC)

## Vad agenten faktiskt körde — de körbara bevisen

### Kommando 1

```bash
node tests/run.mjs 2>&1 | grep -E "# pass|# fail|# tests"
```

```
# tests 751
# pass 696
# fail 55
```

### Kommando 2

```bash
node tests/run.mjs 2>&1 | grep -A6 "not ok" | grep -E "not ok|expected|got|secondary" | head -120
```

```
    not ok 28 - mob-28 — mixed=true + bredband 500 Mbit → speed=500, secondarySaving satt
    not ok 29 - mob-29 — mixed=true + Fiber 1 Gbit → speed snappas till 1000
    not ok 30 - mob-30 — mixed=true + Internet 100 Mbit → speed=100
not ok 42 - 01 · Mobilabonnemang
    not ok 1 - comb-01 — TeleKom B2B full scenario — mobil+bredband+pbx+static_ip
    not ok 2 - comb-02 — Mobil + bredband 250 Mbit — sekundär besparing 950 kr/år
    not ok 3 - comb-03 — Mobil + bredband 100 Mbit exakt p25 — gross=0 → secondary=null
    not ok 4 - comb-04 — Mobil + bredband 1000 Mbit — sekundär besparing 950 kr/år
    not ok 5 - comb-05 — Mobil 8 abonnemang + bredband 1000 Mbit + pbx + static_ip
    not ok 6 - comb-06 — Mobil 10 abonnemang + bredband 500 Mbit + molnväxel + static_ip
    not ok 7 - comb-07 — Mobil 3 abonnemang + bredband 250 Mbit + static_ip
    not ok 8 - comb-08 — "internet" keyword triggar secondaryLine — bredband 500 Mbit
    not ok 9 - comb-09 — "ftth" keyword triggar secondaryLine — bredband 1000 Mbit
    not ok 12 - comb-12 — Mobil + 2 bredbandsrader (2 kontor) — sekundär summeras, speed från första
    not ok 15 - comb-15 — cloud-PBX addon (desc-regex) + Fiber 500 Mbit bredband
    not ok 16 - comb-16 — Bahnhof Fiber 1 Gbit — Gbit-enhet ger mbit=1000
    not ok 17 - comb-17 — Bredband 300 Mbit snappas till 500 — under p25 exakt → secondary=null
    not ok 18 - comb-18 — Fiber 499 Mbit snappas till 500 — gross 240 < 500 → secondary=null
    not ok 19 - comb-19 — Fiber 501 Mbit snappas till 1000 — gross 1200 → net 960
    not ok 20 - comb-20 — Bredband 500 Mbit 642 kr/mån — gross=504 ≥ 500 → secondary satt (gränsvärde inklusivt)
    not ok 21 - comb-21 — Bredband 500 Mbit 600 kr/mån — exakt p25, gross=0 → secondary=null
    not ok 22 - comb-22 — Bredband 500 Mbit 641 kr/mån — gross=492 < 500 → secondary=null
    not ok 24 - comb-24 — "Fiber 1 Gbit" — m[1]="1", isGbit=true → mbit=1000
    not ok 26 - comb-26 — GlobalConnect fiber 10 Gbit — mbit=10000 > 1000 snappas till 1000 (cap)
    not ok 27 - comb-27 — "ADSL 100 Mbit/s" matchar /adsl/ + speed=100
    not ok 28 - comb-28 — variable_usage ignoreras — bara recurring_subscription ingår i metrics
    not ok 29 - comb-29 — TV-tjänst matchar EJ sekundär-regex → hamnar i primaryLines
    not ok 30 - comb-30 — "Internetanslutning 500 Mbit" matchar /internet/ → secondaryLine, speed=500
    not ok 47 - comb-47 — Fälla: is_addon=true men EJ broadband addon_type → hamnar i base → secondaryLine
    not ok 48 - comb-48 — Fälla: 2 secondaryLines — "Bredband" ingen hastighet, "Fiber 500 Mbit" → speed=500
    not ok 49 - comb-49 — Fälla: "fiber optic 1 Gbps" — /gbps/ matchar som Gbit → mbit=1000
    not ok 50 - comb-50 — Fälla: negativa belopp (kredit) — primaryComponent=1445 efter summering
    not ok 52 - comb-52 — Fälla: PBX-addon (mobileAddon) + bredbandsrad (secondary) — korrekt separation
    not ok 53 - comb-53 — Fälla: 3 sekundärrader — secondary summeras, speed från FÖRSTA raden
    not ok 55 - comb
```

### Kommando 3

```bash
cat > /tmp/verify.mjs <<'EOF'
import { computeInvoiceMetrics } from './lib/invoice-metrics.js';
import { computeSecondarySaving } from './lib/secondary-savings.js';
import { bredbandSpeedBenchmark } from './agents/recommender/branchindex.js';
import { fixtures as f01 } from './tests/fixtures/01-mobil.mjs';
import { fixtures as f03 } from './tests/fixtures/03-combined.mjs';
import { fixtures as f07 } from './tests/fixtures/07-edge-cases.mjs';
import { fixtures as f08 } from './tests/fixtures/08-realistic.mjs';

// print benchmark table
for (const s of [100,250,500,1000]) {
  const b = bredbandSpeedBenchmark(s);
  console.log(`BM speed=${s} p25=${b.p25} median=${b.median}`);
}
console.log('---');

const files = {'01':f01,'03':f03,'07':f07,'08':f08};
for (const [fname, fxs] of Object.entries(files)) {
  for (const fx of fxs) {
    if (!('secondary' in fx)) continue;
    const metrics = computeInvoiceMetrics(fx.lineItems, fx.category, fx.mixed ?? false);
    const saving = computeSecondarySaving({
      metrics, category: fx.category,
      potentialMixedCategories: fx.mixed ?? false,
      industry: fx.industry ?? 'konsult',
      employees: fx.employees ?? 5,
    });
    // only print bredband-secondary (category mobil) ones, but include all to be safe
    const expNull = fx.secondary === null;
    const gotNull = saving === null;
    const tier = metrics.secondaryConnectionSpeedMbit;
    const sca = metrics.secondaryComponentMonthly;
    let line = `${fname} ${fx.id} primary=${fx.category} tier=${tier} secMonthly=${sca} `;
    if (gotNull) line += 'GOT=null';
    else line += `GOT={sug:${saving.suggestedAnnual},cur:${saving.currentAnnual},gross:${saving.grossSaving},net:${saving.netSaving}}`;
    const flip = (expNull !== gotNull) ? '  <<FLIP>>' : '';
    console.log(line + flip);
  }
}
EOF
node /tmp/verify.mjs
```

```
Exit code 1
node:internal/modules/run_main:123
    triggerUncaughtException(
    ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/tmp/lib/invoice-metrics.js' imported from /tmp/verify.mjs
Did you mean to import "../home/user/arvo-flow.github.io/lib/invoice-metrics.js"?
    at finalizeResolution (node:internal/modules/esm/resolve:275:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:985:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:731:20)
    at ModuleLoader.resolve (node:internal/modules/esm/loader:708:38)
    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:310:38)
    at ModuleJob._link (node:internal/modules/esm/module_job:182:49) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///tmp/lib/invoice-metrics.js'
}

Node.js v22.22.2
```

### Kommando 4

```bash
cat > /home/user/arvo-flow.github.io/_verify_tmp.mjs <<'EOF'
import { computeInvoiceMetrics } from './lib/invoice-metrics.js';
import { computeSecondarySaving } from './lib/secondary-savings.js';
import { bredbandSpeedBenchmark } from './agents/recommender/branchindex.js';
import { fixtures as f01 } from './tests/fixtures/01-mobil.mjs';
import { fixtures as f03 } from './tests/fixtures/03-combined.mjs';
import { fixtures as f07 } from './tests/fixtures/07-edge-cases.mjs';
import { fixtures as f08 } from './tests/fixtures/08-realistic.mjs';

for (const s of [100,250,500,1000]) {
  const b = bredbandSpeedBenchmark(s);
  console.log(`BM speed=${s} p25=${b.p25} median=${b.median}`);
}
console.log('---');

const files = {'01':f01,'03':f03,'07':f07,'08':f08};
for (const [fname, fxs] of Object.entries(files)) {
  for (const fx of fxs) {
    if (!('secondary' in fx)) continue;
    const metrics = computeInvoiceMetrics(fx.lineItems, fx.category, fx.mixed ?? false);
    const saving = computeSecondarySaving({
      metrics, category: fx.category,
      potentialMixedCategories: fx.mixed ?? false,
      industry: fx.industry ?? 'konsult',
      employees: fx.employees ?? 5,
    });
    const expNull = fx.secondary === null;
    const gotNull = saving === null;
    const tier = metrics.secondaryConnectionSpeedMbit;
    const sca = metrics.secondaryComponentMonthly;
    let line = `${fname} ${fx.id} tier=${tier} secMonthly=${sca} `;
    if (gotNull) line += 'GOT=null';
    else line += `GOT={sug:${saving.suggestedAnnual},cur:${saving.currentAnnual},gross:${saving.grossSaving},net:${saving.netSaving}}`;
    const flip = (expNull !== gotNull) ? '  <<FLIP>>' : '';
    // only relevant: secondary category bredband (primary mobil). bredband-primary→mobil-secondary unchanged
    const secCat = saving ? saving.category : (fx.secondary ? fx.secondary.category : '?');
    console.log(line + ` [secCat=${secCat}]` + flip);
  }
}
EOF
node /home/user/arvo-flow.github.io/_verify_tmp.mjs
```

```
BM speed=100 p25=3156 median=4788
BM speed=250 p25=3156 median=4980
BM speed=500 p25=3828 median=5460
BM speed=1000 p25=4020 median=5844
---
01 mob-28 tier=500 secMonthly=899 GOT={sug:3828,cur:10788,gross:6960,net:5568} [secCat=bredband]
01 mob-29 tier=1000 secMonthly=995 GOT={sug:4020,cur:11940,gross:7920,net:6336} [secCat=bredband]
01 mob-30 tier=100 secMonthly=450 GOT={sug:3156,cur:5400,gross:2244,net:1795} [secCat=bredband]
03 comb-01 tier=500 secMonthly=899 GOT={sug:3828,cur:10788,gross:6960,net:5568} [secCat=bredband]
03 comb-02 tier=250 secMonthly=549 GOT={sug:3156,cur:6588,gross:3432,net:2746} [secCat=bredband]
03 comb-03 tier=100 secMonthly=350 GOT={sug:3156,cur:4200,gross:1044,net:835} [secCat=bredband]  <<FLIP>>
03 comb-04 tier=1000 secMonthly=849 GOT={sug:4020,cur:10188,gross:6168,net:4934} [secCat=bredband]  <<FLIP>>
03 comb-05 tier=1000 secMonthly=799 GOT={sug:4020,cur:9588,gross:5568,net:4454} [secCat=bredband]  <<FLIP>>
03 comb-06 tier=500 secMonthly=749 GOT={sug:3828,cur:8988,gross:5160,net:4128} [secCat=bredband]
03 comb-07 tier=250 secMonthly=549 GOT={sug:3156,cur:6588,gross:3432,net:2746} [secCat=bredband]
03 comb-08 tier=500 secMonthly=699 GOT={sug:3828,cur:8388,gross:4560,net:3648} [secCat=bredband]
03 comb-09 tier=1000 secMonthly=995 GOT={sug:4020,cur:11940,gross:7920,net:6336} [secCat=bredband]
03 comb-10 tier=100 secMonthly=249 GOT=null [secCat=?]
03 comb-11 tier=null secMonthly=699 GOT=null [secCat=?]
03 comb-12 tier=500 secMonthly=1398 GOT={sug:3828,cur:16776,gross:12948,net:10358} [secCat=bredband]
03 comb-13 tier=100 secMonthly=300 GOT=null [secCat=?]
03 comb-14 tier=null secMonthly=null GOT=null [secCat=?]
03 comb-15 tier=500 secMonthly=749 GOT={sug:3828,cur:8988,gross:5160,net:4128} [secCat=bredband]
03 comb-16 tier=1000 secMonthly=995 GOT={sug:4020,cur:11940,gross:7920,net:6336} [secCat=bredband]
03 comb-17 tier=500 secMonthly=599 GOT={sug:3828,cur:7188,gross:3360,net:2688} [secCat=bredband]  <<FLIP>>
03 comb-18 tier=500 secMonthly=620 GOT={sug:3828,cur:7440,gross:3612,net:2890} [secCat=bredband]  <<FLIP>>
03 comb-19 tier=1000 secMonthly=850 GOT={sug:4020,cur:10200,gross:6180,net:4944} [secCat=bredband]  <<FLIP>>
03 comb-20 tier=500 secMonthly=642 GOT={sug:3828,cur:7704,gross:3876,net:3101} [secCat=bredband]
03 comb-21 tier=500 secMonthly=600 GOT={sug:3828,cur:7200,gross:3372,net:2698} [secCat=bredband]  <<FLIP>>
03 comb-22 tier=500 secMonthly=641 GOT={sug:3828,cur:7692,gross:3864,net:3091} [secCat=bredband]  <<FLIP>>
03 comb-23 tier=null secMonthly=null GOT=null [secCat=?]
03 comb-24 tier=1000 secMonthly=995 GOT={sug:4020,cur:11940,gross:7920,net:6336} [secCat=bredband]
03 comb-25 tier=null secMonthly=null GOT=null [secCat=?]
03 comb-26 tier=1000 secMonthly=4995 GOT={sug:4020,cur:59940,gross:55920,net:44736} [secCat=bredband]
03 comb-27 tier=100 secMonthly=399 GOT={sug:3156,cur:4788,gross:1632,net:1306} [secCat=bredband]
03 comb-28 tier=500 secMonthly=699 GOT={sug:3828,cur:8388,gross:4560,net:3648} [secCat=bredban
```

### Kommando 5

```bash
node /home/user/arvo-flow.github.io/_verify_tmp.mjs 2>/dev/null | grep "secCat=bredband"
```

```
01 mob-28 tier=500 secMonthly=899 GOT={sug:3828,cur:10788,gross:6960,net:5568} [secCat=bredband]
01 mob-29 tier=1000 secMonthly=995 GOT={sug:4020,cur:11940,gross:7920,net:6336} [secCat=bredband]
01 mob-30 tier=100 secMonthly=450 GOT={sug:3156,cur:5400,gross:2244,net:1795} [secCat=bredband]
03 comb-01 tier=500 secMonthly=899 GOT={sug:3828,cur:10788,gross:6960,net:5568} [secCat=bredband]
03 comb-02 tier=250 secMonthly=549 GOT={sug:3156,cur:6588,gross:3432,net:2746} [secCat=bredband]
03 comb-03 tier=100 secMonthly=350 GOT={sug:3156,cur:4200,gross:1044,net:835} [secCat=bredband]  <<FLIP>>
03 comb-04 tier=1000 secMonthly=849 GOT={sug:4020,cur:10188,gross:6168,net:4934} [secCat=bredband]  <<FLIP>>
03 comb-05 tier=1000 secMonthly=799 GOT={sug:4020,cur:9588,gross:5568,net:4454} [secCat=bredband]  <<FLIP>>
03 comb-06 tier=500 secMonthly=749 GOT={sug:3828,cur:8988,gross:5160,net:4128} [secCat=bredband]
03 comb-07 tier=250 secMonthly=549 GOT={sug:3156,cur:6588,gross:3432,net:2746} [secCat=bredband]
03 comb-08 tier=500 secMonthly=699 GOT={sug:3828,cur:8388,gross:4560,net:3648} [secCat=bredband]
03 comb-09 tier=1000 secMonthly=995 GOT={sug:4020,cur:11940,gross:7920,net:6336} [secCat=bredband]
03 comb-12 tier=500 secMonthly=1398 GOT={sug:3828,cur:16776,gross:12948,net:10358} [secCat=bredband]
03 comb-15 tier=500 secMonthly=749 GOT={sug:3828,cur:8988,gross:5160,net:4128} [secCat=bredband]
03 comb-16 tier=1000 secMonthly=995 GOT={sug:4020,cur:11940,gross:7920,net:6336} [secCat=bredband]
03 comb-17 tier=500 secMonthly=599 GOT={sug:3828,cur:7188,gross:3360,net:2688} [secCat=bredband]  <<FLIP>>
03 comb-18 tier=500 secMonthly=620 GOT={sug:3828,cur:7440,gross:3612,net:2890} [secCat=bredband]  <<FLIP>>
03 comb-19 tier=1000 secMonthly=850 GOT={sug:4020,cur:10200,gross:6180,net:4944} [secCat=bredband]  <<FLIP>>
03 comb-20 tier=500 secMonthly=642 GOT={sug:3828,cur:7704,gross:3876,net:3101} [secCat=bredband]
03 comb-21 tier=500 secMonthly=600 GOT={sug:3828,cur:7200,gross:3372,net:2698} [secCat=bredband]  <<FLIP>>
03 comb-22 tier=500 secMonthly=641 GOT={sug:3828,cur:7692,gross:3864,net:3091} [secCat=bredband]  <<FLIP>>
03 comb-24 tier=1000 secMonthly=995 GOT={sug:4020,cur:11940,gross:7920,net:6336} [secCat=bredband]
03 comb-26 tier=1000 secMonthly=4995 GOT={sug:4020,cur:59940,gross:55920,net:44736} [secCat=bredband]
03 comb-27 tier=100 secMonthly=399 GOT={sug:3156,cur:4788,gross:1632,net:1306} [secCat=bredband]
03 comb-28 tier=500 secMonthly=699 GOT={sug:3828,cur:8388,gross:4560,net:3648} [secCat=bredband]
03 comb-29 tier=500 secMonthly=899 GOT={sug:3828,cur:10788,gross:6960,net:5568} [secCat=bredband]
03 comb-30 tier=500 secMonthly=799 GOT={sug:3828,cur:9588,gross:5760,net:4608} [secCat=bredband]
03 comb-47 tier=500 secMonthly=699 GOT={sug:3828,cur:8388,gross:4560,net:3648} [secCat=bredband]
03 comb-48 tier=500 secMonthly=1498 GOT={sug:3828,cur:17976,gross:14148,net:11318} [secCat=bredband]
03 comb-49 tier=1000 secMonthly=995 GOT={sug:4020,cur:11940,gross:7920,net:6336} [
```

### Kommando 6

```bash
node tests/run.mjs 2>&1 | grep -E "# pass|# fail|# tests"
```

```
# tests 751
# pass 700
# fail 51
```

### Kommando 7

```bash
node tests/run.mjs 2>&1 | grep -iE "bredband|secondary|FAIL|not ok" | head -80
```

```
# Subtest: Tele2-bredband — parser (normalizeTele2Product)
ok 22 - Tele2-bredband — parser (normalizeTele2Product)
# Subtest: Tele2-bredband — verifierade priser låsta i prisboken
ok 23 - Tele2-bredband — verifierade priser låsta i prisboken
    # Subtest: bredband har INGEN industry×size-benchmark (hastighetsbaserad) → getBenchmark null
    ok 2 - bredband har INGEN industry×size-benchmark (hastighetsbaserad) → getBenchmark null
# Subtest: BI-08 · Bredband bredbandSpeedBenchmark (härledd ur tele2Verified)
ok 31 - BI-08 · Bredband bredbandSpeedBenchmark (härledd ur tele2Verified)
    # Subtest: mob-27 — mixed=true men inga bredband-rader → secondaryComponentMonthly=null
    ok 27 - mob-27 — mixed=true men inga bredband-rader → secondaryComponentMonthly=null
    # Subtest: mob-28 — mixed=true + bredband 500 Mbit → speed=500, secondarySaving satt
    ok 28 - mob-28 — mixed=true + bredband 500 Mbit → speed=500, secondarySaving satt
# Subtest: 02 · Bredband
    # Subtest: brd-01 — Enkel bredband 100 Mbit — mixed=false
    ok 1 - brd-01 — Enkel bredband 100 Mbit — mixed=false
    # Subtest: brd-02 — Bredband 250 Mbit — mixed=false
    ok 2 - brd-02 — Bredband 250 Mbit — mixed=false
    # Subtest: brd-03 — Bredband 500 Mbit — mixed=false
    ok 3 - brd-03 — Bredband 500 Mbit — mixed=false
    # Subtest: brd-04 — Bredband 1000 Mbit — mixed=false
    ok 4 - brd-04 — Bredband 1000 Mbit — mixed=false
    # Subtest: brd-05 — Bredband + statisk IP via addon_type
    ok 5 - brd-05 — Bredband + statisk IP via addon_type
    # Subtest: brd-06 — Bredband + managed firewall via addon_type
    ok 6 - brd-06 — Bredband + managed firewall via addon_type
    # Subtest: brd-07 — Bredband + SLA-uppgradering via addon_type
    ok 7 - brd-07 — Bredband + SLA-uppgradering via addon_type
    # Subtest: brd-08 — Bredband + alla tre addons — broadbandAddonMonthly=647
    ok 8 - brd-08 — Bredband + alla tre addons — broadbandAddonMonthly=647
    # Subtest: brd-16 — Bredband combined + 3 SIM-abonnemang på en rad → secondarySeatCount=1
    ok 16 - brd-16 — Bredband combined + 3 SIM-abonnemang på en rad → secondarySeatCount=1
    # Subtest: brd-17 — Bredband combined + SIM-kort Business — matches /\\bsim\\b/
    ok 17 - brd-17 — Bredband combined + SIM-kort Business — matches /\\bsim\\b/
    # Subtest: brd-18 — Bredband combined — secondary gross=720 ≥ 500 → secondarySaving satt
    ok 18 - brd-18 — Bredband combined — secondary gross=720 ≥ 500 → secondarySaving satt
    # Subtest: brd-19 — Bredband + 1 SIM-rad 299 kr/mån → gross=720 → secondarySaving satt
    ok 19 - brd-19 — Bredband + 1 SIM-rad 299 kr/mån → gross=720 → secondarySaving satt
    # Subtest: brd-20 — Bredband + 2 SIM-rader à 350 kr → gross=2664 → secondarySaving satt
    ok 20 - brd-20 — Bredband + 2 SIM-rader à 350 kr → gross=2664 → secondarySaving satt
    # Subtest: brd-26 — Tele2 Företag Bredband 1000 Mbit 849 kr
    ok 26 - brd-26 — Tele2 Företag Bredband 1000 Mbit 849 kr
    # Subtest: brd-31 — Bredbandsbol
```

### Kommando 8

```bash
node tests/run.mjs 2>&1 | grep -E "not ok|got|should be null" | head -200
```

```
    not ok 2 - comb-02 — Mobil + bredband 250 Mbit — sekundär besparing 2746 kr/år
        [comb-02] secondary.suggestedAnnual: expected 5400, got 3156
    not ok 3 - comb-03 — Mobil + bredband 100 Mbit exakt p25 — gross=0 → secondary=null
        [comb-03] secondarySaving should be null, got {"category":"bredband","speedMbit":100,"currentAnnual":4200,"suggestedAnnual":3156,"grossSaving":1044,"netSaving":835}
    not ok 4 - comb-04 — Mobil + bredband 1000 Mbit — sekundär besparing 950 kr/år
        [comb-04] secondarySaving should be null, got {"category":"bredband","speedMbit":1000,"currentAnnual":10188,"suggestedAnnual":4020,"grossSaving":6168,"netSaving":4934}
    not ok 5 - comb-05 — Mobil 8 abonnemang + bredband 1000 Mbit + pbx + static_ip
        [comb-05] secondarySaving should be null, got {"category":"bredband","speedMbit":1000,"currentAnnual":9588,"suggestedAnnual":4020,"grossSaving":5568,"netSaving":4454}
    not ok 6 - comb-06 — Mobil 10 abonnemang + bredband 500 Mbit + molnväxel + static_ip
        [comb-06] secondary.suggestedAnnual: expected 7200, got 3828
    not ok 7 - comb-07 — Mobil 3 abonnemang + bredband 250 Mbit + static_ip
        [comb-07] secondary.suggestedAnnual: expected 5400, got 3156
    not ok 8 - comb-08 — "internet" keyword triggar secondaryLine — bredband 500 Mbit
        [comb-08] secondary.suggestedAnnual: expected 7200, got 3828
    not ok 9 - comb-09 — "ftth" keyword triggar secondaryLine — bredband 1000 Mbit
        [comb-09] secondary.suggestedAnnual: expected 10200, got 4020
    not ok 12 - comb-12 — Mobil + 2 bredbandsrader (2 kontor) — sekundär summeras, speed från första
        [comb-12] secondary.suggestedAnnual: expected 7200, got 3828
    not ok 15 - comb-15 — cloud-PBX addon (desc-regex) + Fiber 500 Mbit bredband
        [comb-15] secondary.suggestedAnnual: expected 7200, got 3828
    not ok 16 - comb-16 — Bahnhof Fiber 1 Gbit — Gbit-enhet ger mbit=1000
        [comb-16] secondary.suggestedAnnual: expected 10200, got 4020
    not ok 17 - comb-17 — Bredband 300 Mbit snappas till 500 — under p25 exakt → secondary=null
        [comb-17] secondarySaving should be null, got {"category":"bredband","speedMbit":500,"currentAnnual":7188,"suggestedAnnual":3828,"grossSaving":3360,"netSaving":2688}
    not ok 18 - comb-18 — Fiber 499 Mbit snappas till 500 — gross 240 < 500 → secondary=null
        [comb-18] secondarySaving should be null, got {"category":"bredband","speedMbit":500,"currentAnnual":7440,"suggestedAnnual":3828,"grossSaving":3612,"netSaving":2890}
    not ok 19 - comb-19 — Fiber 501 Mbit snappas till 1000 — gross 1200 → net 960
        [comb-19] secondarySaving should be null, got {"category":"bredband","speedMbit":1000,"currentAnnual":10200,"suggestedAnnual":4020,"grossSaving":6180,"netSaving":4944}
    not ok 20 - comb-20 — Bredband 500 Mbit 642 kr/mån — gross=504 ≥ 500 → secondary satt (gränsvärde inklusivt)
        [comb-20] secondary.suggestedAnnual: expected 7200, got 3828
    not ok 21 - co
```

### Kommando 9

```bash
node tests/run.mjs 2>&1 | grep -E "not ok" | grep -iE "mob-2[89]|mob-30"
```

```
(Bash completed with no output)
```

### Kommando 10

```bash
node tests/run.mjs 2>&1 | grep -E "^    not ok|comb-" | grep "not ok" | head -40
```

```
    not ok 9 - edge-09 — Bredband 500 Mbit 641 kr/mån: gross=492 < 500 → secondary=null
    not ok 10 - edge-10 — Bredband 500 Mbit 642 kr/mån: gross=504 ≥ 500 → secondary returneras
    not ok 16 - edge-16 — "1 Gbit/s" → speedMbit=1000 (Gbit-konvertering)
    not ok 17 - edge-17 — "100/100 Mbit" → speedMbit=100 (slash-format tar första siffran)
    not ok 18 - edge-18 — "50 Mbit" snappas till 100 (50≤100) — gross=360 < 500 → secondary=null
    not ok 19 - edge-19 — "750 Mbit" snappas till 1000 (500 < 750 ≤ 1000) → gross=1200, net=960
    not ok 20 - edge-20 — "internet 2 Gbit" → mbit=2000 > 1000 → snap till 1000 (cap)
    not ok 26 - edge-26 — Bredband 250 Mbit 492 kr/mån: gross=504 ≥ 500 → secondary returneras
    not ok 27 - edge-27 — Bredband 250 Mbit 491 kr/mån: gross=492 < 500 → secondary=null
    not ok 5 - telia-05 — Telia kombinerad: 10 mobil + Fiber 500 Mbit — mixed=true
    not ok 9 - tele2-04 — Tele2 kombinerad: 5 mobil + Bredband 1 Gbit — mixed=true
    not ok 10 - tele2-05 — Tele2 kombinerad: 15 mobil + Fiber 250 Mbit — mixed=true
    not ok 40 - combo-01 — Tele2: 20 mobil (5980) + 1 Gbit (850) — gross=1200, net=960
    not ok 41 - combo-02 — Telenor: 5 mobil (1495) + 100 Mbit (420) — gross=840, net=672
    not ok 42 - combo-03 — Tele2: 8 mobil (2792) + 250 Mbit (495) — gross=540, net=432
    not ok 43 - combo-04 — Telia: 3 mobil (897) + 500 Mbit (600) — gross=0 → secondary=null
    not ok 44 - combo-05 — Telenor: 12 mobil (4188) + 500 Mbit (750) — gross=1800, net=1440
    not ok 48 - combo-09 — Tele2: 50 mobil (17350) + 1 Gbit (900) — gross=600, net=480
    not ok 49 - combo-10 — Telenor: 15 mobil (4485) + 1 Gbit (895) — gross=540, net=432
    not ok 65 - misc-16 — Tele2 mobil + ADSL-anslutning — mixed=true, "adsl" matchar secondary-regex
    not ok 70 - misc-21 — Telenor mobil + FTTH-anslutning — "ftth" matchar secondary-regex
```
