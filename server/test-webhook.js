/**
 * Lokalt testskript — simulerar ett inkommande WhatsApp-meddelande.
 *
 * Användning:
 *   1. Starta servern: npm run server
 *   2. I en annan terminal: node server/test-webhook.js "Jobbade 3h med design för Karlsson Foto idag"
 *
 * Du kan ange valfritt meddelande som argument. Telefonnumret
 * matchar den seedade testanvändaren (46701234567).
 */
const axios = require("axios");

const PORT = process.env.PORT || 3001;
const phone = process.argv[3] || "46701234567";
const message = process.argv[2] || "Jobbade 3 timmar med frontend för Johansson Konsult idag";

const payload = {
  object: "whatsapp_business_account",
  entry: [
    {
      id: "WHATSAPP_BUSINESS_ACCOUNT_ID",
      changes: [
        {
          value: {
            messaging_product: "whatsapp",
            metadata: {
              display_phone_number: "15550001234",
              phone_number_id: "TEST_PHONE_ID",
            },
            contacts: [{ profile: { name: "Test User" }, wa_id: phone }],
            messages: [
              {
                from: phone,
                id: `wamid.test_${Date.now()}`,
                timestamp: String(Math.floor(Date.now() / 1000)),
                text: { body: message },
                type: "text",
              },
            ],
          },
          field: "messages",
        },
      ],
    },
  ],
};

(async () => {
  console.log(`Sending test message: "${message}"`);
  console.log(`From phone: ${phone}`);
  console.log(`To: http://localhost:${PORT}/api/whatsapp-webhook\n`);

  try {
    const res = await axios.post(
      `http://localhost:${PORT}/api/whatsapp-webhook`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(`Response: ${res.status}`);
    console.log("\nCheck the server terminal for processing output.");
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
})();
