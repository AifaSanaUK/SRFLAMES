import React from 'react';
import { MapPin, Phone, Mail, Send, ChevronRight } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-bg-light min-h-screen pb-32">
      {/* Header */}
      <div className="bg-secondary py-32 mb-20 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Get In Touch</span>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">Contact <span className="text-primary">Us</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6 font-medium">Reach out for precision appliance inquiries or to book a personal showroom tour.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info Side */}
          <div>
            <h2 className="text-3xl font-black text-secondary mb-12 uppercase tracking-tight">Our <span className="text-primary">Locations</span></h2>

            <div className="space-y-12 mb-16">
              {[
                { icon: MapPin, label: 'Main Office', value: 'Koottanad, Palakkad, Kerala, India' },
                { icon: Phone, label: 'Prime Hotline', value: '+91 98478 14033', href: 'tel:+919847814033' },
                { icon: Mail, label: 'Email Enquiries', value: 'aquap0334@gmail.com', href: 'mailto:aquap0334@gmail.com' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-8 group">
                  <div className="w-16 h-16 bg-primary text-white shadow-xl shadow-primary/20 rounded-[1.5rem] flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-500">
                    <item.icon size={26} />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</h5>
                    {item.href ? (
                      <a href={item.href} className="text-secondary font-black text-xl tracking-tight leading-none hover:text-primary transition-colors block">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-secondary font-black text-xl tracking-tight leading-none">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl flex items-center justify-between group">
              <div>
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Open Hours</p>
                <p className="text-secondary font-bold">Mon - Sat: 9:30 AM - 7:30 PM</p>
              </div>
              <div className="w-12 h-12 bg-bg-light rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <ChevronRight />
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/40 border border-gray-50 p-12 lg:p-16">
            <h3 className="text-2xl font-black text-secondary mb-10 uppercase tracking-tight">Send a <span className="text-primary">Message</span></h3>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Full Name</label>
                  <input type="text" className="w-full bg-bg-light border-none rounded-2xl px-6 py-4 font-bold text-secondary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-300" placeholder="e.g. John Doe" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Email Address</label>
                  <input type="email" className="w-full bg-bg-light border-none rounded-2xl px-6 py-4 font-bold text-secondary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-300" placeholder="e.g. john@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Subject</label>
                <input type="text" className="w-full bg-bg-light border-none rounded-2xl px-6 py-4 font-bold text-secondary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-300" placeholder="e.g. Product Inquiry" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Your Message</label>
                <textarea rows={5} className="w-full bg-bg-light border-none rounded-2xl px-6 py-4 font-bold text-secondary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-300" placeholder="How can our precision appliances help you?"></textarea>
              </div>
              <button type="submit" className="w-full bg-secondary hover:bg-primary text-white font-black py-5 rounded-2xl transition-all shadow-xl hover:shadow-primary/20 flex items-center justify-center gap-3 uppercase tracking-widest text-xs btn-active-effect">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
