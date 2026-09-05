// tests/grindpaus.mjs — GP-01..06: en tillfällig öppning som stänger sig själv.
//
// ══ VARFÖR ═════════════════════════════════════════════════════════════════════════════════
// Grundaren begärde e-postgrinden borttagen i 24 timmar. Jag invände en gång: en tidsgräns som
// bor i ett minne är samma felfamilj som allt annat vi lagat den här veckan — ett TILLFÄLLIGT
// tillstånd omöjligt att skilja från ett PERMANENT. Grundaren stod fast; beslutet är hans.
//
// Testerna nedan bevisar att invändningen är byggd BORT, inte bara uttalad: grinden återkommer
// av sig själv när klockan passerar `till`, utan att någon människa gör något.
//
// Klockan injiceras. Ett test som bara kan köras ett visst dygn är inget test — det är en
// tidsinställd bomb i CI, och den formen av vakt blir avstängd (bibeln, smyghöjningsvakten).
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { GRIND_PAUS, grindPausad } from '../lib/grindpaus.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FRAN = Date.parse(GRIND_PAUS.fran);
const TILL = Date.parse(GRIND_PAUS.till);
const TIMME = 60 * 60 * 1000;

describe('GP · Grindpausen stänger sig själv', () => {
  test('GP-01 · före fönstret är grinden PÅ', () => {
    assert.equal(grindPausad(FRAN - TIMME), false);
  });

  test('GP-02 · inuti fönstret är grinden AV', () => {
    assert.equal(grindPausad(FRAN), true, 'startpunkten ska ingå');
    assert.equal(grindPausad(FRAN + TIMME), true);
    assert.equal(grindPausad(TILL - 1), true, 'sista millisekunden ska fortfarande vara öppen');
  });

  // HELA POÄNGEN. Ingen människa gör något den 6 september — och grinden är ändå tillbaka.
  test('GP-03 · efter fönstret är grinden PÅ igen, utan mänsklig åtgärd', () => {
    assert.equal(grindPausad(TILL), false, 'slutpunkten ska INTE ingå — annars glider fönstret');
    assert.equal(grindPausad(TILL + TIMME), false);
    assert.equal(grindPausad(TILL + 365 * 24 * TIMME), false,
      'ett år senare måste grinden stå kvar — det är skillnaden mot en påminnelse');
  });

  test('GP-04 · fönstret får aldrig vara längre än 48 timmar', () => {
    assert.ok(Number.isFinite(FRAN) && Number.isFinite(TILL), 'båda stämplarna ska gå att tolka');
    assert.ok(TILL > FRAN, 'ett fönster som slutar före det börjar är ett skrivfel');
    assert.ok(TILL - FRAN <= 48 * TIMME,
      `fönstret är ${Math.round((TILL - FRAN) / TIMME)} h — en «tillfällig» öppning som varar `
      + 'längre än så är inte längre tillfällig, och då ska den motiveras som ett eget beslut');
    assert.ok(GRIND_PAUS.skal && GRIND_PAUS.skal.length > 20,
      'ett öppet fönster utan skrivet skäl är omöjligt att granska i efterhand');
  });

  // Frontend-bygget kan inte importera lib/, så src/utils/grindpaus.js är en avskrift. Två
  // sanningar kan glida isär — den som ändrar den ena och glömmer den andra får ett system där
  // modalen och servern är oense om huruvida grinden är öppen. Samma vakt som RD-07:s kopidetektor.
  test('GP-05 · spegeln i src/ bär EXAKT samma fönster', () => {
    const spegel = readFileSync(join(ROT, 'src/utils/grindpaus.js'), 'utf8');
    for (const [falt, varde] of [['fran', GRIND_PAUS.fran], ['till', GRIND_PAUS.till]]) {
      assert.ok(spegel.includes(`${falt}: '${varde}'`),
        `src/utils/grindpaus.js saknar ${falt}: '${varde}' — filerna har glidit isär`);
    }
  });

  // Att pausa e-postgrinden får ALDRIG röra kostnadsskyddet. Rate limit och globaltak är det
  // enda som står mellan oss och en skenande AI-räkning, och de gäller alla — även bypass-nyckeln.
  test('GP-06 · kostnadsspärrarna är orörda av pausen', () => {
    const api = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');
    // OBS: anropet är `checkGlobalCap(getKv())` — en naiv `\([^)]*\)` stannar på den INRE
    // parentesen och matchar aldrig. Mitt eget mätinstrument var felet först, som så ofta.
    const capRad = api.match(/const capSkal = await checkGlobalCap\(.*?\);/);
    assert.ok(capRad, 'globaltakets anrop hittades inte — bytte det form?');
    const foreCap = api.slice(0, api.indexOf(capRad[0]));
    assert.ok(!/grindPausad\(\)/.test(foreCap),
      'grindPausad() står FÖRE globaltaket — då kan pausen kringgå kostnadsskyddet');
    assert.match(api, /if \(WHITELISTED_IPS\.has\(ip\)\) return null;/,
      'rate limit-vägen ska vara oförändrad');
  });
});
