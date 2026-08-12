// scripts/probe-sokträffar.mjs — ÄR "N LÄSTA" ETT MÄTVÄRDE ELLER EN SIDSTORLEK?
//
// Kortet skrev "25 LÄSTA · 3 MÖJLIGA" för avida.se — och "25 LÄSTA · 6 MÖJLIGA" för skanska.se.
// Samma tal för två domäner med helt olika antal namnsläktingar är vad en FAST SIDSTORLEK ser ut
// som, inte vad ett mätvärde ser ut som. Talet är redan borttaget ur kundytan, eftersom ett tal
// som ser mätt ut men är en artefakt smittar varje annat tal på kortet.
//
// Sonden avgör saken: den söker på frågor med mycket olika förväntat utfall och redovisar hur
// många bolag söksidan faktiskt lämnar ifrån sig. Fastnar alla vanliga frågor på exakt samma tal
// är det ett tak. Varierar de fritt var talet sant, och då kan raden hämtas tillbaka — med bevis.
import { deklarera } from '../lib/sondkontrakt.js';
import { extractNextData, extractSearchCompanies } from '../lib/business-intel.js';

deklarera({
  namn: 'probe-sokträffar',
  fangar: 'Hur många bolag allabolags söksida lämnar ifrån sig per fråga — och därmed om "N lästa" var ett mätvärde eller en sidstorlek.',
  blind: 'Hur många träffar som finns TOTALT bakom sidbrytningen. Sonden ser sidan vi hämtar, inte registret bakom den.',
});

const HEADERS = { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124 Safari/537.36', Accept: 'text/html' };
// Frågor med avsiktligt olika förväntat utfall: två mycket vanliga namnstammar, två sällsynta.
const FRAGOR = ['skanska', 'avida', 'trivector', 'westander', 'qwertzuiop'];

for (const q of FRAGOR) {
  try {
    const r = await fetch(`https://www.allabolag.se/what/${encodeURIComponent(q)}`,
      { headers: HEADERS, redirect: 'follow', signal: AbortSignal.timeout(25000) });
    if (!r.ok) { console.log(`  ${q.padEnd(14)} ✗ HTTP ${r.status}`); continue; }
    const bolag = extractSearchCompanies(extractNextData(await r.text())) ?? [];
    console.log(`  ${q.padEnd(14)} ${String(bolag.length).padStart(3)} bolag i sidans träfflista`);
  } catch (e) { console.log(`  ${q.padEnd(14)} ✗ ${String(e.message).slice(0, 40)}`); }
}

console.log('\n  Samma tal för vanliga frågor = tak (sidstorlek). Fritt varierande tal = mätvärde.');
console.log('  Bara i det andra fallet får raden komma tillbaka till kundytan.');
