# Hweibo DB Utilities

This folder contains PostgreSQL-first database implementation assets:

- `schema.sql`: idempotent table/index schema.
- `seeds.sql`: starter demo data and product catalog seeds.
- `db_initializer.py`: applies `schema.sql`.
- `db_seeder.py`: applies `seeds.sql`.
- `db_checker.py`: verifies connectivity + table/row counts.

## Local usage

```bash
cd backend
export DATABASE_URL="postgresql://hweibo:hweibo_password@127.0.0.1:5432/hweibo"
python db/db_initializer.py
python db/db_seeder.py
python db/db_checker.py
```

If `DATABASE_URL` is not set, scripts fall back to:

- `PGHOST` (default `127.0.0.1`)
- `PGPORT` (default `5432`)
- `PGUSER` (default `hweibo`)
- `PGPASSWORD` (default `hweibo_password`)
- `PGDATABASE` (default `hweibo`)
