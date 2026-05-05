import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        const found = data.find(p => p._id === id);
        setProduct(found);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleWhatsApp = () => {
    if (!product) return;
    const productUrl = window.location.href;
    const text = `${product.imageUrl}
${productUrl}

Hello SR Flames! I am interested in this precision appliance from your showroom:
    
- Product: ${product.name}
- Brand: ${product.brand || 'SR Signature'}
- Category: ${product.category}
- Product ID: ${product._id}`;

    window.open(`https://wa.me/919847814033?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-4 text-white">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Syncing Showroom...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center px-4 text-white">
        <h2 className="text-4xl font-black text-white mb-6 uppercase italic tracking-tighter">Appliance Not Found</h2>
        <button onClick={() => navigate('/products')} className="text-primary font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:text-white transition-all">
          Return to Showroom
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#050505] flex items-center justify-center p-4 md:p-10 font-sans overflow-hidden">
      {/* Dynamic Blurred Background Background */}
      <div className="absolute inset-0 z-0">
        <img src={product.imageUrl} alt="bg" className="w-full h-full object-cover opacity-20 blur-[100px]" />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full bg-[#0d0d0d] rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/5 animate-in fade-in zoom-in duration-500">

        {/* Close Button (Go Back) */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/5 hover:bg-primary text-white rounded-full flex items-center justify-center transition-all shadow-xl backdrop-blur-md"
        >
          <X size={20} />
        </button>

        <div className="flex flex-row">
          {/* Left Side: Image */}
          <div className="w-1/2 md:w-1/2 h-auto md:h-[550px] relative overflow-hidden bg-black flex items-center justify-center p-2 sm:p-8 border-r border-white/5">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          </div>

          {/* Right Side: Content */}
          <div className="w-1/2 md:w-1/2 p-4 md:p-12 flex flex-col justify-center">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[9px] mb-3 block">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-2 uppercase leading-[0.9] tracking-tighter">
              {product.name}
            </h1>
            <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[9px] mb-8">
              {product.brand || 'SR SIGNATURE'}
            </p>

            {/* Description Box */}
            <div className="bg-[#151515] p-6 rounded-[1.5rem] border border-white/5 mb-10">
              <h4 className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-3">Specifications</h4>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-medium line-clamp-6">
                {product.description || "Designed for high-performance culinary environments. This unit features industrial-grade suction power, fingerprint-resistant finishes, and intelligent heat-sync technology."}
              </p>
            </div>

            {/* Order Button */}
            <button
              onClick={() => handleWhatsApp(product)}
              className="w-full bg-primary hover:bg-primary-light text-white font-black py-2.5 sm:py-5 rounded-xl transition-all flex justify-center items-center gap-2 sm:gap-3 text-[9px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] shadow-2xl shadow-primary/20 transform active:scale-95"
            >
              <MessageCircle size={14} className="sm:w-[18px] sm:h-[18px]" /> Order via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
