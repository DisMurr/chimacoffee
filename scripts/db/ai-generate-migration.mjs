#!/usr/bin/env node
/*
 AI-assisted migration generator.
 Usage (locally or in CI):
   OPENAI_API_KEY=... MIGRATION_PROMPT="Add table orders with..." npm run db:ai
 Outputs a timestamped SQL file in supabase/migrations.
 This does NOT apply the migration. CI will apply on merge via db-migrate.yml.
*/

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { OpenAI } from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
const prompt = process.env.MIGRATION_PROMPT || '';

if (!apiKey) {
  console.error('Missing OPENAI_API_KEY');
  process.exit(1);
}
if (!prompt.trim()) {
  console.error('Missing MIGRATION_PROMPT');
  process.exit(1);
}

const client = new OpenAI({ apiKey });

const system = `You are a senior PostgreSQL DBA generating safe, idempotent Supabase (Postgres) migrations.
Strict rules:
- Output ONLY SQL between <sql>...</sql> tags, nothing else.
- Wrap DDL in a transaction when appropriate.
- Use IF NOT EXISTS / IF EXISTS guards when possible.
- Add RLS and policies for public read if table is public (like menu/testimonials), else document.
- Prefer generated columns / constraints to ensure data integrity.
- Avoid destructive operations unless explicitly required; if needed, use IF EXISTS and preserve data.
- Assume schema is public unless specified.
- Target Postgres 15 compatibility.
`;

const user = `Generate a migration for this change:
${prompt}
`;

(async () => {
  try {
    const resp = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.2,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    });
    const content = resp.choices?.[0]?.message?.content || '';
    const match = content.match(/<sql>[\s\S]*?<\/sql>/i);
    if (!match) {
      console.error('AI did not return SQL in <sql> tags');
      process.exit(1);
    }
    const sql = match[0].replace(/^<sql>/i, '').replace(/<\/sql>$/i, '').trim() + '\n';

    const dir = path.join(process.cwd(), 'supabase', 'migrations');
    fs.mkdirSync(dir, { recursive: true });
    const ts = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
    const file = path.join(dir, `${ts}_ai.sql`);
    fs.writeFileSync(file, sql, 'utf8');
    console.log(`Created migration: ${file}`);
  } catch (e) {
    console.error('AI generation failed:', e?.message || e);
    process.exit(1);
  }
})();
