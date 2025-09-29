'use client'

import { motion } from 'framer-motion';

export default function StorySection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-amber-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h3 className="text-5xl font-bold text-amber-900 mb-12">From Bean to Brew</h3>
        <p className="text-xl text-amber-700 mb-8 leading-relaxed">
          Founded in 2025, Chima Coffee began as a passion project in a small garage, driven by our founder's love for exceptional coffee.
          We source the finest beans from sustainable farms around the world, roast them with precision, and craft each cup with artistry.
          What started as a dream has become a community hub where every sip tells a story of quality, care, and connection.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl mb-4">🌱</div>
            <h4 className="text-2xl font-semibold text-amber-900 mb-2">Sustainable Sourcing</h4>
            <p className="text-amber-700">Direct partnerships with ethical farmers for the best beans.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🔥</div>
            <h4 className="text-2xl font-semibold text-amber-900 mb-2">Artisan Roasting</h4>
            <p className="text-amber-700">Small-batch roasting to unlock unique flavors in every bean.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">❤️</div>
            <h4 className="text-2xl font-semibold text-amber-900 mb-2">Community Focus</h4>
            <p className="text-amber-700">Building connections through coffee, one cup at a time.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
