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
  Settings as SettingsIcon,
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Save,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [deliveryAreas, setDeliveryAreas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingArea, setEditingArea] = useState<any>(null);
  const [formData, setFormData] = useState({
    area: '',
    charge: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated') {
      fetchDeliveryAreas();
    }
  }, [status, router]);

  const fetchDeliveryAreas = async () => {
    try {
      const response = await fetch('/api/delivery-areas');
      if (response.ok) {
        const data = await response.json();
        setDeliveryAreas(data);
      }
    } catch (error) {
      console.error('Error fetching delivery areas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const openModal = (area?: any) => {
    if (area) {
      setEditingArea(area);
      setFormData({
        area: area.area,
        charge: area.charge.toString(),
      });
    } else {
      setEditingArea(null);
      setFormData({
        area: '',
        charge: '',
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingArea
        ? `/api/delivery-areas/${editingArea.id}`
        : '/api/delivery-areas';
      
      const response = await fetch(url, {
        method: editingArea ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          area: formData.area,
          charge: parseFloat(formData.charge),
        }),
      });

      if (response.ok) {
        toast.success(editingArea ? 'Area updated!' : 'Area added!');
        fetchDeliveryAreas();
        setShowModal(false);
      } else {
        toast.error('Failed to save area');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this delivery area?')) return;

    try {
      const response = await fetch(`/api/delivery-areas/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Area deleted!');
        fetchDeliveryAreas();
      } else {
        toast.error('Failed to delete area');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
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
              className="px-4 py-3 text-gray-600 hover:text-gray-900 whitespace-nowrap"
            >
              Customers
            </Link>
            <Link
              href="/admin/settings"
              className="px-4 py-3 border-b-2 border-primary-600 text-primary-600 font-medium whitespace-nowrap"
            >
              Settings
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          </div>

          {/* Delivery Areas Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <MapPin className="text-primary-600" size={24} />
                <h3 className="text-xl font-bold">Delivery Areas & Charges</h3>
              </div>
              <button
                onClick={() => openModal()}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
              >
                <Plus size={20} />
                Add Area
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Area</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Delivery Charge</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {deliveryAreas.map((area) => (
                    <tr key={area.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{area.area}</td>
                      <td className="px-4 py-3">₹{area.charge}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => openModal(area)}
                          className="text-blue-600 hover:text-blue-800 mr-3"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(area.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {deliveryAreas.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No delivery areas configured yet
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold">
                {editingArea ? 'Edit Delivery Area' : 'Add Delivery Area'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area Name *
                </label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="e.g., Mumbai Central"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Charge (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.charge}
                  onChange={(e) => setFormData({ ...formData, charge: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
