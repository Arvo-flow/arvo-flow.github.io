#!/usr/bin/env node
// scripts/skorda-agentarbete.mjs — räddar agenternas arbete ur harnessets transkript, ÄVEN när
// agenten dog, tystnade eller aldrig kunde skriva en rad själv.
//
// ══ VARFÖR (2026-08-24, grundarkrav: «arbetet från samtliga agenter MÅSTE sparas») ═══════════
//
// Två obduktionssvep dog. Första körningen: 39 av 41 agenter föll på sessionsspärren. Andra:
// 18 av 18. Min åtgärd efter den första var att instruera varje agent att skriva sin rapport
// till disk INNAN den returnerar. Den åtgärden var otillräcklig, och den var otillräcklig på
// PREMISSEN — inte i utförandet:
//
//   · Spärren slår MITT I arbetet. En skrivning som ligger sist skyddar bara mot en död efter
//     att allt är klart. Körning två brände 869 650 tokens och 118 verktygsanrop; noll nådde disk.
//   · Sex av arton agenter kunde inte skriva ÖVERHUVUDTAGET. Deras verktygslager var trasigt —
//     varje anrop med obligatoriska parametrar avvisades före verktyget («the permission handler
//     returned updatedInput ... that failed schema validation»). Read, Bash, Grep, Write och
//     StructuredOutput föll likadant. En instruktion till agenten kan aldrig rädda en agent som
//     är oförmögen att lyda den.
//
// Slutsatsen: **agenten får inte vara ansvarig för sin egen persistens.** Harnesset skriver
// transkriptet rad för rad medan agenten arbetar, oavsett hur agenten sedan dör. Det är den enda
// artefakt som finns kvar i BÅDA felfallen — och den innehåller allt: varje läst fil, varje kört
// kommando, varje slutsats agenten hann formulera. 1,5 MB låg oskördat på disk efter körning två.
//
// Det här är obduktionens egen felfamilj, begången av mig i verktygen: ett resultat som betyder
// «agenten dog» såg identiskt ut med «agenten hittade inget». Nu skiljs de åt.
//
// ══ VAD SKÖRDEN GÖR ══════════════════════════════════════════════════════════════════════════
//
//   node scripts/skorda-agentarbete.mjs                 # skördar ALLA workflow-körningar
//   node scripts/skorda-agentarbete.mjs <runId|sökväg>  # skördar en
//
// Per agent skrivs `ops/obduktion/skord-<körning>-<agent>.md` med: uppdraget, varje slutsats
// agenten formulerade, varje kommando den körde med utfall (de KÖRBARA bevisen), och ett uttalat
// utfallsomdöme. Filerna är märkta OPRÖVADE — skörden bevisar att arbetet gjordes, aldrig att
// slutsatsen är sann. Det avgörs av motprövning, som förut.
//
// FÅNGAR: att en agents arbete går förlorat när den dör av sessionsspärr, trasigt verktygslager,
//   schemavalideringstak eller avbruten körning.
// BLIND: skörden kan bara läsa det harnesset hann skriva. Dör processen mellan två transkriptrader
//   saknas den sista handlingen — men allt före den finns. Den ser inte heller om agentens
//   slutsats är RIKTIG; den räddar arbetet, den granskar det inte.

