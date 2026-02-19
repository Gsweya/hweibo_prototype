from __future__ import annotations

import os
from pathlib import Path

from sqlalchemy import create_engine


def normalize_database_url(url: str) -> str:
    if url.startswith("postgres://"):
        url = "postgresql://" + url.removeprefix("postgres://")

    if url.startswith("postgresql+"):
        return url

    try:
        import psycopg2  # type: ignore  # noqa: F401

        return "postgresql+psycopg2://" + url.removeprefix("postgresql://")
    except Exception:
        return "postgresql+pg8000://" + url.removeprefix("postgresql://")


def resolve_database_url() -> str:
    direct = os.getenv("DATABASE_URL", "").strip()
    if direct:
        return normalize_database_url(direct)

    host = os.getenv("PGHOST", "127.0.0.1").strip()
    port = os.getenv("PGPORT", "5432").strip()
    user = os.getenv("PGUSER", "hweibo").strip()
    password = os.getenv("PGPASSWORD", "hweibo_password").strip()
    database = os.getenv("PGDATABASE", "hweibo").strip()
    assembled = f"postgresql://{user}:{password}@{host}:{port}/{database}"
    return normalize_database_url(assembled)


def read_sql_file(path: Path) -> str:
    text = path.read_text(encoding="utf-8")
    if not text.strip():
        raise ValueError(f"SQL file is empty: {path}")
    return text


def execute_sql_script(sql_text: str) -> None:
    # Split on semicolons for simple local scripts.
    # We intentionally keep schema/seeds free of procedural blocks.
    engine = create_engine(resolve_database_url())
    statements = [s.strip() for s in sql_text.split(";") if s.strip()]
    with engine.begin() as conn:
        for stmt in statements:
            conn.exec_driver_sql(stmt)
