"""
Import products + images from agent_shopper uploads/ into the Hweibo Postgres schema.

Source layout (agent_shopper):
  agent_shopper/uploads/products/<Category>/<product-slug>/{1_main,2_angle,3_back,4_lifestyle}.{jpg,png,...}

Target layout (Hweibo):
  backend/product_images/sellers/<seller_id>/<Category>/<product-slug>/<filename>
  URL stored in DB:
    /product_images/sellers/<seller_id>/<Category>/<product-slug>/<filename>

Usage:
  export DATABASE_URL='postgresql://...'
  python import_agent_shopper_uploads.py

Optional:
  export IMPORT_SELLER_EMAIL='seller@hweibo.local'
  export IMPORT_SELLER_PASSWORD_HASH='demo'
  export IMPORT_RESET=1    # deletes previously imported products for that seller under /product_images/sellers/<seller_id>/*
"""

from __future__ import annotations

import os
import re
import shutil
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

from sqlmodel import Session, SQLModel, create_engine, select

from app import Product, ProductImage, SellerProfile, User, UserRole, _normalize_database_url


def _env(name: str, default: Optional[str] = None) -> Optional[str]:
    v = os.getenv(name)
    if v is None or v.strip() == "":
        return default
    return v.strip()


def _slug_to_title(slug: str) -> str:
    parts = [p for p in slug.replace("_", "-").split("-") if p]
    return " ".join(s.upper() if s.isupper() else s.capitalize() for s in parts)


def _sort_order_from_filename(name: str) -> int:
    # Prefer standardized ordering: 1_main, 2_angle, 3_back, 4_lifestyle
    m = re.match(r"^(\d+)_", name)
    if not m:
        return 999
    try:
        return int(m.group(1))
    except Exception:
        return 999


def _guess_price_cents(category: str, title: str) -> int:
    t = title.lower()
    c = category.lower()
    if "laptop" in c:
        if "macbook" in t:
            return 219900
        if "xps" in t:
            return 189900
        return 99900
    if "smartphone" in c or "phone" in c:
        return 69900
    if "camera" in c:
        return 89900
    if "audio" in c:
        return 19900
    return 4900


@dataclass(frozen=True)
class ImportStats:
    categories: int
    products_created: int
    products_skipped: int
    images_copied: int


def _repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def _source_root() -> Path:
    # Default: <repo>/agent_shopper/uploads/products
    return _repo_root() / "agent_shopper" / "uploads" / "products"


def _target_images_root() -> Path:
    # backend/product_images
    return Path(__file__).resolve().parent / "product_images"


def _ensure_seller(session: Session, email: str, password_hash: str) -> User:
    existing = session.exec(select(User).where(User.email == email)).first()
    if existing:
        return existing
    u = User(email=email, password_hash=password_hash, role=UserRole.seller, is_active=True)
    session.add(u)
    session.commit()
    session.refresh(u)
    return u


def _ensure_store_profile(
    session: Session,
    seller: User,
    store_name: str,
    store_description: str,
    store_country_code: str,
    store_region: str,
    store_city: str,
    store_address: str,
) -> None:
    existing = session.exec(select(SellerProfile).where(SellerProfile.user_id == seller.id)).first()
    if existing:
        # Keep existing values if they are already set; fill blanks from env.
        changed = False
        if not existing.store_name and store_name:
            existing.store_name = store_name
            changed = True
        if not existing.store_description and store_description:
            existing.store_description = store_description
            changed = True
        if not existing.store_country_code and store_country_code:
            existing.store_country_code = store_country_code
            changed = True
        if not existing.store_region and store_region:
            existing.store_region = store_region
            changed = True
        if not existing.store_city and store_city:
            existing.store_city = store_city
            changed = True
        if not existing.store_address and store_address:
            existing.store_address = store_address
            changed = True
        if changed:
            session.add(existing)
            session.commit()
        return

    session.add(
        SellerProfile(
            user_id=seller.id,
            store_name=store_name,
            store_description=store_description,
            store_country_code=store_country_code,
            store_region=store_region,
            store_city=store_city,
            store_address=store_address,
        )
    )
    session.commit()


