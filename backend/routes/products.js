const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;
const Product = require('../models/Product');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer — memory storage (no disk write needed)
const upload = multer({ storage: multer.memoryStorage() });

// Helper: compress with sharp → upload buffer to Cloudinary → return secure URL
async function uploadToCloudinary(file) {
  const buffer = await sharp(file.buffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'srflames/products', format: 'webp' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}

const productUploadFields = [
  { name: 'image',  maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 }
];

// POST: Add new product
router.post('/add', upload.fields(productUploadFields), async (req, res) => {
  try {
    const { name, price, category, stock, description, badge, brand } = req.body;

    if (!req.files || !req.files['image']) {
      return res.status(400).json({ message: 'Main product image is required' });
    }

    const imageUrl  = await uploadToCloudinary(req.files['image'][0]);
    const imageUrl2 = req.files['image2'] ? await uploadToCloudinary(req.files['image2'][0]) : '';
    const imageUrl3 = req.files['image3'] ? await uploadToCloudinary(req.files['image3'][0]) : '';

    const newProduct = new Product({
      name,
      price:       price ? Number(price) : 0,
      category,
      stock:       stock ? Number(stock) : 0,
      description,
      imageUrl,
      imageUrl2,
      imageUrl3,
      badge:  badge  || '',
      brand:  brand  || 'SR SIGNATURE'
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server error while adding product', error: error.message });
  }
});

// PUT: Update product
router.put('/:id', upload.fields(productUploadFields), async (req, res) => {
  try {
    const { name, price, category, stock, description, badge, brand } = req.body;
    const updateData = {
      name,
      price:       price ? Number(price) : 0,
      category,
      stock:       stock ? Number(stock) : 0,
      description,
      badge,
      brand
    };

    if (req.files) {
      if (req.files['image'])  updateData.imageUrl  = await uploadToCloudinary(req.files['image'][0]);
      if (req.files['image2']) updateData.imageUrl2 = await uploadToCloudinary(req.files['image2'][0]);
      if (req.files['image3']) updateData.imageUrl3 = await uploadToCloudinary(req.files['image3'][0]);
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
});

// GET: Fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching products' });
  }
});

// PATCH: Partial update (badge, stock, etc.)
router.patch('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// DELETE: Remove product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

module.exports = router;
