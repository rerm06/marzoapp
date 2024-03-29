const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Create product
router.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    console.log(`Product created: ${product.name}`);
    res.status(201).json(product);
  } catch (error) {
    console.error(`Error creating product: ${error.message}`, error.stack);
    res.status(400).json({ error: error.message });
  }
});

// List products
router.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(`Fetched ${products.length} products`);
    res.status(200).json(products);
  } catch (error) {
    console.error(`Error fetching products: ${error.message}`, error.stack);
    res.status(500).json({ error: error.message });
  }
});

// Fetch product
router.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      console.log(`Product not found with id: ${req.params.id}`);
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log(`Fetched product: ${product.name}`);
    res.status(200).json(product);
  } catch (error) {
    console.error(`Error fetching product: ${error.message}`, error.stack);
    res.status(500).json({ error: error.message });
  }
});

// Update product
router.patch('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      console.log(`Product not found for update with id: ${req.params.id}`);
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log(`Product updated: ${product.name}`);
    res.status(200).json(product);
  } catch (error) {
    console.error(`Error updating product: ${error.message}`, error.stack);
    res.status(400).json({ error: error.message });
  }
});

// Delete product
router.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      console.log(`Product not found for deletion with id: ${req.params.id}`);
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log(`Product deleted: ${product.name}`);
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting product: ${error.message}`, error.stack);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;