// tests/granskningsbevis.mjs — GB-01..10 · ett hedersord är ingen mekanism.
//
// ══ VARFÖR (2026-09-13) ═════════════════════════════════════════════════════════════════════
// Main-vakten krävde `ARVO_GRANSKAD=1`. Den 13 september satte jag den flaggan själv, på mitt
// eget ord om att granskningen var gjord, och pushade fem mekanikcommits till `main`. Den VAR
// gjord — men grinden kunde inte veta det. Grundaren: «hedersord förklätt till mekanism».
//
// Kravet är nu en FYSISK rapport som namnger varje mekanikcommit. Den här sviten prövar domen;
// `tests/mainvakt.mjs` prövar att hooken faktiskt kör den.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: en commit utan bevis; ett bevis vars dom är BLOCKERAR; ett bevis utan dom, utan
//     commits eller med en dom vi inte känner igen; en commit tillagd EFTER granskningen.
//   BLIND: den läser en ARTEFAKT, aldrig en granskning — att rapporten finns och namnger rätt
//     sha bevisar inte att någon letade, eller letade väl. GB-10 låser den blindfläcken som ett
//     KÄNT utfall så att nästa läsare inte tror att den är täckt.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { parsaBevis, granskningstackning, BEVIS_KATALOG } from '../lib/granskningsbevis.js';

const SHA_A = 'a1b2c3d4e5f60718293a4b5c6d7e8f9012345678';
const SHA_B = 'b0b1b2b3b4b5b6b7b8b9babbbcbdbebfc0c1c2c3';

const bevis = (kropp) => `<!-- granskning\n${kropp}\n-->\n\n# Fynd\n...`;
const friande = (...shas) => bevis(`commits: ${shas.join(' ')}\ndom: MERGAS\ngranskare: X\ndatum: 2026-09-13`);
const medDatum = (dom, datum, ...shas) => bevis(`commits: ${shas.join(' ')}\ndom: ${dom}\ngranskare: X\ndatum: ${datum}`);

