// order model
const mongoose = require('mongoose');

// Order Schema
const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  items: [{
    shopItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShopItem', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  totalAmount: { type: Number, required: true },
  
});

// Order Model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;



