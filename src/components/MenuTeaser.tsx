'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function MenuTeaser() {
  const { addToCart } = useCart();
  return (
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
                  <button onClick={() => addToCart({ id: 'espresso', name: 'Espresso', price: 3.50 })} className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
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
                  <button onClick={() => addToCart({ id: 'latte', name: 'Latte', price: 4.50 })} className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
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
                  <button onClick={() => addToCart({ id: 'blueberry-muffin', name: 'Blueberry Muffin', price: 3.50 })} className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
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
                  <button onClick={() => addToCart({ id: 'cold-brew', name: 'Cold Brew', price: 4.50 })} className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
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
  );
}
