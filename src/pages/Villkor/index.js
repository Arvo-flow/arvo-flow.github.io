import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import {
  Page, Hero, Eyebrow, Headline, Lede, Body,
  Summary, Clause, FineprintBar, Cta,
} from '../legal/styles';

const Villkor = () => (
  <Page>
    <Nav variant="public" />

    <Hero>
      <Eyebrow><span className="dot" /> Allmänna villkor · Version 1.2 · Senast uppdaterad 2026-05-13</Eyebrow>
      <Headline>Klart, kort och <em>på din sida</em>.</Headline>
      <Lede>
        Det här är hela avtalet mellan dig och Arvo Flow AB. Inga fasta avgifter, inga uppstartsavgifter,
        ingen inlåsning. Vi tjänar pengar bara när du faktiskt sparar.
      </Lede>
    </Hero>

    <Body>
      <Summary>
        <h2>Sammanfattning</h2>
        <p className="intro">Det här behöver du veta innan du signerar med BankID:</p>
        <ul>
          <li>
            <Icon name="check" size={16} stroke={2.4} />
            <div><strong>Ombudskap.</strong> Arvo Flow agerar som ditt företags ombud för att optimera
              och ingå avtal inom el, telefoni, bredband, försäkring och leasing. Vi verifierar din
              behörighet mot Bolagsverket i realtid.</div>
          </li>
          <li>
            <Icon name="check" size={16} stroke={2.4} />
            <div><strong>Success-fee.</strong> Vi tar ingen fast avgift. Vårt arvode är
              20 % av besparingsunderlaget (skillnaden mellan ditt nya och ditt gamla avtal)
              under de första 12 månaderna efter ett byte.</div>
          </li>
          <li>
            <Icon name="check" size={16} stroke={2.4} />
            <div><strong>Ångerrätt.</strong> Du har 24 timmars ångerrätt från BankID-signering
              innan vi påbörjar skarpa byten hos leverantörerna.</div>
          </li>
          <li>
            <Icon name="check" size={16} stroke={2.4} />
            <div><strong>Ingen inlåsning.</strong> Du kan säga upp Arvo Flow-tjänsten när som helst
              med 30 dagars uppsägningstid.</div>
          </li>
          <li>
            <Icon name="check" size={16} stroke={2.4} />
            <div><strong>Datasäkerhet.</strong> Vi läser endast nödvändig fakturadata via Fortnox.
              Vid avslut raderas din transaktionsdata inom 24 timmar.</div>
          </li>
          <li>
            <Icon name="check" size={16} stroke={2.4} />
            <div><strong>Trygghet.</strong> Vårt skadeståndsansvar är begränsat till 12 månaders
              betalda avgifter, dock lägst 50 000 SEK.</div>
          </li>
        </ul>
      </Summary>

      <Clause>
        <h3>1. Definitioner</h3>
        <p><strong>1.1 Tjänsten.</strong> Den digitala plattformen Arvo Flow samt tillhörande
          ombudstjänster för att optimera Kundens leverantörsavtal.</p>
        <p><strong>1.2 Besparingsunderlag.</strong> Det belopp som ligger till grund för Besparingsavgiften,
          motsvarande skillnaden i avtalskostnad exkl. moms över en 12-månadersperiod mellan Kundens
          tidigare avtal och det nya avtalet.</p>
        <p><strong>1.3 Besparingsavgift.</strong> Det rörliga arvode om 20 % av Besparingsunderlaget
          som tillfaller Arvo Flow.</p>
      </Clause>

      <Clause>
        <h3>2. Uppdraget och Fullmakt</h3>
        <p><strong>2.1</strong> Genom signering via BankID ger Kunden Arvo Flow fullmakt att inhämta
          uppgifter, säga upp befintliga avtal samt ingå nya avtal för Kundens räkning inom de
          kategorier Kunden aktiverat i Tjänsten.</p>
        <p><strong>2.2 Ångerfrist.</strong> Kunden har rätt att återkalla sin accept av dessa villkor
          inom 24 timmar från signering. Under ångerfristen påbörjar Arvo Flow inga skarpa
          uppsägningar eller avtalstecknanden hos tredje part.</p>
      </Clause>

      <Clause>
        <h3>3. Arvode och Betalning</h3>
        <p><strong>3.1</strong> Tjänsten baseras på realiserad besparing. Inga fasta avgifter,
          uppstartsavgifter eller licensavgifter utgår.</p>
        <p><strong>3.2</strong> Besparingsavgiften faktureras kvartalsvis i efterskott, baserat
          på den besparing som faktiskt realiserats för Kunden under perioden.</p>
        <p><strong>3.3 Förtida avslut av leverantörsavtal.</strong> Om Kunden väljer att avsluta
          ett av Arvo Flow tecknat leverantörsavtal i förtid, eller på annat sätt förhindrar
          Tjänstens utförande, debiteras Besparingsavgiften proportionellt för resterande del av
          12-månadersperioden enligt ordinarie kvartalsrutin. Detta gäller ej om Kunden avbryter
          samarbetet på grund av väsentligt avtalsbrott från Arvo Flows sida.</p>
      </Clause>

      <Clause>
        <h3>4. Behörighet och Uppsägning av Tjänsten</h3>
        <p><strong>4.1 Firmateckningsverifiering.</strong> Arvo Flow verifierar via BankID-signaturens
          personnummer mot Bolagsverkets aktuella firmatecknarregister. Avtal ingås endast om
          verifieringen godkänns.</p>
        <p><strong>4.2 Uppsägning.</strong> Avtalet löper tills vidare. Båda parter kan säga upp
          Tjänsten med 30 dagars uppsägningstid. Redan påbörjade avtalsbyten slutförs och
          debiteras enligt avtal.</p>
      </Clause>

      <Clause>
        <h3>5. Ansvarsbegränsning och Risksenarier</h3>
        <p><strong>5.1 Missad uppsägning.</strong> Om Arvo Flow missar att säga upp ett befintligt
          avtal i tid, ersätter Arvo Flow mellanskillnaden upp till vid var tid gällande ansvarstak.</p>
        <p><strong>5.2 Dubbel-leverans.</strong> Om Kunden under en period har två parallella
          leverantörsavtal för samma tjänst till följd av fel från Arvo Flow, meddelar Kunden
          Arvo Flow, varvid Arvo Flow krediterar framtida avgifter eller, efter Kundens önskemål,
          utför återbetalning inom 30 dagar.</p>
        <p><strong>5.3 Ansvarstak.</strong> Arvo Flows totala skadeståndsansvar är begränsat till
          ett belopp motsvarande 100 % av de senaste 12 månadernas betalda Besparingsavgifter,
          dock lägst 50 000 SEK. Arvo Flow ansvarar ej för indirekta skador såsom utebliven vinst,
          produktionsbortfall eller goodwill-skada.</p>
      </Clause>

      <Clause>
        <h3>6. Force Majeure</h3>
        <p><strong>6.1</strong> Arvo Flow är befriat från påföljd vid underlåtenhet orsakad av
          pandemi, krig, cyberattack, myndighetsbeslut eller fel hos tredjepartsleverantör
          (t.ex. BankID, Fortnox, Visma eller leverantör vars system Tjänsten är beroende av)
          som ligger utanför Arvo Flows kontroll.</p>
      </Clause>

      <Clause>
        <h3>7. Data och Tvist</h3>
        <p><strong>7.1 Personuppgifter.</strong> Personuppgiftsbehandling regleras i separat
          Personuppgiftsbiträdesavtal (DPA), tillgänglig som bilaga till{' '}
          <Link to="/integritet">vår integritetspolicy</Link>.</p>
        <p><strong>7.2 Tvist.</strong> Tvister med anledning av dessa villkor avgörs i Stockholms
          tingsrätt enligt svensk lag.</p>
      </Clause>

      <FineprintBar>
        <strong>Arvo Flow AB</strong> · Org.nr 559500-0000 · Stockholm · Allmänna villkor v1.2 ·
        Senast uppdaterad 2026-05-13. <br />
        Tidigare versioner finns tillgängliga på begäran från{' '}
        <a href="mailto:juridik@arvo.flow" style={{ color: 'inherit', textDecoration: 'underline' }}>juridik@arvo.flow</a>.
      </FineprintBar>
    </Body>

    <Cta>
      <h2>Frågor på villkoren?</h2>
      <p>
        Mejla <a className="mail" href="mailto:juridik@arvo.flow">juridik@arvo.flow</a> så svarar vi
        inom 48 h. Vi har en svensk affärsjurist som granskat varje klausul.
      </p>
      <div className="actions">
        <Button as={Link} to="/connect" $variant="primary" $size="lg">
          Koppla Fortnox <Icon name="arrow" size={18} />
        </Button>
        <Button as={Link} to="/" $variant="secondary" $size="lg">
          Tillbaka till startsidan
        </Button>
      </div>
    </Cta>

    <Footer />
  </Page>
);

export default Villkor;