describe('GB · granskningsbeviset', () => {
  test('GB-01 · ett giltigt bevis läses: commits + dom', () => {
    const p = parsaBevis(friande(SHA_A, SHA_B));
    assert.equal(p.giltigt, true, p.skal);
    assert.equal(p.dom, 'MERGAS');
    assert.deepEqual(p.commits, [SHA_A, SHA_B]);
  });

  test('GB-02 · en fil utan granskningsrubrik är inget bevis', () => {
    // Annars hade vilken markdownfil som helst i katalogen räknats som ett godkännande.
    const p = parsaBevis('# Bara en vanlig rapport\n\ncommits: ' + SHA_A + '\ndom: MERGAS');
    assert.equal(p.giltigt, false);
    assert.match(p.skal, /granskningsrubrik/);
  });

  test('GB-03 · ett bevis utan dom är inget bevis', () => {
    const p = parsaBevis(bevis(`commits: ${SHA_A}\ngranskare: X\ndatum: 2026-09-13`));
    assert.equal(p.giltigt, false);
    assert.match(p.skal, /dom/);
  });

  test('GB-04 · en OKÄND dom lånar aldrig ett giltigt värde', () => {
    // Felfamiljen: «KANSKE» eller «OK» får inte bete sig som MERGAS. Ett okänt är ett okänt.
    for (const d of ['OK', 'KANSKE', 'GODKÄND', 'ja']) {
      const p = parsaBevis(bevis(`commits: ${SHA_A}\ndom: ${d}\ndatum: 2026-09-13`));
      assert.equal(p.giltigt, false, `domen «${d}» måste avvisas`);
    }
  });

  test('GB-05 · ett bevis utan namngivna commits är inget bevis', () => {
    const p = parsaBevis(bevis('commits: alla\ndom: MERGAS\ndatum: 2026-09-13'));
    assert.equal(p.giltigt, false, 'ordet «alla» är inte en sha — ett bevis måste peka på något');
    assert.match(p.skal, /sha/);
  });

  test('GB-06 · täckning: varje mekanikcommit måste namngas', () => {
    const ok = granskningstackning([SHA_A, SHA_B], [{ fil: 'r.md', text: friande(SHA_A, SHA_B) }]);
    assert.equal(ok.ok, true, JSON.stringify(ok));

    // Den TILLAGDA commiten — «granska en gång och lägg tyst på en till». Per commit, inte per push.
    const halv = granskningstackning([SHA_A, SHA_B], [{ fil: 'r.md', text: friande(SHA_A) }]);
    assert.equal(halv.ok, false);
    assert.deepEqual(halv.otackta, [SHA_B]);
  });

  test('GB-07 · BLOCKERAR räknas ALDRIG som täckning', () => {
    // En rapport som FINNS är inte en rapport som friade — och de två får aldrig se likadana ut.
    const r = granskningstackning([SHA_A], [{ fil: 'r.md', text: medDatum('BLOCKERAR', '2026-09-13', SHA_A) }]);
    assert.equal(r.ok, false);
    assert.equal(r.blockerade.length, 1);
    assert.equal(r.otackta.length, 0, 'blockerad är ett eget utfall, inte «saknas»');
  });

  test('GB-08 · ett friande bevis vinner över ett tidigare blockerande', () => {
    // Motprovet mot GB-07: annars kunde ett åtgärdat fynd aldrig mergas, och grinden vore ett
    // hinder i stället för en grind — den formen kringgås med --no-verify på sin första dag.
    const r = granskningstackning([SHA_A], [
      { fil: 'varv1.md', text: medDatum('BLOCKERAR', '2026-09-12', SHA_A) },
      { fil: 'varv2.md', text: medDatum('MERGAS', '2026-09-13', SHA_A) },
    ]);
    assert.equal(r.ok, true, JSON.stringify(r));
  });

  test('GB-09 · kortform och långform är samma commit', () => {
    const r = granskningstackning([SHA_A], [{ fil: 'r.md', text: friande(SHA_A.slice(0, 8)) }]);
    assert.equal(r.ok, true, 'en rapport skriven med kort sha måste täcka samma commit');
    // Men en sha som bara LIKNAR får inte räknas.
    const fel = granskningstackning([SHA_A], [{ fil: 'r.md', text: friande('deadbee') }]);
    assert.equal(fel.ok, false);
  });


  test('GB-11 · ett bevis UTAN datum är inget bevis — domar måste gå att ordna i tid', () => {
    const p = parsaBevis(bevis(`commits: ${SHA_A}\ndom: MERGAS\ngranskare: X`));
    assert.equal(p.giltigt, false);
    assert.match(p.skal, /datum/);
  });

  test('GB-12 · den SENASTE domen vinner — även när den är BLOCKERAR', () => {
    // ⚠️ GB-08 HETTE «vinner över ett TIDIGARE blockerande» men koden kände ingen ordning alls:
    // utfallet var identiskt i båda riktningarna, alltså var ordet «tidigare» oprövat och ett
    // BLOCKERAR kunde ALDRIG upphäva ett MERGAS. Granskaren mätte det. Nu avgör datumet.
    const r = granskningstackning([SHA_A], [
      { fil: 'varv1.md', text: medDatum('MERGAS', '2026-09-12', SHA_A) },
      { fil: 'varv2.md', text: medDatum('BLOCKERAR', '2026-09-13', SHA_A) },
    ]);
    assert.equal(r.ok, false, 'en senare blockerande dom måste upphäva ett tidigare godkännande');
    assert.equal(r.blockerade.length, 1);
  });

  test('GB-13 · vid SAMMA datum väger BLOCKERAR tyngst', () => {
    // Två domar samma dag går inte att ordna. Då är det strängare svaret det enda ärliga —
    // att välja det mildare vore att låta en oavgjord fråga se ut som ett godkännande.
    const r = granskningstackning([SHA_A], [
      { fil: 'a.md', text: medDatum('MERGAS', '2026-09-13', SHA_A) },
      { fil: 'b.md', text: medDatum('BLOCKERAR', '2026-09-13', SHA_A) },
    ]);
    assert.equal(r.ok, false);
  });

  test('GB-10 · KÄND BLINDFLÄCK: innehållet prövas aldrig, bara artefakten', () => {
    // En tom rapport med rätt rubrik PASSERAR. Det är inte en miss — det är gränsen, och den är
    // skriven i lib/granskningsbevis.js. Maskinen ser att svaret finns, aldrig att det är sant.
    // Skillnaden mot flaggan är att artefakten går att öppna och hålla mot koden i efterhand.
    const tom = granskningstackning([SHA_A], [{ fil: 'r.md', text: friande(SHA_A) }]);
    assert.equal(tom.ok, true, 'ändra inte utfallet utan att ändra den deklarerade blindfläcken');
    assert.equal(BEVIS_KATALOG, 'ops/granskningar');
  });
});
