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
            <div className="flex space-x-6">
              <a href="/" className="text-white hover:text-amber-200 transition-colors">Home</a>
              <a href="/menu" className="text-white hover:text-amber-200 transition-colors">Menu</a>
              <a href="#" className="text-white hover:text-amber-200 transition-colors">About</a>
              <a href="#" className="text-white hover:text-amber-200 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200/30 via-transparent to-transparent"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-bold text-amber-900 mb-6 animate-fade-in">
            Welcome to Chima Coffee
          </h2>
          <p className="text-2xl text-amber-800 mb-8 max-w-2xl mx-auto leading-relaxed">
            Indulge in the perfect blend of rich aromas and exquisite flavors. Our expertly crafted coffee awaits you.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-amber-600 text-white px-8 py-4 rounded-full hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg font-semibold">
              Order Now
            </button>
            <a href="/menu" className="border-2 border-amber-600 text-amber-600 px-8 py-4 rounded-full hover:bg-amber-600 hover:text-white transition-all duration-300 text-lg font-semibold">
              View Menu
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-amber-900 mb-16">Why Choose Chima Coffee?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-amber-100">
              <div className="text-5xl mb-6 text-center">🍵</div>
              <h4 className="text-2xl font-semibold text-amber-900 mb-4 text-center">Premium Menu</h4>
              <p className="text-amber-700 text-center leading-relaxed">
                Discover our curated selection of coffees, teas, and artisanal pastries made with the finest ingredients.
              </p>
              <div className="mt-6 text-center">
                <a href="/menu" className="inline-block bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors">
                  Explore Menu
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-amber-100">
              <div className="text-5xl mb-6 text-center">🌱</div>
              <h4 className="text-2xl font-semibold text-amber-900 mb-4 text-center">Sustainable Sourcing</h4>
              <p className="text-amber-700 text-center leading-relaxed">
                We're committed to ethical sourcing and sustainable practices to bring you the best coffee possible.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-amber-100">
              <div className="text-5xl mb-6 text-center">🏠</div>
              <h4 className="text-2xl font-semibold text-amber-900 mb-4 text-center">Cozy Atmosphere</h4>
              <p className="text-amber-700 text-center leading-relaxed">
                Relax in our warm, inviting space perfect for work, meetings, or simply enjoying great coffee.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-amber-100">
              <div className="text-5xl mb-6 text-center">🚚</div>
              <h4 className="text-2xl font-semibold text-amber-900 mb-4 text-center">Fast Delivery</h4>
              <p className="text-amber-700 text-center leading-relaxed">
                Quick and reliable delivery service to bring our delicious coffee right to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-amber-900 mb-16">What Our Customers Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-amber-700 italic mb-4">"The best coffee I've ever had! The atmosphere is perfect for working."</p>
              <p className="font-semibold text-amber-900">- Sarah M.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-amber-700 italic mb-4">"Amazing pastries and friendly staff. My new favorite spot!"</p>
              <p className="font-semibold text-amber-900">- John D.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-amber-700 italic mb-4">"Their cold brew is incredible. Highly recommend!"</p>
              <p className="font-semibold text-amber-900">- Emma L.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <span className="text-2xl">☕</span>
            <h2 className="text-2xl font-bold">Chima Coffee</h2>
          </div>
          <p className="mb-4">&copy; 2025 Chima Coffee. All rights reserved.</p>
          <p className="mb-4">Visit us at 123 Coffee Street, Brew City, Coffee Land</p>
          <p>📧 info@chimacoffee.com | 📞 (123) 456-7890</p>
          <div className="flex justify-center space-x-6 mt-6">
            <a href="#" className="hover:text-amber-200 transition-colors">Facebook</a>
            <a href="#" className="hover:text-amber-200 transition-colors">Instagram</a>
            <a href="#" className="hover:text-amber-200 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  )
}