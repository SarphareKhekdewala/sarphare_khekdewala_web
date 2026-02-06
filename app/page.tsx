import Link from 'next/link';
import Image from 'next/image';
import { Fish, ShoppingCart, Phone, MapPin, Waves, Award, Truck } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDEwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDEwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6 flex justify-center animate-fade-in">
              <Image src="/logo.png" alt="भांडूपचा सरफरे खेकडेवाला" width={192} height={192} className="h-40 md:h-48 w-auto drop-shadow-2xl rounded-3xl border-4 border-yellow/30" priority />
            </div>
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-yellow mb-2">कोकणी माणूस</h2>
              <p className="text-lg md:text-xl text-white/90 font-medium px-4">
                स्वाद आणि दर्जाचा अनुभव फक्त भांडूपच्या सरफरे खेकडेवाल्याकडे!
              </p>
            </div>
            <div className="inline-block mb-6 px-6 py-3 bg-accent-500/20 backdrop-blur-sm rounded-full text-sm md:text-base font-bold border-2 border-accent-500 animate-pulse">
              🦀 Fresh Daily Catch Available Now! | Home Delivery Available
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-yellow drop-shadow-lg">
              Premium <span className="text-white">Mud Crabs</span><br />& <span className="text-white">Fresh Seafood</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 text-white/80 max-w-3xl mx-auto leading-relaxed">
              Experience the finest quality seafood delivered fresh to your doorstep across Mumbai, Thane, and Navi Mumbai
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-12 py-5 rounded-full font-bold transition-all transform hover:scale-105 shadow-2xl inline-flex items-center justify-center gap-3 text-lg border-2 border-white/20"
              >
                <ShoppingCart size={26} />
                Order Now
              </Link>
              <Link
                href="#contact"
                className="bg-yellow hover:bg-yellow/90 text-primary-900 px-12 py-5 rounded-full font-bold transition-all transform hover:scale-105 shadow-2xl text-lg border-2 border-primary-900/10"
              >
                <Phone className="inline mr-2" size={22} />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Waves className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Fresh Daily</h3>
              <p className="text-gray-600 leading-relaxed">
                We source the freshest seafood daily to ensure premium quality
              </p>
            </div>
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Truck className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Serving Mumbai, Thane, and Navi Mumbai with prompt delivery
              </p>
            </div>
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Award className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Top-grade seafood with guaranteed freshness and quality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Our Products</h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Choose from our selection of fresh mud crabs and fish
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <Link
              href="/products?category=mud-crabs"
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3"
            >
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">Popular</span>
              </div>
              <div className="aspect-video bg-gradient-to-br from-red-400 via-orange-400 to-yellow-400 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <Fish size={100} className="text-white relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-3 group-hover:text-red-600 transition-colors">
                  🦀 Fresh Mud Crabs
                </h3>
                <p className="text-gray-600 text-lg mb-4">
                  Premium quality live mud crabs, perfect for your special meals
                </p>
                <div className="flex items-center gap-2 text-red-600 font-bold text-lg">
                  View Products
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>
            <Link
              href="/products?category=fresh-fish"
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3"
            >
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">Fresh</span>
              </div>
              <div className="aspect-video bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <Fish size={100} className="text-white relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                  🐟 Fresh Fish
                </h3>
                <p className="text-gray-600 text-lg mb-4">
                  Daily catch of fresh fish varieties, cleaned and ready to cook
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
                  View Products
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-primary-900 to-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-4 text-yellow">भांडूपचा सरफरे खेकडेवाला - संपर्क</h2>
            <p className="text-xl mb-10 text-orange-200">
              Have questions? Reach out to us for fresh seafood delivery!
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all">
                <Phone className="mx-auto mb-4 text-accent-500" size={48} />
                <h3 className="text-2xl font-bold mb-2 text-yellow">फोन / Call Us</h3>
                <a href="tel:8169634690" className="text-3xl font-bold hover:text-accent-500 transition-colors">
                  8169634690
                </a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all">
                <MapPin className="mx-auto mb-4 text-accent-500" size={48} />
                <h3 className="text-2xl font-bold mb-2 text-yellow">पत्ता / Address</h3>
                <p className="text-lg leading-relaxed">
                  Near Sarvajanik Ganeshostav Mandal,<br/>
                  Sahyadri Nagar, Bhandup West,<br/>
                  Mumbai
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow">भांडूपचा सरफरे खेकडेवाला</h3>
              <p className="text-gray-300">
                कोकणी माणूस - Fresh seafood delivered daily
              </p>
              <p className="text-accent-500 mt-3 font-semibold">
                📞 Call: 8169634690
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-accent-500">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/products" className="hover:text-accent-500 transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="hover:text-accent-500 transition-colors">
                    Cart
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-accent-500">Delivery Areas</h4>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>Mumbai (Bhandup, Mulund, Ghatkopar...)</li>
                <li>Thane, Kalyan, Dombivli</li>
                <li>Navi Mumbai (Vashi, Airoli...)</li>
                <li className="text-accent-500 font-semibold mt-2">→ 60+ areas covered</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 भांडूपचा सरफरे खेकडेवाला. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
