import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { TOTALS } from '../../data/mockData';
import {
  Page, Section, Hero, HeroBackdrop, HeroInner,
  Eyebrow, Headline, Lede, HeroActions, HeroProof, HeroVisual,
  PreviewCard, PreviewHead, SavingBig, PreviewList, PreviewRow, PreviewFloat,
  TickerBand, TickerText,
  TrustStrip, TrustPillar,
  AlgoTrust,
  SectionHead, HowGrid, HowCard,
  ProofGrid, Quote, Stats,
  PricingCard, PricingInner,
  FoundingCard, FoundingLeft, FoundingForm, FoundingSuccess,
  FaqWrap, FaqItem,
  FinalCta,
} from './styles';

const HOW_STEPS = [
  {
    step: 'Steg 01',
    title: 'Koppla Fortnox / Visma på 60 sek',
    body: 'Säker OAuth-anslutning till ditt befintliga bokföringssystem. Vi läser leverantörsfakturor — inget annat. Du kan koppla bort när som helst.',
    bullets: ['Endast läs-rättigheter', 'BankID-verifierat', 'GDPR-säkrad infrastruktur i Sverige'],
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

const FAQ = [
  {
    q: 'Vad kostar det?',
    a: 'Inget i förskott. Vi tar 20 % av identifierad besparing — en engångsavgift som faktureras 3 månader efter aktiverat avtal. Hittar vi inget — kostar det inget.',
  },
  {
    q: 'Hur kan ni vara säkra på att rekommendationerna är opartiska?',
    a: 'Vår rankningsalgoritm är publik och deterministisk — du hittar hela vår rankningspolicy under /bias. Affiliate-intäkter är hårt kapade per kategori och eventuellt överskott krediteras automatiskt tillbaka till dig.',
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
    a: 'Företagsförsäkring, elavtal, mobilabonnemang, bredband, kortterminaler, fakturatjänster, yrkesansvarsförsäkring och företagsleasing. Fler kategorier läggs till varje kvartal baserat på var vi ser störst besparingar i kunddatan.',
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
            <Eyebrow><span className="dot" /> Hittar överpriset. Genomför bytet. Noll kronor i förskott.</Eyebrow>
            <Headline>
              Du betalar överpris.<br />Vår algoritm visar dig <em>exakt var.</em>
            </Headline>
            <Lede>
              Din bokföring visar vad du betalar, inte om du betalar rätt. Arvo Flow
              granskar dina leverantörsfakturor och tar fram färdiga avtalsbyten.
              Vi gör grovjobbet — du behåller kontrollen och godkänner med BankID.
              Inga fasta avgifter.
            </Lede>
            <HeroActions>
              <Button as={Link} to="/connect" $variant="gradient" $size="lg">
                Se mina besparingar — gratis <Icon name="arrow" size={18} />
              </Button>
              <Button as={Link} to="/testa-faktura" $variant="secondary" $size="lg">
                Testa med en faktura
              </Button>
            </HeroActions>
            <HeroProof>
              <div><strong>Faktisk prisdata</strong><span>från tusentals volymavtal</span></div>
              <div><strong>100 % oberoende</strong><span>och objektiv algoritm</span></div>
              <div><strong>0 kr</strong><span>tills vi bevisat din besparing</span></div>
            </HeroProof>
          </div>

          <HeroVisual>
            <PreviewCard>
              <PreviewHead>
                <h4>Lindberg VVS · Live</h4>
                <span>● Aktiv</span>
              </PreviewHead>
              <SavingBig>
                <small>Din nettobesparing / år</small>
                <div className="amount">
                  <em>{TOTALS.activeNet.toLocaleString('sv-SE')}</em>
                  <span className="unit">kr</span>
                </div>
              </SavingBig>
              <PreviewList>
                <PreviewRow>
                  <div className="icon"><Icon name="bolt" size={18} /></div>
                  <div>
                    <div className="label">Elavtal · Tibber</div>
                    <div className="sub">vs Vattenfall (rörligt)</div>
                  </div>
                  <div className="amount">+44 480 kr</div>
                </PreviewRow>
                <PreviewRow>
                  <div className="icon"><Icon name="truck" size={18} /></div>
                  <div>
                    <div className="label">Leasing · Arval</div>
                    <div className="sub">8 servicebilar vs ALD</div>
                  </div>
                  <div className="amount">+39 680 kr</div>
                </PreviewRow>
                <PreviewRow>
                  <div className="icon"><Icon name="phone" size={18} /></div>
                  <div>
                    <div className="label">Mobil · Tele2</div>
                    <div className="sub">14 abonnemang vs Telia</div>
                  </div>
                  <div className="amount">+12 480 kr</div>
                </PreviewRow>
              </PreviewList>
            </PreviewCard>
            <PreviewFloat $top="-24px" $right="-12px">
              <div className="dot"><Icon name="spark" size={18} /></div>
              <div className="text">
                <strong>5 nya förslag</strong>
                <span>scanning klar 09:14</span>
              </div>
            </PreviewFloat>
            <PreviewFloat $bottom="-24px" $left="20px">
              <div className="dot"><Icon name="check" size={18} /></div>
              <div className="text">
                <strong>Bytet är klart</strong>
                <span>Tibber tar över 1 maj</span>
              </div>
            </PreviewFloat>
          </HeroVisual>
        </HeroInner>
      </Hero>

      <TickerBand>
        <TickerText>
          {Array.from({ length: 2 }).flatMap((_, i) => [
            <span key={`a${i}`}>Fortnox <em>·</em></span>,
            <span key={`b${i}`}>Visma <em>·</em></span>,
            <span key={`c${i}`}>Tibber <em>·</em></span>,
            <span key={`d${i}`}>If Skadeförsäkring <em>·</em></span>,
            <span key={`e${i}`}>Tele2 Företag <em>·</em></span>,
            <span key={`f${i}`}>Bahnhof <em>·</em></span>,
            <span key={`g${i}`}>Zettle <em>·</em></span>,
            <span key={`h${i}`}>Länsförsäkringar <em>·</em></span>,
            <span key={`i${i}`}>Vattenfall <em>·</em></span>,
            <span key={`j${i}`}>Worldline <em>·</em></span>,
          ])}
        </TickerText>
      </TickerBand>

      <TrustStrip id="sakerhet">
        <TrustPillar>
          <div className="icon"><Icon name="lock" size={22} stroke={2} /></div>
          <h3>Vi får bara läsa, aldrig ändra</h3>
          <p>
            Endast leverantörsfakturor — kundfakturor, lönedata, bankkonton och personnummer
            ligger utanför vad vi kommer åt.
          </p>
          <ul>
            <li className="group-label">Vad vi läser</li>
            <li><Icon name="check" size={14} stroke={2.4} /> Leverantörsfakturor</li>
            <li><Icon name="check" size={14} stroke={2.4} /> Avtal &amp; förfallodatum</li>
            <li className="group-label blocked">Utanför vår räckvidd</li>
            <li className="no"><Icon name="lock" size={14} stroke={2} /> Lön &amp; personnummer</li>
            <li className="no"><Icon name="lock" size={14} stroke={2} /> Kundfakturor</li>
          </ul>
        </TrustPillar>

        <TrustPillar>
          <div className="icon"><Icon name="check" size={22} stroke={2.4} /></div>
          <h3>Vårt löfte</h3>
          <p>
            Hittar vi inga överpriser på 30 dagar är ditt bolag redan optimerat.
            Vi raderar Fortnox-kopplingen och all data automatiskt.
          </p>
          <strong>Du har inte betalat en krona.</strong>
        </TrustPillar>

        <TrustPillar>
          <div className="icon"><Icon name="trend" size={22} stroke={2} /></div>
          <h3>Inga fasta avgifter</h3>
          <p>
            Vi tjänar pengar bara när du gör det. 20 % av identifierad besparing —
            en engångsavgift, inget annat.
          </p>
          <strong>Hittar vi inget kostar det inget.</strong>
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
      </Section>

      <Section $tight>
        <ProofGrid>
          <Quote>
            <blockquote>
              På sex veckor hittade Arvo 134 000 kr i besparingar bara på el och försäkring. Jag hade trott att jag redan hade förhandlat klart — det stämde uppenbarligen inte.
            </blockquote>
            <figcaption>
              <div className="avatar">JL</div>
              <div>
                <strong>Johan Lindberg</strong>
                <span>VD, Lindberg VVS · 14 anställda</span>
              </div>
            </figcaption>
          </Quote>
          <Stats>
            <div>
              <strong>23 %</strong>
              <span>genomsnittlig besparing per leverantörskategori vi hittar</span>
            </div>
            <div>
              <strong>11 dgr</strong>
              <span>median­tid från första skanning till första byte aktiverat</span>
            </div>
            <div>
              <strong>500+</strong>
              <span>företag i Sverige som låter Arvo bevaka sina kostnader</span>
            </div>
            <div>
              <strong>0 kr</strong>
              <span>fasta avgifter — vi tjänar bara pengar när du sparar pengar</span>
            </div>
          </Stats>
        </ProofGrid>
      </Section>

      <Section id="priser">
        <SectionHead>
          <span className="kicker">Pris</span>
          <h2>Du betalar bara när vi sparat åt dig.</h2>
          <p>Vi är så övertygade om att vi hittar pengarna att vi vägrar ta en krona innan de är dina.</p>
        </SectionHead>
        <PricingCard>
          <PricingInner>
            <div>
              <span className="kicker">Success-baserat</span>
              <h3>20 % av identifierad besparing.</h3>
              <p>Inga månadsavgifter. Inga uppstartskostnader. En engångsavgift som faktureras 3 månader efter aktiverat avtal. Fr.o.m. år 2 tillfaller hela besparingen er. Hittar vi inget — kostar det inget.</p>
            </div>
            <ul>
              <li><Icon name="check" size={18} stroke={2.2} /> Skanning av alla leverantörsfakturor varje kvartal</li>
              <li><Icon name="check" size={18} stroke={2.2} /> Förberedda byten med BankID-signering</li>
              <li><Icon name="check" size={18} stroke={2.2} /> Förändras marknadsläget hjälper vi er med ny analys — utan extra kostnad</li>
              <li><Icon name="check" size={18} stroke={2.2} /> Branschindex tillgängligt för dig som kund</li>
              <li><Icon name="check" size={18} stroke={2.2} /> <strong>Vårt löfte</strong> — hittar vi inga överpriser på 30 dagar raderas data + koppling automatiskt</li>
            </ul>
          </PricingInner>
        </PricingCard>
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
            <FaqItem key={f.q} open={i === 0}>
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
