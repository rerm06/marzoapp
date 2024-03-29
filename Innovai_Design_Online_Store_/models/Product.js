const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Product name is required'], 
    trim: true 
  },
  description: { 
    type: String, 
    required: [true, 'Product description is required'], 
    trim: true 
  },
  price: { 
    type: Number, 
    required: [true, 'Product price is required'], 
    min: [0, 'Product price cannot be negative'] 
  },
  customizationOptions: [{ 
    type: String 
  }],
  category: { 
    type: String, 
    required: [true, 'Product category is required'], 
    trim: true 
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

productSchema.pre('save', function(next) {
  console.log(`Saving product: ${this.name}`);
  next();
});

productSchema.post('save', function(doc, next) {
  console.log(`Product saved: ${doc.name}`);
  next();
});

productSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else if (error) {
    console.error(`Error saving product: ${error.message}`);
    console.error(error.stack);
    next(error);
  } else {
    next();
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;