import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageCircle, X, ChevronLeft, ChevronRight, Phone } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    setCurrentImageIndex(newIndex);
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
            <div className="w-full md:w-1/2 relative bg-white/50 border-b md:border-b-0 md:border-r border-[#e5e1d5] aspect-square md:aspect-auto flex flex-col items-center justify-center p-6 sm:p-12 min-h-[350px] sm:min-h-[500px]">
              {/* Main Image View */}
              <div className="relative w-full h-full max-h-[500px] min-h-[300px] flex items-center justify-center">
                {images.map((imgUrl, idx) => (
                  <img
                    key={idx}
                    src={imgUrl}
                    alt={`${product.name} ${idx + 1}`}
                    className={`absolute w-full h-full object-contain drop-shadow-2xl transition-all duration-300 ease-in-out ${idx === currentImageIndex
                      ? 'opacity-100 scale-100 pointer-events-auto z-10'
                      : 'opacity-0 scale-95 pointer-events-none z-0'
                      }`}
                  />
                ))}
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

              <h1 className="text-3xl sm:text-3xl md:text-4xl font-black text-secondary mb-3 uppercase leading-[0.85] tracking-tighter">
                {product.name}
              </h1>
              <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-10">
                Crafted by {product.brand || 'SR Signature Series'}
              </p>

              {/* Description Box */}
              <div className="relative mb-12">
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-primary/10 rounded-full"></div>
                <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">Product Philosophy</h4>
                <ul className="space-y-3">
                  {(product.description
                    ? product.description
                      .split(/\s+\.\s+|\n+/)
                      .map(p => p.trim().replace(/^\.+|\.+$/g, '').trim())
                      .filter(Boolean)
                    : [
                      "Designed for high-performance culinary environments",
                      "Features industrial-grade suction power",
                      "Fingerprint-resistant premium finishes",
                      "Intelligent heat-sync technology"
                    ]
                  ).map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto flex flex-col sm:flex-row gap-4">
                {/* Call Now Button */}
                <a
                  href="tel:+919847814033"
                  className="w-full sm:w-1/2 group relative overflow-hidden border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-black py-5 rounded-2xl transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95 flex justify-center items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-center"
                >
                  <Phone size={18} className="group-hover:rotate-12 transition-transform" />
                  Call Now
                </a>

                {/* Order Now Button */}
                <button
                  onClick={() => handleWhatsApp(product)}
                  className="w-full sm:w-1/2 group relative overflow-hidden bg-secondary text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-secondary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 active:scale-95 flex justify-center items-center gap-3 text-[11px] uppercase tracking-[0.2em]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative flex justify-center items-center gap-3">
                    <svg className="w-5 h-5 fill-[#25D366] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Order Now
                  </span>
                </button>
              </div>
              <p className="text-center mt-6 text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                Official SR Flames Showroom Warranty Included
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
