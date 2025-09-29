'use client'

import { useEffect, useState } from 'react';
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

type Testimonial = {
  id: string | number;
  name: string;
  image_url: string;
  rating: number;
  quote: string;
};

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 'fallback-1',
    name: 'Sarah M.',
    image_url:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    quote: "The best coffee I've ever had! The atmosphere is perfect for working.",
  },
  {
    id: 'fallback-2',
    name: 'John D.',
    image_url:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    quote: 'Amazing pastries and friendly staff. My new favorite spot!',
  },
  {
    id: 'fallback-3',
    name: 'Emma L.',
    image_url:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    quote: 'Their cold brew is incredible. Highly recommend!',
  },
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error, status } = await supabase
          .from('testimonials')
          .select('*');

        if (error) {
          // If table missing (404) or any error, keep fallback and log for debugging
          console.warn('Supabase testimonials error:', { status, error });
          return;
        }
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setTestimonials(data as Testimonial[]);
        }
      } catch (e) {
        console.warn('Supabase testimonials fetch failed:', e);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

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
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <Image
                  src={t.image_url}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <div className="flex justify-center mb-4">
                  {[...Array(Math.max(0, Math.min(5, t.rating || 0)))].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-amber-700 dark:text-gray-300 italic mb-4">"{t.quote}"</p>
                <p className="font-semibold text-amber-900 dark:text-gray-200">- {t.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}
