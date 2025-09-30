"use client";

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();

  if (loading) return <div className="p-6">Loading…</div>;
  if (!user) return (
    <div className="p-6">
      <p className="mb-2">You are not signed in.</p>
      <Link href="/auth" className="underline text-amber-700">Sign in</Link>
    </div>
  );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Account</h1>
      <div className="space-y-1">
        <div><span className="font-medium">User ID:</span> {user.id}</div>
        {user.email && <div><span className="font-medium">Email:</span> {user.email}</div>}
      </div>
      <button onClick={signOut} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black">Sign out</button>
    </div>
  );
}
