import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Mail, Search, X, Menu } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavClick = (e, path) => {
    if (path.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const id = path.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[100] font-sans">
      {/* Top Bar */}
      <div className="bg-[#8F5B34] text-white text-[10px] uppercase font-bold tracking-[0.2em] py-2 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={10} /> <span>+91 97453 07450</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Mail size={10} /> <span>info@srflames.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            SR FLAMES PREMIUM APPLIANCES
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <img src="/Srlogonavbar.webp" alt="SR Flames Logo" className="h-12 w-auto object-contain" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: 'Home', path: '/#home' },
                { name: 'About Us', path: '/#about' },
                { name: 'Products', path: '/#products' },
                { name: 'Services', path: '/#services' },
                { name: 'Contact', path: '/#contact' }
              ].map((item) => (
                <Link 
                  key={item.name}
                  to="/" 
                  onClick={(e) => handleNavClick(e, item.path)} 
                  className="text-[#2C1810] hover:text-primary transition-all font-bold text-[10px] uppercase tracking-[0.2em]"
                >
                  {item.name}
                </Link>
              ))}

              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-secondary hover:text-primary transition-all ml-4"
              >
                <Search size={18} />
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setIsSearchOpen(true)} className="text-secondary"><Search size={20} /></button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-secondary">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300">
            <div className="px-4 py-6 space-y-4">
              {[
                { name: 'Home', path: '/#home' },
                { name: 'About Us', path: '/#about' },
                { name: 'Products', path: '/#products' },
                { name: 'Services', path: '/#services' },
                { name: 'Contact', path: '/#contact' }
              ].map((item) => (
                <Link 
                  key={item.name}
                  to="/" 
                  onClick={(e) => { handleNavClick(e, item.path); setIsMobileMenuOpen(false); }} 
                  className="block text-secondary font-bold text-[11px] uppercase tracking-[0.2em] py-2"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-0 left-0 w-full bg-white h-20 z-50 flex items-center px-4 animate-in fade-in duration-300">
            <div className="max-w-3xl mx-auto w-full flex items-center gap-4">
              <Search className="text-gray-400" size={20} />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search precision appliances..."
                className="flex-grow bg-transparent border-none focus:ring-0 text-lg font-bold text-secondary placeholder-gray-300"
              />
              <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="text-gray-400 hover:text-primary"><X size={24} /></button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
