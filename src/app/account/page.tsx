"use client";

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!user) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('display_name, avatar_url')
        .eq('id', user.id)
        .single();
      if (!cancelled && data) {
        setDisplayName(data.display_name ?? '');
        setAvatarUrl(data.avatar_url ?? '');
      }
      if (error) {
        // silently ignore; might be creating for first time
      }
    }
    load();
    return () => { cancelled = true; };
  }, [user]);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setMessage(null);
    const payload: any = { id: user.id, display_name: displayName || null, avatar_url: avatarUrl || null };
    const { error } = await supabase.from('profiles').upsert(payload, { onConflict: 'id' });
    setSaving(false);
    if (error) setMessage(error.message);
    else setMessage('Saved');
  }

  if (loading) return <div className="p-6">Loading…</div>;
  if (!user) return (
    <div className="p-6">
      <p className="mb-2">You are not signed in.</p>
      <Link href="/auth" className="underline text-amber-700">Sign in</Link>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Account</h1>
        <div className="space-y-1 mt-2">
          <div><span className="font-medium">User ID:</span> {user.id}</div>
          {user.email && <div><span className="font-medium">Email:</span> {user.email}</div>}
        </div>
      </div>

      <form onSubmit={saveProfile} className="space-y-4 max-w-md">
        <h2 className="text-xl font-medium">Profile</h2>
        <div>
          <label className="block text-sm mb-1">Display name</label>
          <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">Avatar URL</label>
          <input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>
        {message && <p className="text-sm text-gray-600">{message}</p>}
        <button type="submit" disabled={saving} className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded">
          {saving ? 'Saving…' : 'Save Profile'}
        </button>
      </form>

      <div>
        <button onClick={signOut} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black">Sign out</button>
      </div>
    </div>
  );
}

