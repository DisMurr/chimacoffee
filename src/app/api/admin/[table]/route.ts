import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

const ALLOWED = new Set(['menu_items', 'testimonials']);
const ADMIN_KEY = process.env.ADMIN_API_KEY;

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
  const table = getTableFromPath(req);
  if (!table || !ALLOWED.has(table)) return NextResponse.json({ error: 'Not allowed' }, { status: 400 });
  const key = req.headers.get('authorization')?.replace('Bearer ', '') || req.headers.get('x-admin-api-key') || '';
  if (!ADMIN_KEY || key !== ADMIN_KEY) return unauthorized();

  const payload = await req.json();
  const { data, error } = await supabaseServer.schema('public').from(table).insert(payload).select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const table = getTableFromPath(req);
  if (!table || !ALLOWED.has(table)) return NextResponse.json({ error: 'Not allowed' }, { status: 400 });
  const key = req.headers.get('authorization')?.replace('Bearer ', '') || req.headers.get('x-admin-api-key') || '';
  if (!ADMIN_KEY || key !== ADMIN_KEY) return unauthorized();

  const { id, ...payload } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const { data, error } = await supabaseServer.schema('public').from(table).update(payload).eq('id', id).select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const table = getTableFromPath(req);
  if (!table || !ALLOWED.has(table)) return NextResponse.json({ error: 'Not allowed' }, { status: 400 });
  const key = req.headers.get('authorization')?.replace('Bearer ', '') || req.headers.get('x-admin-api-key') || '';
  if (!ADMIN_KEY || key !== ADMIN_KEY) return unauthorized();

  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const { data, error } = await supabaseServer.schema('public').from(table).delete().eq('id', id).select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}
