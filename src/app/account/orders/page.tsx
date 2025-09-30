"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

type Order = {
  id: string;
  session_id: string;
  amount_total: number | null;
  currency: string | null;
  status: string | null;
  created_at: string;
};

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from('orders').select('*').order('created_at', { ascending: false }).then(({ data, error }) => {
      if (error) setErr(error.message);
      else setOrders(data as Order[]);
    });
  }, [user]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (!user) return (
    <div className="p-6">
      <p className="mb-2">You are not signed in.</p>
      <Link href="/auth" className="underline text-amber-700">Sign in</Link>
    </div>
  );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">My Orders</h1>
      {err && <p className="text-red-600 text-sm">{err}</p>}
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="divide-y">
          {orders.map((o) => (
            <li key={o.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{o.amount_total ? `$${(o.amount_total / 100).toFixed(2)}` : '—'} {o.currency?.toUpperCase() || ''}</div>
                <div className="text-sm text-gray-500">{new Date(o.created_at).toLocaleString()} • {o.status || 'unknown'}</div>
              </div>
              <div className="text-xs text-gray-500">{o.session_id}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
