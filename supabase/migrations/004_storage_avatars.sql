-- Create a public avatars bucket (if not exists) and policies
select storage.create_bucket('avatars', public := true);

-- Allow anyone to read from the avatars bucket
do $$
begin
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
end$$;

create policy "Public read avatars"
on storage.objects for select to anon, authenticated
using (bucket_id = 'avatars');

-- Allow authenticated users to upload/manage files under their own folder `${auth.uid()}/*`
create policy "Users can insert own avatar"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can update own avatar"
on storage.objects for update to authenticated
using (
  bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can delete own avatar"
on storage.objects for delete to authenticated
using (
  bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
);
