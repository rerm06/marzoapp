const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { isAuthenticated } = require('./middleware/authMiddleware');
const router = express.Router();

// Retrieve the user's cart
router.get('/api/cart', isAuthenticated, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.session.userId });
    if (!cart) {
      console.log('Cart not found for user:', req.session.userId);
      return res.status(404).json({ message: 'Cart not found' });
    }
    console.log('Cart retrieved for user:', req.session.userId);
    res.json(cart);
  } catch (error) {
    console.error(`Error fetching cart: ${error.message}`, error.stack);
    res.status(500).json({ error: error.message });
  }
});

// Add an item to the cart
router.post('/api/cart/add', isAuthenticated, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      console.log('Product not found with id:', productId);
      return res.status(404).json({ message: 'Product not found' });
    }
    const cart = await Cart.findOneAndUpdate(
      { userId: req.session.userId },
      { $push: { items: { product: productId, quantity } } },
      { new: true, upsert: true }
    );
    console.log(`Item added to cart for user: ${req.session.userId}, Product ID: ${productId}`);
    res.status(201).json(cart);
  } catch (error) {
    console.error(`Error adding item to cart: ${error.message}`, error.stack);
    res.status(500).json({ error: error.message });
  }
});

// Remove an item from the cart
router.post('/api/cart/remove', isAuthenticated, async (req, res) => {
  const { itemId } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.session.userId },
      { $pull: { items: { _id: itemId } } },
      { new: true }
    );
    if (!cart) {
      console.log('Cart not found for user:', req.session.userId);
      return res.status(404).json({ message: 'Cart not found' });
    }
    console.log(`Item removed from cart for user: ${req.session.userId}, Item ID: ${itemId}`);
    res.json(cart);
  } catch (error) {
    console.error(`Error removing item from cart: ${error.message}`, error.stack);
    res.status(500).json({ error: error.message });
  }
});

// Update an item quantity in the cart
router.patch('/api/cart/update', isAuthenticated, async (req, res) => {
  const { itemId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.session.userId });
    if (!cart) {
      console.log('Cart not found for user:', req.session.userId);
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item._id.toString() === itemId);
    if (!item) {
      console.log('Item not found in cart:', itemId);
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;

    await cart.save();
    console.log(`Cart item updated for user: ${req.session.userId}, Item ID: ${itemId}, New Quantity: ${quantity}`);
    res.json(cart);
  } catch (error) {
    console.error(`Error updating cart item: ${error.message}`, error.stack);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;