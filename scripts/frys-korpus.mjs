// Fryser pdfjs VERKLIGA textlager för varje PDF i test-pdfs/. Deterministiskt, inga modellanrop.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { extraheraTextlager } from '../lib/pdf-textlager.js';
const HAR = dirname(fileURLToPath(import.meta.url));
const IN = join(HAR, '../test-pdfs');
const UT = join(HAR, '../test-corpus/textlager');
const manifest = [];
for (const f of readdirSync(IN).filter((x) => x.endsWith('.pdf')).sort()) {
  let text = '', fel = null;
  try {
    const r = await extraheraTextlager(readFileSync(`${IN}/${f}`));
    text = typeof r === 'string' ? r : (r?.text ?? '');
  } catch (e) { fel = e.message; }
  const bas = f.replace(/\.pdf$/i, '');
  const lasbart = text.trim().length > 40;
  if (lasbart) writeFileSync(`${UT}/${bas}.txt`, text, 'utf8');
  manifest.push({ pdf: f, textlager: lasbart ? `${bas}.txt` : null,
    rader: lasbart ? text.split('\n').length : 0, tecken: text.length, fel });
}
writeFileSync(join(UT, '../manifest.json'), JSON.stringify({
  beskrivning: 'pdfjs faktiska utfall för test-pdfs/. Fryst deterministiskt, inga modellanrop.',
  fryst: '2026-09-08', antal: manifest.length,
  medTextlager: manifest.filter((m) => m.textlager).length,
  filer: manifest,
}, null, 2) + '\n', 'utf8');
console.log(`fryste ${manifest.filter((m)=>m.textlager).length} av ${manifest.length} textlager`);
