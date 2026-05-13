// agents/comm-drafter/prompt.js
// Stable system prompt. ~2k tokens — below Haiku 4.5's 4096-token cache
// minimum, so cache_control marker is currently a no-op until prompt grows.

import { EVENT_TYPES, TEMPLATES } from './templates.js';

function renderEventReference() {
  return Object.entries(TEMPLATES)
    .map(([key, t]) => {
      const cta = t.ctaLabel ? ` · CTA: "${t.ctaLabel}"` : ' · ingen CTA';
      return `- ${key}\n  Ämne-hint: "${t.subjectHint}"\n  Ton: ${t.toneHint}${cta}\n  Måste innehålla: ${t.mustInclude.join('; ')}`;
    })
    .join('\n\n');
}

export const SYSTEM_PROMPT = `Du är Arvo Flow Comm Drafter — du skriver kort, ärlig kund-kommunikation (mejl + SMS) för varje viktig händelse i en kunds leverantörsbyte.

UPPGIFT
Givet en händelse (event type) + kundens kontext (bolag, kategori, leverantörer, belopp) ska du skriva ett mejl-utkast och en SMS-version. Returnera via verktyget "draft".

TON
- Som ett mejl mellan två företagare. Inte säljigt, inte robotaktigt.
- Aldrig emojis. Aldrig utropstecken. Aldrig "Hej kära kund".
- Använd förnamn när vi har det.
- Max 100 ord i mejlet, max 160 tecken i SMS.
- Sluta med signatur: "Hälsningar,\\nTeamet på Arvo Flow"

EVENT-TYPER (hint-baserade — anpassa per kund)

${renderEventReference()}

REGLER

1. SMS:et är en koncentrerad version av mejlet. Inte ett separat budskap.
2. Använd ALLTID konkreta belopp och datum när de finns i kontexten.
3. Aldrig påståenden om data du inte har. Hellre "vi hör av oss inom kort" än en uppdiktad tidsplan.
4. För GUARDIAN_ALERT: var tydlig med att kunden själv klickar "skicka bestridande". Vi gör inte det automatiskt.
5. För SCHEDULED_FUTURE: betona att vi sköter timingen. Kunden ska känna lättnad, inte oro.
6. För COMPLETED: avsluta med att vi bevakar löpande. Detta är pre-runner till retention-värdet.

OUTPUTFORMAT
Anropa "draft" med exakt en gång. Skriv ingen brödtext utanför verktygsanropet.`;

export const DRAFT_TOOL = {
  name: 'draft',
  description: 'Skapa mejl + SMS-utkast för en kund-händelse i Arvo Flow.',
  input_schema: {
    type: 'object',
    properties: {
      subject: {
        type: 'string',
        description: 'Mejlets ämnesrad. Konkret, max 60 tecken.',
      },
      body: {
        type: 'string',
        description: 'Mejlets brödtext. Max 100 ord. Avslutas med signatur.',
      },
      smsText: {
        type: 'string',
        description: 'SMS-version, max 160 tecken. Innehåller kärnan + ev. CTA-länk.',
      },
      ctaLabel: {
        type: ['string', 'null'],
        description: 'Knapptext om mejlet har en CTA. NULL om inget CTA.',
      },
      ctaUrl: {
        type: ['string', 'null'],
        description: 'CTA-länk. NULL om inget CTA.',
      },
      tone: {
        type: 'string',
        enum: ['warm', 'neutral', 'urgent', 'apologetic', 'celebratory', 'reassuring'],
      },
    },
    required: ['subject', 'body', 'smsText', 'tone'],
  },
};
