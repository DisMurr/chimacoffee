#!/usr/bin/env node
/*
 Simple migration runner for Supabase (Postgres) using node-postgres.
 Applies SQL files in supabase/migrations in filename order.
 Requires SUPABASE_DB_URL env (postgres://user:pass@host:5432/dbname)
*/
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

(async () => {
  const dbUrl = process.env.SUPABASE_DB_URL;
  if (!dbUrl) {
    console.error('Missing SUPABASE_DB_URL');
    process.exit(1);
  }
  const sslMode = process.env.PGSSLMODE || '';
  const rejectUnauthorized = process.env.PGSSLREJECTUNAUTHORIZED !== 'false';
  const client = new Client({
    connectionString: dbUrl,
    ssl: sslMode ? { rejectUnauthorized } : undefined,
  });
  await client.connect();
  try {
    await client.query(`create table if not exists public.schema_migrations (
      id bigserial primary key,
      filename text unique not null,
      applied_at timestamptz default now()
    )`);

    const dir = path.join(process.cwd(), 'supabase', 'migrations');
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.sql'))
      .sort();

    for (const file of files) {
      const { rows } = await client.query('select 1 from public.schema_migrations where filename = $1', [file]);
      if (rows.length) {
        console.log(`Skipping already applied migration: ${file}`);
        continue;
      }
      const sql = fs.readFileSync(path.join(dir, file), 'utf8');
      console.log(`Applying migration: ${file}`);
      await client.query('begin');
      try {
        await client.query(sql);
        await client.query('insert into public.schema_migrations(filename) values ($1)', [file]);
        await client.query('commit');
      } catch (e) {
        await client.query('rollback');
        console.error(`Migration failed: ${file}`);
        console.error(e.message);
        process.exit(1);
      }
    }
    console.log('Migrations complete');
  } finally {
    await client.end();
  }
})();
