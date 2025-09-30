-- Orders captured from Stripe webhooks
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  session_id text unique not null,
  amount_total integer,
  currency text,
  status text,
  session jsonb,
  created_at timestamptz default now()
);

alter table public.orders enable row level security;

-- Users can see their own orders
do $$
begin
  if exists (select 1 from pg_policies where schemaname='public' and tablename='orders' and policyname='Users can read own orders') then
    execute 'drop policy "Users can read own orders" on public.orders';
  end if;
end$$;

create policy "Users can read own orders"
  on public.orders for select
  to authenticated
  using (user_id = auth.uid());
