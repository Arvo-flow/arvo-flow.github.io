// scripts/probe-sista-tre.mjs — REKOGNOSERING för de sista tre ovaktade källorna.
//
//  1. ATLASSIAN — hitta seat-väljaren. Prisbokens tal gäller 110 users; sidans standardvy visar
//     en annan trappstegsnivå. Utan att kunna STÄLLA IN antalet kan vakten varken godkänna eller
//     underkänna (se SEAT-FÄLLAN i lib/verifiers/atlassian.mjs). Här kartläggs kontrollerna.
//  2. PIPEDRIVE — planerna heter numera Lite/Growth/Premium/Ultimate. Prisbokens nycklar heter
//     essential/advanced — produkter som inte längre säljs. Vi behöver se hela lineupen med
//     namn↔pris-bindning innan någon nyckel döps om.
//  3. FORTNOX — /produkter/lon och /produkter/priser 404:ar båda. Leta rätt prissida via sajten.
//
// Ren instrumentering. Rör aldrig prisboken.
import { withPage } from '../lib/verifiers/core.mjs';

const rad = (s, n = 150) => JSON.stringify(String(s ?? '').replace(/\s+/g, ' ').trim().slice(0, n));

// ── 1. ATLASSIAN: kartlägg alla kontroller som kan styra användarantalet ────────
for (const [namn, url] of [
  ['jira', 'https://www.atlassian.com/software/jira/pricing'],
  ['confluence', 'https://www.atlassian.com/software/confluence/pricing'],
]) {
  console.log(`\n══════════ ATLASSIAN ${namn.toUpperCase()} ══════════\n${url}`);
  const r = await withPage(url, async (page, status) => {
    const kontroller = await page.evaluate(() => {
      const ut = [];
      for (const el of document.querySelectorAll('input, select, [role=slider], [role=spinbutton], button')) {
        const t = (el.innerText || el.value || '').trim().slice(0, 60);
        const attr = ['id', 'name', 'type', 'aria-label', 'placeholder', 'data-testid', 'role', 'min', 'max', 'value']
          .map((a) => (el.getAttribute(a) ? `${a}=${el.getAttribute(a)}` : null)).filter(Boolean).join(' ');
        const relevant = /user|seat|anv|slider|spin|number|range/i.test(attr + ' ' + t);
        if (relevant) ut.push(`${el.tagName.toLowerCase()} | ${attr} | text=${t}`);
      }
      return ut.slice(0, 30);
    });
    // Rader som nämner användarantal — visar hur sidan formulerar trappan.
    const rader = (await page.evaluate(() => document.body?.innerText ?? ''))
      .split('\n').map((x) => x.trim()).filter((x) => /user|users/i.test(x) && x.length < 120).slice(0, 18);
    return { status, kontroller, rader };
  }, { timeoutMs: 45000, settleMs: 5000 }).catch((e) => ({ status: 'ERR ' + e.message.split('\n')[0] }));

  console.log('  status', r?.status);
  console.log('  ── kontroller som kan styra antal användare ──');
  (r?.kontroller ?? []).forEach((k) => console.log('    ' + k));
  if (!(r?.kontroller ?? []).length) console.log('    (inga hittade — trappan kanske bara syns i pris-tabellen)');
  console.log('  ── textrader om användare ──');
  (r?.rader ?? []).forEach((x) => console.log('    ' + rad(x)));
}

// ── 2. PIPEDRIVE: hela lineupen med namn↔pris ──────────────────────────────────
console.log('\n══════════ PIPEDRIVE LINEUP ══════════');
{
  const r = await withPage('https://www.pipedrive.com/en/pricing', async (page, status) => {
    const text = await page.evaluate(() => document.body?.innerText ?? '');
    return { status, text };
  }, { timeoutMs: 45000, settleMs: 5000 }).catch((e) => ({ status: 'ERR ' + e.message.split('\n')[0], text: '' }));
  console.log('  status', r?.status);
  const rader = (r.text || '').split('\n').map((x) => x.trim()).filter(Boolean);
  // Skriv ut fönstret runt varje plannamn så bindningen namn→pris syns svart på vitt.
  for (const plan of ['Lite', 'Growth', 'Premium', 'Ultimate', 'Essential', 'Advanced', 'Professional']) {
    const i = rader.findIndex((x) => x === plan);
    if (i < 0) { console.log(`  ${plan}: (finns ej som egen rad)`); continue; }
    console.log(`  ── ${plan} (rad ${i}) ──`);
    rader.slice(i, i + 9).forEach((x) => console.log('     ' + rad(x, 90)));
  }
}

// ── 3. FORTNOX: hitta prissidan ────────────────────────────────────────────────
console.log('\n══════════ FORTNOX — jakt på prissidan ══════════');
{
  const r = await withPage('https://www.fortnox.se/', async (page, status) => {
    const lankar = await page.evaluate(() => [...document.querySelectorAll('a')]
      .map((a) => ({ href: a.href, text: (a.innerText || '').trim().slice(0, 50) }))
      .filter((l) => /pris|lon|lön|kostnad|abonnemang/i.test(l.href + ' ' + l.text))
      .slice(0, 40));
    return { status, lankar };
  }, { timeoutMs: 40000, settleMs: 3500 }).catch((e) => ({ status: 'ERR ' + e.message.split('\n')[0] }));
  console.log('  startsidan status', r?.status);
  (r?.lankar ?? []).forEach((l) => console.log(`    ${l.href}  ← ${rad(l.text, 40)}`));

  // Testa de vanligaste kandidaterna direkt.
  for (const u of ['https://www.fortnox.se/priser', 'https://www.fortnox.se/prislista',
    'https://www.fortnox.se/produkter/fortnox-lon', 'https://www.fortnox.se/lon',
    'https://www.fortnox.se/produkter/loneprogram']) {
    const s = await withPage(u, async (_p, st) => st, { timeoutMs: 25000, settleMs: 1500 })
      .catch((e) => 'ERR ' + e.message.split('\n')[0]);
    console.log(`    prov ${u} → ${s}`);
  }
}
