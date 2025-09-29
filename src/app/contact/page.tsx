'use client'

import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 dark:text-white">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 py-24">
        <h1 className="text-5xl font-bold text-amber-900 mb-8 text-center">Contact Us</h1>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-amber-800 mb-4">Get in Touch</h2>
          <p className="text-amber-700 text-lg leading-relaxed mb-6">
            We'd love to hear from you! Whether you have questions about our menu, want to make a reservation, or have feedback, feel free to reach out.
          </p>
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500" />
            <input type="email" placeholder="Your Email" className="w-full p-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500" />
            <textarea placeholder="Your Message" rows={5} className="w-full p-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"></textarea>
            <button type="submit" className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors">Send Message</button>
          </form>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-amber-800 mb-4">Our Location</h2>
          <p className="text-amber-700 text-lg">123 Coffee Street, Brew City, Coffee Land</p>
          <p className="text-amber-700 text-lg">Phone: (123) 456-7890</p>
          <p className="text-amber-700 text-lg">Email: info@chimacoffee.com</p>
          {/* Placeholder for map */}
          <div className="mt-6 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Map would go here (e.g., Google Maps embed)</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
