'use client'

import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../context/CartContext';
import DarkModeToggle from './DarkModeToggle';

export default function Navigation() {
  const { cart } = useCart();
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
            <a href="/" className="text-white hover:text-yellow-300 dark:text-gray-200 dark:hover:text-yellow-300 transition-colors" aria-label="Home">Home</a>
            <a href="/menu" className="text-white hover:text-yellow-300 dark:text-gray-200 dark:hover:text-yellow-300 transition-colors" aria-label="Menu">Menu</a>
            <a href="/about" className="text-white hover:text-yellow-300 dark:text-gray-200 dark:hover:text-yellow-300 transition-colors" aria-label="About">About</a>
            <a href="#" className="text-white hover:text-yellow-300 transition-colors">Contact</a>
            <a href="/cart" className="text-white hover:text-yellow-300 transition-colors">Cart ({cart.reduce((total: number, item: CartItem) => total + item.quantity, 0)})</a>
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
            <a href="/" className="block text-white hover:text-yellow-300 transition-colors py-2">Home</a>
            <a href="/menu" className="block text-white hover:text-yellow-300 transition-colors py-2">Menu</a>
            <a href="#" className="block text-white hover:text-yellow-300 transition-colors py-2">About</a>
            <a href="#" className="block text-white hover:text-yellow-300 transition-colors py-2">Contact</a>
            <a href="/cart" className="block text-white hover:text-yellow-300 transition-colors py-2">Cart ({cart.reduce((total: number, item: CartItem) => total + item.quantity, 0)})</a>
            <div className="py-2"><DarkModeToggle /></div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
