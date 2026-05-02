import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { Plus, Trash2, Layers } from 'lucide-react';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await fetch(`${API_URL}/api/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCategory) return;
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await fetch(`${API_URL}/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory.toUpperCase() }),
      });
      if (res.ok) {
        setNewCategory('');
        fetchCategories();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await fetch(`${API_URL}/api/categories/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8f9fa] font-sans">
      <AdminSidebar />
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-secondary tracking-tighter uppercase  leading-none mb-2">Category Registry</h1>
            <p className="text-gray-500 font-medium tracking-wide">Define your precision appliance classifications.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Add Category Form */}
            <div className="md:col-span-1">
              <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Create New</h3>
                <form onSubmit={handleAdd} className="space-y-4">
                  <input
                    type="text"
                    placeholder="e.g. CHIMNEYS"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-bold placeholder:text-gray-300 focus:ring-2 focus:ring-primary/20"
                  />
                  <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 flex justify-center items-center gap-2">
                    <Plus size={14} /> Add Category
                  </button>
                </form>
              </div>
            </div>

            {/* Category List */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                {loading ? (
                  <div className="p-20 text-center text-gray-300 font-bold uppercase tracking-widest text-[10px]">Syncing Data...</div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    <div className="p-6 bg-gray-50/50 flex items-center gap-3">
                      <Layers size={14} className="text-primary" />
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Classifications ({categories.length})</span>
                    </div>
                    {categories.map((cat) => (
                      <div key={cat._id} className="p-6 flex justify-between items-center group hover:bg-gray-50 transition-colors">
                        <span className="font-black text-secondary uppercase tracking-tight">{cat.name}</span>
                        <button
                          onClick={() => handleDelete(cat._id)}
                          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    {categories.length === 0 && (
                      <div className="p-20 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">No categories registered.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
