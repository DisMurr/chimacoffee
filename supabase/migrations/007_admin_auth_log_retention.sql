-- Retention policy for admin_auth_log
-- Purge entries older than 90 days daily at 02:00 UTC

-- Create helper function to delete old rows
create or replace function public.purge_old_admin_auth_logs(retention_days integer default 90)
returns void
language plpgsql
as $$
begin
  delete from public.admin_auth_log where ts < now() - (retention_days || ' days')::interval;
end;
$$;

-- If pg_cron is available (managed Supabase: use cron schema), schedule the job
-- Supabase enables pg_cron as extension 'cron'. Use cron.schedule to run daily.
do $$
begin
  perform 1 from pg_extension where extname = 'pg_cron' or extname = 'cron';
  if found then
    -- Try to create a daily job; ignore errors if already exists
    begin
  perform cron.schedule('purge_admin_auth_log_daily', '0 2 * * *', 'select public.purge_old_admin_auth_logs(90)');
    exception when others then
      -- no-op: job may already exist or not permitted in this environment
      null;
    end;
  end if;
end$$ language plpgsql;

-- Index to speed up delete by ts already exists
-- Optionally, create a limited view that excludes ip_raw for non-privileged reads
create or replace view public.v_admin_auth_log_redacted as
  select ts, event, ip_hash, user_agent, jti
  from public.admin_auth_log;
