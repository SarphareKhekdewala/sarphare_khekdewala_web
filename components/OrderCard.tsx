'use client';

import { Order } from '@/types';
import { formatDate, formatPrice } from '@/lib/utils';

interface OrderCardProps {
  order: any;
  onViewDetails?: (order: any) => void;
  onUpdateStatus?: (orderId: string, status: string) => void;
}

export default function OrderCard({ order, onViewDetails, onUpdateStatus }: OrderCardProps) {
  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    processing: 'bg-purple-100 text-purple-800',
    'out-for-delivery': 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const paymentStatusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-gray-900">{order.orderNumber}</h3>
          <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-xl text-primary-600">
            {formatPrice(order.finalAmount)}
          </p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="mb-4 pb-4 border-b">
        <p className="font-semibold text-gray-900">{order.customer.name}</p>
        <p className="text-sm text-gray-600">{order.customer.phone}</p>
        <p className="text-sm text-gray-600">
          {order.customer.area} - {order.customer.pincode}
        </p>
      </div>

      {/* Items */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">Items:</p>
        <div className="space-y-1">
          {order.items.map((item: any, index: number) => (
            <p key={index} className="text-sm text-gray-600">
              {item.product.name} - {item.quantity} {item.product.unit}
            </p>
          ))}
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex gap-2 mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            statusColors[order.status]
          }`}
        >
          {order.status.replace('-', ' ').toUpperCase()}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            paymentStatusColors[order.paymentStatus]
          }`}
        >
          {order.paymentStatus.toUpperCase()}
        </span>
      </div>

      {/* Actions */}
      {onViewDetails && (
        <button
          onClick={() => onViewDetails(order)}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-semibold transition-colors"
        >
          View Details
        </button>
      )}
    </div>
  );
}
