import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronDown } from 'lucide-react';

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('search') || '';

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [categoryFilter, setCategoryFilter] = useState('ALL CATEGORIES');
  const [brandFilter, setBrandFilter] = useState('SELECT BRAND');
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(110);

  // Measure the real navbar height so the sticky bar sits flush with zero gap
  useEffect(() => {
    const measure = () => {
      const nav = document.querySelector('nav');
      if (nav) setNavHeight(nav.getBoundingClientRect().height);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

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

    window.open(`https://wa.me/919847814033?text=${encodeURIComponent(text)}`, '_blank');
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL CATEGORIES' || p.category.toUpperCase() === categoryFilter.toUpperCase();
    const matchesBrand = brandFilter === 'SELECT BRAND' || (p.brand || 'SR Signature').toUpperCase() === brandFilter.toUpperCase();
    return matchesSearch && matchesCategory && matchesBrand;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f1ea] flex flex-col items-center justify-center gap-8 text-gray-900">
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
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes progress {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}} />
      </div>
    );
  }

  return (
    <div className="bg-[#f4f1ea] min-h-screen font-sans pb-20" style={{ paddingTop: navHeight }}>
      {/* Search / Filter Bar */}
      <div className="sticky z-40 bg-[#f4f1ea] border-b border-gray-300" style={{ top: navHeight }}>
        <div className="relative flex items-stretch w-full">
          {/* Search Icon */}
          <div className="flex items-center pl-4 sm:pl-6 text-gray-500 shrink-0">
            <Search size={15} />
          </div>
          {/* Input */}
          <input
            type="text"
            placeholder="SEARCH PRECISION APPLIANCES..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow bg-transparent text-gray-800 text-[9px] sm:text-[11px] font-bold tracking-widest px-3 sm:px-4 py-3 sm:py-3.5 focus:outline-none uppercase placeholder:text-gray-400 border-none focus:ring-0"
          />
          {/* Filter Button */}
          <div className="relative shrink-0">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="flex items-center gap-1.5 px-4 sm:px-6 h-full border-l border-gray-300 text-gray-700 text-[9px] sm:text-[11px] font-black tracking-widest hover:bg-black/5 transition-colors uppercase"
            >
              <Filter size={13} />
              Filter <ChevronDown size={13} className={`transition-transform duration-300 ${isFiltersOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Floating filter dropdown panel */}
            {isFiltersOpen && (
              <div className="absolute top-full right-0 mt-1 z-50 bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 flex flex-col gap-3 min-w-[260px] sm:min-w-[360px]">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Filter By</p>

                {/* Category */}
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Category</span>
                  <div className="relative">
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[9px] font-black tracking-widest px-4 py-3 focus:outline-none focus:border-primary appearance-none cursor-pointer uppercase rounded-xl"
                    >
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={13} />
                  </div>
                </div>

                {/* Brand */}
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Brand</span>
                  <div className="relative">
                    <select
                      value={brandFilter}
                      onChange={(e) => setBrandFilter(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[9px] font-black tracking-widest px-4 py-3 focus:outline-none focus:border-primary appearance-none cursor-pointer uppercase rounded-xl"
                    >
                      {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={13} />
                  </div>
                </div>

                {/* Active filters + clear */}
                {(categoryFilter !== 'ALL CATEGORIES' || brandFilter !== 'SELECT BRAND') && (
                  <button
                    onClick={() => { setCategoryFilter('ALL CATEGORIES'); setBrandFilter('SELECT BRAND'); }}
                    className="text-[8px] font-black uppercase tracking-widest text-primary hover:text-primary/70 transition-colors text-left mt-1"
                  >
                    ✕ Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-8 sm:mt-12">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredProducts.map((product, i) => (
            <div key={product._id} className="bg-[#fcfaf2] border border-[#e5e1d5] overflow-hidden flex flex-col group rounded-xl shadow-sm hover:shadow-md transition-shadow">
              {/* Product Image */}
              <div
                onClick={() => navigate(`/product/${product._id}`)}
                className="relative aspect-square overflow-hidden bg-[#f4f1ea] cursor-pointer"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
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
                  <h3 className="text-gray-900 text-[10px] sm:text-lg font-bold uppercase mt-0.5 tracking-tight leading-tight line-clamp-1">{product.name}</h3>
                  <p className="text-gray-600 text-[6px] sm:text-[8px] font-bold uppercase tracking-widest mt-0.5">{product.brand || 'SR SIGNATURE'}</p>
                </div>

                {/* Buttons Container */}
                <div className="grid grid-cols-1 gap-1.5 sm:gap-2 mt-4 sm:mt-6">
                  <button
                    onClick={() => handleWhatsApp(product)}
                    className="w-full bg-secondary hover:bg-secondary/90 text-white font-black py-2 sm:py-3 px-2 transition-all flex justify-center items-center gap-1 sm:gap-2 text-[7px] sm:text-[10px] uppercase tracking-widest shadow-lg shadow-secondary/20"
                  >
                    <svg className="w-3.5 h-3.5 sm:w-[14px] sm:h-[14px] fill-[#25D366]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg> Order Now
                  </button>
                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="w-full bg-gray-50 hover:bg-gray-100 text-gray-900 font-black py-2 sm:py-3 px-2 transition-all border border-gray-200 flex justify-center items-center gap-1 sm:gap-2 text-[7px] sm:text-[10px] uppercase tracking-widest"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-40 border border-gray-200 bg-white rounded-xl">
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No precision appliances matched your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
