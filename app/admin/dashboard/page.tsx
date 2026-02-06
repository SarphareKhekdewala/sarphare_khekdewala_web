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
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  BarChart3,
  Settings,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated') {
      fetchStats();
    }
  }, [status]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
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
            <span className="text-gray-700">Welcome, {session?.user?.name}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-6">
            <Link
              href="/admin/dashboard"
              className="px-4 py-3 border-b-2 border-primary-600 text-primary-600 font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/orders"
              className="px-4 py-3 text-gray-600 hover:text-gray-900"
            >
              Orders
            </Link>
            <Link
              href="/admin/products"
              className="px-4 py-3 text-gray-600 hover:text-gray-900"
            >
              Products
            </Link>
            <Link
              href="/admin/customers"
              className="px-4 py-3 text-gray-600 hover:text-gray-900"
            >
              Customers
            </Link>
            <Link
              href="/admin/reports"
              className="px-4 py-3 text-gray-600 hover:text-gray-900"
            >
              Reports
            </Link>
            <Link
              href="/admin/settings"
              className="px-4 py-3 text-gray-600 hover:text-gray-900"
            >
              Settings
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="text-blue-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Orders</h3>
            <p className="text-3xl font-bold text-gray-900">{stats?.totalOrders || 0}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="text-green-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Revenue</h3>
            <p className="text-3xl font-bold text-gray-900">
              {formatPrice(stats?.totalRevenue || 0)}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="text-yellow-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Pending Orders</h3>
            <p className="text-3xl font-bold text-gray-900">{stats?.pendingOrders || 0}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-purple-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Delivered</h3>
            <p className="text-3xl font-bold text-gray-900">{stats?.deliveredOrders || 0}</p>
          </div>
        </div>

        {/* Today's Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Today's Performance</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Orders Today</span>
                <span className="text-2xl font-bold text-primary-600">
                  {stats?.todayOrders || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Revenue Today</span>
                <span className="text-2xl font-bold text-green-600">
                  {formatPrice(stats?.todayRevenue || 0)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">This Month</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monthly Revenue</span>
                <span className="text-2xl font-bold text-primary-600">
                  {formatPrice(stats?.monthRevenue || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="text-primary-600" size={24} />
              <h3 className="text-lg font-bold text-gray-900">Revenue Trend (Last 7 Days)</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats?.last7Days || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => `₹${value.toFixed(2)}`}
                  labelStyle={{ color: '#000' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  name="Revenue (₹)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Orders Trend Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="text-primary-600" size={24} />
              <h3 className="text-lg font-bold text-gray-900">Orders Trend (Last 7 Days)</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats?.last7Days || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip labelStyle={{ color: '#000' }} />
                <Legend />
                <Bar dataKey="orders" fill="#0ea5e9" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Order Status Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="text-primary-600" size={24} />
              <h3 className="text-lg font-bold text-gray-900">Order Status Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats?.ordersByStatus || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.status || entry.name}: ${entry.count || entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {(stats?.ordersByStatus || []).map((entry: any, index: number) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5]} 
                    />
                  ))}
                </Pie>
                <Tooltip labelStyle={{ color: '#000' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue vs Orders Comparison */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-primary-600" size={24} />
              <h3 className="text-lg font-bold text-gray-900">Performance Overview</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Average Order Value</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatPrice(
                    stats?.totalOrders > 0 
                      ? stats.totalRevenue / stats.totalOrders 
                      : 0
                  )}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Delivery Rate</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats?.totalOrders > 0
                    ? ((stats.deliveredOrders / stats.totalOrders) * 100).toFixed(1)
                    : 0}%
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Pending Orders</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats?.pendingOrders || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/admin/orders"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors"
            >
              <ShoppingBag className="text-primary-600" size={24} />
              <div>
                <p className="font-semibold text-gray-900">Manage Orders</p>
                <p className="text-sm text-gray-600">View and update orders</p>
              </div>
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors"
            >
              <Package className="text-primary-600" size={24} />
              <div>
                <p className="font-semibold text-gray-900">Manage Products</p>
                <p className="text-sm text-gray-600">Add or edit products</p>
              </div>
            </Link>

            <a
              href="/"
              target="_blank"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors"
            >
              <Users className="text-primary-600" size={24} />
              <div>
                <p className="font-semibold text-gray-900">View Website</p>
                <p className="text-sm text-gray-600">See customer view</p>
              </div>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
