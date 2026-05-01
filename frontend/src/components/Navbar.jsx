import React, { useState, useEffect } from 'react';
import { Phone, Mail, Search, X } from 'lucide-react';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch products when search opens
  useEffect(() => {
    if (isSearchOpen && products.length === 0) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
          const res = await fetch(`${API_URL}/api/products`);
          const data = await res.json();
          setProducts(data);
        } catch (err) {
          console.error('Failed to fetch products:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [isSearchOpen, products.length]);

  // Filter products based on search query (substring matching)
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWhatsApp = (product) => {
    const productUrl = `${window.location.origin}/product/${product._id}`;
    const text = `${product.imageUrl}
${productUrl}

Hello SR Flames! I want to know about this precision appliance:
    
- Product: ${product.name}
- Brand: ${product.brand || 'SR Signature'}
- Category: ${product.category}
- Product ID: ${product._id}`;

    window.open(`https://wa.me/919745307450?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 font-sans shadow-md">
      {/* Top Bar */}
      <div className="bg-primary text-white text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 hover:text-primary-light transition-colors cursor-pointer">
              <Phone size={12} className="text-primary" />
              <span>+91 97453 07450</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-gray-200 transition-colors cursor-pointer hidden sm:flex">
              <Mail size={14} />
              <span>info@srflames.com</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 hidden md:flex">
            <span className="font-semibold">SR Flames Premium Chimneys & Stoves</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <img src="/Srlogonavbar.webp" alt="SR Flames Logo" className="h-16 w-auto object-contain" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              <a href="/#home" className="text-secondary-light hover:text-primary transition-all font-semibold text-sm uppercase tracking-widest">Home</a>
              <a href="/#about" className="text-secondary-light hover:text-primary transition-all font-semibold text-sm uppercase tracking-widest">About Us</a>
              <a href="/#products" className="text-secondary-light hover:text-primary transition-all font-semibold text-sm uppercase tracking-widest">Products</a>
              <a href="/#services" className="text-secondary-light hover:text-primary transition-all font-semibold text-sm uppercase tracking-widest">Services</a>
              <a href="/#blogs" className="text-secondary-light hover:text-primary transition-all font-semibold text-sm uppercase tracking-widest">Blog</a>
              <a href="/#contact" className="text-secondary-light hover:text-primary transition-all font-semibold text-sm uppercase tracking-widest">Contact</a>

              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-secondary-light hover:text-primary transition-all ml-4 focus:outline-none"
              >
                <Search size={22} strokeWidth={2} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-700 hover:text-primary focus:outline-none"
              >
                <Search size={22} strokeWidth={2.5} />
              </button>
              <button className="text-gray-700 hover:text-primary focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Search Dropdown Area (Appears below Navbar, keeping Hero visible) */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 z-50 py-6 px-4 transition-all duration-300">
            <div className="max-w-3xl mx-auto relative">
              {/* Close Button */}
              <button
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                className="absolute -top-3 right-0 text-gray-400 hover:text-primary transition-colors"
                title="Close Search"
              >
                <X size={24} strokeWidth={2} />
              </button>

              {/* Search Input */}
              <div className="text-center mb-6">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  className="w-full text-center text-xl sm:text-2xl font-serif text-gray-700 bg-transparent border-b-2 border-gray-200 focus:border-primary focus:outline-none pb-2 placeholder-gray-400"
                />
              </div>

              {/* Search Results */}
              {searchQuery && (
                <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
                  {loading ? (
                    <div className="text-center text-gray-500 py-8">Loading products...</div>
                  ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map(product => (
                        <div 
                          key={product._id} 
                          onClick={() => { navigate(`/product/${product._id}`); setIsSearchOpen(false); }}
                          className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden flex flex-col group hover:shadow-lg transition-shadow cursor-pointer"
                        >
                          <div className="h-32 overflow-hidden bg-gray-50">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-bold text-gray-900 mb-1 text-sm uppercase tracking-tight">{product.name}</h3>
                            <span className="text-primary font-black text-[10px] uppercase tracking-widest">View Precision Details</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      No products found for "{searchQuery}". Try a different keyword.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
