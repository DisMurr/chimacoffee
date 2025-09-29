'use client'

import Link from 'next/link';

export default function StickyCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-amber-900 text-white py-4 shadow-lg z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold">Ready for Great Coffee?</h4>
          <p className="text-sm text-amber-200">Order online for pickup or delivery</p>
        </div>
        <Link href="/cart" className="bg-white text-amber-900 px-6 py-2 rounded-full hover:bg-amber-100 transition-colors font-semibold">
          Order Now
        </Link>
      </div>
    </div>
  );
}
