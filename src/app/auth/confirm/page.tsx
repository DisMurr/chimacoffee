"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function ConfirmPage() {
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [message, setMessage] = useState<string>('Confirming your email…');

  useEffect(() => {
    // Supabase handles the confirmation via the OOB code in the URL automatically
    // Just attempt to get a session after redirect
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        setStatus('error');
        setMessage(error.message);
        return;
      }
      if (data.session) {
        setStatus('success');
        setMessage('Your email has been confirmed. You are now signed in.');
      } else {
        setStatus('error');
        setMessage('Could not confirm your email. Please try signing in.');
      }
    });
  }, []);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow rounded p-6 text-center space-y-4">
        <h1 className="text-xl font-semibold">Email Confirmation</h1>
        <p>{message}</p>
        {status !== 'pending' && (
          <div className="space-x-4">
            <Link href="/account" className="underline text-amber-700">Account</Link>
            <Link href="/auth" className="underline">Sign In</Link>
          </div>
        )}
      </div>
    </div>
  );
}
