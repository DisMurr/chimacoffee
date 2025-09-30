import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

export async function GET() {
  const checks: Record<string, any> = {}

  // Supabase basic check
  try {
    const { error } = await supabaseServer.from('menu_items').select('id').limit(1)
    checks.supabase = !error
    if (error) checks.supabase_error = error.message
  } catch (e: any) {
    checks.supabase = false
    checks.supabase_error = e?.message || 'unknown'
  }

  // Env presence (do not leak values)
  checks.stripe_publishable = !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  checks.ga_enabled = !!(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.GA_MEASUREMENT_ID)
  checks.canonical_host = process.env.CANONICAL_HOST || null
  checks.image_unoptimized = process.env.NEXT_IMAGE_UNOPTIMIZED === 'true'
  checks.admin_session_secret = !!process.env.ADMIN_SESSION_SECRET

  return NextResponse.json({ status: 'ok', checks })
}
