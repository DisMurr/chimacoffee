# Supabase Automated Workflow

This project includes a lightweight, GitOps-friendly workflow for managing Supabase database schema and admin CRUD.

## Contents
- `supabase/migrations/` – SQL migrations applied in order.
- `scripts/db/migrate.js` – Node migration runner (uses `SUPABASE_DB_URL`).
- `.github/workflows/db-migrate.yml` – CI job to apply migrations on `main`.
- `src/app/api/admin/[table]/route.ts` – Admin CRUD endpoints for whitelisted tables.

## Usage

### Local migrations
1. Set `SUPABASE_DB_URL` in your shell (find it in Supabase → Project → Settings → Database → Connection string).
2. Run:
```bash
npm run db:migrate
```

### CI Migrations
- Add `SUPABASE_DB_URL` as a GitHub Actions Secret.
- On push to `main`, migrations will apply automatically.

### Admin API
- Set `ADMIN_API_KEY` in Vercel Project Environment Variables.
- Endpoints:
  - `GET /api/admin/menu_items` – list
  - `GET /api/admin/menu_items?id=<uuid>` – get by id
  - `POST /api/admin/menu_items` – create; JSON body
  - `PATCH /api/admin/menu_items` – update; JSON body `{ id, ...fields }`
  - `DELETE /api/admin/menu_items?id=<uuid>` – delete
- Auth: include `Authorization: Bearer <ADMIN_API_KEY>` or `x-admin-api-key: <ADMIN_API_KEY>`.
- Whitelisted tables: `menu_items`, `testimonials`. Extend `ALLOWED` set to add more.

## Audit Logging
- Migrations add an `audit_log` table and triggers on `menu_items` and `testimonials` for INSERT/UPDATE/DELETE.

## AI-Assisted Migrations

You can generate migrations using the AI workflow:

- Trigger manually: GitHub → Actions → "AI Generate Migration" → Run workflow → enter your prompt.
- The workflow will:
  1. Call OpenAI to produce a safe SQL migration.
  2. Write a timestamped file in `supabase/migrations/`.
  3. Open a Pull Request for review.
- After merging, the `Supabase DB Migrations` workflow applies it to your database (uses `SUPABASE_DB_URL` secret).

Secrets required:
- `OPENAI_API_KEY` (Repository secret) for AI generation.
- `SUPABASE_DB_URL` (Repository secret) for applying migrations in the separate migration workflow.

## Notes
- For typed access and full CLI support, you can also adopt the official `supabase` CLI later. This setup avoids requiring the CLI by using plain Postgres.
- Never expose `SUPABASE_DB_URL` or service role keys to the browser.
