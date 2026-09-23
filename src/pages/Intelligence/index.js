import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import {
  Page,
  HeroSection, HeroInner,
  NotifCard, NotifHeader, NotifDot, NotifAppName, NotifTime,
  NotifTitle, NotifBody, NotifCta,
  HeroTagline, HeroSub, HeroCtaWrap, HeroCta, HeroPrice,
  SectionWrap, SectionHeadWrap, SectionEyebrow, SectionHeadline,
  PillarsGrid, PillarCard, PillarTitle, PillarBody, PillarQuote,
  CardContext, CardDivider,
  RulesSection, RulesInner, RulesEyebrow,
  RuleItem, RuleNumber, RuleText, RuleDivider,
  ActivationSection, ActivationInner, ActivationHeadline,
  ActivationSub, ActivationNote,
  ActivationForm, ActivationInput, ActivationSubmitBtn, ActivationError,
  ActivationSuccess, ActivationSuccessCheck, ActivationSuccessTitle,
  ActivationSuccessSub, ActivationSuccessEmail,
} from './styles';

// ── Data ──────────────────────────────────────────────────────────────────────

// Kundmeningsregistret 2026-09-23: varje pelare lovar bara en mekanism som finns — prisvakten
// (scripts/price-monitor.mjs), avtalsklockan (api/cron/send-reminders.mjs), radläsningen mot
// listpris (recommend LFL) och månadsbriefen (api/cron/generate-briefings.mjs). Här stod
// «Arvo ser vad som händer hos jämförbara bolag i nätverket» (nätverket är i dag testmaterial) och
// «kontrollerar automatiskt varje faktura mot känt avtalspris» (ingen sådan kontroll finns).
// Citaten är exempel och märks så (regel 9).
const PILLARS = [
  {
    context: 'Telia höjer 11% i januari. Ni märker det i september — åtta månader senare.',
    title: 'Prisvakt före fakturan',
    body: 'Arvo läser leverantörernas publika priser varje natt och säger till när en ändring påverkar ert avtal — innan den syns på er faktura.',
    quote: '"Telia höjde Företag Bas med 20 kr/mån i natt. Ni berörs med 4 800 kr/år."',
  },
  {
    context: 'Tele2-avtalet förnyas automatiskt. Ni märkte det inte. Nu är ni låsta ett år till.',
    title: 'Avtalsklocka med sista uppsägningsdag',
    body: 'Arvo räknar ut sista uppsägningsdag ur avtalets slutdatum och uppsägningstid — och mejlar er 30 och 7 dagar innan.',
    quote: '"Sista uppsägningsdag 15 september. Vi påminner er 16 augusti och 8 september."',
  },
  {
    context: 'Ni betalar 146 kr per licens. Listpriset är 133,82 kr. Ingen har jämfört.',
    title: 'Faktura mot listpris',
    body: 'Arvo läser varje faktura rad för rad och ställer ert pris per licens mot leverantörens verifierade publika listpris — där det finns ett.',
    quote: '"Ni betalar 146 kr per licens. Microsofts listpris är 133,82 kr."',
  },
  {
    context: 'Kostnaderna rullar på. Ingen sammanfattar. Styrelsen frågar — ingen har svaret.',
    title: 'Månatlig CFO-brief',
    body: 'En rapport varje månad med vad Arvo hittat i era avtal och vad som är på väg.',
    quote: '"Tre avtal bevakas. Ett har sista uppsägningsdag om 30 dagar."',
  },
];

// ── Hook ──────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Arvo mark ─────────────────────────────────────────────────────────────────

const ArvoMark = () => (
  <svg width="14" height="14" viewBox="0 0 100 100" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <defs>
      <linearGradient id="intelig" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4ECDC4" />
        <stop offset="100%" stopColor="#1DB09A" />
      </linearGradient>
    </defs>
    <path d="M50 5 L12 85 L35 85 L50 55 L65 85 L88 85 Z" fill="url(#intelig)" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────

const fmt = n => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);

