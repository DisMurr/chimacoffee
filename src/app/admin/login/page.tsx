"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setPending(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus(data?.error || `Failed (${res.status})`);
      } else {
        setStatus('Logged in. Redirecting…');
        setTimeout(() => router.push('/admin'), 500);
      }
    } catch (err: any) {
      setStatus(err?.message || 'Unexpected error');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 dark:text-white">
      <Navigation />
      <main className="max-w-md mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold text-amber-900 dark:text-gray-100 mb-6">Admin Login</h1>
        <form onSubmit={submit} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-amber-900 dark:text-gray-200 mb-2">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-amber-200 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-gray-900"
              placeholder="Enter admin password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="bg-amber-600 disabled:opacity-60 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            {pending ? 'Logging in…' : 'Login'}
          </button>
          {status && <p className="text-sm text-amber-800 dark:text-gray-300">{status}</p>}
        </form>
      </main>
      <Footer />
    </div>
  );
}
