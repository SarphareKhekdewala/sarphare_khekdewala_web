'use client';

import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(0.5); // Default 0.5 kg

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(0.5, quantity + delta);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(0.5); // Reset to default
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
      {/* Product Image */}
      <div className="relative aspect-video bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <ShoppingCart size={64} className="text-blue-400 mx-auto mb-2" />
              <p className="text-blue-600 font-semibold">Fresh Seafood</p>
            </div>
          </div>
        )}
        {product.available && (
          <div className="absolute top-3 right-3">
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">In Stock</span>
          </div>
        )}
        {!product.available && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-xl">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        {product.nameMarathi && (
          <p className="text-sm text-blue-600 font-medium mb-3">{product.nameMarathi}</p>
        )}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-5 bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg">
          <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </span>
          <span className="text-gray-600 font-medium">/ {product.unit}</span>
        </div>

        {/* Quantity Selector */}
        {product.available && (
          <>
            <div className="flex items-center justify-center gap-4 mb-4 bg-gray-50 p-3 rounded-xl">
              <button
                onClick={() => handleQuantityChange(-0.5)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white flex items-center justify-center transition-all transform hover:scale-110 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity <= 0.5}
              >
                <Minus size={18} />
              </button>
              <span className="font-bold text-lg min-w-[80px] text-center text-gray-800">
                {quantity} {product.unit}
              </span>
              <button
                onClick={() => handleQuantityChange(0.5)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white flex items-center justify-center transition-all transform hover:scale-110 shadow-md"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-lg"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
}
