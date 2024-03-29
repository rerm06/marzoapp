const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doorDesignId: { type: mongoose.Schema.Types.ObjectId, ref: 'DoorDesign', required: true },
  materialCosts: { type: Object, required: true },
  totalPrice: { type: Number, required: true }
});

quotationSchema.pre('save', function(next) {
  if (!this.materialCosts || Object.keys(this.materialCosts).length === 0) {
    console.error('Material costs are required');
    const err = new Error('Material costs cannot be empty');
    next(err);
  } else if (this.totalPrice <= 0) {
    console.error('Total price must be greater than 0');
    const err = new Error('Invalid total price');
    next(err);
  } else {
    console.log('Quotation pre-save validation passed');
    next();
  }
});

quotationSchema.post('save', function(doc) {
  console.log(`Quotation ${doc._id} saved successfully`);
});

quotationSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    console.error('There was a duplicate key error', error);
    next(new Error('Duplicate key error'));
  } else if (error) {
    console.error('Error saving the quotation', error);
    next(error);
  } else {
    next();
  }
});

const Quotation = mongoose.model('Quotation', quotationSchema);
module.exports = Quotation;