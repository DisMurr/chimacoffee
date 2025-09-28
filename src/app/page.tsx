export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      {/* Header */}
      <header className="p-4 text-center">
        <h1 className="text-5xl font-bold text-amber-900">☕ Chima Coffee</h1>
        <p className="text-lg text-amber-700 mt-2">Brewing the finest coffee since 2025</p>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h2 className="text-4xl font-semibold text-amber-900 mb-4">Welcome to Chima Coffee</h2>
        <p className="text-xl text-amber-800 mb-8 max-w-2xl mx-auto">
          Experience the rich aroma and bold flavors of our expertly crafted coffee. From single-origin beans to creamy lattes, we serve perfection in every cup.
        </p>
        <button className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors text-lg font-semibold">
          Order Now
        </button>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-amber-900 mb-12">What We Offer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🍵</div>
              <h4 className="text-2xl font-semibold text-amber-900 mb-3">Menu</h4>
              <p className="text-amber-700">Explore our diverse menu of coffees, teas, and freshly baked pastries made with love.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏢</div>
              <h4 className="text-2xl font-semibold text-amber-900 mb-3">About</h4>
              <p className="text-amber-700">Learn about our story, our passion for coffee, and our commitment to quality and sustainability.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📞</div>
              <h4 className="text-2xl font-semibold text-amber-900 mb-3">Contact</h4>
              <p className="text-amber-700">Get in touch for reservations, catering, or any questions. We're here to serve you.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🛒</div>
              <h4 className="text-2xl font-semibold text-amber-900 mb-3">Order</h4>
              <p className="text-amber-700">Place your order online for pickup or delivery. Fresh coffee at your doorstep.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-8 text-center">
        <p className="text-lg">&copy; 2025 Chima Coffee. All rights reserved.</p>
        <p className="mt-2">Visit us at 123 Coffee Street, Brew City, Coffee Land</p>
        <p className="mt-2">📧 info@chimacoffee.com | 📞 (123) 456-7890</p>
      </footer>
    </div>
  )
}