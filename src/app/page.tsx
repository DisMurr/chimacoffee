'use client'

import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import StorySection from '../components/StorySection';
import FeaturesSection from '../components/FeaturesSection';
import MenuTeaser from '../components/MenuTeaser';
import TestimonialsSection from '../components/TestimonialsSection';
import StickyCTABar from '../components/StickyCTABar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 dark:text-white">
      <Navigation />
      <Hero />
      <StorySection />
      <FeaturesSection />
      <MenuTeaser />
      <TestimonialsSection />
      <StickyCTABar />
      <Footer />
    </div>
  );
}
