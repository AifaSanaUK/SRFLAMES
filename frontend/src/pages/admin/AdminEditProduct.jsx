import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    brand: '',
    description: '',
    badge: '',
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const [catRes, brandRes, prodRes] = await Promise.all([
          fetch(`${API_URL}/api/categories`),
          fetch(`${API_URL}/api/brands`),
          fetch(`${API_URL}/api/products`)
        ]);
        
        const cats = await catRes.json();
        const brs = await brandRes.json();
        const prods = await prodRes.json();
        
        setCategories(cats);
        setBrands(brs);

        const product = prods.find(p => p._id === id);
        if (product) {
          setFormData({
            name: product.name,
            price: product.price,
            category: product.category,
            brand: product.brand || '',
            description: product.description || '',
            badge: product.badge || '',
          });
          setCurrentImageUrl(product.imageUrl);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load product data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
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
      }

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'PUT',
        body: data,
      });

      if (!res.ok) {
        throw new Error('Failed to update product');
      }

      alert('Product updated successfully!');
      navigate('/admin/products');

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="font-bold text-primary uppercase tracking-widest text-[10px]">Loading Precision Data...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#f8f9fa] font-sans">
      <AdminSidebar />

      <div className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <Link to="/admin/products" className="text-gray-400 hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest flex items-center gap-2 mb-4">
              &larr; Back to Inventory
            </Link>
            <h1 className="text-4xl font-black text-secondary tracking-tighter uppercase italic leading-none mb-2">Edit Appliance</h1>
            <p className="text-gray-500 font-medium">Refining the specifications of {formData.name}</p>
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
                    value={formData.name}
                    onChange={handleChange} 
                    required 
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-bold placeholder:text-gray-300" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    name="category" 
                    value={formData.category}
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
                    value={formData.brand}
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
                    value={formData.badge}
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
                    value={formData.price}
                    onChange={handleChange} 
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-bold placeholder:text-gray-300" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Technical Description</label>
                <textarea 
                  name="description" 
                  rows="4" 
                  value={formData.description}
                  onChange={handleChange} 
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-bold placeholder:text-gray-300"
                ></textarea>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Change Media (Keep empty to keep current image)</label>
                <div className="flex gap-6 items-center">
                   <div className="w-24 h-24 rounded-2xl overflow-hidden border border-gray-100 shadow-md bg-gray-50">
                      <img src={currentImageUrl} className="w-full h-full object-cover" alt="Current" />
                   </div>
                   <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="flex-1 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl px-6 py-8 text-center cursor-pointer font-bold text-gray-400 text-sm hover:border-primary/50 transition-all" 
                  />
                </div>
                {image && <p className="text-[10px] text-primary font-bold">New file selected: {image.name}</p>}
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={updating} 
                  className="w-full bg-secondary hover:bg-secondary/95 text-white py-5 rounded-2xl shadow-xl shadow-secondary/20 font-black uppercase tracking-widest transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0"
                >
                  {updating ? 'Updating Showroom...' : 'Save Refinements'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;
