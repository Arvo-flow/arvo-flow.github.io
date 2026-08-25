# Skörd: a48ce8605d9c1d4f2

> **OPRÖVAD.** Det här är agentens arbete, räddat ur harnessets transkript — inte ett
> bevisat fynd. Skörden visar att arbetet UTFÖRDES; om slutsatsen är sann avgörs av
> motprövning med ett körbart bevis, precis som för varje annan hypotes.

· körning: `subagents` · agent: `a48ce8605d9c1d4f2`
· slutsatser: 64 · körda kommandon: 21
· **bär analys**

## Uppdraget

```
(saknas i transkriptet)
```

## Vad agenten formulerade

### 1

I'll start by running the tests to see the failures.

### 2

Let me get the full list of failures grouped by file. Let me run with a cleaner output.

### 3

Now let me get the detailed error for each failure with expected/actual values.

### 4

I have all the failures with engine outputs. Let me verify each one and categorize. The engine outputs are the new truth. Let me verify a few key ones:

- `2868 × 1 = 2868`, `2868 × 2 = 5736`, `2868 × 3 = 8604`, `2868 × 4 = 11472`, `2868 × 5 = 14340`, `2868 × 6 = 17208`, `2868 × 8 = 22944`, `2868 × 10 = 28680` — all match engine output.

The null-flips: brd-18, brd-19, edge-29 (currentAnnual=3588, gross=720, net=576), comb-37 (currentAnnual=4080, gross=1212, net=970), edge-21, bb-04, bb-05, combo-06, combo-08 — these went from null to set.

Let me look at the fixture files now.

### 5

I notice the comment block (lines 12-16) lists per-segment p25 values like `byraer.micro=3588, byraer.small=3408, byraer.mid=3228`. But the engine outputs show ALL seatCounts use 2868 flatly. Let me check: brd-35 (employees=20→small) got 2868, not 2808. brd-38 (small) got 8604 = 2868×3. brd-40 (mid) got 28680 = 2868×10. So the new benchmark is flat 2868 across all buckets — the per-bucket variation (small=3408, mid=3228) no longer exists. The task says "flat matrix."

So the comment block lines 12-16 are now stale and must be updated to reflect flat 2868. Let me verify what the OLD p25 values mapped to in the engine. Actually the task says the change is p25: 3588→2868 for ALL segments and buckets (flat). The OLD comment showed small=3408, mid=3228 — but engine outputs prove it's now flat 2868 everywhere. Let me confirm by checking the engine's secondary computation isn't using bucket scaling. The outputs confirm flat 2868. 

Let me now make all edits to file 02. Starting with the header comment block.

### 6

Now brd-16: seatCount=1, suggestedAnnual 3588→2868, currentAnnual 12564, gross=12564-2868=9696, net=round(9696*0.80)=7757. Engine got 2868 for suggestedAnnual; let me verify the full engine object.

### 7

These computed values match the engine's `suggestedAnnual` outputs (2868, 5736, 8604, 28680) reported in failures. brd-18/brd-19 flip to set objects (gross=720). Now let me apply edits. brd-16:

### 8

brd-17:

### 9

brd-18 (flip to set):

### 10

brd-34:

### 11

brd-35: employees=20→small. Old comment said small=3408 p25Total=3408. New flat 2868. Engine gives currentAnnual 12564, sugg 2868, gross 9696, net 7757.

### 12

The brd-35 secondary block currently has `suggestedAnnual: 3588, grossSaving: 8976, netSaving: 7181` (the old fixture was already inconsistent with its comment, but it asserted 3588). Engine wants 2868/9696/7757:

### 13

brd-38: seatCount=3. Old comment said small/3408 p25Total=10224. But old fixture asserted suggestedAnnual 10764 (=3588×3). Engine now gives 8604 (=2868×3), gross 3960, net 3168.

### 14

I'll start by running the tests to see the failures.

### 15

Let me see the full failure list to understand each failing fixture.

### 16

Now let me read each fixture file. Let me start with the mobil comments file and then the four failing files.

### 17

Let me look at the test runner to understand assertion semantics, then grep for the relevant numbers (4188, 3588) across fixtures.

### 18

The CLAUDE.md note said comments at ~26 and ~444. Line 26 may be elsewhere. Let me check line 26 area and 444.

### 19

