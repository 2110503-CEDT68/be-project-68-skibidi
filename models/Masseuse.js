const mongoose = require('mongoose');

const MasseuseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  shop: {
    type: mongoose.Schema.ObjectId,
    ref: 'Shop',
    required: true
  },
  
});

module.exports = mongoose.model('Masseuse', MasseuseSchema);