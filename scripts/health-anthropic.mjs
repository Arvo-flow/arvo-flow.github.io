// scripts/health-anthropic.mjs — HÄLSOKONTROLL: kan vi analysera en faktura över huvud taget?
//
// BAKGRUND (2026-08-06/07). Anthropic-kontots saldo gick i noll med auto-reload av. API-åtkomsten
// spärrades för en obetald skuld på EN CENT. Under de dygnen hade varje faktureanalys dött — och
// vi hade fått veta det genom att en kund laddade upp en PDF och fick ett fel.
//
// Det är samma mönster som resten av veckan: produkten var trasig och tystnaden såg ut som att
// allt var bra. Vakten kände till sitt eget svep, men inte att motorn som gör analysen var död.
//
// PRINCIP: om vi inte kan analysera ska VI veta det innan KUNDEN gör det.
//
// Kontrollen är avsiktligt den minsta möjliga: ett haiku-anrop med max_tokens 1. Kostnaden är
// försumbar — en hälsokontroll får aldrig bli en kostnadspost i sig.
//
// KALIBRERING (läxan från verify-sources som stängdes av för att den skrek på fel saker):
// ett RÖTT måste betyda något åtgärdbart. Därför skiljs felen åt:
//   · saldo/auth/spärr  → HÅRT FEL (exit 1). Det här löses av en människa, i dag.
//   · överbelastning    → VARNING (exit 0). Transient, löser sig själv, ska inte väcka någon.
// Ett larm som skriker på fel saker blir avstängt, och en avstängd vakt är värre än ingen vakt.

import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-haiku-4-5';
const FORSOK = Number(process.env.HEALTH_ANTHROPIC_RETRIES) || 3;

// Klassificera ett fel: är det VÅRT (kräver människa) eller LEVERANTÖRENS (transient)?
export function klassificera(err) {
  const status = err?.status ?? err?.statusCode ?? null;
  const text = `${err?.message ?? ''} ${JSON.stringify(err?.error ?? '')}`.toLowerCase();

  if (/credit balance|insufficient|unpaid|billing|add funds|purchase/.test(text)) {
    return { typ: 'saldo', hart: true, skal: 'Saldot är slut eller obetalt — API-åtkomsten är spärrad.' };
  }
  if (status === 401 || status === 403 || /authentication|api key|permission/.test(text)) {
    return { typ: 'auth', hart: true, skal: 'Nyckeln avvisas — felaktig, återkallad eller saknar behörighet.' };
  }
  if (status === 429 || /rate limit/.test(text)) {
    return { typ: 'takt', hart: false, skal: 'Taktgräns nådd — transient.' };
  }
  if (status === 529 || status === 503 || status === 500 || /overloaded|unavailable/.test(text)) {
    return { typ: 'överbelastning', hart: false, skal: 'Anthropic är överbelastat — transient.' };
  }
  return { typ: 'okänt', hart: true, skal: `Oväntat fel (status ${status ?? '—'}) — behandlas som hårt tills det är förstått.` };
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('[hälsa] ANTHROPIC_API_KEY saknas — kan inte kontrollera. Detta ÄR ett fel: utan nyckel kan ingen faktura analyseras.');
    process.exit(1);
  }

  const client = new Anthropic();
  let sista = null;

  for (let i = 1; i <= FORSOK; i++) {
    try {
      const t0 = Date.now();
      await client.messages.create({
        model: MODEL,
        max_tokens: 1,                       // minsta möjliga — kontrollen får inte kosta något
        messages: [{ role: 'user', content: 'ping' }],
      });
      console.log(`[hälsa] ✓ Anthropic svarar (${MODEL}, ${Date.now() - t0} ms) — analysmotorn lever.`);
      process.exit(0);
    } catch (err) {
      sista = klassificera(err);
      console.error(`[hälsa] försök ${i}/${FORSOK}: ${sista.typ} — ${sista.skal}`);
      // Hårda fel löser sig aldrig av att vi försöker igen. Sluta direkt.
      if (sista.hart) break;
      if (i < FORSOK) await new Promise((r) => setTimeout(r, 2000 * i));
    }
  }

  if (sista?.hart) {
    console.error('');
    console.error('╔══════════════════════════════════════════════════════════════════════╗');
    console.error('║  ANALYSMOTORN ÄR DÖD — ingen faktura kan analyseras just nu.        ║');
    console.error('╚══════════════════════════════════════════════════════════════════════╝');
    console.error(`Orsak: ${sista.typ} · ${sista.skal}`);
    console.error('Åtgärd: platform.claude.com → Organization settings → Billing.');
    process.exit(1);
  }

  // Transient efter alla försök: säg det, men väck ingen. Nästa natt visar om det består.
  console.warn(`[hälsa] ⚠ transient problem kvarstod efter ${FORSOK} försök (${sista?.typ}) — inget hårt fel, kontrolleras igen nästa svep.`);
  process.exit(0);
}

// Kör bara som skript (så testerna kan importera klassificera() utan att ringa Anthropic).
if (process.argv[1] && process.argv[1].endsWith('health-anthropic.mjs')) await main();
