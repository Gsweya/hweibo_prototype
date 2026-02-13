"""
Hweibo backend API (FastAPI).

Key requirements supported here:
- Postgres schema (for "real" mode)
- Profile switch: prototype vs real
- Gemini API integration for AI suggestions (real mode), with deterministic stub (prototype)
"""

from __future__ import annotations

import os
from datetime import datetime, timezone
from enum import Enum
from typing import Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from sqlmodel import Field as SQLField
from sqlmodel import Relationship, SQLModel, Session, create_engine, select

try:
    # Official Gemini SDK (recommended by Google docs).
    from google import genai  # type: ignore
except Exception:  # pragma: no cover
    genai = None


class ProfileMode(str, Enum):
    prototype = "prototype"
    real = "real"


def _env(name: str, default: Optional[str] = None) -> Optional[str]:
    value = os.getenv(name)
    if value is None or value.strip() == "":
        return default
    return value


HWEIBO_PROFILE = ProfileMode(_env("HWEIBO_PROFILE", "prototype"))
DATABASE_URL = _env("DATABASE_URL")  # required when HWEIBO_PROFILE=real
GEMINI_API_KEY = _env("GEMINI_API_KEY")  # required when HWEIBO_PROFILE=real
GEMINI_MODEL = _env("GEMINI_MODEL", "gemini-flash-latest")


# ----------------------------
# Database schema (Postgres)
# ----------------------------

class UserRole(str, Enum):
    buyer = "buyer"
    seller = "seller"
    admin = "admin"


class User(SQLModel, table=True):
    id: Optional[int] = SQLField(default=None, primary_key=True)
    email: str = SQLField(index=True, unique=True)
    password_hash: str
    role: UserRole = SQLField(index=True)
    is_active: bool = True
    created_at: datetime = SQLField(default_factory=lambda: datetime.now(timezone.utc))

    buyer_profile: Optional["BuyerProfile"] = Relationship(back_populates="user")
    seller_profile: Optional["SellerProfile"] = Relationship(back_populates="user")


class BuyerProfile(SQLModel, table=True):
    id: Optional[int] = SQLField(default=None, primary_key=True)
    user_id: int = SQLField(foreign_key="user.id", index=True, unique=True)
    display_name: str = ""
    phone: str = ""
    shipping_address: str = ""
    created_at: datetime = SQLField(default_factory=lambda: datetime.now(timezone.utc))

    user: User = Relationship(back_populates="buyer_profile")


class SellerProfile(SQLModel, table=True):
    id: Optional[int] = SQLField(default=None, primary_key=True)
    user_id: int = SQLField(foreign_key="user.id", index=True, unique=True)
    store_name: str = ""
    store_description: str = ""
    created_at: datetime = SQLField(default_factory=lambda: datetime.now(timezone.utc))

    user: User = Relationship(back_populates="seller_profile")


class Product(SQLModel, table=True):
    id: Optional[int] = SQLField(default=None, primary_key=True)
    seller_id: int = SQLField(foreign_key="user.id", index=True)
    title: str = SQLField(index=True)
    description: str = ""
    category: str = SQLField(default="", index=True)
    price_cents: int = 0
    currency: str = "USD"
    is_active: bool = True
    created_at: datetime = SQLField(default_factory=lambda: datetime.now(timezone.utc))

    images: list["ProductImage"] = Relationship(back_populates="product")


class ProductImage(SQLModel, table=True):
    id: Optional[int] = SQLField(default=None, primary_key=True)
    product_id: int = SQLField(foreign_key="product.id", index=True)
    url: str
    alt_text: str = ""
    sort_order: int = 0

    product: Product = Relationship(back_populates="images")


class Cart(SQLModel, table=True):
    id: Optional[int] = SQLField(default=None, primary_key=True)
    buyer_id: int = SQLField(foreign_key="user.id", index=True, unique=True)
    updated_at: datetime = SQLField(default_factory=lambda: datetime.now(timezone.utc))

    items: list["CartItem"] = Relationship(back_populates="cart")


class CartItem(SQLModel, table=True):
    id: Optional[int] = SQLField(default=None, primary_key=True)
    cart_id: int = SQLField(foreign_key="cart.id", index=True)
    product_id: int = SQLField(foreign_key="product.id", index=True)
    quantity: int = 1

    cart: Cart = Relationship(back_populates="items")


