'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { CartItem } from '@/types';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';
import { CreditCard, Wallet } from 'lucide-react';

interface DeliveryArea {
  id: string;
  area: string;
  charge: number;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [deliveryAreas, setDeliveryAreas] = useState<DeliveryArea[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    pincode: '',
    area: '',
    notes: '',
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    // Fetch delivery areas
    fetch('/api/delivery-areas')
      .then(res => res.json())
      .then(data => setDeliveryAreas(data))
      .catch(err => console.error('Failed to fetch delivery areas:', err));

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const selectedArea = Array.isArray(deliveryAreas) ? deliveryAreas.find(a => a.area === formData.area) : null;
  const deliveryCharge = selectedArea ? selectedArea.charge : 0;
  const total = subtotal + deliveryCharge;
  
  const filteredAreas = Array.isArray(deliveryAreas) ? deliveryAreas.filter(area =>
    area.area.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAreaSelect = (area: string) => {
    setFormData((prev) => ({ ...prev, area }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.area || !formData.pincode) {
      toast.error('Please fill in all required fields');
      return false;
    }
    if (formData.phone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setLoading(true);

    try {
      // Create order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            area: formData.area,
            pincode: formData.pincode,
          },
          items: cart.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
            total: item.product.price * item.quantity,
          })),
          deliveryCharge,
          notes: formData.notes,
        }),
      });

      if (!orderResponse.ok) throw new Error('Failed to create order');
      
      const order = await orderResponse.json();

      // Create Razorpay order
      const paymentResponse = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          amount: total,
        }),
      });

      if (!paymentResponse.ok) throw new Error('Failed to initiate payment');
      
      const paymentData = await paymentResponse.json();

      // Open Razorpay checkout
      const options = {
        key: paymentData.key,
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: 'Sarphare Khekdewala',
        description: `Order #${order.orderNumber}`,
        order_id: paymentData.orderId,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: order.id,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            if (verifyResponse.ok) {
              localStorage.removeItem('cart');
              toast.success('Order placed successfully!');
              router.push(`/order-confirmation?orderId=${order.id}`);
            } else {
              toast.error('Payment verification failed');
            }
          } catch (error) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#1890ff',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to process order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header cartItemsCount={0} />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Your cart is empty
            </h2>
            <button
              onClick={() => router.push('/products')}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemsCount={cart.length} />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Delivery Details Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Delivery Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    maxLength={10}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Area * (Search your area)
                  </label>
                  <input
                    type="text"
                    value={formData.area ? formData.area : searchTerm}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSearchTerm(value);
                      setFormData({...formData, area: ''});
                    }}
                    onFocus={() => {
                      if (formData.area) {
                        setSearchTerm(formData.area);
                        setFormData({...formData, area: ''});
                      }
                    }}
                    placeholder="Search area (e.g., Bhandup, Thane...)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent mb-2"
                  />
                  {searchTerm && !formData.area && (
                    <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg bg-white shadow-lg">
                      {filteredAreas.length > 0 ? (
                        filteredAreas.map((area) => (
                          <button
                            key={area.id}
                            type="button"
                            onClick={() => {
                              setFormData({...formData, area: area.area});
                              setSearchTerm('');
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-primary-50 transition-colors border-b border-gray-100 last:border-b-0"
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{area.area}</span>
                              <span className="text-sm text-primary-600 font-semibold">₹{area.charge}</span>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-gray-500 text-center">
                          No areas found. Try another search term.
                        </div>
                      )}
                    </div>
                  )}
                  {formData.area && (
                    <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-green-800 font-medium">✔ Selected: {formData.area}</span>
                        <span className="text-green-600 font-bold">₹{deliveryCharge}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    maxLength={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="6-digit pincode"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complete Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="House/Flat No., Building Name, Street, Landmark"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Any special instructions for delivery"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.product.name} × {item.quantity} {item.product.unit}
                    </span>
                    <span className="font-semibold">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}

                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery Charge</span>
                    <span className="font-semibold">
                      {deliveryCharge > 0 ? formatPrice(deliveryCharge) : '-'}
                    </span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-primary-600">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  'Processing...'
                ) : (
                  <>
                    <Wallet size={20} />
                    Pay with Razorpay
                  </>
                )}
              </button>

              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <CreditCard size={16} />
                  <span>Secure payment powered by Razorpay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
