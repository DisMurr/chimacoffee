-- Create a public avatars bucket (if not exists) and policies
select storage.create_bucket('avatars', public := true);

-- Allow anyone to read from the avatars bucket
create policy if not exists "Public read avatars"
on storage.objects for select to anon, authenticated
using (bucket_id = 'avatars');

-- Allow authenticated users to upload/manage files under their own folder `${auth.uid()}/*`
create policy if not exists "Users can insert own avatar"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
);

create policy if not exists "Users can update own avatar"
on storage.objects for update to authenticated
using (
  bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
);

create policy if not exists "Users can delete own avatar"
on storage.objects for delete to authenticated
using (
  bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
);
