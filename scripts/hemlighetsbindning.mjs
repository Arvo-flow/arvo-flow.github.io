// scripts/hemlighetsbindning.mjs — VILKA JOBB LÄSER VILKA GITHUB-HEMLIGHETER, OCH ÄR DE BUNDNA TILL `produktion`? (2026-10-10)
//
// Miljön `produktion` tillåter bara `main`. En hemlighet som också ligger kvar på repo-nivå når däremot
// varje jobb på varje branch, så läckan är stängd först när (a) varje jobb som läser en hemlighet bär
// `environment: produktion` och (b) sondens läckkontroll prövar VARJE namn som används. Granskningen av
// PR #80 visade varför (b) måste härledas: arbetsflödena läste nio namn, sonden prövade sex.
//
// Läser YAML radvis i stället för med en parser: varken `yaml` eller `js-yaml` är ett direkt beroende,
// och ett transitivt beroende kan försvinna vid nästa uppgradering. Formen som läses är den repot har:
// `jobs:` på toppnivå, jobbnamn indraget två steg, `environment:` som egen rad i jobbet.
//
// FÅNGAR: ett jobb som läser `secrets.X` utan `environment: produktion` (HB-01); hemligheter i `env:` på
//   toppnivå, som räknas till varje jobb, och `secrets: inherit`, som räknas som allt (HB-03); ett uttryck
//   som läser hemligheter utan att namnge dem — `toJSON(secrets)`, `secrets[format(…)]`,
//   `secrets[matrix.x]` — som också räknas som allt, och `SECRETS.X` i andra versaler (HB-06).
// BLIND: en hemlighet som når ett jobb på annat sätt än via `secrets` i samma fil (en återanvänd
//   workflow som får hemligheten som input syns i anroparen, inte i den anropade), och YAML skriven i en
//   annan form än ovan (flödesmappning `{ … }`, ankare). HB-04 kräver att varje jobbrubrik hittas, så en
//   annan form syns som ett fel i stället för som ett tomt, grönt svar.

export const SKYDDAD_MILJO = 'produktion';

// ALLA: varje namn som något arbetsflöde läser — läckkontrollen prövar dem alla (HB-02). Granskningen av
// PR #80 fann nio namn i bruk medan sonden prövade sex, så tre kunde ligga kvar på repo-nivå osedda.
// KRAVDA: de som produktionsjobben behöver för att fungera (HB-02 kräver att de är en delmängd av ALLA).
export const ALLA_HEMLIGHETER = ['ANTHROPIC_API_KEY', 'ARVO_ADMIN_SECRET', 'BOT_DEPLOY_KEY', 'CRON_SECRET',
  'DATABASE_URL', 'DROPBOX_AUTH_COOKIE', 'KV_REST_API_TOKEN', 'KV_REST_API_URL', 'RESEND_API_KEY', 'RESEND_FROM'];
// BOT_DEPLOY_KEY: verifieringsstämpelns väg förbi grenskyddet (verify-sources.yml#stampla, SP-06).
export const KRAVDA_I_PRODUKTION = ['ANTHROPIC_API_KEY', 'ARVO_ADMIN_SECRET', 'BOT_DEPLOY_KEY', 'CRON_SECRET',
  'DATABASE_URL', 'RESEND_API_KEY'];
// Det enda jobb som MEDVETET läser hemligheter utan miljön: läckkontrollens motprov (SV-21).
export const MOTPROVSJOBB = 'probe-hemligheter.yml#utan-miljo';

