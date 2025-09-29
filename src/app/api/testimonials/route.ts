import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

export async function GET() {
  const { data, error } = await supabaseServer
    .schema('public')
    .from('testimonials')
    .select('*');

  if (error) {
    console.warn('Testimonials API error:', error);
    const msg = (error.message || '').toLowerCase();
    // Gracefully handle missing table / schema cache issues
    if (
      msg.includes('does not exist') ||
      msg.includes('relation') ||
      msg.includes('schema cache') ||
      msg.includes('not found') ||
      msg.includes('no relation')
    ) {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}
