// lib/verifiers/telia-vaxel.mjs — vaktar Telia Smart Connect molnväxel-instegspriser (exkl moms)
// mot branchindex.molnvaxel.teliaVerified. Telia bot-väggar (Akamai) → stealth (needsStealth + withStealthPage,
// samma som Adobe). Rött vid drift.
//
// OBS moms: Telias /foretag-priser är EXKL moms (bekräftat 2026-06-18, telia.se/foretag/priser). Offert-nivån
// (T3) har inget fast listpris att vakta.
//
// ── KAMPANJEN TOG ÖVER SIDAN (avläst 2026-10-16) ────────────────────────────────────────────
// Vakten letade efter «från 89 kr» för T1 på växelsidan och föll varje vecka med «(saknas)». Sidan
// visar nu «Pris just nu: 49 kr/mån», ett kampanjpris, och 89 står inte längre där. Listpriset
// finns i Telias egen prislista, som sidan länkar («Prislista Telia Smart Connect», PDF, «Alla
// priser är exklusive moms och gäller från september 2025»): «Användare med mobilt nummer … 89 SEK».
// Samma prislista bär prisbokens tre tilläggspriser (softphone 29, fast nummer 39, funktionsnummer
// 99), som ingen vakt läste förut. Kampanjpriset blir aldrig ett ankare (kampanjfällan). KF-05..07.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withStealthPage, numCheck, presenceCheck, kontextUtdrag, lasEntydigt, TAL_SV } from './core.mjs';
import { extraheraTextlager } from '../pdf-textlager.js';

const URL = 'https://www.telia.se/foretag/vaxlar/vaxel-sma-foretag';
const PRISLISTA_LANK = /href=["']([^"']*Prislista[^"']*Smart[^"']*Connect[^"']*\.pdf)["']/i;

// Prislistans tabellrad är «<tjänst> <fotnot> <startavgift> <månadsavgift> SEK», och textlagret
// sätter blanksteg mitt i tal («8 9»). Därför jämförs utan blanksteg. Raden godtas bara när
// startavgiften är ett streck: står där ett tal går det inte att skilja från månadsavgiften i
// den sammanslagna texten, och då svarar parsern null (OLÄSBAR) i stället för att gissa.
const RADER = {
  T1: /Användaremedmobiltnummer\d{0,2}-(\d+)SEK/,
  extraNummer: /Fastnummertillmobilanvändare\d{0,2}-(\d+)SEK/,
  softphone: /Softphone\d{0,2}-(\d+)SEK/,
  funktionsnummer: /Funktionsnummer\d{0,2}-(\d+)SEK/,
};

export function teliaPrislista(text) {
  const kompakt = String(text ?? '').replace(/\s+/g, '');
  const ut = { exklMoms: /exklusivemoms/i.test(kompakt) };
  for (const [nyckel, rx] of Object.entries(RADER)) {
    const traffar = [...kompakt.matchAll(new RegExp(rx.source, 'g'))].map((m) => Number(m[1]));
    ut[nyckel] = new Set(traffar).size === 1 ? traffar[0] : null;
  }
  return ut;
}

// T2 läses på växelsidan: «Pris från: 118 kr/mån» är det enda från-priset där (avläst 18 okt; T1
// visar kampanjens «Pris just nu: 49 kr/mån», som aldrig läses). Visar sidan flera olika från-priser,
// till exempel när T1:s kampanj tar slut, går det inte att säga vilket som är uppsättning 2: då är
// talet okänt (OLÄSBAR), aldrig ett val.
const FRANPRIS = new RegExp(String.raw`Pris från:?\s*(${TAL_SV})\s*kr\s*\/\s*mån`, 'gi');
export function teliaT2Las(sidtext) {
  return lasEntydigt(sidtext, FRANPRIS)?.[0] ?? null;
}

export function teliaChecks(tv, { sidtext, prislistetext }) {
  const p = teliaPrislista(prislistetext);
  // Ett tal ur en prislista som inte säger «exklusive moms» jämförs aldrig mot en bok som är exkl.
  const v = (x) => (p.exklMoms ? x : null);
  const t2 = tv.tiers.T2.fromMonthly;
  return [
    presenceCheck('Prislistan anger priser exklusive moms', p.exklMoms),
    numCheck('T1 Användare med mobilt nummer (prislistan, kr/mån exkl moms)', tv.tiers.T1.fromMonthly, v(p.T1), { unit: ' kr' }),
    numCheck('T2 från-pris på växelsidan (kr/mån exkl moms)', t2, teliaT2Las(sidtext), { unit: ' kr' }),
    numCheck('Tillägg softphone (prislistan)', tv.addons.softphone, v(p.softphone), { unit: ' kr' }),
    numCheck('Tillägg fast nummer till mobilanvändare (prislistan)', tv.addons.extraNummer, v(p.extraNummer), { unit: ' kr' }),
    numCheck('Tillägg funktionsnummer (prislistan)', tv.addons.funktionsnummer, v(p.funktionsnummer), { unit: ' kr' }),
  ];
}

/** Vad sidan visade runt från-priserna och nivånamnen — för loggen. */
export function teliaSidKontext(tv, text) {
  const utdrag = (rx, o) => kontextUtdrag(text, rx, o).map((s) => `«${s}»`).join(' · ') || '(ingen träff)';
  return [
    `från-priser: ${utdrag(/fr[åa]n:?\s*\d+\s*kr/i, { fore: 90, efter: 20, max: 6 })}`,
    `pris just nu: ${utdrag(/just nu:?\s*\d+\s*kr/i, { fore: 90, efter: 20, max: 4 })}`,
    `uppsättning: ${utdrag(/upps[äa]ttning/i, { fore: 20, efter: 90, max: 4 })}`,
  ];
}

