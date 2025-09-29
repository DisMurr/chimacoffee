import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

describe('CartContext', () => {
  it('adds item to cart', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({ id: '1', name: 'Test', price: 10 });
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toEqual({ id: '1', name: 'Test', price: 10, quantity: 1 });
  });

  it('removes item from cart', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({ id: '1', name: 'Test', price: 10 });
      result.current.removeFromCart('1');
    });

    expect(result.current.cart).toHaveLength(0);
  });
});
