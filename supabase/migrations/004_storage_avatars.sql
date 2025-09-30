do $$
begin
  -- Only proceed if the storage schema exists in this environment
  if exists (select 1 from information_schema.schemata where schema_name = 'storage') then
    -- Prefer the storage.create_bucket helper if available
    begin
      perform storage.create_bucket('avatars', true);
    exception when undefined_function then
      -- Fallback: upsert directly into storage.buckets if the table exists
      if exists (
        select 1 from information_schema.tables
        where table_schema = 'storage' and table_name = 'buckets'
      ) then
        insert into storage.buckets (id, name, public)
        values ('avatars', 'avatars', true)
        on conflict (id) do update set public = excluded.public;
      else
        -- Storage not available; skip silently
        null;
      end if;
    end;
  else
    -- Storage schema not present; skip
    null;
  end if;
end$$ language plpgsql;

-- Allow anyone to read from the avatars bucket (guarded by storage presence)
do $$
begin
  if to_regclass('storage.objects') is not null then
    if exists (select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='Public read avatars') then
      execute 'drop policy "Public read avatars" on storage.objects';
    end if;
    if exists (select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='Users can insert own avatar') then
      execute 'drop policy "Users can insert own avatar" on storage.objects';
    end if;
    if exists (select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='Users can update own avatar') then
      execute 'drop policy "Users can update own avatar" on storage.objects';
    end if;
    if exists (select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='Users can delete own avatar') then
      execute 'drop policy "Users can delete own avatar" on storage.objects';
    end if;
  end if;
end$$ language plpgsql;

do $$
begin
  if to_regclass('storage.objects') is not null then
    execute $$create policy "Public read avatars"
on storage.objects for select to anon, authenticated
using (bucket_id = 'avatars')$$;

    -- Allow authenticated users to upload/manage files under their own folder `${auth.uid()}/*`
    execute $$create policy "Users can insert own avatar"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
)$$;

    execute $$create policy "Users can update own avatar"
on storage.objects for update to authenticated
using (
  bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
)$$;

    execute $$create policy "Users can delete own avatar"
on storage.objects for delete to authenticated
using (
  bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
)$$;
  end if;
end$$ language plpgsql;
