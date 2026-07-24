// src/pages/Landing/index.js — v5 "dossiern på skrivbordet" (grundarbeslut 2026-07-12).
//
// Dramaturgin i sex sektioner (känn → tro → förstå → köp → lugna → agera):
//   Hero (ljust löfte, EN hjälte-CTA = dörren) → Dossiern (01 Avslöjandet · 02 Arvo-kontoret)
//   → 03 Så fungerar det → 04 Priset → 05 Vanliga frågor → Sista ordet.
// Vunnen ordning (Gemini-rundan 2026-07-12): mejl före faktura, faktura efter bevis.
// Rörelse som telemetri (IntersectionObserver → inview; prefers-reduced-motion respekteras).
// Kalender-artefakten är ett MÄRKT EXEMPEL (fällornas verkliga klockutfall, aldrig besökarens data).
// Föregående sida: src/pages/LandingJuli26 (arkiv) + git-tagg landing-juli-26.
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { RevealPrompt, RevealTeaser } from '../../components/RevealCard';
import { continuationPhrases, continuationClause } from '../../lib/roomContinuation';
import {
  Page, Hero, DossierShell, Dossier, SectionKey, DoorBlock, RoomBlock, Artefakt,
  Light, Steps, PriceSentence, PriceCards, Faq, LastWord,
} from './styles';

// ── Rörelsekroken: lägger 'inview' när elementet observeras (en gång, sedan stilla) ──
function useReveal(threshold = 0.18) {
  const ref = useRef(null);
  const [inview, setInview] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') { setInview(true); return undefined; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInview(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inview ? 'inview' : ''];
}

// Dagar-räknaren: tickar in mot måltalet när raden syns (rörelse som telemetri).
function useTickUp(target, active, duration = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return undefined;
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setVal(target); return undefined;
    }
    const t0 = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return active ? val : 0;
}

// EXEMPEL-artefakten: fällornas verkliga klockutfall ur testkorpusen (tests/avtal-fallor.mjs).
// Märks alltid "Exempel" i bildtexten — aldrig ett påstående om besökaren (regel 3/9).
// Kalendern i den tysta veckan visar ÅTERFÖRSÄKRAN, inte larm: raden är hämtad ur testkorpusens
// verkliga klockutfall (tests/avtal-fallor.mjs) och framing:en är produktens sanning — kunden
// behöver inte minnas fönstret, motdraget ligger köat.
const EXEMPEL_RADER = [
  { days: 266, akut: false, sup: 'Telia', txt: 'Ett redan missat fönster upptäckt — nästa bevakas 1 april 2027. Motdraget ligger färdigt.' },
];

