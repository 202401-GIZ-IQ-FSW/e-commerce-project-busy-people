// cart model

const mongoose = require('mongoose');

//Cart Schema
const cartSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  items: [{
    shopItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShopItem', required: true },
    quantity: { type: Number, required: true },
  }],
});

//Cart Model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
