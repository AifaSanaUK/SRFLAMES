const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
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

// POST: Add new product with image upload
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, stock, description, badge, brand } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Product image is required' });
    }

    // Convert image to WebP using sharp
    const webpBuffer = await sharp(req.file.buffer)
      .webp({ quality: 80 })
      .toBuffer();

    // Generate unique filename
    const randomName = crypto.randomBytes(16).toString('hex');
    const fileName = `products/${randomName}.webp`;

    // Upload to S3
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: webpBuffer,
      ContentType: 'image/webp',
    };

    await s3.send(new PutObjectCommand(uploadParams));

    // Construct public URL
    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    // Save product to database
    const newProduct = new Product({
      name,
      price: price ? Number(price) : 0,
      category,
      stock: stock ? Number(stock) : 0,
      description,
      imageUrl,
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
router.put('/:id', upload.single('image'), async (req, res) => {
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

    if (req.file) {
      const webpBuffer = await sharp(req.file.buffer).webp({ quality: 80 }).toBuffer();
      const fileName = `products/${crypto.randomBytes(16).toString('hex')}.webp`;
      await s3.send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: webpBuffer,
        ContentType: 'image/webp',
      }));
      updateData.imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedProduct);
  } catch (error) {
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
