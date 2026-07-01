// scripts/diag-reveal.mjs — verifierar Avslöjandet LIVE på Vercel (RDAP + crt.sh kräver egress).
// Hittar fynden för en känd M365-domän → bevisar att hela kedjan (DNS + domänålder + onboarding-datum)
// fungerar utlagt, inte bara DNS-delen lokalt. Diagnostik (regel 8 — gör inte användaren till QA).
const BASE = process.env.ARVO_BASE_URL || 'https://arvoflow.se';

import { writeFileSync, mkdirSync } from 'node:fs';

// lynxeye.com = känt svenskt SME med affärsdata (bevisar affärshjärnan genom den LIVE-utlagda API:n)
for (const email of ['namn@lynxeye.com', 'namn@microsoft.com', 'namn@gmail.com']) {
  const res = await fetch(`${BASE}/api/reveal`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await res.json().catch(() => ({}));
  console.log(`\n=== ${email} → HTTP ${res.status} · domän=${data.domain ?? '(ingen)'} ===`);
  if (data.note) console.log('note:', data.note);
  for (const f of data.findings ?? []) console.log(`  ✓ ${f.title}\n      källa: ${f.source}`);
  // Dumpa lynxeye-svaret ORDAGRANT → demo-renderingar konsumerar API:ns verkliga output,
  // aldrig handmatade platshållare (grundarlärdom 2026-07-01: platshållardagar i en demo-bild).
  if (data.domain === 'lynxeye.com') {
    mkdirSync('ops', { recursive: true });
    writeFileSync('ops/diag-reveal-live.json', JSON.stringify(data, null, 2));
    console.log('  → rå payload sparad: ops/diag-reveal-live.json');
  }
}