export default function Intelligence() {
  const [pillarsRef, pillarsInView] = useInView(0.08);
  const [rulesRef, rulesInView]     = useInView(0.12);

  // Activation form
  const [params]       = useSearchParams();
  // Här lästes «?savings=» ur URL:en och visades som «Vi identifierade redan X kr/år» — och skickades
  // vidare till aktiveringen som kundens besparing. Ingen kod bygger en sådan länk; talet kunde bara
  // komma ur en handskriven URL. Ett tal vi inte räknat visas aldrig (kundmeningsregistret, regel 3).
  const savings  = null;
  const supplier       = params.get('supplier') ?? null;
  const [email, setEmail]       = useState('');
  const [company, setCompany]   = useState('');
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | sent | error
  const [formErr, setFormErr]   = useState('');

  const handleActivate = async (e) => {
    e.preventDefault();
    const trimEmail = email.trim();
    if (!trimEmail || formStatus === 'submitting') return;
    setFormStatus('submitting');
    setFormErr('');
    try {
      const res = await fetch('/api/activate-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimEmail,
          supplier:  supplier  ?? (company.trim() || undefined),
          netSaving: savings   ?? undefined,
          source:    'intelligence-page',
        }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? 'err');
      setFormStatus('sent');
    } catch {
      setFormErr('Något gick fel — försök igen.');
      setFormStatus('error');
    }
  };


  return (
    <Page>
      <Nav variant="public" />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <HeroSection>
        <HeroInner>

          <NotifCard>
            <NotifHeader>
              <ArvoMark />
              <NotifDot />
              <NotifAppName>Arvo Intelligence</NotifAppName>
              <NotifTime>Just nu</NotifTime>
            </NotifHeader>
            {/* Exempel (regel 9). Här stod «Telia höjde priset för 8 av 14 bolag i er bransch» — en
                nätverksmening vi inte kan belägga förrän nätverket består av riktiga kunder. */}
            <NotifTitle>Exempel · Arvo har upptäckt något</NotifTitle>
            <NotifBody>
              Telia höjde <strong>Företag Bas</strong> med 20 kr/mån i natt. Er nästa faktura
              träffar om{' '}<strong>12 dagar.</strong>
            </NotifBody>
            <NotifCta as={Link} to="/testa-faktura">
              Se vad det innebär för er →
            </NotifCta>
          </NotifCard>

          <HeroTagline>
            Arvo märkte det.<br />
            <em>Ni visste inte om det ännu.</em>
          </HeroTagline>

          <HeroSub>
            Ni ska inte behöva hålla koll. Det är Arvos jobb.
          </HeroSub>

          <HeroCtaWrap>
            <HeroCta as="a" href="#aktivera">
              Aktivera Arvo Intelligence
            </HeroCta>
            <HeroPrice>1 995 kr/mån · Ingen bindningstid</HeroPrice>
          </HeroCtaWrap>

        </HeroInner>
      </HeroSection>

      {/* ── Pillars ──────────────────────────────────────────────────────── */}
      <SectionWrap ref={pillarsRef}>
        <SectionHeadWrap>
          <SectionEyebrow>Arvo Intelligence</SectionEyebrow>
          <SectionHeadline style={{ marginBottom: 0 }}>Det Arvo ser — som annars försvinner</SectionHeadline>
        </SectionHeadWrap>

        <PillarsGrid>
          {PILLARS.map((p, i) => (
            <PillarCard key={i} $i={i} $visible={pillarsInView}>
              <CardContext>{p.context}</CardContext>
              <CardDivider />
              <PillarTitle>{p.title}</PillarTitle>
              <PillarBody>{p.body}</PillarBody>
              <PillarQuote>Exempel · {p.quote}</PillarQuote>
            </PillarCard>
          ))}
        </PillarsGrid>
      </SectionWrap>

      {/* ── Rules ────────────────────────────────────────────────────────── */}
      <RulesSection ref={rulesRef}>
        <RulesInner>
          <RulesEyebrow>Den enda finansiella partnern som...</RulesEyebrow>

          <RuleItem $i={0} $visible={rulesInView}>
            <RuleNumber>Regel 1</RuleNumber>
            <RuleText>Arvo vaktar er för 1 995 kr/mån.</RuleText>
          </RuleItem>

          <RuleDivider />

          <RuleItem $i={1} $visible={rulesInView}>
            <RuleNumber>Regel 2</RuleNumber>
            <RuleText>Ni behåller 80% av allt vi sparar er.</RuleText>
          </RuleItem>
        </RulesInner>
      </RulesSection>

      {/* ── Activation ───────────────────────────────────────────────────── */}
      <ActivationSection id="aktivera">
        <ActivationInner>
          {formStatus !== 'sent' && (
            <ActivationHeadline>
              Arvo börjar bevaka<br />imorgon bitti.
            </ActivationHeadline>
          )}

          {formStatus === 'sent' ? (
            <ActivationSuccess>
              <ActivationSuccessCheck>✓</ActivationSuccessCheck>
              <ActivationSuccessTitle>Aktiverat.</ActivationSuccessTitle>
              <ActivationSuccessSub>
                Arvo börjar bevaka er inom 24&nbsp;timmar.<br />
                Vi hör av oss när det finns något att agera på.
              </ActivationSuccessSub>
              {email && <ActivationSuccessEmail>{email}</ActivationSuccessEmail>}
            </ActivationSuccess>
          ) : (
            <>
              {(
                <ActivationSub>
                  E-post och bolagsnamn — klart på 30 sekunder.
                </ActivationSub>
              )}

              <ActivationForm onSubmit={handleActivate}>
                <ActivationInput
                  type="email"
                  placeholder="er@foretag.se"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
                <ActivationInput
                  type="text"
                  placeholder="Bolagsnamn"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  autoComplete="organization"
                />
                <ActivationSubmitBtn type="submit" disabled={formStatus === 'submitting'}>
                  {formStatus === 'submitting' ? '…' : 'Aktivera bevakningen →'}
                </ActivationSubmitBtn>
                {formErr && <ActivationError>{formErr}</ActivationError>}
              </ActivationForm>
            </>
          )}

          <ActivationNote>
            1&nbsp;995&nbsp;kr/mån · Ingen bindningstid · Arvo startar bevakningen inom 24h
          </ActivationNote>
        </ActivationInner>
      </ActivationSection>

      <Footer />
    </Page>
  );
}
