import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, ChevronRight, X, Search, Filter } from 'lucide-react';

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [categoryFilter, setCategoryFilter] = useState('ALL CATEGORIES');
  const [brandFilter, setBrandFilter] = useState('SELECT BRAND');
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Update search query if URL parameter changes
    const currentSearch = new URLSearchParams(location.search).get('search') || '';
    setSearchQuery(currentSearch);
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
        
        // Extract unique categories and brands from data
        const uniqueCats = ['ALL CATEGORIES', ...new Set(data.map(p => p.category.toUpperCase()))];
        const uniqueBrands = ['SELECT BRAND', ...new Set(data.map(p => (p.brand || 'SR Signature').toUpperCase()))];
        setCategories(uniqueCats);
        setBrands(uniqueBrands);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL CATEGORIES' || p.category.toUpperCase() === categoryFilter.toUpperCase();
    const matchesBrand = brandFilter === 'SELECT BRAND' || (p.brand || 'SR Signature').toUpperCase() === brandFilter.toUpperCase();
    return matchesSearch && matchesCategory && matchesBrand;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-8 text-white">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-primary/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-primary font-black uppercase tracking-[0.5em] text-[10px] animate-pulse">Loading Catalog</p>
          <div className="w-32 h-[1px] bg-white/5 overflow-hidden">
             <div className="w-full h-full bg-primary/40 -translate-x-full animate-[progress_2s_infinite]"></div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes progress {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}} />
      </div>
    );
  }

  return (
    <div className="bg-[#111] min-h-screen font-sans pb-20">
      {/* Header / Filter Bar */}
      <div className="bg-[#1a1a1a] border-b border-white/5 pt-10 pb-10 px-4 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-grow w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="SEARCH PRECISION APPLIANCES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 text-white text-xs font-bold tracking-widest pl-12 pr-4 py-4 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Category Dropdown */}
            <div className="w-full lg:w-64">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 text-white text-[10px] font-black tracking-widest px-4 py-4 focus:outline-none focus:border-primary appearance-none cursor-pointer uppercase"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            {/* Brand Dropdown */}
            <div className="w-full lg:w-64">
              <select 
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 text-white text-[10px] font-black tracking-widest px-4 py-4 focus:outline-none focus:border-primary appearance-none cursor-pointer uppercase"
              >
                {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
              </select>
            </div>

            {/* Filter Button (Reduced Size) */}
            <button className="bg-primary hover:bg-primary/90 text-white p-3.5 transition-colors">
              <Filter size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredProducts.map((product, i) => (
            <div key={product._id} className="bg-[#0a0a0a] border border-white/5 overflow-hidden flex flex-col group rounded-xl">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-[#111]">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-primary text-white text-[7px] sm:text-[9px] font-black px-2 py-0.5 sm:px-3 sm:py-1 uppercase tracking-widest rounded-md">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Product Details Area */}
              <div className="p-3 sm:p-6">
                <div className="mb-1">
                  <span className="text-gray-500 text-[7px] sm:text-[9px] font-bold uppercase tracking-[0.2em]">{product.category}</span>
                  <h3 className="text-white text-[10px] sm:text-lg font-bold uppercase mt-0.5 tracking-tight leading-tight line-clamp-1">{product.name}</h3>
                  <p className="text-gray-600 text-[6px] sm:text-[8px] font-bold uppercase tracking-widest mt-0.5">{product.brand || 'SR SIGNATURE'}</p>
                </div>

                {/* Buttons Container */}
                <div className="grid grid-cols-1 gap-1.5 sm:gap-2 mt-4 sm:mt-6">
                  <button
                    onClick={() => handleWhatsApp(product)}
                    className="w-full bg-primary hover:bg-primary-light text-white font-black py-2 sm:py-3 px-2 transition-all flex justify-center items-center gap-1 sm:gap-2 text-[7px] sm:text-[10px] uppercase tracking-widest shadow-lg shadow-primary/10"
                  >
                    <MessageCircle size={10} className="sm:w-[14px] sm:h-[14px]" /> WhatsApp
                  </button>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="w-full bg-white/5 hover:bg-white/10 text-white font-black py-2 sm:py-3 px-2 transition-all border border-white/10 flex justify-center items-center gap-1 sm:gap-2 text-[7px] sm:text-[10px] uppercase tracking-widest"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-40 border border-white/5 bg-[#0a0a0a]">
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No precision appliances matched your search.</p>
          </div>
        )}
      </div>

      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 backdrop-blur-xl">
          <div className="absolute inset-0 bg-black/80" onClick={() => setSelectedProduct(null)}></div>
          <div className="bg-[#0d0d0d] w-full max-w-4xl rounded-3xl sm:rounded-[2.5rem] overflow-hidden relative z-10 animate-in fade-in zoom-in duration-300 border border-white/5 shadow-2xl">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-white/5 hover:bg-primary text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md">
              <X size={16} />
            </button>
            
            <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-visible">
              <div className="w-full md:w-1/2 h-[250px] sm:h-[350px] md:h-[550px] overflow-hidden bg-black flex items-center justify-center p-4">
                <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-full object-contain" />
              </div>
              <div className="w-full md:w-1/2 p-6 sm:p-12 flex flex-col justify-center">
                <span className="text-primary font-black uppercase tracking-[0.4em] text-[8px] sm:text-[9px] mb-2 sm:mb-3 block">{selectedProduct.category}</span>
                <h2 className="text-2xl sm:text-5xl font-black text-white mb-1 sm:mb-2 uppercase leading-none tracking-tighter">{selectedProduct.name}</h2>
                <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[8px] sm:text-[9px] mb-6 sm:mb-8">{selectedProduct.brand || 'SR SIGNATURE'}</p>
                
                <div className="bg-[#151515] p-4 sm:p-6 rounded-2xl sm:rounded-[1.5rem] mb-6 sm:mb-10 border border-white/5">
                   <h4 className="font-bold text-gray-500 mb-2 sm:mb-3 text-[8px] uppercase tracking-widest">Specifications</h4>
                   <p className="text-gray-400 leading-relaxed text-[10px] sm:text-sm font-medium line-clamp-4 sm:line-clamp-6">
                     {selectedProduct.description || "Designed for high-performance culinary environments. This unit features industrial-grade suction power, fingerprint-resistant finishes, and intelligent heat-sync technology."}
                   </p>
                </div>
                <button 
                  onClick={() => handleWhatsApp(selectedProduct)}
                  className="w-full bg-primary hover:bg-primary-light text-white font-black py-4 sm:py-5 rounded-xl transition-all flex justify-center items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] shadow-2xl shadow-primary/20 transform active:scale-95"
                >
                  <MessageCircle size={16} /> Order via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
