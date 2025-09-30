'use server'

import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import AdminClient from './AdminClient'

async function getSessionSSR() {
  const res = await fetch('/api/admin/session', { cache: 'no-store' })
  if (!res.ok) return { loggedIn: false, lastLogin: null } as const
  const data = await res.json()
  return { loggedIn: !!data.loggedIn, lastLogin: data.lastLogin || null } as const
}

export default async function AdminPage() {
  const { loggedIn, lastLogin } = await getSessionSSR()

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 dark:text-white">
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-amber-900 dark:text-gray-100">Admin – AI Migration</h1>
          <div className="flex items-center gap-2 text-sm" aria-live="polite" aria-atomic>
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${loggedIn ? 'bg-green-500' : 'bg-red-500'}`} />
            <span>{loggedIn ? 'Logged in' : 'Not logged in'}</span>
          </div>
        </div>
        {lastLogin && (
          <p className="text-xs text-amber-700 dark:text-gray-400 mb-4">Last login: {new Date(lastLogin.ts!).toLocaleString()} • ip_hash: {lastLogin.ip_hash}</p>
        )}
        <p className="text-amber-800 dark:text-gray-300 mb-8">Describe the database change you want. A Pull Request with a migration will be generated.</p>
        <AdminClient />
      </main>
      <Footer />
    </div>
  )
}