def _delete_imported_for_seller(session: Session, seller_id: int) -> None:
    # Delete DB rows first, then files. Keep it scoped to this import namespace.
    # We consider imported images those whose URL starts with /product_images/sellers/<seller_id>/
    prefix = f"/product_images/sellers/{seller_id}/"
    imgs = session.exec(select(ProductImage).where(ProductImage.url.startswith(prefix))).all()
    product_ids = sorted({img.product_id for img in imgs})
    for img in imgs:
        session.delete(img)
    session.commit()

    if product_ids:
        prods = session.exec(select(Product).where(Product.id.in_(product_ids))).all()
        for p in prods:
            # Only delete products owned by this seller.
            if p.seller_id == seller_id:
                session.delete(p)
        session.commit()

    # Remove files on disk.
    target_dir = _target_images_root() / "sellers" / str(seller_id)
    if target_dir.exists():
        shutil.rmtree(target_dir)


def main() -> None:
    database_url = _env("DATABASE_URL", "")
    if not database_url:
        raise SystemExit("Missing DATABASE_URL.")

    seller_email = _env("IMPORT_SELLER_EMAIL", "seller@hweibo.local") or "seller@hweibo.local"
    seller_password_hash = _env("IMPORT_SELLER_PASSWORD_HASH", "demo") or "demo"
    do_reset = (_env("IMPORT_RESET", "0") or "0").lower() in {"1", "true", "yes", "y"}
    store_name = _env("IMPORT_STORE_NAME", "Hweibo Store") or "Hweibo Store"
    store_description = _env("IMPORT_STORE_DESCRIPTION", "Imported catalog store.") or "Imported catalog store."
    store_country_code = _env("IMPORT_STORE_COUNTRY_CODE", "TZ") or "TZ"
    store_region = _env("IMPORT_STORE_REGION", "Dodoma") or "Dodoma"
    store_city = _env("IMPORT_STORE_CITY", "Dodoma") or "Dodoma"
    store_address = _env("IMPORT_STORE_ADDRESS", "Tanzania") or "Tanzania"

    src_root = _source_root()
    if not src_root.exists():
        raise SystemExit(f"Source uploads not found: {src_root}")

    engine = create_engine(_normalize_database_url(database_url))
    SQLModel.metadata.create_all(engine)

    stats = {"categories": 0, "products_created": 0, "products_skipped": 0, "images_copied": 0}

    with Session(engine) as session:
        seller = _ensure_seller(session, seller_email, seller_password_hash)
        _ensure_store_profile(
            session,
            seller,
            store_name=store_name,
            store_description=store_description,
            store_country_code=store_country_code,
            store_region=store_region,
            store_city=store_city,
            store_address=store_address,
        )
        if do_reset:
            _delete_imported_for_seller(session, int(seller.id or 0))

        for cat_dir in sorted([p for p in src_root.iterdir() if p.is_dir()]):
            category = cat_dir.name
            stats["categories"] += 1

            for prod_dir in sorted([p for p in cat_dir.iterdir() if p.is_dir()]):
                slug = prod_dir.name
                title = _slug_to_title(slug)

                existing = session.exec(
                    select(Product).where(Product.seller_id == seller.id).where(Product.title == title)
                ).first()
                if existing:
                    stats["products_skipped"] += 1
                    continue

                product = Product(
                    seller_id=seller.id,
                    title=title,
                    description=f"{title} in category {category}.",
                    category=category,
                    price_cents=_guess_price_cents(category, title),
                    currency="USD",
                    is_active=True,
                )
                session.add(product)
                session.commit()
                session.refresh(product)

                # Copy images into backend/product_images/sellers/<seller_id>/<Category>/<slug>/...
                dst_dir = _target_images_root() / "sellers" / str(seller.id) / category / slug
                dst_dir.mkdir(parents=True, exist_ok=True)

                image_files = [p for p in prod_dir.iterdir() if p.is_file()]
                image_files.sort(key=lambda p: (_sort_order_from_filename(p.name), p.name))

                for img in image_files:
                    dst = dst_dir / img.name
                    shutil.copy2(img, dst)
                    rel = dst.relative_to(_target_images_root()).as_posix()
                    url = f"/product_images/{rel}"
                    session.add(
                        ProductImage(
                            product_id=product.id,
                            url=url,
                            alt_text=title,
                            sort_order=_sort_order_from_filename(img.name),
                        )
                    )
                    stats["images_copied"] += 1

                session.commit()
                stats["products_created"] += 1

    s = ImportStats(**stats)
    print("OK: import complete")
    print(f"- categories: {s.categories}")
    print(f"- products_created: {s.products_created}")
    print(f"- products_skipped: {s.products_skipped}")
    print(f"- images_copied: {s.images_copied}")


if __name__ == "__main__":
    main()
