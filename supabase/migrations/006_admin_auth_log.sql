-- Admin authentication audit logs
create table if not exists public.admin_auth_log (
  id bigserial primary key,
  ts timestamptz not null default now(),
  event text not null, -- admin_login_success | admin_login_failure | admin_logout
  actor text not null default 'admin',
  ip_hash text,
  ip_raw inet,
  user_agent text,
  jti text,
  meta jsonb
);

-- Indexes for common queries
create index if not exists admin_auth_log_ts_idx on public.admin_auth_log (ts desc);
create index if not exists admin_auth_log_event_idx on public.admin_auth_log (event);
create index if not exists admin_auth_log_iphash_ts_idx on public.admin_auth_log (ip_hash, ts desc);

-- Enable RLS but do not grant public read; only service role should write/read
alter table public.admin_auth_log enable row level security;
