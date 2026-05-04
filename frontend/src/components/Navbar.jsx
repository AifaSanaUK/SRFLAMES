import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Mail, Search, X, Menu } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleNavClick = (path) => {
    setIsMenuOpen(false);
    if (path === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
    } else if (path.startsWith('/#') && location.pathname === '/') {
      const id = path.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        const navbarHeight = 120;
        const offsetTop = element.offsetTop - navbarHeight;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    } else if (path.startsWith('/#')) {
      navigate(path);
    } else {
      navigate(path);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[80] transition-all duration-500 bg-white shadow-sm font-sans">
        {/* Top Mini Bar */}
        <div className="bg-[#8F5B34] text-white py-2 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-10 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-center">
            <div className="flex gap-6">
              <a href="tel:+919745307450" className="hover:text-white/80 transition-colors flex items-center gap-2">
                <Phone size={10} /> +91 97453 07450
              </a>
              <a href="mailto:info@srflames.com" className="hover:text-white/80 transition-colors flex items-center gap-2">
                <Mail size={10} /> info@srflames.com
              </a>
            </div>
            <div className="tracking-[0.3em] hidden sm:block">SR Flames Premium Appliances</div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24">
            {isSearchOpen ? (
              <div className="flex-grow flex items-center gap-4 bg-gray-50 rounded-2xl px-6 py-3 mx-4 animate-in slide-in-from-right duration-500 border border-gray-100">
                <Search size={18} className="text-[#8F5B34]" />
                <form onSubmit={handleSearchSubmit} className="flex-grow">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="SEARCH PRECISION APPLIANCES..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-[#2C1810] text-[10px] font-black tracking-widest placeholder:text-gray-400 uppercase"
                  />
                </form>
                <button
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                  className="text-gray-400 hover:text-primary transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <>
                {/* Logo */}
                <Link to="/" className="flex-shrink-0 flex items-center group">
                  <div className="relative">
                    <img className="h-10 sm:h-12 w-auto transition-transform duration-500 group-hover:scale-105" src="/Srlogonavbar.webp" alt="SR Flames" />
                  </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-10">
                  {['Home', 'Products', 'Services', 'Contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleNavClick(item === 'Home' ? '/' : `/#${item.toLowerCase().replace(' ', '')}`)}
                      className="text-[10px] font-black uppercase tracking-[0.25em] text-[#2C1810] hover:text-[#8F5B34] transition-all relative group py-2"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8F5B34] transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  ))}

                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-all text-[#2C1810] hover:text-[#8F5B34]"
                  >
                    <Search size={18} />
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                  <button onClick={() => setIsSearchOpen(true)} className="p-2 text-[#2C1810]">
                    <Search size={20} />
                  </button>
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-[#2C1810]">
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300 shadow-2xl">
            <div className="px-4 pt-4 pb-8 space-y-2">
              {['Home', 'Products', 'Services', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item === 'Home' ? '/' : `/#${item.toLowerCase().replace(' ', '')}`)}
                  className="block w-full text-left px-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#2C1810] hover:bg-gray-50 rounded-xl"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

    </>
  );
};

export default Navbar;
