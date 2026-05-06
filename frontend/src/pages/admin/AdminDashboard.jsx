import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import { ShoppingBag, Tag, Layers, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    products: 0,
    categories: 3,
    brands: 2
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }

    const fetchStats = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setStats(prev => ({ ...prev, products: data.length }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans">
      <AdminSidebar />

      <div className="flex-1 ml-64 p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-black text-secondary tracking-tighter uppercase  leading-none mb-2">Showroom Pulse</h1>
            <p className="text-gray-500 font-medium tracking-wide">Real-time overview of your precision appliance ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100 flex items-center gap-6 group hover:border-primary/20 transition-all">
              <div className="p-4 bg-primary/10 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                <ShoppingBag size={24} />
              </div>
              <div>
                <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Appliances</h3>
                <p className="text-3xl font-black text-secondary">{stats.products}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100 flex items-center gap-6 group hover:border-blue-500/20 transition-all">
              <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-all">
                <Layers size={24} />
              </div>
              <div>
                <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Active Categories</h3>
                <p className="text-3xl font-black text-secondary">{stats.categories}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100 flex items-center gap-6 group hover:border-purple-500/20 transition-all">
              <div className="p-4 bg-purple-50 text-purple-500 rounded-2xl group-hover:bg-purple-500 group-hover:text-white transition-all">
                <Tag size={24} />
              </div>
              <div>
                <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Brand Series</h3>
                <p className="text-3xl font-black text-secondary">{stats.brands}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <Activity className="text-primary" size={20} />
              <h2 className="text-xl font-black text-secondary uppercase tracking-tight">System Status</h2>
            </div>
            <div className="py-20 text-center border-2 border-dashed border-gray-50 rounded-[2rem]">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Awaiting further inventory activity...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
