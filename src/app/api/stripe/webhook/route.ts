import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature') || '';
  const secret = process.env.STRIPE_WEBHOOK_SECRET || '';
  const key = process.env.STRIPE_SECRET_KEY || '';
  if (!secret || !key) return NextResponse.json({ error: 'Missing Stripe webhook secret or key' }, { status: 500 });

  const stripe = new Stripe(key, { apiVersion: '2024-06-20' as any });
  const buf = Buffer.from(await req.arrayBuffer());
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, secret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook signature verification failed: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = (session.metadata && (session.metadata as any).user_id) || null;
    const { error } = await supabaseServer
      .from('orders')
      .insert({
        user_id: userId,
        session_id: session.id,
        amount_total: session.amount_total ?? null,
        currency: session.currency ?? null,
        status: session.status ?? null,
        session: session as any,
      });
    if (error) {
      // Log but don't fail webhook replay
      console.error('Failed to record order:', error.message);
    }
  }

  return NextResponse.json({ received: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
