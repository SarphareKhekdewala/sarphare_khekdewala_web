'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Product, CartItem } from '@/types';
import toast from 'react-hot-toast';
import { Filter } from 'lucide-react';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);

  // Fetch all products once on mount
  useEffect(() => {
    fetchProducts();
    loadCartFromStorage();
  }, []);

  // Set category from URL parameter on mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  // Filter products when category changes
  useEffect(() => {
    if (allProducts.length > 0) {
      filterProducts();
    }
  }, [category, allProducts]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    if (category === 'all') {
      setFilteredProducts(allProducts);
    } else if (category === 'mud-crabs') {
      // Filter for crab products (Black Crabs, Green Crabs)
      const filtered = allProducts.filter(
        (product) => product.category.toLowerCase().includes('crab')
      );
      setFilteredProducts(filtered);
    } else if (category === 'fresh-fish') {
      // Filter for fish, prawns, and lobsters
      const filtered = allProducts.filter(
        (product) => {
          const cat = product.category.toLowerCase();
          return cat === 'fish' || cat === 'prawns' || cat === 'lobsters';
        }
      );
      setFilteredProducts(filtered);
    } else {
      // Fallback: try direct category match
      const filtered = allProducts.filter(
        (product) => product.category.toLowerCase().replace(/\s+/g, '-') === category
      );
      setFilteredProducts(filtered);
    }
  };

  const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const saveCartToStorage = (newCart: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    const existingItemIndex = cart.findIndex(
      (item) => item.product.id === product.id
    );

    let newCart: CartItem[];
    if (existingItemIndex >= 0) {
      newCart = [...cart];
      newCart[existingItemIndex].quantity += quantity;
    } else {
      newCart = [...cart, { product, quantity }];
    }

    setCart(newCart);
    saveCartToStorage(newCart);
    toast.success(`${product.name} added to cart!`);
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + 1, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemsCount={cartItemsCount} />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Our Fresh Products
          </h1>
          <p className="text-gray-600">
            Choose from our daily selection of fresh seafood
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <span className="font-semibold text-gray-700">Filter:</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                category === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setCategory('mud-crabs')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                category === 'mud-crabs'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              🦀 Mud Crabs
            </button>
            <button
              onClick={() => setCategory('fresh-fish')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                category === 'fresh-fish'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              🐟 Fresh Fish
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="py-20">
            <LoadingSpinner size="large" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">
              No products available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
