'use client'

import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 dark:text-white">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 py-24">
        <h1 className="text-5xl font-bold text-amber-900 mb-8 text-center">About Chima Coffee</h1>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-amber-800 mb-4">Our Story</h2>
          <p className="text-amber-700 text-lg leading-relaxed">
            Founded in 2025, Chima Coffee started as a small passion project dedicated to bringing the finest coffee experiences to our community. Our founder, inspired by travels around the world and a love for artisanal brewing, set out to create a space where quality meets comfort.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-amber-800 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 text-amber-700 text-lg">
            <li>Sustainability: We source beans from ethical, eco-friendly farms.</li>
            <li>Quality: Every cup is crafted with precision and care.</li>
            <li>Community: Building connections through great coffee and warm spaces.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-3xl font-semibold text-amber-800 mb-4">Our Team</h2>
          <p className="text-amber-700 text-lg leading-relaxed">
            Our team of passionate baristas and coffee enthusiasts is dedicated to making your visit memorable. From expert roasters to friendly staff, we're here to elevate your coffee experience.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
