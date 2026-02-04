from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Hweibo Prototype API")


class PromptRequest(BaseModel):
    prompt: str


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok"}


@app.post("/ai/prompts")
def ai_prompt(request: PromptRequest) -> dict:
    suggestions = [
        "Bamboo toothbrush starter kit",
        "Refillable glass cleaning spray",
        "Zero-waste travel toiletries",
        "Compostable cutlery set",
        "Organic cotton bedding set",
    ]
    return {
        "prompt": request.prompt,
        "products": suggestions,
    }
