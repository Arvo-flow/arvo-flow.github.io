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
  ActivationSavingsBanner,
  ActivationForm, ActivationInput, ActivationSubmitBtn, ActivationError,
  ActivationSuccess, ActivationSuccessCheck, ActivationSuccessTitle,
  ActivationSuccessSub, ActivationSuccessEmail,
} from './styles';

// ── Data ──────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    context: 'Telia höjer 11% i januari. Ni märker det i september — åtta månader senare.',
    title: 'Marknadsintelligens före fakturan',
    body: 'Arvo ser vad som händer hos jämförbara bolag i nätverket — och varnar er innan höjningen syns på er faktura.',
    quote: '"6 av 14 bolag i er bransch fick Telias prishöjning förra månaden."',
  },
  {
    context: 'Tele2-avtalet förnyas automatiskt. Ni märkte det inte. Nu är ni låsta ett år till.',
    title: 'Kontraktskalender med handlingsplan',
    body: 'Inte bara påminnelser — utan exakt vad som ska göras, när och varför. Arvo räknar baklänges från varje förnyelsedatum.',
    quote: '"87 dagar kvar. Aktivera byte senast 15 september."',
  },
  {
    context: 'Telia fakturerar 349 kr/SIM. Ert avtal säger 299 kr. Ni betalar differensen utan att veta om det.',
    title: 'Faktura mot avtal',
    body: 'Leverantörer fakturerar fel — ofta. Arvo kontrollerar automatiskt varje faktura mot känt avtalspris och flaggar avvikelser direkt.',
    quote: '"Telia fakturerar 349 kr/SIM. Ert avtal säger 299 kr."',
  },
  {
    context: 'Kostnaderna rullar på. Ingen sammanfattar. Styrelsen frågar — ingen har svaret.',
    title: 'Månatlig CFO-brief',
    body: 'En professionell rapport — klar för styrelserummet — med vad Arvo hittat, vad som sparats och vad som är på väg.',
    quote: '"Tre avtal bevakas. Ett flaggat för åtgärd nästa vecka."',
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
  const savings        = params.get('savings') ? Number(params.get('savings')) : null;
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
            <NotifTitle>Arvo har detekterat något</NotifTitle>
            <NotifBody>
              Telia höjde priset för <strong>8 av 14 bolag</strong> i er
              bransch förra månaden. Er nästa faktura träffar om{' '}
              <strong>12 dagar.</strong>
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
              <PillarQuote>{p.quote}</PillarQuote>
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
              {savings != null ? (
                <ActivationSavingsBanner>
                  {supplier
                    ? <>Vi identifierade redan <strong>{fmt(savings)}&nbsp;kr/år</strong> hos {supplier}. Den besparingen väntar.</>
                    : <>Vi identifierade redan <strong>{fmt(savings)}&nbsp;kr/år</strong> i besparing åt er. Den väntar på att aktiveras.</>
                  }
                </ActivationSavingsBanner>
              ) : (
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
