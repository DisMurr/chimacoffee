-- Simple audit log for inserts, updates, deletes
create table if not exists public.audit_log (
  id bigserial primary key,
  table_name text not null,
  action text not null,
  row_data jsonb,
  changed_at timestamptz default now()
);

create or replace function public.audit_trigger_func()
returns trigger as $$
begin
  if (TG_OP = 'INSERT') then
    insert into public.audit_log(table_name, action, row_data)
    values (TG_TABLE_NAME, TG_OP, to_jsonb(NEW));
    return NEW;
  elsif (TG_OP = 'UPDATE') then
    insert into public.audit_log(table_name, action, row_data)
    values (TG_TABLE_NAME, TG_OP, jsonb_build_object('old', to_jsonb(OLD), 'new', to_jsonb(NEW)));
    return NEW;
  elsif (TG_OP = 'DELETE') then
    insert into public.audit_log(table_name, action, row_data)
    values (TG_TABLE_NAME, TG_OP, to_jsonb(OLD));
    return OLD;
  end if;
  return null;
end;
$$ language plpgsql security definer;

-- Attach triggers to key tables (extend as needed)
drop trigger if exists menu_items_audit on public.menu_items;
create trigger menu_items_audit
  after insert or update or delete on public.menu_items
  for each row execute function public.audit_trigger_func();

drop trigger if exists testimonials_audit on public.testimonials;
create trigger testimonials_audit
  after insert or update or delete on public.testimonials
  for each row execute function public.audit_trigger_func();
