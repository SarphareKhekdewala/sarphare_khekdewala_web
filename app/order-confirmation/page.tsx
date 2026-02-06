'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { CheckCircle, Package, Phone } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-gray-600 mb-4">Order not found</p>
          <button
            onClick={() => router.push('/products')}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center mb-6">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We will contact you shortly to confirm the delivery time.
            </p>
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-2xl font-bold text-primary-600">{order.orderNumber}</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Package size={24} />
              Order Details
            </h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-semibold">{formatDate(order.createdAt)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment Status:</span>
                <span className="font-semibold text-green-600">
                  {order.paymentStatus.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Order Status:</span>
                <span className="font-semibold text-blue-600">
                  {order.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-900 mb-3">Items Ordered:</h3>
              <div className="space-y-2">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.product.name} × {item.quantity} {item.product.unit}
                    </span>
                    <span className="font-semibold">{formatPrice(item.total)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">{formatPrice(order.totalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Charge:</span>
                  <span className="font-semibold">{formatPrice(order.deliveryCharge)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary-600">{formatPrice(order.finalAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Phone size={24} />
              Delivery Information
            </h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Name:</span> {order.customer.name}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Phone:</span> {order.customer.phone}
              </p>
              {order.customer.email && (
                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span> {order.customer.email}
                </p>
              )}
              <p className="text-gray-700">
                <span className="font-semibold">Address:</span><br />
                {order.customer.address}<br />
                {order.customer.area} - {order.customer.pincode}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/products')}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => window.print()}
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
