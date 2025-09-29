'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { supabase } from '../lib/supabase';

export default async function TestimonialsSection() {
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*');

  return (
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
          {testimonials?.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <Image
                  src={testimonial.image_url}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-amber-700 dark:text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-amber-900 dark:text-gray-200">- {testimonial.name}</p>
              </div>
            </SwiperSlide>
          )) || []}
        </Swiper>
      </motion.div>
    </section>
  );
}
