'use client'

import { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function Success() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 dark:text-white">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl font-bold text-amber-900 mb-8">Thank You for Your Order!</h1>
        <p className="text-amber-700 text-lg mb-6">Your payment was successful. We'll prepare your order shortly.</p>
        <a href="/" className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors">
          Back to Home
        </a>
      </main>
      <Footer />
    </div>
  );
}
