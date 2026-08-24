# Agentsvep — så körs de så att arbetet aldrig går förlorat

> Grundarbeslut 2026-08-24, ej förhandlingsbart: **arbetet från samtliga agenter måste sparas
> även när vi når spärren.** Det här dokumentet är hur det uppnås, och varför den uppenbara
> lösningen inte räckte.

## Vad som gick fel, mätt

Tre obduktionssvep dog. Utfallet, ur `scripts/skorda-agentarbete.mjs`:

| körning | agenter | bar arbete | dödsrunor |
|---|---|---|---|
| `wf_fd898f25` | 35 | 3 | 32 |
| `wf_3484bcdd` | 41 | 3 | 38 |
| `wf_98dd0826` | 18 | 9 | 9 |

Två skilda dödsorsaker, och de kräver rakt motsatta åtgärder:

1. **Sessionsspärren** (79 fall). Agenten dör — ofta innan den hunnit göra något alls.
2. **Trasigt verktygslager** (6 fall i körning tre). Permission-handlern strippade varje
   obligatorisk parameter, så `Read`, `Bash`, `Grep`, `Write` och `StructuredOutput` avvisades
   före verktyget. Agenten *levde* men kunde varken arbeta eller skriva. Den skrev i stället en
   lång, korrekt felanalys — det var så buggen upptäcktes.

## Varför "skriv till disk innan du returnerar" inte räckte

Den instruktionen var min första åtgärd, och den var otillräcklig **på premissen**:

- En skrivning som ligger **sist** skyddar bara mot en död *efter* att allt arbete är klart.
  Spärren slår mitt i. Körning tre brände 869 650 tokens och 118 verktygsanrop — noll nådde disk.
- En agent med trasigt verktygslager **kan inte lyda instruktionen**. Write avvisades två gånger.

**Agenten får därför aldrig vara ansvarig för sin egen persistens.**

## Lösningen, tre lager

### 1. Skörden (bär hela kravet)

Harnesset skriver agentens transkript rad för rad *medan* den arbetar, oavsett hur den sedan dör.
Det är den enda artefakt som finns i **båda** felfallen.

```bash
npm run skorda              # alla körningar
npm run skorda -- wf_abc123 # en
```

Räddar per agent: uppdraget, varje formulerad slutsats, och varje kört kommando **med utfall** —
de körbara bevisen. Skriver `ops/obduktion/skord-<körning>-<område>.md`, märkt **OPRÖVAD**.

Kör skörden **efter varje svep**, även när svepet såg lyckat ut. Maskinlås: `tests/skordkontrakt.mjs`
(SKÖ-01..05) — en dödsruna får aldrig räknas som arbete, och en skörd som räddade noll larmar med
exit-kod i stället för att tiga.

### 2. Kanariefågeln (undviker dödsrunorna)

En dödsruna är arbete som **aldrig blev av** — skörden kan inte rädda det. Att lansera 18 agenter
mot en förbrukad kvot ger 18 gravstenar.

**Starta därför alltid ETT enda agentuppdrag först.** Går det igenom, fan:a ut. Faller det på
spärren är svaret att vänta, inte att elda upp flottan.

### 3. Inkrementell skrivning (bältet, utöver hängslena)

Agentprompten ska säga: skriv rapportfilen med **första** iakttagelsen och **lägg till efter varje
hypotes** — aldrig i ett svep på slutet. En agent som dör efter hypotes tre lämnar då tre på disk.
Det här är ett komplement till skörden, aldrig en ersättning: en agent som inte kan skriva kan
inte heller lyda det här.

## Rutinen

```
1. npm run test:algo                    # grönt före svep
2. ett kanarieuppdrag                   # lever kvoten?
3. svep i vågor om ~6, inte 18 på en gång
4. npm run skorda                       # ALLTID, även vid till synes lyckat svep
5. motpröva varje hypotes med ett körbart bevis innan något fixas
```

Punkt 5 är oförhandlingsbar av samma skäl som resten av bibeln: skörden bevisar att arbetet
**utfördes**, aldrig att slutsatsen är **sann**.
