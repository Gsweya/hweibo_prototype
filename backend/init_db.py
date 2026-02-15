"""
Initialize the Postgres schema (create tables) for the Hweibo backend.

This is intentionally simple and idempotent: running it multiple times is safe.

Usage:
  1) Set DATABASE_URL, e.g.
     export DATABASE_URL='postgresql://hweibo:password@127.0.0.1:5432/hweibo'
  2) Run:
     python init_db.py
"""

from __future__ import annotations

import os
import sys

from sqlalchemy import inspect
from sqlmodel import SQLModel, create_engine

# Import defines the SQLModel tables/metadata.
import app as hweibo_app  # noqa: F401


def main() -> int:
    db_url = os.getenv("DATABASE_URL", "").strip()
    if not db_url:
        print("ERROR: DATABASE_URL is not set.", file=sys.stderr)
        return 2

    engine = create_engine(hweibo_app._normalize_database_url(db_url))
    SQLModel.metadata.create_all(engine)

    insp = inspect(engine)
    tables = insp.get_table_names()
    print(f"OK: connected and ensured tables exist. table_count={len(tables)}")
    for t in sorted(tables):
        print(f"- {t}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