Line 26 has no 4188 reference (it's 349/1745). Let me look at lines 440-448 and 620-655.

### 20

This comment is stale (median is now 3348). The amount stays 1745. But note 4188/user × 5 = 20940 doesn't match 1745×12=20940 either — actually 1745 kr/mån × 12 = 20940, and 20940/5 = 4188/user/year. With new median 3348, this comment's premise is off. But the task says only fix comment to reference new median. Let me update the comment to reflect new median 3348. 3348×5 = 16740, which is NOT 20940. The fixture amount is 1745/mån = 20940/yr, that's the actual invoice (not the benchmark). The comment was illustrating that 1745/mån ≈ median. Under the new median that's no longer "exakt branschsnittspris". But since this fixture only tests metrics (not secondary), I'll just correct the stale benchmark number reference. Let me update it minimally to not lie.

### 21

Now lines 620-655 in 01-mobil (the 3588 references). Let me check if these are in a failing fixture. mob fixtures weren't in the failing list, so these assertions pass. The 3588 there refers to grossSaving=3588 — let me check whether that's mobil benchmark-derived or just input arithmetic.

### 22

mob-28 is a bredband secondary (p25=7200 is bredband benchmark), grossSaving=3588 here is bredband-derived, not mobil. This passes and is unrelated to mobil change. I'll leave it. Good — 01-mobil is done.

Now the four failing files. These are large; let me delegate the bulk editing to parallel agents, one per file, with precise instructions. But arithmetic verification is critical. Let me first understand the exact failing values by examining each. Let me get the engine's actual values for all failing fixtures by reading the full failure output with expected/actual.

### 23

Some failures show no assertion line (the null-flip cases where the first failing assertion is that secondary is null but engine returns an object, or vice versa). Let me get those specific errors.

### 24

Now I have the engine's actual output for every failing fixture. Let me verify the arithmetic for each (suggestedAnnual = round(2868 × seats), gross = currentAnnual − suggested, net = round(gross × 0.80), null if gross < 500):

- comb-37: seats=1, curr=4080, sugg=2868, gross=1212, net=970 ✓ (970 = round(1212×0.8)=969.6→970) — flips null→set
- edge-21: seats=3, curr=10764, sugg=8604, gross=2160, net=1728 ✓ — flips null→set
- edge-29: seats=1, curr=3588, sugg=2868, gross=720, net=576 ✓ — flips null→set
- bb-04: seats=6, curr=21528, sugg=17208, gross=4320, net=3456 ✓ — flips null→set
- bb-05: seats=3, curr=10764, sugg=8604, gross=2160, net=1728 ✓ — flips null→set
- combo-06: seats=10, curr=35880, sugg=28680, gross=7200, net=5760 ✓ — flips null→set
- combo-08: seats=4, curr=14352, sugg=11472, gross=2880, net=2304 ✓ — flips null→set

Now the simple suggestedAnnual-only updates. Let me check there are no other fields wrong in those (gross/net should also change since suggested dropped). The runner stops at first failing assertion. Let me check the simpler cases like comb-31 fully — I need to compute all three fields. Let me get the full engine output for ALL failing fixtures by writing a quick verification helper.

### 25

Let me look at how the test runner builds the args so I can write a verification script that prints actual output for each failing fixture.

### 26

Now let me write a temporary script that prints the full computeSecondarySaving output for each failing fixture, so I have ground truth for all three fields.

### 27

I now have ground truth for all 26. Let me independently verify each against the formula (sugg=round(2868×seats), gross=curr−sugg, net=round(gross×0.8), null if gross<500):

- brd-38: 2868×3=8604, 12564−8604=3960, 3960×.8=3168 ✓
- brd-40: 2868×10=28680, 41880−28680=13200, ×.8=10560 ✓
- comb-31: 2868×1=2868, 12564−2868=9696, ×.8=7756.8→7757 ✓
- comb-32: 2868, 21528−2868=18660, ×.8=14928 ✓
- comb-33: 2868, 4188−2868=1320, ×.8=1056 ✓
- comb-34: 2868, 4788−2868=1920, ×.8=1536 ✓
- comb-35: 2868×2=5736, 8376−5736=2640, ×.8=2112 ✓
- comb-37: 2868, 4080−2868=1212, ×.8=969.6→970 ✓ (flip null→set)
- comb-38: 2868, 4092−2868=1224, ×.8=979.2→979 ✓
- comb-39: 28680, 41880−28680=13200, ×.8=10560 ✓
- comb-41: 2868, 8388−2868=5520, ×.8=4416 ✓
- comb-42: 2868, 8376−2868=5508, ×.8=4406.4→4406 ✓
- comb-44: 2868, 215280−2868=212412, ×.8=169929.6→169930 ✓
- comb-45: 8604, 12564−8604=3960, ×.8=3168 ✓
- edge-21: 8604, 10764−8604=2160, ×.8=1728 ✓ (flip null→set)
- edge-22: 2868, 20940−2868=18072, ×.8=14457.6→14458 ✓
- edge-23: 2868, 11988−2868=9120, ×.8=7296 ✓
- edge-28: 2868, 4104−2868=1236, ×.8=988.8→989 ✓
- edge-29: 2868, 3588−2868=720, ×.8=576 ✓ (flip null→set)
- edge-30: 11472, 16752−11472=5280, ×.8=4224 ✓
- bb-04: 17208, 21528−17208=4320, ×.8=3456 ✓ (flip null→set)
- bb-05: 8604, 10764−8604=2160, ×.8=1728 ✓ (flip null→set)
- combo-06: 28680, 35880−28680=7200, ×.8=5760 ✓ (flip null→set)
- combo-07: 22944, 33504−22944=10560, ×.8=8448 ✓
- combo-08: 11472, 14352−11472=2880, ×.8=2304 ✓ (flip null→set)
- misc-20: 5736, 11976−5736=6240, ×.8=4992 ✓

All verified. Now let me edit the fixtures. Let me read each fixture's exact block. Start with 02-bredband (brd-38, brd-40).

### 28

Note brd-38 comment already says "mobilP25=2868 (flat)" and p25Total=8604 — the comment was pre-updated but the secondary block has old values (10764/1800/1440). And brd-40 comment mentions mid bucket=3228/32280 but the flat matrix means it's 2868 for all buckets. The engine gives 28680 (=2868×10), confirming flat. Let me fix both blocks and brd-40's comment.

### 29

02-bredband done (2 fixtures). Now the larger files (03-combined: 12 fixtures, 07-edge-cases: 6, 08-realistic: 6). Given the volume and the precision required, I'll handle them myself carefully. Let me read the relevant blocks of 03-combined.

### 30

Now I have full context for comb-31 through comb-39. Note comb-37 and comb-38 are deliberate threshold cases at 340/341 kr. Under new p25=2868, both now yield gross ≥ 500 (1212 and 1224). Per instructions, I update them to the new reality (set objects). Their comments need rewriting too. Let me also check comb-36 (249 kr → 2988 annual): under new p25=2868, gross = 2988−2868 = 120 < 500 → still null. comb-36 doesn't fail, correct.

Let me apply edits for comb-31 through comb-39. Starting with comb-31 comment + block.

### 31

comb-32:

### 32

comb-33 (gross changes 600→1320; name says "gross=600, net=480" — update name too):

### 33

comb-34 (name mentions p25=3588):

### 34

comb-35 (name says gross=1200, net=960):

### 35

Now comb-37 — flips null→set. Engine: seats=1, curr=4080, sugg=2868, gross=1212, net=970. Rewrite comment, name, and change `secondary: null` to a set object.

### 36

comb-38: still set, but values change (curr=4092, sugg=2868, gross=1224, net=979):

### 37

comb-39 (name says p25=3588×10=35880, comment has stale bucket math). Engine: sugg=28680, gross=13200, net=10560:

### 38

Now comb-41, comb-42, comb-44, comb-45. Let me read those blocks.

### 39

comb-41 (engine: sugg=2868, gross=5520, net=4416):

### 40

comb-42 (engine: sugg=2868, gross=5508, net=4406):

### 41

comb-44 (engine: sugg=2868, gross=212412, net=169930):

### 42

comb-45 (name says p25=3588×3=10764; engine: sugg=8604, gross=3960, net=3168):

### 43

03-combined done (12 fixtures). Now 07-edge-cases: edge-21, 22, 23, 28, 29, 30.

### 44

edge-21 flips null→set (engine: seats=3, curr=10764, sugg=8604, gross=2160, net=1728). This was a 299×3 deliberate gross=0 case. Update comment + block.

### 45

edge-22 (engine: sugg=2868, gross=18072, net=14458):

### 46

edge-23 (engine: sugg=2868, gross=9120, net=7296):

### 47

Now edge-28, 29, 30.

### 48

edge-28 (still set; engine: sugg=2868, gross=1236, net=989). Name mentions "secAnnual=4104 > p25Total+500=4088" — p25Total is now 2868, so 4104 > 3368. Update name and comments.

### 49

edge-29 flips null→set (engine: seats=1, curr=3588, sugg=2868, gross=720, net=576). The 299 kr was designed to exactly hit OLD p25=3588. Now it's set. Update name, comments, block.

### 50

edge-30 (still set; name+comments mention p25Total=14352; engine: sugg=11472, gross=5280, net=4224):

### 51

07-edge done (6 fixtures). Now 08-realistic: bb-04, bb-05, combo-06, combo-07, combo-08, misc-20.

### 52

bb-04 flips null→set (engine: seats=6, curr=21528, sugg=17208, gross=4320, net=3456). bb-05 flips null→set (seats=3, curr=10764, sugg=8604, gross=2160, net=1728).

### 53

Now combo-06, combo-07, combo-08.

### 54

combo-06 was already updated to `secondary: null` in the debt-cleanup (the comment says "kund på/under verifierat listpris"). But the engine now returns a set object (seats=10, curr=35880, sugg=28680, gross=7200, net=5760). The 299 kr × 10 = 35880 vs new p25Total 28680. So combo-06 must flip null→set per the engine. The `secondary: null` was based on OLD p25 where 299=p25 Bas. Now the corrected p25 is 2868 (239 kr "60 GB" plan), so 299 kr IS above p25 → real saving. Update to set object.

Note: combo-06 name/comment mention "small p25=3408" which is stale (flat matrix → 2868).

### 55

combo-07 (still set; engine: sugg=22944, gross=10560, net=8448). Name+comments mention p25=3408 and gross=4800. Update.

### 56

combo-08 flips null→set (engine: seats=4, curr=14352, sugg=11472, gross=2880, net=2304). 299×4=14352 = OLD p25Total. Now set.

### 57

Now misc-20.

### 58

misc-20 (still set; engine: sugg=5736, gross=6240, net=4992). The comment block at line 1813 had a contradiction (claimed p25Total=6816 but block had 7176). Engine now gives p25Total=2868×2=5736. Update name + both comment lines + block.

### 59

All 26 fixtures updated. Let me clean up the temp file and re-run the full suite.

### 60

Fully green. Let me also verify no stale 3588/4188/3408/3228 mobil-p25 references remain in the comments of these files (excluding legitimate input amounts and bredband values).

### 61

Two of these (lines 56, 1780) are bredband cases (p25=7200, gross=3588 is bredband-derived, unrelated to mobil). Line 1147 is comb-36 — let me check it: 249 kr mobil under p25, gross=0 → null, but the comment still says mobilP25=3588. comb-36 passes (still null) because 2988 < 2868 is false — wait 2988 > 2868, so gross would be 120 < 500 → null. Let me verify and fix the stale comment.

### 62

comb-36 stays null (gross = 2988−2868 = 120 < 500). But the comment lies (says p25=3588, gross=0). Under new p25, gross is 120, still <500 → null holds. Fix the comment to be truthful.

### 63

Lines 56 and 1780 are bredband (mob-28 style: p25=7200 is bredband, gross=3588 coincidentally equals the old mobil number but is bredband-derived). Those are correct and unrelated. Let me re-run to confirm still green after the comb-36 comment fix.

### 64

Green. Done. Here is the report.

## Summary

The single benchmark change (mobil p25 3588→2868, median 4188→3348, flat across all segments/buckets) was followed through all regression fixtures. Final suite is fully green.

**Final summary line (verbatim):**
```
# tests 747
# pass 747
# fail 0
```

### Fixtures changed per file
- **tests/fixtures/01-mobil.mjs** — 1 comment-only fix (mob-20: stale `median=4188` → `3348`; no assertions failed). The other 3588 references (mob-28) are bredband-derived, left untouched.
- **tests/fixtures/02-bredband.mjs** — 2 fixtures (brd-38, brd-40).
- **tests/fixtures/03-combined.mjs** — 12 fixtures (comb-31, 32, 33, 34, 35, 37, 38, 39, 41, 42, 44, 45) + 1 comment-truth fix on comb-36 (stays null; comment corrected to new p25/gross).
- **tests/fixtures/07-edge-cases.mjs** — 6 fixtures (edge-21, 22, 23, 28, 29, 30).
- **tests/fixtures/08-realistic.mjs** — 6 fixtures (bb-04, bb-05, combo-06, combo-07, combo-08, misc-20).

All expected values were independently computed from the formulas (suggestedAnnual = round(2868 × seats), gross = currentAnnual − suggested, net = round(gross × 0.80), null if gross < 500) and matched the engine output exactly. Comment blocks and `name:` strings were updated so no arithmetic lies remain. No source code, scripts, or non-mobil fixtures were touched.

### Secondary/saving flips (null → set) — 7 total
All were 299 kr/mån SIM scenarios designed against the old p25 (299×12=3588 = old p25); under p25=2868 they now clear the 500 kr threshold:

| Fixture | seats | currentAnnual | suggested (2868×seats) | gross | net |
|---|---|---|---|---|---|
| comb-37 (03) | 1 | 4080 | 2868 | 1212 | 970 |
| edge-21 (07) | 3 | 10764 | 8604 | 2160 | 1728 |
| edge-29 (07) | 1 | 3588 | 2868 | 720 | 576 |
| bb-04 (08) | 6 | 21528 | 17208 | 4320 | 3456 |
| bb-05 (08) | 3 | 10764 | 8604 | 2160 | 1728 |
| combo-06 (08) | 10 | 35880 | 28680 | 7200 | 5760 |
| combo-08 (08) | 4 | 14352 | 11472 | 2880 | 2304 |

Note: combo-06 had previously been hard-set to `secondary: null` (with a "kund på/under verifierat listpris" comment) under the old p25 where 299 kr equaled the Bas list price. The corrected p25 (2868 = 239 kr "60 GB" plan) means 299 kr now sits above p25, so the engine produces a real saving — the fixture and comment were updated to the new reality. No flips went set → null. comb-36 (249 kr) stays null (gross 120 < 500).

## Vad agenten faktiskt körde — de körbara bevisen

### Kommando 1

```bash
node tests/run.mjs 2>&1 | tail -80
```

```
      ---
      duration_ms: 0.024105
      type: 'test'
      ...
    # Subtest: misc-16 — Tele2 mobil + ADSL-anslutning — mixed=true, "adsl" matchar secondary-regex
    ok 65 - misc-16 — Tele2 mobil + ADSL-anslutning — mixed=true, "adsl" matchar secondary-regex
      ---
      duration_ms: 0.026533
      type: 'test'
      ...
    # Subtest: misc-17 — Bredband 500 Mbit + SLA-uppgradering (addon_type=sla)
    ok 66 - misc-17 — Bredband 500 Mbit + SLA-uppgradering (addon_type=sla)
      ---
      duration_ms: 0.022979
      type: 'test'
      ...
    # Subtest: misc-18 — Feelgood Företagshälsa — 10 anst, baspaket
    ok 67 - misc-18 — Feelgood Företagshälsa — 10 anst, baspaket
      ---
      duration_ms: 0.020945
      type: 'test'
      ...
    # Subtest: misc-19 — Telia Jobbmobil + Teams direkt-integration via desc-regex
    ok 68 - misc-19 — Telia Jobbmobil + Teams direkt-integration via desc-regex
      ---
      duration_ms: 0.020495
      type: 'test'
      ...
    # Subtest: misc-20 — Bredband 500 Mbit + 2 premium-mobilabonnemang — byraer small, gross=4800, net=3840
    not ok 69 - misc-20 — Bredband 500 Mbit + 2 premium-mobilabonnemang — byraer small, gross=4800, net=3840
      ---
      duration_ms: 0.117044
      type: 'test'
      location: '/home/user/arvo-flow.github.io/tests/run.mjs:106:25'
      failureType: 'testCodeFailure'
      error: |-
        [misc-20] secondary.suggestedAnnual: expected 7176, got 5736
        
        5736 !== 7176
        
      code: 'ERR_ASSERTION'
      name: 'AssertionError'
      expected: 7176
      actual: 5736
      operator: 'strictEqual'
      stack: |-
        runFixture (file:///home/user/arvo-flow.github.io/tests/run.mjs:65:16)
        TestContext.<anonymous> (file:///home/user/arvo-flow.github.io/tests/run.mjs:106:61)
        Test.runInAsyncScope (node:async_hooks:214:14)
        Test.run (node:internal/test_runner/test:1047:25)
        Suite.processPendingSubtests (node:internal/test_runner/test:744:18)
        Test.postRun (node:internal/test_runner/test:1173:19)
        Test.run (node:internal/test_runner/test:1101:12)
        async Suite.processPendingSubtests (node:internal/test_runner/test:744:7)
      ...
    # Subtest: misc-21 — Telenor mobil + FTTH-anslutning — "ftth" matchar secondary-regex
    ok 70 - misc-21 — Telenor mobil + FTTH-anslutning — "ftth" matchar secondary-regex
      ---
      duration_ms: 0.031901
      type: 'test'
      ...
    1..70
not ok 43 - 08 · Realistiska fakturor (100 st)
  ---
  duration_ms: 10.144141
  type: 'suite'
  location: '/home/user/arvo-flow.github.io/tests/run.mjs:105:1'
  failureType: 'subtestsFailed'
  error: '6 subtests failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..43
# tests 747
# suites 43
# pass 714
# fail 33
# cancelled 0
# skipped 0
# todo 0
# duration_ms 238.040311
```

### Kommando 2

```bash
node tests/run.mjs 2>&1 | grep -E "not ok [0-9]+ - " | grep -vE "^\s*not ok (43|[0-9]+ - 0[0-9] ·)" 
```

```
    not ok 16 - brd-16 — Bredband combined + 3 SIM-abonnemang på en rad → secondarySeatCount=1
    not ok 17 - brd-17 — Bredband combined + SIM-kort Business — matches /\\bsim\\b/
    not ok 18 - brd-18 — Bredband combined — secondary gross=0 < 500 → secondarySaving=null
    not ok 19 - brd-19 — Bredband + 1 SIM-rad 299 kr/mån → gross=0 → secondarySaving=null
    not ok 20 - brd-20 — Bredband + 2 SIM-rader à 350 kr → gross=1224 → secondarySaving satt
    not ok 34 - brd-34 — Bredband combined: Tele2 1000 Mbit + 5 mobil-abonnemang (bygg, 8 anst)
    not ok 35 - brd-35 — Bredband combined: Bahnhof 500 Mbit + SIM-kort 3 st (konsult, 20 anst)
    not ok 38 - brd-38 — Bredband combined 3 SIM-rader (transport, 15 anst) → hantverkare/small
    not ok 40 - brd-40 — Bredband combined 10 SIM-rader (tillverkning, 50 anst) → tillverkning/mid
    not ok 31 - comb-31 — Bredband primary + mobilabonnemang sekundär — konsult micro, 1 rad
    not ok 32 - comb-32 — Bredband 1000 Mbit + SIM-kort rad (matchar /sim/) — seatCount=1 (en rad)
    not ok 33 - comb-33 — "mobiltelefoni" matchar sekundär-regex — 1 abonnemang, gross=600, net=480
    not ok 34 - comb-34 — "mobilabonnemang" matchar + bygg-segment — hantverkare micro p25=3588
    not ok 35 - comb-35 — Bredband + 2 mobilrader — secondarySeatCount=2, gross=1200, net=960
    not ok 37 - comb-37 — Mobil sekundär 340 kr/mån — gross=492 < 500 → secondary=null (under tröskel)
    not ok 38 - comb-38 — Mobil sekundär 341 kr/mån — gross=504 ≥ 500 → secondary satt (gränsvärde)
    not ok 39 - comb-39 — Bredband + 10 SIM-rader, tillverkning small bucket — p25=3588×10=35880
    not ok 41 - comb-41 — Bredband + static_ip addon + mobilabonnemang sekundär — broadbandAddon korrekt
    not ok 42 - comb-42 — Bredband + firewall + SLA addons — broadbandAddon=498, mobil sekundär
    not ok 44 - comb-44 — SIM-kort 50 st som EN rad — seatCount=1 (antal rader, ej antal SIM)
    not ok 45 - comb-45 — Bredband combined, industry=ehandel, 3 SIM-rader — p25=3588×3=10764
    not ok 21 - edge-21 — Bredband + 3 mobilabonnemang-rader → secondarySeatCount=3, gross=0 → secondary=null
    not ok 22 - edge-22 — SIM-kort rad matchar /\\bsim\\b/ → secondarySeatCount=1 (fiber ej sekundär)
    not ok 23 - edge-23 — "mobiltelefoni paket" matchar SECONDARY_RX → secondarySeatCount=1
    not ok 28 - edge-28 — Bredband+mobil: secAnnual=4104 > p25Total+500=4088 → secondary returneras
    not ok 29 - edge-29 — Bredband+mobil: secAnnual=3588 = p25Total → gross=0 → secondary=null
    not ok 30 - edge-30 — it-tech→byraer segment, 4 mobil-rader: p25Total=14352, gross=2400, net=1920
    not ok 14 - bb-04 — Bredband 1 Gbit + 6 mobilabonnemang (6 rader à 299) — gross=0 → null
    not ok 15 - bb-05 — Bredband 500 Mbit + 3 mobilabonnemang (3 rader à 299) — gross=0 → null
    not ok 45 - combo-06 — Bredband 500 Mbit + 10 mobilabonnemang — byraer small, gross=1800, net=1440
    not ok 46 - combo-07 — Bredband 1 Gbit + 8 mobilabonnemang-rader — ehandel small, gross=480
```

### Kommando 3

```bash
node tests/run.mjs 2>&1 | grep -E "^\s+error: " | grep -iE "second|mobil|saving|annual|null"
```

```
(Bash completed with no output)
```

### Kommando 4

```bash
node tests/run.mjs 2>&1 | grep -E "\[(brd|comb|edge|bb|combo|misc)-[0-9]+\]" | sed 's/^[[:space:]]*//'
```

```
[brd-16] secondary.suggestedAnnual: expected 3588, got 2868
[brd-17] secondary.suggestedAnnual: expected 3588, got 2868
[brd-18] secondarySaving should be null, got {"category":"mobil","seatCount":1,"currentAnnual":3588,"suggestedAnnual":2868,"grossSaving":720,"netSaving":576}
[brd-19] secondarySaving should be null, got {"category":"mobil","seatCount":1,"currentAnnual":3588,"suggestedAnnual":2868,"grossSaving":720,"netSaving":576}
[brd-20] secondary.suggestedAnnual: expected 7176, got 5736
[brd-34] secondary.suggestedAnnual: expected 3588, got 2868
[brd-35] secondary.suggestedAnnual: expected 3588, got 2868
[brd-38] secondary.suggestedAnnual: expected 10764, got 8604
[brd-40] secondary.suggestedAnnual: expected 35880, got 28680
[comb-31] secondary.suggestedAnnual: expected 3588, got 2868
[comb-32] secondary.suggestedAnnual: expected 3588, got 2868
[comb-33] secondary.suggestedAnnual: expected 3588, got 2868
[comb-34] secondary.suggestedAnnual: expected 3588, got 2868
[comb-35] secondary.suggestedAnnual: expected 7176, got 5736
[comb-37] secondarySaving should be null, got {"category":"mobil","seatCount":1,"currentAnnual":4080,"suggestedAnnual":2868,"grossSaving":1212,"netSaving":970}
[comb-38] secondary.suggestedAnnual: expected 3588, got 2868
[comb-39] secondary.suggestedAnnual: expected 35880, got 28680
[comb-41] secondary.suggestedAnnual: expected 3588, got 2868
[comb-42] secondary.suggestedAnnual: expected 3588, got 2868
[comb-44] secondary.suggestedAnnual: expected 3588, got 2868
[comb-45] secondary.suggestedAnnual: expected 10764, got 8604
[edge-21] secondarySaving should be null, got {"category":"mobil","seatCount":3,"currentAnnual":10764,"suggestedAnnual":8604,"grossSaving":2160,"netSaving":1728}
[edge-22] secondary.suggestedAnnual: expected 3588, got 2868
[edge-23] secondary.suggestedAnnual: expected 3588, got 2868
[edge-28] secondary.suggestedAnnual: expected 3588, got 2868
[edge-29] secondarySaving should be null, got {"category":"mobil","seatCount":1,"currentAnnual":3588,"suggestedAnnual":2868,"grossSaving":720,"netSaving":576}
[edge-30] secondary.suggestedAnnual: expected 14352, got 11472
[bb-04] secondarySaving should be null, got {"category":"mobil","seatCount":6,"currentAnnual":21528,"suggestedAnnual":17208,"grossSaving":4320,"netSaving":3456}
[bb-05] secondarySaving should be null, got {"category":"mobil","seatCount":3,"currentAnnual":10764,"suggestedAnnual":8604,"grossSaving":2160,"netSaving":1728}
[combo-06] secondarySaving should be null, got {"category":"mobil","seatCount":10,"currentAnnual":35880,"suggestedAnnual":28680,"grossSaving":7200,"netSaving":5760}
[combo-07] secondary.suggestedAnnual: expected 28704, got 22944
[combo-08] secondarySaving should be null, got {"category":"mobil","seatCount":4,"currentAnnual":14352,"suggestedAnnual":11472,"grossSaving":2880,"netSaving":2304}
[misc-20] secondary.suggestedAnnual: expected 7176, got 5736
```

### Kommando 5

```bash
node -e '
const {fixtures} = await import("./tests/fixtures/02-bredband.mjs");
const ids=["brd-16","brd-17","brd-18","brd-19","brd-20","brd-34","brd-35","brd-38","brd-40"];
// recompute per formula
for (const f of fixtures) {
  if(!ids.includes(f.id)) continue;
  const seats=f.metrics.secondarySeatCount;
  const sec=f.metrics.secondaryComponentMonthly;
  const curr=Math.round(sec*12);
  const sugg=Math.round(2868*seats);
  const gross=Math.max(0,curr-sugg);
  const net=Math.round(gross*0.80);
  const obj = gross<500?null:{category:"mobil",seatCount:seats,currentAnnual:curr,suggestedAnnual:sugg,grossSaving:gross,netSaving:net};
  console.log(f.id, JSON.stringify(obj));
}
' 2>&1
```

```
brd-16 {"category":"mobil","seatCount":1,"currentAnnual":12564,"suggestedAnnual":2868,"grossSaving":9696,"netSaving":7757}
brd-17 {"category":"mobil","seatCount":1,"currentAnnual":20940,"suggestedAnnual":2868,"grossSaving":18072,"netSaving":14458}
brd-18 {"category":"mobil","seatCount":1,"currentAnnual":3588,"suggestedAnnual":2868,"grossSaving":720,"netSaving":576}
brd-19 {"category":"mobil","seatCount":1,"currentAnnual":3588,"suggestedAnnual":2868,"grossSaving":720,"netSaving":576}
brd-20 {"category":"mobil","seatCount":2,"currentAnnual":8400,"suggestedAnnual":5736,"grossSaving":2664,"netSaving":2131}
brd-34 {"category":"mobil","seatCount":1,"currentAnnual":21528,"suggestedAnnual":2868,"grossSaving":18660,"netSaving":14928}
brd-35 {"category":"mobil","seatCount":1,"currentAnnual":12564,"suggestedAnnual":2868,"grossSaving":9696,"netSaving":7757}
brd-38 {"category":"mobil","seatCount":3,"currentAnnual":12564,"suggestedAnnual":8604,"grossSaving":3960,"netSaving":3168}
brd-40 {"category":"mobil","seatCount":10,"currentAnnual":41880,"suggestedAnnual":28680,"grossSaving":13200,"netSaving":10560}
```

### Kommando 6

```bash
node tests/run.mjs 2>&1 | tail -60
```

```
      type: 'test'
      ...
    # Subtest: misc-19 — Telia Jobbmobil + Teams direkt-integration via desc-regex
    ok 68 - misc-19 — Telia Jobbmobil + Teams direkt-integration via desc-regex
      ---
      duration_ms: 0.026214
      type: 'test'
      ...
    # Subtest: misc-20 — Bredband 500 Mbit + 2 premium-mobilabonnemang — byraer small, gross=4800, net=3840
    not ok 69 - misc-20 — Bredband 500 Mbit + 2 premium-mobilabonnemang — byraer small, gross=4800, net=3840
      ---
      duration_ms: 0.109441
      type: 'test'
      location: '/home/user/arvo-flow.github.io/tests/run.mjs:106:25'
      failureType: 'testCodeFailure'
      error: |-
        [misc-20] secondary.suggestedAnnual: expected 7176, got 5736
        
        5736 !== 7176
        
      code: 'ERR_ASSERTION'
      name: 'AssertionError'
      expected: 7176
      actual: 5736
      operator: 'strictEqual'
      stack: |-
        runFixture (file:///home/user/arvo-flow.github.io/tests/run.mjs:65:16)
        TestContext.<anonymous> (file:///home/user/arvo-flow.github.io/tests/run.mjs:106:61)
        Test.runInAsyncScope (node:async_hooks:214:14)
        Test.run (node:internal/test_runner/test:1047:25)
        Suite.processPendingSubtests (node:internal/test_runner/test:744:18)
        Test.postRun (node:internal/test_runner/test:1173:19)
        Test.run (node:internal/test_runner/test:1101:12)
        async Suite.processPendingSubtests (node:internal/test_runner/test:744:7)
      ...
    # Subtest: misc-21 — Telenor mobil + FTTH-anslutning — "ftth" matchar secondary-regex
    ok 70 - misc-21 — Telenor mobil + FTTH-anslutning — "ftth" matchar secondary-regex
      ---
      duration_ms: 0.032719
      type: 'test'
      ...
    1..70
not ok 43 - 08 · Realistiska fakturor (100 st)
  ---
  duration_ms: 9.190552
  type: 'suite'
  location: '/home/user/arvo-flow.github.io/tests/run.mjs:105:1'
  failureType: 'subtestsFailed'
  error: '6 subtests failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..43
# tests 747
# suites 43
# pass 721
# fail 26
# cancelled 0
# skipped 0
# todo 0
# duration_ms 231.52377
```

### Kommando 7

```bash
node tests/run.mjs 2>&1 | grep -E "^\s*not ok [0-9]+ - (mobil|bredband|combined|edge|misc|real|rb|cb|ec)" 
```

```
    not ok 21 - edge-21 — Bredband + 3 mobilabonnemang-rader → secondarySeatCount=3, gross=0 → secondary=null
    not ok 22 - edge-22 — SIM-kort rad matchar /\\bsim\\b/ → secondarySeatCount=1 (fiber ej sekundär)
    not ok 23 - edge-23 — "mobiltelefoni paket" matchar SECONDARY_RX → secondarySeatCount=1
    not ok 28 - edge-28 — Bredband+mobil: secAnnual=4104 > p25Total+500=4088 → secondary returneras
    not ok 29 - edge-29 — Bredband+mobil: secAnnual=3588 = p25Total → gross=0 → secondary=null
    not ok 30 - edge-30 — it-tech→byraer segment, 4 mobil-rader: p25Total=14352, gross=2400, net=1920
    not ok 69 - misc-20 — Bredband 500 Mbit + 2 premium-mobilabonnemang — byraer small, gross=4800, net=3840
```

### Kommando 8

```bash
node tests/run.mjs 2>&1 | grep -E "not ok" | grep -v "subtests" 
```

```
    not ok 38 - brd-38 — Bredband combined 3 SIM-rader (transport, 15 anst) → hantverkare/small
    not ok 40 - brd-40 — Bredband combined 10 SIM-rader (tillverkning, 50 anst) → tillverkning/mid
not ok 37 - 02 · Bredband
    not ok 31 - comb-31 — Bredband primary + mobilabonnemang sekundär — konsult micro, 1 rad
    not ok 32 - comb-32 — Bredband 1000 Mbit + SIM-kort rad (matchar /sim/) — seatCount=1 (en rad)
    not ok 33 - comb-33 — "mobiltelefoni" matchar sekundär-regex — 1 abonnemang, gross=600, net=480
    not ok 34 - comb-34 — "mobilabonnemang" matchar + bygg-segment — hantverkare micro p25=3588
    not ok 35 - comb-35 — Bredband + 2 mobilrader — secondarySeatCount=2, gross=1200, net=960
    not ok 37 - comb-37 — Mobil sekundär 340 kr/mån — gross=492 < 500 → secondary=null (under tröskel)
    not ok 38 - comb-38 — Mobil sekundär 341 kr/mån — gross=504 ≥ 500 → secondary satt (gränsvärde)
    not ok 39 - comb-39 — Bredband + 10 SIM-rader, tillverkning small bucket — p25=3588×10=35880
    not ok 41 - comb-41 — Bredband + static_ip addon + mobilabonnemang sekundär — broadbandAddon korrekt
    not ok 42 - comb-42 — Bredband + firewall + SLA addons — broadbandAddon=498, mobil sekundär
    not ok 44 - comb-44 — SIM-kort 50 st som EN rad — seatCount=1 (antal rader, ej antal SIM)
    not ok 45 - comb-45 — Bredband combined, industry=ehandel, 3 SIM-rader — p25=3588×3=10764
not ok 38 - 03 · Kombinerade fakturor (mobil+bredband)
    not ok 21 - edge-21 — Bredband + 3 mobilabonnemang-rader → secondarySeatCount=3, gross=0 → secondary=null
    not ok 22 - edge-22 — SIM-kort rad matchar /\\bsim\\b/ → secondarySeatCount=1 (fiber ej sekundär)
    not ok 23 - edge-23 — "mobiltelefoni paket" matchar SECONDARY_RX → secondarySeatCount=1
    not ok 28 - edge-28 — Bredband+mobil: secAnnual=4104 > p25Total+500=4088 → secondary returneras
    not ok 29 - edge-29 — Bredband+mobil: secAnnual=3588 = p25Total → gross=0 → secondary=null
    not ok 30 - edge-30 — it-tech→byraer segment, 4 mobil-rader: p25Total=14352, gross=2400, net=1920
not ok 42 - 07 · Edge cases & fällor
    not ok 14 - bb-04 — Bredband 1 Gbit + 6 mobilabonnemang (6 rader à 299) — gross=0 → null
    not ok 15 - bb-05 — Bredband 500 Mbit + 3 mobilabonnemang (3 rader à 299) — gross=0 → null
    not ok 45 - combo-06 — Bredband 500 Mbit + 10 mobilabonnemang — byraer small, gross=1800, net=1440
    not ok 46 - combo-07 — Bredband 1 Gbit + 8 mobilabonnemang-rader — ehandel small, gross=4800, net=3840
    not ok 47 - combo-08 — Bredband 250 Mbit + 4 mobilabonnemang — bygg/hantverkare micro, gross=0 → null
    not ok 69 - misc-20 — Bredband 500 Mbit + 2 premium-mobilabonnemang — byraer small, gross=4800, net=3840
not ok 43 - 08 · Realistiska fakturor (100 st)
```

### Kommando 9

```bash
wc -l tests/fixtures/01-mobil.mjs tests/fixtures/02-bredband.mjs tests/fixtures/03-combined.mjs tests/fixtures/07-edge-cases.mjs tests/fixtures/08-realistic.mjs
```

```
  1181 tests/fixtures/01-mobil.mjs
  1072 tests/fixtures/02-bredband.mjs
  1807 tests/fixtures/03-combined.mjs
  1071 tests/fixtures/07-edge-cases.mjs
  1850 tests/fixtures/08-realistic.mjs
  6981 total
```

### Kommando 10

```bash
grep -n "4188\|3588\|4088\|3348\|2868" tests/fixtures/01-mobil.mjs
```

```
444:  // median=4188/user, 5 users → 20940 kr/år = 1745 kr/mån
623:  // gross = max(0, 10788 - 7200) = 3588 ≥ 500 → saving satt
648:      grossSaving:     3588,
```

### Kommando 11

```bash
node tests/run.mjs 2>&1 | grep -E "\] .*: expected|^\s*not ok [0-9]+ - (brd|comb|edge|bb|combo|misc)" | grep -v "subtests"
```

```
    not ok 38 - brd-38 — Bredband combined 3 SIM-rader (transport, 15 anst) → hantverkare/small
        [brd-38] secondary.suggestedAnnual: expected 10764, got 8604
    not ok 40 - brd-40 — Bredband combined 10 SIM-rader (tillverkning, 50 anst) → tillverkning/mid
        [brd-40] secondary.suggestedAnnual: expected 35880, got 28680
    not ok 31 - comb-31 — Bredband primary + mobilabonnemang sekundär — konsult micro, 1 rad
        [comb-31] secondary.suggestedAnnual: expected 3588, got 2868
    not ok 32 - comb-32 — Bredband 1000 Mbit + SIM-kort rad (matchar /sim/) — seatCount=1 (en rad)
        [comb-32] secondary.suggestedAnnual: expected 3588, got 2868
    not ok 33 - comb-33 — "mobiltelefoni" matchar sekundär-regex — 1 abonnemang, gross=600, net=480
        [comb-33] secondary.suggestedAnnual: expected 3588, got 2868
    not ok 34 - comb-34 — "mobilabonnemang" matchar + bygg-segment — hantverkare micro p25=3588
        [comb-34] secondary.suggestedAnnual: expected 3588, got 2868
    not ok 35 - comb-35 — Bredband + 2 mobilrader — secondarySeatCount=2, gross=1200, net=960
        [comb-35] secondary.suggestedAnnual: expected 7176, got 5736
    not ok 37 - comb-37 — Mobil sekundär 340 kr/mån — gross=492 < 500 → secondary=null (under tröskel)
    not ok 38 - comb-38 — Mobil sekundär 341 kr/mån — gross=504 ≥ 500 → secondary satt (gränsvärde)
        [comb-38] secondary.suggestedAnnual: expected 3588, got 2868
    not ok 39 - comb-39 — Bredband + 10 SIM-rader, tillverkning small bucket — p25=3588×10=35880
        [comb-39] secondary.suggestedAnnual: expected 35880, got 28680
    not ok 41 - comb-41 — Bredband + static_ip addon + mobilabonnemang sekundär — broadbandAddon korrekt
        [comb-41] secondary.suggestedAnnual: expected 3588, got 2868
    not ok 42 - comb-42 — Bredband + firewall + SLA addons — broadbandAddon=498, mobil sekundär
        [comb-42] secondary.suggestedAnnual: expected 3588, got 2868
    not ok 44 - comb-44 — SIM-kort 50 st som EN rad — seatCount=1 (antal rader, ej antal SIM)
        [comb-44] secondary.suggestedAnnual: expected 3588, got 2868
    not ok 45 - comb-45 — Bredband combined, industry=ehandel, 3 SIM-rader — p25=3588×3=10764
        [comb-45] secondary.suggestedAnnual: expected 10764, got 8604
    not ok 21 - edge-21 — Bredband + 3 mobilabonnemang-rader → secondarySeatCount=3, gross=0 → secondary=null
    not ok 22 - edge-22 — SIM-kort rad matchar /\\bsim\\b/ → secondarySeatCount=1 (fiber ej sekundär)
        [edge-22] secondary.suggestedAnnual: expected 3588, got 2868
    not ok 23 - edge-23 — "mobiltelefoni paket" matchar SECONDARY_RX → secondarySeatCount=1
        [edge-23] secondary.suggestedAnnual: expected 3588, got 2868
    not ok 28 - edge-28 — Bredband+mobil: secAnnual=4104 > p25Total+500=4088 → secondary returneras
        [edge-28] secondary.suggestedAnnual: expected 3588, got 2868
    not ok 29 - edge-29 — Bredband+mobil: secAnnual=3588 = p25Total → gross=0 → secondary=null
    not ok 30 - edge-30 — i
```

### Kommando 12

```bash
node tests/run.mjs 2>&1 | grep -A2 -E "\[(comb-37|edge-21|edge-29|bb-04|bb-05|combo-06|combo-08)\]" | grep -E "expected|got|Cannot|null|undefined" | head -40
```

```
        [comb-37] secondarySaving should be null, got {"category":"mobil","seatCount":1,"currentAnnual":4080,"suggestedAnnual":2868,"grossSaving":1212,"netSaving":970}
        + actual - expected
        [edge-21] secondarySaving should be null, got {"category":"mobil","seatCount":3,"currentAnnual":10764,"suggestedAnnual":8604,"grossSaving":2160,"netSaving":1728}
        + actual - expected
        [edge-29] secondarySaving should be null, got {"category":"mobil","seatCount":1,"currentAnnual":3588,"suggestedAnnual":2868,"grossSaving":720,"netSaving":576}
        + actual - expected
        [bb-04] secondarySaving should be null, got {"category":"mobil","seatCount":6,"currentAnnual":21528,"suggestedAnnual":17208,"grossSaving":4320,"netSaving":3456}
        + actual - expected
        [bb-05] secondarySaving should be null, got {"category":"mobil","seatCount":3,"currentAnnual":10764,"suggestedAnnual":8604,"grossSaving":2160,"netSaving":1728}
        + actual - expected
        [combo-06] secondarySaving should be null, got {"category":"mobil","seatCount":10,"currentAnnual":35880,"suggestedAnnual":28680,"grossSaving":7200,"netSaving":5760}
        + actual - expected
        [combo-08] secondarySaving should be null, got {"category":"mobil","seatCount":4,"currentAnnual":14352,"suggestedAnnual":11472,"grossSaving":2880,"netSaving":2304}
        + actual - expected
```

### Kommando 13

```bash
grep -n "computeSecondarySaving\|export function\|export const" lib/*.js agents/recommender/*.js 2>/dev/null | grep -i "secondary\|computeInvoice" | head
```

```
lib/batch-processor.js:18:import { computeSecondarySaving }   from './secondary-savings.js';
lib/batch-processor.js:164:  const secondarySaving = computeSecondarySaving({
lib/invoice-metrics.js:109:export function computeInvoiceMetrics(lineItems, category, potentialMixedCategories) {
lib/secondary-savings.js:16:export function computeSecondarySaving({ metrics, category, potentialMixedCategories, industry, employees }) {
```

### Kommando 14

```bash
node tests/_verify_tmp.mjs brd-38 brd-40 comb-31 comb-32 comb-33 comb-34 comb-35 comb-37 comb-38 comb-39 comb-41 comb-42 comb-44 comb-45 edge-21 edge-22 edge-23 edge-28 edge-29 edge-30 bb-04 bb-05 combo-06 combo-07 combo-08 misc-20
```

```
brd-38 => {"category":"mobil","seatCount":3,"currentAnnual":12564,"suggestedAnnual":8604,"grossSaving":3960,"netSaving":3168}
brd-40 => {"category":"mobil","seatCount":10,"currentAnnual":41880,"suggestedAnnual":28680,"grossSaving":13200,"netSaving":10560}
comb-31 => {"category":"mobil","seatCount":1,"currentAnnual":12564,"suggestedAnnual":2868,"grossSaving":9696,"netSaving":7757}
comb-32 => {"category":"mobil","seatCount":1,"currentAnnual":21528,"suggestedAnnual":2868,"grossSaving":18660,"netSaving":14928}
comb-33 => {"category":"mobil","seatCount":1,"currentAnnual":4188,"suggestedAnnual":2868,"grossSaving":1320,"netSaving":1056}
comb-34 => {"category":"mobil","seatCount":1,"currentAnnual":4788,"suggestedAnnual":2868,"grossSaving":1920,"netSaving":1536}
comb-35 => {"category":"mobil","seatCount":2,"currentAnnual":8376,"suggestedAnnual":5736,"grossSaving":2640,"netSaving":2112}
comb-37 => {"category":"mobil","seatCount":1,"currentAnnual":4080,"suggestedAnnual":2868,"grossSaving":1212,"netSaving":970}
comb-38 => {"category":"mobil","seatCount":1,"currentAnnual":4092,"suggestedAnnual":2868,"grossSaving":1224,"netSaving":979}
comb-39 => {"category":"mobil","seatCount":10,"currentAnnual":41880,"suggestedAnnual":28680,"grossSaving":13200,"netSaving":10560}
comb-41 => {"category":"mobil","seatCount":1,"currentAnnual":8388,"suggestedAnnual":2868,"grossSaving":5520,"netSaving":4416}
comb-42 => {"category":"mobil","seatCount":1,"currentAnnual":8376,"suggestedAnnual":2868,"grossSaving":5508,"netSaving":4406}
comb-44 => {"category":"mobil","seatCount":1,"currentAnnual":215280,"suggestedAnnual":2868,"grossSaving":212412,"netSaving":169930}
comb-45 => {"category":"mobil","seatCount":3,"currentAnnual":12564,"suggestedAnnual":8604,"grossSaving":3960,"netSaving":3168}
edge-21 => {"category":"mobil","seatCount":3,"currentAnnual":10764,"suggestedAnnual":8604,"grossSaving":2160,"netSaving":1728}
edge-22 => {"category":"mobil","seatCount":1,"currentAnnual":20940,"suggestedAnnual":2868,"grossSaving":18072,"netSaving":14458}
edge-23 => {"category":"mobil","seatCount":1,"currentAnnual":11988,"suggestedAnnual":2868,"grossSaving":9120,"netSaving":7296}
edge-28 => {"category":"mobil","seatCount":1,"currentAnnual":4104,"suggestedAnnual":2868,"grossSaving":1236,"netSaving":989}
edge-29 => {"category":"mobil","seatCount":1,"currentAnnual":3588,"suggestedAnnual":2868,"grossSaving":720,"netSaving":576}
edge-30 => {"category":"mobil","seatCount":4,"currentAnnual":16752,"suggestedAnnual":11472,"grossSaving":5280,"netSaving":4224}
bb-04 => {"category":"mobil","seatCount":6,"currentAnnual":21528,"suggestedAnnual":17208,"grossSaving":4320,"netSaving":3456}
bb-05 => {"category":"mobil","seatCount":3,"currentAnnual":10764,"suggestedAnnual":8604,"grossSaving":2160,"netSaving":1728}
combo-06 => {"category":"mobil","seatCount":10,"currentAnnual":35880,"suggestedAnnual":28680,"grossSaving":7200,"netSaving":5760}
combo-07 => {"category":"mobil","seatCount":8,"currentAnnual":33504,"suggeste
```

### Kommando 15

```bash
grep -n "brd-38\|brd-40" tests/fixtures/02-bredband.mjs
```

```
659:  // REALISTISKA FIXTURES (brd-26 – brd-40)
967:  // ── brd-38 ───────────────────────────────────────────────────────────────────
974:    id: 'brd-38',
1028:  // ── brd-40 ───────────────────────────────────────────────────────────────────
1035:    id: 'brd-40',
```

### Kommando 16

```bash
grep -n "id: 'comb-3[1-9]'\|id: 'comb-4[1-5]'" tests/fixtures/03-combined.mjs
```

```
979:    id: 'comb-31',
1014:    id: 'comb-32',
1048:    id: 'comb-33',
1082:    id: 'comb-34',
1116:    id: 'comb-35',
1150:    id: 'comb-36',
1177:    id: 'comb-37',
1204:    id: 'comb-38',
1239:    id: 'comb-39',
1307:    id: 'comb-41',
1343:    id: 'comb-42',
1376:    id: 'comb-43',
1404:    id: 'comb-44',
1439:    id: 'comb-45',
```

### Kommando 17

```bash
grep -n "id: 'edge-2[1-9]'\|id: 'edge-30'" tests/fixtures/07-edge-cases.mjs
```

```
612:    id: 'edge-21',
646:    id: 'edge-22',
681:    id: 'edge-23',
714:    id: 'edge-24',
741:    id: 'edge-25',
776:    id: 'edge-26',
809:    id: 'edge-27',
838:    id: 'edge-28',
872:    id: 'edge-29',
900:    id: 'edge-30',
```

### Kommando 18

```bash
grep -n "id: 'bb-04'\|id: 'bb-05'\|id: 'combo-06'\|id: 'combo-07'\|id: 'combo-08'\|id: 'misc-20'" tests/fixtures/08-realistic.mjs
```

```
363:    id: 'bb-04',
395:    id: 'bb-05',
1149:    id: 'combo-06',
1187:    id: 'combo-07',
1230:    id: 'combo-08',
1787:    id: 'misc-20',
```

### Kommando 19

```bash
rm -f tests/_verify_tmp.mjs; node tests/run.mjs 2>&1 | tail -12
```

```
  duration_ms: 11.17686
  type: 'suite'
  ...
1..43
# tests 747
# suites 43
# pass 747
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 237.209653
```

### Kommando 20

```bash
grep -n "mobilP25=3588\|mobilP25=3408\|mobilP25=3228\|p25=3588\|p25=3408\|p25=3228\|3588\*\|×3588\|3408\*\|3408)" tests/fixtures/01-mobil.mjs tests/fixtures/02-bredband.mjs tests/fixtures/03-combined.mjs tests/fixtures/07-edge-cases.mjs tests/fixtures/08-realistic.mjs
```

```
tests/fixtures/03-combined.mjs:56:  //   secAnnual=Math.round(899*12)=10788, p25=7200, gross=3588, net=Math.round(3588*0.80)=2870
tests/fixtures/03-combined.mjs:1147:  //   secAnnual=Math.round(249*12)=2988, mobilP25=3588, p25Total=3588*1=3588
tests/fixtures/03-combined.mjs:1780:  //   secAnnual=Math.round(899*12)=10788, p25=7200, gross=3588, net=Math.round(3588*0.80)=2870
```

### Kommando 21

```bash
node tests/run.mjs 2>&1 | grep -E "^# (tests|pass|fail|suites)"
```

```
# tests 747
# suites 43
# pass 747
# fail 0
```
