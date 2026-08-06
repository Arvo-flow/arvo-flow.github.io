// scripts/probe-neon-spend.mjs — SOND: hur sätter man en utgiftsspärr på Neon, EGENTLIGEN?
//
// Grundaren bad om en stegvis guide. Att skriva den ur minnet vore exakt det fel hela veckan
// handlat om: ett självsäkert påstående utan källa. Jag har aldrig sett Neons konsol och når den
// inte härifrån — så vi hämtar deras egen dokumentation och läser vad som faktiskt står.
//
// ÖPPEN FRÅGA som sonden ska besvara: installationen är VERCEL-HANTERAD (Neon via Vercel
// Marketplace). Om faktureringen då ligger hos Vercel kanske spärren inte ens finns i Neons
// konsol — och då är hela guiden fel plats. Därför söker vi BÅDE efter budget-/spend-inställningar
// OCH efter vad som gäller för marketplace-installationer.
import { fetchText, stripHtml } from '../lib/verifiers/core.mjs';

// GRUNDARENS FYND 2026-08-06: Neons konsol säger "Neon subscription managed by Vercel — your
// subscription is managed directly in your Vercel account". Det finns alltså ingen spärr att sätta
// inuti Neon. Den avgörande frågan blir därför: täcker Vercels On-Demand Budget ($40) även
// MARKETPLACE-förbrukning (Neon), eller bara Vercels egna mätvärden? Täcker den inte, saknar Neon
// utgiftsspärr helt — och då är kodens spärrar det enda skyddet.
const SIDOR = [
  ['vercel-spend-management', 'https://vercel.com/docs/spend-management'],
  ['vercel-marketplace', 'https://vercel.com/docs/integrations/marketplace'],
  ['vercel-marketplace-billing', 'https://vercel.com/docs/integrations/marketplace-product#billing'],
  ['vercel-manage-usage', 'https://vercel.com/docs/manage-and-optimize-usage'],
  ['docs-billing', 'https://neon.com/docs/introduction/about-billing'],
  ['docs-monitor-usage', 'https://neon.com/docs/introduction/monitor-usage'],
  ['docs-manage-billing', 'https://neon.com/docs/introduction/manage-billing'],
  ['docs-vercel-marketplace', 'https://neon.com/docs/guides/vercel-managed-integration'],
  ['docs-plans', 'https://neon.com/docs/introduction/plans'],
  ['docs-index', 'https://neon.com/docs/introduction'],
];

// Ord som pekar mot en utgiftsspärr respektive mot marketplace-särfall.
const NYCKELORD = /budget|spend|spending limit|cost control|usage limit|quota|alert|notification|threshold|cap\b/i;
const MARKETPLACE = /vercel|marketplace|managed by|billed through|installation/i;

for (const [namn, url] of SIDOR) {
  console.log(`\n══════════ ${namn.toUpperCase()} ══════════\n${url}`);
  const { status, text } = await fetchText(url, { timeoutMs: 25000 });
  console.log('HTTP', status, '· html', text.length);
  if (status !== 200 || !text) { console.log('  → oåtkomlig'); continue; }

  const flat = stripHtml(text);
  console.log('  flat', flat.length);

  // Meningar som nämner utgiftsspärr — det är dem guiden ska bygga på.
  const meningar = flat.split(/(?<=[.!?])\s+/).map((m) => m.trim()).filter(Boolean);
  const traffar = meningar.filter((m) => NYCKELORD.test(m) && m.length > 40 && m.length < 400);
  console.log(`  ── ${Math.min(traffar.length, 14)} av ${traffar.length} meningar om budget/spärr ──`);
  traffar.slice(0, 14).forEach((m) => console.log('    • ' + m.replace(/\s+/g, ' ')));

  // Särskilt: vad säger sidan om Vercel-hanterade installationer?
  const mp = meningar.filter((m) => MARKETPLACE.test(m) && /billing|plan|payment|invoice|manage/i.test(m)
    && m.length > 40 && m.length < 400);
  if (mp.length) {
    console.log(`  ── ${Math.min(mp.length, 8)} meningar om Vercel/marketplace-fakturering ──`);
    mp.slice(0, 8).forEach((m) => console.log('    ⚑ ' + m.replace(/\s+/g, ' ')));
  }
}
