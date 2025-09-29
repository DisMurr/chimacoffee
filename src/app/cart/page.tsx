'use client'

import { useCart } from '../../context/CartContext';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    const response = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart }),
    });

    const { id } = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: id });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 dark:text-white">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 py-24">
        <h1 className="text-5xl font-bold text-amber-900 mb-8 text-center">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-center text-amber-700 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
                  <div>
                    <h3 className="text-xl font-semibold text-amber-900">{item.name}</h3>
                    <p className="text-amber-700">${item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 p-1 border border-amber-300 rounded"
                      min="1"
                    />
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-right mb-4">
              <p className="text-2xl font-bold text-amber-900">Total: ${total.toFixed(2)}</p>
            </div>
            <div className="text-right space-x-4">
              <button onClick={clearCart} className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors">
                Clear Cart
              </button>
              <button onClick={handleCheckout} className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors">
                Checkout
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