import { readdirSync, readFileSync, writeFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
// Utkatalogen är överstyrbar så att skördkontraktet (tests/skordkontrakt.mjs) kan pröva verktyget
// mot syntetiska transkript utan att skriva i repot.
const UT = process.env.SKORD_UT || join(ROT, 'ops', 'obduktion');
const PROJEKT = '/root/.claude/projects/-home-user-arvo-flow-github-io';

/** Alla workflow-transkriptkataloger under projektets sessioner. */
function hittaKorningar() {
  const träffar = [];
  if (!existsSync(PROJEKT)) return träffar;
  for (const session of readdirSync(PROJEKT)) {
    const wf = join(PROJEKT, session, 'subagents', 'workflows');
    if (!existsSync(wf)) continue;
    for (const run of readdirSync(wf)) {
      const d = join(wf, run);
      try { if (statSync(d).isDirectory()) träffar.push(d); } catch { /* borta */ }
    }
  }
  return träffar;
}

const text = (block) => (block?.type === 'text' ? String(block.text ?? '') : '');

/** Läser en agents transkript till { uppdrag, slutsatser[], korningar[], sista } */
function lasAgent(fil) {
  const rader = readFileSync(fil, 'utf8').split('\n').filter(Boolean);
  let uppdrag = null;
  const slutsatser = [];
  const korningar = [];
  const verktygsnamn = new Map();          // tool_use_id → { namn, indata }

  for (const rad of rader) {
    let d;
    try { d = JSON.parse(rad); } catch { continue; }
    const msg = d.message ?? {};
    const innehall = Array.isArray(msg.content) ? msg.content : [];

    if (d.type === 'user' && uppdrag == null) {
      const t = innehall.map(text).join('\n').trim();
      if (t) uppdrag = t;
    }

    if (d.type === 'assistant') {
      for (const b of innehall) {
        const t = text(b).trim();
        if (t) slutsatser.push(t);
        if (b?.type === 'tool_use') {
          verktygsnamn.set(b.id, { namn: b.name, indata: b.input });
          // Bash-kommandon och StructuredOutput är de körbara bevisen respektive domarna.
          if (b.name === 'Bash' && b.input?.command) {
            korningar.push({ kommando: String(b.input.command), utfall: null, id: b.id });
          } else if (b.name === 'StructuredOutput') {
            slutsatser.push('```json\n' + JSON.stringify(b.input, null, 2).slice(0, 8000) + '\n```');
          }
        }
      }
    }

    // Verktygsresultat kommer tillbaka som user-block; para ihop med kommandot.
    if (d.type === 'user') {
      for (const b of innehall) {
        if (b?.type !== 'tool_result') continue;
        const post = korningar.find((k) => k.id === b.tool_use_id && k.utfall == null);
        if (!post) continue;
        const ut = Array.isArray(b.content) ? b.content.map(text).join('\n') : String(b.content ?? '');
        post.utfall = ut.slice(0, 4000);
      }
    }
  }
  return { uppdrag, slutsatser, korningar };
}

/** Områdesnamnet ur uppdragstexten — annars agentens filnamn. */
function omradeAv(uppdrag, fallback) {
  const m = uppdrag?.match(/DITT OMR[ÅA]DE:\s*(.+)/);
  return m ? m[1].trim() : fallback;
}

function skorda(katalog) {
  const run = basename(katalog);
  const filer = readdirSync(katalog).filter((f) => f.startsWith('agent-') && f.endsWith('.jsonl'));
  const rader = [];
  let medInnehall = 0;

  for (const f of filer) {
    const agentId = f.replace(/^agent-|\.jsonl$/g, '');
    const { uppdrag, slutsatser, korningar } = lasAgent(join(katalog, f));
    const omrade = omradeAv(uppdrag, agentId);

    // ── EN DÖDSRUNA ÄR INTE ETT ARBETE (rättelse i samma pass) ──────────────────────────────
    // Första versionen räknade `slutsatser.length > 0` som «bar arbete» och rapporterade «94 av
    // 94». Men 80 av dem innehöll EN rad: «You've hit your session limit». Skörden räknade alltså
    // en gravsten som ett fynd — obduktionens felfamilj i det verktyg som byggdes mot den, och
    // det farligaste möjliga utfallet: ett tal som får mig att tro att ingenting gick förlorat.
    //
    // Klassningen vilar på BEVIS, inte på att känna igen en engelsk felmening: ett arbete har
    // körda kommandon eller substantiell text. Feltexten identifieras separat, bara för att kunna
    // NAMNGE dödsorsaken — aldrig för att avgöra om arbete finns.
    const textmangd = slutsatser.reduce((n, t) => n + t.length, 0);
    const doedsmarkor = slutsatser.length <= 2 && /session limit|rate.?limit|permission handler|retry cap|Request was aborted/i.test(slutsatser.join(' '));
    const harInnehall = korningar.length > 0 || (textmangd >= 400 && !doedsmarkor);
    if (harInnehall) medInnehall++;
    const orsak = doedsmarkor ? slutsatser.join(' ').replace(/\s+/g, ' ').slice(0, 120) : null;

    const ut = [
      `# Skörd: ${omrade}`,
      '',
      `> **OPRÖVAD.** Det här är agentens arbete, räddat ur harnessets transkript — inte ett`,
      `> bevisat fynd. Skörden visar att arbetet UTFÖRDES; om slutsatsen är sann avgörs av`,
      `> motprövning med ett körbart bevis, precis som för varje annan hypotes.`,
      '',
      `· körning: \`${run}\` · agent: \`${agentId}\``,
      `· slutsatser: ${slutsatser.length} · körda kommandon: ${korningar.length}`,
      harInnehall
        ? '· **bär arbete**'
        : `· **DÖDSRUNA — inget arbete hann utföras**${orsak ? `\n· orsak enligt transkriptet: \`${orsak}\`` : ''}`,
      '',
      '## Uppdraget',
      '',
      '```',
      (uppdrag ?? '(saknas i transkriptet)').slice(0, 2500),
      '```',
      '',
      '## Vad agenten formulerade',
      '',
      ...(slutsatser.length
        ? slutsatser.map((s, i) => `### ${i + 1}\n\n${s}\n`)
        : ['(agenten hann aldrig formulera något)', '']),
      '## Vad agenten faktiskt körde — de körbara bevisen',
      '',
      ...(korningar.length
        ? korningar.flatMap((k, i) => [
          `### Kommando ${i + 1}`, '', '```bash', k.kommando.slice(0, 2000), '```', '',
          '```', (k.utfall ?? '(inget utfall — agenten dog innan svaret kom)').slice(0, 3000), '```', '',
        ])
        : ['(agenten körde inga kommandon)', '']),
    ].join('\n');

    const filnamn = `skord-${run.slice(0, 14)}-${omrade.replace(/[^a-zA-Z0-9åäöÅÄÖ-]+/g, '-').slice(0, 40)}.md`;
    writeFileSync(join(UT, filnamn), ut);
    rader.push({ omrade, slutsatser: slutsatser.length, korningar: korningar.length, fil: filnamn, harInnehall, orsak });
  }
  return { run, filer: filer.length, medInnehall, rader };
}

