'use client'

import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../context/CartContext';
import DarkModeToggle from './DarkModeToggle';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Navigation() {
  const { cart } = useCart();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-amber-900 dark:bg-gray-900 shadow-lg dark:shadow-gray-700">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">☕</span>
            <h1 className="text-xl font-bold text-white dark:text-gray-200">Chima Coffee</h1>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-white hover:text-yellow-300 dark:text-gray-200 dark:hover:text-yellow-300 transition-colors" aria-label="Home">Home</Link>
            <Link href="/menu" className="text-white hover:text-yellow-300 dark:text-gray-200 dark:hover:text-yellow-300 transition-colors" aria-label="Menu">Menu</Link>
            <Link href="/about" className="text-white hover:text-yellow-300 dark:text-gray-200 dark:hover:text-yellow-300 transition-colors" aria-label="About">About</Link>
            <Link href="/contact" className="text-white hover:text-yellow-300 transition-colors">Contact</Link>
            {user ? (
              <Link href="/account" className="text-white hover:text-yellow-300 transition-colors">Account</Link>
            ) : (
              <Link href="/auth" className="text-white hover:text-yellow-300 transition-colors">Sign In</Link>
            )}
            <Link href="/cart" className="text-white hover:text-yellow-300 transition-colors">Cart ({cart.reduce((total: number, item: CartItem) => total + item.quantity, 0)})</Link>
            <DarkModeToggle />
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-amber-800 mt-4 rounded-lg p-4"
          >
            <Link href="/" className="block text-white hover:text-yellow-300 transition-colors py-2">Home</Link>
            <Link href="/menu" className="block text-white hover:text-yellow-300 transition-colors py-2">Menu</Link>
            <Link href="/about" className="block text-white hover:text-yellow-300 transition-colors py-2">About</Link>
            <Link href="/contact" className="block text-white hover:text-yellow-300 transition-colors py-2">Contact</Link>
            {user ? (
              <Link href="/account" className="block text-white hover:text-yellow-300 transition-colors py-2">Account</Link>
            ) : (
              <Link href="/auth" className="block text-white hover:text-yellow-300 transition-colors py-2">Sign In</Link>
            )}
            <Link href="/cart" className="block text-white hover:text-yellow-300 transition-colors py-2">Cart ({cart.reduce((total: number, item: CartItem) => total + item.quantity, 0)})</Link>
            <div className="py-2"><DarkModeToggle /></div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
