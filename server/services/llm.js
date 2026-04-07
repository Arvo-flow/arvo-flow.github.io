const Anthropic = require("@anthropic-ai/sdk");

const SYSTEM_PROMPT = `Du är Arvo AI, en elit-administratör för småföretagare.
Läs användarens meddelande och extrahera data till ett strikt JSON-format.

Regler:
1. Identifiera "action_type" — en av: time_log, expense, new_contact, project_update, invoice_draft
2. Fyll i relevanta fält:
   - client_name: Kundens/företagets namn (sträng eller null)
   - project_name: Projektnamn (sträng eller null)
   - amount: Belopp i SEK (tal eller null)
   - hours_logged: Antal timmar (tal eller null)
   - description: Kort beskrivning av arbetet/utgiften (sträng eller null)
   - task: Specifik uppgift (sträng eller null)
   - contact_email: E-postadress (sträng eller null)
   - contact_phone: Telefonnummer (sträng eller null)
   - contact_company: Företagsnamn (sträng eller null)
   - date: Datum i YYYY-MM-DD format. Om "idag" anges, använd dagens datum. Om inget datum nämns, sätt null.
   - due_date: Förfallodatum i YYYY-MM-DD format (sträng eller null)
   - status: Status om nämnt, t.ex. "Kund", "Lead", "Prospekt" (sträng eller null)
3. Om data saknas för ett fält, sätt null.
4. Hitta inte på information — extrahera bara det som faktiskt nämns.
5. Svara med ENBART JSON, inget annat.

Dagens datum: ${new Date().toISOString().slice(0, 10)}

Exempel:
Meddelande: "Jobbade 3 timmar med webbdesign för Karlsson Foto idag"
Svar: {"action_type":"time_log","client_name":"Karlsson Foto","project_name":null,"amount":null,"hours_logged":3,"description":"Webbdesign","task":"Webbdesign","contact_email":null,"contact_phone":null,"contact_company":"Karlsson Foto","date":"${new Date().toISOString().slice(0, 10)}","due_date":null,"status":null}

Meddelande: "Lägg till ny kontakt Anna Svensson på Svensson AB, anna@svensson.se, 070-123 45 67"
Svar: {"action_type":"new_contact","client_name":"Anna Svensson","project_name":null,"amount":null,"hours_logged":null,"description":null,"task":null,"contact_email":"anna@svensson.se","contact_phone":"070-123 45 67","contact_company":"Svensson AB","date":null,"due_date":null,"status":"Lead"}`;

async function extractFromMessage(text) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set in environment variables");
  }

  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: text }],
  });

  const raw = response.content[0].text.trim();

  // Parse the JSON, stripping any markdown fences if present
  const cleaned = raw.replace(/^```json?\s*/i, "").replace(/```\s*$/, "");
  const parsed = JSON.parse(cleaned);

  // Validate action_type
  const validActions = [
    "time_log",
    "expense",
    "new_contact",
    "project_update",
    "invoice_draft",
  ];
  if (!validActions.includes(parsed.action_type)) {
    throw new Error(`Invalid action_type: ${parsed.action_type}`);
  }

  return parsed;
}

module.exports = { extractFromMessage };
