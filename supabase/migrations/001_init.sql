-- Create base tables and RLS policies
create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2) not null,
  category text not null check (category in ('coffee','pastry')),
  created_at timestamptz default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image_url text,
  rating int not null check (rating between 1 and 5),
  quote text not null,
  created_at timestamptz default now()
);

-- Enable RLS and public read
alter table public.menu_items enable row level security;
alter table public.testimonials enable row level security;

-- Drop existing policies if present to avoid redefinition errors on re-run
do $$
begin
  if exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'menu_items' and policyname = 'Public read menu') then
    execute 'drop policy "Public read menu" on public.menu_items';
  end if;
  if exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'testimonials' and policyname = 'Public read testimonials') then
    execute 'drop policy "Public read testimonials" on public.testimonials';
  end if;
end$$;

create policy "Public read menu"
  on public.menu_items for select
  to anon, authenticated using (true);

create policy "Public read testimonials"
  on public.testimonials for select
  to anon, authenticated using (true);
