export default function Menu() {
  const coffees = [
    {
      name: "Espresso",
      price: "$3.50",
      description: "A shot of rich, bold espresso made from our finest beans."
    },
    {
      name: "Americano",
      price: "$4.00",
      description: "Espresso diluted with hot water for a smooth, classic taste."
    },
    {
      name: "Latte",
      price: "$4.50",
      description: "Creamy steamed milk with espresso, topped with a light foam."
    },
    {
      name: "Cappuccino",
      price: "$4.00",
      description: "Equal parts espresso, steamed milk, and milk foam."
    },
    {
      name: "Mocha",
      price: "$5.00",
      description: "Chocolate syrup mixed with espresso and steamed milk."
    },
    {
      name: "Cold Brew",
      price: "$4.50",
      description: "Smooth, cold-brewed coffee served over ice."
    }
  ];

  const pastries = [
    {
      name: "Croissant",
      price: "$3.00",
      description: "Flaky, buttery pastry perfect with your coffee."
    },
    {
      name: "Blueberry Muffin",
      price: "$3.50",
      description: "Freshly baked muffin bursting with blueberries."
    },
    {
      name: "Chocolate Chip Cookie",
      price: "$2.50",
      description: "Chewy cookie loaded with chocolate chips."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
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
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-amber-900 mb-2">{item.name}</h3>
                <p className="text-amber-700 mb-3">{item.description}</p>
                <p className="text-xl font-bold text-amber-800">{item.price}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">Pastries</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastries.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-amber-900 mb-2">{item.name}</h3>
                <p className="text-amber-700 mb-3">{item.description}</p>
                <p className="text-lg font-bold text-amber-800">{item.price}</p>
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
      <footer className="bg-amber-900 text-white py-8 text-center">
        <p>&copy; 2025 Chima Coffee. All rights reserved.</p>
      </footer>
    </div>
  );
}