// ── Kör ──────────────────────────────────────────────────────────────────────────────────────
if (!existsSync(UT)) mkdirSync(UT, { recursive: true });

const arg = process.argv[2];
const kataloger = arg
  ? (existsSync(arg) ? [arg] : hittaKorningar().filter((d) => basename(d).includes(arg)))
  : hittaKorningar();

if (kataloger.length === 0) {
  console.error(`✗ Ingen workflow-transkriptkatalog hittad${arg ? ` för «${arg}»` : ''}.`);
  console.error('  Skörden kan inte rapportera framgång när den inte hittade något att skörda.');
  process.exit(1);
}

let totaltAgenter = 0, totaltMedInnehall = 0;
for (const d of kataloger) {
  const r = skorda(d);
  totaltAgenter += r.filer;
  totaltMedInnehall += r.medInnehall;
  console.log(`\n═══ ${r.run} — ${r.filer} agenter, ${r.medInnehall} med innehåll ═══`);
  for (const rad of r.rader.sort((a, b) => (b.harInnehall - a.harInnehall) || (b.korningar - a.korningar))) {
    const märke = rad.harInnehall ? '✓ arbete ' : '· dödsruna';
    console.log(`  ${märke} ${String(rad.slutsatser).padStart(3)} slutsatser · ${String(rad.korningar).padStart(3)} körningar  ${rad.omrade}`);
  }
}

console.log(`\n── SKÖRD ── ${totaltMedInnehall} av ${totaltAgenter} agenter bar ARBETE; ` +
  `${totaltAgenter - totaltMedInnehall} var dödsrunor (ingen kod hann köras).`);
console.log('   Skörden räddar det som utfördes. Den kan inte rädda arbete som aldrig blev av —');
console.log('   och den ska aldrig få de två att se likadana ut.');
if (totaltMedInnehall === 0) {
  // En skörd som räddade noll får ALDRIG rapportera framgång — det är exakt den tystnad
  // verktyget finns för att göra omöjlig.
  console.error('✗ Noll agenter bar arbete. Det är ett larm, inte ett resultat.');
  process.exit(2);
}
