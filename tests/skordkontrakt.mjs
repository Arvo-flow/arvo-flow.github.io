// tests/skordkontrakt.mjs — SKÖ-01..05: skörden får aldrig påstå att arbete räddades när det inte
// gjordes, och aldrig tappa arbete som gjordes.
//
// VARFÖR (2026-08-24, grundarkrav: «arbetet från samtliga agenter MÅSTE sparas, ej förhandlingsbart»).
//
// Två obduktionssvep dog och tog 869 650 tokens agentarbete med sig. Min första åtgärd — «skriv
// rapporten till disk innan du returnerar» — var otillräcklig på PREMISSEN:
//
//   · Spärren slår MITT I arbetet, och en skrivning som ligger sist skyddar bara mot en död efteråt.
//   · Sex av arton agenter kunde inte skriva överhuvudtaget: deras verktygslager var trasigt
//     (permission-handlern strippade varje obligatorisk parameter). En instruktion kan aldrig
//     rädda en agent som är oförmögen att lyda den.
//
// Därför flyttades ansvaret från agenten till harnessets transkript, som skrivs rad för rad medan
// agenten arbetar. `scripts/skorda-agentarbete.mjs` läser det och räddar arbetet utan agentens
// medverkan. 1,5 MB låg oskördat efter en enda körning.
//
// SKÖRDENS EGET FEL, rättat i samma pass: första versionen räknade «har minst en slutsats» som
// «bar arbete» och rapporterade 94 av 94. Åttio av dem innehöll EN rad — «You've hit your session
// limit». Skörden räknade en gravsten som ett fynd. Det är felfamiljen i verktyget som byggdes mot
// den, och det farligaste möjliga utfallet: ett tal som får mig att tro att ingenting gick förlorat.
//
// FÅNGAR: att skörden klassar en dödsruna som arbete, att den tappar en agent som faktiskt körde
//   kommandon, och att den rapporterar framgång när den inte hittade något att skörda.
// BLIND: testet prövar KLASSNINGEN mot syntetiska transkript, inte att harnessets format är
//   oförändrat. Byter transkriptet form läser skörden noll rader — och då fäller SKÖ-05, som kräver
//   att verktyget larmar i stället för att tiga. Att skörden verkligen körs efter varje svep är
//   en rutinfråga, inte en maskinfråga.

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKRIPT = join(ROT, 'scripts', 'skorda-agentarbete.mjs');

/** Bygger ett syntetiskt agenttranskript i harnessets format. */
function transkript(rader) {
  return rader.map((r) => JSON.stringify(r)).join('\n') + '\n';
}
const assistentText = (t) => ({ type: 'assistant', message: { content: [{ type: 'text', text: t }] } });
const bashAnrop = (id, kommando) =>
  ({ type: 'assistant', message: { content: [{ type: 'tool_use', id, name: 'Bash', input: { command: kommando } }] } });
const bashSvar = (id, ut) =>
  ({ type: 'user', message: { content: [{ type: 'tool_result', tool_use_id: id, content: [{ type: 'text', text: ut }] }] } });
const uppdrag = (omrade) =>
  ({ type: 'user', message: { content: [{ type: 'text', text: `Granska kodbasen.\nDITT OMRÅDE: ${omrade}\nFOKUS: x` }] } });

/** Kör skörden mot en katalog och returnerar { kod, ut, filer }. */
function kor(korningskatalog, utkatalog) {
  let kod = 0, ut = '';
  try {
    ut = execFileSync('node', [SKRIPT, korningskatalog], {
      encoding: 'utf8', env: { ...process.env, SKORD_UT: utkatalog },
    });
  } catch (e) {
    kod = e.status ?? 1;
    ut = String(e.stdout ?? '') + String(e.stderr ?? '');
  }
  let filer = [];
  try { filer = readdirSync(utkatalog).filter((f) => f.startsWith('skord-')); } catch { /* ingen */ }
  return { kod, ut, filer };
}

function baddar() {
  const bas = mkdtempSync(join(tmpdir(), 'skord-'));
  const korning = join(bas, 'wf_testkorning-001');
  const utkatalog = join(bas, 'ut');
  mkdirSync(korning, { recursive: true });
  mkdirSync(utkatalog, { recursive: true });
  return { bas, korning, utkatalog };
}

