'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function AdminPage() {
  const [prompt, setPrompt] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)
    setPending(true)
    try {
      const res = await fetch('/api/admin/ai-migration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, password })
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus(data?.error || `Failed (${res.status})`)
      } else {
        setStatus('AI migration workflow dispatched. Check GitHub Actions and PRs.')
        setPrompt('')
      }
    } catch (err: any) {
      setStatus(err?.message || 'Unexpected error')
    } finally {
      setPending(false)
    }
  }

  const logout = async () => {
    setLoggingOut(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      setStatus('Logged out')
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 dark:text-white">
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-amber-900 dark:text-gray-100 mb-6">Admin – AI Migration</h1>
        <p className="text-amber-800 dark:text-gray-300 mb-8">Describe the database change you want. A Pull Request with a migration will be generated.</p>
        <form onSubmit={submit} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-amber-900 dark:text-gray-200 mb-2">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-36 p-3 border border-amber-200 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-gray-900"
              placeholder="e.g., Create orders table with id, user_id, total, status; add RLS for anon read; add audit trigger"
              required
            />
          </div>
          <div className="flex items-center justify-between text-sm text-amber-800 dark:text-gray-300">
            <p>This page is protected. If you aren’t logged in, go to <Link href="/admin/login" className="underline">Admin Login</Link>.</p>
            <button type="button" onClick={logout} disabled={loggingOut} className="underline">
              {loggingOut ? 'Logging out…' : 'Logout'}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={pending}
              className="bg-amber-600 disabled:opacity-60 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
            >
              {pending ? 'Dispatching…' : 'Dispatch AI Migration'}
            </button>
            {status && <p className="text-sm text-amber-800 dark:text-gray-300">{status}</p>}
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}
