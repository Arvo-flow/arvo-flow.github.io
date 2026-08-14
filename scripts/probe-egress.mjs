// scripts/probe-egress.mjs — ÄR DET KÄLLAN SOM ÄR NERE, ELLER ÄR DET VI?
//
// Läget: crt.sh svarar ibland när GitHub-runnern frågar (skanska.se gav 1 721 certifikat och
// datumet 2011-11-17 på FÖRSTA försöket i två separata mätningar), men vägrade åtta gånger i rad
// när Vercel frågade — fyra av dem på ~2 000 ms, vilket är "502 direkt → paus → 502 direkt".
//
// En källa som är nere är nere för alla. Ett mönster där EN avsändare får svar och en annan
// nekas är inte otur — det är avsändaren. Och skillnaden avgör var värmaren ska bo: kan Vercel
// aldrig läsa crt.sh spelar det ingen roll hur många omförsök den får, och jobbet hör hemma i
// GitHub Actions där svaren faktiskt kommer.
//
// Sonden ställer frågan så att bara ett svar är möjligt: BÅDA anropen görs från SAMMA runner, i
// samma sekund, mot samma domän. Det ena går direkt till crt.sh; det andra går via vår utlagda
// endpoint på Vercel, som i sin tur frågar crt.sh. Skiljer sig utfallet är det inte källan.
import { deklarera } from '../lib/sondkontrakt.js';

deklarera({
  namn: 'probe-egress',
  fangar: 'Om crt.sh behandlar GitHub-runnerns utgående adress annorlunda än Vercels — mätt genom två samtidiga anrop om samma domän.',
  blind: 'Vilken egenskap hos avsändaren som i så fall avgör (IP-rykte, hastighetsspärr, user-agent). Sonden visar ATT det skiljer, aldrig varför — och ett enstaka sammanträffande i tid kan förklara en enskild rad.',
});

const BAS = process.env.ARVO_BASE_URL || 'https://arvoflow.se';
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36';
const DOMANER = ['skanska.se', 'volvo.se', 'westander.se'];

const direkt = async (d) => {
  const t0 = Date.now();
  try {
    const r = await fetch(`https://crt.sh/?q=${encodeURIComponent('%.' + d)}&output=json`,
      { headers: { Accept: 'application/json', 'User-Agent': UA }, signal: AbortSignal.timeout(25000) });
    const text = await r.text();
    let rows = null; try { rows = JSON.parse(text); } catch { /* inte JSON */ }
    return { ms: Date.now() - t0, status: r.status, certs: Array.isArray(rows) ? rows.length : null };
  } catch (e) { return { ms: Date.now() - t0, status: null, fel: e.name === 'TimeoutError' ? 'TIMEOUT' : String(e.message).slice(0, 30) }; }
};

const viaVercel = async (d) => {
  const t0 = Date.now();
  try {
    const r = await fetch(`${BAS}/api/reveal`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: `x@${d}`, ctOnly: true }), signal: AbortSignal.timeout(40000) });
    const j = await r.json().catch(() => ({}));   // sondvakt-ok: ett svar utan JSON är precis det egress-sonden mäter
    return { ms: Date.now() - t0, status: r.status, rad: j.findings?.[0]?.title ?? null };
  } catch (e) { return { ms: Date.now() - t0, status: null, fel: e.name === 'TimeoutError' ? 'TIMEOUT' : String(e.message).slice(0, 30) }; }
};

for (const d of DOMANER) {
  console.log(`\n═══ ${d} — båda anropen startas samtidigt`);
  const [a, b] = await Promise.all([direkt(d), viaVercel(d)]);
  console.log(`  runner → crt.sh   ${String(a.ms + 'ms').padStart(8)}  ${a.fel ? `✗ ${a.fel}` : `HTTP ${a.status} · ${a.certs ?? '—'} cert`}`);
  console.log(`  runner → Vercel   ${String(b.ms + 'ms').padStart(8)}  ${b.fel ? `✗ ${b.fel}` : `HTTP ${b.status} · ${b.rad ? `✓ «${b.rad}»` : 'ingen rad'}`}`);
  const runnerFick = a.certs > 0;
  const vercelFick = Boolean(b.rad);
  if (runnerFick && !vercelFick) console.log('  ⇒ RUNNERN FICK SVAR, VERCEL INTE — det är inte källan, det är avsändaren.');
  else if (!runnerFick && !vercelFick) console.log('  ⇒ Ingen av dem fick svar — källan teg för alla. Ingen slutsats om avsändaren.');
  else if (runnerFick && vercelFick) console.log('  ⇒ Båda fick svar — ingen skillnad att förklara.');
}

console.log('\n  Skiljer utfallet konsekvent hör värmaren hemma i GitHub Actions, inte i Vercel-cron.');
