// src/pages/Kontoret — Arvo-kontoret, vilotillstånd (designprototyp).
// Konceptet: produkten är VAKTEN, inte fyndet (CLAUDE.md → Helheten).
// Lager som aldrig kan vara tomma: vakten · veckodomen · kollektiva sanningen ·
// maktkalendern · arvo-index · arbetets kvitton · likräkningen.
// ALL DATA NEDAN ÄR EXEMPEL — påhittad för att utvärdera känslan (regel 9).
import React from 'react';
import {
  Page, Shell, ProtoRibbon, TopRow, Ident, Radar, Verdict, Confidence,
  Grid, Truth, Index, Calendar, Receipts, Tally, Holdings, SignOff,
} from './styles';

export default function Kontoret() {
  return (
    <Page>
      <Shell>
        <ProtoRibbon><span className="dot" />Exempel · designprototyp · vilotillstånd</ProtoRibbon>

        {/* ── Identitet + Vakten ──────────────────────────────────────────── */}
        <TopRow>
          <Ident>
            <div className="brand">ARVO · LEVERANTÖRSRADAR</div>
            <div className="confidential">Konfidentiellt · Lynxeye AB · Vecka 24 · 2026</div>
            <h1>God morgon.<br />Allt är under kontroll.</h1>
          </Ident>

          <Radar>
            <div className="radar-head">
              <div className="disc">
                <svg width="46" height="46" viewBox="0 0 46 46">
                  <circle cx="23" cy="23" r="21" fill="none" stroke="rgba(93,214,202,.18)" strokeWidth="1" />
                  <circle cx="23" cy="23" r="13" fill="none" stroke="rgba(93,214,202,.14)" strokeWidth="1" />
                  <circle cx="23" cy="23" r="2" fill="#5DD6CA" />
                  <circle cx="34" cy="16" r="1.5" fill="#5DD6CA" opacity=".7" />
                  <circle cx="13" cy="30" r="1.5" fill="#5DD6CA" opacity=".5" />
                  <circle cx="31" cy="33" r="1.5" fill="#5DD6CA" opacity=".6" />
                </svg>
                <div className="sweep" />
              </div>
              <div className="radar-title">
                <strong>Vakten</strong>
                aktiv · dygnet runt
              </div>
            </div>
            <div className="radar-stats">
              <div className="rstat"><span>Leverantörer</span><span className="v">8</span></div>
              <div className="rstat"><span>Prispunkter</span><span className="v">47</span></div>
              <div className="rstat"><span>Marknadskällor</span><span className="v">40</span></div>
            </div>
            <div className="radar-foot">
              <span className="live" />
              Senaste svep i natt 03:14 · nästa ikväll
            </div>
          </Radar>
        </TopRow>

        {/* ── Veckodomen ──────────────────────────────────────────────────── */}
        <Verdict>
          <div className="eyebrow">Arvo bedömer · vecka 24</div>
          <h2>Håll kursen. Ni ligger <em>rätt mot marknaden.</em></h2>
          <p className="work">
            Vi vägde <b>47 prispunkter mot 340 bolags faktiska fakturor</b> i veckan.
            Marknaden rörde sig på två punkter — ingen träffar er ännu. Ett drag är
            redan köat: <b>vi öppnar er Telia-förhandling i augusti</b>, inför att
            avtalet blir uppsägningsbart. Ni behöver inte göra något.
          </p>
          <Confidence>
            <span className="pct">94 %</span> säkert · grundat på 340 bolags faktiska fakturor
          </Confidence>
        </Verdict>

        {/* ── Instrumentrutnät ────────────────────────────────────────────── */}
        <Grid>
          {/* Den kollektiva sanningen — moaten */}
          <Truth>
            <div className="card-eyebrow">
              <span>Den kollektiva sanningen</span>
              <span className="src">340 fakturor · live</span>
            </div>
            <h3>Telia tar <em>14 % mer</em> av er bransch än av verkstadsindustrin — för samma abonnemang.</h3>
            <div className="bars">
              <div className="barrow you">
                <span className="lbl">Er bransch</span>
                <span className="track"><span className="fill" style={{ width: '100%' }} /></span>
                <span className="amt">349 kr</span>
              </div>
              <div className="barrow">
                <span className="lbl">Marknadssnitt</span>
                <span className="track"><span className="fill" style={{ width: '88%' }} /></span>
                <span className="amt">312 kr</span>
              </div>
              <div className="barrow">
                <span className="lbl">Verkstad</span>
                <span className="track"><span className="fill" style={{ width: '86%' }} /></span>
                <span className="amt">306 kr</span>
              </div>
            </div>
            <p className="truth-note">
              Ingen jämförelsesajt och ingen konsult kan ge er den här raden — den kräver
              att man ser <b>båda branschernas faktiska fakturor</b> samtidigt. Bara Arvo gör det.
            </p>
          </Truth>

          {/* Arvo Score — marknadsrelativt */}
          <Index>
            <div className="card-eyebrow"><span>Arvo Score</span><span className="src">marknadsrelativt</span></div>
            <div className="idx-main">
              <span className="idx-num">73</span>
              <span className="idx-denom">/100</span>
              <span className="idx-delta">
                <span className="d">▲ 4</span>
                <span className="dl">sedan mars</span>
              </span>
            </div>
            <div className="spark">
              {[40, 44, 42, 50, 55, 53, 61, 66, 64, 69, 73].map((h, i) => (
                <span key={i} className={i >= 9 ? 'hot' : ''} style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="mkt-k">Marknadsläge</div>
            <div className="mkt-track"><span className="mkt-ptr" style={{ left: '62%' }} /></div>
            <div className="mkt-scale">
              <span>Under marknaden</span>
              <span className="on">I nivå</span>
              <span>Över marknaden</span>
            </div>
            <p className="idx-note">
              Ni betalar <b>i nivå med marknaden</b> sammanvägt — med enskilda utstickare (se Telia).
              Talet är relativt marknaden, inte er egen faktura: det <b>andas med marknaden</b> och
              sjunker om er bransch förhandlar ner medan ni står still.
            </p>
          </Index>

          {/* Maktkalendern */}
          <Calendar $full>
            <div className="card-eyebrow"><span>Maktkalendern · er framtida förhandlingsstyrka</span><span className="src">prognos</span></div>
            <div className="cal-row">
              <span className="cal-prob">92 %</span>
              <div className="cal-body">
                <div className="t">Telia höjer er mobilflotta i Q1</div>
                <div className="s">Historiskt mönster: höjning månaden efter årsskiftet. Vi har redan en Tele2-offert redo.</div>
              </div>
              <span className="cal-when">Motdrag i dec</span>
            </div>
            <div className="cal-row">
              <span className="cal-prob">—</span>
              <div className="cal-body">
                <div className="t">Ert Microsoft 365-avtal blir uppsägningsbart</div>
                <div className="s">3-årsbindning löper ut. Ni förhandlar från styrka — vi börjar förbereda i månad 3.</div>
              </div>
              <span className="cal-when">Om 4 mån</span>
            </div>
            <div className="cal-row">
              <span className="cal-prob">3 st</span>
              <div className="cal-body">
                <div className="t">Bolag i er kohort lämnade Telenor förra kvartalet</div>
                <div className="s">En rörelse vi bevakar — om trenden håller pressas Telenors listpriser inom kort.</div>
              </div>
              <span className="cal-when">Pågår</span>
            </div>
          </Calendar>

          {/* Arbetets kvitton */}
          <Receipts>
            <div className="card-eyebrow"><span>Vad Arvo gjorde åt er i veckan</span><span className="src">medan ni drev bolaget</span></div>
            <div className="rcpt"><span className="day">Mån</span><span className="what">Svepte <b>40 marknadskällor</b> mot era leverantörer. Inga avvikelser.</span></div>
            <div className="rcpt"><span className="day">Ons</span><span className="what">Upptäckte en <b>Tele2-prisrörelse</b> — bedömde att den inte når er flotta.</span></div>
            <div className="rcpt"><span className="day">Tor</span><span className="what">Uppdaterade er kohort-benchmark med <b>12 nya fakturor</b> i er bransch.</span></div>
            <div className="rcpt"><span className="day">Fre</span><span className="what">Förberedde underlaget för er <b>Telia-förhandling</b> inför augusti.</span></div>
          </Receipts>

          {/* Likräkningen */}
          <Tally>
            <div className="tally-k">Sedan ni började · mars 2026</div>
            <div className="tally-num">214 000 kr<small>sparat</small></div>
            <div className="tally-sub">
              <b>2 prishöjningar avvärjda</b> ni aldrig märkte. Det är vad en
              tystgående finansdirektör gör — vaktar posten så att ni kan sova.
            </div>
          </Tally>
        </Grid>

        {/* ── Innehavet (portföljen, degraderad) ──────────────────────────── */}
        <Holdings>
          <div className="h-eyebrow">Innehavet · 8 bevakade leverantörer</div>
          {[
            ['Nordic Managed IT Services', 'Programvarulicenser', '475 440 kr/år', 'Optimalt', 'opt'],
            ['SveaMobil Företag', 'Mobilabonnemang', '188 160 kr/år', 'Bevakas', 'watch'],
            ['IT-Partner Sverige', 'Programvarulicenser', '184 680 kr/år', 'Bevakas', 'watch'],
            ['Telia Sverige', 'Mobilabonnemang', '127 380 kr/år', 'Förhandling i aug', 'opt'],
            ['Svea Kontorsprint', 'Skrivarleasing', '58 800 kr/år', 'Bevakas', 'watch'],
          ].map(([name, cat, cost, state, cls]) => (
            <div className="h-row" key={name}>
              <div>
                <div className="h-name">{name}</div>
                <div className="h-cat">{cat}</div>
              </div>
              <div className="h-cost">{cost}</div>
              <div className={`h-state ${cls}`}>{state}</div>
            </div>
          ))}
        </Holdings>

        <SignOff>
          <div className="keyline" />
          <div className="mark">ARVO</div>
          <div className="tagline">Finansiell intelligens som aldrig sover.</div>
        </SignOff>
      </Shell>
    </Page>
  );
}
