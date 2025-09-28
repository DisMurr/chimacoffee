'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaStar, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

      {/* Our Story Section */}
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

      {/* Menu Teaser Carousel */}
      <section className="py-24 px-4 bg-amber-900">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h3 className="text-4xl font-bold text-center text-white mb-16">Featured Menu Items</h3>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            <SwiperSlide>
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=300"
                  alt="Espresso"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-2xl font-bold text-amber-900 mb-2">Espresso</h4>
                  <p className="text-amber-700 mb-4">Rich, bold espresso made from our finest beans.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-amber-900">$3.50</span>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=300"
                  alt="Latte"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-2xl font-bold text-amber-900 mb-2">Latte</h4>
                  <p className="text-amber-700 mb-4">Creamy steamed milk with espresso, topped with foam.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-amber-900">$4.50</span>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=300"
                  alt="Blueberry Muffin"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-2xl font-bold text-amber-900 mb-2">Blueberry Muffin</h4>
                  <p className="text-amber-700 mb-4">Freshly baked muffin bursting with blueberries.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-amber-900">$3.50</span>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=300"
                  alt="Cold Brew"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-2xl font-bold text-amber-900 mb-2">Cold Brew</h4>
                  <p className="text-amber-700 mb-4">Smooth, cold-brewed coffee served over ice.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-amber-900">$4.50</span>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="text-center mt-8">
            <a href="/menu" className="bg-white text-amber-900 px-8 py-3 rounded-full hover:bg-amber-100 transition-colors text-lg font-semibold">
              View Full Menu
            </a>
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
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000 }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            <SwiperSlide>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=150"
                  alt="Sarah M."
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-amber-700 italic mb-4">"The best coffee I've ever had! The atmosphere is perfect for working."</p>
                <p className="font-semibold text-amber-900">- Sarah M.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=150"
                  alt="John D."
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-amber-700 italic mb-4">"Amazing pastries and friendly staff. My new favorite spot!"</p>
                <p className="font-semibold text-amber-900">- John D.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=150"
                  alt="Emma L."
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-amber-700 italic mb-4">"Their cold brew is incredible. Highly recommend!"</p>
                <p className="font-semibold text-amber-900">- Emma L.</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </motion.div>
      </section>

      {/* Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-900 text-white py-4 shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h4 className="text-lg font-semibold">Ready for Great Coffee?</h4>
            <p className="text-sm text-amber-200">Order online for pickup or delivery</p>
          </div>
          <button className="bg-white text-amber-900 px-6 py-2 rounded-full hover:bg-amber-100 transition-colors font-semibold">
            Order Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">☕</span>
                <h2 className="text-2xl font-bold">Chima Coffee</h2>
              </div>
              <p className="text-amber-200 mb-4">Elevating your coffee experience since 2025.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-yellow-300 transition-colors">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="hover:text-yellow-300 transition-colors">
                  <FaInstagram size={24} />
                </a>
                <a href="#" className="hover:text-yellow-300 transition-colors">
                  <FaTwitter size={24} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-yellow-300 transition-colors">Home</a></li>
                <li><a href="/menu" className="hover:text-yellow-300 transition-colors">Menu</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-amber-200 mb-4">Stay updated with our latest brews and offers.</p>
              <form className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-lg text-amber-900 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />
                <button
                  type="submit"
                  className="bg-yellow-500 text-amber-900 px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors font-semibold"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-amber-800 pt-8 text-center">
            <p>&copy; 2025 Chima Coffee. All rights reserved.</p>
            <p className="mt-2">Visit us at 123 Coffee Street, Brew City, Coffee Land</p>
            <p>📧 info@chimacoffee.com | 📞 (123) 456-7890</p>
          </div>
        </div>
      </footer>
    </div>
  )
}