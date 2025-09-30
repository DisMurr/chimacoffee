import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import { AllowedTables, getCreateSchema, getUpdateSchema, validateIdParam } from '@/lib/validation';
import { createRateLimiter, ipKey } from '@/lib/rateLimit';

const ALLOWED = new Set(AllowedTables as readonly string[]);
const ADMIN_KEY = process.env.ADMIN_API_KEY;

// Modest limiter: burst 10, refill 1 token/sec per ip+route
const limiter = createRateLimiter({ capacity: 10, refillPerSec: 1 });

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

function getTableFromPath(req: NextRequest): string | null {
  const parts = req.nextUrl.pathname.split('/').filter(Boolean);
  const idx = parts.indexOf('admin');
  const table = idx >= 0 ? parts[idx + 1] : parts[parts.length - 1];
  return table || null;
}

export async function GET(req: NextRequest) {
  const rate = limiter.take(ipKey(req, 'admin:get'));
  if (!rate.allowed) return NextResponse.json({ error: 'Too Many Requests' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } });
  const table = getTableFromPath(req);
  if (!table || !ALLOWED.has(table)) return NextResponse.json({ error: 'Not allowed' }, { status: 400 });
  const key = req.headers.get('authorization')?.replace('Bearer ', '') || req.headers.get('x-admin-api-key') || '';
  if (!ADMIN_KEY || key !== ADMIN_KEY) return unauthorized();

  const id = req.nextUrl.searchParams.get('id');
  const query = supabaseServer.schema('public').from(table).select('*');
  const { data, error } = id ? await query.eq('id', id) : await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const rate = limiter.take(ipKey(req, 'admin:post'));
  if (!rate.allowed) return NextResponse.json({ error: 'Too Many Requests' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } });
  const table = getTableFromPath(req);
  if (!table || !ALLOWED.has(table)) return NextResponse.json({ error: 'Not allowed' }, { status: 400 });
  const key = req.headers.get('authorization')?.replace('Bearer ', '') || req.headers.get('x-admin-api-key') || '';
  if (!ADMIN_KEY || key !== ADMIN_KEY) return unauthorized();

  const payload = await req.json();
  try {
    const schema = getCreateSchema(table as any);
    schema.parse(payload);
  } catch (e: any) {
    return NextResponse.json({ error: 'Invalid payload', details: e?.errors || String(e) }, { status: 400 });
  }
  const { data, error } = await supabaseServer.schema('public').from(table).insert(payload).select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const rate = limiter.take(ipKey(req, 'admin:patch'));
  if (!rate.allowed) return NextResponse.json({ error: 'Too Many Requests' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } });
  const table = getTableFromPath(req);
  if (!table || !ALLOWED.has(table)) return NextResponse.json({ error: 'Not allowed' }, { status: 400 });
  const key = req.headers.get('authorization')?.replace('Bearer ', '') || req.headers.get('x-admin-api-key') || '';
  if (!ADMIN_KEY || key !== ADMIN_KEY) return unauthorized();

  const { id, ...payload } = await req.json();
  const idCheck = validateIdParam(id ?? null);
  if (!idCheck.ok) return NextResponse.json({ error: idCheck.error }, { status: 400 });
  try {
    const schema = getUpdateSchema(table as any);
    schema.parse({ id, ...payload });
  } catch (e: any) {
    return NextResponse.json({ error: 'Invalid payload', details: e?.errors || String(e) }, { status: 400 });
  }
  const { data, error } = await supabaseServer.schema('public').from(table).update(payload).eq('id', id).select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const rate = limiter.take(ipKey(req, 'admin:delete'));
  if (!rate.allowed) return NextResponse.json({ error: 'Too Many Requests' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } });
  const table = getTableFromPath(req);
  if (!table || !ALLOWED.has(table)) return NextResponse.json({ error: 'Not allowed' }, { status: 400 });
  const key = req.headers.get('authorization')?.replace('Bearer ', '') || req.headers.get('x-admin-api-key') || '';
  if (!ADMIN_KEY || key !== ADMIN_KEY) return unauthorized();

  const id = req.nextUrl.searchParams.get('id');
  const idCheck = validateIdParam(id);
  if (!idCheck.ok) return NextResponse.json({ error: idCheck.error }, { status: 400 });
  const { data, error } = await supabaseServer.schema('public').from(table).delete().eq('id', id).select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}
