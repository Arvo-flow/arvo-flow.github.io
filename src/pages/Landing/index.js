import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import {
  Page, Section, Hero, HeroBackdrop, HeroInner,
  Eyebrow, Headline, Lede, HeroActions, HeroProof, HeroVisual,
  PreviewCard, PreviewHead, SavingBig, PreviewList, PreviewRow, PreviewFloat,
  TickerBand, TickerText,
  SectionHead, HowGrid, HowCard,
  ProofGrid, Quote, Stats,
  PricingCard, PricingInner,
  FaqWrap, FaqItem,
  FinalCta,
} from './styles';

const HOW_STEPS = [
  {
    step: 'Steg 01',
    title: 'Koppla Fortnox på 60 sek',
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
    a: 'Inget i förskott. Vi tar 20 % av den faktiska besparing som materialiseras under år 1, fakturerat kvartalsvis. Hittar vi inget — kostar det inget. Du kan välja en alternativ modell där vi rabatterar vår affiliate-intäkt mot 30 % success-fee, helt transparent.',
  },
  {
    q: 'Hur kan ni vara säkra på att rekommendationerna är opartiska?',
    a: 'Vår rankningsalgoritm är publik och deterministisk — du hittar hela vår rankningspolicy under /bias. Affiliate-intäkter är kapade per kategori och överskott rabatteras tillbaka till kunderna. Du kan också välja en helt affiliate-fri modell vid onboarding.',
  },
  {
    q: 'Vad händer om den nya leverantören höjer priset efter bytet?',
    a: 'Vi mäter faktisk besparing över 12 månader via Fortnox. Höjs priset så att din besparing blir lägre än vad vi lovat — får du mellanskillnaden tillbaka. Det står i avtalet.',
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
    a: 'Vi läser endast leverantörsfakturor från Fortnox via läs-rättigheter. Datan lagras krypterad i Sverige (Bahnhof Stockholm). Vi säljer aldrig identifierbar data — anonymiserade branschindex är vår enda dataprodukt utöver tjänsten.',
  },
];

const Landing = () => {
  return (
    <Page>
      <Nav variant="public" />

      <Hero>
        <HeroBackdrop />
        <HeroInner>
          <div>
            <Eyebrow><span className="dot" /> AI-inköpschef · För svenska småföretag</Eyebrow>
            <Headline>
              Vi hittar pengarna<br />du blöder på <em>fel leverantör.</em>
            </Headline>
            <Lede>
              Koppla Fortnox på 60 sekunder. Arvo Flow analyserar dina leverantörsavtal,
              jämför mot tusentals andra svenska SMB:er och hittar var du betalar över marknadspris.
              Du betalar oss bara när du faktiskt sparar pengar.
            </Lede>
            <HeroActions>
              <Button as={Link} to="/connect" $variant="primary" $size="lg">
                Koppla Fortnox <Icon name="arrow" size={18} />
              </Button>
              <Button as="a" href="#hur" $variant="secondary" $size="lg">
                Så fungerar det
              </Button>
            </HeroActions>
            <HeroProof>
              <div><strong>187 340 kr</strong><span>snitt-besparing år 1</span></div>
              <div><strong>4,8 / 5</strong><span>Trustpilot · 312 omdömen</span></div>
              <div><strong>0 kr</strong><span>tills du sparat pengar</span></div>
            </HeroProof>
          </div>

          <HeroVisual>
            <PreviewCard>
              <PreviewHead>
                <h4>Lindberg VVS · Live</h4>
                <span>● Aktiv</span>
              </PreviewHead>
              <SavingBig>
                <small>Identifierad besparing år 1</small>
                <div className="amount">
                  <em>187 340</em>
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
                  <div className="amount">+55 600 kr</div>
                </PreviewRow>
                <PreviewRow>
                  <div className="icon"><Icon name="shield" size={18} /></div>
                  <div>
                    <div className="label">Företagsförsäkring · If</div>
                    <div className="sub">vs Trygg-Hansa</div>
                  </div>
                  <div className="amount">+32 200 kr</div>
                </PreviewRow>
                <PreviewRow>
                  <div className="icon"><Icon name="phone" size={18} /></div>
                  <div>
                    <div className="label">Mobil · Tele2</div>
                    <div className="sub">14 abonnemang vs Telia</div>
                  </div>
                  <div className="amount">+15 600 kr</div>
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
              <span>småföretag i Sverige som låter Arvo bevaka sina kostnader</span>
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
              <h3>20 % av faktisk besparing år 1.</h3>
              <p>Inga månadsavgifter. Inga uppstartskostnader. Vi mäter besparingen via Fortnox och fakturerar kvartalsvis i takt med att du faktiskt sparar pengarna. Hittar vi inget — kostar det inget.</p>
            </div>
            <ul>
              <li><Icon name="check" size={18} stroke={2.2} /> Skanning av alla leverantörsfakturor varje kvartal</li>
              <li><Icon name="check" size={18} stroke={2.2} /> Förberedda byten med BankID-signering</li>
              <li><Icon name="check" size={18} stroke={2.2} /> Prisgaranti — höjs priset får du tillbaka mellanskillnaden</li>
              <li><Icon name="check" size={18} stroke={2.2} /> Branschindex tillgängligt för dig som kund</li>
              <li><Icon name="check" size={18} stroke={2.2} /> Du kan koppla bort Fortnox när som helst</li>
            </ul>
          </PricingInner>
        </PricingCard>
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
        <h2>Hur mycket blöder du just nu?</h2>
        <p>Snittet bland våra kunder är 187 340 kr/år. Du vet inte förrän vi har scannat. 60 sekunder med Fortnox och du har svaret.</p>
        <div className="actions">
          <Button as={Link} to="/connect" $variant="brand" $size="lg">
            Koppla Fortnox — gratis scanning <Icon name="arrow" size={18} />
          </Button>
        </div>
        <div className="fineprint">Inga kreditkortsuppgifter. Ingen bindningstid. Avsluta när du vill.</div>
      </FinalCta>

      <Footer />
    </Page>
  );
};

export default Landing;