// Ett jobb-id kan stå citerat ('b': / "b":). Utan det slogs ett citerat jobb ihop med jobbet ovanför
// och ärvde dess miljö (andra blickens V5, HB-03).
export const JOBBRUBRIK = /^ {2}(['"]?)([A-Za-z0-9_-]+)\1:\s*(#.*)?$/;
// Båda formerna: secrets.X och secrets['X'] / secrets["X"]. Versalerna räknas inte: att räkna för mycket
// är den säkra riktningen, och namnet skrivs med versaler så att `secrets.bot_deploy_key` är samma
// hemlighet som BOT_DEPLOY_KEY (tredje blickens V4, HB-06).
const HEMLIGHET = /(?<![.\w-])secrets(?:\s*\.\s*([A-Za-z_][A-Za-z0-9_]*)|\s*\[\s*['"]([A-Za-z_][A-Za-z0-9_]*)['"]\s*\])/gi;
// Ett uttryck ${{ … }} där `secrets` står utan ett namn efter sig läser hemligheter som ingen lista ser:
// toJSON(secrets), secrets[format(…)], secrets[matrix.x], ${{ secrets }}. Det räknas som alla.
const UTTRYCK = /\$\{\{([\s\S]*?)\}\}/g;
const ONAMNGIVEN = /(?<![.\w-])secrets\b(?!\s*\.\s*[A-Za-z_]|\s*\[\s*['"][A-Za-z_][A-Za-z0-9_]*['"]\s*\])/i;

/** Hemlighetsnamn (utom GITHUB_TOKEN, som GitHub själv utfärdar per körning) i en textbit. */
export function hemligheterI(text) {
  return [...new Set([...String(text).matchAll(HEMLIGHET)].map((m) => (m[1] ?? m[2]).toUpperCase()))].filter((n) => n !== 'GITHUB_TOKEN').sort();
}

/** Läser textbiten hemligheter utan att namnge dem (toJSON(secrets), secrets[uttryck])? */
export function lasesDynamiskt(text) {
  for (const m of String(text).matchAll(UTTRYCK)) if (ONAMNGIVEN.test(m[1])) return true;
  return false;
}

/** Når hemligheten `namn` jobbet — med namn, genom `secrets: inherit` eller genom ett onamngivet uttryck? */
export function lasarHemlighet(j, namn) {
  return j.arver || j.dynamisk || j.hemligheter.includes(namn);
}

/**
 * Ett arbetsflödes jobb: [{ jobb, miljo, hemligheter, arver, dynamisk, text }]. `text` är jobbets rader (för SP-06). `miljo` är null när jobbet inte väljer någon.
 * Kastar om `jobs:` saknas eller inga jobbrubriker hittas, så att ett tomt svar inte ser ut som ett rent (HB-04).
 */
export function jobbIArbetsflode(yaml) {
  const rader = String(yaml).split('\n');
  const start = rader.findIndex((r) => /^jobs:\s*(#.*)?$/.test(r));
  if (start < 0) throw new Error('hemlighetsbindning: ingen `jobs:` på toppnivå');
  const toppText = rader.slice(0, start).join('\n');
  const toppniva = hemligheterI(toppText);
  const toppDynamisk = lasesDynamiskt(toppText);
  const jobb = [];
  let aktuellt = null;
  for (let i = start + 1; i < rader.length; i++) {
    const r = rader[i];
    if (/^\S/.test(r)) break;                      // nästa nyckel på toppnivå
    const m = r.match(JOBBRUBRIK);
    if (m) { aktuellt = { jobb: m[2], rader: [] }; jobb.push(aktuellt); continue; }
    if (aktuellt) aktuellt.rader.push(r);
  }
  if (!jobb.length) throw new Error('hemlighetsbindning: `jobs:` utan jobbrubriker i den form som läses');
  return jobb.map(({ jobb: namn, rader: r }) => {
    const text = r.join('\n');
    let miljo = null;
    for (let i = 0; i < r.length; i++) {
      const e = r[i].match(/^ {4}environment:\s*([^\s#]*)/);
      if (!e) continue;
      miljo = e[1] || (r[i + 1]?.match(/^ {6}name:\s*([^\s#]+)/)?.[1] ?? null);
      break;
    }
    const arver = /^\s+secrets:\s*inherit\b/m.test(text);
    const dynamisk = toppDynamisk || lasesDynamiskt(text);
    return { jobb: namn, miljo, hemligheter: [...new Set([...toppniva, ...hemligheterI(text)])].sort(), arver, dynamisk, text };
  });
}

/**
 * Händelser som kan starta arbetsflödet på en annan ref än main: `push` utan grenfilter eller med en
 * annan gren än main, och varje `pull_request*` (jobbet kör på PR:ens ref, oavsett målgren). Ett jobb i
 * miljön produktion kan bara bli rött där, eftersom miljön bara släpper in main (HB-05).
 */
export function utlosareUtanforMain(yaml) {
  const rader = String(yaml).split('\n');
  const start = rader.findIndex((r) => /^on:\s*(#.*)?$/.test(r));
  if (start < 0) {
    const inline = rader.find((r) => /^on:\s*\S/.test(r));
    if (!inline) throw new Error('hemlighetsbindning: ingen `on:` på toppnivå');
    return ['push', 'pull_request', 'pull_request_target'].filter((e) => new RegExp(`\\b${e}\\b`).test(inline));
  }
  const block = [];
  for (let i = start + 1; i < rader.length && !/^\S/.test(rader[i]); i++) block.push(rader[i]);
  const ut = [];
  for (let i = 0; i < block.length; i++) {
    const h = block[i].match(/^ {2}([a-z_]+):/);
    if (!h) continue;
    const kropp = [];
    for (let j = i + 1; j < block.length && !/^ {2}\S/.test(block[j]); j++) kropp.push(block[j]);
    if (h[1].startsWith('pull_request')) { ut.push(h[1]); continue; }
    if (h[1] !== 'push') continue;
    const k = kropp.join('\n');
    const inline = k.match(/^ {4}branches:\s*\[([^\]]*)\]/m);
    let grenar = inline ? inline[1].split(',').map((g) => g.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean) : null;
    if (!inline) {
      const bi = kropp.findIndex((r) => /^ {4}branches:\s*(#.*)?$/.test(r));
      if (bi >= 0) {
        grenar = [];
        for (let j = bi + 1; j < kropp.length && /^ {6}-/.test(kropp[j]); j++) grenar.push(kropp[j].replace(/^ {6}-\s*/, '').replace(/\s+#.*$/, '').replace(/^['"]|['"]$/g, ''));
      }
    }
    if (!grenar || grenar.length === 0 || grenar.some((g) => g !== 'main')) ut.push('push');
  }
  return ut;
}

/** Alla jobb i alla arbetsflöden som läser minst en hemlighet men inte är bundna till `produktion`. */
export function obundnaJobb(arbetsfloden, { undantag = [] } = {}) {
  const ut = [];
  for (const [fil, yaml] of Object.entries(arbetsfloden)) {
    for (const j of jobbIArbetsflode(yaml)) {
      const id = `${fil}#${j.jobb}`;
      if ((j.hemligheter.length || j.arver || j.dynamisk) && j.miljo !== SKYDDAD_MILJO && !undantag.includes(id)) {
        ut.push({ id, hemligheter: j.arver ? ['(secrets: inherit)'] : j.dynamisk ? ['(alla, via ett onamngivet uttryck)'] : j.hemligheter });
      }
    }
  }
  return ut;
}

/** Varje hemlighetsnamn som något arbetsflöde läser. */
export function allaHemligheter(arbetsfloden) {
  return [...new Set(Object.values(arbetsfloden).flatMap((y) => hemligheterI(y)))].sort();
}
