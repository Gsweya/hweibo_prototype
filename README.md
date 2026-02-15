# Hweibo Prototype

Minimal prototype repo with a TypeScript + Tailwind frontend and a Python API backend.

## Backend profiles (prototype vs real)

The backend supports a `prototype` vs `real` mode:
- `prototype`: no external keys required, returns deterministic stub AI suggestions and stub product data.
- `real`: uses Postgres + Gemini API.

Environment variables:
- `HWEIBO_PROFILE=prototype|real`
- `DATABASE_URL=postgresql://...` or `postgresql+psycopg2://...` (required for `real`)
- `GEMINI_API_KEY=...` (required for `real`)
- `GEMINI_MODEL=gemini-flash-latest` (optional)
- `HWEIBO_API_KEY=...` (required for `real` to call `/ai/prompts`)

## Repository layout

- `frontend/`: React + TypeScript + Tailwind UI prototype.
- `backend/`: FastAPI service for AI prompt responses.
- `shared/`: Shared TypeScript types for request/response contracts.

## Running locally

### Frontend

```bash
cd frontend
bun install
bun run dev
```

The UI will be available at `http://localhost:3000`.

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload
```

The API will be available at `http://localhost:8000`.

## Docker (backend + Postgres)

1. Copy `.env.example` to `.env` and set `GEMINI_API_KEY` if using `real`.
1. Run:

```bash
docker compose up --build
```

### Seed sample products (real mode)

If you want the database populated with products that match the images in `backend/product_images/`:

```bash
docker compose run --rm backend python seed_db.py
```

To reseed (wipe and recreate demo data):

```bash
docker compose run --rm -e SEED_RESET=1 backend python seed_db.py
```

API:
- `GET http://localhost:8000/health`
- `POST http://localhost:8000/ai/prompts`

### Import agent_shopper catalog images (optional)

If you have `agent_shopper/uploads/products/` in this repo and want to import it into the Postgres schema (products + multiple images per product):

```bash
cd backend
source .venv/bin/activate
export DATABASE_URL='postgresql://...'
export IMPORT_STORE_NAME='Kibo Store'
export IMPORT_STORE_REGION='Dodoma'
export IMPORT_STORE_CITY='Dodoma'
python import_agent_shopper_uploads.py
```

To wipe previously-imported products/images for that seller and re-import:

```bash
export IMPORT_RESET=1
python import_agent_shopper_uploads.py
```

## WhatsApp (optional)

There is a demo WhatsApp bot in `whatsapp_bot/` that connects via WhatsApp Web and calls the backend `/ai/prompts`.
See `whatsapp_bot/README.md`.

### Example API request

```bash
curl -X POST http://localhost:8000/ai/prompts \
  -H "Content-Type: application/json" \
  -H "X-Hweibo-Api-Key: $HWEIBO_API_KEY" \
  -d '{"prompt": "Suggest sustainable hotel essentials"}'
```

Response notes:
- Always returns exactly 5 ranked products (from the catalog) with image URLs.
- In `HWEIBO_PROFILE=real`, `/ai/prompts` requires `HWEIBO_API_KEY` (send via `X-Hweibo-Api-Key` or `Authorization: Bearer ...`).
