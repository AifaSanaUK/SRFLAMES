import React from 'react';
import { Wrench, Shield, ThumbsUp, Zap, Clock, HeartHandshake } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Wrench,
      title: 'Precision Installation',
      desc: 'Our certified engineers ensure your chimneys and stoves are fitted with industrial-grade accuracy for maximum efficiency.'
    },
    {
      icon: Shield,
      title: 'Extended Protection',
      desc: 'Comprehensive annual maintenance contracts (AMC) that keep your appliances running at peak performance year-round.'
    },
    {
      icon: ThumbsUp,
      title: 'Authentic Restoration',
      desc: 'We only use genuine SR Signature spare parts, ensuring your appliances maintain their original quality and safety standards.'
    },
    {
      icon: Zap,
      title: 'Energy Optimization',
      desc: 'Consultation services to help you design a kitchen that balances high-performance cooking with low energy consumption.'
    },
    {
      icon: Clock,
      title: 'Rapid Response Team',
      desc: 'A dedicated support team ready to assist you within 24 hours for any technical or performance-related issues.'
    },
    {
      icon: HeartHandshake,
      title: 'Culinary Consulting',
      desc: 'Not just appliances. We help you pick the perfect culinary tools that match your home’s character and cooking style.'
    }
  ];

  return (
    <div className="bg-bg-light min-h-screen pb-32">
      {/* Header */}
      <div className="bg-secondary py-32 mb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Our Commitment</span>
          <h1 className="text-4xl md:text-6xl   font-black text-white uppercase tracking-tighter">Beyond the <span className="text-primary">Sale</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6 font-medium">Providing industrial-grade care and precision support for your modern kitchen ecosystem.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((item, index) => (
            <div key={index} className="group bg-white p-12 rounded-[3rem] border border-gray-100 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
              <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mb-10 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-primary/20">
                <item.icon size={28} />
              </div>
              <h3 className="text-2xl font-black text-secondary mb-6 uppercase tracking-tight leading-none">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
