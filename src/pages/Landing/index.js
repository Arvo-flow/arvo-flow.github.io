import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { TOTALS } from '../../data/mockData';
import {
  Page, Section, Hero, HeroBackdrop, HeroInner,
  Eyebrow, Headline, Lede, HeroActions, HeroProof, HeroVisual,
  PreviewCard, PreviewHead, PreviewFloat,
  WaveDivider,
  TrustStrip, TrustPillar,
  AlgoTrust,
  SectionHead, HowGrid, HowCard,
  ScoreSubHead, ScoreGrid, ScoreLevelCard, ScoreGauge, ScoreGaugeCenter,

  PricingTiers, PricingTier,
  IntelligenceSection, IntelligenceInner, IntelligencePillars, IntelligencePillar, IntelligencePreview,
  FoundingCard, FoundingLeft, FoundingForm, FoundingSuccess,
  FaqWrap, FaqItem,
  FinalCta,
} from './styles';

const HOW_STEPS = [
  {
    step: 'Steg 01',
    title: 'Koppla Fortnox / Visma på 60 sek',
    body: 'Säker OAuth-anslutning till ditt befintliga bokföringssystem. Vi läser leverantörsfakturor — inget annat. Du kan koppla bort när som helst.',
    bullets: ['Endast läs-rättigheter', 'OAuth 2.0 — inga lösenord lagras hos oss', 'GDPR-säkrad infrastruktur i Sverige'],
  },
  {
    step: 'Steg 02',
    title: 'Vi skannar dina avtal — du sover',
    body: 'På 30 sekunder analyseras 12 månaders leverantörsfakturor. AI:n jämför mot 50 000+ andra svenska SMB:er och hittar var du betalar över marknadspris.',
    bullets: ['8 leverantörskategorier idag', 'Branschjusterad benchmark', 'Återkommande scanning varje kvartal'],
  },
  {
    step: 'Steg 03',
    title: 'Godkänn med BankID — vi byter åt dig',
    body: 'Du ser exakt vad du sparar och vad som måste signeras. Arvo förbereder uppsägning + nytt avtal. Du klickar igenom — vi sköter resten.',
    bullets: ['Du behåller full kontroll', 'Ingen leverantör byts utan din signatur', 'Garanti om priset höjs inom 12 mån'],
  },
];

const CIRC_SM = 175.93; // 2π × 28

const ScoreCircleMini = ({ score, color }) => {
  const trackRef = useRef(null);
  const offset = parseFloat((CIRC_SM * (1 - score / 100)).toFixed(2));
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (trackRef.current) trackRef.current.style.strokeDashoffset = offset;
    });
    return () => cancelAnimationFrame(id);
  }, [offset]);
  return (
    <ScoreGauge>
      <svg viewBox="0 0 72 72">
        <circle fill="none" stroke="#E5EFEA" strokeWidth="6" cx="36" cy="36" r="28" />
        <circle
          ref={trackRef}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={CIRC_SM}
          strokeDashoffset={CIRC_SM}
          cx="36" cy="36" r="28"
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)' }}
        />
      </svg>
      <ScoreGaugeCenter $color={color}>
        <span className="num">{score}</span>
        <span className="den">/100</span>
      </ScoreGaugeCenter>
    </ScoreGauge>
  );
};

const SCORE_LEVELS = [
  {
    label: 'Optimalt',
    color: '#1B7A6E',
    score: 91,
    desc: 'Ni har ett kostnadsoptimerat leverantörsnätverk. Ni betalar under eller i nivå med branschsnittet.',
  },
  {
    label: 'Förbättringsläge',
    color: '#65A30D',
    score: 72,
    desc: 'Ni betalar mer än marknadspriset — en meningsfull besparing som Arvo kan realisera åt er utan byråkrati.',
  },
  {
    label: 'Suboptimerat',
    color: '#D97706',
    score: 54,
    desc: 'Ni betalar klart mer än branschsnittet. Arvo kan göra ett byte som betalar sig från dag ett.',
  },
  {
    label: 'Kritisk',
    color: '#DC2626',
    score: 28,
    desc: 'Ni betalar kraftigt mer än marknadspriset och förlorar pengar varje faktura. Arvo identifierar, förhandlar och genomför bytet åt er.',
  },
];

