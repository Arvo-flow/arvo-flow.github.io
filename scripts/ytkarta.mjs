#!/usr/bin/env node
// scripts/ytkarta.mjs — skriver ops/YTKARTA.md ur lib/kundytor.js (regel 1: kartan är en vy av
// registret, aldrig en avskrift som kan glida isär). Kör: node scripts/ytkarta.mjs
import { writeFileSync } from 'node:fs';
import { MEJLYTOR, SIDYTOR, ENDPOINTYTOR } from '../lib/kundytor.js';

const ORDNING = { oreviderad: 0, registret: 1, marknad: 2, mejlyta: 3, ingen_prisdom: 4, intern: 5 };
const rad = (namn, kanal, y) => `| \`${namn}\` | ${kanal} | ${y.mottagare ?? 'besökare'} | **${y.klass}** | ${(y.pastar ?? y.skal).replace(/\|/g, '\\|')} |`;
const alla = [
  ...Object.entries(MEJLYTOR).map(([n, y]) => ({ n, k: 'mejl', y })),
  ...Object.entries(SIDYTOR).map(([n, y]) => ({ n, k: 'sida', y })),
  ...Object.entries(ENDPOINTYTOR).map(([n, y]) => ({ n, k: y.grind ? `endpoint · grind \`${y.grind}\`` : 'endpoint', y: { mottagare: 'anropare', ...y } })),
].sort((a, b) => ORDNING[a.y.klass] - ORDNING[b.y.klass] || a.n.localeCompare(b.n));
const per = alla.reduce((m, { y }) => ({ ...m, [y.klass]: (m[y.klass] ?? 0) + 1 }), {});
const md = `# Ytkartan — varje ställe där Arvo talar till en människa utanför bolaget

*Genererad ur \`lib/kundytor.js\` av \`scripts/ytkarta.mjs\`. Redigera registret, inte den här filen.
\`tests/ytinventering.mjs\` (YI-01..11) hittar själv varje mejlavsändare, varje route och varje endpoint och fäller
sviten när en yta saknas här.*

**${alla.length} ytor** — ${Object.entries(per).map(([k, n]) => `${n} ${k}`).join(' · ')}.

| Yta | Kanal | Mottagare | Klass | Vad den påstår i dag (mätt i koden 2026-09-23/24) |
|---|---|---|---|---|
${alla.map(({ n, k, y }) => rad(n, k, y)).join('\n')}
`;
writeFileSync(new URL('../ops/YTKARTA.md', import.meta.url), md);
console.log(`ops/YTKARTA.md · ${alla.length} ytor · ${JSON.stringify(per)}`);
