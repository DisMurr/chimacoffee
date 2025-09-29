import { supabase } from '../../lib/supabase';

export default async function Menu() {
  const { data: menuItems } = await supabase.from('menu_items').select('*');

  const coffees = menuItems?.filter(item => item.category === 'coffee') || [];
  const pastries = menuItems?.filter(item => item.category === 'pastry') || [];
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 dark:text-white">
      {/* Header */}
      <header className="p-4 text-center">
        <h1 className="text-4xl font-bold text-amber-900">☕ Chima Coffee</h1>
        <p className="text-lg text-amber-700 mt-2">Our Menu</p>
      </header>

      {/* Menu Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">Coffee Selection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {coffees.map((item, index) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-amber-900 dark:text-gray-200 mb-2">{item.name}</h3>
                <p className="text-amber-700 dark:text-gray-300 mb-3">{item.description}</p>
                <p className="text-xl font-bold text-amber-800 dark:text-gray-100">{item.price}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-center text-amber-900 dark:text-gray-200 mb-12">Pastries</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastries.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-amber-900 dark:text-gray-200 mb-2">{item.name}</h3>
                <p className="text-amber-700 dark:text-gray-300 mb-3">{item.description}</p>
                <p className="text-lg font-bold text-amber-800 dark:text-gray-100">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="text-center py-8">
        <a href="/" className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors">
          Back to Home
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 dark:bg-gray-900 text-white dark:text-gray-200 py-8 text-center">
        <p>&copy; 2025 Chima Coffee. All rights reserved.</p>
      </footer>
    </div>
  );
}