export default {
  id: 'telia-vaxel',
  category: 'molnvaxel',
  label: 'Telia Smart Connect molnväxel-instegspriser (exkl moms)',
  // ── VAD VAKTEN FAKTISKT LÄSER (vaktkontraktet, tvingande sedan 2026-08-12) ────────────────
  // Prisauditens täckning mättes förr på LEVERANTÖRSNIVÅ: fanns en verifierare för leverantören
  // ansågs varje prisbokspost för den leverantören täckt. Så stod E3 och E5 — bokens största tal —
  // obevakade bakom en grön audit. Deklarationen nedan listar de prisboksnycklar den här modulen
  // LÄSER, och auditen prövar mot listan i stället för mot ett leverantörsnamn.
  // Tom lista = ett SVAR, inte ett hål: den här vakten läser kategorins toppnivåpriser, inte
  // några licensnivåer. Skillnaden mellan "läser inga" och "ingen frågade" måste synas i koden.
  bevakadeTiers: [],
  // Vilken KATEGORIPOST i prisboken vakten daterar (top-level lastVerified). Infört 2026-08-22:
  // kategoriposternas datum ruttnade i tysthet precis som nivåernas — molnvaxel låg 66 dagar
  // gammal medan den här vakten körde veckovis och bekräftade priset varje gång. `null` är ett
  // giltigt SVAR (vakten daterar ingen kategoripost), men svaret måste finnas: skillnaden mellan
  // «vaktar ingen» och «ingen frågade» ska stå i koden.
  bevakadKategori: 'molnvaxel',
  // VAKTKONTRAKTET (lib/vaktkontrakt.js): den fråga som ska ställas innan något kallas vakt.
  fangar: 'Telia ändrar Smart Connects användarpris eller något av de tre tilläggspriserna i sin prislista (exkl moms), slutar ange priserna exklusive moms, eller ändrar T2:s från-pris på växelsidan (vakten läser det nya talet, DRIFT).',
  blind: 'Kampanjpriset på växelsidan och volymtrappor ovanför insteget — vakten läser listpriset ur prislistan och ser inte vad en kund faktiskt fått i en kampanj. Byter Telia namn på prislistan hittar vakten ingen länk och blir röd (OLÄSBAR), aldrig grön. Visar växelsidan flera olika från-priser kan vakten inte avgöra vilket som är T2 och blir OLÄSBAR.',
  needsBrowser: true,
  needsStealth: true,
  schedule: '0 6 * * 1',
  async run() {
    const tv = BRANCHINDEX.molnvaxel?.teliaVerified;
    if (!tv?.tiers?.T1?.fromMonthly || !tv?.addons) return { checks: [], notes: ['molnvaxel.teliaVerified saknas i prisboken'], fatal: true };

    const { sidtext, prislisteUrl, pdf, pdfFel } = await withStealthPage(URL, async (page) => {
      try { await page.waitForFunction(() => /\d[\d\s.,]*\s*kr/i.test(document.body?.innerText || ''), { timeout: 14000 }); } catch {}
      const sidtext = (await page.evaluate(() => document.body?.innerText || '')).replace(/\s+/g, ' ');
      const lank = (await page.content()).match(PRISLISTA_LANK)?.[1];
      if (!lank) return { sidtext, prislisteUrl: null, pdf: null, pdfFel: 'ingen länk till prislistan på sidan' };
      const prislisteUrl = new globalThis.URL(lank, page.url()).toString();
      try {
        const res = await page.context().request.get(prislisteUrl, { timeout: 30000 });
        if (!res.ok()) return { sidtext, prislisteUrl, pdf: null, pdfFel: `HTTP ${res.status()}` };
        return { sidtext, prislisteUrl, pdf: await res.body(), pdfFel: null };
      } catch (e) { return { sidtext, prislisteUrl, pdf: null, pdfFel: e.message.split('\n')[0].slice(0, 80) }; }
    });
    if (!sidtext || sidtext.length < 500) return { checks: [], notes: [`Telia-sidan oåtkomlig/tom (${sidtext?.length ?? 0}b)`], fatal: true };

    let prislistetext = '';
    let lasfel = pdfFel;
    if (pdf) {
      try { ({ text: prislistetext } = await extraheraTextlager(pdf)); }
      catch (e) { lasfel = `textlagret gick inte att läsa (${e.message.slice(0, 60)})`; }
    }
    const p = teliaPrislista(prislistetext);
    return {
      checks: teliaChecks(tv, { sidtext, prislistetext }),
      notes: [
        `prislista: ${prislisteUrl ?? '(ingen)'}${lasfel ? ` · ${lasfel}` : ''}`,
        `läst: T1 ${p.T1 ?? '–'} · softphone ${p.softphone ?? '–'} · fast nummer ${p.extraNummer ?? '–'} · funktionsnummer ${p.funktionsnummer ?? '–'} kr · exkl moms ${p.exklMoms ? 'ja' : 'NEJ/okänt'}`,
        'Telia /foretag-priser är exkl moms (bekräftat). T3/kontaktcenter = offert, inget fast golv.',
        ...teliaSidKontext(tv, sidtext),
      ],
    };
  },
};
