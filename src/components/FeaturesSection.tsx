'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function FeaturesSection() {
  return (
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
  );
}
