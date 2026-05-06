import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageTransitioning, setImageTransitioning] = useState(false);

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

  const getImages = () => {
    if (!product) return [];
    const imgs = [product.imageUrl];
    if (product.imageUrl2) imgs.push(product.imageUrl2);
    if (product.imageUrl3) imgs.push(product.imageUrl3);
    return imgs;
  };

  const handleImageChange = (newIndex) => {
    setImageTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
      setImageTransitioning(false);
    }, 200);
  };

  const nextImage = () => {
    const images = getImages();
    handleImageChange(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
  };

  const prevImage = () => {
    const images = getImages();
    handleImageChange(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f1ea] flex flex-col items-center justify-center gap-4 text-gray-900">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Syncing Showroom...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f4f1ea] flex flex-col items-center justify-center text-center px-4 text-gray-900">
        <h2 className="text-4xl font-black mb-6 uppercase italic tracking-tighter">Appliance Not Found</h2>
        <button onClick={() => navigate('/products')} className="text-primary font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:text-primary/80 transition-all">
          Return to Showroom
        </button>
      </div>
    );
  }

  const images = getImages();

  return (
    <div className="min-h-screen bg-[#f4f1ea] font-sans pt-[120px] sm:pt-[160px] pb-20 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-primary font-bold uppercase tracking-[0.3em] text-[10px] transition-all transform hover:-translate-x-1"
        >
          <ChevronLeft size={16} /> Back to Collection
        </button>

        <div className="bg-[#fcfaf2] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#e5e1d5] animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="flex flex-col md:flex-row">
            {/* Left Side: Image Carousel */}
            <div className="w-full md:w-1/2 relative bg-white/50 border-b md:border-b-0 md:border-r border-[#e5e1d5] aspect-square md:aspect-auto flex flex-col items-center justify-center p-6 sm:p-12">
              {/* Main Image View */}
              <div className={`relative w-full h-full max-h-[500px] flex items-center justify-center transition-all duration-300 ${imageTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                <img
                  src={images[currentImageIndex]}
                  alt={`${product.name}`}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-xl transition-all z-10 hover:scale-110 active:scale-95"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-xl transition-all z-10 hover:scale-110 active:scale-95"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Pagination Dots (Mobile) */}
            <div className="flex justify-center gap-3 py-6 bg-[#f4f1ea]/30 md:hidden border-b border-[#e5e1d5]">
              {images.length > 1 && images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleImageChange(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${currentImageIndex === idx ? 'bg-primary w-8' : 'bg-gray-300 w-4'}`}
                />
              ))}
            </div>

            {/* Right Side: Content */}
            <div className="w-full md:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col">
              {/* Pagination Dots (Desktop) */}
              <div className="hidden md:flex gap-3 mb-10">
                {images.length > 1 && images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleImageChange(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${currentImageIndex === idx ? 'bg-primary w-10' : 'bg-gray-300 w-4 hover:bg-gray-400'}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px]">
                  {product.category}
                </span>
                <div className="h-px flex-grow bg-[#e5e1d5]"></div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-secondary mb-3 uppercase leading-[0.85] tracking-tighter">
                {product.name}
              </h1>
              <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-10">
                Crafted by {product.brand || 'SR Signature Series'}
              </p>

              {/* Description Box */}
              <div className="relative mb-12">
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-primary/10 rounded-full"></div>
                <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">Product Philosophy</h4>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                  {product.description || "Designed for high-performance culinary environments. This unit features industrial-grade suction power, fingerprint-resistant finishes, and intelligent heat-sync technology."}
                </p>
              </div>

              {/* Order Button */}
              <div className="mt-auto">
                <button
                  onClick={() => handleWhatsApp(product)}
                  className="w-full group relative overflow-hidden bg-secondary text-white font-black py-5 sm:py-6 rounded-2xl transition-all shadow-2xl shadow-secondary/20 hover:shadow-primary/30 transform hover:-translate-y-1 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative flex justify-center items-center gap-4 text-[11px] uppercase tracking-[0.4em]">
                    <MessageCircle size={20} className="group-hover:rotate-12 transition-transform" /> 
                    Reserve via WhatsApp
                  </span>
                </button>
                <p className="text-center mt-6 text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                  Official SR Flames Showroom Warranty Included
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
