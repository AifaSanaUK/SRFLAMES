import React from 'react';

const Services = () => {
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4">Premium Delivery</h2>
          <p className="text-gray-600">Fast and secure delivery for all our products right to your doorstep.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4">24/7 Support</h2>
          <p className="text-gray-600">Our dedicated team is here to assist you with any inquiries around the clock.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
