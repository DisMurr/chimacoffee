export const dynamic = 'force-dynamic';

import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { supabase } from '../../lib/supabase';

export default async function Menu() {
  let items: any[] = [];
  try {
    const { data } = await supabase.from('menu_items').select('*');
    items = Array.isArray(data) ? data : [];
  } catch {}

  const coffees = items.filter((item) => item.category === 'coffee');
  const pastries = items.filter((item) => item.category === 'pastry');
  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 dark:text-white">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-24">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-amber-900 dark:text-gray-100">Our Menu</h1>
          <p className="text-lg text-amber-700 dark:text-gray-300 mt-2">Carefully crafted coffees and freshly baked pastries</p>
        </header>

        {isEmpty ? (
          <div className="text-center bg-white dark:bg-gray-800 rounded-xl p-10 shadow">
            <h2 className="text-2xl font-semibold text-amber-900 dark:text-gray-100 mb-3">Menu coming soon</h2>
            <p className="text-amber-700 dark:text-gray-300">We are updating our selections. Please check back later!</p>
          </div>
        ) : (
          <>
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center text-amber-900 dark:text-gray-100 mb-8">Coffee Selection</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {coffees.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold text-amber-900 dark:text-gray-100 mb-2">{item.name}</h3>
                    <p className="text-amber-700 dark:text-gray-300 mb-3">{item.description}</p>
                    <p className="text-xl font-bold text-amber-800 dark:text-gray-100">${Number(item.price).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-center text-amber-900 dark:text-gray-100 mb-8">Pastries</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pastries.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-amber-900 dark:text-gray-100 mb-2">{item.name}</h3>
                    <p className="text-amber-700 dark:text-gray-300 mb-3">{item.description}</p>
                    <p className="text-lg font-bold text-amber-800 dark:text-gray-100">${Number(item.price).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
