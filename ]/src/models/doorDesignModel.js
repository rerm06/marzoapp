const mongoose = require('mongoose');

const doorDesignSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  designParams: { type: Object, required: true }
});

const DoorDesign = mongoose.model('DoorDesign', doorDesignSchema);
module.exports = DoorDesign;