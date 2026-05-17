import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import {
  Page, Hero, Eyebrow, Headline, Lede,
  Section, RuleCard,
  KickerH2, Kicker, SubLede, PolicyTable, PolicyRow,
  Cta,
} from './styles';

const POLICY_CAPS = [
  { cat: 'Företagsförsäkring', detail: 'Per genomfört byte', cap: '500 kr' },
  { cat: 'Elavtal', detail: 'Per genomfört byte', cap: '500 kr' },
  { cat: 'Mobilabonnemang', detail: 'Per abonnemang som flyttas', cap: '120 kr' },
  { cat: 'Företagsbredband', detail: 'Per genomfört byte', cap: '500 kr' },
  { cat: 'Kortterminal', detail: 'Per genomfört byte', cap: '400 kr' },
  { cat: 'Fakturatjänst', detail: 'Per genomfört byte', cap: '300 kr' },
  { cat: 'Yrkesansvarsförsäkring', detail: 'Per genomfört byte', cap: '500 kr' },
  { cat: 'Företagsleasing', detail: 'Per genomfört byte', cap: '500 kr' },
];

const Bias = () => (
  <Page>
    <Nav variant="public" />

    <Hero>
      <Eyebrow><span className="dot" /> Rankningspolicy · Senast uppdaterad 2026-04-24</Eyebrow>
      <Headline>Vi rankar leverantörer på <em>din</em> totalkostnad — inte vår provision.</Headline>
      <Lede>
        Det här är hela vår policy. Inga undantag, inga gråzoner, inga "premium-partners".
        Om en journalist en dag granskar oss vill vi att de hittar exakt det vi skrev här.
      </Lede>
    </Hero>

    <Section>
      <Kicker>De fyra reglerna</Kicker>
      <KickerH2>Hur vi förhindrar bias från dag 1.</KickerH2>
      <SubLede>
        Affiliate-intäkter är bra för affärsmodellen — men en uppenbar intressekonflikt mot kunden.
        Vi löste det strukturellt, inte bara i marknadsföringstexten.
      </SubLede>

      <RuleCard>
        <div className="num">1</div>
        <div>
          <h3>Vår algoritm är publik. Och deterministisk.</h3>
          <p>
            Vi rankar varje förslag på <strong>total cost of ownership över 24 månader minus
            switching cost</strong>. Den som ger dig flest kronor över på kontot vinner — alltid.
            Affiliate-storlek är inte ett ingångsvärde i scoring-funktionen.
          </p>
          <pre>
{`score(provider) =
    annualCost(provider) * 2
  + switchingCost(provider)        // engångskostnader, etablering, portering
  - reliabilityBonus(provider)     // SLA, supportkvalitet (publik benchmark)
  - coverageMatch(provider)        // % av nuvarande täckning som behålls

`}<b>{`// Affiliate-rate är aldrig en variabel i scoringen.
// Lägst score vinner. Vid likastånd: lägst nominellt pris för dig.`}</b>
          </pre>
        </div>
      </RuleCard>

      <RuleCard>
        <div className="num">2</div>
        <div>
          <h3>Affiliate-intäkten är kapad — överskott går till dig.</h3>
          <p>
            Vi accepterar en fast, kapad affiliate-avgift per leverantörskategori (se tabellen
            nedan). Om en leverantör vill betala mer för att vinna oftare — då har vi inte rätten
            att tjäna mer på det. Överskottet läggs i en kundbonus-pool och krediteras tillbaka
            på din Besparingsavgift.
          </p>
        </div>
      </RuleCard>

      <RuleCard>
        <div className="num">3</div>
        <div>
          <h3>Ett erbjudande. Inga val, inga krångel.</h3>
          <p>
            Vi tar <strong>20 % av identifierad besparing</strong> — en engångsavgift som
            faktureras 3 månader efter aktiverat avtal. Det är det enda du behöver godkänna.
          </p>
          <p>
            Om affiliate-intäkter från leverantörer överstiger de tak som anges i tabellen nedan,
            krediteras överskottet automatiskt tillbaka till dig — du behöver inte välja, begära
            eller ens hålla koll. Systemet sköter det.
          </p>
        </div>
      </RuleCard>

      <RuleCard>
        <div className="num">4</div>
        <div>
          <h3>Vi publicerar våra rekommendationsstatistik kvartalsvis.</h3>
          <p>
            Varje kvartal publiceras hur ofta varje leverantör rekommenderas, hur mycket affiliate
            som faktiskt utbetalats, och hur stor andel av besparing-poolen som rabatterats.
            Granska oss. Det gör branschen ärligare.
          </p>
        </div>
      </RuleCard>
    </Section>

    <Section>
      <Kicker>Affiliate-tak per kategori</Kicker>
      <KickerH2>Det här är max vi får ta — oavsett vad leverantören vill betala.</KickerH2>
      <SubLede>
        Taken är satta för att rymma normal industri-affiliate utan att skapa incitament att
        favorisera en viss leverantör.
      </SubLede>

      <PolicyTable>
        <PolicyRow className="header">
          <div>Kategori</div>
          <div>Mätpunkt</div>
          <div style={{ textAlign: 'right' }}>Tak</div>
        </PolicyRow>
        {POLICY_CAPS.map((p) => (
          <PolicyRow key={p.cat}>
            <div className="cat">{p.cat}</div>
            <div className="detail">{p.detail}</div>
            <div className="cap">{p.cap}</div>
          </PolicyRow>
        ))}
      </PolicyTable>
    </Section>

    <Cta>
      <h2>Det här är inte marknadsföring. Det här är arkitektur.</h2>
      <p>
        Om du upptäcker att vi bryter mot någon av reglerna ovan — mejla{' '}
        <a href="mailto:transparens@arvo.flow" style={{ textDecoration: 'underline' }}>
          transparens@arvo.flow
        </a>. Vi svarar inom 48 h, publikt.
      </p>
      <div className="actions">
        <Button as={Link} to="/connect" $variant="primary" $size="lg">
          Koppla Fortnox / Visma <Icon name="arrow" size={18} />
        </Button>
        <Button as={Link} to="/" $variant="secondary" $size="lg">
          Tillbaka till startsidan
        </Button>
      </div>
    </Cta>

    <Footer />
  </Page>
);

export default Bias;
