import { supabaseServer } from '@/lib/supabaseServer';

type Event = 'admin_login_success' | 'admin_login_failure' | 'admin_logout';

export async function logAdminEvent(params: {
  event: Event;
  ip_hash?: string | null;
  ip_raw?: string | null;
  user_agent?: string | null;
  jti?: string | null;
  meta?: Record<string, any> | null;
}) {
  try {
    const { error } = await supabaseServer.from('admin_auth_log').insert({
      event: params.event,
      ip_hash: params.ip_hash ?? null,
      ip_raw: params.ip_raw ?? null,
      user_agent: params.user_agent ?? null,
      jti: params.jti ?? null,
      meta: params.meta ?? null,
    });
    if (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to write admin_auth_log', error.message);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Exception writing admin_auth_log', (e as any)?.message);
  }
}
