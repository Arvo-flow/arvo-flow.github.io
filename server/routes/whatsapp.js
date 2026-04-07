const express = require("express");
const router = express.Router();
const {
  findUserByPhone,
  insertContact,
  insertTimeEntry,
  insertExpense,
  insertInvoiceDraft,
  updateProject,
  getNextInvoiceNumber,
} = require("../db");
const { extractFromMessage } = require("../services/llm");
const { sendMessage, parseIncomingMessage } = require("../services/whatsapp");

// ── Steg 1: GET — Meta webhook-verifiering ──────────────────────────
router.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log("Webhook verified successfully");
    return res.status(200).send(challenge);
  }

  console.warn("Webhook verification failed — token mismatch");
  return res.sendStatus(403);
});

// ── Steg 1-5: POST — Ta emot inkommande meddelanden ────────────────
router.post("/", async (req, res) => {
  // Always respond 200 immediately so Meta doesn't retry
  res.sendStatus(200);

  const incoming = parseIncomingMessage(req.body);
  if (!incoming) return; // Status update or unsupported message type

  const { from, text } = incoming;
  console.log(`Incoming WhatsApp from ${from}: "${text}"`);

  // ── Steg 2: Säkerhet & Användarkoppling ─────────────────────────
  const user = findUserByPhone.get(from, from, from);
  if (!user) {
    console.warn(`Unauthorized phone number: ${from}`);
    await sendMessage(
      from,
      "Obehörigt nummer. Vänligen registrera detta nummer i Arvo."
    );
    return;
  }

  const userId = user.id;
  console.log(`Matched user: ${user.name} (id=${userId})`);

  try {
    // ── Steg 3: LLM-Extraktion ───────────────────────────────────
    const extracted = await extractFromMessage(text);
    console.log("LLM extracted:", JSON.stringify(extracted));

    // ── Steg 4: Databas-injektion ────────────────────────────────
    let summary = "";
    const today = new Date().toISOString().slice(0, 10);

    switch (extracted.action_type) {
      case "time_log": {
        const hours = extracted.hours_logged || 0;
        const project = extracted.project_name || extracted.client_name || "Okänt projekt";
        const task = extracted.task || extracted.description || "";
        insertTimeEntry.run({
          user_id: userId,
          project,
          task,
          date: extracted.date || today,
          hours,
        });
        summary = `${hours}h loggat på "${project}"${task ? ` (${task})` : ""}`;
        break;
      }

      case "expense": {
        const amount = extracted.amount || 0;
        const desc = extracted.description || "Utgift";
        insertExpense.run({
          user_id: userId,
          description: desc,
          amount,
          client: extracted.client_name || null,
          project: extracted.project_name || null,
          date: extracted.date || today,
        });
        summary = `Utgift registrerad: ${desc} — ${amount} kr`;
        break;
      }

      case "new_contact": {
        const name = extracted.client_name || "Okänd";
        insertContact.run({
          user_id: userId,
          name,
          company: extracted.contact_company || null,
          email: extracted.contact_email || null,
          phone: extracted.contact_phone || null,
          status: extracted.status || "Lead",
          value: extracted.amount || 0,
          notes: extracted.description || null,
        });
        summary = `Ny kontakt skapad: ${name}${extracted.contact_company ? ` (${extracted.contact_company})` : ""}`;
        break;
      }

      case "project_update": {
        const projName = extracted.project_name || extracted.client_name || "";
        if (!projName) {
          summary = "Kunde inte identifiera projekt att uppdatera.";
          break;
        }
        updateProject.run({
          user_id: userId,
          name: projName,
          status: extracted.status || null,
          progress: null,
          spent: extracted.amount || null,
        });
        summary = `Projekt "${projName}" uppdaterat${extracted.status ? ` — status: ${extracted.status}` : ""}`;
        break;
      }

      case "invoice_draft": {
        const client = extracted.client_name || "Okänd kund";
        const amount = extracted.amount || 0;
        const invNum = getNextInvoiceNumber(userId);
        insertInvoiceDraft.run({
          user_id: userId,
          invoice_number: invNum,
          client,
          amount,
          description: extracted.description || null,
          due_date: extracted.due_date || null,
        });
        summary = `Fakturautkast skapat: ${invNum} till ${client} — ${amount} kr`;
        break;
      }

      default:
        summary = "Kunde inte tolka meddelandet. Försök igen.";
    }

    // ── Steg 5: WhatsApp-bekräftelse ─────────────────────────────
    await sendMessage(from, `Loggat i Arvo: ${summary}`);
    console.log(`Action completed: ${summary}`);
  } catch (err) {
    console.error("Processing error:", err);
    await sendMessage(
      from,
      "Något gick fel vid bearbetningen. Försök igen eller kontakta support."
    );
  }
});

module.exports = router;
