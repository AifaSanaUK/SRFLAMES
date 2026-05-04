import React, { useState, useEffect } from 'react';
import { CheckCircle2, Shield, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-bg-light min-h-screen pt-[120px] sm:pt-[150px] font-sans pb-20">
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

          <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-primary hidden lg:block"></div>
              <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px]">Since 2014</span>
            </div>

            <h2 className="text-4xl md:text-4xl font-black text-secondary mb-10 leading-[1.1] tracking-tighter uppercase">
              Mastering the Art of <span className="text-primary">Modern</span> Cooking
            </h2>

            <p className="text-gray-500 text-md mb-12 leading-relaxed font-medium max-w-xl">
              SR Flames stands at the intersection of aesthetic brilliance and technical perfection. We provide kitchen solutions that aren't just appliances, but integral parts of your home's character.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-14 w-full">
              <div className="flex flex-col items-center lg:items-start lg:flex-row gap-4 group text-center lg:text-left">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <span className="font-black text-secondary uppercase tracking-widest text-xs block mb-1">ISO Certified</span>
                  <p className="text-gray-400 text-[11px] leading-tight max-w-[200px]">Global standards in precision engineering.</p>
                </div>
              </div>
              <div className="flex flex-col items-center lg:items-start lg:flex-row gap-4 group text-center lg:text-left">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                  <Shield size={28} />
                </div>
                <div>
                  <span className="font-black text-secondary uppercase tracking-widest text-xs block mb-1">5 Year Warranty</span>
                  <p className="text-gray-400 text-[11px] leading-tight max-w-[200px]">Unmatched reliability and lifelong support.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-4 bg-secondary text-white font-black py-5 px-12 rounded-2xl transition-all hover:bg-primary hover:shadow-[0_20px_40px_-10px_rgba(143,91,52,0.4)] transform hover:-translate-y-1 uppercase tracking-widest text-xs"
            >
              Get a Consultation <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