describe('SKÖ · Skördkontraktet — en dödsruna är inte ett arbete', () => {
  test('SKÖ-01: en agent som KÖRDE kommandon klassas som arbete och bevisen följer med', () => {
    const { bas, korning, utkatalog } = baddar();
    try {
      writeFileSync(join(korning, 'agent-aaa1.jsonl'), transkript([
        uppdrag('price-alert'),
        assistentText('Jag misstänker att larmet läser fel fält.'),
        bashAnrop('t1', 'node -e "console.log(42)"'),
        bashSvar('t1', '42'),
        assistentText('Bekräftat: talet är 42.'),
      ]));
      const r = kor(korning, utkatalog);
      assert.equal(r.kod, 0);
      assert.match(r.ut, /1 av 1 agenter bar ANALYS/);
      const innehall = readFileSync(join(utkatalog, r.filer[0]), 'utf8');
      assert.match(innehall, /price-alert/, 'området ska följa med ur uppdraget');
      assert.match(innehall, /console\.log\(42\)/, 'det körbara beviset måste räddas');
      assert.match(innehall, /^42$/m, 'kommandots UTFALL är halva beviset');
      assert.match(innehall, /bär analys/);
    } finally { rmSync(bas, { recursive: true, force: true }); }
  });

  test('SKÖ-02: en ren dödsruna räknas ALDRIG som arbete', () => {
    const { bas, korning, utkatalog } = baddar();
    try {
      writeFileSync(join(korning, 'agent-bbb1.jsonl'), transkript([
        uppdrag('el-kedjan'),
        assistentText("You've hit your session limit · resets 11pm (UTC)"),
      ]));
      const r = kor(korning, utkatalog);
      assert.equal(r.kod, 2, 'noll räddat arbete är ett LARM, inte ett resultat');
      assert.match(r.ut, /0 av 1 agenter bar ANALYS/);
      const innehall = readFileSync(join(utkatalog, r.filer[0]), 'utf8');
      assert.match(innehall, /DÖDSRUNA/);
      assert.match(innehall, /session limit/, 'dödsorsaken ska stå i klartext');
    } finally { rmSync(bas, { recursive: true, force: true }); }
  });

  test('SKÖ-03: en agent vars VERKTYGSLAGER var trasigt räknas ALDRIG som en granskning', () => {
    // Andra rättelsen. Sex agenter i våg 1 klassades först «bär arbete» — literalt sant, de hade
    // text och körda kommandon. Men varje anrop avvisades av permission-handlern, så arbetet var
    // en ärlig FELRAPPORT, inte en granskning av området. Sammanfattningen «6 av 6» hade fått mig
    // att tro att sex områden var täckta. Dödsrune-läxan ett steg in: analys, felrapport och
    // gravsten är TRE tillstånd, och de får aldrig se likadana ut.
    const { bas, korning, utkatalog } = baddar();
    try {
      writeFileSync(join(korning, 'agent-ccc1.jsonl'), transkript([
        uppdrag('saas-avstamning'),
        assistentText('Jag försöker läsa filen.'),
        bashAnrop('t1', 'grep -n x lib/saas-avstamning.js'),
        bashSvar('t1', 'The permission handler returned updatedInput for Bash that failed schema validation'),
        assistentText('Jag kan inte slutföra uppdraget — verktygslagret avvisar varje anrop. '.repeat(8)),
      ]));
      const r = kor(korning, utkatalog);
      assert.equal(r.kod, 2, 'noll ANALYSER är ett larm, även när agenten skrev mycket');
      assert.match(r.ut, /0 av 1 agenter bar ANALYS/);
      assert.match(r.ut, /1 föll på verktygslagret/);
      const innehall = readFileSync(join(utkatalog, r.filer[0]), 'utf8');
      assert.match(innehall, /VERKTYGSFEL/);
      assert.match(innehall, /INTE en granskning/, 'filen måste säga vad den INTE är');
    } finally { rmSync(bas, { recursive: true, force: true }); }
  });

  test('SKÖ-04: blandad körning räknas rätt åt båda hållen', () => {
    const { bas, korning, utkatalog } = baddar();
    try {
      writeFileSync(join(korning, 'agent-ddd1.jsonl'), transkript([
        uppdrag('a'), bashAnrop('t1', 'ls'), bashSvar('t1', 'fil.txt'),
      ]));
      writeFileSync(join(korning, 'agent-ddd2.jsonl'), transkript([
        uppdrag('b'), assistentText("You've hit your session limit"),
      ]));
      writeFileSync(join(korning, 'agent-ddd3.jsonl'), transkript([
        uppdrag('c'), assistentText("You've hit your session limit"),
      ]));
      const r = kor(korning, utkatalog);
      assert.match(r.ut, /1 av 3 agenter bar ANALYS/);
      assert.match(r.ut, /2 var dödsrunor/);
      assert.equal(r.filer.length, 3, 'varje agent ska få en fil — även dödsrunorna, som bevis på vad som hände');
    } finally { rmSync(bas, { recursive: true, force: true }); }
  });

  test('SKÖ-05: en skörd som inte hittade något att skörda LARMAR', () => {
    // En skörd som tiger när den inte hittade en enda körning ser identisk ut med en lyckad —
    // exakt den tystnad verktyget finns för att göra omöjlig.
    const { bas, utkatalog } = baddar();
    try {
      const tom = join(bas, 'finns-inte');
      const r = kor(tom, utkatalog);
      assert.notEqual(r.kod, 0, 'skörden måste falla, inte rapportera framgång');
      assert.match(r.ut, /kan inte rapportera framgång|Ingen workflow/i);
    } finally { rmSync(bas, { recursive: true, force: true }); }
  });
});
