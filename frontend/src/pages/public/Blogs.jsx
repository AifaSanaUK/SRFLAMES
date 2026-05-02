import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: "The Future of Smart Kitchens",
      category: "Innovation",
      date: "May 15, 2026",
      desc: "How integrated appliances are changing the way we interact with our culinary spaces.",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800"
    },
    {
      id: 2,
      title: "Choosing the Right Chimney Suction",
      category: "Guide",
      date: "May 10, 2026",
      desc: "Everything you need to know about suction power for Indian cooking styles.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800"
    },
    {
      id: 3,
      title: "Maintaining Your Gas Stove",
      category: "Tips",
      date: "May 05, 2026",
      desc: "Simple steps to keep your precision burners running like new for years.",
      image: "https://images.unsplash.com/photo-1504150559433-c516936e92c4?q=80&w=800"
    }
  ];

  return (
    <div className="bg-bg-light min-h-screen pb-32">
      {/* Header */}
      <div className="bg-secondary py-32 mb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">SR Journals</span>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">Insights & <span className="text-primary">Innovations</span></h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {blogs.map((post) => (
            <div key={post.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="h-64 overflow-hidden relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-6 left-6 bg-primary text-white text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">
                  {post.category}
                </div>
              </div>
              <div className="p-10">
                <div className="flex items-center gap-4 text-gray-400 text-[10px] font-black uppercase tracking-widest mb-4">
                   <div className="flex items-center gap-1"><Calendar size={12} /> {post.date}</div>
                   <div className="flex items-center gap-1"><User size={12} /> ADMIN</div>
                </div>
                <h2 className="text-2xl font-black text-secondary mb-4 uppercase tracking-tight leading-tight group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-gray-500 mb-8 leading-relaxed text-sm font-medium">
                  {post.desc}
                </p>
                <button className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] group/btn">
                  Read Article <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
