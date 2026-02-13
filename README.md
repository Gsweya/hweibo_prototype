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

### Example API request

```bash
curl -X POST http://localhost:8000/ai/prompts \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Suggest sustainable hotel essentials"}'
```
