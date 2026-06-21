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

// Mekanism-transparens per kategori (de tre nivåerna). Ingen affiliate-tabell —
// Arvo tar aldrig en krona från en leverantör (neutralitets-moaten). Vad vi GÖR
// och hur vi betalas, öppet redovisat.
const CATEGORY_MODEL = [
  { cat: 'Elavtal',             detail: 'Arvo genomför bytet (BankID)',      pay: '20 % av realiserad besparing' },
  { cat: 'Mobilabonnemang',     detail: 'Arvo genomför bytet (BankID)',      pay: '20 % av realiserad besparing' },
  { cat: 'Företagsbredband',    detail: 'Arvo genomför bytet (BankID)',      pay: '20 % av realiserad besparing' },
  { cat: 'Programvara / SaaS',  detail: 'Arvo förbereder, ni formaliserar',  pay: '20 % av realiserad besparing' },
  { cat: 'Kortterminal',        detail: 'Arvo förbereder, ni formaliserar',  pay: '20 % av realiserad besparing' },
  { cat: 'Fakturatjänst',       detail: 'Arvo förbereder, ni formaliserar',  pay: '20 % av realiserad besparing' },
  { cat: 'Löneadministration',  detail: 'Arvo förbereder, ni formaliserar',  pay: '20 % av realiserad besparing' },
  { cat: 'Företagsförsäkring',  detail: 'Arvo beväpnar er med exakt motbud',  pay: 'Ingår i prenumerationen' },
  { cat: 'Företagsleasing',     detail: 'Arvo beväpnar er med exakt motbud',  pay: 'Ingår i prenumerationen' },
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
        Provision från leverantörer är en uppenbar intressekonflikt mot kunden. {/* claims-ok: neutralitets-deklaration — sidan förklarar att vi INTE tar provision */}
        Vi löste den inte med tak eller löften — vi tog bort dörren helt. Arvo tar aldrig en krona från en leverantör.
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
          <h3>Noll kronor från leverantörer. Inget tak — för det finns inget att kapa.</h3>
          <p>
            Arvo tar aldrig en kickback, provision eller partner-avgift från en leverantör {/* claims-ok: neutralitets-deklaration — förklarar att vi INTE tar kickback/provision */}
            — inte nu, inte kapat, aldrig. Vår enda intäkt är success fee från dig. Vi kan inte köpas,
            för det finns ingen dörr in. I samma sekund vi tjänade en krona på att styra dig mot
            en leverantör vore vår oberoende röst död — och med den hela vårt existensberättigande.
          </p>
        </div>
      </RuleCard>

      <RuleCard>
        <div className="num">3</div>
        <div>
          <h3>Ett erbjudande. Inga val, inga krångel.</h3>
          <p>
            Vi tar <strong>20 % av realiserad besparing</strong> — och fakturerar först när
            besparingen faktiskt syns i dina egna böcker (den gamla leverantörsraden försvinner,
            den nya dyker upp). Aldrig på en siffra vi bara gissat. Landar ingen besparing kostar
            Switch ingenting. Det är det enda du behöver godkänna.
          </p>
        </div>
      </RuleCard>

      <RuleCard>
        <div className="num">4</div>
        <div>
          <h3>Vi publicerar vår rekommendationsstatistik kvartalsvis.</h3>
          <p>
            Varje kvartal publiceras hur ofta varje leverantör rekommenderas och hur mycket
            besparing som faktiskt realiserats hos våra kunder. Inga affiliate-utbetalningar att
            redovisa — det finns inga. Granska oss. Det gör branschen ärligare.
          </p>
        </div>
      </RuleCard>
    </Section>

    <Section>
      <Kicker>Vad vi gör — och hur vi betalas — per kategori</Kicker>
      <KickerH2>Olika kategorier, olika mekanik. Samma intäkt: bara från dig.</KickerH2>
      <SubLede>
        I vissa kategorier genomför vi bytet, i andra förbereder vi det, i några beväpnar vi dig att
        agera själv. Vi lovar bara den mekanik vi äger — och tar betalt bara på besparing som landat.
      </SubLede>

      <PolicyTable>
        <PolicyRow className="header">
          <div>Kategori</div>
          <div>Vad Arvo gör</div>
          <div style={{ textAlign: 'right' }}>Hur vi betalas</div>
        </PolicyRow>
        {CATEGORY_MODEL.map((p) => (
          <PolicyRow key={p.cat}>
            <div className="cat">{p.cat}</div>
            <div className="detail">{p.detail}</div>
            <div className="cap">{p.pay}</div>
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
