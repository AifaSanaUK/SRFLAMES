import React from 'react';

const Blogs = () => {
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12">Latest News & Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((post) => (
          <div key={post} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <span className="text-sm text-primary font-semibold">Updates</span>
              <h2 className="text-xl font-bold mt-2 mb-3">Blog Post Title {post}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <button className="text-primary font-medium hover:underline">Read More →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
