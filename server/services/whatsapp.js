const axios = require("axios");

const WHATSAPP_API = "https://graph.facebook.com/v21.0";

/**
 * Send a text message to a WhatsApp number via the Cloud API.
 * @param {string} to - Recipient phone number (with country code, e.g. "46701234567")
 * @param {string} body - Message text to send
 */
async function sendMessage(to, body) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.error(
      "WhatsApp credentials missing: WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID"
    );
    return;
  }

  try {
    await axios.post(
      `${WHATSAPP_API}/${phoneNumberId}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`WhatsApp message sent to ${to}`);
  } catch (err) {
    console.error(
      "Failed to send WhatsApp message:",
      err.response?.data || err.message
    );
  }
}

/**
 * Extract the sender phone number and message text from a WhatsApp Cloud API
 * webhook payload.
 * @param {object} body - The webhook request body
 * @returns {{ from: string, text: string } | null}
 */
function parseIncomingMessage(body) {
  try {
    const entry = body?.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;

    // Only process actual messages (not status updates)
    if (!value?.messages || value.messages.length === 0) return null;

    const msg = value.messages[0];

    // We handle text messages only (for now)
    if (msg.type !== "text") return null;

    return {
      from: msg.from, // e.g. "46701234567"
      text: msg.text?.body || "",
      messageId: msg.id,
      timestamp: msg.timestamp,
    };
  } catch {
    return null;
  }
}

module.exports = { sendMessage, parseIncomingMessage };
