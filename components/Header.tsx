'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Fish, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  cartItemsCount?: number;
}

export default function Header({ cartItemsCount = 0 }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-blue-100">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/logo.png" alt="भांडूपचा सरफरे खेकडेवाला" width={48} height={48} className="h-12 w-auto group-hover:scale-105 transition-transform rounded-xl" priority />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-all hover:scale-105"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-all hover:scale-105"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-blue-600 transition-all hover:scale-110 p-2"
            >
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/cart"
                className="text-gray-700 hover:text-primary-600 font-medium flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart size={20} />
                Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