class OrderStatus(str, Enum):
    pending = "pending"
    paid = "paid"
    shipped = "shipped"
    completed = "completed"
    cancelled = "cancelled"


class Order(SQLModel, table=True):
    id: Optional[int] = SQLField(default=None, primary_key=True)
    buyer_id: int = SQLField(foreign_key="user.id", index=True)
    status: OrderStatus = SQLField(default=OrderStatus.pending, index=True)
    total_cents: int = 0
    currency: str = "USD"
    created_at: datetime = SQLField(default_factory=lambda: datetime.now(timezone.utc))

    items: list["OrderItem"] = Relationship(back_populates="order")


class OrderItem(SQLModel, table=True):
    id: Optional[int] = SQLField(default=None, primary_key=True)
    order_id: int = SQLField(foreign_key="order.id", index=True)
    product_id: int = SQLField(foreign_key="product.id", index=True)
    quantity: int = 1
    unit_price_cents: int = 0

    order: Order = Relationship(back_populates="items")


class PaymentStatus(str, Enum):
    initiated = "initiated"
    succeeded = "succeeded"
    failed = "failed"


class Payment(SQLModel, table=True):
    id: Optional[int] = SQLField(default=None, primary_key=True)
    order_id: int = SQLField(foreign_key="order.id", index=True, unique=True)
    status: PaymentStatus = SQLField(default=PaymentStatus.initiated, index=True)
    provider: str = "demo"
    provider_ref: str = ""
    created_at: datetime = SQLField(default_factory=lambda: datetime.now(timezone.utc))


class Plan(SQLModel, table=True):
    id: Optional[int] = SQLField(default=None, primary_key=True)
    code: str = SQLField(index=True, unique=True)
    name: str
    price_cents_monthly: int = 0
    currency: str = "USD"
    is_active: bool = True


class SubscriptionStatus(str, Enum):
    active = "active"
    paused = "paused"
    cancelled = "cancelled"


class Subscription(SQLModel, table=True):
    id: Optional[int] = SQLField(default=None, primary_key=True)
    seller_id: int = SQLField(foreign_key="user.id", index=True, unique=True)
    plan_id: int = SQLField(foreign_key="plan.id", index=True)
    status: SubscriptionStatus = SQLField(default=SubscriptionStatus.active, index=True)
    started_at: datetime = SQLField(default_factory=lambda: datetime.now(timezone.utc))


class Chat(SQLModel, table=True):
    id: Optional[int] = SQLField(default=None, primary_key=True)
    buyer_id: int = SQLField(foreign_key="user.id", index=True)
    created_at: datetime = SQLField(default_factory=lambda: datetime.now(timezone.utc))

    messages: list["Message"] = Relationship(back_populates="chat")


class Message(SQLModel, table=True):
    id: Optional[int] = SQLField(default=None, primary_key=True)
    chat_id: int = SQLField(foreign_key="chat.id", index=True)
    sender: str = SQLField(index=True)  # "buyer" | "assistant"
    content: str
    created_at: datetime = SQLField(default_factory=lambda: datetime.now(timezone.utc))

    chat: Chat = Relationship(back_populates="messages")


class AuditLog(SQLModel, table=True):
    id: Optional[int] = SQLField(default=None, primary_key=True)
    actor_user_id: Optional[int] = SQLField(default=None, foreign_key="user.id", index=True)
    action: str = SQLField(index=True)
    entity: str = SQLField(index=True)
    entity_id: str = SQLField(index=True)
    metadata_json: str = ""
    created_at: datetime = SQLField(default_factory=lambda: datetime.now(timezone.utc))


def _normalize_database_url(url: str) -> str:
    """
    Accept postgres URLs with or without an explicit driver.

    On Python versions where psycopg2 wheels may not exist (e.g. 3.14),
    we allow `pg8000` as a pure-Python fallback by rewriting the URL if needed.
    """
    if url.startswith("postgres://"):
        # SQLAlchemy expects postgresql://
        url = "postgresql://" + url.removeprefix("postgres://")

    # If the user already specified a driver, respect it.
    if url.startswith("postgresql+"):
        return url

    # No driver specified (postgresql://...). Choose a usable default.
    try:
        import psycopg2  # type: ignore  # noqa: F401

        return "postgresql+psycopg2://" + url.removeprefix("postgresql://")
    except Exception:
        return "postgresql+pg8000://" + url.removeprefix("postgresql://")


