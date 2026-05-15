import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary text-gray-300 pt-20 pb-10 border-t border-primary/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-8">
              <img src="/Srlogonavbar.webp" alt="SR Flames Footer Logo" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed mb-8 text-gray-400">
              Premium chimney and stove solutions for modern kitchens. We deliver high-quality, reliable, and energy-efficient appliances to transform your cooking experience.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1DhPepFUq4/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" /></svg>
              </a>
              <a href="https://www.instagram.com/sr_flames__?igsh=MTVjbnptb2gwbWFtMA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-0.5 after:bg-primary after:rounded">Quick Links</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="/#home" className="hover:text-primary transition-all flex items-center gap-2 group"><span className="text-primary opacity-0 group-hover:opacity-100 transition-all">-</span> Home</a></li>
              <li><a href="/#about" className="hover:text-primary transition-all flex items-center gap-2 group"><span className="text-primary opacity-0 group-hover:opacity-100 transition-all">-</span> About Us</a></li>
              <li><a href="/#products" className="hover:text-primary transition-all flex items-center gap-2 group"><span className="text-primary opacity-0 group-hover:opacity-100 transition-all">-</span> Products</a></li>
              <li><a href="/#services" className="hover:text-primary transition-all flex items-center gap-2 group"><span className="text-primary opacity-0 group-hover:opacity-100 transition-all">-</span> Services</a></li>
              <li><a href="/#blogs" className="hover:text-primary transition-all flex items-center gap-2 group"><span className="text-primary opacity-0 group-hover:opacity-100 transition-all">-</span> Blog</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 relative inline-block after:content-[''] after:-bottom-2 after:absolute after:left-0 after:w-1/2 after:h-0.5 after:bg-primary after:rounded">Our Services</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-primary transition-all flex items-center gap-2 group"><span className="text-primary opacity-0 group-hover:opacity-100 transition-all">-</span> Chimney Installation</a></li>
              <li><a href="#" className="hover:text-primary transition-all flex items-center gap-2 group"><span className="text-primary opacity-0 group-hover:opacity-100 transition-all">-</span> Stove Repairing</a></li>
              <li><a href="#" className="hover:text-primary transition-all flex items-center gap-2 group"><span className="text-primary opacity-0 group-hover:opacity-100 transition-all">-</span> Annual Maintenance</a></li>
              <li><a href="#" className="hover:text-primary transition-all flex items-center gap-2 group"><span className="text-primary opacity-0 group-hover:opacity-100 transition-all">-</span> Kitchen Consulting</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 relative inline-block after:content-[''] after:-bottom-2 after:absolute after:left-0 after:w-1/2 after:h-0.5 after:bg-primary after:rounded">Contact Info</h3>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-primary" size={18} />
                </div>
                <span className="leading-relaxed">Koottanad, Palakkad</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="text-primary" size={18} />
                </div>
                <div className="flex flex-col gap-1">
                  <a href="tel:+919847814033" className="hover:text-primary transition-colors">+91 98478 14033</a>
                  <a href="tel:+918606517947" className="hover:text-primary transition-colors">+91 86065 17947</a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="text-primary" size={18} />
                </div>
                <a href="mailto:aquap0334@gmail.com" className="hover:text-primary transition-colors">aquap0334@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500">
          <p>&copy; {new Date().getFullYear()} SR Flames. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
