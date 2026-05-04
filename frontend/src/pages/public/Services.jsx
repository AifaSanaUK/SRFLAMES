import React from 'react';
import { Wrench, Shield, ThumbsUp, Zap } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Wrench,
      title: 'Expert Installation',
      desc: 'Precision fitting by certified SR Flames engineers.'
    },
    {
      icon: Shield,
      title: 'Yearly Maintenance',
      desc: 'Stay worry-free with our comprehensive AMC plans.'
    },
    {
      icon: ThumbsUp,
      title: 'Authentic Support',
      desc: 'Only genuine spare parts and factory-grade service.'
    },
    {
      icon: Zap,
      title: 'Lifelong Care',
      desc: 'Continuous performance optimization for your appliances.'
    }
  ];

  return (
    <div className="bg-bg-light min-h-screen pb-32 pt-[100px] sm:pt-[120px] font-sans">
      {/* Header */}
      <div className="bg-secondary py-24 sm:py-32 mb-16 sm:mb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Experience Service</span>
          <h1 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">Beyond the <span className="text-primary">Sale.</span><br />Professional Care.</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-10">
          {services.map((item, index) => (
            <div key={index} className="group bg-white p-6 sm:p-12 rounded-[2rem] sm:rounded-[3rem] border border-gray-100 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 flex flex-col items-center text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#8F5B34] text-white rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-10 transform group-hover:scale-110 transition-all duration-500 shadow-lg shadow-primary/20">
                <item.icon size={24} className="sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-xs sm:text-2xl font-black text-secondary mb-3 sm:mb-6 uppercase tracking-tight leading-none">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed text-[10px] sm:text-sm font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
