import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, CheckCircle2, ChevronRight, Wrench, Shield, ThumbsUp, Send, Phone, Mail, MapPin, X } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        // Show up to 4 latest products
        setProducts(data.slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
  }, []);

  const handleWhatsApp = (product = null) => {
    let text = 'Hello SR Flames! I would like to know more about SR Flames products.';
    
    if (product && typeof product === 'object') {
      const productUrl = `${window.location.origin}/product/${product._id}`;
      text = `${product.imageUrl}
${productUrl}

Hello SR Flames! I want to know about this precision appliance:
      
- Product: ${product.name}
- Brand: ${product.brand || 'SR Signature'}
- Category: ${product.category}
- Product ID: ${product._id}`;
    } else if (product && typeof product === 'string') {
      text = `Hello, I want to order: ${product}`;
    }

    window.open(`https://wa.me/919745307450?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="font-sans overflow-x-hidden bg-bg-light">
      
      {/* 1. HERO SECTION */}
      <section id="home" className="relative h-[85vh] min-h-[600px] w-full flex items-center bg-secondary">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop" 
            alt="Modern Kitchen Chimney" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              Smart Kitchens.<br />
              <span className="text-primary">SR Flames.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 font-light max-w-lg">
              Premium Chimneys & Stoves designed for modern living. Elevate your culinary space with elegance and industrial-grade efficiency.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#products" className="bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-primary/30">
                Explore Products
              </a>
              <a href="#about" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-semibold py-4 px-10 rounded-full transition-all">
                Our Story
              </a>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="absolute bottom-0 left-0 w-full bg-white/5 backdrop-blur-sm border-t border-white/10 py-6 hidden md:block">
           <div className="max-w-7xl mx-auto px-8 flex justify-between items-center text-white">
              <div className="flex items-center gap-4">
                 <span className="text-4xl font-bold">10+</span>
                 <span className="text-sm text-gray-400 uppercase tracking-widest">Years Experience</span>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div className="flex items-center gap-4">
                 <span className="text-4xl font-bold">500+</span>
                 <span className="text-sm text-gray-400 uppercase tracking-widest">Happy Homes</span>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div className="flex items-center gap-4">
                 <span className="text-4xl font-bold">100%</span>
                 <span className="text-sm text-gray-400 uppercase tracking-widest">Quality Assurance</span>
              </div>
           </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section id="about" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl group-hover:bg-primary/15 transition-all"></div>
              <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop" alt="Kitchen Setup" className="rounded-2xl shadow-2xl w-full object-cover h-[550px] relative z-10" />
            </div>
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Since 2014</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">Mastering the Art of Modern Cooking</h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                SR Flames stands at the intersection of aesthetic brilliance and technical perfection. We provide kitchen solutions that aren't just appliances, but integral parts of your home's character.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-10">
                 <div className="flex flex-col gap-2">
                    <CheckCircle2 className="text-primary" size={28} />
                    <span className="font-bold text-gray-800">ISO Certified</span>
                 </div>
                 <div className="flex flex-col gap-2">
                    <Shield className="text-primary" size={28} />
                    <span className="font-bold text-gray-800">5 Year Warranty</span>
                 </div>
              </div>
              <a href="#contact" className="inline-block bg-secondary text-white font-bold py-4 px-10 rounded-xl transition-all hover:bg-secondary/90 shadow-xl">
                Get a Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCTS SECTION */}
      <section id="products" className="py-32 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">Premium Collection</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Best Sellers</h2>
            <p className="text-gray-500 text-lg">Meticulously crafted chimneys and stoves for those who demand the best.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <div key={product._id} className="bg-[#0a0a0a] border border-white/5 overflow-hidden flex flex-col group p-2 shadow-xl">
                <div className="relative h-64 overflow-hidden rounded-xl bg-[#111]">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {product.badge && (
                    <div className="absolute top-4 right-4 bg-primary text-white text-[9px] font-black px-3 py-1 uppercase tracking-[0.2em]">
                      {product.badge}
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-gray-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">{product.category}</span>
                  <h3 className="text-lg font-bold text-white mb-6 leading-tight group-hover:text-primary-light transition-colors uppercase tracking-tighter">{product.name}</h3>
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="mt-auto w-full bg-white/5 hover:bg-white/10 text-white font-black py-3 px-4 transition-all border border-white/10 flex justify-center items-center gap-2 text-[10px] uppercase tracking-widest group/btn"
                  >
                    View Details <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button 
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-black text-xs uppercase tracking-[0.3em] transition-all border-b border-primary/20 pb-1 hover:border-primary-light"
            >
              View Full Collection <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="services" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">Experience Service</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Beyond the Sale. Professional Care.</h2>
            </div>
            <a href="#contact" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">View All Services <ChevronRight /></a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Wrench, title: 'Expert Installation', desc: 'Precision fitting by certified SR Flames engineers.' },
              { icon: Shield, title: 'Yearly Maintenance', desc: 'Stay worry-free with our comprehensive AMC plans.' },
              { icon: ThumbsUp, title: 'Authentic Support', desc: 'Only genuine spare parts and factory-grade service.' }
            ].map((service, i) => (
              <div key={i} className="group p-10 rounded-3xl bg-bg-light border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-2xl transition-all duration-500">
                <div className="w-16 h-16 bg-white shadow-lg rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                  <service.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact" className="py-32 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div>
              <span className="bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-8 inline-block">Visit Our Showroom</span>
              <h2 className="text-5xl font-extrabold text-gray-900 mb-8 leading-tight">We're Here to Assist You</h2>
              <p className="text-gray-500 text-lg mb-12 leading-relaxed">
                Step into our experience center and feel the quality. Our consultants are ready to help you pick the perfect fit for your home.
              </p>
              
              <div className="grid gap-10">
                {[
                  { icon: MapPin, label: 'Showroom Address', value: '123 Industrial Area, Kerala, India' },
                  { icon: Phone, label: 'Prime Hotline', value: '+91 97453 07450' },
                  { icon: Mail, label: 'Email Enquiries', value: 'info@srflames.com' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6 group">
                    <div className="w-16 h-16 bg-white shadow-sm border border-gray-100 rounded-2xl flex items-center justify-center shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <item.icon size={26} />
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</h5>
                      <p className="text-gray-900 font-bold text-xl">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative w-full h-[600px] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              <a href="#" className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md text-gray-900 font-bold px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 hover:bg-primary hover:text-white transition-all">
                Get Directions <ChevronRight size={18} />
              </a>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.3108620242253!2d75.8361!3d11.2396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDE0JzIyLjYiTiA3NcKwNTAnMTAuMCJF!5e0!3m2!1sen!2sin!4v1625641234567!5m2!1sen!2sin" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSelectedProduct(null)}></div>
          <div className="bg-[#0d0d0d] w-full max-w-4xl rounded-[2.5rem] overflow-hidden relative z-10 animate-in fade-in zoom-in duration-300 border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/5 hover:bg-primary text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md">
              <X size={20} />
            </button>
            
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 h-[350px] md:h-[550px] overflow-hidden bg-black flex items-center justify-center p-4">
                <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-full object-contain" />
              </div>
              <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
                <span className="text-primary font-black uppercase tracking-[0.4em] text-[9px] mb-3 block">{selectedProduct.category}</span>
                <h2 className="text-3xl sm:text-5xl font-black text-white mb-2 uppercase leading-[0.9] tracking-tighter italic">{selectedProduct.name}</h2>
                <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[9px] mb-8">{selectedProduct.brand || 'SR SIGNATURE'}</p>
                
                <div className="bg-[#151515] p-6 rounded-[1.5rem] mb-10 border border-white/5">
                   <h4 className="font-bold text-gray-500 mb-3 text-[8px] uppercase tracking-widest">Specifications</h4>
                   <p className="text-gray-400 leading-relaxed text-xs md:text-sm font-medium line-clamp-6">
                     {selectedProduct.description || "Designed for high-performance culinary environments. This unit features industrial-grade suction power, fingerprint-resistant finishes, and intelligent heat-sync technology."}
                   </p>
                </div>
                <button 
                  onClick={() => handleWhatsApp(selectedProduct)}
                  className="w-full bg-primary hover:bg-primary-light text-white font-black py-5 rounded-xl transition-all flex justify-center items-center gap-3 text-[11px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 transform hover:-translate-y-1 active:scale-95"
                >
                  <MessageCircle size={18} /> Order via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <button 
        onClick={() => handleWhatsApp()}
        className="fixed bottom-10 right-10 bg-primary hover:bg-primary-light text-white p-5 rounded-full shadow-2xl z-50 transition-all hover:scale-110 active:scale-95 group"
      >
        <MessageCircle size={36} />
        <span className="absolute right-full mr-4 bg-white text-gray-900 px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap font-bold text-sm border border-gray-100">Contact Us</span>
      </button>

    </div>
  );
};

export default Home;
