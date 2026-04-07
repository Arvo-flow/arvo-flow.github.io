require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const whatsappRouter = require("./routes/whatsapp");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ── API Routes ──────────────────────────────────────────────────────
app.use("/api/whatsapp-webhook", whatsappRouter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Serve React build in production ─────────────────────────────────
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "build")));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Arvo server running on http://localhost:${PORT}`);
  console.log(`WhatsApp webhook: http://localhost:${PORT}/api/whatsapp-webhook`);
});
