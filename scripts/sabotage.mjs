#!/usr/bin/env node
// scripts/sabotage.mjs — sabotageharnesset. Prövar en vakt genom att BRYTA det den vaktar.
//
// ══ VARFÖR DET HÄR ÄR EN FIL OCH INTE ETT ENGÅNGSSKRIPT (2026-09-09) ═══════════════════════
// Jag skrev ett engångsskript i scratchpad, sparade originalen i en dict per filsökväg, och lät
// ETT sabotage göra TVÅ byten i SAMMA fil. Andra bytets ögonblicksbild togs efter det första —
// alltså av redan sabotagerad text — och skrev över den första i dicten. Återställningen skrev
// tillbaka halva sabotaget, och `lib/pdf-textlager.js` blev kvar med en omdöpt funktion vars
// anropsställe var återställt. Nästa hela svitkörning mätte alltså ett träd som inte kunde köra.
//
// Det upptäcktes av `git status`, inte av harnesset. Ett verktyg som TYST lämnar kvar ett
// sabotage är farligare än inget verktyg: allt det mäter efteråt är osant, och det syns inte.
// Samma familj som allt annat — ett utfall som betyder «jag mätte fel träd», omöjligt att skilja
// från en mätning.
//
// TRE KRAV, alla lastbärande:
//   1. Originalet läses EN gång per fil, före första bytet. En dict får aldrig råka lagra en
//      redan ändrad text.
//   2. Varje byte bevisas ändra något — `assert old in s` fångar en sträng som inte finns,
//      aldrig ett byte som är en no-op. Båda prövas.
//   3. Återställningen VERIFIERAS mot `git diff` efteråt. Ett harness som bara påstår att det
//      städat är ett påstående, inte ett bevis (bevisplikten).
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const ROT = process.cwd();

/**
 * Kör ETT sabotage: gör bytena, kör testfilerna, återställ, verifiera att trädet är rent.
 * @param {{namn: string, byten: Array<{fil: string, fran: string, till: string}>, tester: string[]}} spec
 * @returns {{fallda: number, ut: string}}
 */
export function sabotera({ namn, byten, tester }) {
  // KRAV 1 — originalen först, alla, före något byte.
  const original = new Map();
  for (const { fil } of byten) {
    const p = join(ROT, fil);
    if (!original.has(p)) original.set(p, readFileSync(p, 'utf8'));
  }

  try {
    for (const { fil, fran, till } of byten) {
      const p = join(ROT, fil);
      const fore = readFileSync(p, 'utf8');
      // KRAV 2 — båda no-op-formerna. `assert old in s` ensamt fångar en sträng som inte finns,
      // aldrig ett byte som inte ändrar något (bibeln 2026-09-09: «S3 var no-op TVÅ gånger»).
      if (!fore.includes(fran)) throw new Error(`${namn}: «${fran.slice(0, 60)}» finns inte i ${fil} — sabotaget är en no-op`);
      const efter = fore.replace(fran, till);
      if (efter === fore) throw new Error(`${namn}: bytet i ${fil} ändrade ingenting — sabotaget är en no-op`);
      writeFileSync(p, efter);
    }

    let ut = '';
    try {
      ut = execFileSync(process.execPath, ['--test', ...tester], { cwd: ROT, encoding: 'utf8' });
    } catch (err) {
      ut = `${err.stdout ?? ''}${err.stderr ?? ''}`;   // en fälld svit ger exit≠0 — det är utfallet, inte ett fel
    }
    const rad = ut.split('\n').find((l) => l.startsWith('# fail '));
    return { fallda: rad ? Number(rad.split(' ').pop()) : -1, ut };
  } finally {
    for (const [p, s] of original) writeFileSync(p, s);
    // KRAV 3 — bevisa städningen. `git diff` läser disken, inte harnessets minne av den.
    // ⚠️ INGEN `.trim()` FÖRE `split`, och skälet är hela poängen med den här filen.
    // Porcelain-formatet är `XY PATH` — två statustecken, ett blanksteg, sedan sökvägen från
    // index 3. En omodifierad fil ger ` M path`, alltså LEDANDE BLANKSTEG. Ett `.trim()` på hela
    // utfallet strippar det blanksteget från FÖRSTA raden men inte från de följande, så `slice(3)`
    // blev «ib/pdf-textlager.js» på rad ett och rätt på rad två och framåt. Kontrollen jämförde
    // då mot ett namn som aldrig kan matcha — och släppte igenom exakt det den byggdes mot.
    // Bevisat: sabotaget «ta bort återställningen» fällde INGENTING förrän den här raden lagades.
    const smutsigt = execFileSync('git', ['status', '--porcelain', ...byten.map((b) => b.fil)],
      { cwd: ROT, encoding: 'utf8' });
    const forvantat = new Set(byten.map((b) => b.fil));
    for (const rad of smutsigt.split('\n').filter((r) => r.length > 3)) {
      const fil = rad.slice(3).trim();
      if (forvantat.has(fil) && !STARTLAGE.has(fil)) {
        throw new Error(`ÅTERSTÄLLNINGEN MISSLYCKADES: ${fil} är fortfarande ändrad efter «${namn}». `
          + 'Trädet är osant och varje mätning efter den här punkten är värdelös.');
      }
    }
  }
}

/** Filer som redan var ändrade när harnesset startade — de ska förbli ändrade. */
const STARTLAGE = new Set(
  execFileSync('git', ['status', '--porcelain'], { cwd: ROT, encoding: 'utf8' })
    .split('\n').filter(Boolean).map((r) => r.slice(3).trim()),
);

/** Kör en lista sabotage i följd och skriver ut utfallet. Fäller inget — mätningen är utfallet. */
export function koraAlla(specar) {
  for (const spec of specar) {
    const { fallda } = sabotera(spec);
    const dom = fallda === 0 ? '  ⚠ INGEN VAKT' : '';
    console.log(`${spec.namn}: ${fallda} test föll${dom}`);
  }
}
