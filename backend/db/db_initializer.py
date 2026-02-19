"""
Initialize Hweibo PostgreSQL schema from ./schema.sql.

Usage:
  cd backend
  python db/db_initializer.py
"""

from __future__ import annotations

from pathlib import Path

from _helpers import execute_sql_script, read_sql_file, resolve_database_url


def main() -> int:
    root = Path(__file__).resolve().parent
    schema_path = root / "schema.sql"
    sql_text = read_sql_file(schema_path)

    print(f"Using database URL: {resolve_database_url()}")
    execute_sql_script(sql_text)
    print(f"Schema initialized from {schema_path}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