const FAQ = [
  {
    q: 'Vad kostar det?',
    a: 'Arvo erbjuds i två lager. Arvo Intelligence kostar 1 995 kr/mån — löpande bevakning, smyghöjningslarm och avtalsbevakning, ingen bindningstid. Arvo Switch är ett tillägg: i kategorier där bytet är systematiserat förbereder Arvo hela bytet — uppsägning, nyteckning, tajming — och ni godkänner med BankID. Arvodet är 20 % av första årets kontrakterade besparing: skillnaden mellan ert gamla fakturapris och det nya avtalets pris, båda dokumenterade svart på vitt. Det faktureras först när det nya avtalet börjat gälla — och visar era fakturor senare att besparingen inte landat, justerar vi arvodet. Blir det ingen besparing kostar Switch ingenting.',
  },
  {
    q: 'Hur kan ni vara säkra på att rekommendationerna är opartiska?',
    a: <>Vi tjänar pengar bara när ni sparar — det är beviset på opartiskhet. Leverantörer kan inte köpa sig en högre placering, för vi tar aldrig en krona från dem: noll provision, noll partner-avgift, ingen dörr in. Vår enda intäkt är er besparing. Policyn är öppet publicerad under <Link to="/bias">vår rankningspolicy</Link>.</>,
  },
  {
    q: 'Varför ska jag lita på era besparingskalkyler?',
    a: 'Vi bygger på verifierade marknadsdata — offentliga listpriser, ramavtalsdata och faktiska operatörspriser. Och eftersom vårt arvode är 20 % av den kontrakterade besparingen — skillnaden mellan ert gamla fakturapris och det nya avtalets, båda dokumenterade — har vi inget att vinna på att överdriva: en projektion som inte håller kostar oss förtroendet och arvodet. Vi tjänar mer på att lova lite och leverera fullt ut.',
  },
  {
    q: 'Vad händer om den nya leverantören höjer priset efter bytet?',
    a: 'Vår fee baseras på kontrakterade priser vid avtalssignering. Förändras marknadsläget efter bytet hjälper vi er med en ny analys — utan extra kostnad.',
  },
  {
    q: 'Säger ni upp avtal autonomt utan mitt godkännande?',
    a: 'Aldrig. Varje byte kräver er BankID-signatur. Vi förbereder, ni godkänner. Det är en hård regel.',
  },
  {
    q: 'Vilka kategorier täcker ni idag?',
    a: 'Vi bevakar er kostnad i tre lägen. I el, mobil och företagsbredband förbereder Arvo hela bytet — uppsägning och nyteckning, färdigtajmat — ni godkänner med BankID, och den vinnande leverantören sköter inkopplingen enligt branschens regler. I programvara / SaaS, kortterminaler, fakturatjänster och löneadministration förbereder Arvo hela bytet — ni formaliserar med ett klick. I försäkring, leasing, larm och tjänsteavtal levererar vi fyndet, tajmingen och det exakta motbudet och beväpnar er att agera (försäkringsbyten genomförs när vår FI-licens är klar). Fler kategorier läggs till varje kvartal baserat på var vi ser störst besparingar i kunddatan.',
  },
  {
    q: 'Vad händer med min data?',
    a: 'Arvo ser endast det ni vidarebefordrar — leverantörsfakturor, inget annat. Datan lagras krypterad i Sverige (Bahnhof Stockholm). Kopplar ni in Fortnox eller Visma gäller samma princip: enbart läs-rättigheter mot leverantörsfakturor. Vi säljer aldrig identifierbar data — anonymiserade branschindex är vår enda dataprodukt utöver tjänsten.',
  },
];

// Svepets tidpunkt i människospråk: "i natt 21:52" / "i dag 06:10" / "22 juli 21:52".
// Ren formattering av en VERKLIG tidsstämpel — aldrig ett påhittat klockslag.
function svepTid(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const hm = d.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
  const dag = (x) => { const c = new Date(x); c.setHours(0, 0, 0, 0); return c; };
  const diff = Math.round((dag(new Date()) - dag(d)) / 86400000);
  if (diff <= 0) return `i dag ${hm}`;
  if (diff === 1) return `i natt ${hm}`;
  return `${d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })} ${hm}`;
}

function ArtefaktRad({ r, index, parentIn }) {
  const dagar = useTickUp(r.days, parentIn, 700 + index * 150);
  return (
    <div className={`a-row ${parentIn ? 'inview' : ''}`} style={{ transitionDelay: `${0.15 + index * 0.12}s` }}>
      <span className={`a-days${r.akut ? ' akut' : ''}`}>{r.days === 266 ? dagar : dagar} dagar</span>
      <div>
        <div className="a-sup">{r.sup}</div>
        <div className="a-txt">{r.txt}</div>
      </div>
    </div>
  );
}

