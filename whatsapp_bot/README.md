# WhatsApp Bot (Optional)

This is a demo WhatsApp bot that connects via WhatsApp Web and calls the Hweibo backend:
- `POST /ai/prompts` for top-5 ranked catalog products
- sends back a numbered list
- user can reply `1`-`5` to receive the product image(s)

Important:
- This uses `whatsapp-web.js` (WhatsApp Web automation). It is fine for demos, but it is not the official WhatsApp Business Cloud API.
- If you plan to go public/production, use the official Cloud API (webhook-based) instead.

## Run

1) Start the backend first (ensure it can serve images on `/product_images/...`):
```bash
cd backend
source .venv/bin/activate
uvicorn app:app --reload --port 8000
```

2) Configure bot env:
```bash
cd whatsapp_bot
cp .env.example .env
```
Edit `.env` and set `BACKEND_URL` and (if backend is real mode) `HWEIBO_API_KEY`.

3) Install deps and start:
```bash
npm install
npm start
```
Scan the QR code in the terminal using WhatsApp (Linked devices).

