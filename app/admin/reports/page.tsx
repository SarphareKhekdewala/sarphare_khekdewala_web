'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  LogOut,
  Download,
  Calendar,
  FileText,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import * as XLSX from 'xlsx';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  finalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function ReportsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated') {
      fetchOrders();
    }
  }, [status, router]);

  useEffect(() => {
    filterOrders();
  }, [startDate, endDate, orders]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    if (startDate) {
      filtered = filtered.filter(
        (order) => new Date(order.createdAt) >= new Date(startDate)
      );
    }

    if (endDate) {
      filtered = filtered.filter(
        (order) => new Date(order.createdAt) <= new Date(endDate + 'T23:59:59')
      );
    }

    setFilteredOrders(filtered);
  };

  const exportToExcel = () => {
    const exportData = filteredOrders.map((order) => ({
      'Order Number': order.orderNumber,
      'Customer Name': order.customerName,
      'Email': order.email,
      'Phone': order.phone,
      'Amount': order.finalAmount,
      'Status': order.status,
      'Payment Status': order.paymentStatus,
      'Date': new Date(order.createdAt).toLocaleString(),
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');

    // Set column widths
    ws['!cols'] = [
      { wch: 15 }, // Order Number
      { wch: 20 }, // Customer Name
      { wch: 25 }, // Email
      { wch: 15 }, // Phone
      { wch: 12 }, // Amount
      { wch: 12 }, // Status
      { wch: 15 }, // Payment Status
      { wch: 20 }, // Date
    ];

    const fileName = `orders_report_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  const generateSummary = () => {
    const totalRevenue = filteredOrders
      .filter((o) => o.paymentStatus === 'paid')
      .reduce((sum, order) => sum + order.finalAmount, 0);

    const statusCounts = filteredOrders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalOrders: filteredOrders.length,
      totalRevenue,
      statusCounts,
    };
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

  const summary = generateSummary();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-primary-600" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-sm text-gray-600">Sarphare Khekdewala</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{session?.user?.email}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            <Link
              href="/admin/dashboard"
              className="px-4 py-3 text-gray-600 hover:text-gray-900"
            >
              <LayoutDashboard size={20} className="inline mr-2" />
              Dashboard
            </Link>
            <Link
              href="/admin/orders"
              className="px-4 py-3 text-gray-600 hover:text-gray-900"
            >
              <ShoppingBag size={20} className="inline mr-2" />
              Orders
            </Link>
            <Link
              href="/admin/products"
              className="px-4 py-3 text-gray-600 hover:text-gray-900"
            >
              <Package size={20} className="inline mr-2" />
              Products
            </Link>
            <Link
              href="/admin/customers"
              className="px-4 py-3 text-gray-600 hover:text-gray-900"
            >
              <Users size={20} className="inline mr-2" />
              Customers
            </Link>
            <Link
              href="/admin/reports"
              className="px-4 py-3 text-primary-600 border-b-2 border-primary-600"
            >
              <FileText size={20} className="inline mr-2" />
              Reports
            </Link>
            <Link
              href="/admin/settings"
              className="px-4 py-3 text-gray-600 hover:text-gray-900"
            >
              <Settings size={20} className="inline mr-2" />
              Settings
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Sales Reports</h2>
          <p className="text-gray-600">Generate and export sales reports</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Filter Orders</h3>
          <div className="grid md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  setStartDate('');
                  setEndDate('');
                }}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Orders</h3>
            <p className="text-3xl font-bold text-primary-600">{summary.totalOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Revenue</h3>
            <p className="text-3xl font-bold text-green-600">
              {formatPrice(summary.totalRevenue)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-1">Average Order</h3>
            <p className="text-3xl font-bold text-blue-600">
              {formatPrice(
                summary.totalOrders > 0 ? summary.totalRevenue / summary.totalOrders : 0
              )}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-1">Pending Orders</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {summary.statusCounts['pending'] || 0}
            </p>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Order Status Breakdown</h3>
          <div className="grid md:grid-cols-5 gap-4">
            {Object.entries(summary.statusCounts).map(([status, count]) => (
              <div key={status} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 capitalize mb-1">{status}</p>
                <p className="text-2xl font-bold text-gray-900">{count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Export Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Export Report</h3>
              <p className="text-sm text-gray-600">
                Download {filteredOrders.length} orders as Excel file
              </p>
            </div>
            <button
              onClick={exportToExcel}
              disabled={filteredOrders.length === 0}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Download size={20} />
              <span>Export to Excel</span>
            </button>
          </div>

          {/* Preview Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Order #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.slice(0, 10).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{order.orderNumber}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{order.customerName}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {formatPrice(order.finalAmount)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredOrders.length > 10 && (
              <p className="text-sm text-gray-500 mt-4 text-center">
                Showing first 10 of {filteredOrders.length} orders. Export to see all.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
