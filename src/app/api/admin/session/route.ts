import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/security';
import { supabaseServer } from '@/lib/supabaseServer';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_session')?.value || '';
  const payload = token ? await verifyAdminSession(token) : null;
  if (!payload) return NextResponse.json({ loggedIn: false });
  const { data } = await supabaseServer
    .from('admin_auth_log')
    .select('ts, ip_hash')
    .eq('event', 'admin_login_success')
    .order('ts', { ascending: false })
    .limit(1)
    .maybeSingle();
  return NextResponse.json({ loggedIn: true, lastLogin: data || null });
}