engine = (
    create_engine(_normalize_database_url(DATABASE_URL))
    if (HWEIBO_PROFILE == ProfileMode.real and DATABASE_URL)
    else None
)


def create_db_and_tables() -> None:
    if engine is None:
        return
    SQLModel.metadata.create_all(engine)


# ----------------------------
# API models
# ----------------------------

class PromptRequest(BaseModel):
    prompt: str = Field(min_length=1, max_length=2000)


class PromptResponse(BaseModel):
    prompt: str
    products: list[str]
    mode: ProfileMode
    model: Optional[str] = None


app = FastAPI(title="Hweibo API", version="0.2.0")


@app.on_event("startup")
def _startup() -> None:
    # For a student/demo app, table auto-create is acceptable. For production, migrate with Alembic.
    create_db_and_tables()


@app.get("/health")
def health_check() -> dict:
    return {
        "status": "ok",
        "profile": HWEIBO_PROFILE,
        "db": "enabled" if engine is not None else "disabled",
    }


def _prototype_suggestions(prompt: str) -> list[str]:
    # Deterministic stub for demos without external API keys.
    seed = prompt.lower()
    if "laptop" in seed:
        return ["MacBook Pro 16-inch (refurb)", "ASUS Zenbook 14", "Dell XPS 13"]
    if "shoes" in seed or "sneaker" in seed:
        return ["Nike Air Max 720", "Puma Sport Runner", "Adidas Ultraboost"]
    return [
        "Bamboo toothbrush starter kit",
        "Refillable glass cleaning spray",
        "Zero-waste travel toiletries",
        "Compostable cutlery set",
        "Organic cotton bedding set",
    ]


def _gemini_suggestions(prompt: str) -> list[str]:
    if genai is None:
        raise HTTPException(status_code=500, detail="Gemini SDK not installed. Add 'google-genai' to requirements.")
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Missing GEMINI_API_KEY for real mode.")

    client = genai.Client(api_key=GEMINI_API_KEY)
    system = (
        "You are Hweibo's product finder. "
        "Return a concise list of 5 product names that match the user's request. "
        "No numbering, no extra commentary, one product per line."
    )
    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=f"{system}\n\nUser request: {prompt}",
    )
    text = (response.text or "").strip()
    if not text:
        return []
    # Parse: one item per line; filter empties.
    items = [line.strip("-• \t").strip() for line in text.splitlines()]
    return [x for x in items if x]


@app.post("/ai/prompts", response_model=PromptResponse)
def ai_prompt(request: PromptRequest) -> PromptResponse:
    if HWEIBO_PROFILE == ProfileMode.prototype:
        return PromptResponse(
            prompt=request.prompt,
            products=_prototype_suggestions(request.prompt),
            mode=HWEIBO_PROFILE,
            model=None,
        )

    # real mode
    products = _gemini_suggestions(request.prompt)
    return PromptResponse(
        prompt=request.prompt,
        products=products,
        mode=HWEIBO_PROFILE,
        model=GEMINI_MODEL,
    )


@app.get("/products")
def list_products(limit: int = 25) -> list[dict]:
    # Minimal endpoint to support buyer browse/search pages.
    if HWEIBO_PROFILE == ProfileMode.prototype or engine is None:
        return [
            {"id": 1, "title": "Canon Camera", "price_cents": 89900, "currency": "USD"},
            {"id": 2, "title": "MacBook Pro 16", "price_cents": 219900, "currency": "USD"},
        ][: max(1, min(limit, 50))]

    with Session(engine) as session:
        rows = session.exec(select(Product).where(Product.is_active == True).limit(min(limit, 50))).all()  # noqa: E712
        return [
            {
                "id": p.id,
                "title": p.title,
                "description": p.description,
                "category": p.category,
                "price_cents": p.price_cents,
                "currency": p.currency,
            }
            for p in rows
        ]


if __name__ == "__main__":
    # Convenience for local runs:
    # Prefer: `uvicorn app:app --reload`
    import uvicorn

    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(app, host="0.0.0.0", port=port)
