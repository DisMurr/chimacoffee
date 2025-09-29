'use client'

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative py-48 px-4 text-center min-h-[80vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/50 to-black/70"></div>
      <div className="relative z-10 max-w-4xl mx-auto text-white">
        <h2 className="text-7xl font-bold mb-6 drop-shadow-2xl" aria-label="Elevate Your Senses at Chima Coffee">Elevate Your Senses at Chima Coffee</h2>
        <p className="text-3xl text-amber-100 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
          Handcrafted brews from ethically sourced beans, delivered with sophistication.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-amber-900 px-10 py-4 rounded-full hover:bg-amber-100 transition-all duration-300 shadow-2xl text-lg font-semibold"
          aria-label="Reserve Your Table"
        >
          Reserve Your Table
        </motion.button>
      </div>
    </motion.div>
  );
}
