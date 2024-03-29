const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./Product'); // Ensure Product model is accessible for price lookup

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 }
}, { _id: false }); // _id: false because we don't need a separate id for subdocuments

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
  totalPrice: { type: Number, required: true, default: 0 }
});

cartSchema.pre('save', async function(next) {
  let total = 0;
  for (const item of this.items) {
    try {
      const product = await Product.findById(item.product);
      if (!product) {
        console.error(`Product not found with id: ${item.product}`);
        continue;
      }
      total += item.quantity * product.price;
    } catch (error) {
      console.error(`Error fetching product price: ${error.message}`, error.stack);
      next(error);
    }
  }
  this.totalPrice = total;
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;