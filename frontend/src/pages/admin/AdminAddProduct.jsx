import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    brand: 'SR SIGNATURE',
    description: '',
    badge: '',
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const [catRes, brandRes] = await Promise.all([
          fetch(`${API_URL}/api/categories`),
          fetch(`${API_URL}/api/brands`)
        ]);
        setCategories(await catRes.json());
        setBrands(await brandRes.json());
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('brand', formData.brand);
      data.append('description', formData.description);
      data.append('badge', formData.badge);

      if (image) {
        data.append('image', image);
      } else {
        throw new Error("Please select an image");
      }

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await fetch(`${API_URL}/api/products/add`, {
        method: 'POST',
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to add product');
      }

      alert('Product added successfully!');
      navigate('/admin/products');

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8f9fa] font-sans">
      <AdminSidebar />

      <div className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <Link to="/admin/products" className="text-gray-400 hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest flex items-center gap-2 mb-4">
              &larr; Back to Inventory
            </Link>
            <h1 className="text-4xl font-black text-secondary tracking-tighter uppercase italic leading-none mb-2">Add New Appliance</h1>
            <p className="text-gray-500 font-medium">Add a precision product to the SR collection.</p>
          </div>

          <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-10 border border-gray-100">
            {error && <div className="mb-8 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100 font-bold text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Appliance Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    required
                    placeholder="e.g. AERO SILENT 900"
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-bold placeholder:text-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                  <select
                    name="category"
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-bold cursor-pointer uppercase"
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Brand Series</label>
                  <select
                    name="brand"
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-bold cursor-pointer uppercase"
                  >
                    <option value="">Select Brand</option>
                    {brands.map(b => <option key={b._id} value={b.name}>{b.name}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Visual Badge</label>
                  <select
                    name="badge"
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-primary cursor-pointer uppercase"
                  >
                    <option value="">NO BADGE</option>
                    <option value="NEW ARRIVAL">NEW ARRIVAL</option>
                    <option value="BEST SELLER">BEST SELLER</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Price (Optional)</label>
                  <input
                    type="number"
                    name="price"
                    onChange={handleChange}
                    placeholder="Enter amount if applicable"
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-bold placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Technical Description</label>
                <textarea
                  name="description"
                  rows="4"
                  onChange={handleChange}
                  placeholder="Engineered for excellence..."
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-bold placeholder:text-gray-300"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Product Media (Auto-optimizes to WebP)</label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    className="w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl px-6 py-10 text-center cursor-pointer group-hover:border-primary/50 transition-all font-bold text-gray-400"
                  />
                  {image && <p className="mt-2 text-xs text-primary font-bold">Selected: {image.name}</p>}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-secondary hover:bg-secondary/95 text-white py-5 rounded-2xl shadow-xl shadow-secondary/20 font-black uppercase tracking-widest transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0"
                >
                  {loading ? 'Engine Processing...' : 'Register Appliance'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
