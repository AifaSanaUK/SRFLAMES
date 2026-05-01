import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, LogOut, Layers, Tag, Power } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: ShoppingBag },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Brands', path: '/admin/brands', icon: Tag },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="w-64 bg-secondary text-white h-screen sticky top-0 flex flex-col shadow-2xl p-6 z-[50]">
      <div className="mb-12">
        <h2 className="text-2xl font-black text-primary tracking-tighter uppercase italic">SR ADMIN</h2>
        <p className="text-[10px] text-gray-500 font-bold tracking-[0.3em] uppercase mt-1">Management Suite</p>
      </div>

      <nav className="flex-grow space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all font-bold text-sm tracking-wide ${
                isActive 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-white/5 space-y-2">
        <Link 
          to="/" 
          className="flex items-center gap-4 p-4 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all font-bold text-xs uppercase tracking-widest"
        >
          <LogOut size={16} />
          View Site
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-4 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition-all font-black text-xs uppercase tracking-[0.2em]"
        >
          <Power size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
