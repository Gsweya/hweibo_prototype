# Hweibo Prototype

Minimal prototype repo with a TypeScript + Tailwind frontend and a Python API backend.

## Repository layout

- `frontend/`: React + TypeScript + Tailwind UI prototype.
- `backend/`: FastAPI service for AI prompt responses.
- `shared/`: Shared TypeScript types for request/response contracts.

## Running locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The UI will be available at `http://localhost:5173`.

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload
```

The API will be available at `http://localhost:8000`.

### Example API request

```bash
curl -X POST http://localhost:8000/ai/prompts \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Suggest sustainable hotel essentials"}'
```
