"""
Seed Hweibo PostgreSQL data from ./seeds.sql.

Usage:
  cd backend
  python db/db_seeder.py
"""

from __future__ import annotations

from pathlib import Path

from _helpers import execute_sql_script, read_sql_file, resolve_database_url


def main() -> int:
    root = Path(__file__).resolve().parent
    seed_path = root / "seeds.sql"
    sql_text = read_sql_file(seed_path)

    print(f"Using database URL: {resolve_database_url()}")
    execute_sql_script(sql_text)
    print(f"Seed data applied from {seed_path}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
