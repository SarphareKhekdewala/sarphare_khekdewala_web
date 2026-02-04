'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import CartItemCard from '@/components/CartItemCard';
import { CartItem } from '@/types';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCartFromStorage();
  }, []);

  const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const saveCartToStorage = (newCart: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    const newCart = cart.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCartToStorage(newCart);
  };

  const handleRemoveItem = (productId: string) => {
    const newCart = cart.filter((item) => item.product.id !== productId);
    saveCartToStorage(newCart);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) return;
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemsCount={cart.length} />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Add some fresh seafood to get started!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Products
              <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <CartItemCard
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery Charge</span>
                    <span className="text-sm text-gray-500">
                      Calculated at checkout
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-primary-600">{formatPrice(subtotal)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      + delivery charges
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-accent-500 hover:bg-accent-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </button>

                <Link
                  href="/products"
                  className="block text-center text-primary-600 hover:text-primary-700 font-medium mt-4"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
