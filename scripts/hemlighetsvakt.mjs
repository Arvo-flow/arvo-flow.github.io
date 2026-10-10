#!/usr/bin/env node
// scripts/hemlighetsvakt.mjs — inget hemligt får committas till ett PUBLIKT repo.
//
// VARFÖR (2026-08-24). Skörden (`scripts/skorda-agentarbete.mjs`) räddar agenternas arbete ur
// harnessets transkript, och den räddar **varje kört kommando med sitt utfall**. Det är hela dess
// värde — och samtidigt en ny sorts risk: filerna innehåller numera godtycklig kommandoutdata,
// och de committas till ett offentligt repo.
//
// Jag körde en skanning före den första skörd-committen, den TRÄFFADE, och committen gick igenom
// ändå — därför att kontrollen och committen låg i samma kommandokedja utan grind. Träffarna var
// ofarliga (`postgres://stub`, `re_stub`, medvetna platshållare), men det visste jag först efteråt.
// **En kontroll vars utfall inte kan stoppa något är ingen kontroll — den är en vana.** Bibeln har
// samma sats om vakter som ser ut som lager utan att vara det.
//
// Vakten kör i pre-commit, bredvid price-audit och claims-audit, och läser bara det som faktiskt
// STAGEATS — inte hela trädet. En hemlighet som aldrig committas är ingen läcka.
//
// FÅNGAR: riktiga API-nycklar, DB-URL:er med lösenord, magic-tokens, JWT och privata nycklar i en
//   stagead fil, samt personliga e-postadresser i skördat material.
// BLIND: mönsterlistan är en ordlista, inte en förståelse. En hemlighet i ett format som inte står
//   här passerar — listan VÄXER med varje incident, precis som claims-audit. Vakten läser heller
//   inte binärfiler, och den kan inte veta om en `stub`-markerad sträng verkligen är en stub;
//   den litar på att uppenbara platshållare är platshållare, vilket är ett medvetet val för att
//   en vakt som fäller allt blir avstängd (smyghöjningsvaktens läxa).

import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { diffIntervall } from '../lib/diffintervall.js';

// Uppenbara platshållare. Faller de ut som träffar blir vakten brusig och stängs av — och en
// avstängd vakt är värre än ingen (bibeln, 2026-08-05). Listan är avsiktligt kort och konkret.
const PLATSHALLARE = /\b(stub|dummy|example|placeholder|xxx+|<[^>]+>|din[-_]?nyckel|your[-_]?key|redacted|maskerad)\b/i;

const MONSTER = [
  { namn: 'Anthropic API-nyckel', re: /\bsk-ant-[A-Za-z0-9_-]{16,}/ },
  { namn: 'OpenAI API-nyckel', re: /\bsk-[A-Za-z0-9]{32,}/ },
  { namn: 'Resend API-nyckel', re: /\bre_[A-Za-z0-9]{16,}/ },
  { namn: 'GitHub-token', re: /\bgh[pousr]_[A-Za-z0-9]{20,}/ },
  { namn: 'AWS-nyckel', re: /\bAKIA[0-9A-Z]{16}\b/ },
  { namn: 'databas-URL med lösenord', re: /\b(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?|redis|rediss):\/\/[^\s:@/]+:[^\s@/]+@/ },
  { namn: 'JWT', re: /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/ },
  { namn: 'privat nyckel', re: /-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/ },
  { namn: 'magic-token i länk', re: /[?&]magic=[A-Za-z0-9_-]{12,}/ },
  { namn: 'Bearer-token', re: /\bBearer\s+[A-Za-z0-9_.-]{24,}/ },
  { namn: 'personlig e-postadress', re: /\b[A-Za-z0-9._%+-]+@(?:gmail|hotmail|outlook|live|yahoo|icloud|protonmail)\.[a-z]{2,}\b/i },
];

// `.env` får aldrig committas, oavsett innehåll (bibelns egen rad).
const FORBJUDNA_FILER = /(^|\/)\.env(\.|$)/;

// Lokalt den stageade diffen, i CI PR:ens intervall (lib/diffintervall.js). Ett fel här avslutar
// med exit 1 i stället för att läsas som «inga filer».
let kalla = 'stageade';
function andradeFiler() {
  let iv;
  try { iv = diffIntervall(); } catch (err) { console.error(`✗ Hemlighetsvakten: ${err.message}`); process.exit(1); }
  if (iv.lage === 'intervall') kalla = `ändrade i ${iv.bas.slice(0, 7)}...HEAD`;
  const ut = execFileSync('git', ['diff', ...iv.args, '--name-only', '--diff-filter=ACM'], { encoding: 'utf8' });
  return ut.split('\n').map((r) => r.trim()).filter(Boolean);
}

const filer = andradeFiler();
const brott = [];

for (const fil of filer) {
  if (FORBJUDNA_FILER.test(fil)) {
    brott.push(`${fil} — .env får aldrig committas`);
    continue;
  }
  if (!existsSync(fil)) continue;
  try { if (statSync(fil).size > 4_000_000) continue; } catch { continue; }

  let innehall;
  try { innehall = readFileSync(fil, 'utf8'); } catch { continue; }   // binär eller oläsbar
  if (innehall.includes('\0')) continue;

  innehall.split('\n').forEach((rad, i) => {
    for (const m of MONSTER) {
      const träff = rad.match(m.re);
      if (!träff) continue;
      if (PLATSHALLARE.test(träff[0])) continue;
      // En legitim träff motiveras inline, samma mönster som claims-audit och kopidetektorn.
      if (/hemlighet-ok:/.test(rad)) continue;
      brott.push(`${fil}:${i + 1} — ${m.namn}: ${träff[0].slice(0, 24)}…`);
    }
  });
}

if (brott.length > 0) {
  console.error('\n✗ Hemlighetsvakten blockerar committen — repot är PUBLIKT.\n');
  for (const b of brott) console.error(`   ${b}`);
  console.error('\n   Är träffen ofarlig: motivera inline med  // hemlighet-ok: <skäl>');
  console.error('   Är den äkta: rotera nyckeln FÖRST, ta sedan bort den ur filen.\n');
  process.exit(1);
}

console.log(`✓ Hemlighetsvakten — ${filer.length} ${kalla} fil(er) rena`);
