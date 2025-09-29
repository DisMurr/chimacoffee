import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY || '';
    if (!secret) {
      return NextResponse.json({ error: 'Missing STRIPE_SECRET_KEY' }, { status: 500 });
    }

    const stripe = new Stripe(secret, { apiVersion: '2024-06-20' as any });

    let body: unknown = null;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const items = (body as any)?.items;
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    const headers = request.headers;
    const origin =
      headers.get('origin') ||
      (headers.get('x-forwarded-proto') && headers.get('x-forwarded-host')
        ? `${headers.get('x-forwarded-proto')}://${headers.get('x-forwarded-host')}`
        : headers.get('host')
        ? `https://${headers.get('host')}`
        : 'http://localhost:3000');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: { name: string; price: number; quantity: number }) => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: Math.max(1, Number(item.quantity) || 1),
      })),
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    // Ensure we always return JSON so client parse doesnt fail
    return NextResponse.json({ error: err?.message || 'Checkout session failed' }, { status: 500 });
  }
}