const FAQ = [
  {
    q: 'Vad kostar det?',
    a: 'Arvo erbjuds i två lager. Arvo Intelligence kostar 1 995 kr/mån — löpande övervakning, smyghöjningslarm och avtalsbevakning, ingen bindningstid. Arvo Switch är ett tillägg: vill ni att Arvo genomför ett identifierat leverantörsbyte tar vi 20 % av realiserad besparing, fakturerat efter att bytet är genomfört. Hittar vi ingen besparing — kostar Switch inget.',
  },
  {
    q: 'Hur kan ni vara säkra på att rekommendationerna är opartiska?',
    a: <>Vi tjänar pengar bara när du sparar — det är beviset på opartiskhet. Leverantörer kan inte köpa sig en högre placering; vi sätter tak för vad de får betala oss och krediterar dig direkt om någon försöker gå över. Policyn är öppet publicerad under <Link to="/bias">vår rankningspolicy</Link>.</>,
  },
  {
    q: 'Varför ska jag lita på era besparingskalkyler?',
    a: 'Vi bygger på verifierade marknadsdata — offentliga listpriser, ramavtalsdata och faktiska operatörspriser. Och eftersom vi tar 20 % av identifierad besparing har vi inget att vinna på att överdriva: en projektion som inte håller kostar oss förtroendet, inte bara besparingsarvodet. Vi tjänar mer på att lova lite och leverera fullt ut.',
  },
  {
    q: 'Vad händer om den nya leverantören höjer priset efter bytet?',
    a: 'Vår fee baseras på kontrakterade priser vid avtalssignering. Förändras marknadsläget efter bytet hjälper vi er med en ny analys — utan extra kostnad.',
  },
  {
    q: 'Säger ni upp avtal autonomt utan min godkännande?',
    a: 'Aldrig. Varje byte kräver din BankID-signatur. Vi förbereder, du godkänner. Det är en hård regel.',
  },
  {
    q: 'Vilka kategorier täcker ni idag?',
    a: 'Elavtal, mobilabonnemang, företagsbredband, programvarulicenser / SaaS, skrivare & Managed Print, kortterminaler, fakturatjänster och företagsleasing — åtta kategorier där vi kan genomföra hela bytesprocessen idag. Företags- och yrkesansvarsförsäkringar analyserar vi redan, men byten genomförs när vår FI-licens är klar. Fler kategorier läggs till varje kvartal baserat på var vi ser störst besparingar i kunddatan.',
  },
  {
    q: 'Vad händer med min data?',
    a: 'Vi läser endast leverantörsfakturor från Fortnox / Visma via läs-rättigheter. Datan lagras krypterad i Sverige (Bahnhof Stockholm). Vi säljer aldrig identifierbar data — anonymiserade branschindex är vår enda dataprodukt utöver tjänsten.',
  },
];


const validateFoundingForm = (form) => {
  const errors = {};
  if (!form.company.trim()) errors.company = 'Företagsnamn saknas.';
  if (!form.name.trim()) errors.name = 'Namn saknas.';
  if (!form.email.trim()) {
    errors.email = 'E-post saknas.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'E-postadressen ser inte rätt ut.';
  }
  return errors;
};

