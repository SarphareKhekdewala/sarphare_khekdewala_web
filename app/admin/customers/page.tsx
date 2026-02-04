'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  LogOut,
  Users,
  Phone,
  Mail,
  MapPin,
  ShoppingCart,
  Eye,
} from 'lucide-react';
import Link from 'next/link';
import { formatPrice, formatDate } from '@/lib/utils';

export default function AdminCustomersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated') {
      fetchCustomers();
    }
  }, [status, router]);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/admin/customers');
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-primary-600" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Sarphare Khekdewala</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 hidden md:inline">Welcome, {session?.user?.name}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
            >
              <LogOut size={20} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex gap-6">
            <Link
              href="/admin/dashboard"
              className="px-4 py-3 text-gray-600 hover:text-gray-900 whitespace-nowrap"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/orders"
              className="px-4 py-3 text-gray-600 hover:text-gray-900 whitespace-nowrap"
            >
              Orders
            </Link>
            <Link
              href="/admin/products"
              className="px-4 py-3 text-gray-600 hover:text-gray-900 whitespace-nowrap"
            >
              Products
            </Link>
            <Link
              href="/admin/customers"
              className="px-4 py-3 border-b-2 border-primary-600 text-primary-600 font-medium whitespace-nowrap"
            >
              Customers
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
          <div className="text-gray-600">
            Total: <span className="font-bold text-primary-600">{customers.length}</span>
          </div>
        </div>

        {/* Customers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{customer.name}</h3>
                    <p className="text-sm text-gray-500">
                      {customer._count?.orders || 0} orders
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={16} />
                  <span className="text-sm">{customer.phone}</span>
                </div>
                {customer.email && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={16} />
                    <span className="text-sm truncate">{customer.email}</span>
                  </div>
                )}
                <div className="flex items-start gap-2 text-gray-600">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm line-clamp-2">
                    {customer.address}, {customer.area} - {customer.pincode}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-gray-500 mb-2">
                  Member since {formatDate(customer.createdAt)}
                </p>
                <button
                  onClick={() => setSelectedCustomer(customer)}
                  className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {customers.length === 0 && (
          <div className="text-center py-20">
            <Users size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">No customers yet</p>
          </div>
        )}
      </main>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-bold">Customer Details</h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {/* Customer Info */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {selectedCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{selectedCustomer.name}</h4>
                    <p className="text-gray-500">
                      Customer since {formatDate(selectedCustomer.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="font-medium">{selectedCustomer.phone}</p>
                  </div>
                  {selectedCustomer.email && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <p className="font-medium">{selectedCustomer.email}</p>
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500 mb-1">Address</p>
                    <p className="font-medium">
                      {selectedCustomer.address}<br />
                      {selectedCustomer.area} - {selectedCustomer.pincode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order History */}
              <div>
                <h4 className="font-bold text-lg mb-4">Order History ({selectedCustomer.orders?.length || 0})</h4>
                {selectedCustomer.orders && selectedCustomer.orders.length > 0 ? (
                  <div className="space-y-3">
                    {selectedCustomer.orders.map((order: any) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">#{order.orderNumber}</span>
                          <span className="text-sm text-gray-500">
                            {formatDate(order.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary-600">
                            {formatPrice(order.finalAmount)}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No orders yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
