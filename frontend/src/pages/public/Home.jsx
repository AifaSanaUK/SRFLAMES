import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, CheckCircle2, ChevronRight, Wrench, Shield, ThumbsUp, Send, Phone, Mail, MapPin, X } from 'lucide-react';
import herobg from '../../assets/herobg.webp';
import herobgg from '../../assets/herobgg.jpg';

const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasStarted) {
        setHasStarted(true);
      }
    }, { threshold: 0.1 });

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, end, duration]);

  return <span ref={elementRef}>{count}</span>;
};

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const handleNavClick = (hash) => {
    const id = hash.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 120;
      const offsetTop = element.offsetTop - navbarHeight;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setProducts(data.slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();

    // Intersection Observer for Reveal Effects
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-fade-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-section').forEach(el => observer.observe(el));
    return () => observer.disconnect();
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

    window.open(`https://wa.me/919847814033?text=${encodeURIComponent(text)}`, '_blank');
  };

  const [currentImage, setCurrentImage] = useState(0);
  const heroImages = [
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80',
    herobg,
    herobgg
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="font-sans overflow-x-hidden bg-bg-light animate-in fade-in duration-1000">

      {/* 1. HERO SECTION - SUNBIRD STYLE SLIDESHOW */}
      <section
        id="home"
        className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-black"
      >
        {/* Slideshow Layers */}
        {heroImages.map((img, index) => (
          <div
            key={img}
            className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(20, 10, 5, 0.85) 0%, rgba(143, 91, 52, 0.25) 50%, rgba(20, 10, 5, 0.85) 100%), url('${img}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentImage === index ? 1 : 0,
              zIndex: 1
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-[60px] sm:pt-[80px]">
          <div className="max-w-4xl animate-in fade-in slide-in-from-left duration-1000">

            <h1 className="text-white font-black leading-[1.1] tracking-tighter mb-6 sm:mb-8 uppercase" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>
              Smart Kitchens.<br />
              <span className="text-primary">Always Elite.</span>
            </h1>
            <p className="text-white/90 text-sm sm:text-base mb-10 sm:mb-12 max-w-xl leading-relaxed font-medium" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}>
              Experience the intersection of aesthetic brilliance and technical perfection. Premium Chimneys & Stoves designed for modern living.
            </p>

            <div className="flex flex-wrap gap-4 sm:gap-6 mb-16 sm:mb-20">
              <button
                onClick={() => handleNavClick('#products')}
                className="bg-primary hover:bg-primary-light text-white font-black py-4 sm:py-5 px-10 sm:px-14 transition-all text-[10px] sm:text-xs uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 transform hover:-translate-y-1 active:scale-95"
              >
                Get Started
              </button>
              <button
                onClick={() => handleNavClick('#about')}
                className="bg-white/5 hover:bg-white/10 text-white font-black py-4 sm:py-5 px-10 sm:px-14 transition-all border border-white/20 backdrop-blur-md text-[10px] sm:text-xs uppercase tracking-[0.3em] transform hover:-translate-y-1 active:scale-95"
              >
                Our Story
              </button>
            </div>
            {/* Compact Stats below Buttons */}
            <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 text-white">
              <div className="flex flex-col">
                <span className="text-2xl font-bold leading-none"><CountUp end={10} />+</span>
                <span className="text-[8px] text-gray-400 uppercase tracking-widest font-black mt-1">Years Experience</span>
              </div>
              <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold leading-none"><CountUp end={500} />+</span>
                <span className="text-[8px] text-gray-400 uppercase tracking-widest font-black mt-1">Happy Homes</span>
              </div>
              <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold leading-none"><CountUp end={100} />%</span>
                <span className="text-[8px] text-gray-400 uppercase tracking-widest font-black mt-1">Quality Assurance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section id="about" className="py-10 sm:py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              {/* Decorative Background Elements */}
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-px h-32 bg-primary/20 hidden lg:block"></div>
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-px h-32 bg-primary/20 hidden lg:block"></div>

                <div className="relative group overflow-hidden rounded-[2rem] shadow-2xl transform transition-all duration-700 hover:scale-[1.01]">
                  <img
                    src="/kitchen-about.png"
                    alt="Luxury SR Flames Kitchen"
                    className="w-full object-cover h-[550px] transform transition-transform duration-[2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  {/* Floating Experience Badge - SHRUNK */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-700">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-black text-sm">
                        <CountUp end={10} />+
                      </div>
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-primary">Years Experience</p>
                        <p className="text-xs font-bold text-secondary uppercase tracking-tight">Premium Solutions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-10 h-[1px] bg-primary"></div>
                <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px]">Since 2014</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-secondary mb-10 leading-[1.1] tracking-tighter uppercase">
                Mastering the Art of <span className="text-primary">Modern</span> Cooking
              </h2>

              <p className="text-gray-500 text-md mb-12 leading-relaxed font-medium">
                SR Flames stands at the intersection of aesthetic brilliance and technical perfection. We provide kitchen solutions that aren't just appliances, but integral parts of your home's character.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 sm:gap-10 mb-14">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 group text-center sm:text-left">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <CheckCircle2 size={20} className="sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <span className="font-black text-secondary uppercase tracking-widest text-[8px] sm:text-xs block mb-1">ISO Certified</span>
                    <p className="text-gray-400 text-[9px] sm:text-[11px] leading-tight">Global standards in precision engineering.</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 group text-center sm:text-left">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Shield size={20} className="sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <span className="font-black text-secondary uppercase tracking-widest text-[8px] sm:text-xs block mb-1">5 Year Warranty</span>
                    <p className="text-gray-400 text-[9px] sm:text-[11px] leading-tight">Unmatched reliability and support.</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-4 bg-secondary text-white font-black py-5 px-12 rounded-2xl transition-all hover:bg-primary hover:shadow-[0_20px_40px_-10px_rgba(143,91,52,0.4)] transform hover:-translate-y-1 uppercase tracking-widest text-xs"
                >
                  Get a Consultation <ChevronRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCTS SECTION */}
      <section id="products" className="py-10 sm:py-16 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">Premium Collection</span>
            <h2 className="text-3xl md:text-3xl font-extrabold text-gray-900 mb-6">OUR BEST SELLERS</h2>
            <p className="text-gray-500 text-lg">Meticulously crafted chimneys and stoves for those who demand the best.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
            {products.map((product) => (
              <div key={product._id} className="bg-[#0a0a0a] border border-white/5 overflow-hidden flex flex-col group p-2 shadow-xl transition-all duration-500">
                <div className="relative aspect-square overflow-hidden bg-[#111]">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {product.badge && (
                    <div className="absolute top-4 right-4 bg-primary text-white text-[7px] font-black px-2 py-1 uppercase tracking-[0.2em]">
                      {product.badge}
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-6 flex flex-col flex-grow">
                  <span className="text-gray-500 text-[7px] font-bold uppercase tracking-[0.2em] mb-1">{product.category}</span>
                  <h3 className="text-sm sm:text-lg font-bold text-white mb-4 leading-tight group-hover:text-primary-light transition-colors uppercase tracking-tighter">{product.name}</h3>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="mt-auto w-full bg-white/5 hover:bg-white/10 text-white font-black py-2.5 px-2 transition-all border border-white/10 flex justify-center items-center gap-1 text-[8px] uppercase tracking-widest group/btn whitespace-nowrap"
                  >
                    View Details <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
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
      <section id="services" className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Experience Service</span>
            <h2 className="text-3xl md:text-4xl font-black text-secondary leading-tight uppercase tracking-tighter">Beyond the Sale. Professional Care.</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-12">
            {[
              { icon: Wrench, title: 'Expert Installation', desc: 'Precision fitting by certified engineers.' },
              { icon: Shield, title: 'Yearly Maintenance', desc: 'Stay worry-free with our AMC plans.' },
              { icon: ThumbsUp, title: 'Authentic Support', desc: 'Only genuine spare parts used.' },
              { icon: MessageCircle, title: 'Rapid Support', desc: 'Technical assistance within 24 hours.' }
            ].map((service, index) => (
              <div key={index} className="group p-5 sm:p-10 bg-[#fbf9f7] rounded-[1.5rem] sm:rounded-[2.5rem] border border-gray-100 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-primary text-white rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-primary/20">
                  <service.icon size={20} className="sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-xs sm:text-xl font-black text-secondary mb-2 sm:mb-4 uppercase tracking-tight">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed text-[10px] sm:text-sm font-medium">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTACT & MAP SECTION */}
      <section id="contact" className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Visit Our Showroom</span>
              <h2 className="text-2xl md:text-4xl font-black text-secondary mb-10 leading-tight uppercase tracking-tighter">We're Here to Assist You</h2>
              <p className="text-gray-500 text-lg mb-14 leading-relaxed font-medium">
                Step into our experience center and feel the quality. Our consultants are ready to help you pick the perfect fit for your home.
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-1 gap-2 sm:gap-10">
                {[
                  { icon: MapPin, label: 'Address', value: 'Koottanad, Palakkad' },
                  { icon: Phone, label: 'Hotline', value: '+91 98478 14033, +91 86065 17947' },
                  { icon: Mail, label: 'Email', value: 'aquap0334@gmail.com' }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 sm:gap-6 group text-center">
                    <div className="w-8 h-8 md:w-14 md:h-14 bg-primary text-white shadow-lg shadow-primary/20 rounded-lg md:rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300">
                      <item.icon size={14} className="md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h5 className="text-[6px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5 md:mb-1">{item.label}</h5>
                      <p className="text-secondary font-black text-[7px] md:text-lg tracking-tight leading-tight break-all">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative w-full h-[600px] rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100">
              <div className="absolute top-8 left-8 z-10">
                <a href="#" className="bg-white/95 backdrop-blur-md text-secondary font-black text-[10px] uppercase tracking-widest px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 hover:bg-primary hover:text-white transition-all border border-white/20">
                  Get Directions <ChevronRight size={16} />
                </a>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31357.25638827601!2d76.09838930895307!3d10.760892270747739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7c72e02a24785%3A0x854099e11a8e7ed7!2sKoottanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1777963900018!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
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

            <div className="flex flex-row">
              <div className="w-1/2 h-auto sm:h-[550px] overflow-hidden bg-black flex items-center justify-center p-2 sm:p-4 border-r border-white/5">
                <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-full object-contain" />
              </div>
              <div className="w-1/2 p-4 sm:p-12 flex flex-col justify-center">
                <span className="text-primary font-black uppercase tracking-[0.4em] text-[9px] mb-3 block">{selectedProduct.category}</span>
                <h2 className="text-2xl sm:text-5xl font-black text-white mb-2 uppercase leading-[0.9] tracking-tighter">{selectedProduct.name}</h2>
                <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[8px] sm:text-[9px] mb-8">{selectedProduct.brand || 'SR SIGNATURE'}</p>

                <div className="bg-[#151515] p-6 rounded-[1.5rem] mb-10 border border-white/5">
                  <h4 className="font-bold text-gray-500 mb-3 text-[8px] uppercase tracking-widest">Specifications</h4>
                  <p className="text-gray-400 leading-relaxed text-xs md:text-sm font-medium line-clamp-6">
                    {selectedProduct.description || "Designed for high-performance culinary environments. This unit features industrial-grade suction power, fingerprint-resistant finishes, and intelligent heat-sync technology."}
                  </p>
                </div>
                <button
                  onClick={() => handleWhatsApp(selectedProduct)}
                  className="w-full bg-primary hover:bg-primary-light text-white font-black py-2.5 sm:py-4 rounded-xl transition-all flex justify-center items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 transform hover:-translate-y-1 active:scale-95"
                >
                  <MessageCircle size={14} className="sm:w-4 sm:h-4" /> Order via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
