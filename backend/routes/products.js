const express = require('express');
const router = express.Router();
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');
const Product = require('../models/Product');

// Configure S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Helper function to upload an image buffer directly to S3
async function uploadToS3(file) {
  const fileExt = file.originalname.split('.').pop() || 'jpg';
  const fileName = `products/${crypto.randomBytes(16).toString('hex')}.${fileExt}`;
  await s3.send(new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  }));
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
}

const productUploadFields = [
  { name: 'image', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 }
];

// POST: Add new product with image upload
router.post('/add', upload.fields(productUploadFields), async (req, res) => {
  try {
    const { name, price, category, stock, description, badge, brand } = req.body;
    
    if (!req.files || !req.files['image']) {
      return res.status(400).json({ message: 'Main product image is required' });
    }

    const imageUrl = await uploadToS3(req.files['image'][0]);
    let imageUrl2 = "";
    let imageUrl3 = "";

    if (req.files['image2']) {
      imageUrl2 = await uploadToS3(req.files['image2'][0]);
    }
    if (req.files['image3']) {
      imageUrl3 = await uploadToS3(req.files['image3'][0]);
    }

    // Save product to database
    const newProduct = new Product({
      name,
      price: price ? Number(price) : 0,
      category,
      stock: stock ? Number(stock) : 0,
      description,
      imageUrl,
      imageUrl2,
      imageUrl3,
      badge: badge || "",
      brand: brand || "SR SIGNATURE"
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server error while adding product', error: error.message });
  }
});

// PUT: Update full product (used for edit page)
router.put('/:id', upload.fields(productUploadFields), async (req, res) => {
  try {
    const { name, price, category, stock, description, badge, brand } = req.body;
    let updateData = {
      name,
      price: price ? Number(price) : 0,
      category,
      stock: stock ? Number(stock) : 0,
      description,
      badge,
      brand
    };

    if (req.files) {
      if (req.files['image']) {
        updateData.imageUrl = await uploadToS3(req.files['image'][0]);
      }
      if (req.files['image2']) {
        updateData.imageUrl2 = await uploadToS3(req.files['image2'][0]);
      }
      if (req.files['image3']) {
        updateData.imageUrl3 = await uploadToS3(req.files['image3'][0]);
      }
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

// PATCH: Update product (e.g., badge, stock, name)
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
