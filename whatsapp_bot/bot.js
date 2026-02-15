require("dotenv").config();

const axios = require("axios");
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");

const BACKEND_URL = (process.env.BACKEND_URL || "http://localhost:8000").trim().replace(/\/+$/, "");
const HWEIBO_API_KEY = (process.env.HWEIBO_API_KEY || "").trim();
const HEADLESS = String(process.env.HEADLESS || "true").toLowerCase() !== "false";
const MAX_HISTORY = Math.max(5, Math.min(parseInt(process.env.MAX_HISTORY || "20", 10) || 20, 50));

// chatId/user -> { last_products: RankedProduct[], history: [{role, content}] }
const stateByUser = new Map();

function getState(user) {
  if (!stateByUser.has(user)) stateByUser.set(user, { last_products: [], history: [] });
  return stateByUser.get(user);
}

function pushHistory(st, role, content) {
  st.history.push({ role, content: String(content || "") });
  if (st.history.length > MAX_HISTORY) st.history = st.history.slice(-MAX_HISTORY);
}

function formatPrice(p) {
  try {
    const cents = Number(p.price_cents || 0);
    const cur = String(p.currency || "USD");
    const amt = (cents / 100).toFixed(2);
    return `${cur} ${amt}`;
  } catch {
    return "";
  }
}

function isSelection(text) {
  const m = String(text || "").trim().match(/^#?\s*([1-5])\s*$/);
  if (!m) return null;
  return parseInt(m[1], 10);
}

async function callAiPrompts(prompt) {
  const headers = { "Content-Type": "application/json" };
  if (HWEIBO_API_KEY) headers["X-Hweibo-Api-Key"] = HWEIBO_API_KEY;
  const res = await axios.post(
    `${BACKEND_URL}/ai/prompts`,
    { prompt },
    { headers, timeout: 45000 }
  );
  return res.data;
}

async function trySendImages(msg, images) {
  if (!Array.isArray(images) || images.length === 0) return false;

  let sentAny = false;
  for (const raw of images) {
    const rel = String(raw || "").trim();
    if (!rel) continue;

    // backend returns relative paths like /product_images/...
    const url = rel.startsWith("http") ? rel : `${BACKEND_URL}${rel.startsWith("/") ? "" : "/"}${rel}`;

    try {
      const media = await MessageMedia.fromUrl(url);
      await msg.reply(media);
      sentAny = true;
    } catch (e) {
      // If WhatsApp can't render the format (common for .avif), fall back to sending the link.
      await msg.reply(`Image: ${url}`);
    }
  }
  return sentAny;
}

function formatRecommendationList(products) {
  const lines = [];
  lines.push("Top matches (reply 1-5 to see images):");
  for (const p of products) {
    const n = p.rank || products.indexOf(p) + 1;
    const price = formatPrice(p);
    const cat = p.category ? ` | ${p.category}` : "";
    lines.push(`${n}. ${p.title}${cat}${price ? ` | ${price}` : ""}`);
  }
  return lines.join("\n");
}

const client = new Client({
  authStrategy: new LocalAuth({ clientId: "hweibo-whatsapp-bot" }),
  puppeteer: {
    headless: HEADLESS,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  },
});

client.on("qr", (qr) => {
  console.log("Scan QR to connect WhatsApp (Linked devices):");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log(`Bot ready. Using backend: ${BACKEND_URL}`);
});

client.on("message_create", async (msg) => {
  if (msg.fromMe) return;

  const chat = await msg.getChat();
  if (chat.isGroup) return;

  const contact = await msg.getContact();
  const user = contact.id.user || msg.from;
  const text = (msg.body || "").trim();
  if (!text) return;

  const st = getState(user);
  pushHistory(st, "user", text);

  // Selection flow
  const sel = isSelection(text);
  if (sel) {
    const p = st.last_products[sel - 1];
    if (!p) {
      await msg.reply("No previous results. Send a product request first.");
      return;
    }
    const details = [
      `${sel}. ${p.title}`,
      p.category ? `Category: ${p.category}` : null,
      `Price: ${formatPrice(p)}`,
      p.description ? `About: ${p.description}` : null,
    ].filter(Boolean);
    await msg.reply(details.join("\n"));
    await trySendImages(msg, p.images);
    return;
  }

  // Simple help
  if (/^(help|menu|start)$/i.test(text)) {
    await msg.reply(
      [
        "Send a message describing what you want (example: 'laptop for programming under 800').",
        "I will reply with 5 ranked products.",
        "Reply with 1-5 to receive the images for that product.",
      ].join("\n")
    );
    return;
  }

  // Main: get 5 ranked products from backend
  try {
    const data = await callAiPrompts(text);
    const products = Array.isArray(data.products) ? data.products : [];
    if (products.length !== 5) {
      await msg.reply("I couldn't find 5 matching products right now. Try rephrasing your request.");
      return;
    }
    // Ensure rank order for selection indexing
    products.sort((a, b) => (a.rank || 0) - (b.rank || 0));
    st.last_products = products;
    pushHistory(st, "assistant", "sent_recommendations");
    await msg.reply(formatRecommendationList(products));
  } catch (e) {
    const status = e?.response?.status;
    if (status === 401) {
      await msg.reply("Backend rejected the request (unauthorized). Check HWEIBO_API_KEY in whatsapp_bot/.env.");
      return;
    }
    await msg.reply("Sorry, I hit an error talking to the backend. Try again in a moment.");
  }
});

client.initialize().catch((e) => {
  console.error("Failed to initialize WhatsApp client:", e?.message || e);
});

