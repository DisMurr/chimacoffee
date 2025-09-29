'use client'

import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
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
  );
}
