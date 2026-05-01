const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  description: { type: String },
  imageUrl: { type: String, required: true }, // AWS S3 URL
  badge: { type: String, default: "" }, // NEW ARRIVAL, BEST SELLER, etc.
  brand: { type: String, default: "SR SIGNATURE" },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
