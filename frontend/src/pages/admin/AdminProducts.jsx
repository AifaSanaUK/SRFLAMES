import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Edit, Check, ExternalLink } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdateBadge = async (id, newBadge) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ badge: newBadge }),
      });
      if (res.ok) {
        setProducts(products.map(p => p._id === id ? { ...p, badge: newBadge } : p));
      }
    } catch (err) {
      console.error('Failed to update badge:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8f9fa] font-sans">
      <AdminSidebar />

      <div className="flex-1 ml-64 p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-4xl font-black text-secondary tracking-tighter uppercase  leading-none mb-2">Showroom Inventory</h1>
              <p className="text-gray-500 font-medium">Manage and refine your precision appliances collection.</p>
            </div>
            <Link
              to="/admin/products/add"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 font-black uppercase tracking-widest transition-all transform hover:-translate-y-1"
            >
              + Register Appliance
            </Link>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="p-32 text-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Accessing Database...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="p-8 font-black text-gray-400 uppercase tracking-widest text-[10px]">Appliance</th>
                      <th className="p-8 font-black text-gray-400 uppercase tracking-widest text-[10px]">Series & Series</th>
                      <th className="p-8 font-black text-gray-400 uppercase tracking-widest text-[10px]">Badge Status</th>
                      <th className="p-8 font-black text-gray-400 uppercase tracking-widest text-[10px] text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50/30 transition-colors group">
                        <td className="p-8">
                          <div className="flex items-center gap-6">
                            <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-md">
                              <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div>
                              <p className="font-black text-secondary uppercase tracking-tight text-lg">{p.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-black uppercase tracking-widest">{p.category}</span>
                                <span className="text-[10px] text-gray-300 font-bold">₹{p.price?.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-8">
                          <p className="text-xs font-black text-secondary uppercase tracking-widest">{p.brand || 'SR SIGNATURE'}</p>
                        </td>
                        <td className="p-8">
                          <select
                            value={p.badge || ""}
                            onChange={(e) => handleUpdateBadge(p._id, e.target.value)}
                            className={`text-[10px] font-black px-4 py-2.5 rounded-xl border focus:outline-none transition-all cursor-pointer uppercase tracking-widest shadow-sm ${p.badge === 'NEW ARRIVAL' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                              p.badge === 'BEST SELLER' ? 'bg-primary/5 text-primary border-primary/10' :
                                'bg-gray-50 text-gray-400 border-gray-100'
                              }`}
                          >
                            <option value="">NO BADGE</option>
                            <option value="NEW ARRIVAL">NEW ARRIVAL</option>
                            <option value="BEST SELLER">BEST SELLER</option>
                          </select>
                        </td>
                        <td className="p-8 text-right">
                          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link
                              to={`/admin/products/edit/${p._id}`}
                              className="p-3 bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl transition-all shadow-sm"
                              title="Edit Appliance"
                            >
                              <Edit size={18} />
                            </Link>
                            <button
                              onClick={() => handleDelete(p._id)}
                              className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm"
                              title="Delete Appliance"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {!loading && products.length === 0 && (
              <div className="p-32 text-center">
                <p className="text-gray-400 font-black uppercase tracking-widest text-xs mb-8">No precision appliances registered.</p>
                <Link to="/admin/products/add" className="bg-secondary text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl">Add First Product</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