export default function Landing() {
  // Dörren — samma verkliga maskineri som rummets avslöjande (EN sanning: /api/reveal).
  const [revealEmail, setRevealEmail] = useState('');
  const [revealLoading, setRevealLoading] = useState(false);
  const [reveal, setReveal] = useState(null);
  const [revealNote, setRevealNote] = useState('');
  const [revealElapsed, setRevealElapsed] = useState(0);   // UPPMÄTT tid runt det verkliga anropet — kvittots enda källa
  const [revealPending, setRevealPending] = useState(false); // våg 2 (djupregistren) arbetar fortfarande
  const doorRef = useRef(null);

  const runReveal = useCallback(async (e) => {
    e?.preventDefault?.();
    const email = revealEmail.trim();
    if (!email || revealLoading) return;
    setRevealLoading(true); setReveal(null); setRevealNote(''); setRevealElapsed(0);
    const t0 = performance.now();
    try {
      // Våg 1: snabbkällorna (bokslut/trend/mejlposter) på sekunder. Våg 2: fulla budgeten
      // (certifikatregistret 25 s) — nya rader läggs SIST och materialiseras sent (dramat).
      const res = await fetch('/api/reveal', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fast: true }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.ok && data.findings?.length) {
        setReveal({ domain: data.domain, findings: data.findings });
        setRevealPending(true);
        setRevealLoading(false);
        // Våg 2 — fulla budgeten, men KLIENTKAPAD (18 s). K-Fastigheter-läxan 2026-07-18: en
        // bot-vägg-skyddad domän kan hålla server-anropet länge; utan kap nås aldrig
        // setRevealPending(false) och noten hänger kvar och lovar rader som inte kommer. Kapet
        // garanterar att pending ALLTID resolveras till kvittot. En sen cert-rad som missas
        // cachas ändå av flimmervakten till nästa besök.
        try {
          const ctrl = new AbortController();
          const cap = setTimeout(() => ctrl.abort(), 18000);
          try {
            const res2 = await fetch('/api/reveal', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email }), signal: ctrl.signal,
            });
            const d2 = await res2.json().catch(() => ({}));
            if (d2.ok && d2.findings?.length) {
              const seen = new Set(data.findings.map((f) => f.title));
              const extra = d2.findings.filter((f) => !seen.has(f.title))
                .slice(0, Math.max(0, 5 - data.findings.length));   // taket (max 5) gäller totalen
              if (extra.length) setReveal({ domain: data.domain, findings: [...data.findings, ...extra] });
            }
          } finally { clearTimeout(cap); }
        } catch { /* våg 1 står redan — dramat uteblir, kortet består */ }
        setRevealElapsed((performance.now() - t0) / 1000);
        setRevealPending(false);
      }
      else setRevealNote(data.note || data.error || 'Domänen bar inga öppna spår just nu — dela en faktura i stället, så läser vi de verkliga talen.');
    } catch {
      setRevealNote('Kunde inte läsa av domänen just nu — försök igen om en stund.');
    } finally {
      setRevealLoading(false);
    }
  }, [revealEmail, revealLoading]);

  // Hero-CTA:n ÄR dörren: mjukt scroll + fokus i fältet (noll formulär i vila).
  // Tidslöftet mäts mot verkligheten (grundarmätning 2026-07-13: ~10 s) — aldrig ett önsketal (regel 9).
  const goToDoor = useCallback(() => {
    doorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => doorRef.current?.querySelector('input')?.focus({ preventScroll: true }), 550);
  }, []);

  // VAKTENS PULS (02): det VERKLIGA senaste svepet ur vakt_events — samma sanning som kundernas
  // rum. null → generisk mening (aldrig ett påhittat klockslag). Hämtas tyst, blockerar inget.
  const [pulse, setPulse] = useState(null);
  useEffect(() => {
    let alive = true;
    fetch('/api/vakt-pulse')
      .then((r) => r.json())
      .then((d) => { if (alive && d?.sweep?.sweptAt) setPulse(d.sweep); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  // DEN LEVANDE FORTSÄTTNINGEN (02): dörrens fynd → rummets tråd. Rent härlett, aldrig
  // fabricerat (src/lib/roomContinuation.js, testlåst i tests/room-continuation.mjs).
  const roomPhrases  = useMemo(() => continuationPhrases(reveal?.findings), [reveal]);
  const roomPersonal = Boolean(reveal?.domain && roomPhrases.length);

  const [heroRef, heroIn] = useReveal(0.1);
  const [dossierRef, dossierIn] = useReveal(0.12);
  const [doorInRef, doorIn] = useReveal(0.2);
  const [roomRef, roomIn] = useReveal(0.2);
  const [artRef, artIn] = useReveal(0.3);
  const [stepsRef, stepsIn] = useReveal(0.2);
  const [prisRef, prisIn] = useReveal(0.2);
  const [cardsRef, cardsIn] = useReveal(0.15);
  const [lastRef, lastIn] = useReveal(0.2);

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <Page>
      <Nav variant="public" />

      {/* ═══ HERO — löftet, en ljuspunkt ═══ */}
      <Hero ref={heroRef}>
        <div className={`eyebrow ${heroIn}`}>Arvo · finansiell intelligens för svenska bolag</div>
        <h1 className={heroIn}>Er finansdirektör.<br /><em>Innan ni frågar.</em></h1>
        <p className={`lede ${heroIn}`}>
          Ni delar era fakturor och avtal. Vi väger varje pris mot verifierat marknadspris,
          läser varje bindningstid — och säger till i tid, med motdraget förberett.
          När allt är rätt säger vi det också.
        </p>
        <div className={`actions ${heroIn}`}>
          <button type="button" className="cta" onClick={goToDoor}>
            Se ert bolag som marknaden ser det →
          </button>
          <div className="sub">
            tio sekunder · öppna källor &nbsp;·&nbsp; <Link to="/testa-faktura">eller testa med en faktura</Link>
          </div>
        </div>
        <div className={`proof ${heroIn}`}>
          Avtal som en jurist &nbsp;·&nbsp; Priser som en inköpschef &nbsp;·&nbsp; Vaken varje natt
        </div>
      </Hero>

      {/* ═══ DOSSIERN — det mörka föremålet på skrivbordet ═══ */}
      <DossierShell>
        <Dossier ref={dossierRef} className={dossierIn}>
          <div className="inner">

            {/* 01 · AVSLÖJANDET — dörren först (vunnen ordning: mejl före faktura) */}
            <SectionKey>
              <span className="k-num">01 · Avslöjandet</span>
              <span className="k-note">60 sekunder · öppna källor</span>
            </SectionKey>
            <DoorBlock ref={(el) => { doorRef.current = el; doorInRef.current = el; }} className={doorIn}>
              <h3>Se ert bolag <em>som marknaden ser det.</em></h3>
              <RevealPrompt
                email={revealEmail} setEmail={setRevealEmail}
                onSubmit={runReveal} loading={revealLoading}
                reveal={reveal} note={revealNote} elapsedS={revealElapsed} pending={revealPending}
              />
              {!reveal && !revealLoading && <RevealTeaser />}
              {reveal && (
                <p style={{ fontSize: 13.5, lineHeight: 1.6, textAlign: 'center', margin: '18px 0 0', color: 'rgba(157,184,175,1)' }}>
                  Det här såg vi utifrån.{' '}
                  <Link to="/testa-faktura" style={{ color: '#5DE8D2', fontWeight: 600 }}>
                    Dela en faktura, så räknar vi era exakta tal →
                  </Link>
                </p>
              )}
            </DoorBlock>

            {/* 02 · ARVO-KONTORET — DEN TYSTA VECKAN SOM HJÄLTE (grundarbeslut 2026-07-21).
                Bibelns tes gjord synlig: produkten är VAKTEN, inte fyndet. Kortet leder med
                förtjänat lugn (hjärtslag → veckodom), inte med brådska. Kalendern degraderas
                till ÅTERFÖRSÄKRAN ("köat, ni behöver inte minnas det").
                Den LEVANDE FORTSÄTTNINGEN bor ENDAST här (aldrig i dörren, 01): har besökaren
                öppnat underlaget fortsätter rummet tråden med deras EGNA nyss-avslöjade fakta —
                annars visas exempelvarianten. Domen/kalendern är alltid märkta som FORM. */}
            <RoomBlock ref={roomRef}>
              <SectionKey>
                <span className="k-num">02 · Arvo-kontoret</span>
                <span className="k-note">Konfidentiellt · ett rum per kund</span>
              </SectionKey>
              <h2 className={roomIn}>
                {roomPersonal
                  ? <>Det ni just såg blir rad ett.<br /><em>Sedan vakar vi vidare — varje natt.</em></>
                  : <>Det ni just läste finns redan.<br /><em>Och i natt var allt lugnt.</em></>}
              </h2>
              <Artefakt ref={artRef} className={artIn}>
                <div className="a-card">
                  {/* Takt 1 — vaktens hjärtslag: beviset att en maskin är vaken */}
                  <div className="a-sec a-pulse">
                    <span className="a-disc" aria-hidden="true"><span className="a-sweep" /></span>
                    <span>
                      <span className="a-plabel">
                        {roomPersonal ? `Ert rum · ${reveal.domain} · förhandsvisning` : 'Vakten · exempelrum · alltid på'}
                      </span>
                      <span className="a-pline">
                        {pulse ? (
                          <>Senaste svep <b>{svepTid(pulse.sweptAt)}</b>
                            {pulse.sources ? <> · <b>{pulse.sources} marknadskällor</b></> : null}
                            {' — '}<em>{pulse.changes > 0
                              ? `${pulse.changes} prisrörelser fångade`
                              : 'allt lugnt'}</em>.</>
                        ) : (
                          <>Vakten sveper <b>fyrtiotalet marknadskällor</b> varje natt — <em>också de nätter då inget händer.</em></>
                        )}
                      </span>
                    </span>
                  </div>

                  {/* Takt 2 — veckodomen: det förtjänta lugnet, författat */}
                  <div className="a-sec">
                    <span className="a-eyebrow">Veckodomen · så ser en lugn vecka ut</span>
                    <div className="a-dom">En vanlig vecka hos er. Inget kräver er uppmärksamhet — vi vägde era priser i natt, och allt håller.</div>
                  </div>

                  {/* Takt 3 — den levande fortsättningen (endast efter öppnat underlag) */}
                  {roomPersonal && (
                    <div className="a-sec a-cont">
                      Det ni just såg i dörren — {continuationClause(roomPhrases)} — var första ögonkastet.
                      I ert rum blir det <b>rad ett</b>, och vakten läser vidare <em>varje natt.</em>
                    </div>
                  )}

                  {/* Takt 4 — kalendern som återförsäkran, aldrig som larm */}
                  <div className="a-sec">
                    <div className="a-head">
                      <span className="a-eyebrow">Maktkalendern · motdraget ligger klart</span>
                      <span className="a-count">5 avtal lästa</span>
                    </div>
                    {EXEMPEL_RADER.map((r, i) => (
                      <ArtefaktRad key={r.sup} r={r} index={i} parentIn={!!artIn} />
                    ))}
                    <div className="a-sum">Fyra avtal till står under bevakning — inget av dem behöver er de närmaste månaderna.</div>
                  </div>

                  <div className="a-sec a-foot">
                    Den vecka något faktiskt händer hör ni av oss — med draget redan gjort.{' '}
                    <b>Tills dess sköter vi det åt er.</b>
                  </div>
                </div>
                <div className="a-caption">
                  {roomPersonal
                    ? <>Domen och kalendern visar <b>formen</b> — de fylls när ni delat er första faktura · raderna om ert bolag ovan är verifierade</>
                    : <>Exempel — formen på ett Arvo-rum · maskinellt kontrollerad · varje datum ur kundens eget avtal</>}
                </div>
              </Artefakt>
            </RoomBlock>
          </div>
        </Dossier>
      </DossierShell>

      {/* ═══ 03 · SÅ FUNGERAR DET ═══ */}
      <Light>
        <SectionKey $light>
          <span className="k-num">03 · Så fungerar det</span>
          <span className="k-note">två minuter att komma igång</span>
        </SectionKey>
        <Steps ref={stepsRef}>
          {[
            ['I', 'Dela', 'Vidarebefordra en faktura eller släpp ett avtal i rummet. Det är allt ni gör.'],
            ['II', 'Vakten läser', 'Varje pris vägs mot verifierat marknadspris. Varje bindningstid läses ord för ord, med citat som bevis.'],
            ['III', 'Ni får domen', 'Rätt pris? Vi säger det. Fel pris eller ett fönster som stänger? Ni får larmet i tid — med motdraget förberett.'],
          ].map(([n, t, d]) => (
            <div className={`step ${stepsIn}`} key={n}>
              <div className="s-num">{n}</div>
              <div className="s-t">{t}</div>
              <div className="s-d">{d}</div>
            </div>
          ))}
        </Steps>
      </Light>

      {/* ═══ 04 · PRISET ═══ */}
      <Light>
        <SectionKey $light>
          <span className="k-num">04 · Priset</span>
          <span className="k-note">ingen bindningstid</span>
        </SectionKey>
        <PriceSentence ref={prisRef} className={prisIn}>
          <div className="p-serif">
            1 995 kr i månaden. Tjugo procent av besparingen —<br /><em>dokumenterad i avtal, aldrig i löften.</em>
          </div>
          <p className="p-sub">
            Vi tar aldrig ersättning från någon leverantör. Vi sitter på er sida av bordet — det är hela affärsidén.
          </p>
        </PriceSentence>
        <PriceCards ref={cardsRef}>
          <div className={`pc dark ${cardsIn}`}>
            <div className="pc-k">Arvo Intelligence</div>
            <div className="pc-pris">1 995 kr <small>/ mån</small></div>
            <div className="pc-lede">Er proaktiva finansdirektör — bevakningen som aldrig sover.</div>
            {[
              'Smyghöjningslarm — avvikelse fångas direkt',
              'Avtalsklockan — sista uppsägningsdag bevakad',
              'Priser vägda mot verifierat marknadspris',
              'Månadsbrev med det som faktiskt hänt',
            ].map((t) => <div className="pc-row" key={t}><span className="tick">✓</span> {t}</div>)}
            <Link className="pc-cta" to="/intelligence">Aktivera Arvo Intelligence →</Link>
          </div>
          <div className={`pc lightc ${cardsIn}`}>
            <div className="pc-k">Arvo Switch</div>
            <div className="pc-pris">20 % <small>av kontrakterad besparing</small></div>
            <div className="pc-lede">Bytet förberett i sin helhet — tajmat mot avtalsklockan, signerat av er med BankID.</div>
            {[
              'Arvodet faktureras först när det nya avtalet börjat gälla',
              'Ni godkänner varje byte med BankID',
              'Från år två tillfaller hela besparingen er',
              'Hittar vi inget — kostar det inget',
            ].map((t) => <div className="pc-row" key={t}><span className="tick">✓</span> {t}</div>)}
            <Link className="pc-cta" to="/testa-faktura">Testa med en faktura →</Link>
          </div>
        </PriceCards>
      </Light>

      {/* ═══ 05 · VANLIGA FRÅGOR ═══ */}
      <Light>
        <SectionKey $light>
          <span className="k-num">05 · Vanliga frågor</span>
          <span className="k-note" />
        </SectionKey>
        <Faq>
          {FAQ.map((f, i) => (
            <div className="f-item" key={f.q}>
              <button
                type="button" className="f-q"
                aria-expanded={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {f.q}
                <span className="f-plus">+</span>
              </button>
              <div className={`f-a${openFaq === i ? ' open' : ''}`}>
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </Faq>
      </Light>

      {/* ═══ SISTA ORDET ═══ */}
      <LastWord ref={lastRef}>
        <div className={`lw-serif ${lastIn}`}>
          Börja med en enda faktura.<br /><em>Resten sköter vakten.</em>
        </div>
        <br />
        <Link className={`lw-cta ${lastIn}`} to="/testa-faktura">Testa med en faktura →</Link>
        <div className="lw-sign">Finansiell intelligens som aldrig sover.</div>
      </LastWord>

      <Footer />
    </Page>
  );
}
