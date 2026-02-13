"""
Seed the Postgres database with sample data and image URLs from ./product_images.

Usage (local):
  export DATABASE_URL="postgresql://user:pass@localhost:5432/hweibo"
  python seed_db.py

Usage (docker compose):
  docker compose run --rm backend python seed_db.py
"""

from __future__ import annotations

import os
from pathlib import Path

from sqlalchemy import text
from sqlmodel import Session, SQLModel, create_engine, select

from app import (
    Plan,
    Product,
    ProductImage,
    Subscription,
    SubscriptionStatus,
    User,
    UserRole,
    _normalize_database_url,
)


def _title_from_filename(name: str) -> str:
    base = name.rsplit(".", 1)[0]
    base = base.replace("-", " ").replace("_", " ").strip()
    return " ".join([w.capitalize() if w.lower() not in {"and", "or", "of"} else w.lower() for w in base.split()])


def _guess_category(path: Path) -> str:
    parts = [p.lower() for p in path.parts]
    if "laptops" in parts:
        return "Laptops"
    if "shoes" in parts:
        return "Shoes"
    return "Accessories"


def _guess_price_cents(category: str, title: str) -> int:
    t = title.lower()
    if category == "Laptops":
        if "macbook" in t:
            return 219900
        if "xps" in t:
            return 189900
        if "legion" in t:
            return 159900
        return 74900
    if category == "Shoes":
        if "nike" in t:
            return 15900
        return 9900
    if "camera" in t or "canon" in t:
        return 89900
    return 4900


def _description_for(category: str, title: str) -> str:
    if category == "Laptops":
        return (
            f"{title} is built for a clean, modern workflow: fast startup, smooth multitasking, "
            "and a lightweight design that fits everyday study and work."
        )
    if category == "Shoes":
        return (
            f"{title} delivers comfort for daily wear with a supportive fit, durable outsole, "
            "and a style that works across casual and active looks."
        )
    return f"{title} is a curated pick in the Hweibo demo catalog with a minimalist, high-quality finish."


def main() -> None:
    database_url = os.getenv("DATABASE_URL", "").strip()
    if not database_url:
        raise SystemExit("Missing DATABASE_URL. Example: postgresql://hweibo:hweibo_password@localhost:5432/hweibo")

    reset = os.getenv("SEED_RESET", "0").strip() in {"1", "true", "yes", "y"}
    engine = create_engine(_normalize_database_url(database_url))

    SQLModel.metadata.create_all(engine)

    images_root = Path(__file__).resolve().parent / "product_images"
    image_files = [p for p in images_root.rglob("*") if p.is_file()]
    image_files.sort()

    with Session(engine) as session:
        existing = session.exec(select(Product).limit(1)).first()
        if existing and not reset:
            print("Seed skipped: products already exist. Set SEED_RESET=1 to reseed.")
            return

        if reset:
            # Demo-friendly reset: clear dependent tables first.
            session.exec(text("DELETE FROM productimage"))
            session.exec(text("DELETE FROM product"))
            session.exec(text("DELETE FROM subscription"))
            session.exec(text("DELETE FROM plan"))
            session.exec(text("DELETE FROM buyerprofile"))
            session.exec(text("DELETE FROM sellerprofile"))
            session.exec(text('DELETE FROM "user"'))
            session.commit()

        seller = User(email="seller@hweibo.local", password_hash="demo", role=UserRole.seller)
        buyer = User(email="buyer@hweibo.local", password_hash="demo", role=UserRole.buyer)
        admin = User(email="admin@hweibo.local", password_hash="demo", role=UserRole.admin)
        session.add(seller)
        session.add(buyer)
        session.add(admin)
        session.commit()
        session.refresh(seller)

        plans = [
            Plan(code="starter", name="Starter", price_cents_monthly=0, currency="USD", is_active=True),
            Plan(code="pro", name="Pro", price_cents_monthly=1900, currency="USD", is_active=True),
            Plan(code="business", name="Business", price_cents_monthly=4900, currency="USD", is_active=True),
        ]
        session.add_all(plans)
        session.commit()

        # Activate a subscription for the sample seller.
        pro = session.exec(select(Plan).where(Plan.code == "pro")).first()
        if pro:
            session.add(Subscription(seller_id=seller.id, plan_id=pro.id, status=SubscriptionStatus.active))
            session.commit()

        # Create products based on image files.
        created = 0
        for img_path in image_files:
            rel = img_path.relative_to(images_root).as_posix()
            url = f"/product_images/{rel}"
            category = _guess_category(img_path)
            title = _title_from_filename(img_path.name)
            price_cents = _guess_price_cents(category, title)
            description = _description_for(category, title)

            product = Product(
                seller_id=seller.id,
                title=title,
                description=description,
                category=category,
                price_cents=price_cents,
                currency="USD",
                is_active=True,
            )
            session.add(product)
            session.commit()
            session.refresh(product)

            session.add(ProductImage(product_id=product.id, url=url, alt_text=title, sort_order=0))
            session.commit()
            created += 1

        print(f"Seed complete: {created} products created from {images_root}.")


if __name__ == "__main__":
    main()
