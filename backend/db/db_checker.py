"""
Check PostgreSQL connectivity and key table counts for Hweibo.

Usage:
  cd backend
  python db/db_checker.py
"""

from __future__ import annotations

from sqlalchemy import create_engine, inspect, text

from _helpers import resolve_database_url


def _count(conn, table: str) -> int:
    return int(conn.execute(text(f'SELECT COUNT(*) FROM {table}')).scalar() or 0)


def main() -> int:
    url = resolve_database_url()
    engine = create_engine(url)
    print(f"Checking database URL: {url}")

    with engine.connect() as conn:
        version = conn.execute(text("SELECT version()")).scalar()
        db_name = conn.execute(text("SELECT current_database()")).scalar()
        now = conn.execute(text("SELECT NOW()")).scalar()

        print(f"Connected: {db_name}")
        print(f"Server time: {now}")
        print(f"Postgres: {version}")

    inspector = inspect(engine)
    tables = sorted(inspector.get_table_names())
    print(f"Table count: {len(tables)}")
    for t in tables:
        print(f"- {t}")

    with engine.connect() as conn:
        print("Row counts:")
        print(f'  user={_count(conn, "\"user\"")}')
        print(f"  sellerprofile={_count(conn, 'sellerprofile')}")
        print(f"  product={_count(conn, 'product')}")
        print(f"  productimage={_count(conn, 'productimage')}")
        print(f'  order={_count(conn, "\"order\"")}')

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