const Landing = () => {
  const [form, setForm] = useState({ company: '', name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | submitting | success | error

  const submitFounding = async (e) => {
    e.preventDefault();
    const validation = validateFoundingForm(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setState('submitting');
    try {
      const res = await fetch('/api/founding-member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company:   form.company.trim(),
          name:      form.name.trim(),
          email:     form.email.trim(),
          referrer:  typeof document !== 'undefined' ? document.referrer || null : null,
          timestamp: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error('API ' + res.status);
      setState('success');
    } catch (err) {
      setState('error');
    }
  };

  return (
    <Page>
      <Nav variant="public" />

      <Hero>
        <HeroBackdrop />
        <HeroInner>
          <div>
            <Eyebrow><span className="dot" /> Arvo Intelligence · Proaktiv finansdirektör för svenska bolag</Eyebrow>
            <Headline>
              Er finansdirektör.<br /><em>Aldrig offline.</em>
            </Headline>
            <Lede>
              Bokföringsprogrammet visar vad ni betalade. Inte att ni betalar för mycket.
              Arvo bevakar era leverantörsavtal dygnet runt och hör av sig i samma stund
              en kostnad börjar krypa uppåt — ofta innan ni själva hunnit märka något.
              Ni behöver inte fråga. Vi hör av oss.
            </Lede>
            <HeroActions>
              <Button as={Link} to="/testa-faktura" $variant="gradient" $size="lg">
                Testa med en faktura <Icon name="arrow" size={18} />
              </Button>
              <Button as={Link} to="/connect" $variant="secondary" $size="lg">
                Aktivera Arvo Intelligence
              </Button>
            </HeroActions>
            <HeroProof>
              <div><strong>Aktivera en gång</strong><span>Arvo bevakar resten — klart på 2 min</span></div>
              <div><strong>Aldrig utan er signatur</strong><span>ni behåller full kontroll</span></div>
              <div><strong>Betala bara när ni sparat</strong><span>Switch: 0 kr tills bytet är klart</span></div>
            </HeroProof>
          </div>

          <HeroVisual>
            <PreviewCard>
              <PreviewHead>
                <h4>Arvo Intelligence</h4>
                <span style={{ background: 'none', color: '#8A9E98', fontWeight: 400, padding: 0 }}>
                  i morse · 08:14
                </span>
              </PreviewHead>

              {/* Proactive alert */}
              <div style={{ marginTop: 20, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                  background: '#FEF3C7',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#D97706', marginBottom: 4 }}>
                    Smyghöjning identifierad
                  </div>
                  <div style={{ fontSize: 16.5, fontWeight: 600, color: '#1A2821', lineHeight: 1.2 }}>
                    Telia · Er mobilflotta
                  </div>
                  <div style={{ fontSize: 13, color: '#6B7C79', marginTop: 4 }}>
                    +11&nbsp;% sedan förra kvartalet
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #E5EFE9', margin: '18px 0' }} />

              <p style={{ fontSize: 14, lineHeight: 1.6, color: '#4A5C58', margin: 0 }}>
                8 av 15 jämförbara bolag fick samma höjning. Arvo har
                identifierat en besparing på{' '}
                <strong style={{ color: '#1B7A6E' }}>18&nbsp;480&nbsp;kr/år</strong>.
              </p>

              <div style={{ marginTop: 18, display: 'flex', gap: 10 }}>
                <button style={{
                  flex: 1, padding: '11px 0', borderRadius: 9,
                  background: 'linear-gradient(135deg, #1B7A6E 0%, #2DB59F 100%)',
                  border: 'none', color: '#fff', fontSize: 14, fontWeight: 600,
                  cursor: 'default', letterSpacing: '-.01em',
                }}>
                  Ja, Arvo agerar →
                </button>
                <button style={{
                  padding: '11px 16px', borderRadius: 9,
                  background: 'transparent',
                  border: '1px solid #D0E5DE',
                  color: '#5C7A74', fontSize: 14, cursor: 'default',
                }}>
                  Visa underlag
                </button>
              </div>
            </PreviewCard>

            <PreviewFloat $top="-24px" $right="-12px">
              <div className="dot"><Icon name="spark" size={18} /></div>
              <div className="text">
                <strong>Ny avisering</strong>
                <span>automatisk bevakning</span>
              </div>
            </PreviewFloat>
            <PreviewFloat $bottom="-24px" $left="20px">
              <div className="dot"><Icon name="check" size={18} /></div>
              <div className="text">
                <strong>Förhandling klar</strong>
                <span>Telia sänkte −12&nbsp;%</span>
              </div>
            </PreviewFloat>
          </HeroVisual>
        </HeroInner>
      </Hero>

      <WaveDivider aria-hidden="true">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C480,56 960,56 1440,0 L1440,56 L0,56 Z" />
        </svg>
      </WaveDivider>

      <TrustStrip id="sakerhet">
        <TrustPillar>
          <div className="icon"><Icon name="lock" size={22} stroke={2} /></div>
          <h3>Vi ser bara det ni delar</h3>
          <p>
            Ni vidarebefordrar era leverantörsfakturor — inget annat. Kundfakturor,
            lönedata, bankkonton och personnummer når oss aldrig.
          </p>
          <ul>
            <li className="group-label">Vad vi ser</li>
            <li><Icon name="check" size={14} stroke={2.4} /> Leverantörsfakturor</li>
            <li><Icon name="check" size={14} stroke={2.4} /> Avtal &amp; förfallodatum</li>
            <li className="group-label blocked">Når oss aldrig</li>
            <li className="no"><Icon name="lock" size={14} stroke={2} /> Lön &amp; personnummer</li>
            <li className="no"><Icon name="lock" size={14} stroke={2} /> Kundfakturor</li>
          </ul>
        </TrustPillar>

        <TrustPillar>
          <div className="icon"><Icon name="bolt" size={22} stroke={2} /></div>
          <h3>Aktivera en gång. Aldrig offline.</h3>
          <p>
            Ni kopplar in Arvo en enda gång. Därefter flödar varje ny leverantörsfaktura
            in automatiskt och bevakas i realtid — ni behöver aldrig ladda upp något manuellt.
          </p>
          <strong>Klart på 2 minuter. Sen sköter Arvo resten.</strong>
        </TrustPillar>

        <TrustPillar>
          <div className="icon"><Icon name="trend" size={22} stroke={2} /></div>
          <h3>Betala bara för värdet</h3>
          <p>
            Arvo Switch är 100 % prestationsbaserat — 20 % av identifierad besparing,
            fakturerat efter genomfört byte. Hittar vi inget kostar Switch ingenting.
          </p>
          <strong>Gratis att starta. Ni betalar när ni sparat.</strong>
        </TrustPillar>
      </TrustStrip>

      <AlgoTrust>
        <div className="inner">
          <div className="eyebrow"><Icon name="shield" size={13} stroke={2} /> Rankningspolicy</div>
          <h2>100 % oberoende. Vår algoritm styrs av din besparing, inte provisioner.</h2>
          <p>
            Vi står på din sida, inte leverantörens. Genom fasta tak för ersättningar säkerställer
            vi att vår algoritm alltid är objektiv och enbart prioriterar din besparing. Om en
            leverantör erbjuder mer än vårt tak, krediteras överskottet direkt till dig. Det är
            matematisk transparens – inga dolda agendor, bara lägre kostnader.
          </p>
          <Link to="/bias" className="cta-link">
            Läs hur vår algoritm rankar <Icon name="arrow" size={15} />
          </Link>
        </div>
      </AlgoTrust>

      <Section id="hur">
        <SectionHead>
          <span className="kicker">Så fungerar Arvo Flow</span>
          <h2>Tre steg från trasigt till transparent.</h2>
          <p>Vi byggde Arvo Flow för att vi själva tröttnade på att betala 30 % över marknad utan att ens veta om det. Här är hur vi gör det enkelt.</p>
        </SectionHead>
        <HowGrid>
          {HOW_STEPS.map((s) => (
            <HowCard key={s.step}>
              <span className="step">{s.step}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <ul>
                {s.bullets.map((b) => (
                  <li key={b}><Icon name="check" size={16} stroke={2} />{b}</li>
                ))}
              </ul>
            </HowCard>
          ))}
        </HowGrid>

        <ScoreSubHead>
          <span className="kicker">Arvo Score™</span>
          <h3>Vad berättar ert Score om era leverantörsavtal?</h3>
          <p>
            Varje kategori i er bokföring får ett Score mellan 0–100. Scoren baseras på hur ert avtalspris förhåller sig till branschsnittet — fyra nivåer avgör om ni är optimala eller betalar för mycket.
          </p>
        </ScoreSubHead>
        <ScoreGrid>
          {SCORE_LEVELS.map((lvl) => (
            <ScoreLevelCard key={lvl.label} $color={lvl.color}>
              <ScoreCircleMini score={lvl.score} color={lvl.color} />
              <div className="text">
                <strong className="level">{lvl.label}</strong>
                <p>{lvl.desc}</p>
              </div>
            </ScoreLevelCard>
          ))}
        </ScoreGrid>
      </Section>

      {/* ── Arvo Intelligence ─────────────────────────────────────────────── */}
      <IntelligenceSection id="intelligence">
        <IntelligenceInner>
          <div>
            <span className="eyebrow">Arvo Intelligence</span>
            <h2>Arvo märker det innan det kostar er.</h2>
            <p className="sub">
              Bokföringsprogram registrerar vad ni betalar.
              Arvo Intelligence kontaktar er när ni håller på att betala för mycket.
            </p>
            <IntelligencePillars>
              <IntelligencePillar>
                <div className="pillar-icon">
                  <Icon name="alert-circle" size={18} stroke={2} />
                </div>
                <div>
                  <h4>Smyghöjningslarm</h4>
                  <p>Vi jämför varje ny faktura mot föregående period. Avviker priset — kontaktar vi er samma dag.</p>
                </div>
              </IntelligencePillar>
              <IntelligencePillar>
                <div className="pillar-icon">
                  <Icon name="trend" size={18} stroke={2} />
                </div>
                <div>
                  <h4>Community Benchmark</h4>
                  <p>Er prisdata mäts mot anonymiserade data från jämförbara bolag i er bransch. Ni vet alltid om ni betalar rätt.</p>
                </div>
              </IntelligencePillar>
              <IntelligencePillar>
                <div className="pillar-icon">
                  <Icon name="file" size={18} stroke={2} />
                </div>
                <div>
                  <h4>Proaktiv avtalsbevakning</h4>
                  <p>90 dagar innan ett avtal förnyas automatiskt varnar vi er — och förhandlar på er begäran.</p>
                </div>
              </IntelligencePillar>
            </IntelligencePillars>
          </div>

          <IntelligencePreview>
            <div className="preview-header">
              <span className="preview-brand">Arvo Intelligence</span>
              <span className="preview-time">i morse · 08:14</span>
            </div>
            <div className="preview-divider" />
            <p className="preview-message">
              Vi noterade att <strong>Telia</strong> höjde priset på er mobilflotta
              med 11&nbsp;% förra månaden. 8 av 15 jämförbara bolag i vårt nätverk
              fick samma höjning. Vill ni att Arvo agerar och förhandlar tillbaka priset?
            </p>
            <div className="preview-cta">Ja, Arvo agerar →</div>
            <div className="preview-footer">
              <div className="preview-price">
                1&nbsp;995&nbsp;kr<span className="period">/ mån</span>
              </div>
              <div className="preview-price-note">Ingen bindningstid<br />Kom igång på 2 minuter</div>
            </div>
          </IntelligencePreview>
        </IntelligenceInner>
      </IntelligenceSection>

      {/* ── Priser — hybridmodell ─────────────────────────────────────────── */}
      <Section id="priser">
        <SectionHead>
          <span className="kicker">Pris</span>
          <h2>Övervakning på prenumeration. Genomfört byte vid behov.</h2>
          <p>Välj det som passar er — eller kombinera båda.</p>
        </SectionHead>
        <PricingTiers>
          <PricingTier $featured>
            <div className="tier-badge">Arvo Intelligence</div>
            <h3>Er proaktiva AI-CFO.</h3>
            <div className="tier-price">1&nbsp;995 kr<span className="period">/ mån</span></div>
            <p className="tier-tagline">Löpande övervakning av samtliga leverantörsfakturor. Arvo hör av sig — ni behöver inte fråga.</p>
            <ul>
              <li><Icon name="check" size={15} stroke={2.4} /> Smyghöjningslarm — avvikelse detekteras direkt</li>
              <li><Icon name="check" size={15} stroke={2.4} /> Community Benchmark mot er bransch</li>
              <li><Icon name="check" size={15} stroke={2.4} /> Avtalsbevakning med 90-dagarsvarning</li>
              <li><Icon name="check" size={15} stroke={2.4} /> Månadsvis briefing med actionbara insikter</li>
            </ul>
            <Button as={Link} to="/connect" $variant="gradient" $size="lg" style={{ width: '100%', justifyContent: 'center' }}>
              Aktivera Arvo Intelligence →
            </Button>
            <p className="tier-note">Ingen bindningstid · Kom igång på 2 minuter</p>
          </PricingTier>

          <PricingTier>
            <div className="tier-badge">Arvo Switch</div>
            <h3>Genomfört leverantörsbyte.</h3>
            <div className="tier-price">20 %<span className="period">av besparing</span></div>
            <p className="tier-tagline">Arvo agerar ombud — hanterar uppsägning, prisförhandling och signering av det nya avtalet.</p>
            <ul>
              <li><Icon name="check" size={15} stroke={2.4} /> Identifierad besparing bekräftas med verifierade marknadsdata</li>
              <li><Icon name="check" size={15} stroke={2.4} /> Ni godkänner varje byte med BankID</li>
              <li><Icon name="check" size={15} stroke={2.4} /> Fr.o.m. år 2 tillfaller hela besparingen er</li>
              <li><Icon name="check" size={15} stroke={2.4} /> Hittar vi inget — kostar det inget</li>
            </ul>
            <Button as={Link} to="/testa-faktura" $variant="secondary" $size="lg" style={{ width: '100%', justifyContent: 'center' }}>
              Testa med en faktura →
            </Button>
            <div className="tier-addon">
              <strong>Tillägg för Intelligence-kunder</strong>
              Aktivera ett byte direkt från er månadsbriefing. 20 % av realiserad besparing.
            </div>
          </PricingTier>
        </PricingTiers>
      </Section>

      <Section id="founding-members">
        <SectionHead>
          <span className="kicker">Founding Members · Begränsade platser</span>
          <h2>Vill du vara först ut?</h2>
          <p>Vi tar in 50 svenska företag innan publik lansering. Du får personlig onboarding direkt med grundarna, tjänsten gratis de första 6 månaderna, och påverkan över vilka kategorier vi prioriterar härnäst.</p>
        </SectionHead>
        <FoundingCard>
          <FoundingLeft>
            <span className="kicker">Founding Member</span>
            <h2>50 platser. Du får påverkan.</h2>
            <p className="lede">Vi släpper Arvo Flow stegvis. Founding Members får tillgång först, tjänsten helt gratis de första 6 månaderna, och hjälper oss prioritera vilka leverantörskategorier som ska in härnäst.</p>
            <ul className="benefits">
              <li><Icon name="check" size={16} stroke={2.4} /> Personlig onboarding direkt med grundarna — 30 min Teams</li>
              <li><Icon name="check" size={16} stroke={2.4} /> Tjänsten är helt gratis de första 6 månaderna — ingen success-fee, inga avgifter</li>
              <li><Icon name="check" size={16} stroke={2.4} /> Du röstar på vilka kategorier vi öppnar nästa kvartal</li>
              <li><Icon name="check" size={16} stroke={2.4} /> Garanterad förtur till försäkrings­byten när FI-licensen är klar</li>
            </ul>
          </FoundingLeft>
          {state === 'success' ? (
            <FoundingSuccess>
              <div className="check"><Icon name="check" size={28} stroke={2.5} /></div>
              <h3>Tack — du står på listan.</h3>
              <p>Vi hör av oss inom 48 timmar för att boka en kort onboarding och hjälpa dig komma igång.</p>
            </FoundingSuccess>
          ) : (
            <FoundingForm onSubmit={submitFounding} noValidate>
              <label>
                Företagsnamn
                <input
                  type="text"
                  name="company"
                  required
                  autoComplete="organization"
                  placeholder="t.ex. Lindberg VVS AB"
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  aria-invalid={!!errors.company || undefined}
                  disabled={state === 'submitting'}
                />
                {errors.company && <span className="error">{errors.company}</span>}
              </label>
              <label>
                Namn
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="t.ex. Johan Lindberg"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  aria-invalid={!!errors.name || undefined}
                  disabled={state === 'submitting'}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </label>
              <label>
                E-post
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="johan@lindbergvvs.se"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  aria-invalid={!!errors.email || undefined}
                  disabled={state === 'submitting'}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </label>
              <Button type="submit" $variant="gradient" $size="lg" disabled={state === 'submitting'}>
                {state === 'submitting' ? 'Skickar…' : 'Reservera min plats'}
                {state !== 'submitting' && <Icon name="arrow" size={18} />}
              </Button>
              {state === 'error' && (
                <span className="error">Något gick fel — försök igen eller mejla hej@arvoflow.se.</span>
              )}
              <p className="fineprint">Vi använder dina uppgifter enbart för att kontakta dig om Founding Member-platsen och raderar dem om du tackar nej. Inga utskick utan ditt godkännande.</p>
            </FoundingForm>
          )}
        </FoundingCard>
      </Section>

      <Section id="faq">
        <SectionHead>
          <span className="kicker">Vanliga frågor</span>
          <h2>Det vi får oftast — rakt på.</h2>
        </SectionHead>
        <FaqWrap>
          {FAQ.map((f, i) => (
            <FaqItem key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </FaqItem>
          ))}
        </FaqWrap>
      </Section>

      <FinalCta>
        <h2>Hur mycket betalar du för mycket just nu?</h2>
        <p>Snittet bland våra kunder är {TOTALS.activeNet.toLocaleString('sv-SE')} kr/år i nettobesparing efter vår avgift. Du vet inte förrän vi har scannat. 60 sekunder med Fortnox / Visma och du har svaret.</p>
        <div className="actions">
          <Button as={Link} to="/connect" $variant="gradient" $size="lg">
            Analysera mina fakturor — gratis <Icon name="arrow" size={18} />
          </Button>
        </div>
        <div className="fineprint">Inga kreditkortsuppgifter. Ingen bindningstid. Avsluta när du vill.</div>
      </FinalCta>

      <Footer />
    </Page>
  );
};

export default Landing;
