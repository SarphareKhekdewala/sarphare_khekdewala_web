'use client';

import { CartItem } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(0.5, item.quantity + delta);
    onUpdateQuantity(item.product.id, newQuantity);
  };

  const subtotal = item.product.price * item.quantity;

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow-md">
      {/* Product Image */}
      <div className="w-24 h-24 relative flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
        {item.product.image ? (
          <Image
            src={item.product.image}
            alt={item.product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 mb-1">{item.product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">
          {formatPrice(item.product.price)} / {item.product.unit}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuantityChange(-0.5)}
            className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
            disabled={item.quantity <= 0.5}
          >
            <Minus size={14} />
          </button>
          <span className="font-semibold min-w-[60px] text-center">
            {item.quantity} {item.product.unit}
          </span>
          <button
            onClick={() => handleQuantityChange(0.5)}
            className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Price & Remove */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => onRemove(item.product.id)}
          className="text-red-500 hover:text-red-700 transition-colors"
          title="Remove item"
        >
          <Trash2 size={20} />
        </button>
        <p className="font-bold text-lg text-primary-600">
          {formatPrice(subtotal)}
        </p>
      </div>
    </div>
  );
}
