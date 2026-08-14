// scripts/probe-varmekedjan.mjs — HÅLLER HELA KEDJAN?
//
// Tre saker ska bevisas i EN körning, mot den utlagda sajten:
//   1. Vågen levererar raden när crt.sh väl svarar (den har aldrig setts lyckas live).
//   2. Träffen CACHAS — annars är värmaren meningslös, för då betalar varje besökare på nytt.
//   3. Nästa anrop är SNABBT — det är hela poängen: dörren ska sluta be om lov i besökarens sekund.
//
// Sonden gör det värmaren gör, fast via den publika vägen: envisas tills källan svarar. Lyckas den
// är Skanskas datum dessutom varmt i produktion efteråt — grundarens eget test visar raden.
//
// Misslyckas alla försök är det INTE ett underkännande av bygget. Det betyder att crt.sh vägrade
// även den här gången, och det är precis den verklighet värmaren finns för att överleva. Sonden
// säger vilket av de två som hände; den låtsas aldrig att tystnad är ett svar.
import { deklarera } from '../lib/sondkontrakt.js';

deklarera({
  namn: 'probe-varmekedjan',
  fangar: 'Om certifikatvågen någon gång levererar raden live, om träffen cachas, och hur snabbt nästa besökare får den.',
  blind: 'Renderingen på skärmen. Sonden läser HTTP-svar; att raden syns i kortet bevisas bara av ett foto som väntat in vågen (live-door, 32 s).',
});

const BAS = process.env.ARVO_BASE_URL || 'https://arvoflow.se';
const DOMAN = process.env.CT_DOMAN || 'skanska.se';
const FORSOK = 8;
const PAUS_MS = 8000;

const anrop = async () => {
  const t0 = Date.now();
  try {
    const r = await fetch(`${BAS}/api/reveal`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: `x@${DOMAN}`, ctOnly: true }), signal: AbortSignal.timeout(40000),
    });
    const j = await r.json().catch(() => ({}));   // sondvakt-ok: ett svar utan JSON är ett mätvärde och rapporteras som sådant
    return { ms: Date.now() - t0, status: r.status, rad: j.findings?.[0] ?? null };
  } catch (e) { return { ms: Date.now() - t0, status: null, fel: e.name === 'TimeoutError' ? 'TIMEOUT' : String(e.message).slice(0, 40) }; }
};

console.log(`\n  Domän: ${DOMAN} · upp till ${FORSOK} försök\n`);
let traff = null, forsokTillTraff = 0;
for (let i = 1; i <= FORSOK && !traff; i++) {
  const r = await anrop();
  forsokTillTraff = i;
  console.log(`  försök ${i}: ${String(r.ms + 'ms').padStart(8)} ${r.fel ? `✗ ${r.fel}` : `HTTP ${r.status} ${r.rad ? `✓ «${r.rad.title}»` : '— ingen rad'}`}`);
  if (r.rad) traff = r;
  else if (i < FORSOK) await new Promise((res) => setTimeout(res, PAUS_MS));
}

console.log('\n  ── UTFALL ──');
if (!traff) {
  console.log(`  Källan vägrade ${FORSOK} gånger i rad. Det är INTE ett underkänt bygge — det är den`);
  console.log('  verklighet värmaren finns för: ett nattligt jobb får försöka om och om igen, en');
  console.log('  besökare får inte det. Ingen slutsats om vågen kan dras ur en källa som teg.');
  process.exit(0);
}

console.log(`  ✓ Vågen levererade raden live, på försök ${forsokTillTraff}.`);
console.log(`    «${traff.rad.title}»`);
console.log(`    källa: ${traff.rad.source}`);

const om = await anrop();
console.log(`\n  Omedelbart nytt anrop: ${om.ms} ms ${om.rad ? '✓ raden kom' : '✗ INGEN rad'}`);
if (om.rad && om.ms < 2000) console.log('  → CACHEN BÄR. Nästa besökare från samma bolag får raden direkt — det var hela poängen.');
else if (om.rad) console.log(`  → raden kom men tog ${om.ms} ms. Cachen bär inte som avsett; det är cachen som ska lagas.`);
else console.log('  → raden försvann mellan två anrop. Träffen cachades inte — värmaren skulle inte hjälpa.');
