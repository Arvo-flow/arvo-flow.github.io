// scripts/probe-bakatrakning.mjs — FÅR VI RÄKNA BAKLÄNGES NÄR ANTAL-KOLUMNEN ÄR TOM?
//
// Grundarens fråga 2026-09-08, besvarad med en mätning i stället för en åsikt. Sonden kör
// bakåträkning (belopp ÷ à-pris) på varje rad i de 75 verkliga fakturorna där kolumnläsaren
// INTE får ut ett antal, och skriver ut varje träff med sin radtext — för ett aggregat utan
// sina fall är ett tal som ser ut som ett beslutsunderlag (grindmätningen 22 aug).
//
// Utfall 2026-09-09: 18 av 23 rader ger ett rent heltal, och noll av dem är ett antal enheter.
// Varje träff är en gigabyte, en månad eller en terabyte — och på roamingraderna ger kvoten
// tillbaka PRISET (539,60 ÷ 28,40 = 19 kr/GB, av 28,4 GB). Divisionen kan inte veta vilket av
// talen som är mängden. Doktrinen och dess maskinvakt bor i tests/antalsdoktrinen.mjs (AD-01..05).
//
// Sonden LÄSER bara. Den ändrar ingenting och den fäller ingenting — AD-04 är domaren.
// Vad hade BAKÅTRÄKNING (belopp ÷ à-pris) gett på de rader där kolumnen INTE bär ett antal?
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { extraheraTextlager } from '../lib/pdf-textlager.js';
import { lasAntalskolumn } from '../lib/fakturakolumner.js';
const PDFS = new URL('../test-pdfs', import.meta.url).pathname;
let utanAntal=0, rentHeltal=0; const traffar=[];
for (const f of readdirSync(PDFS).filter(f=>f.endsWith('.pdf')).sort()) {
  let tokens=[]; try{({tokens}=await extraheraTextlager(readFileSync(join(PDFS,f))));}catch{continue;}
  const t=lasAntalskolumn(tokens); if(!t) continue;
  for (const r of t.rader) {
    if (r.antal!=null) continue;
    const tal=(r.tal??[]).filter(n=>n>0);
    if (tal.length<2) continue;
    utanAntal++;
    // Bakåträkning: största talet ÷ något mindre tal på raden = jämnt heltal?
    const belopp=Math.max(...tal);
    for (const apris of tal) {
      if (apris>=belopp) continue;
      const kvot=belopp/apris;
      if (Number.isInteger(Math.round(kvot*1e6)/1e6) && kvot>1 && kvot<100000
          && Math.abs(kvot-Math.round(kvot))<1e-9) {
        rentHeltal++; traffar.push(`${f}: ${belopp} / ${apris} = ${kvot}  | ${r.text.slice(0,64)}`);
        break;
      }
    }
  }
}
console.log(`rader utan avläst antal, med ≥2 tal: ${utanAntal}`);
console.log(`varav bakåträkning ger ett RENT heltal: ${rentHeltal}\n`);
console.log(traffar.join('\n'));
