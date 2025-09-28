'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Navigation */}
      <nav className="bg-amber-900 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">☕</span>
              <h1 className="text-xl font-bold text-white">Chima Coffee</h1>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
              <a href="/" className="text-white hover:text-yellow-300 transition-colors">Home</a>
              <a href="/menu" className="text-white hover:text-yellow-300 transition-colors">Menu</a>
              <a href="#" className="text-white hover:text-yellow-300 transition-colors">About</a>
              <a href="#" className="text-white hover:text-yellow-300 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative py-48 px-4 text-center min-h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/50 to-black/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-white">
          <h2 className="text-7xl font-bold mb-6 drop-shadow-2xl">Elevate Your Senses at Chima Coffee</h2>
          <p className="text-3xl text-amber-100 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Handcrafted brews from ethically sourced beans, delivered with sophistication.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-amber-900 px-10 py-4 rounded-full hover:bg-amber-100 transition-all duration-300 shadow-2xl text-lg font-semibold"
          >
            Reserve Your Table
          </motion.button>
        </div>
      </motion.div>

      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-amber-50 to-cream-50">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h3 className="text-4xl font-bold text-center text-amber-900 mb-16">Why Choose Chima Coffee?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-xl overflow-hidden shadow-2xl group"
            >
              <Image
                src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Premium Menu"
                width={400}
                height={600}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent flex flex-col justify-end p-6">
                <h4 className="text-2xl font-bold text-white mb-2">Premium Menu</h4>
                <p className="text-amber-100">Discover our curated selection of coffees, teas, and artisanal pastries.</p>
                <a href="/menu" className="mt-4 inline-block bg-white text-amber-900 px-4 py-2 rounded-lg hover:bg-amber-100 transition-colors">
                  Explore Menu
                </a>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-xl overflow-hidden shadow-2xl group"
            >
              <Image
                src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Sustainable Sourcing"
                width={400}
                height={600}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent flex flex-col justify-end p-6">
                <h4 className="text-2xl font-bold text-white mb-2">Ethical Origins</h4>
                <p className="text-amber-100">Beans sourced from sustainable farms worldwide, ensuring quality and responsibility.</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-xl overflow-hidden shadow-2xl group"
            >
              <Image
                src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Cozy Atmosphere"
                width={400}
                height={600}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent flex flex-col justify-end p-6">
                <h4 className="text-2xl font-bold text-white mb-2">Cozy Atmosphere</h4>
                <p className="text-amber-100">Relax in our warm, inviting space perfect for work, meetings, or great coffee.</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-xl overflow-hidden shadow-2xl group"
            >
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Fast Delivery"
                width={400}
                height={600}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent flex flex-col justify-end p-6">
                <h4 className="text-2xl font-bold text-white mb-2">Swift Service</h4>
                <p className="text-amber-100">Quick and reliable delivery to bring our delicious coffee right to your doorstep.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-amber-100 to-orange-100">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h3 className="text-4xl font-bold text-amber-900 mb-16">What Our Patrons Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-md relative"
            >
              <div className="text-4xl text-amber-300 mb-4">"</div>
              <p className="text-amber-700 italic mb-4">"The best coffee I've ever had! The atmosphere is perfect for working."</p>
              <div className="text-yellow-400 mb-2">★★★★★</div>
              <p className="font-semibold text-amber-900">- Sarah M.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-md relative"
            >
              <div className="text-4xl text-amber-300 mb-4">"</div>
              <p className="text-amber-700 italic mb-4">"Amazing pastries and friendly staff. My new favorite spot!"</p>
              <div className="text-yellow-400 mb-2">★★★★★</div>
              <p className="font-semibold text-amber-900">- John D.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-md relative"
            >
              <div className="text-4xl text-amber-300 mb-4">"</div>
              <p className="text-amber-700 italic mb-4">"Their cold brew is incredible. Highly recommend!"</p>
              <div className="text-yellow-400 mb-2">★★★★★</div>
              <p className="font-semibold text-amber-900">- Emma L.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <span className="text-2xl">☕</span>
            <h2 className="text-2xl font-bold">Chima Coffee</h2>
          </div>
          <p className="mb-4">&copy; 2025 Chima Coffee. All rights reserved.</p>
          <p className="mb-4">Visit us at 123 Coffee Street, Brew City, Coffee Land</p>
          <p>📧 info@chimacoffee.com | 📞 (123) 456-7890</p>
          <div className="flex justify-center space-x-6 mt-6">
            <a href="#" className="hover:text-yellow-300 transition-colors">Facebook</a>
            <a href="#" className="hover:text-yellow-300 transition-colors">Instagram</a>
            <a href="#" className="hover:text-yellow-300 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  )
}